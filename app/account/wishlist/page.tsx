import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import Link from 'next/link'
import { ArrowLeft, Heart } from 'lucide-react'
import { ProductCard } from '@/components/products/ProductCard'

export const metadata = { title: 'My Wishlist' }

export default async function WishlistPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const wishlistItems = await db.wishlistItem.findMany({
    where: { userId: session.user.id },
    include: {
      product: {
        include: {
          category: true,
          images: { orderBy: { sortOrder: 'asc' } },
          variants: true,
          _count: { select: { reviews: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="pt-24 pb-20 min-h-screen bg-cream-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/account" className="text-charcoal-400 hover:text-charcoal transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-display text-display-md font-light text-charcoal">My Wishlist</h1>
            <p className="text-charcoal-400 text-sm mt-0.5">{wishlistItems.length} saved items</p>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart size={40} className="text-charcoal-200 mb-4" />
            <h3 className="font-display text-xl font-light text-charcoal mb-2">Nothing saved yet</h3>
            <p className="text-sm text-charcoal-400 mb-6">Tap the heart on any product to save it here.</p>
            <Link href="/products" className="btn-primary text-sm">Explore Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlistItems.map(({ product }) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
