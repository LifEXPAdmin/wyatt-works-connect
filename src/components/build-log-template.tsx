'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Calendar, 
  Target, 
  HelpCircle,
  CheckCircle,
  ArrowRight,
  Lightbulb
} from 'lucide-react'

interface BuildLogTemplateProps {
  onUseTemplate?: (template: any) => void
  onSkip?: () => void
}

export function BuildLogTemplate({ onUseTemplate, onSkip }: BuildLogTemplateProps) {
  const [template, setTemplate] = useState({
    title: '',
    yesterday: '',
    today: '',
    blockers: '',
    askForHelp: '',
    tags: [] as string[],
    location: ''
  })

  const suggestedTags = [
    'build-log', 'progress', 'mvp', 'development', 'design', 'marketing',
    'user-research', 'fundraising', 'team-building', 'product', 'growth'
  ]

  const handleTagToggle = (tag: string) => {
    setTemplate(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const handleUseTemplate = () => {
    const buildLogContent = `## Yesterday
${template.yesterday}

## Today
${template.today}

## Blockers
${template.blockers}

## Ask for Help
${template.askForHelp}`

    onUseTemplate?.({
      title: template.title || 'Daily Build Log',
      content: buildLogContent,
      tags: template.tags,
      location: template.location,
      category: 'build-logs',
      postType: 'showcase'
    })
  }

  return (
    <Card className="border-2 border-dashed border-primary/20">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">Build Log Template</CardTitle>
            <CardDescription>
              First time posting? Use our template to share your daily progress
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Template Preview */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Template Preview</span>
          </div>
          <div className="text-sm text-yellow-700 space-y-2">
            <p><strong>Yesterday:</strong> What did you accomplish?</p>
            <p><strong>Today:</strong> What are you working on?</p>
            <p><strong>Blockers:</strong> What's holding you back?</p>
            <p><strong>Ask for Help:</strong> What do you need from the community?</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Title</label>
            <Input
              value={template.title}
              onChange={(e) => setTemplate(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Day 5: MVP Progress Update"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Yesterday</label>
            <Textarea
              value={template.yesterday}
              onChange={(e) => setTemplate(prev => ({ ...prev, yesterday: e.target.value }))}
              placeholder="What did you accomplish yesterday? What milestones did you hit?"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Today</label>
            <Textarea
              value={template.today}
              onChange={(e) => setTemplate(prev => ({ ...prev, today: e.target.value }))}
              placeholder="What are you working on today? What's your focus?"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Blockers</label>
            <Textarea
              value={template.blockers}
              onChange={(e) => setTemplate(prev => ({ ...prev, blockers: e.target.value }))}
              placeholder="What's holding you back? Technical issues, decisions, resources?"
              rows={2}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Ask for Help</label>
            <Textarea
              value={template.askForHelp}
              onChange={(e) => setTemplate(prev => ({ ...prev, askForHelp: e.target.value }))}
              placeholder="What specific help do you need from the community?"
              rows={2}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Location</label>
            <Input
              value={template.location}
              onChange={(e) => setTemplate(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g., Milwaukee, WI"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Tags</label>
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={template.tags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            <p>💡 <strong>Pro tip:</strong> Daily build logs attract cofounders and build momentum.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onSkip}>
              Skip Template
            </Button>
            <Button onClick={handleUseTemplate} variant="gradient">
              Use Template
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function FirstTimePosterPrompt({ onUseTemplate, onSkip }: BuildLogTemplateProps) {
  return (
    <div className="text-center py-8 px-4">
      <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <FileText className="h-8 w-8 text-white" />
      </div>
      <h2 className="text-xl font-bold mb-2">First time posting?</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Use our Build Log template to share your daily progress. 
        Daily posts attract cofounders and build momentum.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={onUseTemplate} variant="gradient">
          Use Build Log Template
        </Button>
        <Button onClick={onSkip} variant="outline">
          Start from Scratch
        </Button>
      </div>
    </div>
  )
}

export function BuildLogComposer({ 
  initialData,
  onSubmit 
}: { 
  initialData?: any
  onSubmit?: (data: any) => void 
}) {
  const [showTemplate, setShowTemplate] = useState(!initialData)

  if (showTemplate) {
    return (
      <BuildLogTemplate
        onUseTemplate={(template) => {
          setShowTemplate(false)
          onSubmit?.(template)
        }}
        onSkip={() => setShowTemplate(false)}
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Build Log</CardTitle>
        <CardDescription>
          Share your daily progress and connect with the community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Title</label>
            <Input placeholder="e.g., Day 5: MVP Progress Update" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Content</label>
            <Textarea 
              placeholder="Share your progress, challenges, and what you're working on..."
              rows={8}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setShowTemplate(true)}>
              Use Template Instead
            </Button>
            <Button variant="gradient">
              Post Build Log
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
