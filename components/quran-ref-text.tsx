import { QuranRef } from './quran-ref'

/**
 * Regex that matches Quran verse references inside text.
 *
 * Matches:
 *   2:255        → single verse
 *   1:1-7        → verse range (same chapter)
 *   2:255-257    → verse range (same chapter)
 *
 * Deliberately does NOT match bare numbers like "2" (too ambiguous in prose).
 * Requires the form Chapter:Verse or Chapter:VerseStart-VerseEnd.
 *
 * Word-boundary anchors (\b) prevent matching inside longer numbers.
 */
const QURAN_REF_RE = /\b(\d{1,3}:\d{1,3}(?:-\d{1,3})?)\b/g

type Part = string | { ref: string }

function splitByRefs(text: string): Part[] {
  const parts: Part[] = []
  let last = 0
  let match: RegExpExecArray | null

  QURAN_REF_RE.lastIndex = 0
  while ((match = QURAN_REF_RE.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    parts.push({ ref: match[1] })
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

/** Inline badge that calls onNavigateRef instead of opening its own dialog.
 *  Used inside QuranRef / FootnoteDialog to keep navigation within one dialog. */
function InlineRefBadge({
  reference,
  onNavigateRef,
}: {
  reference: string
  onNavigateRef: (ref: string) => void
}) {
  const [cn, rest] = reference.split(':')
  const [vs, ve] = (rest ?? '').split('-')
  const label = ve && ve !== vs ? `${cn}:${vs}–${ve}` : `${cn}:${vs}`
  return (
    <button
      onClick={() => onNavigateRef(reference)}
      className="inline-flex items-center font-mono text-xs bg-violet-600/10 text-violet-600 hover:bg-violet-600/20 active:bg-violet-600/25 px-1.5 py-0.5 rounded-md transition-colors cursor-pointer align-baseline select-none mx-0.5"
      aria-label={`View verse ${reference}`}
    >
      {label}
    </button>
  )
}

/**
 * Renders a text string with any embedded Quran references (e.g. "2:255",
 * "1:1-7") converted to clickable badges.
 *
 * When `onNavigateRef` is provided (inside a QuranRef/FootnoteDialog), clicking
 * a ref badge navigates within the parent dialog instead of opening a new one.
 *
 * Usage:
 *   <QuranRefText text={tr.f} from="footnote" />
 *   <QuranRefText text={tr.f} onNavigateRef={navigate} />  ← inside a dialog
 */
export function QuranRefText({
  text,
  from,
  className,
  onNavigateRef,
}: {
  text: string
  from?: string
  className?: string
  onNavigateRef?: (ref: string) => void
}) {
  const parts = splitByRefs(text)

  return (
    <span className={className}>
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          <span key={i}>{part}</span>
        ) : onNavigateRef ? (
          <InlineRefBadge key={i} reference={part.ref} onNavigateRef={onNavigateRef} />
        ) : (
          <QuranRef key={i} reference={part.ref} from={from} />
        )
      )}
    </span>
  )
}
