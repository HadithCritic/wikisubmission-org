'use client'

import { useNavScroll } from '@/hooks/use-nav-scroll'

export function QuranScrollContainer({ children }: { children: React.ReactNode }) {
  useNavScroll()
  return <>{children}</>
}
