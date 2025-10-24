'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useIntroRateLimit, RateLimitDisplay, RateLimitError } from '@/lib/rate-limit'
import { useNotificationTriggers } from '@/components/notifications'
import { 
  X,
  Send,
  User,
  Briefcase,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Calendar,
  DollarSign
} from 'lucide-react'

interface IntroModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    id: string
    title: string
    pitch: string
    location: string
    industry: string
    stage: string
  }
  role: {
    id: string
    title: string
    responsibilities: string[]
    mustHaves: string[]
    commitment: string
    compType: string
    timeline: string
  }
  founder: {
    id: string
    name: string
    headline: string
    skills?: string[]
    location?: string
  }
}

const introTemplates = {
  'founder-to-cofounder': {
    subject: 'Interested in {{role}} role',
    body: `Hey {{founderName}},

Your {{skills}} background looks like a perfect fit for the {{role}} position at {{projectTitle}}.

I'm particularly excited about {{excitement}} and would love to discuss how I can contribute to {{contribution}}.

Commitment: {{commitment}}
Availability: {{availability}}

Can we schedule a call this week to discuss further?

Best,
{{senderName}}`
  },
  'cofounder-to-cofounder': {
    subject: 'Cofounder opportunity',
    body: `Hi {{founderName}},

I came across your {{projectTitle}} project and I'm impressed by {{impression}}.

As a {{senderRole}} with experience in {{skills}}, I believe I could add significant value to {{valueAdd}}.

I'm looking for {{commitment}} commitment and am available {{availability}}.

Would you be open to a conversation about potentially joining forces?

Thanks,
{{senderName}}`
  },
  'collaborator': {
    subject: 'Collaboration opportunity',
    body: `Hello {{founderName}},

I'm interested in the {{role}} opportunity you've posted for {{projectTitle}}.

My background in {{skills}} aligns well with your needs, and I'm particularly drawn to {{draw}}.

I'm available for {{commitment}} and can start {{timeline}}.

Would you like to discuss this further?

Best regards,
{{senderName}}`
  }
}

export function IntroModal({ isOpen, onClose, project, role, founder }: IntroModalProps) {
  const { rateLimit, incrementCount, getTimeUntilReset, canSendIntro } = useIntroRateLimit()
  const { triggerIntroReceived } = useNotificationTriggers()
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    availability: '',
    commitment: '',
    excitement: '',
    impression: '',
    valueAdd: '',
    draw: ''
  })
  const [selectedTemplate, setSelectedTemplate] = useState('founder-to-cofounder')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showRateLimitError, setShowRateLimitError] = useState(false)

  if (!isOpen) return null

  const handleTemplateSelect = (templateKey: string) => {
    setSelectedTemplate(templateKey)
    const template = introTemplates[templateKey as keyof typeof introTemplates]
    
    // Fill in template variables
    const filledSubject = template.subject
      .replace('{{role}}', role.title)
      .replace('{{projectTitle}}', project.title)
    
    const filledBody = template.body
      .replace(/{{founderName}}/g, founder.name)
      .replace(/{{role}}/g, role.title)
      .replace(/{{projectTitle}}/g, project.title)
      .replace(/{{skills}}/g, founder.skills?.slice(0, 3).join(', ') || 'relevant skills')
      .replace(/{{senderName}}/g, 'Your Name') // TODO: Get from user profile
      .replace(/{{senderRole}}/g, 'Technical Cofounder') // TODO: Get from user profile
      .replace(/{{commitment}}/g, formData.commitment || 'Full-time')
      .replace(/{{availability}}/g, formData.availability || 'This week')
      .replace(/{{timeline}}/g, role.timeline || 'ASAP')
      .replace(/{{excitement}}/g, formData.excitement || 'the problem you\'re solving')
      .replace(/{{contribution}}/g, formData.valueAdd || 'building the product')
      .replace(/{{impression}}/g, formData.impression || 'your vision')
      .replace(/{{valueAdd}}/g, formData.valueAdd || 'the technical execution')
      .replace(/{{draw}}/g, formData.draw || 'the mission')

    setFormData(prev => ({
      ...prev,
      subject: filledSubject,
      message: filledBody
    }))
  }

  const handleSubmit = async () => {
    // Check rate limit first
    if (!canSendIntro) {
      setShowRateLimitError(true)
      return
    }

    setIsSubmitting(true)
    try {
      // Increment rate limit counter
      const success = incrementCount()
      if (!success) {
        setShowRateLimitError(true)
        return
      }

      // TODO: Submit intro to database
      console.log('Submitting intro:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setShowSuccess(true)
      setTimeout(() => {
        onClose()
        setShowSuccess(false)
      }, 2000)
    } catch (error) {
      console.error('Error submitting intro:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2">Intro Sent!</h2>
            <p className="text-muted-foreground">
              Your introduction has been sent to {founder.name}. 
              You'll be notified when they reply.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showRateLimitError) {
    return (
      <RateLimitError 
        rateLimit={rateLimit} 
        getTimeUntilReset={getTimeUntilReset}
      />
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Send Introduction</span>
              </CardTitle>
              <CardDescription>
                Introduce yourself to {founder.name} for the {role.title} role
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Project & Role Summary */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.pitch}</p>
              </div>
              <Badge variant="secondary">{role.title}</Badge>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Briefcase className="h-3 w-3" />
                <span>{project.industry}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{role.commitment}</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="h-3 w-3" />
                <span>{role.compType}</span>
              </div>
            </div>
          </div>

          {/* Founder Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">{founder.name}</h4>
                <p className="text-sm text-muted-foreground">{founder.headline}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">{founder.location}</span>
                  <div className="flex space-x-1">
                    {founder.skills?.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    )) || null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Header */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Safety First</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Keep sensitive information private until trust is established. 
                  Use this intro to gauge mutual interest before sharing detailed business plans.
                </p>
              </div>
            </div>
          </div>

          {/* Rate Limit Display */}
          <RateLimitDisplay 
            rateLimit={rateLimit} 
            getTimeUntilReset={getTimeUntilReset}
          />

          {/* Template Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Choose Template</label>
            <div className="grid gap-2">
              {Object.entries(introTemplates).map(([key, template]) => (
                <Card
                  key={key}
                  className={`cursor-pointer transition-all ${
                    selectedTemplate === key
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => handleTemplateSelect(key)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium capitalize">
                          {key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {template.subject}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {key === 'founder-to-cofounder' ? 'Recommended' : ''}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Customization Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <Input
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Enter subject line"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Message</label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Write your introduction message"
                rows={8}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Availability</label>
                <Input
                  value={formData.availability}
                  onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                  placeholder="e.g., This week, Next Monday"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Commitment</label>
                <Input
                  value={formData.commitment}
                  onChange={(e) => setFormData(prev => ({ ...prev, commitment: e.target.value }))}
                  placeholder="e.g., Full-time, Part-time"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              <p>💡 <strong>Pro tip:</strong> Personalize the template to stand out.</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!formData.subject || !formData.message || isSubmitting || !canSendIntro}
                variant="gradient"
              >
                {isSubmitting ? 'Sending...' : 'Send Introduction'}
                <Send className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function IntroButton({ 
  project, 
  role, 
  founder 
}: { 
  project: {
    id: string
    title: string
    pitch: string
    location: string
    industry: string
    stage: string
  }
  role: {
    id: string
    title: string
    responsibilities: string[]
    mustHaves: string[]
    commitment: string
    compType: string
    timeline: string
  }
  founder: {
    id: string
    name: string
    headline: string
    avatarUrl?: string
    skills?: string[]
    location?: string
  }
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)}
        variant="gradient"
        size="sm"
      >
        Send Intro
      </Button>
      <IntroModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={project}
        role={role}
        founder={founder}
      />
    </>
  )
}
