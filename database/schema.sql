-- Wyatt Works Database Schema
-- This file contains the complete database schema for the Wyatt Works platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create custom types
CREATE TYPE user_role AS ENUM ('founder', 'cofounder', 'collaborator', 'mentor', 'investor');
CREATE TYPE commitment_level AS ENUM ('5-10h', '10-20h', '20+h', 'full-time');
CREATE TYPE compensation_type AS ENUM ('equity', 'paid', 'hybrid', 'volunteer');
CREATE TYPE project_stage AS ENUM ('exploring', 'pre-mvp', 'mvp', 'early-traction', 'scaling');
CREATE TYPE availability_status AS ENUM ('immediate', 'soon', 'later');
CREATE TYPE project_status AS ENUM ('open', 'interviewing', 'filled', 'on-hold', 'closed');
CREATE TYPE post_type AS ENUM ('question', 'showcase', 'opportunity', 'event');
CREATE TYPE badge_category AS ENUM ('achievement', 'community', 'milestone', 'special');

-- Profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    headline TEXT NOT NULL CHECK (char_length(headline) >= 10),
    bio TEXT CHECK (char_length(bio) <= 500),
    photo TEXT,
    location JSONB NOT NULL,
    roles user_role[] NOT NULL CHECK (array_length(roles, 1) > 0),
    intent TEXT[] NOT NULL,
    commitment commitment_level NOT NULL,
    compensation_preference compensation_type NOT NULL,
    stage project_stage NOT NULL,
    skills TEXT[] NOT NULL CHECK (array_length(skills, 1) >= 3),
    industries TEXT[] NOT NULL CHECK (array_length(industries, 1) <= 5),
    portfolio JSONB,
    values TEXT[],
    availability availability_status NOT NULL,
    willing_to_relocate BOOLEAN DEFAULT false,
    remote_only BOOLEAN DEFAULT false,
    influence_points INTEGER DEFAULT 0,
    badges TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL CHECK (char_length(title) <= 70),
    pitch TEXT NOT NULL CHECK (char_length(pitch) <= 140),
    description TEXT NOT NULL,
    stage project_stage NOT NULL,
    industry TEXT NOT NULL,
    location JSONB NOT NULL,
    vision JSONB NOT NULL,
    milestones JSONB NOT NULL DEFAULT '[]',
    roles JSONB NOT NULL DEFAULT '[]',
    team JSONB NOT NULL DEFAULT '[]',
    links JSONB,
    status project_status DEFAULT 'open',
    founder_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id TEXT NOT NULL,
    recipient_id TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    template TEXT,
    project_id UUID REFERENCES projects(id),
    read BOOLEAN DEFAULT false,
    replied BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Forum posts table
CREATE TABLE forum_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    post_type post_type NOT NULL,
    tags TEXT[] DEFAULT '{}',
    location TEXT,
    author_id TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    replies INTEGER DEFAULT 0,
    solved BOOLEAN DEFAULT false,
    pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Local hubs table
CREATE TABLE local_hubs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    region TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    description TEXT NOT NULL,
    member_count INTEGER DEFAULT 0,
    organizer_ids TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    venue TEXT,
    virtual_link TEXT,
    host_id TEXT NOT NULL,
    hub_id UUID REFERENCES local_hubs(id),
    capacity INTEGER,
    attendees TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Badges table
CREATE TABLE badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    category badge_category NOT NULL,
    requirements JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User hub memberships table
CREATE TABLE hub_memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    hub_id UUID REFERENCES local_hubs(id),
    role TEXT DEFAULT 'member',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, hub_id)
);

-- Project applications table
CREATE TABLE project_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id),
    applicant_id TEXT NOT NULL,
    role_id TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(project_id, applicant_id, role_id)
);

-- Forum post replies table
CREATE TABLE forum_replies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES forum_posts(id),
    author_id TEXT NOT NULL,
    content TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User endorsements table
CREATE TABLE endorsements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    endorser_id TEXT NOT NULL,
    endorsee_id TEXT NOT NULL,
    project_id UUID REFERENCES projects(id),
    testimonial TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(endorser_id, endorsee_id, project_id)
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_skills ON profiles USING GIN(skills);
CREATE INDEX idx_profiles_industries ON profiles USING GIN(industries);
CREATE INDEX idx_profiles_location ON profiles USING GIN(location);
CREATE INDEX idx_profiles_availability ON profiles(availability);
CREATE INDEX idx_profiles_influence_points ON profiles(influence_points);

CREATE INDEX idx_projects_founder_id ON projects(founder_id);
CREATE INDEX idx_projects_stage ON projects(stage);
CREATE INDEX idx_projects_industry ON projects(industry);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_location ON projects USING GIN(location);
CREATE INDEX idx_projects_created_at ON projects(created_at);

CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_messages_project_id ON messages(project_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);

CREATE INDEX idx_forum_posts_category ON forum_posts(category);
CREATE INDEX idx_forum_posts_author_id ON forum_posts(author_id);
CREATE INDEX idx_forum_posts_tags ON forum_posts USING GIN(tags);
CREATE INDEX idx_forum_posts_location ON forum_posts(location);
CREATE INDEX idx_forum_posts_created_at ON forum_posts(created_at);
CREATE INDEX idx_forum_posts_upvotes ON forum_posts(upvotes);

CREATE INDEX idx_local_hubs_city ON local_hubs(city);
CREATE INDEX idx_local_hubs_state ON local_hubs(state);
CREATE INDEX idx_local_hubs_country ON local_hubs(country);

CREATE INDEX idx_events_hub_id ON events(hub_id);
CREATE INDEX idx_events_host_id ON events(host_id);
CREATE INDEX idx_events_date ON events(date);

CREATE INDEX idx_hub_memberships_user_id ON hub_memberships(user_id);
CREATE INDEX idx_hub_memberships_hub_id ON hub_memberships(hub_id);

CREATE INDEX idx_project_applications_project_id ON project_applications(project_id);
CREATE INDEX idx_project_applications_applicant_id ON project_applications(applicant_id);

CREATE INDEX idx_forum_replies_post_id ON forum_replies(post_id);
CREATE INDEX idx_forum_replies_author_id ON forum_replies(author_id);

CREATE INDEX idx_endorsements_endorsee_id ON endorsements(endorsee_id);
CREATE INDEX idx_endorsements_endorser_id ON endorsements(endorser_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON forum_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_local_hubs_updated_at BEFORE UPDATE ON local_hubs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_project_applications_updated_at BEFORE UPDATE ON project_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forum_replies_updated_at BEFORE UPDATE ON forum_replies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default badges
INSERT INTO badges (name, description, icon, category, requirements) VALUES
('First Ship', 'Successfully launched your first project', '🚀', 'milestone', '{"type": "projects_launched", "value": 1}'),
('First Hire', 'Made your first team member hire', '👥', 'milestone', '{"type": "team_members", "value": 1}'),
('Cofounder Match', 'Successfully matched with a cofounder', '🤝', 'achievement', '{"type": "successful_matches", "value": 1}'),
('Local Host', 'Hosted your first local event', '🏠', 'community', '{"type": "events_hosted", "value": 1}'),
('100 Helpfuls', 'Received 100 helpful votes on forum posts', '👍', 'community', '{"type": "helpful_votes", "value": 100}'),
('Blueprint Graduate', 'Completed a Wyatt Works blueprint', '📚', 'achievement', '{"type": "blueprints_completed", "value": 1}'),
('Faith-in-Action', 'Demonstrated faith-based values in work', '❤️', 'special', '{"type": "faith_values", "value": 1}'),
('Pioneer', 'One of the first 5 active members in your city', '🌟', 'special', '{"type": "city_pioneer", "value": 1}'),
('City Founder', 'First project posted in your city', '🏆', 'special', '{"type": "city_founder", "value": 1}'),
('Trailblazer', 'First successful cofounder match in your city', '🔥', 'special', '{"type": "city_trailblazer", "value": 1}');

-- Insert default local hubs
INSERT INTO local_hubs (name, region, city, state, country, description, organizer_ids) VALUES
('Milwaukee Tech Hub', 'Great Lakes', 'Milwaukee', 'Wisconsin', 'United States', 'Wisconsin''s startup hub for builders and entrepreneurs', '{}'),
('Austin Innovation Center', 'South Central', 'Austin', 'Texas', 'United States', 'Texas innovation center with thriving startup community', '{}'),
('Seattle Tech Community', 'Pacific Northwest', 'Seattle', 'Washington', 'United States', 'Pacific Northwest tech hub focused on AI and gaming', '{}'),
('Denver Startup Scene', 'Mountain', 'Denver', 'Colorado', 'United States', 'Rocky Mountain startup scene for outdoor tech and sustainability', '{}'),
('Chicago Business Hub', 'Midwest', 'Chicago', 'Illinois', 'United States', 'Midwest business hub with strong B2B SaaS focus', '{}'),
('San Francisco Innovation', 'West Coast', 'San Francisco', 'California', 'United States', 'Silicon Valley innovation with VC connections', '{}');

-- Create RLS (Row Level Security) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE local_hubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE hub_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE endorsements ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid()::text = user_id);

-- Projects policies
CREATE POLICY "Public projects are viewable by everyone" ON projects FOR SELECT USING (true);
CREATE POLICY "Users can insert their own projects" ON projects FOR INSERT WITH CHECK (auth.uid()::text = founder_id);
CREATE POLICY "Users can update their own projects" ON projects FOR UPDATE USING (auth.uid()::text = founder_id);

-- Messages policies
CREATE POLICY "Users can view their own messages" ON messages FOR SELECT USING (auth.uid()::text = sender_id OR auth.uid()::text = recipient_id);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid()::text = sender_id);
CREATE POLICY "Users can update their own messages" ON messages FOR UPDATE USING (auth.uid()::text = sender_id OR auth.uid()::text = recipient_id);

-- Forum posts policies
CREATE POLICY "Public forum posts are viewable by everyone" ON forum_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create forum posts" ON forum_posts FOR INSERT WITH CHECK (auth.uid()::text = author_id);
CREATE POLICY "Users can update their own forum posts" ON forum_posts FOR UPDATE USING (auth.uid()::text = author_id);

-- Local hubs policies
CREATE POLICY "Public local hubs are viewable by everyone" ON local_hubs FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create local hubs" ON local_hubs FOR INSERT WITH CHECK (true);
CREATE POLICY "Hub organizers can update their hubs" ON local_hubs FOR UPDATE USING (auth.uid()::text = ANY(organizer_ids));

-- Events policies
CREATE POLICY "Public events are viewable by everyone" ON events FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create events" ON events FOR INSERT WITH CHECK (auth.uid()::text = host_id);
CREATE POLICY "Event hosts can update their events" ON events FOR UPDATE USING (auth.uid()::text = host_id);

-- Hub memberships policies
CREATE POLICY "Users can view hub memberships" ON hub_memberships FOR SELECT USING (true);
CREATE POLICY "Users can join hubs" ON hub_memberships FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users can leave hubs" ON hub_memberships FOR DELETE USING (auth.uid()::text = user_id);

-- Project applications policies
CREATE POLICY "Users can view their own applications" ON project_applications FOR SELECT USING (auth.uid()::text = applicant_id OR auth.uid()::text IN (SELECT founder_id FROM projects WHERE id = project_id));
CREATE POLICY "Users can apply to projects" ON project_applications FOR INSERT WITH CHECK (auth.uid()::text = applicant_id);
CREATE POLICY "Project founders can update applications" ON project_applications FOR UPDATE USING (auth.uid()::text IN (SELECT founder_id FROM projects WHERE id = project_id));

-- Forum replies policies
CREATE POLICY "Public forum replies are viewable by everyone" ON forum_replies FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create forum replies" ON forum_replies FOR INSERT WITH CHECK (auth.uid()::text = author_id);
CREATE POLICY "Users can update their own forum replies" ON forum_replies FOR UPDATE USING (auth.uid()::text = author_id);

-- Endorsements policies
CREATE POLICY "Public endorsements are viewable by everyone" ON endorsements FOR SELECT USING (true);
CREATE POLICY "Users can create endorsements" ON endorsements FOR INSERT WITH CHECK (auth.uid()::text = endorser_id);
CREATE POLICY "Users can update their own endorsements" ON endorsements FOR UPDATE USING (auth.uid()::text = endorser_id);
