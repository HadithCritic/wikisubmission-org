'use client'

import { useState, useCallback, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useTranslations } from 'next-intl'

export default function QuranSearchBar() {
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
      className="relative flex-1 max-w-sm min-w-0"
    >
      <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
      <Input
        type="search"
        placeholder={t('placeholder')}
        className="pl-8 h-8 bg-muted/50 border-border/40 text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}
