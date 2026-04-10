import type { components } from '@/src/api/types.gen'

type VerseData = components['schemas']['VerseData']

export interface CopyVerseOptions {
  primaryCode: string
  includeText: boolean
  includeArabic: boolean
  secondaryCode?: string
}

/**
 * Builds a plain-text string for a single verse.
 * Format: `[vk] translation\narabic`
 */
export function buildVerseLine(verse: VerseData, opts: CopyVerseOptions): string {
  const tr = verse.tr?.[opts.primaryCode] ?? verse.tr?.['en']
  const arTr = verse.tr?.['ar']
  const secondaryTr = opts.secondaryCode ? verse.tr?.[opts.secondaryCode] : undefined

  const lines: string[] = []

  const key = `[${verse.vk}]`
  if (opts.includeText && tr?.tx) {
    lines.push(`${key} ${tr.tx}`)
  } else {
    lines.push(key)
  }

  if (secondaryTr?.tx) lines.push(secondaryTr.tx)
  if (opts.includeArabic && arTr?.tx) lines.push(arTr.tx)

  return lines.join('\n')
}

/**
 * Builds a plain-text string for multiple verses, one per `buildVerseLine` block.
 */
export function buildVersesText(verses: VerseData[], opts: CopyVerseOptions): string {
  return verses.map((v) => buildVerseLine(v, opts)).join('\n')
}

/**
 * Builds a markdown string for a named segment.
 * Format:
 *   ## label — title
 *
 *   **[vk]** translation
 *   arabic
 */
export function buildSegmentMarkdown(
  label: string,
  title: string,
  verses: VerseData[],
  opts: CopyVerseOptions
): string {
  const lines: string[] = [`## ${label} — ${title}`, '']

  for (const verse of verses) {
    const tr = verse.tr?.[opts.primaryCode] ?? verse.tr?.['en']
    const arTr = verse.tr?.['ar']

    const key = `**[${verse.vk}]**`
    if (opts.includeText && tr?.tx) {
      lines.push(`${key} ${tr.tx}`)
    } else {
      lines.push(key)
    }

    if (opts.includeArabic && arTr?.tx) lines.push(arTr.tx)
    lines.push('')
  }

  return lines.join('\n').trimEnd()
}
