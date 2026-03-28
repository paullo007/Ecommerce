export interface ProductImage {
  id: string
  url: string
  alt?: string | null
  primary: boolean
  sortOrder: number
}

export interface ProductVariant {
  id: string
  name: string
  value: string
  price?: number | null
  stock: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
  image?: string | null
  icon?: string | null
  featured: boolean
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDesc?: string | null
  price: number
  comparePrice?: number | null
  sku?: string | null
  stock: number
  lowStockAlert: number
  featured: boolean
  newArrival: boolean
  bestSeller: boolean
  isAvailable: boolean
  material?: string | null
  finish?: string | null
  origin?: string | null
  dimensions?: string | null
  tags: string[]
  category: Category
  images: ProductImage[]
  variants: ProductVariant[]
  _count?: {
    reviews: number
  }
}

export interface Service {
  id: string
  name: string
  slug: string
  description: string
  shortDesc?: string | null
  price: number
  priceType: 'FIXED' | 'HOURLY' | 'QUOTE'
  duration?: string | null
  image?: string | null
  featured: boolean
  isAvailable: boolean
}

export interface OrderItem {
  id: string
  quantity: number
  price: number
  productName: string
  productSlug: string
  product: {
    images: ProductImage[]
  }
}

export interface Order {
  id: string
  orderNumber: string
  status: string
  subtotal: number
  shipping: number
  tax: number
  total: number
  currency: string
  createdAt: string
  items: OrderItem[]
}
