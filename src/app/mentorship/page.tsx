import { Header } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  Users, 
  GraduationCap, 
  ArrowRight,
  CheckCircle,
  Clock,
  Target,
  BookOpen,
  Calendar,
  MessageSquare,
  Award,
  Lightbulb,
  Zap,
  Shield
} from 'lucide-react'
import Link from 'next/link'

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              The Wyatt Works Method
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mentorship That Moves You
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Learn the Wyatt Works Method: from <strong>Spark</strong> to <strong>Build</strong> to <strong>Shift</strong>. 
              Get structure, accountability, and momentum to turn your ideas into impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="gradient" asChild>
                <Link href="#tiers">Choose Your Path</Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="#testimonials">See Success Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers Section */}
      <section id="tiers" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Journey</h2>
            <p className="text-lg text-muted-foreground">
              Three tiers designed to meet you where you are and take you where you want to go
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* The Spark */}
            <Card className="relative">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">The Spark</CardTitle>
                <CardDescription className="text-lg font-semibold text-green-600">Free</CardDescription>
                <p className="text-sm text-muted-foreground mt-2">
                  Perfect for exploring ideas and getting started
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>YouTube playlists & tutorials</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Blueprint downloads & templates</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Weekly challenges & prompts</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Community forum access</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Basic progress tracking</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            {/* The Build */}
            <Card className="relative border-2 border-primary">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                Most Popular
              </Badge>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">The Build</CardTitle>
                <CardDescription className="text-lg font-semibold text-blue-600">$97/month</CardDescription>
                <p className="text-sm text-muted-foreground mt-2">
                  Structured curriculum with peer support
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Everything in The Spark</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Structured 12-week curriculum</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Monthly group Q&A sessions</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Peer accountability pods</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Advanced templates & tools</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Progress reviews & feedback</span>
                  </li>
                </ul>
                <Button className="w-full" variant="gradient">
                  Start Building
                </Button>
              </CardContent>
            </Card>

            {/* The Shift */}
            <Card className="relative">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">The Shift</CardTitle>
                <CardDescription className="text-lg font-semibold text-purple-600">$497/month</CardDescription>
                <p className="text-sm text-muted-foreground mt-2">
                  Personalized 1-on-1 guidance and accountability
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Everything in The Build</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Weekly 1-on-1 sessions</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Personalized roadmap</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Direct access to Wyatt</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Launch review & optimization</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Priority support & feedback</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Apply for The Shift
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How The Method Works</h2>
            <p className="text-lg text-muted-foreground">
              A proven framework that transforms ideas into impact
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <CardTitle>1. Spark Your Idea</CardTitle>
                <CardDescription>
                  Clarify your vision, validate your concept, and create a solid foundation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Idea validation framework</li>
                  <li>• Market research tools</li>
                  <li>• Vision & mission clarity</li>
                  <li>• Initial planning templates</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle>2. Build Your System</CardTitle>
                <CardDescription>
                  Develop your product, establish processes, and create sustainable growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• MVP development roadmap</li>
                  <li>• Process & system design</li>
                  <li>• Team building strategies</li>
                  <li>• Growth & scaling plans</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle>3. Shift Into Impact</CardTitle>
                <CardDescription>
                  Launch successfully, optimize performance, and create lasting legacy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Launch strategy & execution</li>
                  <li>• Performance optimization</li>
                  <li>• Legacy & impact planning</li>
                  <li>• Continuous improvement</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="testimonials" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg text-muted-foreground">
              Real builders who've transformed their ideas using the Wyatt Works Method
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">SM</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Sarah Miller</CardTitle>
                    <CardDescription>Design Tool SaaS Founder</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  "The Build program gave me the structure I needed. Went from idea to $2K MRR 
                  in 6 months. The peer pods were game-changing."
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="success" className="text-xs">$2K MRR</Badge>
                  <span className="text-xs text-muted-foreground">6 months</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">MJ</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Mike Johnson</CardTitle>
                    <CardDescription>Cybersecurity SaaS Founder</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  "The Shift's 1-on-1 sessions helped me navigate complex technical decisions. 
                  Wyatt's guidance was invaluable for our launch strategy."
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="success" className="text-xs">Launched</Badge>
                  <span className="text-xs text-muted-foreground">4 months</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">AL</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Alex Lee</CardTitle>
                    <CardDescription>Marketing Agency Founder</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  "Started with The Spark's free resources, then joined The Build. 
                  The community and accountability made all the difference."
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="success" className="text-xs">$5K MRR</Badge>
                  <span className="text-xs text-muted-foreground">8 months</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about the Wyatt Works Method
            </p>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I know which tier is right for me?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Start with The Spark (free) to explore and validate your idea. If you need structure 
                  and peer support, upgrade to The Build. For personalized guidance and faster progress, 
                  apply for The Shift.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's included in the weekly 1-on-1 sessions?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Each session includes progress review, obstacle troubleshooting, strategic planning, 
                  and personalized guidance. You'll get direct access to Wyatt's expertise and 
                  experience building successful businesses.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I upgrade or downgrade between tiers?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yes! You can upgrade anytime to access more features and support. If you need to 
                  downgrade, we'll work with you to find the right fit for your current needs and budget.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What if I'm not satisfied with the program?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We offer a 30-day money-back guarantee for The Build and The Shift. If you're not 
                  seeing progress or value, we'll refund your investment, no questions asked.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-50 to-purple-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Idea?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join hundreds of builders who are turning their ideas into impact with the Wyatt Works Method.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="gradient" asChild>
              <Link href="#tiers">Choose Your Path</Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="/contact">Schedule a Call</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
