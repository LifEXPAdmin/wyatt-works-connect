import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          name: string
          headline: string
          bio: string | null
          photo: string | null
          location: {
            city: string
            state: string
            country: string
            timezone: string
          }
          roles: string[]
          intent: string[]
          commitment: string
          compensation_preference: string
          stage: string
          skills: string[]
          industries: string[]
          portfolio: {
            github?: string
            behance?: string
            website?: string
            linkedin?: string
            youtube?: string
          } | null
          values: string[] | null
          availability: string
          willing_to_relocate: boolean
          remote_only: boolean
          influence_points: number
          badges: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          headline: string
          bio?: string | null
          photo?: string | null
          location: {
            city: string
            state: string
            country: string
            timezone: string
          }
          roles: string[]
          intent: string[]
          commitment: string
          compensation_preference: string
          stage: string
          skills: string[]
          industries: string[]
          portfolio?: {
            github?: string
            behance?: string
            website?: string
            linkedin?: string
            youtube?: string
          } | null
          values?: string[] | null
          availability: string
          willing_to_relocate?: boolean
          remote_only?: boolean
          influence_points?: number
          badges?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          headline?: string
          bio?: string | null
          photo?: string | null
          location?: {
            city: string
            state: string
            country: string
            timezone: string
          }
          roles?: string[]
          intent?: string[]
          commitment?: string
          compensation_preference?: string
          stage?: string
          skills?: string[]
          industries?: string[]
          portfolio?: {
            github?: string
            behance?: string
            website?: string
            linkedin?: string
            youtube?: string
          } | null
          values?: string[] | null
          availability?: string
          willing_to_relocate?: boolean
          remote_only?: boolean
          influence_points?: number
          badges?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          pitch: string
          description: string
          stage: string
          industry: string
          location: {
            city: string
            state: string
            country: string
            remote: boolean
          }
          vision: {
            problem: string
            solution: string
            why_now: string
          }
          milestones: {
            id: string
            title: string
            description: string
            target_date: string
            completed: boolean
          }[]
          roles: {
            id: string
            title: string
            responsibilities: string[]
            must_haves: string[]
            nice_to_haves?: string[]
            commitment: string
            compensation: {
              type: string
              equity?: number
              stipend?: number
              salary_range?: {
                min: number
                max: number
              }
            }
            timeline: string
            reporting_to?: string
          }[]
          team: {
            user_id: string
            role: string
            bio: string
          }[]
          links: {
            website?: string
            deck?: string
            prototype?: string
            repo?: string
          } | null
          status: string
          founder_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          pitch: string
          description: string
          stage: string
          industry: string
          location: {
            city: string
            state: string
            country: string
            remote: boolean
          }
          vision: {
            problem: string
            solution: string
            why_now: string
          }
          milestones: {
            id: string
            title: string
            description: string
            target_date: string
            completed: boolean
          }[]
          roles: {
            id: string
            title: string
            responsibilities: string[]
            must_haves: string[]
            nice_to_haves?: string[]
            commitment: string
            compensation: {
              type: string
              equity?: number
              stipend?: number
              salary_range?: {
                min: number
                max: number
              }
            }
            timeline: string
            reporting_to?: string
          }[]
          team: {
            user_id: string
            role: string
            bio: string
          }[]
          links?: {
            website?: string
            deck?: string
            prototype?: string
            repo?: string
          } | null
          status?: string
          founder_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          pitch?: string
          description?: string
          stage?: string
          industry?: string
          location?: {
            city: string
            state: string
            country: string
            remote: boolean
          }
          vision?: {
            problem: string
            solution: string
            why_now: string
          }
          milestones?: {
            id: string
            title: string
            description: string
            target_date: string
            completed: boolean
          }[]
          roles?: {
            id: string
            title: string
            responsibilities: string[]
            must_haves: string[]
            nice_to_haves?: string[]
            commitment: string
            compensation: {
              type: string
              equity?: number
              stipend?: number
              salary_range?: {
                min: number
                max: number
              }
            }
            timeline: string
            reporting_to?: string
          }[]
          team?: {
            user_id: string
            role: string
            bio: string
          }[]
          links?: {
            website?: string
            deck?: string
            prototype?: string
            repo?: string
          } | null
          status?: string
          founder_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          recipient_id: string
          subject: string
          content: string
          template: string | null
          project_id: string | null
          read: boolean
          replied: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          recipient_id: string
          subject: string
          content: string
          template?: string | null
          project_id?: string | null
          read?: boolean
          replied?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          recipient_id?: string
          subject?: string
          content?: string
          template?: string | null
          project_id?: string | null
          read?: boolean
          replied?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      forum_posts: {
        Row: {
          id: string
          title: string
          content: string
          category: string
          post_type: string
          tags: string[]
          location: string | null
          author_id: string
          upvotes: number
          replies: number
          solved: boolean
          pinned: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          category: string
          post_type: string
          tags: string[]
          location?: string | null
          author_id: string
          upvotes?: number
          replies?: number
          solved?: boolean
          pinned?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          category?: string
          post_type?: string
          tags?: string[]
          location?: string | null
          author_id?: string
          upvotes?: number
          replies?: number
          solved?: boolean
          pinned?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      local_hubs: {
        Row: {
          id: string
          name: string
          region: string
          city: string
          state: string
          country: string
          description: string
          member_count: number
          organizer_ids: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          region: string
          city: string
          state: string
          country: string
          description: string
          member_count?: number
          organizer_ids: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          region?: string
          city?: string
          state?: string
          country?: string
          description?: string
          member_count?: number
          organizer_ids?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          time: string
          venue: string | null
          virtual_link: string | null
          host_id: string
          hub_id: string
          capacity: number | null
          attendees: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          date: string
          time: string
          venue?: string | null
          virtual_link?: string | null
          host_id: string
          hub_id: string
          capacity?: number | null
          attendees?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          date?: string
          time?: string
          venue?: string | null
          virtual_link?: string | null
          host_id?: string
          hub_id?: string
          capacity?: number | null
          attendees?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      badges: {
        Row: {
          id: string
          name: string
          description: string
          icon: string
          category: string
          requirements: {
            type: string
            value: number
          }
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon: string
          category: string
          requirements: {
            type: string
            value: number
          }
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string
          category?: string
          requirements?: {
            type: string
            value: number
          }
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
