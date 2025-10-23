'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Star, Users, MapPin } from 'lucide-react'

export function EarlyAccessBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-cyan-50 to-purple-50 border-b border-cyan-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-600" />
              <Badge variant="secondary" className="text-xs font-semibold">
                Early Access
              </Badge>
            </div>
            <div className="hidden sm:flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>Everything free for pioneers</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>Plant your flag first</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Perfect timing.</strong> Be the first to build in your city.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export function EmptyStateNudge({ 
  type, 
  city, 
  action 
}: { 
  type: 'city' | 'team' | 'people' | 'hub' | 'forum'
  city?: string
  action?: string
}) {
  const getContent = () => {
    switch (type) {
      case 'city':
        return {
          title: `No one here yet? Perfect.`,
          subtitle: `Be the first to plant your flag in ${city}. Early builders get seen first.`,
          cta: 'Start Your First Project',
          icon: '🏆'
        }
      case 'team':
        return {
          title: `No projects in ${city} yet?`,
          subtitle: `Perfect. Be the City Founder—your first project will be featured and emailed to locals.`,
          cta: 'Post Your First Project',
          icon: '🚀'
        }
      case 'people':
        return {
          title: `No one here yet?`,
          subtitle: `Perfect. Be the first to plant your flag. Early builders get seen first and featured in our Local hubs.`,
          cta: 'Create Your Profile',
          icon: '🌟'
        }
      case 'hub':
        return {
          title: `No posts yet in ${city}.`,
          subtitle: `Be the City Founder—your first project and build logs will be featured and emailed to locals.`,
          cta: 'Start the Conversation',
          icon: '💬'
        }
      case 'forum':
        return {
          title: `Kick off the conversation.`,
          subtitle: `First five helpful replies in ${city} earn the Pioneer badge.`,
          cta: 'Post Your First Build Log',
          icon: '📝'
        }
      default:
        return {
          title: `Perfect timing.`,
          subtitle: `Be the first to plant your flag.`,
          cta: 'Get Started',
          icon: '🎯'
        }
    }
  }

  const content = getContent()

  return (
    <div className="text-center py-12 px-4">
      <div className="text-6xl mb-4">{content.icon}</div>
      <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
        {content.subtitle}
      </p>
      <Button size="lg" variant="gradient">
        {content.cta}
      </Button>
    </div>
  )
}

export function PioneerHighlight({ 
  type, 
  city 
}: { 
  type: 'city-founder' | 'first-five' | 'lighthouse'
  city?: string 
}) {
  const getContent = () => {
    switch (type) {
      case 'city-founder':
        return {
          title: 'City Founder',
          description: `First project posted in ${city}`,
          icon: '🏆',
          color: 'from-yellow-500 to-orange-500'
        }
      case 'first-five':
        return {
          title: 'First Five',
          description: `One of the first 5 active members in ${city}`,
          icon: '🌟',
          color: 'from-blue-500 to-cyan-500'
        }
      case 'lighthouse':
        return {
          title: 'Lighthouse',
          description: 'Weekly build logs × 4',
          icon: '💡',
          color: 'from-purple-500 to-pink-500'
        }
    }
  }

  const content = getContent()

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r ${content.color} text-white text-sm font-semibold`}>
      <span>{content.icon}</span>
      <span>{content.title}</span>
    </div>
  )
}
