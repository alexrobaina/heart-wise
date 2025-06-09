import InviteCodeGenerator from '@/components/InviteCodeGenerator'
import AcceptInviteCode from '@/components/AcceptInviteCode'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function PartnerPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/') // or to /api/auth/signin
  }

  return (
    <main className="p-8 flex flex-col items-center gap-10">
      <InviteCodeGenerator />
      <AcceptInviteCode />
    </main>
  )
}
