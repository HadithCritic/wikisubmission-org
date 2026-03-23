'use client'

import { useState, useCallback, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

export default function QuranSearchBar({ large }: { large?: boolean } = {}) {
  const t = useTranslations('search')
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [query, setQuery] = useState('')

  // Sync value from URL when searchParams change
  useEffect(() => {
    setQuery(searchParams.get('q') ?? '')
  }, [searchParams])

  const performSearch = useCallback(
    (q: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (q) {
        params.set('q', decodeURIComponent(q))
      } else {
        params.delete('q')
      }
      replace(`${pathname}?${params.toString()}`)
    },
    [pathname, replace, searchParams]
  )

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        performSearch(query)
      }}
      className={cn('relative min-w-0', large ? 'w-full' : 'flex-1 max-w-sm')}
    >
      <SearchIcon className={cn('absolute top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none', large ? 'left-3.5 size-4' : 'left-2.5 size-3.5')} />
      <Input
        type="search"
        placeholder={t('placeholder')}
        className={cn('bg-muted/50 border-border/40', large ? 'pl-11 h-12 text-base rounded-xl' : 'pl-8 h-8 text-sm')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}
