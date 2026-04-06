'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronDown } from 'lucide-react'

const slides = [
  {
    id: 1,
    eyebrow: 'New Collection 2026',
    title: 'Live Bold.\nLive Avant-Garde.',
    subtitle:
      'Transform every room into a statement. Curated furniture, art, and decor for the fearlessly designed home.',
    cta: { label: 'Explore Collection', href: '/products' },
    ctaSecondary: { label: 'Our Services', href: '/services' },
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=85',
    imageAlt: 'Avant-garde living room with minimal furniture',
    accent: 'terracotta',
  },
  {
    id: 2,
    eyebrow: 'Interior Design Services',
    title: 'Your Vision.\nOur Craft.',
    subtitle:
      'From single-room refreshes to full home renovations — our design experts bring your boldest ideas to life.',
    cta: { label: 'Book a Consultation', href: '/services' },
    ctaSecondary: { label: 'See Our Work', href: '/inspiration' },
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&q=85',
    imageAlt: 'Modern kitchen renovation with avant-garde design',
    accent: 'forest',
  },
  {
    id: 3,
    eyebrow: 'Premium Lighting',
    title: 'Light Changes\nEverything.',
    subtitle:
      'Sculptural pendants, architectural floor lamps, and hand-crafted fixtures that redefine atmosphere.',
    cta: { label: 'Shop Lighting', href: '/products?category=lighting' },
    ctaSecondary: { label: 'Learn More', href: '/products' },
    image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=1800&q=85',
    imageAlt: 'Dramatic pendant lighting in a luxury dining room',
    accent: 'terracotta',
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true)
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length)
        setTransitioning(false)
      }, 600)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Image */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={s.image}
            alt={s.imageAlt}
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-charcoal/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-9xl mx-auto px-6 md:px-12 pb-20 md:pb-28 w-full">
        <div
          className={`max-w-2xl transition-all duration-700 ${
            transitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Eyebrow */}
          <p className="uppercase text-lg font-sans font-bold text-terracotta mb-5 tracking-[0.45em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{slide.eyebrow}</p>

          {/* Headline */}
          <h1 className="font-display text-display-2xl font-light text-white mb-6 leading-[1.05] whitespace-pre-line">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-white/75 text-lg font-light leading-relaxed mb-10 max-w-lg">
            {slide.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={slide.cta.href}
              className="inline-flex items-center gap-2 rounded-full bg-terracotta text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-terracotta-dark transition-all duration-300 group"
            >
              {slide.cta.label}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href={slide.ctaSecondary.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/60 text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              {slide.ctaSecondary.label}
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-20 md:bottom-28 right-6 md:right-12 flex flex-col gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setTransitioning(true)
                setTimeout(() => {
                  setCurrent(i)
                  setTransitioning(false)
                }, 300)
              }}
              className={`w-px transition-all duration-300 ${
                i === current ? 'h-10 bg-white' : 'h-4 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60">
        <span className="eyebrow text-[10px] tracking-[0.3em]">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  )
}
