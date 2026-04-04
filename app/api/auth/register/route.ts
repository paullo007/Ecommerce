import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { z } from 'zod'
import { validateOrigin, rateLimit, getClientIp } from '@/lib/security'

const schema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email().max(255),
  password: z.string().min(8).max(100),
})

export async function POST(req: NextRequest) {
  try {
    // CSRF: validate request origin
    if (!validateOrigin(req)) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }

    // Rate limit: 5 registration attempts per IP per 15 minutes
    const ip = getClientIp(req)
    const rl = rateLimit(`register:${ip}`, 5, 15 * 60 * 1000)
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(rl.retryAfterMs / 1000)) } }
      )
    }

    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input.' }, { status: 400 })
    }

    const { name, email, password } = parsed.data
    const normalizedEmail = email.toLowerCase().trim()

    const existing = await db.user.findUnique({ where: { email: normalizedEmail } })
    if (existing) {
      // Return same shape as success to prevent user enumeration
      return NextResponse.json(
        { user: { id: 'ok', name, email: normalizedEmail } },
        { status: 201 }
      )
    }

    const hashed = await bcrypt.hash(password, 12)

    const user = await db.user.create({
      data: { name, email: normalizedEmail, password: hashed },
      select: { id: true, name: true, email: true },
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Register error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
