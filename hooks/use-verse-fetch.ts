'use client'

import { useState, useCallback } from 'react'
import { wsApi } from '@/src/api/client'
import type { components } from '@/src/api/types.gen'
import type { LangCode } from '@/hooks/use-quran-preferences'

type VerseData = components['schemas']['VerseData']

export type ParsedRef = {
  cn: number // chapter number
  vs: number // verse start
  ve: number // verse end
}

/** Parses a Quran reference string into chapter + verse range.
 *  Accepts: "2:255", "1:1-7", "2:255-257"
 *  Returns null for unrecognised input. */
export function parseQuranRef(ref: string): ParsedRef | null {
  const m = ref.trim().match(/^(\d{1,3}):(\d{1,3})(?:-(\d{1,3}))?$/)
  if (!m) return null
  const cn = parseInt(m[1])
  const vs = parseInt(m[2])
  const ve = m[3] ? parseInt(m[3]) : vs
  if (cn < 1 || cn > 114 || vs < 0) return null
  return { cn, vs, ve }
}

/** Lazy-fetch a verse or range on demand.
 *  Fetch is NOT triggered on mount — call `fetch(ref, lang)` explicitly. */
export function useVerseFetch() {
  const [verses, setVerses] = useState<VerseData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async (ref: string, lang: LangCode) => {
    const parsed = parseQuranRef(ref)
    if (!parsed) {
      setError('Invalid reference')
      return
    }

    setLoading(true)
    setVerses([])
    setError(null)

    const langs: string[] = []
    if (lang !== 'xl') langs.push(lang)
    if (!langs.includes('ar')) langs.push('ar')

    // verse 0 = Basmallah. Fetch the first 2 verses (0 and 1) and filter,
    // since some backends don't accept verse_start: 0 as an explicit param.
    const isBasmallah = parsed.vs === 0
    const { data, error: err } = await wsApi.GET('/quran', {
      params: {
        query: {
          chapter_number_start: parsed.cn,
          ...(isBasmallah ? { verse_end: 1 } : { verse_start: parsed.vs, verse_end: parsed.ve }),
          langs,
        },
      },
    })

    const allVerses = data?.chapters?.flatMap((ch) => ch.verses ?? []) ?? []
    const filtered = isBasmallah
      ? allVerses.filter((v) => v.vk === `${parsed.cn}:0`)
      : allVerses
    setVerses(filtered)
    setError(err ? 'Failed to fetch verse.' : null)
    setLoading(false)
  }, [])

  return { verses, loading, error, fetch }
}
