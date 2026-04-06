'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Instagram, ArrowRight } from 'lucide-react'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

const rooms = [
  {
    title: 'Living Room',
    description: 'Open spaces that breathe. Sculptural furniture, layered textures, and curated art that make every gathering feel intentional.',
    images: [
      { src: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80', alt: 'Minimal living room with terracotta accents' },
      { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', alt: 'Modern living room with warm tones' },
      { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80', alt: 'Contemporary living space' },
    ],
  },
  {
    title: 'Kitchen',
    description: 'Where function meets artistry. Clean lines, premium materials, and layouts designed for how you actually cook and live.',
    images: [
      { src: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=80', alt: 'Modern kitchen with stone countertops' },
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', alt: 'Minimalist kitchen design' },
      { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', alt: 'Luxury kitchen renovation' },
    ],
  },
  {
    title: 'Bedroom',
    description: 'Sanctuaries of calm. Organic linens, ambient lighting, and a palette that invites rest and restoration.',
    images: [
      { src: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800&q=80', alt: 'Luxurious bedroom with organic textures' },
      { src: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80', alt: 'Serene bedroom design' },
      { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', alt: 'Modern bedroom with warm lighting' },
    ],
  },
  {
    title: 'Bathroom',
    description: 'Spa-inspired retreats. Natural stone, brass fixtures, and thoughtful details that elevate the everyday.',
    images: [
      { src: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=800&q=80', alt: 'Avant-garde bathroom design' },
      { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80', alt: 'Luxury bathroom with freestanding tub' },
      { src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80', alt: 'Modern bathroom renovation' },
    ],
  },
  {
    title: 'Study & Home Office',
    description: 'Focused spaces with character. Where productivity meets personality through material, light, and form.',
    images: [
      { src: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80', alt: 'Cozy reading corner with warm lighting' },
      { src: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&q=80', alt: 'Modern home office' },
      { src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80', alt: 'Designer workspace' },
    ],
  },
  {
    title: 'Outdoor Living',
    description: 'Extending the avant-garde vision beyond four walls. Terraces, gardens, and alfresco spaces designed for living.',
    images: [
      { src: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&q=80', alt: 'Outdoor terrace with modern furniture' },
      { src: 'https://images.unsplash.com/photo-1600210491892-03d54079b6ac?w=800&q=80', alt: 'Garden design with contemporary elements' },
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Modern outdoor entertaining area' },
    ],
  },
]

export default function InspirationPage() {
  return (
    <div className="bg-cream-100 min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden pt-20">
        <Image
          src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1800&q=85"
          alt="Design inspiration gallery"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
        <div className="relative z-10 max-w-9xl mx-auto px-6 md:px-12 pb-16 md:pb-24 w-full">
          <p className="eyebrow text-terracotta mb-4">Design Inspiration</p>
          <h1 className="font-display text-display-xl font-light text-white mb-4 max-w-2xl">
            Spaces That Inspire.
          </h1>
          <p className="text-white/70 text-base max-w-lg leading-relaxed">
            Real homes. Real transformations. Discover what&apos;s possible when bold design
            meets thoughtful intention.
          </p>
        </div>
      </section>

      {/* Room Galleries */}
      {rooms.map((room, i) => (
        <section
          key={room.title}
          id={room.title.toLowerCase().replace(/\s+/g, '-')}
          className={`section-py ${i % 2 === 0 ? 'bg-cream-100' : 'bg-cream-50'}`}
        >
          <div className="max-w-9xl mx-auto px-6 md:px-12">
            <AnimateOnScroll className="mb-8">
              <p className="eyebrow text-terracotta mb-3">{room.title}</p>
              <h2 className="heading-section text-charcoal mb-3">{room.title}</h2>
              <p className="text-charcoal-400 text-sm max-w-lg leading-relaxed">
                {room.description}
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {room.images.map((img, j) => (
                <AnimateOnScroll key={j} delay={j * 80}>
                  <div
                    className={`group relative overflow-hidden rounded-2xl bg-cream-200 ${
                      j === 0 ? 'md:col-span-2 md:row-span-2 h-[300px] md:h-[500px]' : 'h-[240px]'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes={j === 0 ? '(max-width: 768px) 100vw, 66vw' : '33vw'}
                    />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-py bg-charcoal">
        <div className="max-w-9xl mx-auto px-6 md:px-12">
          <AnimateOnScroll className="max-w-2xl mx-auto text-center">
            <p className="eyebrow text-terracotta mb-4">Ready to Start?</p>
            <h2 className="font-display text-display-lg font-light text-white mb-4">
              Let&apos;s Create Your Space.
            </h2>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              Inspired by what you see? Our design team can bring these ideas to life in your home.
              Book a free consultation to get started.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full bg-terracotta text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-terracotta-dark transition-all duration-300 group"
              >
                Book a Consultation
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-white/60 text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-white/10 hover:border-white transition-all duration-300"
              >
                Shop Products
              </Link>
            </div>
          </AnimateOnScroll>

          {/* Instagram */}
          <AnimateOnScroll className="flex items-center justify-center gap-3 mt-12">
            <Instagram size={18} className="text-white/40" />
            <p className="text-sm text-white/40">
              Follow us{' '}
              <span className="text-white/70 font-medium">@maisonavantgarde</span>{' '}
              for daily inspiration
            </p>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  )
}
