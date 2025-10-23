import { z } from 'zod'

// User roles
export const UserRoleSchema = z.enum(['founder', 'cofounder', 'collaborator', 'mentor', 'investor'])
export type UserRole = z.infer<typeof UserRoleSchema>

// Commitment levels
export const CommitmentSchema = z.enum(['5-10h', '10-20h', '20+h', 'full-time'])
export type Commitment = z.infer<typeof CommitmentSchema>

// Compensation preferences
export const CompensationSchema = z.enum(['equity', 'paid', 'hybrid', 'volunteer'])
export type Compensation = z.infer<typeof CompensationSchema>

// Project stages
export const ProjectStageSchema = z.enum(['exploring', 'pre-mvp', 'mvp', 'early-traction', 'scaling'])
export type ProjectStage = z.infer<typeof ProjectStageSchema>

// Availability
export const AvailabilitySchema = z.enum(['immediate', 'soon', 'later'])
export type Availability = z.infer<typeof AvailabilitySchema>

// Profile schema
export const ProfileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string().min(1, 'Name is required'),
  headline: z.string().min(10, 'Headline must be at least 10 characters'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  photo: z.string().url().optional(),
  location: z.object({
    city: z.string(),
    state: z.string(),
    country: z.string(),
    timezone: z.string(),
  }),
  roles: z.array(UserRoleSchema).min(1, 'At least one role is required'),
  intent: z.array(z.enum(['join-team', 'recruit-cofounders', 'paid-gigs', 'equity-only', 'mentorship', 'accountability'])),
  commitment: CommitmentSchema,
  compensationPreference: CompensationSchema,
  stage: ProjectStageSchema,
  skills: z.array(z.string()).min(3, 'At least 3 skills are required'),
  industries: z.array(z.string()).max(5, 'Maximum 5 industries allowed'),
  portfolio: z.object({
    github: z.string().url().optional(),
    behance: z.string().url().optional(),
    website: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    youtube: z.string().url().optional(),
  }).optional(),
  values: z.array(z.string()).optional(),
  availability: AvailabilitySchema,
  willingToRelocate: z.boolean().default(false),
  remoteOnly: z.boolean().default(false),
  influencePoints: z.number().default(0),
  badges: z.array(z.string()).default([]),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Profile = z.infer<typeof ProfileSchema>

// Project schema
export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required').max(70, 'Title must be less than 70 characters'),
  pitch: z.string().min(1, 'Pitch is required').max(140, 'Pitch must be less than 140 characters'),
  description: z.string().min(1, 'Description is required'),
  stage: ProjectStageSchema,
  industry: z.string().min(1, 'Industry is required'),
  location: z.object({
    city: z.string(),
    state: z.string(),
    country: z.string(),
    remote: z.boolean().default(false),
  }),
  vision: z.object({
    problem: z.string().max(300, 'Problem description must be less than 300 characters'),
    solution: z.string().max(300, 'Solution description must be less than 300 characters'),
    whyNow: z.string().max(300, 'Why now must be less than 300 characters'),
  }),
  milestones: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    targetDate: z.date(),
    completed: z.boolean().default(false),
  })),
  roles: z.array(z.object({
    id: z.string(),
    title: z.string(),
    responsibilities: z.array(z.string()),
    mustHaves: z.array(z.string()),
    niceToHaves: z.array(z.string()).optional(),
    commitment: CommitmentSchema,
    compensation: z.object({
      type: CompensationSchema,
      equity: z.number().min(0).max(100).optional(),
      stipend: z.number().min(0).optional(),
      salaryRange: z.object({
        min: z.number().min(0),
        max: z.number().min(0),
      }).optional(),
    }),
    timeline: z.string(),
    reportingTo: z.string().optional(),
  })),
  team: z.array(z.object({
    userId: z.string(),
    role: z.string(),
    bio: z.string(),
  })),
  links: z.object({
    website: z.string().url().optional(),
    deck: z.string().url().optional(),
    prototype: z.string().url().optional(),
    repo: z.string().url().optional(),
  }).optional(),
  status: z.enum(['open', 'interviewing', 'filled', 'on-hold', 'closed']).default('open'),
  founderId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Project = z.infer<typeof ProjectSchema>

// Message/Intro schema
export const MessageSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  recipientId: z.string(),
  subject: z.string(),
  content: z.string(),
  template: z.string().optional(),
  projectId: z.string().optional(),
  read: z.boolean().default(false),
  replied: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Message = z.infer<typeof MessageSchema>

// Forum post schema
export const ForumPostSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  category: z.enum([
    'announcements',
    'build-logs',
    'help-feedback',
    'hiring-looking',
    'show-tell',
    'local-hubs',
    'faith-work',
    'tools-ai',
    'marketing-sales',
    'legal-finance',
    'education-homeschool'
  ]),
  postType: z.enum(['question', 'showcase', 'opportunity', 'event']),
  tags: z.array(z.string()),
  location: z.string().optional(),
  authorId: z.string(),
  upvotes: z.number().default(0),
  replies: z.number().default(0),
  solved: z.boolean().default(false),
  pinned: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type ForumPost = z.infer<typeof ForumPostSchema>

// Local hub schema
export const LocalHubSchema = z.object({
  id: z.string(),
  name: z.string(),
  region: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  description: z.string(),
  memberCount: z.number().default(0),
  organizerIds: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type LocalHub = z.infer<typeof LocalHubSchema>

// Event schema
export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.date(),
  time: z.string(),
  venue: z.string().optional(),
  virtualLink: z.string().url().optional(),
  hostId: z.string(),
  hubId: z.string(),
  capacity: z.number().optional(),
  attendees: z.array(z.string()).default([]),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Event = z.infer<typeof EventSchema>

// Badge schema
export const BadgeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  category: z.enum(['achievement', 'community', 'milestone', 'special']),
  requirements: z.object({
    type: z.string(),
    value: z.number(),
  }),
  createdAt: z.date(),
})

export type Badge = z.infer<typeof BadgeSchema>

// Common skill tags
export const SKILL_TAGS = [
  'AI/ML', 'React', 'Next.js', 'TypeScript', 'Python', 'Swift', 'iOS', 'Android',
  'UI/UX Design', 'Brand Design', 'Growth Marketing', 'Content Marketing', 'SEO',
  'Social Media', 'Sales', 'Business Development', 'Operations', 'Finance',
  'Legal', 'Community Management', 'Video Production', 'No-Code', 'Automation',
  'Data Analysis', 'Product Management', 'Project Management', 'DevOps',
  'Backend Development', 'Frontend Development', 'Mobile Development',
  'Web Development', 'Database Design', 'API Development', 'Cloud Computing'
] as const

// Industry tags
export const INDUSTRY_TAGS = [
  'Technology', 'Healthcare', 'Education', 'Finance', 'E-commerce', 'SaaS',
  'Mobile Apps', 'Web Apps', 'AI/ML', 'Blockchain', 'Gaming', 'Media',
  'Real Estate', 'Transportation', 'Food & Beverage', 'Fashion', 'Beauty',
  'Fitness', 'Travel', 'Entertainment', 'Social Impact', 'Non-profit',
  'Manufacturing', 'Agriculture', 'Energy', 'Security', 'Legal Tech',
  'EdTech', 'FinTech', 'HealthTech', 'PropTech', 'CleanTech'
] as const

// Values tags
export const VALUES_TAGS = [
  'faith-friendly', 'family-first', 'open-source', 'bootstrapper', 'mission-driven',
  'data-driven', 'customer-focused', 'transparent', 'collaborative', 'innovative',
  'sustainable', 'inclusive', 'remote-first', 'work-life-balance', 'growth-oriented'
] as const
