import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getAvailableOAuthProviders } from '@/lib/auth/oauth'
import LoginForm from './login-form'

export const metadata: Metadata = {
  title: 'Sign In — WikiSubmission',
  description: 'Sign in to your WikiSubmission account.',
}

export default function LoginPage() {
  const availableOAuthProviders = getAvailableOAuthProviders()

  return (
    <Suspense>
      <LoginForm availableOAuthProviders={availableOAuthProviders} />
    </Suspense>
  )
}
