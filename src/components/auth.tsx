'use client'

import { useUser, useClerk } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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

export function UserButton() {
  // Check if Clerk is available
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

  const { user } = useUser()
  const { signOut } = useClerk()

  if (!user) {
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

  return (
    <div className="flex items-center space-x-2">
      {/* Notifications */}
      <Button variant="ghost" size="icon">
        <Bell className="h-4 w-4" />
      </Button>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.imageUrl} alt={user.fullName || ''} />
              <AvatarFallback>
                {user.firstName?.[0]}{user.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.fullName || 'User'}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/help" className="flex items-center">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => signOut()}
            className="flex items-center text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  // Check if Clerk is available
  const clerkAvailable = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  if (!clerkAvailable) {
    // If Clerk isn't available, just render children (for development/demo)
    return <>{children}</>
  }

  const { isLoaded, isSignedIn } = useUser()

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-muted-foreground mb-8">
            Please sign in to access this page.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/sign-up">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
