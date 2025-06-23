import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { customAlphabet } from 'nanoid'

// nanoid alphabet and length for invite code
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8)

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ connectionId: string }> },
) {
  const { params } = context
  const resolvedParams = await params
  const connectionId = resolvedParams.connectionId

  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Verify connection exists and user is a member
    const connection = await prisma.connection.findUnique({
      where: { id: connectionId },
      include: { members: true },
    })

    if (!connection) {
      return NextResponse.json(
        { error: 'Connection not found' },
        { status: 404 },
      )
    }

    const isMember = connection.members.some(
      (m: { userId: string }) => m.userId === session.user.id,
    )
    if (!isMember) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }


    // Try to find an existing invite code that is NOT linked to any connection
    const existingCode = await prisma.inviteCode.findFirst({
      where: {
        connectionId: null,
        used: false,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (existingCode) {
      // Return the unused, unlinked invite code
      return NextResponse.json({ inviteCode: existingCode.code })
    }

    // Generate a unique invite code string and ensure uniqueness
    let code: string
    let existing
    do {
      code = nanoid()
      existing = await prisma.inviteCode.findUnique({ where: { code } })
    } while (existing)

    // Create InviteCode linked to connection and current user (inviter)
    const inviteCode = await prisma.inviteCode.create({
      data: {
        code,
        inviterId: session.user.id,
        connectionId,
        createdAt: new Date(),
        used: false,
        // optionally set expiresAt based on your policy
      },
    })

    return NextResponse.json({ inviteCode: inviteCode.code })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(
      { error: 'Failed to create invite code' },
      { status: 500 },
    )
  }
}
