import { createSupabaseServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

interface User {
  id: number
  supabase_uid: string
  email: string
  display_name?: string
  role: string
  is_active: boolean
  created_at: string
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageStr } = await searchParams
  const page = Math.max(1, parseInt(pageStr ?? '1', 10))
  const limit = 20
  const offset = (page - 1) * limit

  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token ?? ''

  let users: User[] = []
  let total = 0

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users?limit=${limit}&offset=${offset}`,
      { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
    )
    if (res.ok) {
      const json = await res.json()
      users = json.data ?? []
      total = json.info?.total ?? 0
    }
  } catch {
    // handled below
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
        <span className="text-sm text-muted-foreground">{total} total</span>
      </div>

      <div className="border border-border/40 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">User</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Role</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  No users found
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium truncate max-w-[200px]">{u.display_name ?? u.email}</div>
                  {u.display_name && (
                    <div className="text-xs text-muted-foreground truncate">{u.email}</div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted border border-border/40 capitalize">
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${u.is_active ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-muted text-muted-foreground border border-border/40'}`}>
                    {u.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground tabular-nums">
                  {new Date(u.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {page > 1 && (
            <Link href={`/admin/users?page=${page - 1}`} className="px-3 py-1.5 rounded-lg text-sm border border-border/40 hover:bg-muted/50 transition-colors">
              Previous
            </Link>
          )}
          <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
          {page < totalPages && (
            <Link href={`/admin/users?page=${page + 1}`} className="px-3 py-1.5 rounded-lg text-sm border border-border/40 hover:bg-muted/50 transition-colors">
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
