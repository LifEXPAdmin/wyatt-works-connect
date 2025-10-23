'use client'

import { useState } from 'react'
import { Header } from '@/components/navigation'
import { ProfileGate } from '@/components/profile-completeness'
import { BuildLogTemplate, FirstTimePosterPrompt } from '@/components/build-log-template'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  FileText,
  MessageSquare,
  Lightbulb,
  Megaphone,
  Users,
  Calendar
} from 'lucide-react'
import Link from 'next/link'

const categories = [
  { id: 'announcements', name: 'Announcements', icon: Megaphone, description: 'Platform updates and important news' },
  { id: 'build-logs', name: 'Build Logs', icon: FileText, description: 'Daily progress and milestone updates' },
  { id: 'help-feedback', name: 'Help & Feedback', icon: Lightbulb, description: 'Questions and community support' },
  { id: 'hiring-looking', name: 'Hiring/Looking', icon: Users, description: 'Job opportunities and team building' },
  { id: 'show-tell', name: 'Show & Tell', icon: MessageSquare, description: 'Showcase your work and achievements' },
  { id: 'local-hubs', name: 'Local Hubs', icon: Calendar, description: 'City-specific discussions and events' },
]

const postTypes = [
  { id: 'question', name: 'Question', description: 'Ask for help or advice' },
  { id: 'showcase', name: 'Showcase', description: 'Share your work or achievements' },
  { id: 'opportunity', name: 'Opportunity', description: 'Post job openings or collaborations' },
  { id: 'event', name: 'Event', description: 'Announce meetups or workshops' },
]

export default function NewForumPostPage() {
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPostType, setSelectedPostType] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    location: '',
  })

  const suggestedTags = [
    'build-log', 'progress', 'mvp', 'development', 'design', 'marketing',
    'user-research', 'fundraising', 'team-building', 'product', 'growth',
    'ai', 'mobile', 'web', 'saas', 'edtech', 'fintech', 'healthtech'
  ]

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const handleUseTemplate = (template: Record<string, unknown>) => {
    setFormData({
      title: template.title,
      content: template.content,
      tags: template.tags,
      location: template.location,
    })
    setSelectedCategory('build-logs')
    setSelectedPostType('showcase')
    setIsFirstTime(false)
  }

  const handleSkipTemplate = () => {
    setIsFirstTime(false)
  }

  const handleSubmit = async () => {
    // TODO: Submit to database
    console.log('Submitting post:', {
      ...formData,
      category: selectedCategory,
      postType: selectedPostType,
    })
  }

  if (isFirstTime) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <Button variant="ghost" asChild>
                <Link href="/forum">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Forum
                </Link>
              </Button>
            </div>
            <FirstTimePosterPrompt
              onUseTemplate={handleUseTemplate}
              onSkip={handleSkipTemplate}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/forum">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Forum
              </Link>
            </Button>
          </div>

          <ProfileGate 
            requiredCompleteness={70}
            fallbackMessage="Complete your profile to start discussions"
          >
            <div className="space-y-8">
              {/* Category Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Choose Category</CardTitle>
                  <CardDescription>
                    Select the most appropriate category for your post
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {categories.map((category) => {
                      const Icon = category.icon
                      return (
                        <Card
                          key={category.id}
                          className={`cursor-pointer transition-all ${
                            selectedCategory === category.id
                              ? 'ring-2 ring-primary bg-primary/5'
                              : 'hover:shadow-md'
                          }`}
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <Icon className="h-5 w-5" />
                              <div>
                                <h3 className="font-medium">{category.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {category.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Post Type Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Post Type</CardTitle>
                  <CardDescription>
                    What kind of post are you creating?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {postTypes.map((type) => (
                      <Card
                        key={type.id}
                        className={`cursor-pointer transition-all ${
                          selectedPostType === type.id
                            ? 'ring-2 ring-primary bg-primary/5'
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => setSelectedPostType(type.id)}
                      >
                        <CardContent className="p-4">
                          <h3 className="font-medium">{type.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {type.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Post Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Create Post</CardTitle>
                  <CardDescription>
                    Share your thoughts with the community
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Title</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter a descriptive title for your post"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Content</label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Share your thoughts, questions, or updates..."
                      rows={8}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Location (Optional)</label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., Milwaukee, WI"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {suggestedTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={formData.tags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                          onClick={() => handleTagToggle(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      <p>💡 <strong>Pro tip:</strong> Use specific tags to help others find your post.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" asChild>
                        <Link href="/forum">Cancel</Link>
                      </Button>
                      <Button 
                        onClick={handleSubmit}
                        disabled={!formData.title || !formData.content || !selectedCategory || !selectedPostType}
                        variant="gradient"
                      >
                        Post Discussion
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ProfileGate>
        </div>
      </div>
    </div>
  )
}
