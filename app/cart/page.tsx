'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()
  const subtotal = getTotalPrice()
  const shipping = subtotal >= 200 ? 0 : 15
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="pt-24 pb-20 min-h-screen bg-cream-100">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <AnimateOnScroll>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-display text-display-lg font-light text-charcoal">
                Your Cart
              </h1>
              <p className="text-charcoal-400 text-sm mt-1">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-2 text-sm text-charcoal-400 hover:text-charcoal transition-colors"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>
          </div>
        </AnimateOnScroll>

        {items.length === 0 ? (
          <AnimateOnScroll className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center mb-6">
              <ShoppingBag size={32} className="text-charcoal-300" />
            </div>
            <h2 className="font-display text-2xl font-light text-charcoal mb-3">
              Your cart is empty
            </h2>
            <p className="text-charcoal-400 text-sm mb-8 max-w-sm">
              Explore our curated collection of home decor and find pieces you love.
            </p>
            <Link href="/products">
              <Button variant="primary" size="lg">
                Start Shopping
              </Button>
            </Link>
          </AnimateOnScroll>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-5 bg-white rounded-2xl p-5 border border-cream-200"
                >
                  <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-cream-200 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/products/${item.slug}`}
                          className="text-sm font-medium text-charcoal hover:text-terracotta transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        {item.variant && (
                          <p className="text-xs text-charcoal-400 mt-0.5">{item.variant}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-charcoal-300 hover:text-red-500 transition-colors p-1 flex-shrink-0"
                        aria-label="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1 border border-cream-300 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-cream-200 rounded-full transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-cream-200 rounded-full transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-medium text-charcoal text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-xs text-charcoal-400 hover:text-red-500 transition-colors mt-4"
              >
                Clear entire cart
              </button>
            </div>

            {/* Summary */}
            <AnimateOnScroll direction="right" className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-cream-200 sticky top-28">
                <h2 className="font-medium text-charcoal mb-5">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-charcoal-500">Subtotal</span>
                    <span className="text-charcoal">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-500">Shipping</span>
                    <span className="text-charcoal">
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-500">Est. Tax (8%)</span>
                    <span className="text-charcoal">{formatPrice(tax)}</span>
                  </div>
                  <div className="h-px bg-cream-200 my-3" />
                  <div className="flex justify-between text-base">
                    <span className="font-medium text-charcoal">Total</span>
                    <span className="font-medium text-charcoal">{formatPrice(total)}</span>
                  </div>
                </div>

                {subtotal < 200 && (
                  <p className="text-xs text-charcoal-400 mt-3 bg-cream-50 rounded-xl p-3">
                    Add{' '}
                    <span className="font-medium text-charcoal">
                      {formatPrice(200 - subtotal)}
                    </span>{' '}
                    more for free shipping.
                  </p>
                )}

                <Link href="/checkout" className="block mt-5">
                  <Button variant="primary" fullWidth size="lg" className="group">
                    Proceed to Checkout
                    <ArrowRight
                      size={14}
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    />
                  </Button>
                </Link>

                <div className="mt-4 space-y-2">
                  {['Visa', 'Mastercard', 'AmEx', 'PayPal'].map((card) => (
                    <span
                      key={card}
                      className="inline-block text-[10px] font-medium bg-cream-100 border border-cream-200 rounded px-2 py-0.5 mr-1.5 text-charcoal-400"
                    >
                      {card}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        )}
      </div>
    </div>
  )
}
