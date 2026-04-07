'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export type AuthResult = { success: boolean; error?: string }

// ── Sign in ───────────────────────────────────────────────────────────────────

export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { success: false, error: error.message }
  revalidatePath('/', 'layout')
  return { success: true }
}

// ── Sign up ───────────────────────────────────────────────────────────────────

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName?: string
): Promise<AuthResult> {
  const supabase = await createSupabaseServerClient()

  const emailConfirmEnabled = process.env.SUPABASE_EMAIL_CONFIRM === 'true'

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName },
      emailRedirectTo: emailConfirmEnabled
        ? `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/auth/callback`
        : undefined,
    },
  })

  if (error) return { success: false, error: error.message }

  // Sync user record to ws-backend (best-effort — don't block on failure)
  if (data.user) {
    await syncUserToBackend(data.session?.access_token, {
      supabase_uid: data.user.id,
      email: data.user.email ?? email,
      display_name: displayName,
    })
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

// ── OAuth ─────────────────────────────────────────────────────────────────────

export async function signInWithOAuth(
  provider: 'google' | 'github'
): Promise<void> {
  const oauthEnabled = process.env.SUPABASE_OAUTH_ENABLED === 'true'
  if (!oauthEnabled) {
    // Silently ignore — UI should already hide OAuth buttons when disabled
    return
  }

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/auth/callback`,
    },
  })

  if (error || !data.url) return
  redirect(data.url)
}

// ── Sign out ──────────────────────────────────────────────────────────────────

export async function signOut(): Promise<void> {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

// ── Current user ──────────────────────────────────────────────────────────────

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// ── Internal: sync to ws-backend ─────────────────────────────────────────────

async function syncUserToBackend(
  token: string | undefined,
  payload: { supabase_uid: string; email: string; display_name?: string }
): Promise<void> {
  if (!token) return
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(3000),
    })
  } catch {
    // best-effort — user can log in even if sync fails
  }
}
