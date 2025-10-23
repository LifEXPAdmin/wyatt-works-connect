'use client'

import { useState } from 'react'
import { Header } from '@/components/navigation'
import { ProfileGate } from '@/components/profile-completeness'
import { ShareKit } from '@/components/share-kit'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { trackProjectPublished, trackRolePublished } from '@/lib/analytics'
import { 
  ArrowLeft,
  Plus,
  Trash2,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Target,
  Lightbulb,
  CheckCircle,
  Share2
} from 'lucide-react'
import Link from 'next/link'

const stages = [
  { id: 'idea', name: 'Idea Stage', description: 'Validating concept and market fit' },
  { id: 'mvp', name: 'MVP', description: 'Building minimum viable product' },
  { id: 'growth', name: 'Growth Stage', description: 'Scaling and expanding market' },
  { id: 'scale', name: 'Scale Stage', description: 'Optimizing and expanding globally' },
]

const industries = [
  'Technology', 'Healthcare', 'Education', 'Finance', 'E-commerce', 'SaaS',
  'Mobile Apps', 'AI/ML', 'Blockchain', 'Gaming', 'Media', 'Real Estate',
  'Transportation', 'Food & Beverage', 'Fashion', 'Other'
]

const commitmentLevels = [
  { id: 'part-time', name: 'Part-time', description: '10-20 hours/week' },
  { id: 'full-time', name: 'Full-time', description: '40+ hours/week' },
  { id: 'cofounder', name: 'Cofounder', description: 'All-in commitment' },
]

const compTypes = [
  { id: 'equity', name: 'Equity Only', description: 'No salary, equity-based' },
  { id: 'hybrid', name: 'Equity + Salary', description: 'Reduced salary + equity' },
  { id: 'paid', name: 'Market Rate', description: 'Full market salary' },
]

interface Role {
  id: string
  title: string
  responsibilities: string[]
  mustHaves: string[]
  commitment: string
  compType: string
  timeline: string
}

export default function NewProjectPage() {
  const [formData, setFormData] = useState({
    title: '',
    pitch: '',
    stage: '',
    industry: '',
    location: '',
    remote: false,
    vision: {
      problem: '',
      solution: '',
      whyNow: ''
    },
    milestones: {
      thirty: '',
      sixty: '',
      ninety: ''
    },
    team: {
      current: '',
      culture: ''
    }
  })

  const [roles, setRoles] = useState<Role[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showShareKit, setShowShareKit] = useState(false)

  const addRole = () => {
    const newRole: Role = {
      id: Date.now().toString(),
      title: '',
      responsibilities: [''],
      mustHaves: [''],
      commitment: '',
      compType: '',
      timeline: ''
    }
    setRoles([...roles, newRole])
  }

  const updateRole = (id: string, field: keyof Role, value: string | number | boolean) => {
    setRoles(roles.map(role => 
      role.id === id ? { ...role, [field]: value } : role
    ))
  }

  const updateRoleArray = (id: string, field: 'responsibilities' | 'mustHaves', index: number, value: string) => {
    setRoles(roles.map(role => {
      if (role.id === id) {
        const newArray = [...role[field]]
        newArray[index] = value
        return { ...role, [field]: newArray }
      }
      return role
    }))
  }

  const addRoleArrayItem = (id: string, field: 'responsibilities' | 'mustHaves') => {
    setRoles(roles.map(role => 
      role.id === id ? { ...role, [field]: [...role[field], ''] } : role
    ))
  }

  const removeRoleArrayItem = (id: string, field: 'responsibilities' | 'mustHaves', index: number) => {
    setRoles(roles.map(role => {
      if (role.id === id) {
        const newArray = role[field].filter((_, i) => i !== index)
        return { ...role, [field]: newArray }
      }
      return role
    }))
  }

  const removeRole = (id: string) => {
    setRoles(roles.filter(role => role.id !== id))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // TODO: Submit to database
      console.log('Submitting project:', { ...formData, roles })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setShowShareKit(true)
    } catch (error) {
      console.error('Error submitting project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.title && formData.pitch && formData.stage && 
                     formData.industry && formData.location && roles.length > 0

  if (showShareKit) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Project Published!</h1>
            <p className="text-muted-foreground mb-8">
              Your project is now live and visible to potential cofounders. 
              Share it to get more visibility.
            </p>
            
            <div className="space-y-4">
              <ShareKit
                type="project"
                title={formData.title}
                description={formData.pitch}
                city={formData.location}
                url={`https://wyattworks.com/projects/${formData.title.toLowerCase().replace(/\s+/g, '-')}`}
                role={roles[0]?.title || 'Cofounder'}
                industry={formData.industry}
              />
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" asChild>
                  <Link href="/teams">View All Projects</Link>
                </Button>
                <Button variant="gradient" asChild>
                  <Link href="/forum/new">Post Build Log</Link>
                </Button>
              </div>
            </div>
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
              <Link href="/teams">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Find a Team
              </Link>
            </Button>
          </div>

          <ProfileGate 
            requiredCompleteness={70}
            fallbackMessage="Complete your profile to post projects"
          >
            <div className="space-y-8">
              {/* Project Basics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5" />
                    <span>Project Details</span>
                  </CardTitle>
                  <CardDescription>
                    Tell us about your project and what you're building
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Project Title</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., EdTech Learning Platform"
                      maxLength={70}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.title.length}/70 characters
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">140-Character Pitch</label>
                    <Textarea
                      value={formData.pitch}
                      onChange={(e) => setFormData(prev => ({ ...prev, pitch: e.target.value }))}
                      placeholder="Building personalized learning paths for homeschool families"
                      rows={2}
                      maxLength={140}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.pitch.length}/140 characters
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Stage</label>
                      <select
                        value={formData.stage}
                        onChange={(e) => setFormData(prev => ({ ...prev, stage: e.target.value }))}
                        className="w-full p-2 border border-input rounded-md bg-background"
                      >
                        <option value="">Select stage</option>
                        {stages.map((stage) => (
                          <option key={stage.id} value={stage.id}>
                            {stage.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Industry</label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                        className="w-full p-2 border border-input rounded-md bg-background"
                      >
                        <option value="">Select industry</option>
                        {industries.map((industry) => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Location</label>
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g., Milwaukee, WI"
                      />
                    </div>

                    <div className="flex items-center space-x-2 mt-6">
                      <input
                        type="checkbox"
                        id="remote"
                        checked={formData.remote}
                        onChange={(e) => setFormData(prev => ({ ...prev, remote: e.target.checked }))}
                        className="rounded border-input"
                      />
                      <label htmlFor="remote" className="text-sm font-medium">
                        Open to remote cofounders
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vision Blocks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5" />
                    <span>Vision</span>
                  </CardTitle>
                  <CardDescription>
                    Help potential cofounders understand your vision
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Problem</label>
                    <Textarea
                      value={formData.vision.problem}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        vision: { ...prev.vision, problem: e.target.value }
                      }))}
                      placeholder="What problem are you solving?"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Solution</label>
                    <Textarea
                      value={formData.vision.solution}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        vision: { ...prev.vision, solution: e.target.value }
                      }))}
                      placeholder="How are you solving it?"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Why Now?</label>
                    <Textarea
                      value={formData.vision.whyNow}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        vision: { ...prev.vision, whyNow: e.target.value }
                      }))}
                      placeholder="Why is this the right time?"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Milestones */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Milestones</span>
                  </CardTitle>
                  <CardDescription>
                    What are your key milestones?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">30 Days</label>
                    <Textarea
                      value={formData.milestones.thirty}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        milestones: { ...prev.milestones, thirty: e.target.value }
                      }))}
                      placeholder="What will you achieve in the first 30 days?"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">60 Days</label>
                    <Textarea
                      value={formData.milestones.sixty}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        milestones: { ...prev.milestones, sixty: e.target.value }
                      }))}
                      placeholder="What will you achieve in 60 days?"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">90 Days</label>
                    <Textarea
                      value={formData.milestones.ninety}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        milestones: { ...prev.milestones, ninety: e.target.value }
                      }))}
                      placeholder="What will you achieve in 90 days?"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Team & Culture */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Team & Culture</span>
                  </CardTitle>
                  <CardDescription>
                    Tell us about your team and culture
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Current Team</label>
                    <Textarea
                      value={formData.team.current}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        team: { ...prev.team, current: e.target.value }
                      }))}
                      placeholder="Who's currently on the team?"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Culture</label>
                    <Textarea
                      value={formData.team.culture}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        team: { ...prev.team, culture: e.target.value }
                      }))}
                      placeholder="What's your team culture like?"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Roles */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Briefcase className="h-5 w-5" />
                        <span>Roles</span>
                      </CardTitle>
                      <CardDescription>
                        What roles are you looking for?
                      </CardDescription>
                    </div>
                    <Button onClick={addRole} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Role
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {roles.map((role, index) => (
                    <Card key={role.id} className="border-2 border-dashed">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Role {index + 1}</CardTitle>
                          <Button 
                            onClick={() => removeRole(role.id)}
                            variant="ghost" 
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Role Title</label>
                          <Input
                            value={role.title}
                            onChange={(e) => updateRole(role.id, 'title', e.target.value)}
                            placeholder="e.g., Technical Cofounder"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Responsibilities (3-7 items)</label>
                          {role.responsibilities.map((resp, respIndex) => (
                            <div key={respIndex} className="flex items-center space-x-2 mb-2">
                              <Input
                                value={resp}
                                onChange={(e) => updateRoleArray(role.id, 'responsibilities', respIndex, e.target.value)}
                                placeholder={`Responsibility ${respIndex + 1}`}
                              />
                              {role.responsibilities.length > 1 && (
                                <Button
                                  onClick={() => removeRoleArrayItem(role.id, 'responsibilities', respIndex)}
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            onClick={() => addRoleArrayItem(role.id, 'responsibilities')}
                            variant="outline"
                            size="sm"
                            className="mt-2"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Responsibility
                          </Button>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Must-Haves (≤5 items)</label>
                          {role.mustHaves.map((mustHave, mustHaveIndex) => (
                            <div key={mustHaveIndex} className="flex items-center space-x-2 mb-2">
                              <Input
                                value={mustHave}
                                onChange={(e) => updateRoleArray(role.id, 'mustHaves', mustHaveIndex, e.target.value)}
                                placeholder={`Must-have ${mustHaveIndex + 1}`}
                              />
                              {role.mustHaves.length > 1 && (
                                <Button
                                  onClick={() => removeRoleArrayItem(role.id, 'mustHaves', mustHaveIndex)}
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            onClick={() => addRoleArrayItem(role.id, 'mustHaves')}
                            variant="outline"
                            size="sm"
                            className="mt-2"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Must-Have
                          </Button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Commitment</label>
                            <select
                              value={role.commitment}
                              onChange={(e) => updateRole(role.id, 'commitment', e.target.value)}
                              className="w-full p-2 border border-input rounded-md bg-background"
                            >
                              <option value="">Select commitment</option>
                              {commitmentLevels.map((level) => (
                                <option key={level.id} value={level.id}>
                                  {level.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 block">Compensation</label>
                            <select
                              value={role.compType}
                              onChange={(e) => updateRole(role.id, 'compType', e.target.value)}
                              className="w-full p-2 border border-input rounded-md bg-background"
                            >
                              <option value="">Select comp type</option>
                              {compTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                  {type.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 block">Timeline</label>
                            <Input
                              value={role.timeline}
                              onChange={(e) => updateRole(role.id, 'timeline', e.target.value)}
                              placeholder="e.g., ASAP, Q1 2024"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {roles.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No roles added yet. Click "Add Role" to get started.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Submit */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  <p>💡 <strong>Pro tip:</strong> Detailed roles attract better matches.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" asChild>
                    <Link href="/teams">Cancel</Link>
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!isFormValid || isSubmitting}
                    variant="gradient"
                  >
                    {isSubmitting ? 'Publishing...' : 'Publish Project'}
                  </Button>
                </div>
              </div>
            </div>
          </ProfileGate>
        </div>
      </div>
    </div>
  )
}
