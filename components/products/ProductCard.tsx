'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag, Eye } from 'lucide-react'
import { useCartStore, useWishlistStore } from '@/lib/store'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [hovering, setHovering] = useState(false)
  const { addItem } = useCartStore()
  const { hasItem, toggleItem } = useWishlistStore()

  const primaryImage =
    product.images.find((img) => img.primary) || product.images[0]
  const secondaryImage = product.images[1]

  const discount = calculateDiscount(product.price, product.comparePrice ?? undefined)
  const isWishlisted = hasItem(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!primaryImage) return

    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: primaryImage.url,
      quantity: 1,
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem(product.id)
  }

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Image Container */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-cream-200 aspect-[3/4]">
          {/* Primary image */}
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt || product.name}
              fill
              priority={priority}
              className={`object-cover transition-all duration-700 ${
                hovering && secondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
              } ${imageLoaded ? '' : 'blur-sm'}`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onLoad={() => setImageLoaded(true)}
            />
          )}

          {/* Secondary image (hover) */}
          {secondaryImage && (
            <Image
              src={secondaryImage.url}
              alt={secondaryImage.alt || product.name}
              fill
              className={`object-cover transition-all duration-700 ${
                hovering ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.newArrival && <Badge variant="new">New</Badge>}
            {product.bestSeller && <Badge variant="bestseller">Best Seller</Badge>}
            {discount && <Badge variant="sale">-{discount}%</Badge>}
            {product.stock === 0 && (
              <Badge variant="dark">Sold Out</Badge>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              isWishlisted
                ? 'bg-terracotta text-white scale-100'
                : 'bg-white/90 text-charcoal-400 opacity-0 group-hover:opacity-100 hover:text-terracotta'
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>

          {/* Quick Actions */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-3 flex gap-2 transition-all duration-300 ${
              hovering ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 flex items-center justify-center gap-2 bg-charcoal text-white rounded-xl py-2.5 text-xs font-medium hover:bg-charcoal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={13} />
              {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
            </button>
            <Link
              href={`/products/${product.slug}`}
              className="w-10 flex items-center justify-center bg-white/90 text-charcoal rounded-xl hover:bg-white transition-colors"
            >
              <Eye size={14} />
            </Link>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <p className="text-xs text-charcoal-400 eyebrow">{product.category.name}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium text-charcoal hover:text-terracotta transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-charcoal">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="text-xs text-charcoal-400 line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
