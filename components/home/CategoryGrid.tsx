'use client'

import Link from 'next/link'
import Image from 'next/image'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

const categories = [
  {
    name: 'Furniture',
    slug: 'furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    count: '240+ pieces',
    size: 'large',
  },
  {
    name: 'Lighting',
    slug: 'lighting',
    image: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=800&q=80',
    count: '180+ fixtures',
    size: 'small',
  },
  {
    name: 'Wall Art & Decor',
    slug: 'wall-art-decor',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    count: '320+ works',
    size: 'small',
  },
  {
    name: 'Textiles',
    slug: 'textiles',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    count: '160+ items',
    size: 'small',
  },
  {
    name: 'Kitchen & Dining',
    slug: 'kitchen-dining',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    count: '200+ pieces',
    size: 'small',
  },
  {
    name: 'Outdoor Living',
    slug: 'outdoor-living',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    count: '140+ items',
    size: 'large',
  },
]

export function CategoryGrid() {
  return (
    <section className="section-py bg-cream-100">
      <div className="max-w-9xl mx-auto px-6 md:px-12">
        {/* Header */}
        <AnimateOnScroll className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="eyebrow text-terracotta mb-3">Shop by Room & Style</p>
            <h2 className="heading-section text-charcoal">
              Every Space.<br />
              <span className="font-light italic text-charcoal-500">Reimagined.</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-charcoal underline underline-offset-4 hover:text-terracotta transition-colors self-start md:self-auto"
          >
            View all categories
          </Link>
        </AnimateOnScroll>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Large tile 1 */}
          <AnimateOnScroll
            className="col-span-2 row-span-2 lg:col-span-2"
            delay={0}
          >
            <CategoryCard category={categories[0]} tall />
          </AnimateOnScroll>

          {/* Small tiles */}
          {categories.slice(1, 5).map((cat, i) => (
            <AnimateOnScroll key={cat.slug} delay={100 + i * 80}>
              <CategoryCard category={cat} />
            </AnimateOnScroll>
          ))}

          {/* Large tile 2 */}
          <AnimateOnScroll className="col-span-2" delay={300}>
            <CategoryCard category={categories[5]} wide />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}

function CategoryCard({
  category,
  tall = false,
  wide = false,
}: {
  category: (typeof categories)[0]
  tall?: boolean
  wide?: boolean
}) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group relative overflow-hidden rounded-2xl block bg-cream-200"
      style={{ height: tall ? '480px' : wide ? '220px' : '230px' }}
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-white/70 text-xs mb-1">{category.count}</p>
        <h3 className="font-display text-xl md:text-2xl font-medium text-white leading-tight">
          {category.name}
        </h3>
        <div className="flex items-center gap-1 mt-2 overflow-hidden h-5">
          <span className="text-white/80 text-xs translate-y-5 group-hover:translate-y-0 transition-transform duration-300">
            Shop Now →
          </span>
        </div>
      </div>
    </Link>
  )
}
