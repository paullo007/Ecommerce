'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Lock, CheckCircle2 } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  })

  const subtotal = getTotalPrice()
  const shipping = subtotal >= 200 ? 0 : 15
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          shipping: form,
        }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-light text-charcoal mb-3">Cart is empty</h2>
          <Link href="/products">
            <Button variant="primary">Shop Now</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-cream-100">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/cart" className="flex items-center gap-2 text-sm text-charcoal-400 hover:text-charcoal">
            <ArrowLeft size={14} />
            Back to Cart
          </Link>
          <div className="font-display text-lg font-medium text-charcoal">
            Maison<span className="font-light italic"> Avant-Garde</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-charcoal-400">
            <Lock size={12} />
            Secure Checkout
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Shipping Form */}
          <div>
            <h1 className="font-display text-2xl font-light text-charcoal mb-6">
              Shipping Information
            </h1>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (step === 'shipping') {
                  setStep('payment')
                } else {
                  handleCheckout()
                }
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-charcoal-400 mb-1 block">First Name *</label>
                  <input
                    required
                    type="text"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="input-field-box"
                  />
                </div>
                <div>
                  <label className="text-xs text-charcoal-400 mb-1 block">Last Name *</label>
                  <input
                    required
                    type="text"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="input-field-box"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-charcoal-400 mb-1 block">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field-box"
                />
              </div>

              <div>
                <label className="text-xs text-charcoal-400 mb-1 block">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-field-box"
                />
              </div>

              <div>
                <label className="text-xs text-charcoal-400 mb-1 block">Street Address *</label>
                <input
                  required
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="input-field-box"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="text-xs text-charcoal-400 mb-1 block">City *</label>
                  <input
                    required
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="input-field-box"
                  />
                </div>
                <div>
                  <label className="text-xs text-charcoal-400 mb-1 block">State *</label>
                  <input
                    required
                    type="text"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="input-field-box"
                  />
                </div>
                <div>
                  <label className="text-xs text-charcoal-400 mb-1 block">ZIP *</label>
                  <input
                    required
                    type="text"
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    className="input-field-box"
                  />
                </div>
              </div>

              <div className="h-px bg-cream-200 my-2" />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                loading={loading}
                className="group"
              >
                <Lock size={14} className="mr-2" />
                {loading ? 'Redirecting to Stripe...' : `Pay ${formatPrice(total)}`}
              </Button>

              <p className="text-xs text-center text-charcoal-400">
                You&apos;ll be redirected to Stripe&apos;s secure payment page.
              </p>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div>
            <h2 className="font-medium text-charcoal mb-5">Order Summary</h2>

            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-cream-200 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-charcoal text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-charcoal truncate">{item.name}</p>
                    {item.variant && <p className="text-xs text-charcoal-400">{item.variant}</p>}
                  </div>
                  <span className="text-sm font-medium text-charcoal">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm border-t border-cream-200 pt-4">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Tax (8%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-base font-medium border-t border-cream-200 pt-3 mt-3">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Trust */}
            <div className="mt-6 p-4 bg-cream-50 rounded-2xl border border-cream-200 space-y-2">
              {[
                '256-bit SSL encryption',
                'Powered by Stripe',
                '30-day free returns',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-charcoal-400">
                  <CheckCircle2 size={12} className="text-green-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
