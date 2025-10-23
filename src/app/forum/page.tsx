import { Header } from '@/components/navigation'
import { EmptyStateNudge } from '@/components/zero-user'
import { ProfileGate } from '@/components/profile-completeness'
import { BuildLogTemplate, FirstTimePosterPrompt } from '@/components/build-log-template'
import { InfluencePoints } from '@/components/influence-points'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Plus,
  ArrowRight,
  ThumbsUp,
  Reply,
  Pin,
  Clock,
  MapPin,
  Users,
  Lightbulb,
  HelpCircle,
  Megaphone,
  Code,
  Heart,
  BookOpen,
  DollarSign,
  Scale,
  GraduationCap,
  Award
} from 'lucide-react'
import Link from 'next/link'

const categories = [
  { id: 'announcements', name: 'Announcements', icon: Megaphone, color: 'bg-blue-500', count: 12 },
  { id: 'build-logs', name: 'Build Logs', icon: Code, color: 'bg-green-500', count: 45 },
  { id: 'help-feedback', name: 'Help & Feedback', icon: HelpCircle, color: 'bg-yellow-500', count: 23 },
  { id: 'hiring-looking', name: 'Hiring/Looking', icon: Users, color: 'bg-purple-500', count: 18 },
  { id: 'show-tell', name: 'Show & Tell', icon: Lightbulb, color: 'bg-orange-500', count: 31 },
  { id: 'local-hubs', name: 'Local Hubs', icon: MapPin, color: 'bg-red-500', count: 15 },
  { id: 'faith-work', name: 'Faith & Work', icon: Heart, color: 'bg-pink-500', count: 8 },
  { id: 'tools-ai', name: 'Tools/AI', icon: Code, color: 'bg-cyan-500', count: 27 },
  { id: 'marketing-sales', name: 'Marketing & Sales', icon: DollarSign, color: 'bg-emerald-500', count: 19 },
  { id: 'legal-finance', name: 'Legal/Finance', icon: Scale, color: 'bg-indigo-500', count: 6 },
  { id: 'education-homeschool', name: 'Education/Homeschool', icon: GraduationCap, color: 'bg-teal-500', count: 11 },
]

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 px-4 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Community Forum</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with fellow builders, share your progress, get help, and showcase your work. 
              Make content, not excuses.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search discussions, topics, or people..." 
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
                All Discussions
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Recent Activity
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Most Helpful
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Unsolved
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Near Me
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Discussion Categories</h2>
            <ProfileGate 
              requiredCompleteness={70}
              fallbackMessage="Complete your profile to start discussions"
            >
              <Button variant="gradient" asChild>
                <Link href="/forum/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Start Discussion
                </Link>
              </Button>
            </ProfileGate>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <CardDescription>{category.count} discussions</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" variant="outline" className="w-full">
                      Browse Category
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent Discussions */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Recent Discussions</h2>
            <Button variant="outline" asChild>
              <Link href="/forum/recent">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            {/* Sample Discussion Posts */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <CardTitle className="text-lg">How to validate an EdTech idea before building?</CardTitle>
                        <Badge variant="info" className="text-xs">Build Logs</Badge>
                        <Pin className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <CardDescription className="flex items-center space-x-4">
                        <span>John Smith</span>
                        <div className="flex items-center space-x-1">
                          <Award className="h-3 w-3 text-yellow-600" />
                          <span className="text-xs">127 IP</span>
                        </div>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          2 hours ago
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          Milwaukee, WI
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  I&apos;m working on a personalized learning platform for homeschool families. 
                  Before I dive into development, what are the best ways to validate this idea? 
                  I&apos;m thinking surveys, interviews, and maybe a landing page...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>12 helpful</span>
                    </div>
                    <div className="flex items-center">
                      <Reply className="h-4 w-4 mr-1" />
                      <span>8 replies</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Join Discussion
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <CardTitle className="text-lg">Show & Tell: Launched my first SaaS! 🚀</CardTitle>
                        <Badge variant="success" className="text-xs">Show & Tell</Badge>
                      </div>
                      <CardDescription className="flex items-center space-x-4">
                        <span>Sarah Miller</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          4 hours ago
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          Austin, TX
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  After 6 months of building, I finally launched my design tool SaaS! 
                  First week: 50 signups, $2K MRR. The Wyatt Works blueprint was crucial 
                  for staying focused. Here's what I learned...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>24 helpful</span>
                    </div>
                    <div className="flex items-center">
                      <Reply className="h-4 w-4 mr-1" />
                      <span>15 replies</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Join Discussion
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <CardTitle className="text-lg">Looking for a technical cofounder</CardTitle>
                        <Badge variant="warning" className="text-xs">Hiring/Looking</Badge>
                      </div>
                      <CardDescription className="flex items-center space-x-4">
                        <span>Mike Johnson</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          1 day ago
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          Seattle, WA
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  I'm building a cybersecurity SaaS for small businesses. Need a technical 
                  cofounder with React/Node.js experience. Equity + stipend available. 
                  Looking for someone passionate about security...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>8 helpful</span>
                    </div>
                    <div className="flex items-center">
                      <Reply className="h-4 w-4 mr-1" />
                      <span>5 replies</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Join Discussion
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <CardTitle className="text-lg">Best AI tools for content creation?</CardTitle>
                        <Badge variant="info" className="text-xs">Tools/AI</Badge>
                      </div>
                      <CardDescription className="flex items-center space-x-4">
                        <span>Alex Lee</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          2 days ago
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          San Francisco, CA
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  What AI tools are you using for content creation? Looking for recommendations 
                  for blog posts, social media, and email marketing. Budget is tight, so 
                  free/low-cost options preferred...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>18 helpful</span>
                    </div>
                    <div className="flex items-center">
                      <Reply className="h-4 w-4 mr-1" />
                      <span>12 replies</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Join Discussion
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback>RD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <CardTitle className="text-lg">Milwaukee Hub: Coffee & Code this Saturday</CardTitle>
                        <Badge variant="success" className="text-xs">Local Hubs</Badge>
                      </div>
                      <CardDescription className="flex items-center space-x-4">
                        <span>Rachel Davis</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          3 days ago
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          Milwaukee, WI
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Join us this Saturday at 9 AM for our weekly Coffee & Code meetup! 
                  We'll be sharing progress updates and working on projects together. 
                  Location: Third Space Brewing...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>6 helpful</span>
                    </div>
                    <div className="flex items-center">
                      <Reply className="h-4 w-4 mr-1" />
                      <span>3 replies</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Join Discussion
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Load More Discussions
            </Button>
          </div>
        </div>
      </section>

      {/* Start Discussion CTA */}
      <section className="py-20 px-4">
        <EmptyStateNudge 
          type="forum" 
          city="Milwaukee" 
        />
      </section>
    </div>
  )
}