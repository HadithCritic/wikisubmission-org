'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { normalizeNextPath } from '@/lib/auth/redirect'
import { isOAuthProviderEnabled, type OAuthProvider } from '@/lib/auth/oauth'
import { getAuthDisplayName, syncUserToBackend } from '@/lib/auth/user-sync'
import { redirect } from 'next/navigation'

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
  displayName?: string,
  nextPath?: string
): Promise<AuthResult> {
  const supabase = await createSupabaseServerClient()
  const safeNextPath = normalizeNextPath(nextPath)

  const emailConfirmEnabled = process.env.SUPABASE_EMAIL_CONFIRM === 'true'

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName },
      emailRedirectTo: emailConfirmEnabled
        ? `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/auth/callback?next=${encodeURIComponent(safeNextPath)}`
        : undefined,
    },
  })

  if (error) return { success: false, error: error.message }

  // Sync user record to ws-backend (best-effort — don't block on failure)
  if (data.user) {
    await syncUserToBackend(data.session?.access_token, {
      supabase_uid: data.user.id,
      email: data.user.email ?? email,
      display_name: displayName ?? getAuthDisplayName(data.user),
    })
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

// ── OAuth ─────────────────────────────────────────────────────────────────────

export async function signInWithOAuth(
  provider: OAuthProvider,
  nextPath?: string
): Promise<AuthResult> {
  const safeNextPath = normalizeNextPath(nextPath)

  if (!isOAuthProviderEnabled(provider)) {
    return {
      success: false,
      error: `${provider === 'apple' ? 'Apple' : 'Google'} sign-in is not available.`,
    }
  }

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/auth/callback?next=${encodeURIComponent(safeNextPath)}`,
    },
  })

  if (error || !data.url) {
    return {
      success: false,
      error: error?.message ?? 'Unable to start sign-in.',
    }
  }

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
