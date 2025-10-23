'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Mail, 
  Clock, 
  Share2, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  ExternalLink
} from 'lucide-react'

interface BoostEmail {
  id: string
  projectId: string
  projectTitle: string
  founderName: string
  founderEmail: string
  createdAt: string
  sentAt?: string
  status: 'pending' | 'sent' | 'dismissed'
  boostActions: {
    shared: boolean
    buildLogPosted: boolean
    localHubPosted: boolean
  }
}

interface BoostEmailSystemProps {
  projectId: string
  projectTitle: string
  founderName: string
  founderEmail: string
  createdAt: string
}

export function BoostEmailSystem({ 
  projectId, 
  projectTitle, 
  founderName, 
  founderEmail, 
  createdAt 
}: BoostEmailSystemProps) {
  const [boostEmail, setBoostEmail] = useState<BoostEmail | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if project needs a boost email (48h with 0 replies)
    const projectCreated = new Date(createdAt)
    const now = new Date()
    const hoursSinceCreation = (now.getTime() - projectCreated.getTime()) / (1000 * 60 * 60)
    
    // Simulate checking for replies (in real app, this would check database)
    const hasReplies = false // TODO: Check actual replies from database
    
    if (hoursSinceCreation >= 48 && !hasReplies) {
      const email: BoostEmail = {
        id: `boost-${projectId}`,
        projectId,
        projectTitle,
        founderName,
        founderEmail,
        createdAt,
        status: 'pending',
        boostActions: {
          shared: false,
          buildLogPosted: false,
          localHubPosted: false
        }
      }
      
      setBoostEmail(email)
      setIsVisible(true)
    }
  }, [projectId, projectTitle, founderName, founderEmail, createdAt])

  const handleSendBoostEmail = async () => {
    if (!boostEmail) return

    try {
      // TODO: Send actual email via email service
      console.log('Sending boost email:', boostEmail)
      
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setBoostEmail(prev => prev ? { ...prev, status: 'sent', sentAt: new Date().toISOString() } : null)
    } catch (error) {
      console.error('Error sending boost email:', error)
    }
  }

  const handleDismiss = () => {
    setBoostEmail(prev => prev ? { ...prev, status: 'dismissed' } : null)
    setIsVisible(false)
  }

  if (!isVisible || !boostEmail) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Boost Your Project</CardTitle>
              <CardDescription>
                Your project hasn't received replies yet
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-800">No Replies Yet</h4>
                <p className="text-sm text-orange-700 mt-1">
                  Your project "{projectTitle}" has been live for 48+ hours without replies. 
                  Here are some ways to boost visibility:
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Boost Actions:</h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Share2 className="h-4 w-4" />
                  <span className="text-sm">Share on social media</span>
                </div>
                <Button size="sm" variant="outline">
                  Share
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">Post a build log update</span>
                </div>
                <Button size="sm" variant="outline">
                  Post Update
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span className="text-sm">Post to local hub</span>
                </div>
                <Button size="sm" variant="outline">
                  Post Locally
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" onClick={handleDismiss}>
              Dismiss
            </Button>
            <Button onClick={handleSendBoostEmail} variant="gradient">
              Send Boost Email
              <Mail className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Email template for boost emails
export function BoostEmailTemplate({ 
  projectTitle, 
  founderName, 
  projectUrl 
}: { 
  projectTitle: string
  founderName: string
  projectUrl: string 
}) {
  return {
    subject: `Boost your project: ${projectTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Boost Your Project</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Get more visibility for your project</p>
        </div>
        
        <div style="padding: 40px 20px;">
          <h2 style="color: #333; margin-bottom: 20px;">Hi ${founderName},</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Your project "<strong>${projectTitle}</strong>" has been live for 48+ hours without replies. 
            Don't worry – this is normal! Here are some proven ways to boost visibility:
          </p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">🚀 Boost Actions:</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li><strong>Share on social media:</strong> Post to Twitter, LinkedIn, and Facebook with city hashtags</li>
              <li><strong>Post a build log:</strong> Share your progress to attract cofounders</li>
              <li><strong>Post to local hub:</strong> Cross-post to your city's local hub</li>
              <li><strong>Reach out directly:</strong> Send intros to promising profiles</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${projectUrl}" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View Your Project
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            <strong>Pro tip:</strong> Projects with regular build log updates get 3x more intros. 
            Share your progress daily to build momentum!
          </p>
          
          <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #1976d2; margin-top: 0;">Need help?</h4>
            <p style="color: #666; margin-bottom: 0;">
              Reply to this email or reach out to our community team. 
              We're here to help you succeed!
            </p>
          </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
          <p style="color: #666; margin: 0; font-size: 14px;">
            Wyatt Works • Find Your Cofounder • Build Something Real
          </p>
        </div>
      </div>
    `,
    text: `
      Boost Your Project: ${projectTitle}
      
      Hi ${founderName},
      
      Your project "${projectTitle}" has been live for 48+ hours without replies. 
      Don't worry – this is normal! Here are some proven ways to boost visibility:
      
      🚀 Boost Actions:
      • Share on social media: Post to Twitter, LinkedIn, and Facebook with city hashtags
      • Post a build log: Share your progress to attract cofounders
      • Post to local hub: Cross-post to your city's local hub
      • Reach out directly: Send intros to promising profiles
      
      View your project: ${projectUrl}
      
      Pro tip: Projects with regular build log updates get 3x more intros. 
      Share your progress daily to build momentum!
      
      Need help? Reply to this email or reach out to our community team.
      
      Wyatt Works • Find Your Cofounder • Build Something Real
    `
  }
}

// Hook to check for projects that need boost emails
export function useBoostEmailChecker() {
  const [projectsNeedingBoost, setProjectsNeedingBoost] = useState<any[]>([])

  useEffect(() => {
    // TODO: Check database for projects that need boost emails
    // For now, simulate with sample data
    const checkProjects = () => {
      // This would typically query the database
      const projects = [
        {
          id: 'project-1',
          title: 'Sample Project',
          founderName: 'John Doe',
          founderEmail: 'john@example.com',
          createdAt: new Date(Date.now() - 50 * 60 * 60 * 1000).toISOString(), // 50 hours ago
          replyCount: 0
        }
      ]

      const needingBoost = projects.filter(project => {
        const hoursSinceCreation = (Date.now() - new Date(project.createdAt).getTime()) / (1000 * 60 * 60)
        return hoursSinceCreation >= 48 && project.replyCount === 0
      })

      setProjectsNeedingBoost(needingBoost)
    }

    checkProjects()
    
    // Check every hour
    const interval = setInterval(checkProjects, 60 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  return { projectsNeedingBoost }
}
