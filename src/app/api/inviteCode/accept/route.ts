import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { code } = body

    if (!code) {
      return NextResponse.json(
        { error: 'Invite code is required' },
        { status: 400 },
      )
    }

    const invite = await prisma.inviteCode.findUnique({
      where: { code },
      include: { connection: true, inviter: true },
    })

    if (!invite) {
      return NextResponse.json(
        { error: 'Invalid invite code' },
        { status: 404 },
      )
    }

    if (invite.used) {
      return NextResponse.json(
        { error: 'Invite code already used' },
        { status: 400 },
      )
    }

    if (invite.expiresAt && invite.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Invite code expired' },
        { status: 400 },
      )
    }

    // Add current user as member of the connection (avoid duplicates)
    const existingMember = await prisma.connectionMember.findUnique({
      where: {
        userId_connectionId: {
          userId: session.user.id,
          connectionId: invite.connectionId!,
        },
      },
    })

    if (!existingMember) {
      await prisma.connectionMember.create({
        data: {
          userId: session.user.id,
          connectionId: invite.connectionId!,
          joinedAt: new Date(),
        },
      })
    }

    // Mark invite as used and set usedBy
    await prisma.inviteCode.update({
      where: { code },
      data: {
        used: true,
        usedById: session.user.id,
      },
    })

    return NextResponse.json({
      message: 'Successfully joined the connection',
      connectionId: invite.connectionId,
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(
      { error: 'Failed to accept invite code' },
      { status: 500 },
    )
  }
}
