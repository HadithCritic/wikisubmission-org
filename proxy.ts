import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // ── Quran search proxy ─────────────────────────────────────────────────────
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

  // ── Supabase session refresh ────────────────────────────────────────────────
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: do not run logic between createServerClient and getUser()
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect authenticated users away from auth pages
  if (user && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Protect /admin/* — require admin role
  if (pathname.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login?next=/admin', request.url))
    }

    // Check role — use short-lived cookie cache to avoid a backend round-trip every request
    const roleCookie = request.cookies.get('ws_role')
    let role = roleCookie?.value

    if (!role) {
      try {
        const { data: sessionData } = await supabase.auth.getSession()
        const token = sessionData.session?.access_token
        if (token) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          if (res.ok) {
            const json = await res.json()
            role = json.data?.role ?? 'member'
            supabaseResponse.cookies.set('ws_role', role ?? 'member', {
              maxAge: 300,
              httpOnly: true,
              sameSite: 'lax',
              secure: process.env.NODE_ENV === 'production',
            })
          }
        }
      } catch {
        // backend unreachable — deny access
      }
    }

    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/403', request.url))
    }
  }

  // Protect /settings/* — any authenticated user
  if (pathname.startsWith('/settings') && !user) {
    return NextResponse.redirect(new URL(`/login?next=${pathname}`, request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
