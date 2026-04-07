import Image from 'next/image'
import { cn } from '@/lib/utils'

interface UserAvatarProps {
  avatarUrl?: string | null
  displayName?: string | null
  email?: string | null
  size?: number
  className?: string
}

const COLORS = [
  'bg-violet-500', 'bg-blue-500', 'bg-emerald-500',
  'bg-amber-500', 'bg-rose-500', 'bg-cyan-500',
]

function colorFromString(s: string): string {
  let hash = 0
  for (let i = 0; i < s.length; i++) hash = s.charCodeAt(i) + ((hash << 5) - hash)
  return COLORS[Math.abs(hash) % COLORS.length]
}

export function UserAvatar({ avatarUrl, displayName, email, size = 32, className }: UserAvatarProps) {
  const label = displayName || email || '?'
  const initial = label.charAt(0).toUpperCase()
  const bg = colorFromString(label)

  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={label}
        width={size}
        height={size}
        className={cn('rounded-full object-cover', className)}
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <div
      className={cn('rounded-full flex items-center justify-center text-white font-semibold shrink-0', bg, className)}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-label={label}
    >
      {initial}
    </div>
  )
}
