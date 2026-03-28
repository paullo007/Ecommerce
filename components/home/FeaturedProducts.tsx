'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/products/ProductCard'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import type { Product } from '@/types'

interface FeaturedProductsProps {
  products: Product[]
  title?: string
  subtitle?: string
  eyebrow?: string
  viewAllHref?: string
}

export function FeaturedProducts({
  products,
  title = 'Curated for Your Space',
  subtitle = 'Each piece selected for its exceptional craft, materials, and design integrity.',
  eyebrow = 'Featured Collection',
  viewAllHref = '/products',
}: FeaturedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const width = scrollRef.current.clientWidth
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -width * 0.8 : width * 0.8,
      behavior: 'smooth',
    })
  }

  if (!products.length) return null

  return (
    <section className="section-py bg-cream-50">
      <div className="max-w-9xl mx-auto px-6 md:px-12">
        {/* Header */}
        <AnimateOnScroll className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow text-terracotta mb-3">{eyebrow}</p>
            <h2 className="heading-section text-charcoal max-w-md">{title}</h2>
            <p className="text-charcoal-400 text-sm mt-3 max-w-md">{subtitle}</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Scroll controls */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full border border-cream-300 flex items-center justify-center text-charcoal-400 hover:border-charcoal hover:text-charcoal transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full border border-cream-300 flex items-center justify-center text-charcoal-400 hover:border-charcoal hover:text-charcoal transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <Link
              href={viewAllHref}
              className="flex items-center gap-1 text-sm font-medium text-charcoal hover:text-terracotta transition-colors group"
            >
              View All
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </AnimateOnScroll>

        {/* Products scroll */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 md:-mx-12 md:px-12"
        >
          {products.map((product, i) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[260px] md:w-[300px]"
            >
              <ProductCard product={product} priority={i < 4} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
