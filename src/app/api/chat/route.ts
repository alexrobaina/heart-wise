import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

function mapToOpenAIRole(role: string): "user" | "assistant" | "system" {
  if (role === "ai") return "assistant";
  if (role === "user") return "user";
  return "system";
}


export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { message } = await req.json()
  const userId = session.user.id

  // Guarda el nuevo mensaje del usuario
  await prisma.message.create({
    data: {
      userId,
      role: 'user',
      content: message,
    },
  })


  // Recupera últimos 10 mensajes del usuario (contexto)
  const history = await prisma.message.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' },
    take: 10,
  })

// Construir prompt completo para OpenAI
const chatHistory = [
  {
    role: 'system',
    content:
      'Eres un coach empático de relaciones. Da consejos amorosos. Nunca reveles secretos entre personas. Ayuda a que el usuario entienda mejor a su pareja.',
  },
  ...history.map((m) => ({
    role: mapToOpenAIRole(m.role),
    content: m.content,
  })),
  { role: 'user', content: message },
]

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: chatHistory,
  })

  const response = completion.choices?.[0]?.message?.content || 'Lo siento, no entendí.'

  // Guarda respuesta de la IA
  await prisma.message.create({
    data: {
      userId,
      role: 'ai',
      content: response,
    },
  })

  return NextResponse.json({ response })
}
