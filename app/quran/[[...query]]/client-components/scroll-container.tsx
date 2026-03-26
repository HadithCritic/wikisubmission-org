'use client'

import { useRef } from 'react'
import { useNavScroll } from '@/hooks/use-nav-scroll'

export function QuranScrollContainer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useNavScroll(ref)

  return (
    <div ref={ref} className="flex flex-1 min-h-0 flex-col gap-4 p-4 pb-4 overflow-y-auto">
      {children}
    </div>
  )
}
