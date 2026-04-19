import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getAvailableOAuthProviders } from '@/lib/auth/oauth'
import SignupForm from './signup-form'

export const metadata: Metadata = {
  title: 'Sign Up — WikiSubmission',
  description: 'Create your WikiSubmission account.',
}

export default function SignupPage() {
  const availableOAuthProviders = getAvailableOAuthProviders()

  return (
    <Suspense>
      <SignupForm availableOAuthProviders={availableOAuthProviders} />
    </Suspense>
  )
}
