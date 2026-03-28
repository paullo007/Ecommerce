import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { ProductDetailClient } from '@/components/products/ProductDetailClient'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'

interface ProductPageProps {
  params: { slug: string }
}

async function getProduct(slug: string) {
  return db.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { sortOrder: 'asc' } },
      variants: true,
      reviews: {
        include: { user: { select: { name: true, image: true } } },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      _count: { select: { reviews: true } },
    },
  })
}

async function getRelatedProducts(categoryId: string, excludeId: string) {
  return db.product.findMany({
    where: { categoryId, id: { not: excludeId }, isAvailable: true },
    take: 8,
    include: {
      category: true,
      images: { orderBy: { sortOrder: 'asc' } },
      variants: true,
      _count: { select: { reviews: true } },
    },
  })
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.shortDesc || product.description.slice(0, 160),
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)
  if (!product) notFound()

  const related = await getRelatedProducts(product.categoryId, product.id)

  return (
    <>
      <ProductDetailClient product={product as any} />
      {related.length > 0 && (
        <FeaturedProducts
          products={related as any}
          eyebrow="Complete the Look"
          title="You Might Also Love"
          subtitle="More pieces from the same collection."
          viewAllHref={`/products?category=${product.category.slug}`}
        />
      )}
    </>
  )
}
