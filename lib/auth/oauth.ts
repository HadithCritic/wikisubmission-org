import 'server-only'

export const OAUTH_PROVIDERS = ['google', 'apple'] as const

export type OAuthProvider = (typeof OAUTH_PROVIDERS)[number]

const PROVIDER_FLAGS: Record<OAuthProvider, string> = {
  google: 'SUPABASE_AUTH_GOOGLE_ENABLED',
  apple: 'SUPABASE_AUTH_APPLE_ENABLED',
}

function isEnabled(value: string | undefined) {
  return value === 'true'
}

export function isOAuthProviderEnabled(provider: OAuthProvider) {
  if (process.env.SUPABASE_OAUTH_ENABLED === 'false') {
    return false
  }

  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    return false
  }

  return isEnabled(process.env[PROVIDER_FLAGS[provider]])
}

export function getAvailableOAuthProviders(): OAuthProvider[] {
  return OAUTH_PROVIDERS.filter((provider) => isOAuthProviderEnabled(provider))
}
