// src/app/api/message/[chatId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import OpenAI from 'openai'
import { authOptions } from '../../auth/[...nextauth]/route'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

function mapToOpenAIRole(role: string): 'user' | 'assistant' | 'system' {
  if (role === 'ai') return 'assistant'
  if (role === 'user') return 'user'
  return 'system'
}

export async function POST(
  req: NextRequest,
  { params }: { params: { chatId: string } },
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id
  const { chatId } = params

  const { message } = await req.json()
  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  }

  try {
    // Save user message linked to chatId
    await prisma.message.create({
      data: {
        chatId,
        userId,
        role: 'user',
        content: message,
      },
    })

    // Get current chat and its connection
    const currentChat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: { Connection: true },
    })

    if (!currentChat) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 })
    }

    let chatHistoryMessages = []
    let contextPrompts = ''

    if (currentChat.connectionId) {
      // Connected chat: include messages from all related chats in connection

      // Get all chats in the same connection
      const relatedChats = await prisma.chat.findMany({
        where: { connectionId: currentChat.connectionId },
        select: { id: true, contextPrompt: true, userId: true },
      })

      const relatedChatIds = relatedChats.map((c: { id: string }) => c.id)

      // Get messages from all related chats
      const allMessages = await prisma.message.findMany({
        where: { chatId: { in: relatedChatIds } },
        orderBy: { createdAt: 'asc' },
      })

      // Create combined context prompts
      contextPrompts = relatedChats
        .filter((c: { contextPrompt: string }) => c.contextPrompt)
        .map(
          (c: { userId: string; contextPrompt: string }) =>
            `--- Onboarding for ${c.userId} ---\n${c.contextPrompt}`,
        )
        .join('\n\n')

      chatHistoryMessages = allMessages
    } else {
      // Individual chat: only messages from this chat
      const messages = await prisma.message.findMany({
        where: { chatId },
        orderBy: { createdAt: 'asc' },
      })

      if (currentChat.contextPrompt) {
        contextPrompts = currentChat.contextPrompt
      }

      chatHistoryMessages = messages
    }

    const globalPrompt =
      'You are a compassionate relationship therapist with training in CBT, psychoanalysis, and Jungian theory. Guide each person with empathy, emotional safety, and without revealing private details to others.'

    // Build OpenAI messages array
    const chatHistory = [
      { role: 'system', content: globalPrompt },
      { role: 'system', content: contextPrompts },
    ]

    let currentUserMarker: string | null = null
    for (const msg of chatHistoryMessages) {
      if (msg.userId !== currentUserMarker) {
        currentUserMarker = msg.userId || 'ai'
        chatHistory.push({
          role: 'system',
          content: `--- Messages from ${currentUserMarker} ---`,
        })
      }

      chatHistory.push({
        role: mapToOpenAIRole(msg.role),
        content: msg.content,
      })
    }

    // Push new user message at the end
    chatHistory.push({
      role: 'user',
      content: message,
    })

    // Generate AI response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      messages: chatHistory,
    })

    const aiResponse =
      completion.choices?.[0]?.message?.content ||
      'Sorry, I did not understand.'

    // Save AI message
    await prisma.message.create({
      data: {
        chatId,
        userId: null,
        role: 'ai',
        content: aiResponse,
      },
    })

    return NextResponse.json({ response: aiResponse })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 },
    )
  }
}
