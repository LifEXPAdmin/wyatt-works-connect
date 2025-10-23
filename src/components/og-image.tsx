// OG Image generation for social sharing
// This would typically be handled by a service like Vercel OG Image Generator
// For now, we'll create simple placeholder images

export const OG_IMAGES = {
  default: '/og-default.png',
  project: '/og-project.png', 
  profile: '/og-profile.png',
  local: '/og-local.png',
  forum: '/og-forum.png'
}

// Simple OG image component for development
export function OGImagePreview({ 
  type, 
  title, 
  subtitle, 
  location, 
  industry 
}: {
  type: 'project' | 'profile' | 'local' | 'forum'
  title: string
  subtitle?: string
  location?: string
  industry?: string
}) {
  const getBackgroundColor = () => {
    switch (type) {
      case 'project':
        return 'bg-gradient-to-br from-blue-500 to-purple-600'
      case 'profile':
        return 'bg-gradient-to-br from-green-500 to-teal-600'
      case 'local':
        return 'bg-gradient-to-br from-orange-500 to-red-600'
      case 'forum':
        return 'bg-gradient-to-br from-purple-500 to-pink-600'
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-700'
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

  return (
    <div className={`w-full aspect-[1200/630] ${getBackgroundColor()} text-white p-8 flex flex-col justify-between`}>
      <div className="flex items-center justify-between">
        <div className="text-4xl">{getIcon()}</div>
        <div className="text-right">
          <div className="text-lg font-bold">Wyatt Works</div>
          <div className="text-sm opacity-80">Find Your Cofounder</div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl font-bold leading-tight">{title}</h1>
        {subtitle && (
          <p className="text-xl opacity-90">{subtitle}</p>
        )}
        {(location || industry) && (
          <div className="flex items-center space-x-4 text-lg">
            {location && (
              <span className="bg-white/20 px-3 py-1 rounded-full">
                📍 {location}
              </span>
            )}
            {industry && (
              <span className="bg-white/20 px-3 py-1 rounded-full">
                🏢 {industry}
              </span>
            )}
          </div>
        )}
      </div>
      
      <div className="text-right text-sm opacity-80">
        wyattworks.com
      </div>
    </div>
  )
}

// Generate OG image URL for different content types
export function getOGImageUrl({
  type,
  title,
  subtitle,
  location,
  industry
}: {
  type: 'project' | 'profile' | 'local' | 'forum'
  title: string
  subtitle?: string
  location?: string
  industry?: string
}) {
  // In production, this would generate actual images
  // For now, return placeholder URLs
  const baseUrl = 'https://wyattworks.com/api/og'
  
  const params = new URLSearchParams({
    type,
    title: title.substring(0, 50),
    ...(subtitle && { subtitle: subtitle.substring(0, 100) }),
    ...(location && { location }),
    ...(industry && { industry })
  })
  
  return `${baseUrl}?${params.toString()}`
}
