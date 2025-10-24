'use client'

import { useState, useEffect } from 'react'

interface RateLimitState {
  count: number
  limit: number
  resetTime: number
  isExceeded: boolean
}

const INTRO_LIMIT = 10 // 10 intros per day
const RESET_HOURS = 24 // Reset every 24 hours

export function useIntroRateLimit() {
  // const { user } = useUser() // Removed for build compatibility
  const [rateLimit, setRateLimit] = useState<RateLimitState>({
    count: 0,
    limit: INTRO_LIMIT,
    resetTime: 0,
    isExceeded: false
  })

  useEffect(() => {
    if (!user?.id) return

    // Load rate limit data from localStorage
    const loadRateLimit = () => {
      const key = `intro_rate_limit_demo_user`
      const stored = localStorage.getItem(key)
      
      if (stored) {
        const data = JSON.parse(stored)
        const now = Date.now()
        
        // Check if reset time has passed
        if (now >= data.resetTime) {
          // Reset the counter
          const newResetTime = now + (RESET_HOURS * 60 * 60 * 1000)
          const newData = {
            count: 0,
            limit: INTRO_LIMIT,
            resetTime: newResetTime,
            isExceeded: false
          }
          localStorage.setItem(key, JSON.stringify(newData))
          setRateLimit(newData)
        } else {
          // Use existing data
          setRateLimit({
            ...data,
            isExceeded: data.count >= data.limit
          })
        }
      } else {
        // Initialize new rate limit
        const resetTime = Date.now() + (RESET_HOURS * 60 * 60 * 1000)
        const newData = {
          count: 0,
          limit: INTRO_LIMIT,
          resetTime,
          isExceeded: false
        }
        localStorage.setItem(key, JSON.stringify(newData))
        setRateLimit(newData)
      }
    }

    loadRateLimit()
  }, []) // Removed user?.id dependency

  const incrementCount = () => {
    // Removed user check since user is undefined

    const key = `intro_rate_limit_demo_user`
    const stored = localStorage.getItem(key)
    
    if (stored) {
      const data = JSON.parse(stored)
      const now = Date.now()
      
      // Check if reset time has passed
      if (now >= data.resetTime) {
        // Reset the counter
        const newResetTime = now + (RESET_HOURS * 60 * 60 * 1000)
        const newData = {
          count: 1,
          limit: INTRO_LIMIT,
          resetTime: newResetTime,
          isExceeded: false
        }
        localStorage.setItem(key, JSON.stringify(newData))
        setRateLimit(newData)
        return true
      } else {
        // Increment existing counter
        const newCount = data.count + 1
        const newData = {
          ...data,
          count: newCount,
          isExceeded: newCount >= data.limit
        }
        localStorage.setItem(key, JSON.stringify(newData))
        setRateLimit(newData)
        return !newData.isExceeded
      }
    }
    
    return false
  }

  const getTimeUntilReset = () => {
    const now = Date.now()
    const timeLeft = rateLimit.resetTime - now
    
    if (timeLeft <= 0) return null
    
    const hours = Math.floor(timeLeft / (60 * 60 * 1000))
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000))
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else {
      return `${minutes}m`
    }
  }

  return {
    rateLimit,
    incrementCount,
    getTimeUntilReset,
    canSendIntro: !rateLimit.isExceeded && rateLimit.count < rateLimit.limit
  }
}

export function RateLimitDisplay({ 
  rateLimit, 
  getTimeUntilReset 
}: { 
  rateLimit: RateLimitState
  getTimeUntilReset: () => string | null 
}) {
  if (!rateLimit.isExceeded) {
    return (
      <div className="text-sm text-muted-foreground">
        {rateLimit.count}/{rateLimit.limit} intros today
      </div>
    )
  }

  const timeUntilReset = getTimeUntilReset()
  
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-red-500 rounded-full" />
        <div>
          <h4 className="font-medium text-red-800">Rate Limit Reached</h4>
          <p className="text-sm text-red-700">
            You&apos;ve sent {rateLimit.limit} intros today. 
            {timeUntilReset && ` Try again in ${timeUntilReset}.`}
          </p>
        </div>
      </div>
    </div>
  )
}

export function RateLimitError({ 
  rateLimit, 
  getTimeUntilReset 
}: { 
  rateLimit: RateLimitState
  getTimeUntilReset: () => string | null 
}) {
  const timeUntilReset = getTimeUntilReset()
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⏰</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Rate Limit Reached</h2>
          <p className="text-muted-foreground mb-4">
            You&apos;ve sent {rateLimit.limit} introductions today. 
            This helps maintain quality conversations and prevents spam.
          </p>
          {timeUntilReset && (
            <p className="text-sm text-muted-foreground mb-4">
              You can send more intros in {timeUntilReset}.
            </p>
          )}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Pro tip:</strong> Focus on quality over quantity. 
              Personalize your intros to stand out.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
