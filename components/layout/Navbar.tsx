'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingBag, Search, User, Heart, Menu, X, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const navLinks = [
  {
    label: 'Shop',
    href: '/products',
    children: [
      { label: 'All Products', href: '/products' },
      { label: 'Furniture', href: '/products?category=furniture' },
      { label: 'Lighting', href: '/products?category=lighting' },
      { label: 'Wall Art & Decor', href: '/products?category=wall-art-decor' },
      { label: 'Textiles', href: '/products?category=textiles' },
      { label: 'Kitchen & Dining', href: '/products?category=kitchen-dining' },
      { label: 'Outdoor Living', href: '/products?category=outdoor-living' },
      { label: 'View All Categories', href: '/products' },
    ],
  },
  {
    label: 'Collections',
    href: '/products?filter=featured',
    children: [
      { label: 'New Arrivals', href: '/products?filter=new' },
      { label: 'Best Sellers', href: '/products?filter=bestseller' },
      { label: 'Featured', href: '/products?filter=featured' },
      { label: 'The Minimal Edit', href: '/products?tag=minimal' },
      { label: 'Nature & Organic', href: '/products?tag=organic' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'All Services', href: '/services' },
      { label: 'Interior Design', href: '/services#design' },
      { label: 'Renovation', href: '/services#renovation' },
      { label: 'Consultation', href: '/services#consultation' },
    ],
  },
  { label: 'Inspiration', href: '/inspiration' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const { data: session } = useSession()
  const { getTotalItems, toggleCart } = useCartStore()
  const totalItems = getTotalItems()
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const isTransparent = isHomepage && !scrolled

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isTransparent
            ? 'bg-transparent py-5'
            : 'bg-cream-100/95 backdrop-blur-sm border-b border-cream-200 py-3'
        )}
      >
        <div className="max-w-9xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className={cn(
                'font-display font-bold tracking-tight transition-colors duration-300 text-[clamp(2rem,4vw,3rem)] leading-[1]',
                isTransparent ? 'text-white' : 'text-charcoal'
              )}
            >
              Maison<span className="italic"> Avant-Garde</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-200',
                      isTransparent
                        ? 'text-white/90 hover:text-white'
                        : 'text-charcoal-600 hover:text-charcoal'
                    )}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          'transition-transform duration-200',
                          activeDropdown === link.label && 'rotate-180'
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.children && activeDropdown === link.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                      <div className="bg-white rounded-2xl shadow-xl border border-cream-200 overflow-hidden min-w-[220px]">
                        <div className="p-2">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm text-charcoal-600 hover:text-terracotta hover:bg-cream-50 rounded-xl transition-colors duration-150"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={cn(
                  'p-2 rounded-full transition-colors duration-200',
                  isTransparent
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-charcoal-600 hover:text-charcoal hover:bg-cream-200'
                )}
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* Wishlist */}
              <Link
                href="/account/wishlist"
                className={cn(
                  'p-2 rounded-full transition-colors duration-200 hidden sm:flex',
                  isTransparent
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-charcoal-600 hover:text-charcoal hover:bg-cream-200'
                )}
                aria-label="Wishlist"
              >
                <Heart size={18} />
              </Link>

              {/* Account */}
              {session ? (
                <div className="relative group hidden sm:block">
                  <button
                    className={cn(
                      'p-2 rounded-full transition-colors duration-200',
                      scrolled
                        ? 'text-charcoal-600 hover:text-charcoal hover:bg-cream-200'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    )}
                    aria-label="Account"
                  >
                    <User size={18} />
                  </button>
                  <div className="absolute top-full right-0 pt-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200">
                    <div className="bg-white rounded-2xl shadow-xl border border-cream-200 overflow-hidden min-w-[180px]">
                      <div className="p-3 border-b border-cream-100">
                        <p className="text-xs text-charcoal-400">Signed in as</p>
                        <p className="text-sm font-medium text-charcoal truncate">
                          {session.user?.name || session.user?.email}
                        </p>
                      </div>
                      <div className="p-2">
                        <Link
                          href="/account"
                          className="block px-3 py-2 text-sm text-charcoal-600 hover:text-terracotta hover:bg-cream-50 rounded-xl"
                        >
                          My Account
                        </Link>
                        <Link
                          href="/account/orders"
                          className="block px-3 py-2 text-sm text-charcoal-600 hover:text-terracotta hover:bg-cream-50 rounded-xl"
                        >
                          Orders
                        </Link>
                        <button
                          onClick={() => signOut()}
                          className="w-full text-left px-3 py-2 text-sm text-charcoal-600 hover:text-terracotta hover:bg-cream-50 rounded-xl"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className={cn(
                    'p-2 rounded-full transition-colors duration-200 hidden sm:flex',
                    scrolled
                      ? 'text-charcoal-600 hover:text-charcoal hover:bg-cream-200'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  )}
                  aria-label="Sign in"
                >
                  <User size={18} />
                </Link>
              )}

              {/* Cart */}
              <button
                onClick={toggleCart}
                className={cn(
                  'relative p-2 rounded-full transition-colors duration-200',
                  isTransparent
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-charcoal-600 hover:text-charcoal hover:bg-cream-200'
                )}
                aria-label="Cart"
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-terracotta text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn(
                  'lg:hidden p-2 rounded-full transition-colors duration-200',
                  isTransparent
                    ? 'text-white/90 hover:bg-white/10'
                    : 'text-charcoal-600 hover:bg-cream-200'
                )}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-500',
          mobileOpen ? 'visible' : 'invisible'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity duration-500',
            mobileOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className={cn(
            'absolute top-0 right-0 h-full w-[320px] bg-cream-100 shadow-2xl transition-transform duration-500',
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between p-6 border-b border-cream-200">
            <span className="font-display text-lg font-medium">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 hover:bg-cream-200 rounded-full"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="p-6 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-base font-medium text-charcoal border-b border-cream-200 hover:text-terracotta transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 mt-1 mb-2 space-y-1">
                    {link.children.slice(0, 4).map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-1.5 text-sm text-charcoal-500 hover:text-terracotta transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-cream-200 space-y-3">
            {session ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 text-sm text-charcoal-600"
                >
                  <User size={16} />
                  My Account
                </Link>
                <button
                  onClick={() => {
                    signOut()
                    setMobileOpen(false)
                  }}
                  className="flex items-center gap-3 text-sm text-charcoal-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full text-center"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-cream-100/98 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-cream-200">
            <span className="font-display text-xl font-light">Search</span>
            <button
              onClick={() => setSearchOpen(false)}
              className="p-2 hover:bg-cream-200 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const q = (e.currentTarget.elements[0] as HTMLInputElement).value
                if (q) {
                  window.location.href = `/products?search=${encodeURIComponent(q)}`
                  setSearchOpen(false)
                }
              }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products, styles, rooms..."
                  autoFocus
                  className="w-full pl-12 pr-4 py-4 bg-white border border-cream-300 rounded-2xl text-charcoal placeholder-charcoal-400 focus:outline-none focus:border-charcoal text-lg"
                />
              </div>
              <div className="mt-6">
                <p className="eyebrow text-charcoal-400 mb-3">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {['Minimal sofa', 'Pendant light', 'Marble table', 'Linen curtains', 'Geometric rug'].map(
                    (term) => (
                      <Link
                        key={term}
                        href={`/products?search=${encodeURIComponent(term)}`}
                        onClick={() => setSearchOpen(false)}
                        className="px-4 py-2 bg-cream-200 text-charcoal-600 text-sm rounded-full hover:bg-terracotta hover:text-white transition-colors"
                      >
                        {term}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
