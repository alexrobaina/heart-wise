import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from './prisma'

export async function getUserMessages() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return []

  const messages = await prisma.message.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'asc' },
  })

  return messages.map((m) => ({
    role: m.role as 'user' | 'ai',
    content: m.content,
  }))
}
