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

    // Fetch last N messages for context (both user and ai) for this chat
    const history = await prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'asc' },
      take: 10,
    })

    // Find chat prompt context (optional)
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
    })

    const systemPrompt =
      chat?.contextPrompt ||
      'Eres un coach empático de relaciones. Da consejos amorosos. Nunca reveles secretos entre personas. Ayuda a que el usuario entienda mejor a su pareja.'

    // Build OpenAI messages array
    const chatHistory = [
      { role: 'system', content: systemPrompt },
      ...history.map((m) => ({
        role: mapToOpenAIRole(m.role),
        content: m.content,
      })),
      { role: 'user', content: message },
    ]

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: chatHistory,
    })

    const aiResponse =
      completion.choices?.[0]?.message?.content || 'Lo siento, no entendí.'

    // Save AI response message
    await prisma.message.create({
      data: {
        chatId,
        userId: null, // AI messages have no userId
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
