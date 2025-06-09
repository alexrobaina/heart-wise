// app/api/couple/accept/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id
  const { code } = await req.json()

  const invite = await prisma.inviteCode.findUnique({
    where: { code },
    include: { inviter: true },
  })

  if (
    !invite ||
    invite.used ||
    (invite.expiresAt && new Date() > invite.expiresAt)
  ) {
    return NextResponse.json(
      { error: 'Invalid or expired code' },
      { status: 400 },
    )
  }

  if (invite.inviterId === userId) {
    return NextResponse.json(
      { error: 'You cannot accept your own code' },
      { status: 400 },
    )
  }

  // Validar que ninguno esté en pareja
  const [inviter, accepter] = await Promise.all([
    prisma.user.findUnique({ where: { id: invite.inviterId } }),
    prisma.user.findUnique({ where: { id: userId } }),
  ])

  if (inviter?.coupleId || accepter?.coupleId) {
    return NextResponse.json(
      { error: 'One or both users already in a couple' },
      { status: 400 },
    )
  }

  const couple = await prisma.couple.create({
    data: {
      user1Id: invite.inviterId,
      user2Id: userId,
    },
  })

  await Promise.all([
    prisma.user.update({
      where: { id: invite.inviterId },
      data: { coupleId: couple.id },
    }),
    prisma.user.update({
      where: { id: userId },
      data: { coupleId: couple.id },
    }),
    prisma.inviteCode.update({
      where: { code },
      data: {
        used: true,
        usedById: userId,
      },
    }),
  ])

  return NextResponse.json({ success: true, coupleId: couple.id })
}
