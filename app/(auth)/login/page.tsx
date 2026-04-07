import type { Metadata } from 'next'
import { Suspense } from 'react'
import LoginForm from './login-form'

export const metadata: Metadata = {
  title: 'Sign In — WikiSubmission',
  description: 'Sign in to your WikiSubmission account.',
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
