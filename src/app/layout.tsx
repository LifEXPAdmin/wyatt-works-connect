import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { NotificationProvider } from '@/components/notifications'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wyatt Works - Find Your Cofounder. Build Something Real.",
  description: "Connect founders, cofounders, and collaborators. Get the blueprint to launch with local meetups, mentorship, and structured progress.",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  const content = (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </body>
    </html>
  );

  // Only wrap with ClerkProvider if the key is available
  if (clerkPublishableKey) {
    return (
      <ClerkProvider publishableKey={clerkPublishableKey}>
        {content}
      </ClerkProvider>
    );
  }

  return content;
}
