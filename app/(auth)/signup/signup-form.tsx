'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { signInWithOAuth, signUpWithEmail } from '@/app/actions/auth'
import { normalizeNextPath } from '@/lib/auth/redirect'
import { cn } from '@/lib/utils'

const EMAIL_CONFIRM_ENABLED = process.env.NEXT_PUBLIC_SUPABASE_EMAIL_CONFIRM === 'true'

type SignupFormProps = {
  availableOAuthProviders: Array<'google' | 'apple'>
}

const OAUTH_PROVIDER_LABELS = {
  google: 'Google',
  apple: 'Apple',
} as const

export default function SignupForm({ availableOAuthProviders }: SignupFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = normalizeNextPath(searchParams.get('next'))
  const loginHref =
    next === '/' ? '/login' : `/login?next=${encodeURIComponent(next)}`
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)
  const [pending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      const result = await signUpWithEmail(
        email,
        password,
        displayName || undefined,
        next
      )
      if (result.success) {
        if (EMAIL_CONFIRM_ENABLED) {
          setDone(true)
        } else {
          router.push(next)
          router.refresh()
        }
      } else {
        toast.error(result.error ?? 'Sign up failed')
      }
    })
  }

  const handleOAuth = (provider: 'google' | 'apple') => {
    startTransition(async () => {
      const result = await signInWithOAuth(provider, next)
      if (!result.success) {
        toast.error(result.error ?? 'Sign up failed')
      }
    })
  }

  if (done) {
    return (
      <div className="bg-card border border-border rounded-2xl shadow-sm p-8 space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Check your email</h1>
        <p className="text-sm text-muted-foreground">
          We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
        </p>
        <Link href={loginHref} className="text-sm text-primary hover:underline">
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm p-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="text-sm text-muted-foreground">Join WikiSubmission today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="display-name">Name (optional)</Label>
          <Input
            id="display-name"
            type="text"
            placeholder="Your name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            autoComplete="name"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? 'Creating account…' : 'Create account'}
        </Button>
      </form>

      {availableOAuthProviders.length > 0 && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div
            className={cn(
              'grid gap-3',
              availableOAuthProviders.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
            )}
          >
            {availableOAuthProviders.map((provider) => (
              <Button
                key={provider}
                type="button"
                variant="outline"
                onClick={() => handleOAuth(provider)}
                disabled={pending}
              >
                Continue with {OAUTH_PROVIDER_LABELS[provider]}
              </Button>
            ))}
          </div>
        </>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href={loginHref} className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}
