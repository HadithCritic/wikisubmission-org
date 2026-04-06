'use client'

import { useState, useCallback } from 'react'
import { wsApi } from '@/src/api/client'
import type { components } from '@/src/api/types.gen'
import type { LangCode } from '@/hooks/use-quran-preferences'
import {
  parseQuranRef,
  parseBibleRef,
  type ParsedRef,
  type ParsedBibleRef,
} from '@/lib/scripture-parser'

export type { ParsedRef, ParsedBibleRef }
export { parseQuranRef, parseBibleRef }

type VerseData = components['schemas']['VerseData']
type BibleVerseData = components['schemas']['BibleVerseData']

/** Lazy-fetch a Quran verse or range on demand.
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

/** Lazy-fetch a Bible verse or range on demand.
 *  Fetch is NOT triggered on mount — call `fetch(parsed)` explicitly. */
export function useBibleFetch() {
  const [verses, setVerses] = useState<BibleVerseData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async (parsed: ParsedBibleRef) => {
    setLoading(true)
    setVerses([])
    setError(null)

    const { data, error: err } = await wsApi.GET('/bible', {
      params: {
        query: {
          book: parsed.bn,
          chapter_start: parsed.cs,
          verse_start: parsed.vs,
          verse_end: parsed.ve,
          langs: ['en'],
        },
      },
    })

    const allVerses =
      data?.books?.flatMap((b) =>
        b.chapters?.flatMap((c) => c.verses ?? []) ?? []
      ) ?? []
    setVerses(allVerses)
    setError(err ? 'Failed to fetch verse.' : null)
    setLoading(false)
  }, [])

  return { verses, loading, error, fetch }
}
