'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CheckCircle2, ArrowRight, Calendar, Clock, Star } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { Button } from '@/components/ui/Button'
import type { Service } from '@/types'

interface ServicesPageClientProps {
  services: Service[]
}

const serviceImages: Record<string, string> = {
  'interior-design-consultation':
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
  'full-room-renovation':
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
  'kitchen-renovation':
    'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=80',
  'bathroom-renovation':
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
  'outdoor-garden-design':
    'https://images.unsplash.com/photo-1600210491892-03d54079b6ac?w=800&q=80',
  'smart-home-installation':
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  'color-material-consultation':
    'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&q=80',
  'furniture-curation':
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
}

const fallbackImage = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'

const howItWorks = [
  {
    step: '01',
    title: 'Book a Consultation',
    description:
      'Choose a service and schedule a free discovery call with our design team to discuss your vision.',
  },
  {
    step: '02',
    title: 'Design & Planning',
    description:
      'We create a detailed design plan, material selections, and timeline tailored to your space and budget.',
  },
  {
    step: '03',
    title: 'Expert Execution',
    description:
      'Our certified craftspeople and installers bring the plan to life with precision and artistry.',
  },
  {
    step: '04',
    title: 'Final Styling',
    description:
      "We finish with professional styling — furniture placement, art curation, and the finishing touches that make a home.",
  },
]

const testimonials = [
  {
    name: 'Alexandra Chen',
    role: 'Homeowner, New York',
    rating: 5,
    text: 'Maison Avant-Garde transformed our apartment completely. The attention to detail and quality of craftsmanship is unmatched. Worth every penny.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    name: 'Marcus Beaumont',
    role: 'Interior Architect, Chicago',
    rating: 5,
    text: 'I refer clients to Maison constantly. Their renovation team is exceptional — they understand the avant-garde aesthetic deeply and execute flawlessly.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    name: 'Isabelle Fontaine',
    role: 'Creative Director, Los Angeles',
    rating: 5,
    text: 'The kitchen renovation exceeded every expectation. Clean lines, incredible materials, and a team that genuinely cares about the outcome.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
]

export function ServicesPageClient({ services }: ServicesPageClientProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <div className="bg-cream-100 min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden pt-20">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=85"
          alt="Luxury interior renovation"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
        <div className="relative z-10 max-w-9xl mx-auto px-6 md:px-12 pb-16 md:pb-24 w-full">
          <p className="eyebrow text-terracotta mb-4">Professional Services</p>
          <h1 className="font-display text-display-xl font-light text-white mb-4 max-w-2xl">
            We Build the Spaces You Dream About.
          </h1>
          <p className="text-white/70 text-base max-w-lg leading-relaxed">
            From a single design consultation to a complete home transformation — our team of
            designers, architects, and craftspeople turn the avant-garde vision into reality.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="section-py bg-cream-100">
        <div className="max-w-9xl mx-auto px-6 md:px-12">
          <AnimateOnScroll className="text-center mb-12">
            <p className="eyebrow text-terracotta mb-3">Our Process</p>
            <h2 className="heading-section text-charcoal">How It Works</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <AnimateOnScroll key={step.step} delay={i * 80}>
                <div className="relative">
                  <div className="font-display text-6xl font-light text-cream-300 mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-medium text-charcoal mb-2">{step.title}</h3>
                  <p className="text-sm text-charcoal-400 leading-relaxed">{step.description}</p>
                  {i < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-3 text-cream-300">
                      <ArrowRight size={20} />
                    </div>
                  )}
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="section-py bg-cream-50">
        <div className="max-w-9xl mx-auto px-6 md:px-12">
          <AnimateOnScroll className="mb-12">
            <p className="eyebrow text-terracotta mb-3">What We Offer</p>
            <h2 className="heading-section text-charcoal">Our Services</h2>
          </AnimateOnScroll>

          {services.length === 0 ? (
            // Fallback static services if DB is empty
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Interior Design Consultation', price: 150, priceType: 'HOURLY', shortDesc: 'One-on-one session with our lead designers to define your vision and create a bespoke design plan.', slug: 'interior-design-consultation', duration: '1–3 hours' },
                { name: 'Full Room Renovation', price: 2500, priceType: 'FIXED', shortDesc: 'Complete room transformation from structural changes to final styling.', slug: 'full-room-renovation', duration: '2–4 weeks' },
                { name: 'Kitchen Renovation', price: 5000, priceType: 'FIXED', shortDesc: 'Premium kitchen redesigns balancing function and avant-garde aesthetics.', slug: 'kitchen-renovation', duration: '3–6 weeks' },
                { name: 'Bathroom Renovation', price: 3500, priceType: 'FIXED', shortDesc: 'Luxurious bathroom transformations with premium fixtures and materials.', slug: 'bathroom-renovation', duration: '2–4 weeks' },
                { name: 'Smart Home Installation', price: 800, priceType: 'FIXED', shortDesc: 'Intelligent lighting, climate, security, and entertainment integration.', slug: 'smart-home-installation', duration: '1–3 days' },
                { name: 'Color & Material Consultation', price: 90, priceType: 'HOURLY', shortDesc: 'Expert guidance on color palettes, materials, and finishes for cohesive spaces.', slug: 'color-material-consultation', duration: '1–2 hours' },
              ].map((s, i) => (
                <AnimateOnScroll key={s.slug} delay={i * 60}>
                  <ServiceCard
                    service={s as any}
                    image={serviceImages[s.slug] || fallbackImage}
                    onBook={() => { setSelectedService(s as any); setBookingOpen(true) }}
                  />
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <AnimateOnScroll key={service.id} delay={i * 60}>
                  <ServiceCard
                    service={service}
                    image={service.image || serviceImages[service.slug] || fallbackImage}
                    onBook={() => { setSelectedService(service); setBookingOpen(true) }}
                  />
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-py bg-charcoal">
        <div className="max-w-9xl mx-auto px-6 md:px-12">
          <AnimateOnScroll className="text-center mb-12">
            <p className="eyebrow text-stone mb-3">Client Stories</p>
            <h2 className="font-display text-display-lg font-light text-white">
              What Our Clients Say
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimateOnScroll key={t.name} delay={i * 100}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={12} className="fill-terracotta text-terracotta" />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-cream-300">
                      <Image src={t.image} alt={t.name} fill className="object-cover" sizes="40px" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{t.name}</p>
                      <p className="text-white/40 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="book" className="section-py bg-cream-100">
        <div className="max-w-9xl mx-auto px-6 md:px-12">
          <AnimateOnScroll className="max-w-2xl mx-auto text-center">
            <p className="eyebrow text-terracotta mb-4">Free Discovery Call</p>
            <h2 className="heading-section text-charcoal mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-charcoal-400 text-sm mb-8 leading-relaxed">
              Book a free 20-minute discovery call with our design team. No commitment — just a
              conversation about your vision and how we can help bring it to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setBookingOpen(true)}
                className="group"
              >
                <Calendar size={16} className="mr-2" />
                Book Free Consultation
              </Button>
              <Button variant="secondary" size="lg">
                View Pricing
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 text-xs text-charcoal-400">
              {[
                { icon: CheckCircle2, text: 'No commitment required' },
                { icon: Clock, text: 'Response within 24 hours' },
                { icon: Star, text: '5-star rated team' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <Icon size={12} className="text-terracotta" />
                  {text}
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Booking Modal */}
      {bookingOpen && (
        <BookingModal
          service={selectedService}
          onClose={() => setBookingOpen(false)}
        />
      )}
    </div>
  )
}

function ServiceCard({
  service,
  image,
  onBook,
}: {
  service: Service & { duration?: string | null }
  image: string
  onBook: () => void
}) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-cream-200 hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={service.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 text-charcoal text-xs font-medium px-3 py-1 rounded-full">
            {service.priceType === 'HOURLY'
              ? `${formatPrice(service.price)}/hr`
              : service.priceType === 'QUOTE'
              ? 'Custom Quote'
              : `From ${formatPrice(service.price)}`}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-medium text-charcoal mb-2">{service.name}</h3>
        <p className="text-sm text-charcoal-400 leading-relaxed mb-4">
          {service.shortDesc || service.description.slice(0, 120) + '…'}
        </p>
        {service.duration && (
          <div className="flex items-center gap-1.5 text-xs text-charcoal-400 mb-4">
            <Clock size={12} />
            {service.duration}
          </div>
        )}
        <Button variant="primary" size="sm" onClick={onBook} fullWidth>
          Book This Service
        </Button>
      </div>
    </div>
  )
}

function BookingModal({
  service,
  onClose,
}: {
  service: Service | null
  onClose: () => void
}) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm">
      <div className="bg-cream-100 rounded-3xl w-full max-w-lg p-8 shadow-2xl">
        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-forest" />
            </div>
            <h3 className="font-display text-2xl font-light text-charcoal mb-2">
              Booking Received!
            </h3>
            <p className="text-sm text-charcoal-400 mb-6">
              Thank you, {form.name}. We&apos;ll confirm your {service?.name || 'consultation'} booking within 24 hours.
            </p>
            <Button variant="primary" onClick={onClose}>Done</Button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-display text-xl font-light text-charcoal">
                  {service ? `Book: ${service.name}` : 'Book a Consultation'}
                </h3>
                {service && (
                  <p className="text-sm text-charcoal-400 mt-0.5">
                    {service.priceType === 'HOURLY'
                      ? `${formatPrice(service.price)}/hr`
                      : `From ${formatPrice(service.price)}`}
                  </p>
                )}
              </div>
              <button onClick={onClose} className="text-charcoal-400 hover:text-charcoal p-1">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-charcoal-400 mb-1 block">Full Name *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field-box"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="text-xs text-charcoal-400 mb-1 block">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="input-field-box"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-charcoal-400 mb-1 block">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field-box"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="text-xs text-charcoal-400 mb-1 block">Preferred Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="input-field-box"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="text-xs text-charcoal-400 mb-1 block">Tell us about your project</label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="input-field-box resize-none"
                  placeholder="Describe your space, goals, and any specific requirements..."
                />
              </div>
              <Button type="submit" variant="primary" fullWidth size="lg">
                Request Booking
              </Button>
              <p className="text-xs text-center text-charcoal-400">
                We&apos;ll confirm within 24 hours. No payment required today.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
