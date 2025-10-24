'use client'

import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ClerkAuthGuardProps {
  children: React.ReactNode
}

export default function ClerkAuthGuard({ children }: ClerkAuthGuardProps) {
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
