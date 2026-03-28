import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Package } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export const metadata = { title: 'My Orders' }

const statusStyles: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  PROCESSING: 'bg-purple-100 text-purple-700',
  SHIPPED: 'bg-indigo-100 text-indigo-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
  REFUNDED: 'bg-gray-100 text-gray-600',
}

export default async function OrdersPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const orders = await db.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: {
          product: {
            include: { images: { where: { primary: true }, take: 1 } },
          },
        },
      },
    },
  })

  return (
    <div className="pt-24 pb-20 min-h-screen bg-cream-100">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/account" className="text-charcoal-400 hover:text-charcoal transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-display text-display-md font-light text-charcoal">My Orders</h1>
            <p className="text-charcoal-400 text-sm mt-0.5">{orders.length} {orders.length === 1 ? 'order' : 'orders'}</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Package size={40} className="text-charcoal-200 mb-4" />
            <h3 className="font-display text-xl font-light text-charcoal mb-2">No orders yet</h3>
            <p className="text-sm text-charcoal-400 mb-6">Once you place an order, it will appear here.</p>
            <Link href="/products" className="btn-primary text-sm">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border border-cream-200 overflow-hidden">
                {/* Order header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-cream-100 bg-cream-50">
                  <div>
                    <p className="text-xs text-charcoal-400">Order Number</p>
                    <p className="text-sm font-medium text-charcoal">{order.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-charcoal-400">Date</p>
                    <p className="text-sm text-charcoal">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-charcoal-400">Total</p>
                    <p className="text-sm font-medium text-charcoal">{formatPrice(order.total)}</p>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide ${statusStyles[order.status] || 'bg-cream-200 text-charcoal-500'}`}>
                      {order.status.toLowerCase()}
                    </span>
                  </div>
                </div>

                {/* Order items */}
                <div className="divide-y divide-cream-50">
                  {order.items.map((item) => {
                    const img = item.product.images[0]
                    return (
                      <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                        <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-cream-200 flex-shrink-0">
                          {img && (
                            <Image src={img.url} alt={item.productName} fill className="object-cover" sizes="56px" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.productSlug}`}
                            className="text-sm font-medium text-charcoal hover:text-terracotta transition-colors line-clamp-1"
                          >
                            {item.productName}
                          </Link>
                          <p className="text-xs text-charcoal-400 mt-0.5">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-charcoal flex-shrink-0">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
