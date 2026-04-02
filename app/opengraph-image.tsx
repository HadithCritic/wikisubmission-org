import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0d0d1a 0%, #1a0a2e 60%, #0f1635 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '80px',
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: -120, right: -120,
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: -80, left: '35%',
          width: 350, height: 350,
          background: 'radial-gradient(circle, rgba(99,14,212,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          display: 'flex',
        }} />

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52,
            background: 'rgba(168,85,247,0.2)',
            border: '1.5px solid rgba(168,85,247,0.4)',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ width: 28, height: 28, background: '#a855f7', borderRadius: 7, display: 'flex' }} />
          </div>
          <span style={{ color: '#a855f7', fontSize: 22, fontWeight: 700, letterSpacing: '0.18em', fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
            WikiSubmission
          </span>
        </div>

        {/* Headline */}
        <div style={{
          color: '#ffffff',
          fontSize: 62,
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: 24,
          fontFamily: 'sans-serif',
          maxWidth: 920,
        }}>
          Free &amp; Open Source Tools for the Final Testament
        </div>

        {/* URL */}
        <div style={{ color: '#6b7280', fontSize: 22, fontFamily: 'sans-serif' }}>
          wikisubmission.org
        </div>
      </div>
    ),
    { ...size }
  )
}
