'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useQuranPreferences } from '@/hooks/use-quran-preferences'
import { useVerseFetch, parseQuranRef } from '@/hooks/use-verse-fetch'
import { QuranRefText } from './quran-ref-text'
import type { components } from '@/src/api/types.gen'
import type { LangCode } from '@/hooks/use-quran-preferences'

type VerseData = components['schemas']['VerseData']

function VersePreview({
  verse,
  primaryCode,
  showArabic,
  onNavigateRef,
}: {
  verse: VerseData
  primaryCode: string
  showArabic: boolean
  onNavigateRef: (ref: string) => void
}) {
  const tr = verse.tr?.[primaryCode]
  const arTr = verse.tr?.['ar']
  const [chNum, vNum] = (verse.vk ?? '').split(':').map(Number)

  return (
    <div className="space-y-2 py-3 border-b last:border-0">
      <Link
        href={`/quran/${chNum}?verse=${vNum}`}
        className="text-xs text-violet-500 hover:text-violet-600 flex items-center gap-1 w-fit transition-colors"
      >
        {verse.vk}
        <ArrowUpRight className="size-3" />
      </Link>
      {tr?.s && <p className="text-xs text-violet-500 italic">{tr.s}</p>}
      {tr?.tx && (
        <p className="text-base leading-relaxed">
          <strong>[{verse.vk}]</strong> {tr.tx}
        </p>
      )}
      {tr?.f && (
        <p className="text-sm text-muted-foreground italic">
          <QuranRefText
            text={tr.f}
            from={`footnote of ${verse.vk}`}
            onNavigateRef={onNavigateRef}
          />
        </p>
      )}
      {showArabic && arTr?.tx && (
        <p
          dir="rtl"
          className="font-arabic text-xl leading-relaxed text-right pt-1"
        >
          {arTr.tx}
        </p>
      )}
    </div>
  )
}

/** Inline badge that opens a dialog showing the verse(s) on click.
 *
 *  Usage:
 *    <QuranRef reference="2:255" />
 *    <QuranRef reference="1:1-7" from="Appendix 1" />
 */
export function QuranRef({
  reference,
  from,
}: {
  reference: string
  from?: string
}) {
  const prefs = useQuranPreferences()
  const { verses, loading, error, fetch } = useVerseFetch()
  const [open, setOpen] = useState(false)
  // History stack — each entry is a reference string. The current view is the last item.
  const [history, setHistory] = useState<string[]>([])

  const parsed = parseQuranRef(reference)

  const primaryCode: LangCode =
    prefs.primaryLanguage !== 'xl' ? prefs.primaryLanguage : 'en'

  // Define all hooks unconditionally before any early returns
  const doFetch = useCallback(
    (ref: string) => fetch(ref, primaryCode),
    [fetch, primaryCode]
  )

  const handleNavigate = useCallback(
    (newRef: string) => {
      setHistory((prev) => [...prev, newRef])
      doFetch(newRef)
    },
    [doFetch]
  )

  const handleBack = useCallback(() => {
    setHistory((prev) => {
      const next = prev.slice(0, -1)
      doFetch(next[next.length - 1] ?? reference)
      return next
    })
  }, [doFetch, reference])

  // If unparseable, render plain text so we don't swallow content
  if (!parsed) {
    return <span className="font-mono text-xs">{reference}</span>
  }

  const currentRef = history[history.length - 1] ?? reference
  const currentParsed = parseQuranRef(currentRef) ?? parsed

  const label =
    parsed.vs === parsed.ve
      ? `${parsed.cn}:${parsed.vs}`
      : `${parsed.cn}:${parsed.vs}–${parsed.ve}`

  const currentLabel =
    currentParsed.vs === currentParsed.ve
      ? `${currentParsed.cn}:${currentParsed.vs}`
      : `${currentParsed.cn}:${currentParsed.vs}–${currentParsed.ve}`

  function handleOpenChange(val: boolean) {
    setOpen(val)
    if (val) {
      setHistory([reference])
      doFetch(reference)
    } else {
      setHistory([])
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <button
        onClick={() => handleOpenChange(true)}
        className="inline-flex items-center font-mono text-xs bg-violet-600/10 text-violet-600 hover:bg-violet-600/20 active:bg-violet-600/25 px-1.5 py-0.5 rounded-md transition-colors cursor-pointer align-baseline select-none mx-0.5"
        aria-label={`View verse ${reference}`}
      >
        {label}
      </button>

      <DialogContent className="max-w-lg rounded-3xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {history.length > 1 && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleBack}
                aria-label="Go back"
              >
                <ArrowLeft className="size-4" />
              </Button>
            )}
            <DialogTitle className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-violet-600">{currentLabel}</span>
              {from && history.length === 1 && (
                <span className="text-xs text-muted-foreground font-normal">
                  — from {from}
                </span>
              )}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto pr-1 -mr-1">
          {loading && (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          )}
          {error && (
            <p className="text-sm text-destructive text-center py-6">{error}</p>
          )}
          {verses.map((verse, i) => (
            <VersePreview
              key={verse.vk ?? i}
              verse={verse}
              primaryCode={primaryCode}
              showArabic={prefs.arabic}
              onNavigateRef={handleNavigate}
            />
          ))}
        </div>

        {verses.length > 0 && (
          <div className="pt-3 border-t">
            <Link
              href={`/quran/${currentParsed.cn}?verse=${currentParsed.vs}`}
              onClick={() => setOpen(false)}
              className="text-xs text-violet-500 hover:text-violet-600 flex items-center gap-1 w-fit transition-colors"
            >
              Open in Quran reader
              <ArrowUpRight className="size-3" />
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
