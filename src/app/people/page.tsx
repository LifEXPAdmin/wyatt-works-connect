import { Header } from '@/components/navigation'
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
  MessageCircle,
  Star,
  Award
} from 'lucide-react'
import Link from 'next/link'

export default function FindPeoplePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 px-4 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find People</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with founders, cofounders, and collaborators. Filter by skills, location, 
              availability, and compensation preferences.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search people, skills, or roles..." 
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
                All People
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Founders
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Cofounders
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Collaborators
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Available Now
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Remote Only
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                High IP Score
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* People Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Active Members</h2>
            <Button variant="gradient" asChild>
              <Link href="/profile/new">
                <Users className="h-4 w-4 mr-2" />
                Create Your Profile
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample People Cards */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">John Smith</CardTitle>
                    <CardDescription className="mt-1">
                      AI Engineer + Growth Marketer
                    </CardDescription>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="success" className="text-xs">Available</Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Award className="h-3 w-3 mr-1" />
                        <span>127 IP</span>
                      </div>
                    </div>
                  </div>
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
                    10-15h/week • Equity-focused
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Looking to join an EdTech startup as a technical cofounder. 
                    Passionate about AI and education.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">React</Badge>
                    <Badge variant="secondary" className="text-xs">AI/ML</Badge>
                    <Badge variant="secondary" className="text-xs">Growth</Badge>
                    <Badge variant="secondary" className="text-xs">Python</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="info" className="text-xs">First Ship</Badge>
                      <Badge variant="info" className="text-xs">Cofounder Match</Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Intro
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Sarah Miller</CardTitle>
                    <CardDescription className="mt-1">
                      UI/UX Designer + Product Strategist
                    </CardDescription>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="warning" className="text-xs">Soon</Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Award className="h-3 w-3 mr-1" />
                        <span>89 IP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    Austin, TX • Remote Only
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    15-20h/week • Paid + Equity
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Available for part-time design work. Specializing in mobile apps 
                    and SaaS interfaces with 5+ years experience.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">Figma</Badge>
                    <Badge variant="secondary" className="text-xs">Mobile</Badge>
                    <Badge variant="secondary" className="text-xs">SaaS</Badge>
                    <Badge variant="secondary" className="text-xs">Product</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="info" className="text-xs">100 Helpfuls</Badge>
                      <Badge variant="info" className="text-xs">Local Host</Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Intro
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Mike Johnson</CardTitle>
                    <CardDescription className="mt-1">
                      Full-Stack Developer + DevOps
                    </CardDescription>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="success" className="text-xs">Available</Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Award className="h-3 w-3 mr-1" />
                        <span>156 IP</span>
                      </div>
                    </div>
                  </div>
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
                    20+h/week • Hybrid
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Experienced developer looking to join a mission-driven startup. 
                    Strong in React, Node.js, and cloud infrastructure.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">React</Badge>
                    <Badge variant="secondary" className="text-xs">Node.js</Badge>
                    <Badge variant="secondary" className="text-xs">AWS</Badge>
                    <Badge variant="secondary" className="text-xs">DevOps</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="info" className="text-xs">First Hire</Badge>
                      <Badge variant="info" className="text-xs">Blueprint Grad</Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Intro
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Alex Lee</CardTitle>
                    <CardDescription className="mt-1">
                      Marketing Lead + Content Creator
                    </CardDescription>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="success" className="text-xs">Available</Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Award className="h-3 w-3 mr-1" />
                        <span>203 IP</span>
                      </div>
                    </div>
                  </div>
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
                    10-15h/week • Equity-focused
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Growth marketer with 7+ years experience. Looking to join 
                    a startup in the sustainability or health space.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">SEO</Badge>
                    <Badge variant="secondary" className="text-xs">Content</Badge>
                    <Badge variant="secondary" className="text-xs">Social Media</Badge>
                    <Badge variant="secondary" className="text-xs">Analytics</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="info" className="text-xs">Faith-in-Action</Badge>
                      <Badge variant="info" className="text-xs">Local Host</Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Intro
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback>RD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Rachel Davis</CardTitle>
                    <CardDescription className="mt-1">
                      Product Manager + Business Analyst
                    </CardDescription>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="warning" className="text-xs">Soon</Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Award className="h-3 w-3 mr-1" />
                        <span>142 IP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    Chicago, IL • Remote OK
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    15-20h/week • Paid + Equity
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Strategic PM looking to join a fintech or edtech startup. 
                    Strong background in user research and data analysis.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">Product</Badge>
                    <Badge variant="secondary" className="text-xs">Analytics</Badge>
                    <Badge variant="secondary" className="text-xs">Research</Badge>
                    <Badge variant="secondary" className="text-xs">Strategy</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="info" className="text-xs">First Ship</Badge>
                      <Badge variant="info" className="text-xs">100 Helpfuls</Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Intro
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback>TW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Tom Wilson</CardTitle>
                    <CardDescription className="mt-1">
                      Founder + Technical Lead
                    </CardDescription>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="success" className="text-xs">Available</Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Award className="h-3 w-3 mr-1" />
                        <span>278 IP</span>
                      </div>
                    </div>
                  </div>
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
                    Full-time • Looking for cofounder
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Building a cybersecurity SaaS platform. Looking for a 
                    business cofounder with sales/marketing experience.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">Python</Badge>
                    <Badge variant="secondary" className="text-xs">Security</Badge>
                    <Badge variant="secondary" className="text-xs">SaaS</Badge>
                    <Badge variant="secondary" className="text-xs">Leadership</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="info" className="text-xs">First Ship</Badge>
                      <Badge variant="info" className="text-xs">First Hire</Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Intro
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Load More People
            </Button>
          </div>
        </div>
      </section>

      {/* Empty State for New Cities */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">No one here yet?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Perfect. Be the first to plant your flag. Early builders get seen first and 
            featured in our Local hubs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="gradient" asChild>
              <Link href="/profile/new">Create Your Profile</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/local">Join Your Local Hub</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
