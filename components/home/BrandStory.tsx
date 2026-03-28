'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export function BrandStory() {
  return (
    <section className="section-py bg-cream-100 overflow-hidden">
      <div className="max-w-9xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image collage */}
          <AnimateOnScroll direction="left" className="relative">
            <div className="relative h-[500px] lg:h-[600px]">
              {/* Main image */}
              <div className="absolute top-0 left-0 w-[70%] h-[75%] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
                  alt="Maison Avant-Garde craftsmanship"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 70vw, 40vw"
                />
              </div>
              {/* Secondary image */}
              <div className="absolute bottom-0 right-0 w-[55%] h-[50%] rounded-2xl overflow-hidden border-4 border-cream-100">
                <Image
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80"
                  alt="Interior design details"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 55vw, 30vw"
                />
              </div>
              {/* Accent block */}
              <div className="absolute bottom-[52%] right-[45%] bg-terracotta text-white p-5 rounded-2xl shadow-xl">
                <p className="font-display text-3xl font-light">12+</p>
                <p className="text-xs text-white/80 mt-1">Years of Design Excellence</p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Text */}
          <AnimateOnScroll direction="right" delay={100}>
            <p className="eyebrow text-terracotta mb-5">Our Story</p>
            <h2 className="font-display text-display-lg font-light text-charcoal mb-6">
              Design Is Not Just What It Looks Like — It&apos;s How It Makes You Feel.
            </h2>
            <div className="space-y-4 text-charcoal-500 text-sm leading-relaxed">
              <p>
                Maison Avant-Garde was born from a simple belief: your home should be a bold
                expression of who you are. Not a catalog of trends, but a living, breathing
                reflection of your values, tastes, and aspirations.
              </p>
              <p>
                Founded in 2012, we set out to curate the world&apos;s most exceptional home
                furnishings — pieces with genuine craft, honest materials, and design that
                challenges conventions while serving daily life beautifully.
              </p>
              <p>
                Today, we are also a full-service design and renovation studio, helping
                homeowners across the country transform their spaces with precision,
                artistry, and a deep commitment to the avant-garde aesthetic.
              </p>
            </div>

            <div className="w-12 h-px bg-terracotta my-7" />

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-charcoal hover:text-terracotta transition-colors group"
            >
              Read our full story
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
