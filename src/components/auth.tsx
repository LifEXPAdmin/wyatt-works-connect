'use client'

import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  User, 
  Settings, 
  LogOut, 
  Bell,
  HelpCircle
} from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamically import Clerk components only when needed
const ClerkUserButton = dynamic(() => import('./clerk-user-button'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
      <Button variant="gradient" size="sm" asChild>
        <Link href="/sign-up">Start Your Profile</Link>
      </Button>
    </div>
  )
})

const ClerkAuthGuard = dynamic(() => import('./clerk-auth-guard'), {
  ssr: false,
  loading: ({ children }: { children: React.ReactNode }) => <>{children}</>
})

export function UserButton() {
  const clerkAvailable = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  if (!clerkAvailable) {
    return (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button variant="gradient" size="sm" asChild>
          <Link href="/sign-up">Start Your Profile</Link>
        </Button>
      </div>
    )
  }

  return <ClerkUserButton />
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const clerkAvailable = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  if (!clerkAvailable) {
    // If Clerk isn't available, just render children (for development/demo)
    return <>{children}</>
  }

  return <ClerkAuthGuard>{children}</ClerkAuthGuard>
}
