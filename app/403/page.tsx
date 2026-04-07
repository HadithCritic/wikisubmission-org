import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '403 — Access Denied',
}

export default function ForbiddenPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <p className="text-6xl font-bold text-muted-foreground/30">403</p>
      <h1 className="text-2xl font-semibold">Access Denied</h1>
      <p className="text-muted-foreground max-w-sm">
        You don&apos;t have permission to view this page.
      </p>
      <Link
        href="/"
        className="text-sm text-primary hover:underline"
      >
        Return home
      </Link>
    </main>
  )
}
