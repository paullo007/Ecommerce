'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice, getTotalItems } =
    useCartStore()

  const total = getTotalPrice()
  const count = getTotalItems()

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-cream-100 shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cream-200">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-charcoal" />
            <span className="font-medium text-charcoal">
              Cart{' '}
              {count > 0 && (
                <span className="text-charcoal-400 font-normal text-sm">({count})</span>
              )}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-cream-200 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center mb-4">
                <ShoppingBag size={24} className="text-charcoal-400" />
              </div>
              <p className="font-display text-xl font-light text-charcoal mb-2">
                Your cart is empty
              </p>
              <p className="text-sm text-charcoal-400 mb-6">
                Discover our curated collection of home essentials.
              </p>
              <Button onClick={closeCart} variant="primary" size="sm">
                Explore Products
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-cream-200">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-5">
                  {/* Image */}
                  <div className="relative w-20 h-24 bg-cream-200 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={closeCart}
                      className="text-sm font-medium text-charcoal hover:text-terracotta line-clamp-2 transition-colors"
                    >
                      {item.name}
                    </Link>
                    {item.variant && (
                      <p className="text-xs text-charcoal-400 mt-0.5">{item.variant}</p>
                    )}
                    <p className="text-sm font-medium text-terracotta mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity + Remove */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 border border-cream-300 rounded-full">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1, item.variantId)
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-cream-200 rounded-full transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1, item.variantId)
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-cream-200 rounded-full transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="p-1.5 text-charcoal-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-cream-200 p-6 space-y-4 bg-cream-100">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-charcoal-500">Subtotal</span>
              <span className="font-medium text-charcoal">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-charcoal-400">
              Shipping and taxes calculated at checkout
            </p>

            {/* CTA */}
            <Link href="/checkout" onClick={closeCart} className="block">
              <Button variant="primary" fullWidth className="group">
                Proceed to Checkout
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Button>
            </Link>

            <Link
              href="/cart"
              onClick={closeCart}
              className="block text-center text-sm text-charcoal-500 hover:text-charcoal transition-colors"
            >
              View full cart
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
