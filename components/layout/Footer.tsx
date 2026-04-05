'use client'

import Link from 'next/link'
import { Instagram, Facebook, Twitter, Youtube, ArrowRight } from 'lucide-react'

const footerLinks = {
  Shop: [
    { label: 'Furniture', href: '/products?category=furniture' },
    { label: 'Lighting', href: '/products?category=lighting' },
    { label: 'Wall Art & Decor', href: '/products?category=wall-art-decor' },
    { label: 'Textiles', href: '/products?category=textiles' },
    { label: 'Kitchen & Dining', href: '/products?category=kitchen-dining' },
    { label: 'Outdoor Living', href: '/products?category=outdoor-living' },
    { label: 'All Products', href: '/products' },
  ],
  Services: [
    { label: 'Interior Design', href: '/services' },
    { label: 'Full Renovation', href: '/services' },
    { label: 'Color Consultation', href: '/services' },
    { label: 'Smart Home', href: '/services' },
    { label: 'Book a Consultation', href: '/services#book' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Story', href: '/about#story' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Inspiration Blog', href: '/inspiration' },
  ],
  Support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Care Guide', href: '/care' },
    { label: 'Trade Program', href: '/trade' },
    { label: 'FAQ', href: '/faq' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-9xl mx-auto px-6 md:px-12 py-16">
          <div className="max-w-2xl">
            <p className="eyebrow text-stone mb-3">Newsletter</p>
            <h2 className="font-display text-3xl font-light mb-2">
              Design Intelligence, Delivered.
            </h2>
            <p className="text-white/60 text-sm mb-6">
              Trends, inspiration, and exclusive offers — curated for the thoughtful home.
            </p>
            <form
              className="flex gap-3 max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors"
              />
              <button
                type="submit"
                className="bg-terracotta hover:bg-terracotta-dark text-white rounded-full px-6 py-3 text-sm font-medium transition-colors flex items-center gap-2"
              >
                Subscribe
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-9xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="eyebrow text-white/40 mb-5">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-9xl mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div>
              <span className="font-display text-lg font-bold">
                Maison<span className="italic"> Avant-Garde</span>
              </span>
              <p className="text-white/40 text-xs mt-1">
                © {new Date().getFullYear()} Maison Avant-Garde. All rights reserved.
              </p>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-white/40 hover:text-white transition-colors duration-200"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>

            {/* Legal */}
            <div className="flex items-center gap-4 text-xs text-white/40">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
