import { Header } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  MapPin, 
  Users, 
  Calendar, 
  Plus,
  Search,
  Filter,
  ArrowRight,
  Coffee,
  Code,
  Presentation,
  Building
} from 'lucide-react'
import Link from 'next/link'

export default function LocalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 px-4 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Wyatt Works Local</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The movement is global—but it starts in your city. Meet up with builders near you, 
              host sprints, and ship faster together.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search cities or regions..." 
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
                All Hubs
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Active This Week
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                New Hubs
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Upcoming Events
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Near Me
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hubs */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Local Hubs</h2>
            <Button variant="gradient" asChild>
              <Link href="/local/new">
                <Plus className="h-4 w-4 mr-2" />
                Start a Hub
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Hub Cards */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                      Milwaukee, WI
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Wisconsin's startup hub
                    </CardDescription>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    47 members • 3 organizers
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Next event: Coffee & Code (Dec 15)
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Weekly meetups, build sprints, and mentorship for Wisconsin builders.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">Weekly Meetups</Badge>
                    <Badge variant="secondary" className="text-xs">Build Sprints</Badge>
                    <Badge variant="secondary" className="text-xs">Mentorship</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">Founded 2 months ago</span>
                    <Button size="sm" variant="outline">
                      Join Hub
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
                    <CardTitle className="text-lg flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-green-600" />
                      Austin, TX
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Texas innovation center
                    </CardDescription>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    89 members • 5 organizers
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Next event: Startup Pitch Night (Dec 18)
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Thriving community with monthly pitch nights and co-working sessions.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">Pitch Nights</Badge>
                    <Badge variant="secondary" className="text-xs">Co-working</Badge>
                    <Badge variant="secondary" className="text-xs">Networking</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">Founded 6 months ago</span>
                    <Button size="sm" variant="outline">
                      Join Hub
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
                    <CardTitle className="text-lg flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-purple-600" />
                      Seattle, WA
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Pacific Northwest tech hub
                    </CardDescription>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    156 members • 7 organizers
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Next event: AI Workshop (Dec 20)
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Focus on AI, gaming, and cloud technologies with regular workshops.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">AI Workshops</Badge>
                    <Badge variant="secondary" className="text-xs">Gaming</Badge>
                    <Badge variant="secondary" className="text-xs">Cloud Tech</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">Founded 1 year ago</span>
                    <Button size="sm" variant="outline">
                      Join Hub
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
                    <CardTitle className="text-lg flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-orange-600" />
                      Denver, CO
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Rocky Mountain startup scene
                    </CardDescription>
                  </div>
                  <Badge variant="warning">Growing</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    23 members • 2 organizers
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Next event: Founder Coffee (Dec 22)
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    New hub focused on outdoor tech and sustainability startups.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">Outdoor Tech</Badge>
                    <Badge variant="secondary" className="text-xs">Sustainability</Badge>
                    <Badge variant="secondary" className="text-xs">Founder Coffee</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">Founded 1 month ago</span>
                    <Button size="sm" variant="outline">
                      Join Hub
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
                    <CardTitle className="text-lg flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-red-600" />
                      Chicago, IL
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Midwest business hub
                    </CardDescription>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    67 members • 4 organizers
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Next event: Business Strategy Workshop (Dec 25)
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Strong focus on B2B SaaS and enterprise solutions.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">B2B SaaS</Badge>
                    <Badge variant="secondary" className="text-xs">Enterprise</Badge>
                    <Badge variant="secondary" className="text-xs">Strategy</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">Founded 4 months ago</span>
                    <Button size="sm" variant="outline">
                      Join Hub
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
                    <CardTitle className="text-lg flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-cyan-600" />
                      San Francisco, CA
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Silicon Valley innovation
                    </CardDescription>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    234 members • 12 organizers
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Next event: VC Office Hours (Dec 28)
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Largest hub with regular VC office hours and demo days.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">VC Office Hours</Badge>
                    <Badge variant="secondary" className="text-xs">Demo Days</Badge>
                    <Badge variant="secondary" className="text-xs">Networking</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">Founded 2 years ago</span>
                    <Button size="sm" variant="outline">
                      Join Hub
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Load More Hubs
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <Button variant="outline" asChild>
              <Link href="/events">
                View All Events
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Coffee className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Coffee & Code</CardTitle>
                    <CardDescription>Milwaukee, WI</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Dec 15, 2024 • 9:00 AM
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Weekly meetup for builders to share progress and get feedback.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <Badge variant="success" className="text-xs">12 attending</Badge>
                    <Button size="sm" variant="outline">RSVP</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Presentation className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Startup Pitch Night</CardTitle>
                    <CardDescription>Austin, TX</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Dec 18, 2024 • 6:00 PM
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Monthly pitch night with local investors and founders.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <Badge variant="success" className="text-xs">28 attending</Badge>
                    <Button size="sm" variant="outline">RSVP</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">AI Workshop</CardTitle>
                    <CardDescription>Seattle, WA</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Dec 20, 2024 • 2:00 PM
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Hands-on workshop on building AI-powered applications.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <Badge variant="success" className="text-xs">15 attending</Badge>
                    <Button size="sm" variant="outline">RSVP</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Start Your Own Hub */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">Start Your Own Hub</h2>
          <p className="text-lg text-muted-foreground mb-8">
            No hub in your city yet? Perfect. Be the City Founder and lead your local 
            community of builders. We'll help you get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="gradient" asChild>
              <Link href="/local/new">Start a Hub</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/resources/hub-guide">Hub Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
