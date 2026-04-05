import { NextRequest, NextResponse } from 'next/server'

// ── Rate limiting ──────────────────────────────────────────────────────────────
// Module-level store persists across warm Lambda invocations.
// Not perfect across multiple instances, but provides a meaningful first layer.

const WINDOW_MS = 60_000   // 1 minute
const MAX_REQUESTS = 15    // per IP per window

const store = new Map<string, { count: number; reset: number }>()

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = store.get(ip)
  if (!entry || now > entry.reset) {
    store.set(ip, { count: 1, reset: now + WINDOW_MS })
    return false
  }
  if (entry.count >= MAX_REQUESTS) return true
  entry.count++
  return false
}

// ── Route ──────────────────────────────────────────────────────────────────────

const MAX_QUESTION_LEN = 500
const MIN_QUESTION_LEN = 2

export async function POST(req: NextRequest) {
  // Content-type check
  const ct = req.headers.get('content-type') ?? ''
  if (!ct.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type.' }, { status: 415 })
  }

  // Rate limiting
  const ip = getIp(req)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  // Parse + validate
  const body = await req.json().catch(() => null)
  const question =
    typeof body?.question === 'string' ? body.question.trim().slice(0, MAX_QUESTION_LEN) : ''

  if (question.length < MIN_QUESTION_LEN) {
    return NextResponse.json({ error: 'Question is required.' }, { status: 400 })
  }

  // Upstream
  const apiKey = process.env.SUBMITTERAI_API_KEY
  const apiUrl = process.env.SUBMITTERAI_API_URL

  if (!apiKey || !apiUrl) {
    return NextResponse.json({ error: 'AI service is not configured.' }, { status: 500 })
  }

  const upstream = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ question }),
  })

  if (!upstream.ok) {
    return NextResponse.json(
      { error: `AI service returned ${upstream.status}.` },
      { status: upstream.status }
    )
  }

  const data = await upstream.json()
  return NextResponse.json(data)
}
