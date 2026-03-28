'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { Button } from '@/components/ui/Button'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCartStore()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="pt-24 pb-20 min-h-screen bg-cream-100 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-6 text-center">
        <div className="w-20 h-20 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-forest" />
        </div>

        <h1 className="font-display text-display-md font-light text-charcoal mb-3">
          Order Confirmed!
        </h1>
        <p className="text-charcoal-400 text-sm leading-relaxed mb-2">
          Thank you for your purchase. You&apos;ll receive a confirmation email shortly with your
          order details and tracking information.
        </p>
        <p className="text-xs text-charcoal-400 mb-10">
          Our team typically processes orders within 1–2 business days.
        </p>

        <div className="bg-white rounded-2xl border border-cream-200 p-6 mb-8 text-left space-y-3">
          {[
            { label: 'Order confirmation', detail: 'Sent to your email' },
            { label: 'Processing time', detail: '1–2 business days' },
            { label: 'Shipping', detail: '3–7 business days' },
            { label: 'White-glove delivery', detail: 'Available for large items' },
          ].map(({ label, detail }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-charcoal-400">{label}</span>
              <span className="font-medium text-charcoal">{detail}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/account/orders">
            <Button variant="primary" size="lg" className="group">
              View My Orders
              <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="secondary" size="lg">
              <ShoppingBag size={14} className="mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
