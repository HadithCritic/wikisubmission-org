'use client'

import { useState } from 'react'

export interface Message {
  question: string
  answer?: string
  sources?: string[]
  error?: string
  pending?: boolean
}

const MAX_LEN = 500

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])

  const isPending = messages.at(-1)?.pending ?? false

  const submit = async (q: string) => {
    if (isPending) return
    const trimmed = q.trim().slice(0, MAX_LEN)
    if (trimmed.length < 2) return

    const idx = messages.length
    setMessages(prev => [...prev, { question: trimmed, pending: true }])

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`)
      setMessages(prev =>
        prev.map((m, i) =>
          i === idx
            ? { question: trimmed, answer: data.answer, sources: data.sources ?? [], pending: false }
            : m
        )
      )
    } catch (err) {
      setMessages(prev =>
        prev.map((m, i) =>
          i === idx
            ? { question: trimmed, error: err instanceof Error ? err.message : 'Something went wrong.', pending: false }
            : m
        )
      )
    }
  }

  const clear = () => setMessages([])

  return { messages, submit, clear, isPending }
}
