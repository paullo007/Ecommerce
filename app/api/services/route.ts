import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const services = await db.service.findMany({
      where: { isAvailable: true },
      orderBy: { sortOrder: 'asc' },
    })
    return NextResponse.json({ services })
  } catch (error) {
    console.error('Services error:', error)
    return NextResponse.json({ error: 'Failed to fetch services.' }, { status: 500 })
  }
}
