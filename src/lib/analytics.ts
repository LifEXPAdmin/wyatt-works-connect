'use client'

import { useCallback } from 'react'

interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
  timestamp?: string
  userId?: string
}

class Analytics {
  private events: AnalyticsEvent[] = []

  track(event: string, properties?: Record<string, any>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: new Date().toISOString(),
      userId: this.getCurrentUserId()
    }

    // Store in localStorage for persistence
    this.storeEvent(analyticsEvent)
    
    // Log to console for development
    console.log('Analytics Event:', analyticsEvent)
    
    // In production, this would send to your analytics service
    // this.sendToAnalytics(analyticsEvent)
  }

  private storeEvent(event: AnalyticsEvent) {
    const key = 'wyatt_works_analytics'
    const stored = localStorage.getItem(key)
    const events = stored ? JSON.parse(stored) : []
    
    events.push(event)
    
    // Keep only last 100 events to prevent localStorage bloat
    if (events.length > 100) {
      events.splice(0, events.length - 100)
    }
    
    localStorage.setItem(key, JSON.stringify(events))
  }

  private getCurrentUserId(): string | undefined {
    // TODO: Get from auth context
    return 'current-user'
  }

  getEvents(): AnalyticsEvent[] {
    const key = 'wyatt_works_analytics'
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : []
  }

  clearEvents() {
    localStorage.removeItem('wyatt_works_analytics')
  }

  // Export events for analysis
  exportEvents() {
    const events = this.getEvents()
    const dataStr = JSON.stringify(events, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `wyatt-works-analytics-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    
    URL.revokeObjectURL(url)
  }
}

// Singleton instance
const analytics = new Analytics()

// Hook for easy use in components
export function useAnalytics() {
  const track = useCallback((event: string, properties?: Record<string, any>) => {
    analytics.track(event, properties)
  }, [])

  return { track }
}

// Predefined event tracking functions
export const trackProfileComplete = (completeness: number) => {
  analytics.track('profile_complete_70', { completeness })
}

export const trackProjectPublished = (projectId: string, title: string, stage: string, industry: string) => {
  analytics.track('project_published', { projectId, title, stage, industry })
}

export const trackRolePublished = (roleId: string, title: string, commitment: string, compType: string) => {
  analytics.track('role_published', { roleId, title, commitment, compType })
}

export const trackIntroSent = (projectId: string, roleId: string, founderId: string) => {
  analytics.track('intro_sent', { projectId, roleId, founderId })
}

export const trackIntroReplied = (threadId: string, senderId: string) => {
  analytics.track('intro_replied', { threadId, senderId })
}

export const trackConnected = (threadId: string, partnerId: string, projectId: string) => {
  analytics.track('connected_marked', { threadId, partnerId, projectId })
}

export const trackBuildLogPosted = (category: string, tags: string[], location?: string) => {
  analytics.track('build_log_posted', { category, tags, location })
}

export const trackEventCreated = (eventId: string, title: string, type: string, location: string) => {
  analytics.track('event_created', { eventId, title, type, location })
}

export const trackShareKitClicked = (type: string, platform: string, projectId?: string) => {
  analytics.track('sharekit_clicked', { type, platform, projectId })
}

export const trackOGPreviewLoaded = (type: string, url: string) => {
  analytics.track('og_preview_loaded', { type, url })
}

// Analytics dashboard component for development
export function AnalyticsDashboard() {
  const events = analytics.getEvents()
  
  const eventCounts = events.reduce((acc, event) => {
    acc[event.event] = (acc[event.event] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const recentEvents = events.slice(-10).reverse()

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="space-x-2">
          <button
            onClick={() => analytics.exportEvents()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Export Events
          </button>
          <button
            onClick={() => analytics.clearEvents()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Events
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Event Counts</h3>
          <div className="space-y-2">
            {Object.entries(eventCounts).map(([event, count]) => (
              <div key={event} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span className="font-medium">{event}</span>
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Events</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {recentEvents.map((event, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded text-sm">
                <div className="font-medium">{event.event}</div>
                <div className="text-gray-600">
                  {new Date(event.timestamp!).toLocaleString()}
                </div>
                {event.properties && Object.keys(event.properties).length > 0 && (
                  <div className="mt-1 text-xs text-gray-500">
                    {JSON.stringify(event.properties, null, 2)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default analytics
