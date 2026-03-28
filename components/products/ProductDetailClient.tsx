'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Star, ChevronRight, Plus, Minus, Share2, Ruler, Package, RotateCcw } from 'lucide-react'
import { useCartStore, useWishlistStore } from '@/lib/store'
import { formatPrice, getStockStatus, calculateDiscount } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import type { Product } from '@/types'

interface ProductDetailClientProps {
  product: Product & {
    reviews: Array<{
      id: string
      rating: number
      title?: string | null
      body: string
      createdAt: string
      user: { name?: string | null; image?: string | null }
    }>
  }
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description')

  const { addItem } = useCartStore()
  const { hasItem, toggleItem } = useWishlistStore()

  const discount = calculateDiscount(product.price, product.comparePrice ?? undefined)
  const stockStatus = getStockStatus(product.stock, product.lowStockAlert)
  const isWishlisted = hasItem(product.id)
  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : null

  const handleAddToCart = async () => {
    setAdding(true)
    const primaryImage = product.images.find((img) => img.primary) || product.images[0]
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: primaryImage?.url || '',
      quantity,
      variant: selectedVariant || undefined,
    })
    await new Promise((r) => setTimeout(r, 500))
    setAdding(false)
  }

  return (
    <div className="pt-20 bg-cream-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-9xl mx-auto px-6 md:px-12 py-4">
        <nav className="flex items-center gap-2 text-xs text-charcoal-400">
          <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-charcoal transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <Link href={`/products?category=${product.category.slug}`} className="hover:text-charcoal transition-colors">
            {product.category.name}
          </Link>
          <ChevronRight size={12} />
          <span className="text-charcoal">{product.name}</span>
        </nav>
      </div>

      {/* Product layout */}
      <div className="max-w-9xl mx-auto px-6 md:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* Gallery */}
          <div>
            {/* Main image */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-cream-200 mb-3">
              {product.images[selectedImage] && (
                <Image
                  src={product.images[selectedImage].url}
                  alt={product.images[selectedImage].alt || product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.newArrival && <Badge variant="new">New</Badge>}
                {product.bestSeller && <Badge variant="bestseller">Best Seller</Badge>}
                {discount && <Badge variant="sale">-{discount}%</Badge>}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    className={`relative flex-shrink-0 w-16 h-20 rounded-xl overflow-hidden transition-all duration-200 ${
                      i === selectedImage
                        ? 'ring-2 ring-charcoal ring-offset-2 ring-offset-cream-100'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <AnimateOnScroll direction="right">
            <div className="sticky top-28 space-y-6">
              {/* Category + title */}
              <div>
                <p className="eyebrow text-terracotta mb-2">{product.category.name}</p>
                <h1 className="font-display text-display-md font-light text-charcoal leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                {avgRating && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < Math.round(avgRating) ? 'fill-terracotta text-terracotta' : 'text-cream-300'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-charcoal-400">
                      {avgRating.toFixed(1)} ({product.reviews.length} reviews)
                    </span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl font-light text-charcoal">
                  {formatPrice(product.price)}
                </span>
                {product.comparePrice && product.comparePrice > product.price && (
                  <span className="text-sm text-charcoal-400 line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
                {discount && (
                  <Badge variant="sale">Save {discount}%</Badge>
                )}
              </div>

              <div className="w-10 h-px bg-cream-300" />

              {/* Short description */}
              {product.shortDesc && (
                <p className="text-sm text-charcoal-500 leading-relaxed">{product.shortDesc}</p>
              )}

              {/* Variants */}
              {product.variants.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-charcoal mb-2">
                    {product.variants[0].name}:{' '}
                    <span className="font-normal text-charcoal-400">{selectedVariant || 'Select an option'}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v.value)}
                        className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200 ${
                          selectedVariant === v.value
                            ? 'bg-charcoal text-white border-charcoal'
                            : 'border-cream-300 text-charcoal-600 hover:border-charcoal'
                        } ${v.stock === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
                        disabled={v.stock === 0}
                      >
                        {v.value}
                        {v.stock === 0 && ' — Sold out'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <p className="text-xs font-medium text-charcoal mb-2">Quantity</p>
                <div className="inline-flex items-center border border-cream-300 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-cream-200 rounded-full transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-cream-200 rounded-full transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Stock status */}
              <p className={`text-xs font-medium ${stockStatus.color}`}>
                {stockStatus.label}
              </p>

              {/* Add to Cart + Wishlist */}
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  loading={adding}
                  disabled={!stockStatus.available}
                >
                  <ShoppingBag size={16} className="mr-2" />
                  {stockStatus.available ? 'Add to Cart' : 'Sold Out'}
                </Button>
                <button
                  onClick={() => toggleItem(product.id)}
                  className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-200 ${
                    isWishlisted
                      ? 'bg-terracotta border-terracotta text-white'
                      : 'border-cream-300 text-charcoal-400 hover:border-terracotta hover:text-terracotta'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
                  className="w-14 h-14 rounded-full border border-cream-300 text-charcoal-400 hover:border-charcoal hover:text-charcoal flex items-center justify-center transition-all duration-200"
                  aria-label="Share"
                >
                  <Share2 size={16} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { icon: Package, label: 'Free Delivery', sub: 'Orders $200+' },
                  { icon: RotateCcw, label: '30-Day Returns', sub: 'No questions' },
                  { icon: Ruler, label: '5-Year Warranty', sub: 'On all products' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="text-center p-3 bg-cream-50 rounded-xl border border-cream-200">
                    <Icon size={16} className="mx-auto text-terracotta mb-1.5" />
                    <p className="text-[10px] font-medium text-charcoal">{label}</p>
                    <p className="text-[10px] text-charcoal-400">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Tabs: Description / Details / Reviews */}
        <div className="mt-16 border-t border-cream-200 pt-10">
          <div className="flex gap-8 border-b border-cream-200 mb-8">
            {(['description', 'details', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium capitalize border-b-2 transition-colors -mb-px ${
                  activeTab === tab
                    ? 'border-charcoal text-charcoal'
                    : 'border-transparent text-charcoal-400 hover:text-charcoal'
                }`}
              >
                {tab === 'reviews' ? `Reviews (${product.reviews.length})` : tab}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="max-w-2xl prose prose-sm text-charcoal-500 leading-relaxed">
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="max-w-lg">
              <dl className="space-y-3">
                {[
                  { label: 'SKU', value: product.sku },
                  { label: 'Material', value: product.material },
                  { label: 'Finish', value: product.finish },
                  { label: 'Dimensions', value: product.dimensions },
                  { label: 'Origin', value: product.origin },
                ]
                  .filter((d) => d.value)
                  .map(({ label, value }) => (
                    <div key={label} className="flex gap-8">
                      <dt className="w-28 flex-shrink-0 text-xs font-medium text-charcoal-400 eyebrow">
                        {label}
                      </dt>
                      <dd className="text-sm text-charcoal">{value}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-2xl">
              {product.reviews.length === 0 ? (
                <p className="text-sm text-charcoal-400">No reviews yet. Be the first.</p>
              ) : (
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-cream-200 pb-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium text-charcoal">
                            {review.user.name || 'Anonymous'}
                          </p>
                          <div className="flex items-center gap-0.5 mt-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={11}
                                className={i < review.rating ? 'fill-terracotta text-terracotta' : 'text-cream-300'}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-charcoal-400">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {review.title && (
                        <p className="text-sm font-medium text-charcoal mb-1">{review.title}</p>
                      )}
                      <p className="text-sm text-charcoal-500 leading-relaxed">{review.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
