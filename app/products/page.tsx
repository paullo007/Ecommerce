import { Suspense } from 'react'
import { db } from '@/lib/db'
import { ProductGrid } from '@/components/products/ProductGrid'
import { ProductFilters } from '@/components/products/ProductFilters'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

interface ProductsPageProps {
  searchParams: {
    category?: string
    filter?: string
    search?: string
    sort?: string
    tag?: string
    page?: string
  }
}

async function getProducts(searchParams: ProductsPageProps['searchParams']) {
  const page = Number(searchParams.page) || 1
  const perPage = 24
  const skip = (page - 1) * perPage

  const where: any = { isAvailable: true }

  if (searchParams.category) {
    where.category = { slug: searchParams.category }
  }

  if (searchParams.filter === 'featured') where.featured = true
  if (searchParams.filter === 'new') where.newArrival = true
  if (searchParams.filter === 'bestseller') where.bestSeller = true

  if (searchParams.search) {
    where.OR = [
      { name: { contains: searchParams.search, mode: 'insensitive' } },
      { description: { contains: searchParams.search, mode: 'insensitive' } },
      { tags: { has: searchParams.search.toLowerCase() } },
    ]
  }

  if (searchParams.tag) {
    where.tags = { has: searchParams.tag }
  }

  const orderBy: any =
    searchParams.sort === 'price-asc'
      ? { price: 'asc' }
      : searchParams.sort === 'price-desc'
      ? { price: 'desc' }
      : searchParams.sort === 'name'
      ? { name: 'asc' }
      : { createdAt: 'desc' }

  const [products, total] = await Promise.all([
    db.product.findMany({
      where,
      orderBy,
      skip,
      take: perPage,
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        variants: true,
        _count: { select: { reviews: true } },
      },
    }),
    db.product.count({ where }),
  ])

  return { products, total, page, perPage }
}

async function getCategories() {
  return db.category.findMany({ orderBy: { sortOrder: 'asc' } })
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const [{ products, total, page, perPage }, categories] = await Promise.all([
    getProducts(searchParams),
    getCategories(),
  ])

  const totalPages = Math.ceil(total / perPage)

  const title = searchParams.search
    ? `Results for "${searchParams.search}"`
    : searchParams.filter === 'new'
    ? 'New Arrivals'
    : searchParams.filter === 'featured'
    ? 'Featured Collection'
    : searchParams.filter === 'bestseller'
    ? 'Best Sellers'
    : searchParams.category
    ? categories.find((c) => c.slug === searchParams.category)?.name || 'Products'
    : 'All Products'

  return (
    <div className="pt-24 pb-20 min-h-screen bg-cream-100">
      {/* Header */}
      <div className="max-w-9xl mx-auto px-6 md:px-12 py-10">
        <AnimateOnScroll>
          <p className="eyebrow text-terracotta mb-2">Shop</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-display-lg font-light text-charcoal">
                {title}
              </h1>
              <p className="text-charcoal-400 text-sm mt-1">
                {total} {total === 1 ? 'product' : 'products'} found
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      <div className="max-w-9xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <Suspense fallback={null}>
              <ProductFilters
                categories={categories}
                activeCategory={searchParams.category}
                activeFilter={searchParams.filter}
                activeSort={searchParams.sort}
              />
            </Suspense>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <Suspense
              fallback={
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[3/4] rounded-2xl bg-cream-200 animate-pulse"
                    />
                  ))}
                </div>
              }
            >
              <ProductGrid
                products={products as any}
                page={page}
                totalPages={totalPages}
                searchParams={searchParams}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
