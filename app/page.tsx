import { HeroSection } from '@/components/home/HeroSection'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { ServicesSection } from '@/components/home/ServicesSection'
import { InspirationSection } from '@/components/home/InspirationSection'
import { BrandStory } from '@/components/home/BrandStory'
import { ValueProps } from '@/components/home/ValueProps'
import { db } from '@/lib/db'

async function getFeaturedProducts() {
  try {
    return await db.product.findMany({
      where: { featured: true, isAvailable: true },
      take: 10,
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        variants: true,
        _count: { select: { reviews: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    return []
  }
}

async function getNewArrivals() {
  try {
    return await db.product.findMany({
      where: { newArrival: true, isAvailable: true },
      take: 10,
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        variants: true,
        _count: { select: { reviews: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [featuredProducts, newArrivals] = await Promise.all([
    getFeaturedProducts(),
    getNewArrivals(),
  ])

  return (
    <>
      <HeroSection />
      <ValueProps />
      <CategoryGrid />
      <FeaturedProducts
        products={featuredProducts as any}
        eyebrow="Featured Collection"
        title="Curated for Your Space"
        subtitle="Each piece selected for its exceptional craft, materials, and design integrity."
        viewAllHref="/products?filter=featured"
      />
      <BrandStory />
      <FeaturedProducts
        products={newArrivals as any}
        eyebrow="New Arrivals"
        title="Just In — The Latest."
        subtitle="Fresh perspectives on home living, just added to the collection."
        viewAllHref="/products?filter=new"
      />
      <ServicesSection />
      <InspirationSection />
    </>
  )
}
