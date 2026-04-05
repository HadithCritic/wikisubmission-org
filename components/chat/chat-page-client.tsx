'use client'

import { useEffect, useRef } from 'react'
import { PanelRightOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useChatPanel } from '@/components/chat-sidebar/panel-context'
import { useChatContext } from './chat-context'
import { ChatInput, MessageList, SuggestionCards } from './chat-ui'

export function ChatPageClient() {
  const { messages, submit, clear, isPending } = useChatContext()
  const { open } = useChatPanel()
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll within the container — not the document
  useEffect(() => {
    const el = containerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  const collapseToSidebar = () => {
    open()
    router.back()
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)]">
      {/* Controls row */}
      <div className="shrink-0 flex items-center px-6 pt-3 max-w-3xl w-full mx-auto">
        <button
          onClick={collapseToSidebar}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Collapse to sidebar"
        >
          <PanelRightOpen size={13} />
          Minimize
        </button>
      </div>

      {/* Messages */}
      <div ref={containerRef} className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center pt-4 gap-4 px-6 text-center">
            <h1 className="text-4xl font-light text-foreground/30 tracking-tight">
              Ask anything.
            </h1>
            <SuggestionCards onSelect={submit} />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-6 pt-6 pb-6 space-y-6">
            <MessageList messages={messages} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 max-w-3xl w-full mx-auto">
        <ChatInput onSubmit={submit} isPending={isPending} autoFocus onClear={messages.length > 0 ? clear : undefined} />
      </div>
    </div>
  )
}
