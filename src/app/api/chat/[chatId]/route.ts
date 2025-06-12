import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ chatId: string }> },
) {
  const { params } = context
  const resolvedParams = await params
  const chatId = resolvedParams.chatId

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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
      { error: 'Failed to fetch chats' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ chatId: string }> },
) {
  const { params } = context
  const resolvedParams = await params
  const chatId = resolvedParams.chatId

  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Option 1: Soft delete by setting isArchived true
    // await prisma.chat.update({
    //   where: { id: chatId },
    //   data: { isArchived: true },
    // })

    // Delete all messages for the chat first
    await prisma.message.deleteMany({
      where: {
        chatId,
      },
    })

    // Then delete the chat
    await prisma.chat.delete({
      where: { id: chatId },
    })

    return NextResponse.json({ message: 'Chat deleted' })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(
      { error: 'Failed to delete chat' },
      { status: 500 },
    )
  }
}
