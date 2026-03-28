import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatPriceCents(cents: number): string {
  return formatPrice(cents / 100)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trimEnd() + '…'
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `MAG-${timestamp}-${random}`
}

export function calculateDiscount(price: number, comparePrice?: number): number | null {
  if (!comparePrice || comparePrice <= price) return null
  return Math.round(((comparePrice - price) / comparePrice) * 100)
}

export function getStockStatus(stock: number, lowStockAlert: number = 5) {
  if (stock === 0) return { label: 'Out of Stock', color: 'text-red-500', available: false }
  if (stock <= lowStockAlert)
    return { label: `Only ${stock} left`, color: 'text-terracotta', available: true }
  return { label: 'In Stock', color: 'text-green-600', available: true }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function shimmer(w: number, h: number) {
  return `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f0ebe3" offset="20%" />
      <stop stop-color="#e5ddd1" offset="50%" />
      <stop stop-color="#f0ebe3" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f0ebe3" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`
}

export function toBase64(str: string) {
  return typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)
}
