import { ImageResponse } from 'next/og'
import { sanityServer } from '@/lib/sanity'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const QUERY = `*[_type == "article" && slug.current == $slug][0] {
  title, excerpt,
  "category": categories[0]->name,
  "thumbnailUrl": thumbnail.asset->url
}`

type PostOG = {
  title?: string
  excerpt?: string
  category?: string
  thumbnailUrl?: string
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let post: PostOG = {}
  try {
    post = (await sanityServer.fetch<PostOG>(QUERY, { slug })) ?? {}
  } catch {
    // fall through to default layout
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0d0d1a 0%, #1a0a2e 60%, #0f1635 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Thumbnail as faded background */}
        {post.thumbnailUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.thumbnailUrl}
            alt=""
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: 0.25,
            }}
          />
        )}

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(8,4,18,0.97) 40%, rgba(8,4,18,0.5) 100%)',
          display: 'flex',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          width: '100%',
          height: '100%',
        }}>
          {/* Category + site label */}
          <div style={{
            color: '#a855f7',
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 20,
            fontFamily: 'sans-serif',
          }}>
            {[post.category, 'WikiSubmission'].filter(Boolean).join(' · ')}
          </div>

          {/* Title */}
          <div style={{
            color: '#ffffff',
            fontSize: post.title && post.title.length > 60 ? 46 : 56,
            fontWeight: 800,
            lineHeight: 1.15,
            fontFamily: 'sans-serif',
            maxWidth: 1000,
          }}>
            {post.title ?? 'WikiSubmission Blog'}
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <div style={{
              color: '#9ca3af',
              fontSize: 22,
              marginTop: 20,
              lineHeight: 1.55,
              maxWidth: 860,
              fontFamily: 'sans-serif',
            }}>
              {post.excerpt.length > 130 ? post.excerpt.slice(0, 130) + '…' : post.excerpt}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size }
  )
}
