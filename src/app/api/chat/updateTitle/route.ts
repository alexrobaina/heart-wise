// /src/app/api/chat/updateTitle/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { chatId, title } = await req.json()
  if (!chatId || typeof title !== 'string') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  try {
    const chat = await prisma.chat.updateMany({
      where: {
        id: chatId,
        userId: session.user.id,
      },
      data: {
        title,
      },
    })

    if (chat.count === 0) {
      return NextResponse.json(
        { error: 'Chat not found or not authorized' },
        { status: 404 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to update chat title' },
      { status: 500 },
    )
  }
}
