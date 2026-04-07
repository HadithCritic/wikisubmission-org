import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { LayoutDashboard, Users, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/admin')

  // Server-side role check (defense in depth — middleware also guards this)
  try {
    const session = await supabase.auth.getSession()
    const token = session.data.session?.access_token
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`,
      { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
    )
    if (res.ok) {
      const json = await res.json()
      if (json.data?.role !== 'admin') redirect('/403')
    } else {
      redirect('/403')
    }
  } catch {
    redirect('/403')
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-border/40 bg-card/50 flex flex-col gap-1 p-4">
        <Link href="/" className="text-sm font-semibold px-3 py-2 mb-2 text-muted-foreground hover:text-foreground transition-colors">
          ← WikiSubmission
        </Link>
        <p className="text-xs uppercase tracking-widest text-muted-foreground px-3 pb-1">Admin</p>
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
              'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            )}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
