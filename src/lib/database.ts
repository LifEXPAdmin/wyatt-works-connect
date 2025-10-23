import { supabase } from './supabase'
import { Profile, Project, Message, ForumPost, LocalHub, Event, Badge } from './types'

// Profile functions
export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return data
}

export async function createProfile(profile: Partial<Profile>): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single()

  if (error) {
    console.error('Error creating profile:', error)
    return null
  }

  return data
}

export async function updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    console.error('Error updating profile:', error)
    return null
  }

  return data
}

export async function searchProfiles(filters: {
  skills?: string[]
  industries?: string[]
  location?: string
  availability?: string
  roles?: string[]
  limit?: number
  offset?: number
}): Promise<Profile[]> {
  let query = supabase.from('profiles').select('*')

  if (filters.skills && filters.skills.length > 0) {
    query = query.overlaps('skills', filters.skills)
  }

  if (filters.industries && filters.industries.length > 0) {
    query = query.overlaps('industries', filters.industries)
  }

  if (filters.location) {
    query = query.ilike('location->>city', `%${filters.location}%`)
  }

  if (filters.availability) {
    query = query.eq('availability', filters.availability)
  }

  if (filters.roles && filters.roles.length > 0) {
    query = query.overlaps('roles', filters.roles)
  }

  if (filters.limit) {
    query = query.limit(filters.limit)
  }

  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  const { data, error } = await query.order('influence_points', { ascending: false })

  if (error) {
    console.error('Error searching profiles:', error)
    return []
  }

  return data || []
}

// Project functions
export async function getProject(projectId: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    return null
  }

  return data
}

export async function createProject(project: Partial<Project>): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single()

  if (error) {
    console.error('Error creating project:', error)
    return null
  }

  return data
}

export async function updateProject(projectId: string, updates: Partial<Project>): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', projectId)
    .select()
    .single()

  if (error) {
    console.error('Error updating project:', error)
    return null
  }

  return data
}

export async function searchProjects(filters: {
  industry?: string
  stage?: string
  location?: string
  status?: string
  limit?: number
  offset?: number
}): Promise<Project[]> {
  let query = supabase.from('projects').select('*')

  if (filters.industry) {
    query = query.eq('industry', filters.industry)
  }

  if (filters.stage) {
    query = query.eq('stage', filters.stage)
  }

  if (filters.location) {
    query = query.ilike('location->>city', `%${filters.location}%`)
  }

  if (filters.status) {
    query = query.eq('status', filters.status)
  }

  if (filters.limit) {
    query = query.limit(filters.limit)
  }

  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error searching projects:', error)
    return []
  }

  return data || []
}

// Message functions
export async function getMessages(userId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching messages:', error)
    return []
  }

  return data || []
}

export async function createMessage(message: Partial<Message>): Promise<Message | null> {
  const { data, error } = await supabase
    .from('messages')
    .insert(message)
    .select()
    .single()

  if (error) {
    console.error('Error creating message:', error)
    return null
  }

  return data
}

export async function markMessageAsRead(messageId: string): Promise<boolean> {
  const { error } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('id', messageId)

  if (error) {
    console.error('Error marking message as read:', error)
    return false
  }

  return true
}

// Forum functions
export async function getForumPosts(filters: {
  category?: string
  limit?: number
  offset?: number
}): Promise<ForumPost[]> {
  let query = supabase.from('forum_posts').select('*')

  if (filters.category) {
    query = query.eq('category', filters.category)
  }

  if (filters.limit) {
    query = query.limit(filters.limit)
  }

  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching forum posts:', error)
    return []
  }

  return data || []
}

export async function createForumPost(post: Partial<ForumPost>): Promise<ForumPost | null> {
  const { data, error } = await supabase
    .from('forum_posts')
    .insert(post)
    .select()
    .single()

  if (error) {
    console.error('Error creating forum post:', error)
    return null
  }

  return data
}

// Local Hub functions
export async function getLocalHubs(): Promise<LocalHub[]> {
  const { data, error } = await supabase
    .from('local_hubs')
    .select('*')
    .order('member_count', { ascending: false })

  if (error) {
    console.error('Error fetching local hubs:', error)
    return []
  }

  return data || []
}

export async function getLocalHub(hubId: string): Promise<LocalHub | null> {
  const { data, error } = await supabase
    .from('local_hubs')
    .select('*')
    .eq('id', hubId)
    .single()

  if (error) {
    console.error('Error fetching local hub:', error)
    return null
  }

  return data
}

export async function joinHub(userId: string, hubId: string): Promise<boolean> {
  const { error } = await supabase
    .from('hub_memberships')
    .insert({ user_id: userId, hub_id: hubId })

  if (error) {
    console.error('Error joining hub:', error)
    return false
  }

  // Update member count
  await supabase.rpc('increment_hub_member_count', { hub_id: hubId })

  return true
}

// Event functions
export async function getEvents(hubId?: string): Promise<Event[]> {
  let query = supabase.from('events').select('*')

  if (hubId) {
    query = query.eq('hub_id', hubId)
  }

  const { data, error } = await query
    .gte('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: true })

  if (error) {
    console.error('Error fetching events:', error)
    return []
  }

  return data || []
}

export async function createEvent(event: Partial<Event>): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .insert(event)
    .select()
    .single()

  if (error) {
    console.error('Error creating event:', error)
    return null
  }

  return data
}

export async function rsvpToEvent(userId: string, eventId: string): Promise<boolean> {
  const { error } = await supabase
    .from('events')
    .update({ attendees: supabase.raw(`array_append(attendees, '${userId}')`) })
    .eq('id', eventId)

  if (error) {
    console.error('Error RSVPing to event:', error)
    return false
  }

  return true
}

// Badge functions
export async function getBadges(): Promise<Badge[]> {
  const { data, error } = await supabase
    .from('badges')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching badges:', error)
    return []
  }

  return data || []
}

export async function awardBadge(userId: string, badgeName: string): Promise<boolean> {
  const { error } = await supabase
    .from('profiles')
    .update({ badges: supabase.raw(`array_append(badges, '${badgeName}')`) })
    .eq('user_id', userId)

  if (error) {
    console.error('Error awarding badge:', error)
    return false
  }

  return true
}

// Utility functions
export async function incrementInfluencePoints(userId: string, points: number): Promise<boolean> {
  const { error } = await supabase
    .from('profiles')
    .update({ influence_points: supabase.raw(`influence_points + ${points}`) })
    .eq('user_id', userId)

  if (error) {
    console.error('Error incrementing influence points:', error)
    return false
  }

  return true
}

export async function uploadFile(file: File, bucket: string, path: string): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file)

  if (error) {
    console.error('Error uploading file:', error)
    return null
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path)

  return publicUrl
}
