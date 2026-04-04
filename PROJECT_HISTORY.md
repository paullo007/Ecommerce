# Maison Avant-Garde — Project History Log

> **Purpose:** This file preserves the full project context so that any future Claude session can read it, understand everything, and continue where we left off.
> **Last updated:** 2026-04-04

---

## Project Overview

**Name:** Maison Avant-Garde
**Repo:** https://github.com/paullo007/Ecommerce
**Type:** Premium home decor & renovation eCommerce website
**Description:** A curated eCommerce platform selling premium furniture, lighting, art, wall decor, outdoor living products, and offering professional design/renovation services.

---

## Tech Stack

| Layer        | Technology                                                  |
|------------- |-------------------------------------------------------------|
| Framework    | Next.js 14.2.5 (App Router)                                |
| Language     | TypeScript                                                  |
| Styling      | Tailwind CSS 3.4, Framer Motion (animations)               |
| Fonts        | Cormorant Garamond (serif headings), Inter (body)           |
| Database     | PostgreSQL via Supabase                                     |
| ORM          | Prisma 5.x                                                 |
| Auth         | NextAuth v4 (credentials + OAuth ready)                     |
| Payments     | Stripe (checkout sessions, webhooks)                        |
| State        | Zustand (client-side cart store)                            |
| Forms        | React Hook Form + Zod validation                           |
| Icons        | Lucide React                                                |
| Deployment   | Vercel (region: iad1), GitHub Actions CI/CD                 |
| Images       | Unsplash (external URLs), Next.js Image optimization        |

---

## Git History (complete, oldest → newest)

| Date       | Hash    | Message                                                    |
|----------- |-------- |------------------------------------------------------------|
| 2026-03-17 | 45a995f | Initial commit                                             |
| 2026-03-28 | 9461f64 | feat: build full Maison Avant-Garde eCommerce website      |
| 2026-03-28 | 6876ab1 | feat: add Vercel config and Supabase connection pooling     |
| 2026-03-28 | 4e76e5a | chore: add schema.sql for Supabase SQL Editor setup        |
| 2026-03-28 | f609120 | ci: add GitHub Actions workflow for automated deploy        |
| 2026-03-29 | 2b15989 | Add seed.sql for direct PostgreSQL seeding                 |
| 2026-03-29 | 1138077 | Fix next.config for Vercel deployment                      |
| 2026-03-29 | f1241e7 | Fix build errors for Vercel deployment                     |
| 2026-03-29 | 87a86d6 | Fix broken Unsplash image URLs for Wall Art and Outdoor    |
| 2026-03-30 | c75086f | Fix duplicate product images                               |
| 2026-03-30 | 39cb43e | Increase logo size and match hero font style               |
| 2026-03-30 | 9ff5980 | Increase navbar logo size to fill space before Shop menu   |
| 2026-03-30 | 941bd8e | Make navbar logo even larger to fill space before Shop     |
| 2026-03-30 | 7b69103 | Update hero eyebrow text from 2025 to 2026                |

**Branch status (as of 2026-04-04):** Local `main` is 8 commits ahead of `origin/main`. These unpushed commits include build fixes, image URL fixes, logo sizing, and hero text update.

---

## Database Schema (Prisma)

### Models:
- **Auth:** User, Account, Session, VerificationToken (NextAuth compatible)
- **Products:** Category, Subcategory, Product, ProductImage, ProductVariant, Review, WishlistItem
- **Cart:** Cart, CartItem
- **Orders:** Order, OrderItem, Address
- **Services:** Service, ServiceBooking

### Enums:
- Role: CUSTOMER, ADMIN
- OrderStatus: PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED
- PriceType: FIXED, HOURLY, QUOTE
- BookingStatus: PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED

---

## File Structure

```
app/
  page.tsx                    — Home page (hero, categories, featured, brand story, services)
  layout.tsx                  — Root layout (Navbar, Footer, CartDrawer, Providers)
  globals.css                 — Global styles
  login/page.tsx              — Login page
  register/page.tsx           — Registration page
  products/page.tsx           — Product listing with filters
  products/[slug]/page.tsx    — Product detail page
  services/page.tsx           — Services listing
  checkout/page.tsx           — Checkout flow
  checkout/success/page.tsx   — Order confirmation
  cart/page.tsx               — Cart page
  account/page.tsx            — User account dashboard
  account/orders/page.tsx     — Order history
  account/wishlist/page.tsx   — User wishlist
  api/
    auth/[...nextauth]/route.ts  — NextAuth API
    auth/register/route.ts       — Registration endpoint
    checkout/route.ts            — Stripe checkout session creation
    orders/route.ts              — Orders API
    products/route.ts            — Products API
    services/route.ts            — Services API
    webhooks/stripe/route.ts     — Stripe webhook handler

components/
  Providers.tsx                — SessionProvider + client wrappers
  cart/CartDrawer.tsx          — Slide-out cart drawer
  home/
    BrandStory.tsx             — "Our Philosophy" section
    CategoryGrid.tsx           — Category browsing grid
    FeaturedProducts.tsx       — Horizontal product carousel
    HeroSection.tsx            — Full-width hero banner
    InspirationSection.tsx     — Design inspiration gallery
    ServicesSection.tsx         — Service offerings preview
    ValueProps.tsx             — Value proposition icons
  layout/
    Navbar.tsx                 — Top navigation bar
    Footer.tsx                 — Site footer
  products/
    ProductCard.tsx            — Product card component
    ProductDetailClient.tsx    — Client-side product detail
    ProductFilters.tsx         — Filtering/sorting sidebar
    ProductGrid.tsx            — Product grid layout
  services/
    ServicesPageClient.tsx     — Services page client component
  ui/
    AnimateOnScroll.tsx        — Scroll-triggered animation wrapper
    Badge.tsx                  — Badge component
    Button.tsx                 — Button component

lib/
  auth.ts    — NextAuth configuration
  db.ts      — Prisma client singleton
  store.ts   — Zustand cart store
  stripe.ts  — Stripe client setup
  utils.ts   — Utility functions (cn, formatPrice, etc.)

prisma/
  schema.prisma  — Database schema
  schema.sql     — Raw SQL for Supabase SQL Editor
  seed.sql       — SQL seed data (products, categories, services)
  seed.ts        — TypeScript seed script

types/
  index.ts         — Shared TypeScript types
  next-auth.d.ts   — NextAuth type extensions
```

---

## Infrastructure & Deployment

- **Hosting:** Vercel (region: iad1)
- **Database:** Supabase PostgreSQL (connection pooling via pgbouncer)
- **CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`)
  - Triggers on push to `main` or `claude/test-uks1U`
  - Steps: install deps → prisma generate → db push → seed → deploy to Vercel
- **Required secrets (GitHub Actions):** DATABASE_URL, DIRECT_URL, VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID
- **Required env vars:** DATABASE_URL, DIRECT_URL, NEXTAUTH_URL, NEXTAUTH_SECRET, STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_APP_URL

---

## Current State & Known Issues (as of 2026-04-04)

1. **Unpushed commits:** Local main is 8 commits ahead of origin/main. Needs `git push`.
2. **Working tree:** Clean — no uncommitted changes.
3. **Build status:** Build fixes were applied (commits 1138077, f1241e7) for Vercel compatibility.
4. **Image fixes:** Broken Unsplash URLs were fixed for Wall Art and Outdoor Living categories.
5. **UI tweaks done:** Navbar logo sizing increased, hero eyebrow year updated to 2026.

---

## What Was Left To Do / Next Steps

When this session ended, the following areas still need work or have not been built yet:

- **Push unpushed commits** to origin/main
- **Admin panel** — no admin dashboard exists yet for managing products, orders, services
- **Search functionality** — no product search implementation
- **User reviews** — schema exists but no UI for submitting/displaying reviews
- **Wishlist UI** — page exists but may need full API integration
- **Order tracking** — schema supports statuses but no tracking UI
- **Email notifications** — no transactional emails (order confirmation, shipping updates)
- **SEO** — basic metadata exists but no sitemap.xml or structured data
- **Testing** — no test suite exists
- **Mobile responsiveness** — may need QA pass
- **Stripe webhook** — route file exists but may need verification
- **Service booking flow** — schema exists, needs full booking UI and calendar
