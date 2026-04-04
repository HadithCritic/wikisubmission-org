'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { X, ArrowUp, Loader2, ExternalLink, ChevronDown, Minus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useAsk } from './ask-context'
import { QuranRef } from '@/components/quran-ref'

// ── Types ──────────────────────────────────────────────────────────────────────

interface Message {
  question: string
  answer: string
  sources: string[]
  error?: string
}

interface ParsedSource {
  label: string
  href: string
  external?: boolean
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function parseSource(source: string): ParsedSource | null {
  const appendixMatch = source.match(/^appendix:(\d+):\d+$/)
  if (appendixMatch) {
    return { label: `Appendix ${appendixMatch[1]}`, href: `/appendices/${appendixMatch[1]}` }
  }
  const qurantalkMatch = source.match(/^qurantalk:(.+)$/)
  if (qurantalkMatch) {
    const title = qurantalkMatch[1].trim()
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    return { label: title, href: `https://www.qurantalk.com/${slug}`, external: true }
  }
  const verseMatch = source.match(/^(\d+):(\d+)(?:-\d+)?$/)
  if (verseMatch) {
    return { label: source, href: `/quran/${verseMatch[1]}?verse=${verseMatch[2]}` }
  }
  return null
}

function parseInline(text: string): React.ReactNode[] {
  const re = /(\*\*.+?\*\*|\b\d{1,3}:\d{1,3}(?:-\d{1,3})?\b)/g
  const parts: React.ReactNode[] = []
  let last = 0
  let key = 0
  let match: RegExpExecArray | null
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    const m = match[0]
    if (m.startsWith('**')) {
      parts.push(<strong key={key++}>{m.slice(2, -2)}</strong>)
    } else {
      parts.push(<QuranRef key={key++} reference={m} />)
    }
    last = match.index + m.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function AiAnswer({ text }: { text: string }) {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
      {text.split(/\n\n+/).map((para, i) => {
        const lines = para.split(/\n/).filter(Boolean)
        if (/^\d+\.\s/.test(para)) {
          return (
            <ol key={i} className="space-y-1.5 list-decimal list-outside pl-4">
              {lines.map((line, j) => (
                <li key={j}>{parseInline(line.replace(/^\d+\.\s*/, ''))}</li>
              ))}
            </ol>
          )
        }
        if (/^[-*]\s/.test(para)) {
          return (
            <ul key={i} className="space-y-1.5 list-disc list-outside pl-4">
              {lines.map((line, j) => (
                <li key={j}>{parseInline(line.replace(/^[-*]\s*/, ''))}</li>
              ))}
            </ul>
          )
        }
        return <p key={i}>{parseInline(para)}</p>
      })}
    </div>
  )
}

function Sources({ sources }: { sources: string[] }) {
  const verseSources = sources.filter((s) => /^\d+:\d+/.test(s))
  const otherSources = sources
    .filter((s) => !/^\d+:\d+/.test(s))
    .map(parseSource)
    .filter(Boolean) as ParsedSource[]

  if (verseSources.length === 0 && otherSources.length === 0) return null

  return (
    <div className="mt-2.5 flex flex-wrap gap-1.5">
      {verseSources.length > 0 && (
        <Link
          href={`/quran/?q=${verseSources.join(',')}`}
          className="inline-flex items-center text-[11px] font-mono bg-violet-500/10 text-violet-600 dark:text-violet-400 hover:bg-violet-500/20 px-2 py-0.5 rounded-md transition-colors"
        >
          {verseSources.join(', ')}
        </Link>
      )}
      {otherSources.map((src) =>
        src.external ? (
          <a
            key={src.href}
            href={src.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground px-2 py-0.5 rounded-md transition-colors"
          >
            {src.label}
            <ExternalLink className="size-2.5 opacity-50" />
          </a>
        ) : (
          <Link
            key={src.href}
            href={src.href}
            className="inline-flex items-center text-[11px] bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground px-2 py-0.5 rounded-md transition-colors"
          >
            {src.label}
          </Link>
        )
      )}
    </div>
  )
}

// ── Main sidebar ───────────────────────────────────────────────────────────────

const OPEN_HEIGHT = 'min(600px, calc(100vh - 96px))'
const CLOSED_HEIGHT = '52px'

export function AskSidebar() {
  const { state, open, close, minimize } = useAsk()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isOpen = state === 'open'
  const isMinimized = state === 'minimized'
  const visible = isOpen || isMinimized

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150)
  }, [isOpen])

  useEffect(() => {
    if (isOpen && (messages.length > 0 || loading)) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading, isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) minimize() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, minimize])

  const submit = async (q: string) => {
    const trimmed = q.trim()
    if (!trimmed || loading) return
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`)
      setMessages((prev) => [...prev, { question: trimmed, answer: data.answer, sources: data.sources ?? [] }])
    } catch (err: unknown) {
      setMessages((prev) => [
        ...prev,
        { question: trimmed, answer: '', sources: [], error: err instanceof Error ? err.message : 'Something went wrong.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] transition-opacity duration-200 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={minimize}
        aria-hidden
      />

      {/* Panel — body is always in DOM; height transition reveals/hides it */}
      <aside
        style={{ height: isOpen ? OPEN_HEIGHT : CLOSED_HEIGHT }}
        className="fixed bottom-4 right-4 z-50 w-[clamp(300px,420px,calc(100vw-32px))] bg-background rounded-2xl shadow-2xl border border-border/50 flex flex-col overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 shrink-0 cursor-pointer select-none"
          style={{ height: CLOSED_HEIGHT }}
          onClick={() => isMinimized ? open() : minimize()}
        >
          <div className="flex items-center gap-2">
            <Image
              src="/brand-assets/logo-transparent.png"
              alt="WikiSubmission"
              width={20}
              height={20}
              className="rounded-full size-5"
            />
            <span className="text-sm font-semibold">SubmitterAI</span>
          </div>
          <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={isMinimized ? open : minimize}
              className="size-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label={isMinimized ? 'Expand' : 'Minimize'}
            >
              <Minus size={14} />
            </button>
            <button
              onClick={close}
              className="size-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Body — always rendered, clipped by panel overflow-hidden when minimized */}
        <div className="flex-1 flex flex-col overflow-hidden border-t border-border/30 min-h-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 custom-scrollbar min-h-0">
            {messages.length === 0 && !loading && (
              <div className="flex flex-col items-center justify-center gap-4 text-center pt-6">
                <div>
                  <p className="text-sm font-medium">Ask about the Quran</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Submission, the Miracle, or Islamic practice</p>
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  {[
                    'What is the significance of 19?',
                    'What does the Quran say about prayer?',
                    'What are the Quran initials?',
                  ].map((s) => (
                    <button
                      key={s}
                      onClick={() => submit(s)}
                      className="text-xs text-left text-muted-foreground hover:text-foreground border border-border/40 hover:border-border hover:bg-muted/20 px-3 py-2 rounded-lg transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className="space-y-3">
                {/* User bubble */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-muted/50 rounded-2xl rounded-tr-sm px-3 py-1.5 text-sm leading-relaxed">
                    {msg.question}
                  </div>
                </div>

                {/* AI answer */}
                {msg.error ? (
                  <p className="text-xs text-destructive">{msg.error}</p>
                ) : (
                  <div>
                    <AiAnswer text={msg.answer} />
                    <Sources sources={msg.sources} />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <Loader2 className="size-3.5 animate-spin" />
                <span>Thinking…</span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div className="shrink-0 px-3 pt-2 pb-3 space-y-2 border-t border-border/30">
            <button
              disabled
              className="flex items-center gap-1 text-[10px] text-muted-foreground/50 px-1 cursor-default select-none"
            >
              <Image
                src="/brand-assets/logo-transparent.png"
                alt=""
                width={12}
                height={12}
                className="rounded-full opacity-50"
              />
              SubmitterAI
              <ChevronDown className="size-2.5 opacity-40" />
            </button>

            <form onSubmit={(e: FormEvent) => { e.preventDefault(); submit(input) }} className="relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    submit(input)
                  }
                }}
                placeholder="Ask anything…"
                maxLength={500}
                rows={1}
                className="w-full rounded-xl border border-border/50 bg-muted/20 px-3.5 py-2.5 pr-11 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-muted-foreground/40 max-h-28 overflow-y-auto"
                style={{ fieldSizing: 'content' } as React.CSSProperties}
              />
              <button
                type="submit"
                disabled={loading || input.trim().length < 2}
                className="absolute right-2 bottom-2 size-7 flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                {loading ? <Loader2 className="size-3.5 animate-spin" /> : <ArrowUp className="size-3.5" />}
              </button>
            </form>

            <p className="text-[10px] text-muted-foreground/40 text-center">
              May contain inaccuracies — verify all information
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
