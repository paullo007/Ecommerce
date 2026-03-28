'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Ruler, Palette, Wrench, Lightbulb, Home, Sparkles } from 'lucide-react'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

const services = [
  {
    icon: Palette,
    title: 'Interior Design Consultation',
    description:
      'Work one-on-one with our lead designers to define your vision, select materials, and craft a bespoke design plan.',
    from: 'From $150',
    href: '/services',
  },
  {
    icon: Wrench,
    title: 'Full Room Renovation',
    description:
      'A complete transformation — from structural changes to final styling — handled by our expert renovation team.',
    from: 'From $2,500',
    href: '/services',
  },
  {
    icon: Ruler,
    title: 'Kitchen & Bath Renovation',
    description:
      'Premium kitchen and bathroom renovations that balance functionality with avant-garde aesthetics.',
    from: 'From $5,000',
    href: '/services',
  },
  {
    icon: Lightbulb,
    title: 'Smart Home Installation',
    description:
      'Integrate intelligent lighting, climate, security, and entertainment systems into a seamless living experience.',
    from: 'From $800',
    href: '/services',
  },
  {
    icon: Home,
    title: 'Outdoor & Garden Design',
    description:
      'Transform your outdoor spaces into curated extensions of your home\'s interior design language.',
    from: 'From $1,200',
    href: '/services',
  },
  {
    icon: Sparkles,
    title: 'Color & Material Consultation',
    description:
      'Expert guidance on color palettes, material selections, and finishes to create a cohesive, stunning space.',
    from: 'From $90',
    href: '/services',
  },
]

export function ServicesSection() {
  return (
    <section className="section-py bg-forest relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,#c4622d_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#c9b99a_0%,transparent_40%)]" />
      </div>

      <div className="relative max-w-9xl mx-auto px-6 md:px-12">
        {/* Header */}
        <AnimateOnScroll className="max-w-2xl mb-14">
          <p className="eyebrow text-stone mb-4">Professional Services</p>
          <h2 className="font-display text-display-xl font-light text-white mb-4">
            We Build the Spaces You Dream About.
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            From a single consultation to a complete home transformation — our team of designers,
            architects, and craftspeople bring the avant-garde vision to life.
          </p>
        </AnimateOnScroll>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <AnimateOnScroll key={service.title} delay={i * 80}>
                <Link
                  href={service.href}
                  className="group block bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-terracotta/20 flex items-center justify-center mb-4 group-hover:bg-terracotta/30 transition-colors">
                    <Icon size={20} className="text-terracotta" />
                  </div>
                  <h3 className="font-medium text-white mb-2 text-base">{service.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-stone text-sm font-medium">{service.from}</span>
                    <span className="text-white/40 group-hover:text-white/80 transition-colors">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>
            )
          })}
        </div>

        {/* CTA */}
        <AnimateOnScroll className="mt-12 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-terracotta text-white px-8 py-4 text-sm font-medium hover:bg-terracotta-dark transition-all duration-300 group"
          >
            Explore All Services
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/services#book"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors"
          >
            Book a Free Consultation Call →
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
