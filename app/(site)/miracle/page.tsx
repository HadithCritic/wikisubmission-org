import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { FaYoutube } from 'react-icons/fa'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Mathematical Miracle | WikiSubmission',
  description:
    'Discover Code 19 — the mathematical miracle of the Quran, a built-in divine authentication discovered by Dr. Rashad Khalifa in 1974.',
}

const FACTS = [
  {
    number: '19',
    label: 'Letters in Bismillah',
    detail:
      'The opening statement of the Quran — Bismillah Al-Rahman Al-Raheem — consists of exactly 19 Arabic letters.',
  },
  {
    number: '114',
    label: 'Chapters (19 × 6)',
    detail:
      'The Quran contains 114 chapters, an exact multiple of 19.',
  },
  {
    number: '19',
    label: 'Words in first revelation',
    detail:
      'The first five verses ever revealed (96:1–5) contain exactly 19 words.',
  },
  {
    number: '2,698',
    label: 'Occurrences of "God" (19 × 142)',
    detail:
      'The word "God" (Allah) appears exactly 2,698 times throughout the Quran — a precise multiple of 19.',
  },
  {
    number: '19',
    label: 'Verses in first revealed chapter',
    detail:
      'Chapter 96 (Al-Alaq), the first chapter to be revealed, contains exactly 19 verses.',
  },
  {
    number: '1974',
    label: 'Year of discovery',
    detail:
      'Dr. Rashad Khalifa used a computer to analyze the Quran and discovered the mathematical code based on the number 19.',
  },
]

export default function MiraclePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-border/40 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold mb-4">
            Miracle
          </span>
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
            The Mathematical Miracle of the Quran
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            A built-in divine authentication — an interlocking numerical code woven throughout
            the Quran, centered on the prime number 19.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4 text-base leading-relaxed text-foreground/90">
            <p>
              In 1974, Dr. Rashad Khalifa — a biochemist and Muslim scholar — used a computer
              to analyze the Arabic text of the Quran and discovered an extraordinary mathematical
              structure built around the number 19, mentioned in{' '}
              <Link href="/quran/74?verse=30" className="text-primary hover:underline">
                74:30
              </Link>{' '}
              as <em>&ldquo;Over it is nineteen.&rdquo;</em>
            </p>
            <p>
              The patterns are not superficial — they are deeply interlocked across the entire
              text. The number of chapters, the letter counts of the opening statement, the word
              frequencies of key divine names, and the structure of the earliest revelations all
              converge on precise multiples of 19. The statistical probability of these patterns
              occurring by chance is vanishingly small.
            </p>
            <p>
              This mathematical code serves as a divine signature: it proves the Quran was
              authored by God, confirms the integrity of the text that has been preserved to
              this day, and provides a rational, verifiable proof of the scripture&apos;s authenticity
              that anyone can examine.
            </p>
          </div>

          {/* YouTube card */}
          <a
            href="https://youtu.be/4TUYIuxkAmQ?si=KqAL8Ra2c_Y4C2xf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-4 p-6 rounded-2xl border border-border/40 bg-muted/20 hover:bg-muted/40 hover:border-border transition-all"
          >
            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-red-500/20 transition-colors">
              <FaYoutube size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Watch on YouTube
              </p>
              <h3 className="font-headline font-bold text-base leading-snug">
                Code 19: The Mathematical Miracle of the Quran
              </h3>
            </div>
            <span className="mt-auto flex items-center gap-1 text-xs text-primary font-semibold">
              Watch now <ExternalLink size={12} />
            </span>
          </a>
        </div>
      </section>

      {/* Key facts */}
      <section className="border-t border-border/40 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="font-headline text-2xl font-bold">Key Facts</h2>
            <div className="h-px flex-1 bg-border/60" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="bg-background rounded-2xl p-6 border border-border/40 editorial-shadow space-y-2"
              >
                <span className="font-headline text-3xl font-extrabold text-primary">
                  {fact.number}
                </span>
                <p className="font-semibold text-sm">{fact.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{fact.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appendix link */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 rounded-2xl border border-border/40 bg-muted/20">
          <div className="flex-1">
            <p className="font-semibold mb-1">Read the Full Analysis</p>
            <p className="text-sm text-muted-foreground">
              Appendix 1 of the Final Testament provides a detailed, comprehensive treatment of
              the mathematical miracle with hundreds of examples and proofs.
            </p>
          </div>
          <a
            href="https://cdn.wikisubmission.org/books/quran-the-final-testament-appendix-1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
          >
            Appendix 1 PDF <ArrowRight size={15} />
          </a>
        </div>
      </section>
    </div>
  )
}
