import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Proxy for the Quran section
  // Force rewrites the URL to avoid complications at client side
  if (pathname.startsWith('/quran') && searchParams.has('q')) {
    const query = searchParams.get('q')
    const tab = searchParams.get('tab')

    if (query) {
      const url = request.nextUrl.clone()
      url.pathname = `/quran/${query}`
      url.search = ''
      if (tab) url.searchParams.set('tab', tab)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
