import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
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
    console.error('Orders error:', error)
    return NextResponse.json({ error: 'Failed to fetch orders.' }, { status: 500 })
  }
}
