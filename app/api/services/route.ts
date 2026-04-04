import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { rateLimit, getClientIp } from '@/lib/security'

export async function GET(req: NextRequest) {
  try {
    // Rate limit: 60 requests per IP per minute
    const ip = getClientIp(req)
    const rl = rateLimit(`services:${ip}`, 60, 60 * 1000)
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many requests.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(rl.retryAfterMs / 1000)) } }
      )
    }

    const services = await db.service.findMany({
      where: { isAvailable: true },
      orderBy: { sortOrder: 'asc' },
    })
    return NextResponse.json({ services })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Services error:', error)
    return NextResponse.json({ error: 'Failed to fetch services.' }, { status: 500 })
  }
}
