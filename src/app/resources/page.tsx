import { Header } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Filter, 
  Download, 
  BookOpen,
  FileText,
  Calculator,
  ArrowRight,
  Star,
  Clock,
  Users,
  Target,
  Lightbulb,
  Zap,
  Shield,
  DollarSign,
  TrendingUp,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

const resources = [
  {
    id: 'spark-blueprint',
    title: 'The Spark Blueprint',
    description: 'Complete guide to validating your idea and creating a solid foundation',
    type: 'Blueprint',
    icon: Lightbulb,
    color: 'bg-yellow-500',
    downloads: 1247,
    rating: 4.9,
    tags: ['validation', 'ideation', 'planning'],
    free: true
  },
  {
    id: 'build-roadmap',
    title: 'The Build Roadmap',
    description: 'Step-by-step guide to developing your MVP and establishing processes',
    type: 'Blueprint',
    icon: Target,
    color: 'bg-blue-500',
    downloads: 892,
    rating: 4.8,
    tags: ['mvp', 'development', 'processes'],
    free: false
  },
  {
    id: 'shift-strategy',
    title: 'The Shift Strategy',
    description: 'Launch strategy and optimization framework for sustainable growth',
    type: 'Blueprint',
    icon: Zap,
    color: 'bg-purple-500',
    downloads: 634,
    rating: 4.9,
    tags: ['launch', 'growth', 'optimization'],
    free: false
  },
  {
    id: 'equity-calculator',
    title: 'Equity Calculator',
    description: 'Tool to calculate fair equity splits for cofounders and early employees',
    type: 'Calculator',
    icon: Calculator,
    color: 'bg-green-500',
    downloads: 2156,
    rating: 4.7,
    tags: ['equity', 'cofounders', 'compensation'],
    free: true
  },
  {
    id: 'runway-calculator',
    title: 'Runway Calculator',
    description: 'Calculate how long your startup can survive with current burn rate',
    type: 'Calculator',
    icon: TrendingUp,
    color: 'bg-emerald-500',
    downloads: 1834,
    rating: 4.8,
    tags: ['finance', 'runway', 'burn-rate'],
    free: true
  },
  {
    id: 'pitch-deck-template',
    title: 'Pitch Deck Template',
    description: 'Professional pitch deck template with proven structure and examples',
    type: 'Template',
    icon: FileText,
    color: 'bg-orange-500',
    downloads: 1456,
    rating: 4.6,
    tags: ['pitch', 'presentation', 'fundraising'],
    free: false
  },
  {
    id: 'legal-checklist',
    title: 'Legal Checklist',
    description: 'Essential legal considerations for startups and early-stage companies',
    type: 'Checklist',
    icon: Shield,
    color: 'bg-red-500',
    downloads: 978,
    rating: 4.5,
    tags: ['legal', 'compliance', 'startup'],
    free: true
  },
  {
    id: 'hiring-guide',
    title: 'Hiring Guide',
    description: 'Complete guide to hiring your first employees and building a team',
    type: 'Guide',
    icon: Users,
    color: 'bg-cyan-500',
    downloads: 723,
    rating: 4.7,
    tags: ['hiring', 'team-building', 'hr'],
    free: false
  },
  {
    id: 'marketing-playbook',
    title: 'Marketing Playbook',
    description: 'Comprehensive marketing strategies for early-stage startups',
    type: 'Playbook',
    icon: DollarSign,
    color: 'bg-pink-500',
    downloads: 1123,
    rating: 4.6,
    tags: ['marketing', 'growth', 'strategy'],
    free: false
  }
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 px-4 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Resources Library</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Blueprints, templates, calculators, and guides to accelerate your journey from idea to impact. 
              Make content, not excuses.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search resources, topics, or tools..." 
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
                All Resources
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Free Resources
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Blueprints
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Templates
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Calculators
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Most Popular
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Resources</h2>
            <Button variant="outline" asChild>
              <Link href="/resources/all">
                View All Resources
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => {
              const Icon = resource.icon
              return (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`w-12 h-12 ${resource.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <CardTitle className="text-lg">{resource.title}</CardTitle>
                            {resource.free && (
                              <Badge variant="success" className="text-xs">Free</Badge>
                            )}
                          </div>
                          <CardDescription className="text-sm">
                            {resource.type}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {resource.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Download className="h-3 w-3 mr-1" />
                          <span>{resource.downloads.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 mr-1 text-yellow-500" />
                          <span>{resource.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button size="sm" variant="outline" className="w-full">
                      <Download className="h-3 w-3 mr-1" />
                      {resource.free ? 'Download Free' : 'Get Access'}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Resource Categories</h2>
            <p className="text-lg text-muted-foreground">
              Organized by stage and focus area to help you find exactly what you need
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <CardTitle>The Spark</CardTitle>
                <CardDescription>Ideation & Validation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                  <li>• Idea validation framework</li>
                  <li>• Market research tools</li>
                  <li>• Vision & mission templates</li>
                  <li>• Initial planning guides</li>
                </ul>
                <Button size="sm" variant="outline" className="w-full">
                  Browse Resources
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle>The Build</CardTitle>
                <CardDescription>Development & Process</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                  <li>• MVP development roadmap</li>
                  <li>• Process & system templates</li>
                  <li>• Team building guides</li>
                  <li>• Growth planning tools</li>
                </ul>
                <Button size="sm" variant="outline" className="w-full">
                  Browse Resources
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle>The Shift</CardTitle>
                <CardDescription>Launch & Scale</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                  <li>• Launch strategy guides</li>
                  <li>• Performance optimization</li>
                  <li>• Legacy planning tools</li>
                  <li>• Continuous improvement</li>
                </ul>
                <Button size="sm" variant="outline" className="w-full">
                  Browse Resources
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Legal & Finance</CardTitle>
                <CardDescription>Compliance & Money</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                  <li>• Legal compliance checklists</li>
                  <li>• Financial planning tools</li>
                  <li>• Equity & compensation guides</li>
                  <li>• Risk management templates</li>
                </ul>
                <Button size="sm" variant="outline" className="w-full">
                  Browse Resources
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular This Week */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Popular This Week</h2>
            <Button variant="outline" asChild>
              <Link href="/resources/trending">
                View Trending
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Calculator className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Equity Calculator</CardTitle>
                    <CardDescription className="text-sm">2,156 downloads</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="success" className="text-xs">Free</Badge>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Get
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Spark Blueprint</CardTitle>
                    <CardDescription className="text-sm">1,247 downloads</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="success" className="text-xs">Free</Badge>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Get
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Runway Calculator</CardTitle>
                    <CardDescription className="text-sm">1,834 downloads</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="success" className="text-xs">Free</Badge>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Get
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Legal Checklist</CardTitle>
                    <CardDescription className="text-sm">978 downloads</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="success" className="text-xs">Free</Badge>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Get
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-50 to-purple-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Get New Resources First</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Be the first to access new blueprints, templates, and tools as they're released. 
            Plus get exclusive content and early access to programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input placeholder="Enter your email" className="flex-1" />
            <Button size="lg" variant="gradient">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>
    </div>
  )
}
