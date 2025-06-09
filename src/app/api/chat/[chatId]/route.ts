import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { chatId: string } },
) {
  const chatId = params.chatId

  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const chats = await prisma.chat.findMany({
      where: {
        id: chatId,
        isArchived: false,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    return NextResponse.json(chats)
  } catch (error) {
    console.error('Failed to fetch chats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chats' },
      { status: 500 },
    )
  }
}
