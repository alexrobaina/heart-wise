// src/app/dashboard/page.tsx
'uae client'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { LogoutButton } from '@/components/LogoutButton'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/') // or to /api/auth/signin
  }

  return (
    <main className="p-8 flex flex-col items-center gap-10">
      ı
      <LogoutButton />
      <Link href="/chat" className="text-blue-500 hover:underline">
        Go to Chat
      </Link>
      <Link href="/partner" className="text-blue-500 hover:underline">
        Go to Partner
      </Link>
      <Link href="/onboarding" className="text-blue-500 hover:underline">
        onboarding
      </Link>
    </main>
  )
}
