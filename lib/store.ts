import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  name: string
  slug: string
  price: number
  image: string
  quantity: number
  variant?: string
  variantId?: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

function generateItemId(productId: string, variantId?: string): string {
  return variantId ? `${productId}-${variantId}` : productId
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (item) => {
        const id = generateItemId(item.productId, item.variantId)
        const existing = get().items.find((i) => i.id === id)

        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
            isOpen: true,
          }))
        } else {
          set((state) => ({
            items: [...state.items, { ...item, id }],
            isOpen: true,
          }))
        }
      },

      removeItem: (productId, variantId) => {
        const id = generateItemId(productId, variantId)
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }))
      },

      updateQuantity: (productId, quantity, variantId) => {
        const id = generateItemId(productId, variantId)
        if (quantity <= 0) {
          get().removeItem(productId, variantId)
          return
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    {
      name: 'maison-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

// ─── WISHLIST STORE ───────────────────────────────────────────────────────────

interface WishlistStore {
  items: string[] // product IDs
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  hasItem: (productId: string) => boolean
  toggleItem: (productId: string) => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId) =>
        set((state) => ({ items: [...state.items, productId] })),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((id) => id !== productId) })),
      hasItem: (productId) => get().items.includes(productId),
      toggleItem: (productId) => {
        if (get().hasItem(productId)) {
          get().removeItem(productId)
        } else {
          get().addItem(productId)
        }
      },
    }),
    {
      name: 'maison-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
