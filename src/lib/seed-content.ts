// Seed content for the platform
// This would typically be loaded from a database or CMS
// For now, we'll create sample data to populate the platform

export const SAMPLE_PROFILES = [
  {
    id: 'sample-profile-1',
    name: 'Sarah Miller',
    headline: 'Education entrepreneur with 10+ years experience',
    roles: ['Founder'],
    location: 'Milwaukee, WI',
    skills: ['Education', 'Product Management', 'User Research', 'Strategy'],
    industries: ['Education', 'Technology'],
    bio: 'Passionate about transforming education through technology. Previously led product at two EdTech startups.',
    portfolio: {
      linkedin: 'https://linkedin.com/in/sarahmiller',
      website: 'https://sarahmiller.com'
    },
    availability: 'Full-time',
    commitment: 'cofounder',
    isSample: true,
    ip: 127,
    badges: ['City Founder', 'First Ship'],
    joinedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'sample-profile-2',
    name: 'Mike Johnson',
    headline: 'Full-stack developer and technical cofounder',
    roles: ['Technical Cofounder', 'Collaborator'],
    location: 'Austin, TX',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'AI/ML'],
    industries: ['Technology', 'SaaS'],
    bio: 'Full-stack developer with 8 years experience building scalable web applications. Looking for the right opportunity to cofound.',
    portfolio: {
      github: 'https://github.com/mikejohnson',
      website: 'https://mikejohnson.dev'
    },
    availability: 'Full-time',
    commitment: 'cofounder',
    isSample: true,
    ip: 89,
    badges: ['First Five'],
    joinedAt: '2024-01-18T14:20:00Z'
  },
  {
    id: 'sample-profile-3',
    name: 'Alex Lee',
    headline: 'Business development and growth specialist',
    roles: ['Business Cofounder', 'Mentor'],
    location: 'San Francisco, CA',
    skills: ['Business Development', 'Growth', 'Sales', 'Marketing', 'Strategy'],
    industries: ['Technology', 'SaaS', 'Mobile Apps'],
    bio: 'Business development expert with a track record of scaling startups from 0 to 1M+ users. Available for cofounder opportunities.',
    portfolio: {
      linkedin: 'https://linkedin.com/in/alexlee',
      twitter: 'https://twitter.com/alexlee'
    },
    availability: 'Part-time',
    commitment: 'cofounder',
    isSample: true,
    ip: 156,
    badges: ['Lighthouse', 'City Founder'],
    joinedAt: '2024-01-10T09:15:00Z'
  }
]

export const SAMPLE_PROJECTS = [
  {
    id: 'sample-project-1',
    title: 'EdTech Learning Platform',
    pitch: 'Building personalized learning paths for homeschool families',
    stage: 'mvp',
    industry: 'Education',
    location: 'Milwaukee, WI',
    remote: true,
    vision: {
      problem: 'Homeschool families struggle to find personalized, engaging curriculum that adapts to their children\'s learning styles.',
      solution: 'AI-powered learning platform that creates custom educational paths based on each child\'s strengths and interests.',
      whyNow: 'Homeschooling has grown 200% since 2020, creating a massive market opportunity.'
    },
    milestones: {
      thirty: 'Complete user research and validate core features',
      sixty: 'Launch MVP with 100 beta families',
      ninety: 'Reach 500 active users and $10K MRR'
    },
    team: {
      current: 'Sarah (Founder) + 2 part-time developers',
      culture: 'Mission-driven, collaborative, data-informed'
    },
    roles: [
      {
        id: 'sample-role-1',
        title: 'Technical Cofounder',
        responsibilities: [
          'Lead technical architecture and development',
          'Build scalable backend infrastructure',
          'Implement AI/ML learning algorithms',
          'Manage development team'
        ],
        mustHaves: [
          'React/Node.js experience',
          'AI/ML knowledge',
          'Education industry experience',
          'Startup experience'
        ],
        commitment: 'full-time',
        compType: 'hybrid',
        timeline: 'ASAP'
      }
    ],
    founder: SAMPLE_PROFILES[0],
    status: 'open',
    createdAt: '2024-01-20T10:30:00Z',
    isSample: true
  },
  {
    id: 'sample-project-2',
    title: 'AI-Powered Analytics Tool',
    pitch: 'SaaS platform for small business data insights',
    stage: 'idea',
    industry: 'Technology',
    location: 'San Francisco, CA',
    remote: true,
    vision: {
      problem: 'Small businesses have data but lack the tools and expertise to extract actionable insights.',
      solution: 'No-code AI platform that automatically analyzes business data and provides actionable recommendations.',
      whyNow: 'AI tools are becoming accessible to non-technical users, creating a huge opportunity.'
    },
    milestones: {
      thirty: 'Validate problem with 50 small business owners',
      sixty: 'Build MVP with core analytics features',
      ninety: 'Launch beta with 20 paying customers'
    },
    team: {
      current: 'Alex (Founder) + 1 technical advisor',
      culture: 'Customer-obsessed, fast-moving, data-driven'
    },
    roles: [
      {
        id: 'sample-role-2',
        title: 'Technical Cofounder',
        responsibilities: [
          'Build the core analytics engine',
          'Design and implement AI algorithms',
          'Create intuitive user interface',
          'Scale the platform infrastructure'
        ],
        mustHaves: [
          'Python/ML experience',
          'Frontend development skills',
          'SaaS experience',
          'Strong technical leadership'
        ],
        commitment: 'full-time',
        compType: 'equity',
        timeline: 'Q1 2024'
      }
    ],
    founder: SAMPLE_PROFILES[2],
    status: 'open',
    createdAt: '2024-01-22T16:45:00Z',
    isSample: true
  }
]

export const SAMPLE_EVENTS = [
  {
    id: 'sample-event-1',
    title: 'Milwaukee Founders Coffee Chat',
    description: 'Weekly virtual coffee chat for founders and cofounders in Milwaukee. Share updates, get feedback, and connect.',
    type: 'virtual',
    date: '2024-01-25T10:00:00Z',
    duration: 60,
    location: 'Virtual (Zoom)',
    organizer: SAMPLE_PROFILES[0],
    attendees: [SAMPLE_PROFILES[0], SAMPLE_PROFILES[1]],
    maxAttendees: 20,
    status: 'upcoming',
    isSample: true,
    createdAt: '2024-01-20T10:30:00Z'
  }
]

export const SAMPLE_FORUM_POSTS = [
  {
    id: 'sample-post-1',
    title: 'How to validate an EdTech idea before building?',
    content: `I'm working on an EdTech platform for homeschool families and want to make sure I'm solving a real problem before investing months in development.

**What I've done so far:**
- Interviewed 15 homeschool parents
- Surveyed 100+ families
- Built a simple landing page

**Questions I have:**
- How many interviews is enough?
- What metrics should I track?
- When do you know it's time to start building?

Would love to hear from other EdTech founders about their validation process!`,
    category: 'help-feedback',
    postType: 'question',
    author: SAMPLE_PROFILES[0],
    tags: ['edtech', 'validation', 'user-research', 'mvp'],
    location: 'Milwaukee, WI',
    createdAt: '2024-01-20T10:30:00Z',
    replies: 3,
    helpful: 8,
    isSample: true
  },
  {
    id: 'sample-post-2',
    title: 'Day 5: MVP Progress Update',
    content: `## Yesterday
- Completed user authentication flow
- Set up basic dashboard layout
- Fixed 3 critical bugs

## Today
- Implementing core learning path algorithm
- Working on progress tracking features
- Planning user testing session

## Blockers
- Need help with AI recommendation engine
- Looking for beta testers in Milwaukee area

## Ask for Help
- Anyone with experience building recommendation systems?
- Know any homeschool families who might want to test?`,
    category: 'build-logs',
    postType: 'showcase',
    author: SAMPLE_PROFILES[0],
    tags: ['build-log', 'progress', 'mvp', 'edtech'],
    location: 'Milwaukee, WI',
    createdAt: '2024-01-19T14:20:00Z',
    replies: 2,
    helpful: 5,
    isSample: true
  }
]

// Helper functions to get sample data
export function getSampleProfiles() {
  return SAMPLE_PROFILES
}

export function getSampleProjects() {
  return SAMPLE_PROJECTS
}

export function getSampleEvents() {
  return SAMPLE_EVENTS
}

export function getSampleForumPosts() {
  return SAMPLE_FORUM_POSTS
}

export function getSampleContentByLocation(location: string) {
  const city = location.toLowerCase()
  
  return {
    profiles: SAMPLE_PROFILES.filter(p => p.location.toLowerCase().includes(city)),
    projects: SAMPLE_PROJECTS.filter(p => p.location.toLowerCase().includes(city)),
    events: SAMPLE_EVENTS.filter(e => e.location.toLowerCase().includes(city)),
    posts: SAMPLE_FORUM_POSTS.filter(p => p.location.toLowerCase().includes(city))
  }
}
