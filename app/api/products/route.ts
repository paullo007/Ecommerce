import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const filter = searchParams.get('filter')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort')
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 24
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
    console.error('Products API error:', error)
    return NextResponse.json({ error: 'Failed to fetch products.' }, { status: 500 })
  }
}
