import type { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8">
        <Link
          href="/"
          className="flex flex-col items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/brand-assets/logo-transparent.png"
            alt="WikiSubmission"
            width={56}
            height={56}
            className="rounded-full shadow-lg"
          />
          <span className="text-xl font-semibold tracking-tight">WikiSubmission</span>
        </Link>
        {children}
      </div>
    </main>
  )
}
