import type { Metadata } from 'next'
import SignupForm from './signup-form'

export const metadata: Metadata = {
  title: 'Sign Up — WikiSubmission',
  description: 'Create your WikiSubmission account.',
}

export default function SignupPage() {
  return <SignupForm />
}
