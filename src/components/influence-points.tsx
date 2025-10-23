'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Award, 
  Star, 
  Users, 
  MessageSquare, 
  Calendar,
  CheckCircle,
  TrendingUp,
  Target,
  Zap
} from 'lucide-react'

interface IPActivity {
  id: string
  type: string
  description: string
  points: number
  timestamp: string
  category: 'profile' | 'community' | 'milestone' | 'special'
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: string
  earned: boolean
  earnedAt?: string
}

export function InfluencePoints({ 
  userId, 
  showDetails = false 
}: { 
  userId: string
  showDetails?: boolean 
}) {
  const [ip, setIp] = useState(0)
  const [level, setLevel] = useState(1)
  const [badges, setBadges] = useState<Badge[]>([])
  const [recentActivity, setRecentActivity] = useState<IPActivity[]>([])

  useEffect(() => {
    // TODO: Fetch from database
    // Simulate data for now
    setIp(127)
    setLevel(3)
    setBadges([
      { id: 'first-ship', name: 'First Ship', description: 'Successfully launched your first project', icon: '🚀', category: 'milestone', earned: true, earnedAt: '2024-01-15' },
      { id: 'cofounder-match', name: 'Cofounder Match', description: 'Successfully matched with a cofounder', icon: '🤝', category: 'achievement', earned: true, earnedAt: '2024-01-20' },
      { id: '100-helpfuls', name: '100 Helpfuls', description: 'Received 100 helpful votes', icon: '👍', category: 'community', earned: false },
      { id: 'city-founder', name: 'City Founder', description: 'First project posted in your city', icon: '🏆', category: 'special', earned: false },
    ])
    setRecentActivity([
      { id: '1', type: 'profile_complete', description: 'Profile completed', points: 5, timestamp: '2024-01-10', category: 'profile' },
      { id: '2', type: 'first_project', description: 'First project posted', points: 10, timestamp: '2024-01-15', category: 'milestone' },
      { id: '3', type: 'helpful_answer', description: 'Helpful answer provided', points: 3, timestamp: '2024-01-18', category: 'community' },
      { id: '4', type: 'cofounder_match', description: 'Successful cofounder match', points: 8, timestamp: '2024-01-20', category: 'milestone' },
    ])
  }, [userId])

  const getLevelInfo = (level: number) => {
    const levels = [
      { name: 'Spark', min: 0, max: 50, color: 'from-yellow-500 to-orange-500' },
      { name: 'Builder', min: 51, max: 150, color: 'from-blue-500 to-cyan-500' },
      { name: 'Leader', min: 151, max: 300, color: 'from-purple-500 to-pink-500' },
      { name: 'Legend', min: 301, max: 1000, color: 'from-red-500 to-pink-500' },
    ]
    
    return levels.find(l => level >= l.min && level <= l.max) || levels[0]
  }

  const currentLevel = getLevelInfo(level)
  const nextLevel = getLevelInfo(level + 1)
  const progressToNext = ((ip - currentLevel.min) / (nextLevel.max - currentLevel.min)) * 100

  if (!showDetails) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <Award className="h-4 w-4 text-yellow-600" />
          <span className="text-sm font-semibold">{ip} IP</span>
        </div>
        <Badge variant="secondary" className="text-xs">
          {currentLevel.name}
        </Badge>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-lg">Influence Points</CardTitle>
          </div>
          <Badge variant="secondary">{ip} IP</Badge>
        </div>
        <CardDescription>
          Earn points by contributing to the community and achieving milestones
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{currentLevel.name}</span>
            <span className="text-sm text-muted-foreground">
              {ip}/{nextLevel.max} IP
            </span>
          </div>
          <Progress value={progressToNext} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {nextLevel.max - ip} more points to reach {nextLevel.name}
          </p>
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Recent Activity</h4>
          <div className="space-y-2">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">{activity.description}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-semibold text-green-600">+{activity.points}</span>
                  <Award className="h-3 w-3 text-green-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Badges</h4>
          <div className="grid grid-cols-2 gap-2">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-2 rounded-lg border ${
                  badge.earned 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-muted/50 border-muted'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{badge.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{badge.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {badge.description}
                    </p>
                  </div>
                  {badge.earned && (
                    <CheckCircle className="h-3 w-3 text-green-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ways to Earn IP */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Ways to Earn IP</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Complete profile</span>
              <span className="text-green-600 font-semibold">+5</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Post first project</span>
              <span className="text-green-600 font-semibold">+10</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Helpful answer</span>
              <span className="text-green-600 font-semibold">+1-3</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Successful intro</span>
              <span className="text-green-600 font-semibold">+8</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Host event</span>
              <span className="text-green-600 font-semibold">+10</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function IPNotification({ 
  points, 
  description, 
  onClose 
}: { 
  points: number
  description: string
  onClose: () => void 
}) {
  return (
    <div className="fixed top-4 right-4 bg-white border border-green-200 rounded-lg shadow-lg p-4 z-50 animate-in slide-in-from-right">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
          <Award className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium">+{points} Influence Points</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          ×
        </button>
      </div>
    </div>
  )
}

export function IPLeaderboard({ 
  type = 'global',
  limit = 10 
}: { 
  type?: 'global' | 'local'
  limit?: number 
}) {
  const [leaders, setLeaders] = useState<Array<{id: string, name: string, points: number, avatar?: string, ip?: number, badges?: string[], city?: string}>>([])

  useEffect(() => {
    // TODO: Fetch from database
    setLeaders([
      { id: '1', name: 'Sarah Miller', points: 278, badges: ['First Ship', 'Cofounder Match'], city: 'Austin, TX' },
      { id: '2', name: 'Mike Johnson', points: 256, badges: ['First Ship', '100 Helpfuls'], city: 'Seattle, WA' },
      { id: '3', name: 'Alex Lee', points: 234, badges: ['City Founder', 'Lighthouse'], city: 'San Francisco, CA' },
      { id: '4', name: 'Rachel Davis', points: 198, badges: ['First Ship'], city: 'Chicago, IL' },
      { id: '5', name: 'Tom Wilson', points: 187, badges: ['Cofounder Match'], city: 'Denver, CO' },
    ])
  }, [type, limit])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Leaderboard</span>
        </CardTitle>
        <CardDescription>
          Top contributors {type === 'local' ? 'in your area' : 'globally'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaders.map((leader, index) => (
            <div key={leader.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
              <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{leader.name}</p>
                <p className="text-xs text-muted-foreground">{leader.city}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {leader.badges.slice(0, 2).map((badge: string, i: number) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="h-3 w-3 text-yellow-600" />
                  <span className="text-sm font-semibold">{leader.ip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
