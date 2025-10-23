import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const type = searchParams.get('type') || 'default'
    const title = searchParams.get('title') || 'Wyatt Works'
    const subtitle = searchParams.get('subtitle') || ''
    const location = searchParams.get('location') || ''
    const industry = searchParams.get('industry') || ''

    const getBackgroundColor = () => {
      switch (type) {
        case 'project':
          return '#3B82F6' // blue-500
        case 'profile':
          return '#10B981' // emerald-500
        case 'local':
          return '#F59E0B' // amber-500
        case 'forum':
          return '#8B5CF6' // violet-500
        default:
          return '#6B7280' // gray-500
      }
    }

    const getIcon = () => {
      switch (type) {
        case 'project':
          return '🚀'
        case 'profile':
          return '👤'
        case 'local':
          return '📍'
        case 'forum':
          return '💬'
        default:
          return '🔗'
      }
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: getBackgroundColor(),
            backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            fontFamily: 'system-ui',
            color: 'white',
            padding: '60px',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: '40px',
            }}
          >
            <div style={{ fontSize: '48px' }}>{getIcon()}</div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Wyatt Works</div>
              <div style={{ fontSize: '16px', opacity: 0.8 }}>Find Your Cofounder</div>
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                lineHeight: 1.2,
                marginBottom: subtitle ? '20px' : '0',
                maxWidth: '800px',
              }}
            >
              {title}
            </h1>
            
            {subtitle && (
              <p
                style={{
                  fontSize: '24px',
                  opacity: 0.9,
                  marginBottom: '20px',
                  maxWidth: '600px',
                }}
              >
                {subtitle}
              </p>
            )}

            {(location || industry) && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginTop: '20px',
                }}
              >
                {location && (
                  <div
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '18px',
                    }}
                  >
                    📍 {location}
                  </div>
                )}
                {industry && (
                  <div
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '18px',
                    }}
                  >
                    🏢 {industry}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              fontSize: '16px',
              opacity: 0.8,
              textAlign: 'right',
              width: '100%',
            }}
          >
            wyattworks.com
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
