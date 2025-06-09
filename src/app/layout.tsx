// app/layout.tsx

import type { Metadata } from 'next'
import { FaSpinner } from 'react-icons/fa'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/organisms/SideBar'
import { Providers } from './Providers'
import { Suspense } from 'react'

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
  title: 'Heart wise',
  description: 'A platform for AI-driven relationship insights',
  openGraph: {
    title: 'Heart wise',
    description: 'A platform for AI-driven relationship insights',
    url: 'https://consciouslove.com',
    siteName: 'Heart wise',
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
      className="scrollbar-thumb-gray-900 scrollbar-track-transparent scrollbar-thin"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-amber-50`}
      >
        <Suspense
          fallback={
            <div className="flex justify-center">
              <FaSpinner className="animate-spin h-5 w-5 text-indigo-500" />
            </div>
          }
        >
          <Providers>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 h-full">{children}</main>
            </div>
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
