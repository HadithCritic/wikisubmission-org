import ArchiveClient from './archive-client'
import { buildPageMetadata } from '@/constants/metadata'
import type { Metadata } from 'next'

type Props = {
  searchParams: Promise<{ q?: string; type?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams
  if (q) {
    return buildPageMetadata({
      title: `${q} | Archive | WikiSubmission`,
      description: `Search results for "${q}" in the WikiSubmission media archive`,
      url: `https://wikisubmission.org/archive?q=${encodeURIComponent(q)}`,
    })
  }
  return buildPageMetadata({
    title: 'Archive | WikiSubmission',
    description: 'Search sermons, programs, and newsletters from the Submission community.',
    url: 'https://wikisubmission.org/archive',
  })
}

export default function ArchivePage() {
  return <ArchiveClient />
}
