export const dynamic = 'force-dynamic'

import QuranSearchBar from './client-components/search-bar'
import QuranSettings from './client-components/settings'
import MetricsCollector from './mini-components/metrics-collector'
import { QuranPlayerProvider } from '@/lib/quran-audio-context'
import { QuranPlayer } from '@/app/quran/[[...query]]/client-components/now-playing-bar'
import { wsApiServer } from '@/src/api/server-client'
import { LanguagesInit } from '@/components/languages-init'
import { QuranNavInit } from '@/components/quran-nav-init'
import { SiteNav } from '@/components/site-nav'
import { QuranNavSheet } from './client-components/nav-sheet'
import { QuranModeSelector } from './client-components/mode-selector'
import { QuranScrollContainer } from './client-components/scroll-container'

export default async function QuranLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ query?: string[] }>
}) {
  const [chaptersRes, appendicesRes, languagesRes] = await Promise.all([
    wsApiServer.GET('/chapters', {
      params: { query: { lang: 'en' } },
      next: { revalidate: 86400 },
    }),
    wsApiServer.GET('/appendices', {
      params: { query: { lang: 'en' } },
      next: { revalidate: 86400 },
    }),
    wsApiServer.GET('/languages', { next: { revalidate: 86400 } }),
  ])

  const { query } = await params

  if (chaptersRes.data && appendicesRes.data) {
    return (
      <QuranPlayerProvider>
        <div className="h-svh flex flex-col">
          {/* Site nav — collapses on scroll via CSS [data-nav-hidden] */}
          <div className="quran-sitenav-wrapper shrink-0">
            <SiteNav />
          </div>

          <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            {/* Seed language direction data into the client Zustand store */}
            <LanguagesInit languages={languagesRes.data ?? []} />
            {/* Seed chapters + appendices for search autocomplete */}
            <QuranNavInit chapters={chaptersRes.data ?? []} appendices={appendicesRes.data ?? []} />
            {/* Sub-header: nav trigger + search + mode selector + settings */}
            {query && (
              <header className="sticky top-0 z-40 h-14 shrink-0 glass-nav bg-background/80 border-b border-border/40">
                <div className="px-3 h-full flex items-center gap-2">
                  <QuranNavSheet
                    chapters={chaptersRes.data}
                    appendices={appendicesRes.data}
                  />
                  <div className="flex-1 min-w-0">
                    <QuranSearchBar />
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <QuranModeSelector />
                  </div>
                  <QuranSettings />
                </div>
              </header>
            )}
            {/* Main content — scroll container manages data-nav-hidden on <html> */}
            <QuranScrollContainer>
              {children}
            </QuranScrollContainer>
            <MetricsCollector />
            <QuranPlayer />
          </div>
        </div>
      </QuranPlayerProvider>
    )
  } else {
    return (
      <div>
        <p>Something went wrong</p>
      </div>
    )
  }
}
