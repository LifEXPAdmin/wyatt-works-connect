import { Metadata } from 'next'

interface OGPreviewProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'profile' | 'project'
}

export function generateOGMetadata({
  title,
  description,
  image = '/og-default.png',
  url,
  type = 'website'
}: OGPreviewProps): Metadata {
  const fullUrl = url ? `https://wyattworks.com${url}` : 'https://wyattworks.com'
  const fullImage = image.startsWith('http') ? image : `https://wyattworks.com${image}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Wyatt Works',
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: type === 'profile' ? 'profile' : 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImage],
    },
  }
}

// Predefined OG templates for different content types
export const generateProjectOG = (project: {
  title: string
  pitch: string
  location: string
  industry: string
  roleTitle?: string
}) => {
  const title = `${project.title} — ${project.roleTitle || 'Cofounder'} needed`
  const description = `${project.pitch} • ${project.location} • ${project.industry}`
  
  return generateOGMetadata({
    title,
    description,
    type: 'project',
    url: `/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`,
    image: '/og-project.png'
  })
}

export const generateProfileOG = (profile: {
  name: string
  headline: string
  roles: string[]
  location: string
  skills: string[]
}) => {
  const title = `${profile.name} — ${profile.headline}`
  const description = `${profile.roles.join(', ')} • ${profile.location} • ${profile.skills.slice(0, 3).join(', ')}`
  
  return generateOGMetadata({
    title,
    description,
    type: 'profile',
    url: `/profiles/${profile.name.toLowerCase().replace(/\s+/g, '-')}`,
    image: '/og-profile.png'
  })
}

export const generateLocalHubOG = (city: string) => {
  const title = `Wyatt Works — ${city}`
  const description = `Founders, cofounders, and collaborators in ${city}. Join local meetups, find team members, and build something real.`
  
  return generateOGMetadata({
    title,
    description,
    type: 'website',
    url: `/local/${city.toLowerCase().replace(/\s+/g, '-')}`,
    image: '/og-local.png'
  })
}

export const generateForumPostOG = (post: {
  title: string
  content: string
  category: string
  author: string
  location?: string
}) => {
  const title = `${post.title} — Wyatt Works Forum`
  const description = `${post.content.substring(0, 150)}... • ${post.category} • ${post.author}`
  
  return generateOGMetadata({
    title,
    description,
    type: 'website',
    url: `/forum/posts/${post.title.toLowerCase().replace(/\s+/g, '-')}`,
    image: '/og-forum.png'
  })
}

// OG Preview component for testing
export function OGPreview({ 
  title, 
  description, 
  image = '/og-default.png',
  url = 'https://wyattworks.com'
}: OGPreviewProps) {
  return (
    <div className="max-w-md border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="aspect-video bg-gray-100 relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="text-white">
            <div className="text-xs font-medium mb-1">wyattworks.com</div>
            <div className="text-sm font-semibold line-clamp-2">{title}</div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        <div className="mt-2 text-xs text-gray-500">{url}</div>
      </div>
    </div>
  )
}

// Dynamic OG image generator (placeholder)
export function generateOGImage({
  title,
  subtitle,
  type = 'project',
  location,
  industry
}: {
  title: string
  subtitle?: string
  type?: 'project' | 'profile' | 'local'
  location?: string
  industry?: string
}) {
  // In a real implementation, this would generate dynamic images
  // For now, return placeholder URLs
  const baseUrl = 'https://wyattworks.com/og'
  
  const params = new URLSearchParams({
    title: title.substring(0, 50),
    ...(subtitle && { subtitle: subtitle.substring(0, 100) }),
    ...(location && { location }),
    ...(industry && { industry }),
    type
  })
  
  return `${baseUrl}?${params.toString()}`
}
