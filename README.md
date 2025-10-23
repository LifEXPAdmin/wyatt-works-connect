# Wyatt Works - Cofounder & Community Platform

> **Find your cofounder. Build something real.**

Wyatt Works is a comprehensive platform that connects founders, cofounders, and collaborators while providing structured mentorship and local community support. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

### Core Platform
- **Profile System**: Comprehensive profiles with skills, intent, location, and portfolio
- **Project Board**: Post and discover projects looking for cofounders and collaborators
- **People Directory**: Find founders, cofounders, and specialists by skills and location
- **Messaging System**: Secure intro system with templates and safety features
- **Local Hubs**: City-based communities with events and meetups
- **Forum**: Community discussions with categories and gamification
- **Mentorship**: Three-tier system (Spark/Build/Shift) with structured guidance
- **Resources**: Blueprints, templates, calculators, and guides

### Gamification & Trust
- **Influence Points (IP)**: Earn points for contributions and achievements
- **Badge System**: Recognition for milestones and community contributions
- **Reputation System**: Endorsements and verification features
- **Safety Features**: Code of conduct, reporting, and moderation tools

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Clerk
- **File Storage**: Supabase Storage
- **Email**: Resend
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Clerk account
- Resend account (for emails)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd wyatt-works-connect
npm install
```

### 2. Environment Setup

Copy the environment template and fill in your credentials:

```bash
cp env.example .env.local
```

Fill in the following environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Email Configuration
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@wyattworks.com

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the SQL schema from `database/schema.sql` in your Supabase SQL editor
3. Enable Row Level Security (RLS) policies are included in the schema
4. Create a storage bucket named `wyatt-works-storage` for file uploads

### 4. Clerk Setup

1. Create a Clerk account and application
2. Configure the following URLs in Clerk dashboard:
   - Sign-in URL: `http://localhost:3000/sign-in`
   - Sign-up URL: `http://localhost:3000/sign-up`
   - After sign-in URL: `http://localhost:3000/`
   - After sign-up URL: `http://localhost:3000/onboarding`

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── teams/             # Find a Team page
│   ├── people/            # Find People page
│   ├── local/             # Local Hubs page
│   ├── forum/             # Forum page
│   ├── mentorship/         # Mentorship page
│   ├── resources/         # Resources page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   └── navigation.tsx    # Main navigation
├── lib/                  # Utilities and configurations
│   ├── types.ts          # TypeScript type definitions
│   ├── utils.ts          # Utility functions
│   ├── supabase.ts       # Supabase client and types
│   └── database.ts       # Database functions
└── database/             # Database schema and migrations
    └── schema.sql        # Complete database schema
```

## 🎯 Key Features Implementation

### Profile System
- Multi-role support (Founder, Cofounder, Collaborator, Mentor)
- Skills and industry tagging
- Location-based matching
- Portfolio integration
- Influence Points and badges

### Project Board
- Structured project posting with roles
- Advanced filtering and search
- Equity and compensation transparency
- Milestone tracking
- Team collaboration tools

### Local Hubs
- City-based community organization
- Event management and RSVP
- Member directories
- Hub-specific discussions

### Messaging System
- Template-based introductions
- Project-specific messaging
- Safety features and moderation
- Email notifications

### Gamification
- Influence Points for contributions
- Badge system for achievements
- Leaderboards and recognition
- Community engagement metrics

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Functions

The `src/lib/database.ts` file contains all database interaction functions:

- Profile management (CRUD operations)
- Project management (CRUD operations)
- Message handling
- Forum post management
- Local hub operations
- Event management
- Badge and reputation system

### Component Library

Built with Radix UI primitives and custom styling:

- `Button` - Various button styles including gradient
- `Card` - Content containers
- `Badge` - Status and category indicators
- `Avatar` - User profile images
- `Input` - Form inputs
- `Textarea` - Multi-line text input

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📊 Database Schema

The database includes the following main tables:

- `profiles` - User profiles with skills and preferences
- `projects` - Project listings with roles and requirements
- `messages` - Direct messaging between users
- `forum_posts` - Community discussions
- `local_hubs` - City-based communities
- `events` - Local hub events and meetups
- `badges` - Achievement and recognition system
- `hub_memberships` - User hub associations
- `project_applications` - Applications to project roles
- `forum_replies` - Forum post responses
- `endorsements` - User testimonials and recommendations

## 🔒 Security Features

- Row Level Security (RLS) policies for data protection
- Input validation and sanitization
- Rate limiting for API endpoints
- Secure file upload handling
- Content moderation tools
- User reporting and blocking features

## 📈 Analytics & Monitoring

- User engagement tracking
- Community health metrics
- Project success rates
- Local hub activity monitoring
- Mentorship program effectiveness

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Join the Wyatt Works community forum
- Contact the development team

## 🎉 Acknowledgments

- Built with the Wyatt Works Method framework
- Inspired by the entrepreneurial community
- Designed for faith-friendly, family-centered values
- Community-driven development approach

---

**Make content, not excuses.** - The Wyatt Works Motto