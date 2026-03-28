'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram } from 'lucide-react'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

const inspirations = [
  {
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80',
    alt: 'Minimal living room with terracotta accents',
    tag: 'Living Room',
    href: '/inspiration',
  },
  {
    image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=600&q=80',
    alt: 'Modern kitchen with stone countertops',
    tag: 'Kitchen',
    href: '/inspiration',
  },
  {
    image: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=600&q=80',
    alt: 'Luxurious bedroom with organic textures',
    tag: 'Bedroom',
    href: '/inspiration',
  },
  {
    image: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=600&q=80',
    alt: 'Avant-garde bathroom design',
    tag: 'Bathroom',
    href: '/inspiration',
  },
  {
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80',
    alt: 'Cozy reading corner with warm lighting',
    tag: 'Study',
    href: '/inspiration',
  },
  {
    image: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=600&q=80',
    alt: 'Outdoor terrace with modern furniture',
    tag: 'Outdoor',
    href: '/inspiration',
  },
]

export function InspirationSection() {
  return (
    <section className="section-py bg-cream-100">
      <div className="max-w-9xl mx-auto px-6 md:px-12">
        {/* Header */}
        <AnimateOnScroll className="text-center mb-12">
          <p className="eyebrow text-terracotta mb-3">Design Inspiration</p>
          <h2 className="heading-section text-charcoal mb-4">
            Spaces That Inspire.
          </h2>
          <p className="text-charcoal-400 text-sm max-w-md mx-auto">
            Real homes. Real transformations. Discover what&apos;s possible when design meets intention.
          </p>
        </AnimateOnScroll>

        {/* Asymmetric masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {inspirations.map((item, i) => (
            <AnimateOnScroll
              key={i}
              delay={i * 60}
              className={`${i === 0 || i === 3 ? 'row-span-2' : ''}`}
            >
              <Link
                href={item.href}
                className="group relative block overflow-hidden rounded-2xl bg-cream-200"
                style={{ height: i === 0 || i === 3 ? '480px' : '230px' }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-500" />

                {/* Tag */}
                <div className="absolute bottom-3 left-3">
                  <span className="inline-flex items-center px-3 py-1 bg-white/90 text-charcoal text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    {item.tag}
                  </span>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Instagram CTA */}
        <AnimateOnScroll className="flex items-center justify-center gap-3 mt-10">
          <Instagram size={18} className="text-charcoal-400" />
          <p className="text-sm text-charcoal-400">
            Follow us{' '}
            <Link
              href="#"
              className="text-charcoal font-medium hover:text-terracotta transition-colors"
            >
              @maisonavantgarde
            </Link>{' '}
            for daily inspiration
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
