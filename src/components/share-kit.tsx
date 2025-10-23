'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Share2, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Copy, 
  Check,
  ExternalLink,
  MapPin,
  Users,
  Briefcase
} from 'lucide-react'

interface ShareKitProps {
  type: 'project' | 'profile' | 'build-log' | 'event'
  title: string
  description: string
  city: string
  url: string
  role?: string
  industry?: string
  hashtags?: string[]
}

export function ShareKit({ 
  type, 
  title, 
  description, 
  city, 
  url, 
  role,
  industry,
  hashtags = []
}: ShareKitProps) {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const generateShareText = () => {
    const baseHashtags = ['#startup', '#cofounder', `#${city.toLowerCase().replace(/\s+/g, '')}`]
    const allHashtags = [...baseHashtags, ...hashtags].join(' ')

    switch (type) {
      case 'project':
        return `I'm hiring a ${role} cofounder in ${city} to build ${title}. Join the build → ${url} ${allHashtags}`
      case 'profile':
        return `I'm a ${role} in ${city} looking to join a ${industry} startup. Check out my profile → ${url} ${allHashtags}`
      case 'build-log':
        return `Just posted my build log: ${title} in ${city}. Follow my journey → ${url} ${allHashtags}`
      case 'event':
        return `Join me for ${title} in ${city}. RSVP → ${url} ${allHashtags}`
      default:
        return `${title} in ${city}. Check it out → ${url} ${allHashtags}`
    }
  }

  const shareText = generateShareText()

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText)
    const encodedUrl = encodeURIComponent(url)

    let shareUrl = ''
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'project':
        return <Briefcase className="h-5 w-5" />
      case 'profile':
        return <Users className="h-5 w-5" />
      case 'build-log':
        return <ExternalLink className="h-5 w-5" />
      case 'event':
        return <MapPin className="h-5 w-5" />
      default:
        return <Share2 className="h-5 w-5" />
    }
  }

  const getTypeLabel = () => {
    switch (type) {
      case 'project':
        return 'Project'
      case 'profile':
        return 'Profile'
      case 'build-log':
        return 'Build Log'
      case 'event':
        return 'Event'
      default:
        return 'Content'
    }
  }

  if (!isOpen) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2"
      >
        {getIcon()}
        <span>Share</span>
      </Button>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getIcon()}
            <CardTitle className="text-lg">Share {getTypeLabel()}</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            ×
          </Button>
        </div>
        <CardDescription>
          Help others discover this {getTypeLabel().toLowerCase()} in {city}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Preview */}
        <div className="bg-muted/50 rounded-lg p-3 text-sm">
          <p className="font-medium mb-1">{title}</p>
          <p className="text-muted-foreground mb-2">{description}</p>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {city}
            </Badge>
            {role && (
              <Badge variant="outline" className="text-xs">
                {role}
              </Badge>
            )}
            {industry && (
              <Badge variant="outline" className="text-xs">
                {industry}
              </Badge>
            )}
          </div>
        </div>

        {/* Share Text Preview */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Share text:</label>
          <div className="bg-muted/50 rounded-lg p-3 text-sm">
            <p>{shareText}</p>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleShare('twitter')}
            className="flex items-center space-x-2"
          >
            <Twitter className="h-4 w-4" />
            <span>Twitter</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleShare('facebook')}
            className="flex items-center space-x-2"
          >
            <Facebook className="h-4 w-4" />
            <span>Facebook</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleShare('linkedin')}
            className="flex items-center space-x-2"
          >
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopy}
            className="flex items-center space-x-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>

        {/* Additional Actions */}
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground mb-2">
            💡 <strong>Pro tip:</strong> Cross-posting helps others discover your content and builds momentum.
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-xs">
              Post to Local Hub
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              Post to Forum
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ShareKitTrigger({ 
  children, 
  ...props 
}: { 
  children: React.ReactNode 
} & ShareKitProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {children}
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <ShareKit {...props} />
        </div>
      )}
    </>
  )
}
