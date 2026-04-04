import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { rateLimit, getClientIp } from '@/lib/security'

export async function GET(req: NextRequest) {
  try {
    // Rate limit: 60 requests per IP per minute
    const ip = getClientIp(req)
    const rl = rateLimit(`products:${ip}`, 60, 60 * 1000)
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many requests.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(rl.retryAfterMs / 1000)) } }
      )
    }

    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const filter = searchParams.get('filter')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort')
    const page = Number(searchParams.get('page')) || 1
    const limit = Math.min(Number(searchParams.get('limit')) || 24, 100) // cap at 100
    const skip = (page - 1) * limit

    const where: any = { isAvailable: true }

    if (category) where.category = { slug: category }
    if (filter === 'featured') where.featured = true
    if (filter === 'new') where.newArrival = true
    if (filter === 'bestseller') where.bestSeller = true
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const orderBy: any =
      sort === 'price-asc' ? { price: 'asc' } :
      sort === 'price-desc' ? { price: 'desc' } :
      sort === 'name' ? { name: 'asc' } :
      { createdAt: 'desc' }

    const [products, total] = await Promise.all([
      db.product.findMany({
        where, orderBy, skip, take: limit,
        include: {
          category: true,
          images: { orderBy: { sortOrder: 'asc' } },
          variants: true,
          _count: { select: { reviews: true } },
        },
      }),
      db.product.count({ where }),
    ])

    return NextResponse.json({ products, total, page, pages: Math.ceil(total / limit) })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Products API error:', error)
    return NextResponse.json({ error: 'Failed to fetch products.' }, { status: 500 })
  }
}
