// app/api/couple/invite/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id

  // Opcional: validar que no tenga pareja aún
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { couple: true },
  })

  if (user?.coupleId) {
    return NextResponse.json({ error: 'You are already in a couple' }, { status: 400 })
  }

  // Generar código aleatorio
  const code = crypto.randomBytes(3).toString('hex').toUpperCase() // ej: 'A1F3C9'

  const invite = await prisma.inviteCode.create({
    data: {
      code,
      inviterId: userId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // expira en 24h
    },
  })

  return NextResponse.json({ code: invite.code })
}
