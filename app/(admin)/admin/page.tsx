import { createSupabaseServerClient } from '@/lib/supabase/server'

async function fetchStat(url: string, token: string) {
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    return res.ok ? res.json() : null
  } catch {
    return null
  }
}

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token ?? ''
  const api = process.env.NEXT_PUBLIC_API_URL ?? ''

  const [usersData, healthData] = await Promise.all([
    fetchStat(`${api}/users?limit=10&offset=0`, token),
    fetch(`${api.replace('/api/v1', '')}/health`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null).catch(() => null),
  ])

  const totalUsers: number = usersData?.info?.total ?? 0
  const recentUsers: Array<{ email: string; role: string; created_at: string }> = usersData?.data ?? []

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Users" value={totalUsers} />
        <StatCard label="Backend" value={healthData ? 'Healthy' : 'Unreachable'} />
        <StatCard label="Environment" value={process.env.NODE_ENV ?? 'unknown'} />
      </div>

      {/* Recent sign-ups */}
      <div className="space-y-3">
        <h2 className="text-base font-medium">Recent sign-ups</h2>
        <div className="border border-border/40 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Email</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Role</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {recentUsers.length === 0 && (
                <tr><td colSpan={3} className="px-4 py-4 text-center text-muted-foreground">No users yet</td></tr>
              )}
              {recentUsers.map((u) => (
                <tr key={u.email} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-2.5 truncate max-w-[200px]">{u.email}</td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted border border-border/40">{u.role}</span>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground tabular-nums">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-card border border-border/40 rounded-xl p-5 space-y-1">
      <p className="text-xs text-muted-foreground uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  )
}
