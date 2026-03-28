'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from './ProductCard'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  page: number
  totalPages: number
  searchParams: Record<string, string | undefined>
}

export function ProductGrid({ products, page, totalPages, searchParams }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center mb-4">
          <span className="text-2xl">🛋️</span>
        </div>
        <h3 className="font-display text-xl font-light text-charcoal mb-2">No products found</h3>
        <p className="text-sm text-charcoal-400 mb-6">
          Try adjusting your filters or browse all categories.
        </p>
        <Link href="/products" className="btn-primary text-sm">
          View All Products
        </Link>
      </div>
    )
  }

  const buildPageUrl = (p: number) => {
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, val]) => {
      if (val && key !== 'page') params.set(key, val)
    })
    if (p > 1) params.set('page', String(p))
    return `/products?${params.toString()}`
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 8} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <Link
            href={buildPageUrl(page - 1)}
            className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${
              page <= 1
                ? 'border-cream-200 text-charcoal-300 pointer-events-none'
                : 'border-cream-300 text-charcoal hover:border-charcoal'
            }`}
          >
            <ChevronLeft size={16} />
          </Link>

          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            const p = i + 1
            return (
              <Link
                key={p}
                href={buildPageUrl(p)}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm transition-colors ${
                  p === page
                    ? 'bg-charcoal text-white'
                    : 'text-charcoal-500 hover:bg-cream-200'
                }`}
              >
                {p}
              </Link>
            )
          })}

          <Link
            href={buildPageUrl(page + 1)}
            className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${
              page >= totalPages
                ? 'border-cream-200 text-charcoal-300 pointer-events-none'
                : 'border-cream-300 text-charcoal hover:border-charcoal'
            }`}
          >
            <ChevronRight size={16} />
          </Link>
        </div>
      )}
    </div>
  )
}
