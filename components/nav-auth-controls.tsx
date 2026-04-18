'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, Settings, User, LayoutDashboard } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { UserAvatar } from '@/components/user-avatar'
import { signOut } from '@/app/actions/auth'

export function NavAuthControls({
  showMobileSignIn = false,
  onAction,
}: {
  showMobileSignIn?: boolean
  onAction?: () => void
} = {}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return <div className="size-8 rounded-full bg-muted/50 animate-pulse" />
  }

  if (!user) {
    return (
      <Link href="/login" onClick={onAction}>
        <Button
          variant="ghost"
          size="sm"
          className={showMobileSignIn ? 'h-9 w-full justify-start px-3 text-sm' : 'hidden sm:flex h-8 px-3 text-sm'}
        >
          Sign in
        </Button>
      </Link>
    )
  }

  const displayName = user.user_metadata?.display_name ?? user.user_metadata?.full_name
  const avatarUrl = user.user_metadata?.avatar_url
  const role = user.user_metadata?.role as string | undefined

  const handleSignOut = async () => {
    await signOut()
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
          aria-label="Account menu"
        >
          <UserAvatar
            avatarUrl={avatarUrl}
            displayName={displayName}
            email={user.email}
            size={32}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-0.5">
            {displayName && <span className="font-medium text-sm truncate">{displayName}</span>}
            <span className="text-xs text-muted-foreground truncate">{user.email}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/settings/profile" className="flex items-center gap-2 cursor-pointer">
            <User className="size-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
            <Settings className="size-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        {role === 'admin' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin" className="flex items-center gap-2 cursor-pointer">
                <LayoutDashboard className="size-4" />
                Admin Dashboard
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
