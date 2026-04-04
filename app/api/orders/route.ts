import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { rateLimit, getClientIp } from '@/lib/security'

export async function GET(req: NextRequest) {
  try {
    // Rate limit: 30 requests per IP per minute
    const ip = getClientIp(req)
    const rl = rateLimit(`orders:${ip}`, 30, 60 * 1000)
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many requests.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(rl.retryAfterMs / 1000)) } }
      )
    }

    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const orders = await db.order.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: { include: { images: { where: { primary: true }, take: 1 } } },
          },
        },
        address: true,
      },
    })

    return NextResponse.json({ orders })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Orders error:', error)
    return NextResponse.json({ error: 'Failed to fetch orders.' }, { status: 500 })
  }
}
