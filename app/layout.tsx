import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Maison Avant-Garde — Premium Home Decor & Renovation',
    template: '%s | Maison Avant-Garde',
  },
  description:
    'Discover curated home decoration and renovation products that transform your space into a bold, avant-garde living experience. Premium furniture, lighting, art, and professional design services.',
  keywords: [
    'home decor',
    'home renovation',
    'interior design',
    'furniture',
    'lighting',
    'avant-garde',
    'premium home',
    'maison',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Maison Avant-Garde',
    title: 'Maison Avant-Garde — Premium Home Decor & Renovation',
    description:
      'Curated home decoration and renovation products for the bold, design-conscious home.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maison Avant-Garde',
    description: 'Premium home decor & renovation.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  )
}
