import { normalizeNextPath } from '@/lib/auth/redirect'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { getAuthDisplayName, syncUserToBackend } from '@/lib/auth/user-sync'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = normalizeNextPath(searchParams.get('next'))

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
  }

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.session) {
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
  }

  // Sync user to ws-backend (best-effort)
  await syncUserToBackend(data.session.access_token, {
    supabase_uid: data.user.id,
    email: data.user.email,
    display_name: getAuthDisplayName(data.user),
  })

  return NextResponse.redirect(new URL(next, origin))
}
