import { Header } from '@/components/navigation'
import { EmptyStateNudge, PioneerHighlight } from '@/components/zero-user'
import { ProfileGate } from '@/components/profile-completeness'
import { ShareKit } from '@/components/share-kit'
import { IntroButton } from '@/components/intro-modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users,
  ArrowRight,
  Plus,
  Share2,
  Briefcase,
  Target,
  Calendar,
  Award
} from 'lucide-react'
import Link from 'next/link'

export default function FindTeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 px-4 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find a Team</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover projects looking for cofounders and collaborators. Filter by role, location, 
              compensation, and commitment level.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search projects, roles, or skills..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </div>
            
            {/* Quick Filter Chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                All Projects
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Technical Roles
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Marketing
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Design
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Equity Only
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Paid Roles
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Remote
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Open Projects</h2>
            <ProfileGate 
              requiredCompleteness={70}
              fallbackMessage="Complete your profile to post projects"
            >
              <Button variant="gradient" asChild>
                <Link href="/projects/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Post Your Project
                </Link>
              </Button>
            </ProfileGate>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Project Cards */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">🚀 EdTech Learning Platform</CardTitle>
                    <CardDescription className="mt-1">
                      Building personalized learning paths for homeschool families
                    </CardDescription>
                  </div>
                  <Badge variant="success">2 roles open</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    Milwaukee, WI • Remote OK
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    Pre-MVP Stage
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Equity + Stipend
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">React</Badge>
                    <Badge variant="secondary" className="text-xs">AI/ML</Badge>
                    <Badge variant="secondary" className="text-xs">Education</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">Posted 2h ago</span>
                    <div className="flex items-center space-x-2">
                      <ShareKit
                        type="project"
                        title="EdTech Learning Platform"
                        description="Building personalized learning paths for homeschool families"
                        city="Milwaukee"
                        url="https://wyattworks.com/projects/edtech-platform"
                        role="Technical Cofounder"
                        industry="Education"
                      />
                      <IntroButton
                        project={{
                          id: 'edtech-platform',
                          title: 'EdTech Learning Platform',
                          pitch: 'Building personalized learning paths for homeschool families',
                          location: 'Milwaukee, WI',
                          industry: 'Education',
                          stage: 'MVP'
                        }}
                        role={{
                          id: 'tech-cofounder',
                          title: 'Technical Cofounder',
                          responsibilities: ['Lead technical development', 'Architect system', 'Build MVP'],
                          mustHaves: ['React experience', 'Node.js', 'AI/ML knowledge'],
                          commitment: 'Full-time',
                          compType: 'Equity + Salary',
                          timeline: 'ASAP'
                        }}
                        founder={{
                          id: 'sarah-miller',
                          name: 'Sarah Miller',
                          headline: 'Education entrepreneur with 10+ years experience',
                          skills: ['Education', 'Product Management', 'User Research'],
                          location: 'Milwaukee, WI'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">💡 AI-Powered Analytics Tool</CardTitle>
                    <CardDescription className="mt-1">
                      SaaS platform for small business data insights
                    </CardDescription>
                  </div>
                  <Badge variant="success">1 role open</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    San Francisco, CA • Remote OK
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    MVP Stage
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Equity Only
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">Python</Badge>
                    <Badge variant="secondary" className="text-xs">Data Science</Badge>
                    <Badge variant="secondary" className="text-xs">SaaS</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">Posted 1d ago</span>
                    <Button size="sm" variant="outline">
                      View Details
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">🌱 Sustainable Fashion Marketplace</CardTitle>
                    <CardDescription className="mt-1">
                      Connecting eco-conscious consumers with sustainable brands
                    </CardDescription>
                  </div>
                  <Badge variant="success">3 roles open</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    Austin, TX • Remote OK
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    Early Traction
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Paid + Equity
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">E-commerce</Badge>
                    <Badge variant="secondary" className="text-xs">Marketing</Badge>
                    <Badge variant="secondary" className="text-xs">Sustainability</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">Posted 3d ago</span>
                    <Button size="sm" variant="outline">
                      View Details
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">🏥 HealthTech Mobile App</CardTitle>
                    <CardDescription className="mt-1">
                      Telemedicine platform for rural healthcare access
                    </CardDescription>
                  </div>
                  <Badge variant="success">2 roles open</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    Denver, CO • Remote OK
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    Pre-MVP Stage
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Equity Only
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">React Native</Badge>
                    <Badge variant="secondary" className="text-xs">Healthcare</Badge>
                    <Badge variant="secondary" className="text-xs">Mobile</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">Posted 5d ago</span>
                    <Button size="sm" variant="outline">
                      View Details
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">🎮 Indie Game Studio</CardTitle>
                    <CardDescription className="mt-1">
                      Creating narrative-driven mobile games
                    </CardDescription>
                  </div>
                  <Badge variant="success">1 role open</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    Seattle, WA • Remote OK
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    MVP Stage
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Paid + Equity
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">Unity</Badge>
                    <Badge variant="secondary" className="text-xs">Game Design</Badge>
                    <Badge variant="secondary" className="text-xs">Mobile</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">Posted 1w ago</span>
                    <Button size="sm" variant="outline">
                      View Details
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">🔒 Cybersecurity SaaS</CardTitle>
                    <CardDescription className="mt-1">
                      AI-powered threat detection for small businesses
                    </CardDescription>
                  </div>
                  <Badge variant="success">2 roles open</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    Boston, MA • Remote OK
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    Early Traction
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Equity + Stipend
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">Security</Badge>
                    <Badge variant="secondary" className="text-xs">AI/ML</Badge>
                    <Badge variant="secondary" className="text-xs">SaaS</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">Posted 2w ago</span>
                    <Button size="sm" variant="outline">
                      View Details
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Load More Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Empty State for New Cities */}
      <section className="py-20 px-4 bg-muted/30">
        <EmptyStateNudge 
          type="team" 
          city="Milwaukee" 
        />
      </section>
    </div>
  )
}
