import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') || 'OpenQuest'
  const description = searchParams.get('description') || 'Find problems worth solving'
  const category = searchParams.get('category') || ''

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#7c3aed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 700,
            }}
          >
            Q
          </div>
          <span style={{ color: '#a1a1aa', fontSize: '20px', fontWeight: 600 }}>
            OpenQuest
          </span>
          {category && (
            <span
              style={{
                marginLeft: 'auto',
                color: '#7c3aed',
                fontSize: '16px',
                fontWeight: 500,
                background: 'rgba(124, 58, 237, 0.15)',
                padding: '6px 16px',
                borderRadius: '20px',
              }}
            >
              {category}
            </span>
          )}
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              color: '#fafafa',
              fontSize: title.length > 60 ? '42px' : '52px',
              fontWeight: 700,
              lineHeight: 1.2,
              margin: 0,
              maxWidth: '900px',
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                color: '#a1a1aa',
                fontSize: '22px',
                lineHeight: 1.5,
                margin: '20px 0 0 0',
                maxWidth: '800px',
              }}
            >
              {description.length > 140
                ? description.slice(0, 140) + '...'
                : description}
            </p>
          )}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#71717a',
            fontSize: '18px',
          }}
        >
          openquest.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
