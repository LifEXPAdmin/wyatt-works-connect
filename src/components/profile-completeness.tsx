'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  User, 
  MapPin, 
  Briefcase, 
  Star,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

interface ProfileCompletenessProps {
  profile?: Record<string, unknown>
  showDetails?: boolean
  onComplete?: () => void
}

export function ProfileCompleteness({ 
  profile, 
  showDetails = false, 
  onComplete 
}: ProfileCompletenessProps) {
  const { user } = useUser()
  const [completeness, setCompleteness] = useState(0)
  const [missingItems, setMissingItems] = useState<string[]>([])

  useEffect(() => {
    if (profile) {
      calculateCompleteness(profile)
    }
  }, [profile])

  const calculateCompleteness = (profileData: Record<string, unknown>) => {
    const items = [
      { key: 'name', label: 'Name', weight: 10, check: () => (profileData.name as string)?.length > 0 },
      { key: 'headline', label: 'Professional Headline', weight: 15, check: () => (profileData.headline as string)?.length >= 10 },
      { key: 'photo', label: 'Profile Photo', weight: 10, check: () => (profileData.photo as string)?.length > 0 },
      { key: 'location', label: 'Location', weight: 10, check: () => (profileData.location as { city?: string })?.city?.length > 0 },
      { key: 'roles', label: 'Roles', weight: 10, check: () => (profileData.roles as string[])?.length > 0 },
      { key: 'skills', label: 'Skills (3+)', weight: 15, check: () => (profileData.skills as string[])?.length >= 3 },
      { key: 'industries', label: 'Industries', weight: 10, check: () => (profileData.industries as string[])?.length > 0 },
      { key: 'bio', label: 'Bio', weight: 10, check: () => (profileData.bio as string)?.length > 0 },
      { key: 'portfolio', label: 'Portfolio Links', weight: 10, check: () => profileData.portfolio && Object.values(profileData.portfolio).some((link: unknown) => (link as string)?.length > 0) },
    ]

    let totalWeight = 0
    let completedWeight = 0
    const missing: string[] = []

    items.forEach(item => {
      totalWeight += item.weight
      if (item.check()) {
        completedWeight += item.weight
      } else {
        missing.push(item.label)
      }
    })

    const percentage = Math.round((completedWeight / totalWeight) * 100)
    setCompleteness(percentage)
    setMissingItems(missing)
  }

  const isComplete = completeness >= 70
  const isBlocked = completeness < 70

  if (!showDetails) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Profile Completeness</span>
            <span className="text-sm text-muted-foreground">{completeness}%</span>
          </div>
          <Progress value={completeness} className="h-2" />
        </div>
        {isBlocked && (
          <Badge variant="destructive" className="text-xs">
            Complete to post
          </Badge>
        )}
      </div>
    )
  }

  return (
    <Card className="border-2 border-dashed">
      <CardHeader>
        <div className="flex items-center space-x-2">
          {isComplete ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <AlertCircle className="h-5 w-5 text-yellow-600" />
          )}
          <CardTitle className="text-lg">
            Profile Completeness: {completeness}%
          </CardTitle>
        </div>
        <CardDescription>
          {isComplete 
            ? "Your profile is complete! You can now post projects and apply to roles."
            : "Complete your profile to unlock posting and applying features."
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={completeness} className="h-3" />
          
          {isBlocked && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">Profile Incomplete</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    You need at least 70% completion to post projects and apply to roles.
                  </p>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-yellow-800">Missing items:</p>
                    <ul className="text-sm text-yellow-700 mt-1">
                      {missingItems.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Profile Complete!</h4>
                  <p className="text-sm text-green-700 mt-1">
                    You can now post projects, apply to roles, and participate in the community.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link href="/profile/edit">
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </Button>
            
            {isComplete && onComplete && (
              <Button onClick={onComplete} variant="gradient">
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ProfileGate({ 
  children, 
  requiredCompleteness = 70,
  fallbackMessage = "Complete your profile to access this feature"
}: {
  children: React.ReactNode
  requiredCompleteness?: number
  fallbackMessage?: string
}) {
  const { user } = useUser()
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch profile from database
    // For now, simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // TODO: Calculate actual completeness from profile data
  const completeness = profile ? 85 : 0

  if (completeness < requiredCompleteness) {
    return (
      <div className="text-center py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl font-bold mb-2">Profile Required</h2>
          <p className="text-muted-foreground mb-6">
            {fallbackMessage}
          </p>
          <ProfileCompleteness profile={profile} showDetails />
        </div>
      </div>
    )
  }

  return <>{children}</>
}
