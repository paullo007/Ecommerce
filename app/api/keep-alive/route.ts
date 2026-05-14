import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const expected = `Bearer ${process.env.CRON_SECRET}`

  if (!process.env.CRON_SECRET || authHeader !== expected) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  try {
    const productCount = await db.product.count()
    return NextResponse.json({
      ok: true,
      productCount,
      pingedAt: new Date().toISOString(),
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Keep-alive error:', error)
    return NextResponse.json({ error: 'Database query failed.' }, { status: 500 })
  }
}
