// /src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { contextPrompt, title, contextRaw } = body

  const parsedContextRaw =
    typeof contextRaw === 'string' ? JSON.parse(contextRaw) : contextRaw

  try {
    const newChat = await prisma.chat.create({
      data: {
        userId: session.user.id,
        title: title || 'Untitled',
        contextPrompt: contextPrompt,
        context: parsedContextRaw,
      },
    })
    return NextResponse.json(newChat)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    // fallback case
    console.log(error)
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 },
    )
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userId: session.user.id,
        isArchived: false,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    })
    return NextResponse.json(chats)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message)
      return NextResponse.json(
        { error: 'Failed to fetch chats: ' + error.message },
        { status: 500 },
      )
    }
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to fetch chats: unknown error' },
      { status: 500 },
    )
  }
}
