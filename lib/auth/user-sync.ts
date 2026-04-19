import 'server-only'

type BackendUserSyncPayload = {
  supabase_uid: string
  email?: string | null
  display_name?: string | null
}

type AuthUserLike = {
  user_metadata?: Record<string, unknown> | null
}

export async function syncUserToBackend(
  token: string | undefined,
  payload: BackendUserSyncPayload
): Promise<void> {
  if (!token) return

  const body: {
    supabase_uid: string
    email?: string
    display_name?: string
  } = {
    supabase_uid: payload.supabase_uid,
  }

  const email = payload.email?.trim()
  if (email) {
    body.email = email
  }

  const displayName = payload.display_name?.trim()
  if (displayName) {
    body.display_name = displayName
  }

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(3000),
    })
  } catch {
    // best-effort — user can continue even if sync fails
  }
}

export function getAuthDisplayName(user: AuthUserLike) {
  const rawValue =
    user.user_metadata?.display_name ??
    user.user_metadata?.full_name ??
    user.user_metadata?.name

  if (typeof rawValue !== 'string') {
    return undefined
  }

  const displayName = rawValue.trim()
  return displayName.length > 0 ? displayName : undefined
}
