import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import Link from 'next/link'
import { Package, Heart, User, Settings, ArrowRight } from 'lucide-react'

export const metadata = { title: 'My Account' }

export default async function AccountPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const [orderCount, wishlistCount] = await Promise.all([
    db.order.count({ where: { userId: session.user.id } }),
    db.wishlistItem.count({ where: { userId: session.user.id } }),
  ])

  const recentOrders = await db.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 3,
    include: { items: { take: 1, include: { product: { include: { images: { take: 1 } } } } } },
  })

  return (
    <div className="pt-24 pb-20 min-h-screen bg-cream-100">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-10">
          <p className="eyebrow text-terracotta mb-2">My Account</p>
          <h1 className="font-display text-display-lg font-light text-charcoal">
            Welcome back, {session.user?.name?.split(' ')[0] || 'there'}.
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Orders', value: orderCount, icon: Package, href: '/account/orders' },
            { label: 'Wishlist Items', value: wishlistCount, icon: Heart, href: '/account/wishlist' },
            { label: 'Account Status', value: 'Active', icon: User, href: '/account/profile' },
            { label: 'Member Since', value: new Date(session.user?.id ?? '').getFullYear() || '2025', icon: Settings, href: '/account/profile' },
          ].map(({ label, value, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="bg-white rounded-2xl p-5 border border-cream-200 hover:border-charcoal-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon size={16} className="text-terracotta" />
                <ArrowRight size={12} className="text-charcoal-300 group-hover:text-charcoal transition-colors" />
              </div>
              <p className="font-display text-2xl font-light text-charcoal">{value}</p>
              <p className="text-xs text-charcoal-400 mt-0.5">{label}</p>
            </Link>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-cream-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200">
            <h2 className="font-medium text-charcoal">Recent Orders</h2>
            <Link href="/account/orders" className="text-xs text-terracotta hover:underline">
              View all
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <Package size={32} className="text-charcoal-200 mx-auto mb-3" />
              <p className="text-sm text-charcoal-400">No orders yet.</p>
              <Link href="/products" className="text-xs text-terracotta hover:underline mt-1 block">
                Start shopping →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-cream-100">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-charcoal">{order.orderNumber}</p>
                    <p className="text-xs text-charcoal-400 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide ${
                      order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                      order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                      'bg-cream-200 text-charcoal-500'
                    }`}>
                      {order.status.toLowerCase()}
                    </span>
                    <p className="text-sm font-medium text-charcoal mt-1">
                      ${order.total.toFixed(0)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            { label: 'My Profile', description: 'Update your name, email, and password', href: '/account/profile', icon: User },
            { label: 'My Orders', description: 'View all past and current orders', href: '/account/orders', icon: Package },
            { label: 'My Wishlist', description: 'Items you\'ve saved for later', href: '/account/wishlist', icon: Heart },
          ].map(({ label, description, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-cream-200 hover:border-charcoal-300 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-terracotta/10 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-terracotta" />
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm group-hover:text-terracotta transition-colors">{label}</p>
                <p className="text-xs text-charcoal-400 mt-0.5">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
