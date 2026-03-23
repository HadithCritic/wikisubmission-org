export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import { Spinner } from '@/components/ui/spinner'
import SearchResult from './client-components/result-search'
import { ChapterReader } from './client-components/chapter-reader'
import QuranSearchBar from './client-components/search-bar'
import { wsApiServer } from '@/src/api/server-client'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, ChevronDown, ExternalLink } from 'lucide-react'
import { RandomVerseTile } from './mini-components/random-verse-tile'

// Detect if a query string is a chapter number (1–114)
function parseQueryType(q: string): {
  type: 'chapter' | 'verse' | 'range' | 'search'
  chapterNumber?: number
  verseStart?: number
  verseEnd?: number
} {
  // Pure chapter number: "1", "2", "114"
  if (/^\d{1,3}$/.test(q)) {
    const n = parseInt(q)
    if (n >= 1 && n <= 114) return { type: 'chapter', chapterNumber: n }
  }

  // Verse ref: "2:255"
  const verseMatch = q.match(/^(\d+):(\d+)$/)
  if (verseMatch) {
    return { type: 'verse' }
  }

  // Same-chapter range: "2:255-257"
  const rangeMatch = q.match(/^(\d+):(\d+)-(\d+)$/)
  if (rangeMatch) {
    return {
      type: 'range',
      chapterNumber: parseInt(rangeMatch[1]),
      verseStart: parseInt(rangeMatch[2]),
      verseEnd: parseInt(rangeMatch[3]),
    }
  }

  return { type: 'search' }
}

export default async function QuranPage({
  params,
  searchParams,
}: {
  params: Promise<{ query?: string[] }>
  searchParams: Promise<{ q?: string; verse?: string }>
}) {
  const { q, verse } = await searchParams
  const { query } = await params

  const queryText = q || query?.join(' ')

  if (!queryText) {
    const [chaptersRes, appendicesRes] = await Promise.all([
      wsApiServer.GET('/chapters', {
        params: { query: { lang: 'en' } },
        next: { revalidate: 86400 },
      }),
      wsApiServer.GET('/appendices', {
        params: { query: { lang: 'en' } },
        next: { revalidate: 86400 },
      }),
    ])
    const chapters = (chaptersRes.data ?? []).filter(Boolean).sort(
      (a, b) => (a.chapter_number ?? 0) - (b.chapter_number ?? 0)
    )
    const appendices = (appendicesRes.data ?? []).filter(Boolean).sort(
      (a, b) => (a.code ?? 0) - (b.code ?? 0)
    )

    return (
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* ── Hero ──────────────────────────────────────────────────── */}
          <section className="space-y-6 text-center max-w-xl mx-auto">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-primary/70">Quran</p>
              <h1 className="text-4xl font-bold tracking-tight">The Final Testament</h1>
            </div>
            <QuranSearchBar large />
          </section>

          {/* ── Preview cards ─────────────────────────────────────────── */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/proclamation"
              className="group flex flex-col gap-2 p-5 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted/60 hover:border-border transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <BookOpen className="size-4 text-primary/70" />
                  Proclamation
                </div>
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Proclaiming One Unified Religion for All the People — Rashad Khalifa, 1989
              </p>
            </Link>

            <a
              href="/introduction"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 p-5 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted/60 hover:border-border transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <BookOpen className="size-4 text-primary/70" />
                  Introduction
                </div>
                <ExternalLink className="size-4 text-muted-foreground group-hover:text-foreground transition-all" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                An introduction to the Final Testament and its mathematical miracle
              </p>
            </a>
          </section>

          {/* ── Chapters accordion ────────────────────────────────────── */}
          <details open className="group/ch">
            <summary className="flex items-center justify-between cursor-pointer list-none py-2 border-b border-border/40">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Chapters
              </h2>
              <ChevronDown className="size-4 text-muted-foreground transition-transform group-open/ch:rotate-180" />
            </summary>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              <RandomVerseTile />
              {chapters.map((ch) => (
                <Link
                  key={ch.chapter_number}
                  href={`/quran/${ch.chapter_number}`}
                  className="flex flex-col gap-1 p-3 rounded-xl border border-border/40 bg-muted/20 hover:bg-muted/50 hover:border-border transition-all group"
                >
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {ch.chapter_number}
                  </span>
                  <span className="text-sm font-medium leading-snug line-clamp-2">
                    {ch.title}
                  </span>
                </Link>
              ))}
            </div>
          </details>

          {/* ── Appendices accordion ──────────────────────────────────── */}
          <details open className="group/ap">
            <summary className="flex items-center justify-between cursor-pointer list-none py-2 border-b border-border/40">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Appendices
              </h2>
              <ChevronDown className="size-4 text-muted-foreground transition-transform group-open/ap:rotate-180" />
            </summary>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {appendices.map((app) => (
                <a
                  key={app.code}
                  href={`https://library.wikisubmission.org/file/quran-the-final-testament-appendix-${app.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-muted/20 hover:bg-muted/50 hover:border-border transition-all group"
                >
                  <span className="flex-shrink-0 flex items-center justify-center size-7 rounded-md bg-primary/10 text-primary font-mono text-xs font-semibold">
                    {app.code}
                  </span>
                  <span className="text-sm flex-1 min-w-0 truncate group-hover:text-foreground transition-colors">
                    {app.title}
                  </span>
                  <ExternalLink className="size-3.5 text-muted-foreground/50 shrink-0" />
                </a>
              ))}
            </div>
          </details>

        </div>
      </main>
    )
  }

  const parsed = parseQueryType(queryText)

  // ── Chapter view: SSR first N verses via internal Railway network ───────────
  // If ?verse=N is set, SSR up to that verse so it's immediately in the DOM.
  if (parsed.type === 'chapter' && parsed.chapterNumber) {
    const targetVerse = verse ? parseInt(verse) : undefined
    const ssrVerseEnd = targetVerse ? Math.max(50, targetVerse + 5) : 50

    const { data } = await wsApiServer.GET('/quran', {
      params: {
        query: {
          chapter_number_start: parsed.chapterNumber,
          langs: ['en', 'ar'],
          verse_start: 0,
          verse_end: ssrVerseEnd,
          include_words: true,
          include_root: true,
          include_meaning: true,
        },
      },
    })

    return (
      <main className="flex-1 min-h-0 flex flex-col">
        <Suspense fallback={<Spinner />}>
          <ChapterReader
            key={parsed.chapterNumber}
            chapterNumber={parsed.chapterNumber}
            initialData={data ?? null}
            initialVerse={verse}
          />
        </Suspense>
      </main>
    )
  }

  // ── Range view: SSR specific verse range ─────────────────────────────────────
  if (parsed.type === 'range' && parsed.chapterNumber) {
    const { data } = await wsApiServer.GET('/quran', {
      params: {
        query: {
          chapter_number_start: parsed.chapterNumber,
          langs: ['en', 'ar'],
          verse_start: parsed.verseStart,
          verse_end: parsed.verseEnd,
          include_words: true,
          include_root: true,
          include_meaning: true,
        },
      },
    })

    return (
      <main className="flex-1 min-h-0 flex flex-col">
        <Suspense fallback={<Spinner />}>
          <ChapterReader
            chapterNumber={parsed.chapterNumber}
            initialData={data ?? null}
            initialVerse={verse}
          />
        </Suspense>
      </main>
    )
  }

  // ── Verse ref & text search: client-side via SearchResult ────────────────────
  return (
    <main className="whitespace-pre-line h-full">
      <section>
        <Suspense fallback={<Spinner />}>
          <SearchResult props={{ query: queryText }} />
        </Suspense>
      </section>
    </main>
  )
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ query?: string[] }>
  searchParams: Promise<{ q?: string }>
}): Promise<Metadata> {
  const { q } = await searchParams
  const { query } = await params
  const queryText = decodeURIComponent(q || query?.join(' ') || '')

  let title = `Quran | The Final Testament | WikiSubmission`
  let description = `Access the Final Testament at WikiSubmission, a free and open-source platform for Submission.`
  const openGraph = {
    images: [{ url: '/brand-assets/logo-black.png', width: 64, height: 64 }],
  }

  if (!queryText)
    return {
      title,
      description,
      openGraph: { title, description, ...openGraph },
    }

  const parsed = parseQueryType(queryText)

  if (parsed.type === 'chapter') {
    title = `Sura ${parsed.chapterNumber} | Quran | WikiSubmission`
    description = `Read and study Chapter ${parsed.chapterNumber} of the Final Testament`
  } else if (parsed.type === 'verse' || parsed.type === 'range') {
    title = `${queryText} | Quran | WikiSubmission`
    description = `Verse ${queryText} of the Final Testament`
  } else {
    title = `Search: ${queryText} | Quran | WikiSubmission`
    description = `Search results for "${queryText}" in the Final Testament`
  }

  return { title, description, openGraph: { title, description, ...openGraph } }
}
