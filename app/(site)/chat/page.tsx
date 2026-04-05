import type { Metadata } from 'next'
import { ChatPageClient } from '@/components/chat/chat-page-client'

export const metadata: Metadata = {
  title: 'Chat — WikiSubmission',
  description: 'Ask AI about Submission, Scripture, or the mathematical miracle of 19.',
}

export default function AskPage() {
  return <ChatPageClient />
}
