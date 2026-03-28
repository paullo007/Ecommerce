'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Category {
  id: string
  name: string
  slug: string
}

interface ProductFiltersProps {
  categories: Category[]
  activeCategory?: string
  activeFilter?: string
  activeSort?: string
}

const sortOptions = [
  { label: 'Newest', value: '' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name A–Z', value: 'name' },
]

const filterOptions = [
  { label: 'All', value: '' },
  { label: 'New Arrivals', value: 'new' },
  { label: 'Featured', value: 'featured' },
  { label: 'Best Sellers', value: 'bestseller' },
]

export function ProductFilters({
  categories,
  activeCategory,
  activeFilter,
  activeSort,
}: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page')
    router.push(`/products?${params.toString()}`)
  }

  const clearAll = () => {
    const params = new URLSearchParams()
    const search = searchParams.get('search')
    if (search) params.set('search', search)
    router.push(`/products?${params.toString()}`)
  }

  const hasFilters = activeCategory || activeFilter || activeSort

  const filterContent = (
    <div className="space-y-6">
      {/* Clear all */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1.5 text-xs text-terracotta hover:text-terracotta-dark font-medium"
        >
          <X size={12} />
          Clear all filters
        </button>
      )}

      {/* Sort */}
      <div>
        <p className="eyebrow text-charcoal-400 mb-3">Sort By</p>
        <div className="space-y-1">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateFilter('sort', option.value)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-xl text-sm transition-colors',
                (activeSort || '') === option.value
                  ? 'bg-terracotta text-white'
                  : 'text-charcoal-600 hover:bg-cream-200'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div>
        <p className="eyebrow text-charcoal-400 mb-3">Collection</p>
        <div className="space-y-1">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateFilter('filter', option.value)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-xl text-sm transition-colors',
                (activeFilter || '') === option.value
                  ? 'bg-terracotta text-white'
                  : 'text-charcoal-600 hover:bg-cream-200'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <p className="eyebrow text-charcoal-400 mb-3">Category</p>
        <div className="space-y-1">
          <button
            onClick={() => updateFilter('category', '')}
            className={cn(
              'w-full text-left px-3 py-2 rounded-xl text-sm transition-colors',
              !activeCategory
                ? 'bg-charcoal text-white'
                : 'text-charcoal-600 hover:bg-cream-200'
            )}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateFilter('category', cat.slug)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-xl text-sm transition-colors',
                activeCategory === cat.slug
                  ? 'bg-charcoal text-white'
                  : 'text-charcoal-600 hover:bg-cream-200'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block bg-cream-50 rounded-2xl p-5 border border-cream-200 sticky top-24">
        <div className="flex items-center gap-2 mb-5">
          <SlidersHorizontal size={16} className="text-charcoal-400" />
          <span className="text-sm font-medium text-charcoal">Filters</span>
        </div>
        {filterContent}
      </div>

      {/* Mobile toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 bg-cream-50 border border-cream-200 rounded-full px-4 py-2.5 text-sm font-medium text-charcoal"
        >
          <SlidersHorizontal size={14} />
          Filters & Sort
          <ChevronDown size={14} className={cn('transition-transform', mobileOpen && 'rotate-180')} />
          {hasFilters && (
            <span className="w-4 h-4 bg-terracotta rounded-full text-[10px] text-white flex items-center justify-center">
              !
            </span>
          )}
        </button>

        {mobileOpen && (
          <div className="mt-3 bg-cream-50 rounded-2xl p-5 border border-cream-200">
            {filterContent}
          </div>
        )}
      </div>
    </>
  )
}
