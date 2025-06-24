import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { code, chatId } = await req.json()
  if (!code || typeof code !== 'string') {
    return NextResponse.json({ error: 'Code is required' }, { status: 400 })
  }
  if (!chatId || typeof chatId !== 'string') {
    return NextResponse.json({ error: 'ChatId is required' }, { status: 400 })
  }

  try {
    const userId = session.user.id

    // Find valid invite code and related connection & inviter
    const invite = await prisma.inviteCode.findFirst({
      where: {
        code,
        used: false,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      include: {
        inviter: true,
        connection: {
          include: {
            members: true,
          },
        },
      },
    })

    if (!invite) {
      return NextResponse.json(
        { error: 'Invalid or expired code' },
        { status: 404 },
      )
    }

    // Check if user is already a member of the connection
    const isMember = invite.connection.members.some(
      (m: { userId: string }) => m.userId === userId,
    )
    if (!isMember) {
      await prisma.connectionMember.create({
        data: {
          userId,
          connectionId: invite.connectionId,
          joinedAt: new Date(),
        },
      })
    }

    // Update the chat with the connectionId passed from front end
    await prisma.chat.update({
      where: { id: chatId },
      data: {
        connectionId: invite.connectionId,
      },
    })

    // Mark invite code as used and link the user who used it
    await prisma.inviteCode.update({
      where: { id: invite.id },
      data: { used: true, usedById: userId },
    })

    return NextResponse.json({
      message: 'Connection accepted successfully',
      inviter: {
        id: invite.inviter.id,
        name: invite.inviter.name,
        email: invite.inviter.email,
        image: invite.inviter.image,
      },
      chatId,
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 })
  }
}
