import { Header } from '@/components/navigation'
import { EarlyAccessBanner, EmptyStateNudge, PioneerHighlight } from '@/components/zero-user'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  UserPlus, 
  MapPin, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle,
  Star,
  MessageSquare,
  Lightbulb,
  Target
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <EarlyAccessBanner />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Early Access - Free for Founders, Cofounders, and Collaborators
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find your cofounder.{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
                Build something real.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Whether you&apos;re starting from a spark or ready to scale, Wyatt Works connects founders, 
              cofounders, and collaborators—and gives you the blueprint to launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="gradient" asChild>
                <Link href="/teams">Find a Team</Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/people">Join as Cofounder</Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/mentorship">Get Mentorship</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Trusted by builders in 50+ cities
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              From profile to partnership in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="h-8 w-8 text-white" />
                </div>
                <CardTitle>1. Create Your Profile</CardTitle>
                <CardDescription>
                  Share your skills, intent, and location. Tell us what you're building or what you want to join.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle>2. Match with Teams or Roles</CardTitle>
                <CardDescription>
                  Use filters for equity/paid, time commitment, industry, and location to find your perfect fit.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle>3. Build Together</CardTitle>
                <CardDescription>
                  Connect through local meetups, mentorship, and the Wyatt Works blueprint for structured progress.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Cofounders Wanted */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-12 text-center">
              <Lightbulb className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Cofounders Wanted</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Not everyone has a big idea—but many have big talent. Join as a cofounder and become 
                essential to a mission that matters.
              </p>
              <Button size="lg" variant="gradient" asChild>
                <Link href="/people">Explore Cofounder Opportunities</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Local First */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Local First</h2>
              <p className="text-lg text-muted-foreground mb-8">
                The movement is global—but it starts in your city. Meet up with builders near you, 
                host sprints, and ship faster together.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Weekly coffee meetups and build sessions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>City-specific project showcases</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Local mentorship and accountability</span>
                </div>
              </div>
              <Button size="lg" className="mt-8" asChild>
                <Link href="/local">Find Your Local Hub</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl p-8 text-white">
                <MapPin className="h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Wyatt Works Local</h3>
                <p className="mb-6">
                  Join builders in your city. Share progress, get feedback, and accelerate together.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">Active in 50+ cities</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentorship */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mentorship That Moves You</h2>
            <p className="text-lg text-muted-foreground">
              Learn the Wyatt Works Method: from Spark to Build to Shift. Get structure, accountability, and momentum.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <CardTitle>The Spark (Free)</CardTitle>
                <CardDescription>
                  YouTube playlists, blueprint downloads, weekly challenges
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>The Build (Cohort)</CardTitle>
                <CardDescription>
                  Structured curriculum, templates, monthly Q&A, peer pods
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>The Shift (1-on-1)</CardTitle>
                <CardDescription>
                  Personalized roadmap, accountability, launch review
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="gradient" asChild>
              <Link href="/mentorship">Start Your Journey</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Live Feed Preview */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Happening Now</h2>
            <p className="text-lg text-muted-foreground">
              See the latest projects and people joining the community
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">JS</span>
                  </div>
                  <div>
                    <CardTitle className="text-base">John Smith</CardTitle>
                    <CardDescription className="text-sm">AI Engineer + Growth Marketer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Looking to join an EdTech startup as a technical cofounder. 10-15h/week, equity-focused.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">React</Badge>
                  <Badge variant="secondary" className="text-xs">AI/ML</Badge>
                  <Badge variant="secondary" className="text-xs">Growth</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">🚀 EdTech Learning Platform</CardTitle>
                <CardDescription className="text-sm">Milwaukee, WI • Pre-MVP</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Building personalized learning paths for homeschool families. Need a technical cofounder.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="success" className="text-xs">2 roles open</Badge>
                  <span className="text-xs text-muted-foreground">Posted 2h ago</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">SM</span>
                  </div>
                  <div>
                    <CardTitle className="text-base">Sarah Miller</CardTitle>
                    <CardDescription className="text-sm">UI/UX Designer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Available for part-time design work. Specializing in mobile apps and SaaS interfaces.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Figma</Badge>
                  <Badge variant="secondary" className="text-xs">Mobile</Badge>
                  <Badge variant="secondary" className="text-xs">SaaS</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/teams">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-cyan-50 to-purple-50 border-cyan-200">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Build Together?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join the community of founders, cofounders, and collaborators who are turning ideas into impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" variant="gradient" asChild>
                  <Link href="/people">Start Your Profile</Link>
                </Button>
                <Button size="xl" variant="outline" asChild>
                  <Link href="/teams">Explore Projects</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <span className="font-bold text-xl">Wyatt Works</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The cofounder & community platform for builders who want to make content, not excuses.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/teams" className="hover:text-foreground">Find a Team</Link></li>
                <li><Link href="/people" className="hover:text-foreground">Find People</Link></li>
                <li><Link href="/local" className="hover:text-foreground">Local Hubs</Link></li>
                <li><Link href="/forum" className="hover:text-foreground">Forum</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/mentorship" className="hover:text-foreground">Mentorship</Link></li>
                <li><Link href="/resources" className="hover:text-foreground">Blueprints</Link></li>
                <li><Link href="/resources" className="hover:text-foreground">Templates</Link></li>
                <li><Link href="/resources" className="hover:text-foreground">Tools</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                <li><Link href="/conduct" className="hover:text-foreground">Code of Conduct</Link></li>
                <li><Link href="/safety" className="hover:text-foreground">Safety Guide</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Wyatt Works. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}