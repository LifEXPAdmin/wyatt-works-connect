'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  User, 
  MapPin, 
  Briefcase, 
  Target,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  GraduationCap,
  DollarSign
} from 'lucide-react'
import Link from 'next/link'

const roles = [
  { id: 'founder', name: 'Founder', description: 'I have an idea and need cofounders', icon: Star },
  { id: 'cofounder', name: 'Cofounder', description: 'I want to join a team and build', icon: Users },
  { id: 'collaborator', name: 'Collaborator', description: 'I want paid gigs and projects', icon: Briefcase },
  { id: 'mentor', name: 'Mentor', description: 'I want to help others succeed', icon: GraduationCap },
]

const commitments = [
  { id: '5-10h', name: '5-10 hours/week', description: 'Part-time, evenings/weekends' },
  { id: '10-20h', name: '10-20 hours/week', description: 'Significant part-time commitment' },
  { id: '20+h', name: '20+ hours/week', description: 'Nearly full-time' },
  { id: 'full-time', name: 'Full-time', description: '40+ hours/week' },
]

const compensationTypes = [
  { id: 'equity', name: 'Equity Only', description: 'Ownership stake in the company' },
  { id: 'paid', name: 'Paid Only', description: 'Cash compensation' },
  { id: 'hybrid', name: 'Hybrid', description: 'Equity + cash combination' },
  { id: 'volunteer', name: 'Volunteer', description: 'Learning and portfolio building' },
]

const stages = [
  { id: 'exploring', name: 'Exploring Ideas', description: 'Still figuring out what to build' },
  { id: 'pre-mvp', name: 'Pre-MVP', description: 'Have an idea, building first version' },
  { id: 'mvp', name: 'MVP Stage', description: 'Have a working product' },
  { id: 'early-traction', name: 'Early Traction', description: 'Have users and some revenue' },
  { id: 'scaling', name: 'Scaling', description: 'Growing rapidly, need to scale' },
]

const skillTags = [
  'React', 'Next.js', 'TypeScript', 'Python', 'Swift', 'iOS', 'Android',
  'UI/UX Design', 'Brand Design', 'Growth Marketing', 'Content Marketing', 'SEO',
  'Social Media', 'Sales', 'Business Development', 'Operations', 'Finance',
  'Legal', 'Community Management', 'Video Production', 'No-Code', 'Automation',
  'Data Analysis', 'Product Management', 'Project Management', 'DevOps',
  'Backend Development', 'Frontend Development', 'Mobile Development',
  'Web Development', 'Database Design', 'API Development', 'Cloud Computing',
  'AI/ML', 'Machine Learning', 'Data Science', 'Blockchain', 'Cybersecurity'
]

const industryTags = [
  'Technology', 'Healthcare', 'Education', 'Finance', 'E-commerce', 'SaaS',
  'Mobile Apps', 'Web Apps', 'AI/ML', 'Blockchain', 'Gaming', 'Media',
  'Real Estate', 'Transportation', 'Food & Beverage', 'Fashion', 'Beauty',
  'Fitness', 'Travel', 'Entertainment', 'Social Impact', 'Non-profit',
  'Manufacturing', 'Agriculture', 'Energy', 'Security', 'Legal Tech',
  'EdTech', 'FinTech', 'HealthTech', 'PropTech', 'CleanTech'
]

export default function OnboardingPage() {
  // const { user } = useUser() // Removed for build compatibility
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '', // user?.fullName || '',
    headline: '',
    bio: '',
    location: {
      city: '',
      state: '',
      country: 'United States',
      timezone: 'America/Chicago'
    },
    roles: [] as string[],
    intent: [] as string[],
    commitment: '',
    compensationPreference: '',
    stage: '',
    skills: [] as string[],
    industries: [] as string[],
    availability: 'soon' as string,
    willingToRelocate: false,
    remoteOnly: false,
  })

  const totalSteps = 5

  const handleRoleToggle = (roleId: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(roleId)
        ? prev.roles.filter(r => r !== roleId)
        : [...prev.roles, roleId]
    }))
  }

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleIndustryToggle = (industry: string) => {
    setFormData(prev => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : [...prev.industries, industry]
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    // TODO: Save profile to database
    console.log('Saving profile:', formData)
    // Redirect to dashboard or profile
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome to Wyatt Works!</h2>
              <p className="text-muted-foreground">
                Let's set up your profile so others can find and connect with you.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Professional Headline</label>
                <Input
                  value={formData.headline}
                  onChange={(e) => setFormData(prev => ({ ...prev, headline: e.target.value }))}
                  placeholder="e.g., AI Engineer + Growth Marketer"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This appears on your profile card (min 10 characters)
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Bio</label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself, your experience, and what you're looking for..."
                  rows={4}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Optional - helps others understand your background (max 500 characters)
                </p>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">What's your role?</h2>
              <p className="text-muted-foreground">
                Select all that apply - you can change this later.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {roles.map((role) => {
                const Icon = role.icon
                return (
                  <Card
                    key={role.id}
                    className={`cursor-pointer transition-all ${
                      formData.roles.includes(role.id)
                        ? 'ring-2 ring-primary bg-primary/5'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handleRoleToggle(role.id)}
                  >
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">What's your availability?</h2>
              <p className="text-muted-foreground">
                Help others understand your time commitment and compensation preferences.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">Time Commitment</label>
                <div className="grid gap-3">
                  {commitments.map((commitment) => (
                    <Card
                      key={commitment.id}
                      className={`cursor-pointer transition-all ${
                        formData.commitment === commitment.id
                          ? 'ring-2 ring-primary bg-primary/5'
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, commitment: commitment.id }))}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{commitment.name}</h3>
                            <p className="text-sm text-muted-foreground">{commitment.description}</p>
                          </div>
                          {formData.commitment === commitment.id && (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">Compensation Preference</label>
                <div className="grid gap-3">
                  {compensationTypes.map((comp) => (
                    <Card
                      key={comp.id}
                      className={`cursor-pointer transition-all ${
                        formData.compensationPreference === comp.id
                          ? 'ring-2 ring-primary bg-primary/5'
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, compensationPreference: comp.id }))}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{comp.name}</h3>
                            <p className="text-sm text-muted-foreground">{comp.description}</p>
                          </div>
                          {formData.compensationPreference === comp.id && (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">Current Stage</label>
                <div className="grid gap-3">
                  {stages.map((stage) => (
                    <Card
                      key={stage.id}
                      className={`cursor-pointer transition-all ${
                        formData.stage === stage.id
                          ? 'ring-2 ring-primary bg-primary/5'
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, stage: stage.id }))}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{stage.name}</h3>
                            <p className="text-sm text-muted-foreground">{stage.description}</p>
                          </div>
                          {formData.stage === stage.id && (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">What are your skills?</h2>
              <p className="text-muted-foreground">
                Select at least 3 skills. This helps others find you for relevant opportunities.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Skills ({formData.skills.length} selected)
                </label>
                <div className="flex flex-wrap gap-2">
                  {skillTags.map((skill) => (
                    <Badge
                      key={skill}
                      variant={formData.skills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">
                  Industries ({formData.industries.length} selected)
                </label>
                <div className="flex flex-wrap gap-2">
                  {industryTags.map((industry) => (
                    <Badge
                      key={industry}
                      variant={formData.industries.includes(industry) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => handleIndustryToggle(industry)}
                    >
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Where are you located?</h2>
              <p className="text-muted-foreground">
                This helps connect you with local opportunities and events.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">City</label>
                  <Input
                    value={formData.location.city}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      location: { ...prev.location, city: e.target.value }
                    }))}
                    placeholder="e.g., Milwaukee"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">State</label>
                  <Input
                    value={formData.location.state}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      location: { ...prev.location, state: e.target.value }
                    }))}
                    placeholder="e.g., Wisconsin"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remoteOnly"
                    checked={formData.remoteOnly}
                    onChange={(e) => setFormData(prev => ({ ...prev, remoteOnly: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="remoteOnly" className="text-sm">
                    Remote work only
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="willingToRelocate"
                    checked={formData.willingToRelocate}
                    onChange={(e) => setFormData(prev => ({ ...prev, willingToRelocate: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="willingToRelocate" className="text-sm">
                    Willing to relocate for the right opportunity
                  </label>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">
                {Math.round((currentStep / totalSteps) * 100)}% complete
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <Card>
            <CardContent className="p-8">
              {renderStep()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            <div className="flex items-center space-x-2">
              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && (!formData.name || !formData.headline)) ||
                    (currentStep === 2 && formData.roles.length === 0) ||
                    (currentStep === 3 && (!formData.commitment || !formData.compensationPreference || !formData.stage)) ||
                    (currentStep === 4 && formData.skills.length < 3) ||
                    (currentStep === 5 && !formData.location.city)
                  }
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} variant="gradient">
                  Complete Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
