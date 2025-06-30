// app/layout.tsx

import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Geist, Geist_Mono } from 'next/font/google'
import { Sidebar } from '@/components/organisms/SideBar'
import { JSX, Suspense } from 'react'
import { Loading } from '@/components/atoms/Loading'
import { Providers } from './Providers'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

interface RootLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata() {
  const messages = await getMessages()

  return {
    title: messages['metadata.title'],
    description: messages['metadata.description'],
    authors: [{ name: 'Alex Robaina', url: 'https://arobaina.dev' }],
    openGraph: {
      title: messages['metadata.ogTitle'],
      description: messages['metadata.ogDescription'],
      type: 'website',
      images: '/chatAI.png', // Ensure this path is correct
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>): Promise<JSX.Element> {
  const { locale } = await params

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className="scrollbar-thumb-amber-600 scrollbar-track-transparent scrollbar-thin"
    >
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-amber-50`}
      >
        <Suspense fallback={<Loading size={20} />}>
          <Providers>
            <div className="relative flex h-screen">
              <NextIntlClientProvider messages={messages}>
                <Sidebar />
                <main className="flex-1 overflow-y-auto h-screen">
                  {children}
                </main>
              </NextIntlClientProvider>
            </div>
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
