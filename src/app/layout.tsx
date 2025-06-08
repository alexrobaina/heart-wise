// app/layout.tsx

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/organisms/SideBar'
import { Providers } from './Providers'

// Load Geist fonts and assign to CSS variables
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Conscious Love',
  description: 'A platform for AI-driven relationship insights',
  openGraph: {
    title: 'Conscious Love',
    description: 'A platform for AI-driven relationship insights',
    url: 'https://consciouslove.com',
    siteName: 'Conscious Love',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className="dark overflow-hidden scrollbar-thumb-gray-900 scrollbar-track-transparent scrollbar-thin"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-800`}
      >
        <Providers>
          {/* 
              Outer flex container:
              - Sidebar fixed width on the left
              - Main content scrolls on the right
            */}
          <div className="flex min-h-screen overflow-hidden">
            {/* 1) Sidebar (hidden on small screens by design of the component) */}
            <Sidebar />

            {/* 2) Main content area */}
            <main className="flex-1 h-full overflow-hidden">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
