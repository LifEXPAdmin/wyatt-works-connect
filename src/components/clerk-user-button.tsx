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

export default function ClerkUserButton() {
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
