import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { customAlphabet } from 'nanoid'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8)

export async function POST(
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
    const userId = session.user.id

    // 1. Obtener chat
    const chat = await prisma.chat.findUnique({ where: { id: chatId } })
    if (!chat) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 })
    }

    // 2. Create or retrieve connection
    let connectionId = chat.connectionId
    if (!connectionId) {
      const connection = await prisma.connection.create({
        data: {
          type: 'couple', // In the future, you might want to make this dynamic
          members: {
            create: [{ userId }],
          },
        },
      })
      connectionId = connection.id

      // update chat with connectionId
      await prisma.chat.update({
        where: { id: chatId },
        data: {
          connectionId,
        },
      })
    }

    // 3. Seach code of invite
    let inviteCode = await prisma.inviteCode.findFirst({
      where: {
        connectionId,
        used: false,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
    })

    // 4. create code if not exist
    if (!inviteCode) {
      let code: string
      let exists: boolean
      do {
        code = nanoid()
        const existing = await prisma.inviteCode.findUnique({ where: { code } })
        exists = !!existing
      } while (exists)

      inviteCode = await prisma.inviteCode.create({
        data: {
          code,
          inviterId: userId,
          connectionId,
          createdAt: new Date(),
          used: false,
        },
      })
    }

    return NextResponse.json({ inviteCode: inviteCode.code })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(
      { error: 'Error desconocido al generar código' },
      { status: 500 },
    )
  }
}

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
    // Get chat with connectionId
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      select: {
        connectionId: true,
      },
    })

    if (!chat || !chat.connectionId) {
      return NextResponse.json({
        inviteCode: null,
        used: null,
        connectionType: null,
      })
    }

    // Find active invite code with related connection type
    const inviteCode = await prisma.inviteCode.findFirst({
      where: {
        connectionId: chat.connectionId,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        connection: {
          select: {
            type: true,
            members: {
              select: {
                user: {
                  select: {
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!inviteCode) {
      return NextResponse.json({
        inviteCode: null,
        used: null,
        connectionType: null,
        connectionUsers: [],
      })
    }

    // Map members to user info array
    const connectionUsers =
      inviteCode.connection?.members
        .map(
          (member: { user: { name: string | null; email: string | null } }) =>
            member.user,
        )
        .filter(
          (user: {
            name: string | null
            email: string | null
          }): user is { name: string | null; email: string | null } => !!user,
        ) ?? []

    return NextResponse.json({
      inviteCode: inviteCode.code,
      used: inviteCode.used,
      connectionType: inviteCode.connection?.type || null,
      connectionUsers,
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(
      { error: 'Unknown error fetching invite code' },
      { status: 500 },
    )
  }
}
