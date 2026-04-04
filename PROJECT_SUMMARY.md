# Maison Avant-Garde — Project Summary
**Date:** April 4, 2026 (SGT, GMT+8)
**Repository:** [paullo007/Ecommerce](https://github.com/paullo007/Ecommerce/tree/claude/test-uks1U)
**Branch:** `claude/test-uks1U`

---

## 1. What We Built

**Maison Avant-Garde** is a full-stack, production-ready eCommerce website for a premium home decoration and home renovation store. The design is inspired by Apple.com (minimalism, white space, scroll animations) and Nike.com (bold editorial layouts, high-contrast CTAs).

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS with custom design tokens |
| Animations | Framer Motion + Intersection Observer |
| Database ORM | Prisma |
| Database | PostgreSQL (hosted on Supabase) |
| Authentication | NextAuth.js (email/password + Google OAuth) |
| Payments | Stripe (checkout sessions + webhooks) |
| State Management | Zustand (cart + wishlist, localStorage persisted) |
| Language | TypeScript |
| Fonts | Cormorant Garamond (headings) + Inter (body/UI) |
| Deployment | Vercel (frontend) + Supabase (database) |
| CI/CD | GitHub Actions |

---

## 3. Design System

- **Colour palette:** Warm cream (#F9F6F2), Charcoal (#1C1C1C), Terracotta (#C4622D), Forest (#2A3D2E), Stone (#C9B99A)
- **Typography:** Cormorant Garamond for editorial headings; Inter for all UI text
- **Animations:** Fade-up, fade-in, slide-in-right — all scroll-triggered via `AnimateOnScroll` component
- **Style direction:** Minimal, editorial, premium — no clutter, generous white space

---

## 4. Pages Built

| Page | Route | Description |
|---|---|---|
| Homepage | `/` | Hero slider, value props, category grid, featured products, brand story, services preview, inspiration gallery |
| Products Listing | `/products` | Filterable grid with search, category filter, price sort, pagination |
| Product Detail | `/products/[slug]` | Image gallery, variant selector, add to cart, reviews |
| Services | `/services` | 8 design & renovation services with booking CTAs |
| Cart | `/cart` | Full cart page |
| Checkout | `/checkout` | Stripe-powered checkout |
| Checkout Success | `/checkout/success` | Order confirmation page |
| Login | `/login` | Email/password + Google OAuth login |
| Register | `/register` | New user registration |
| Account Dashboard | `/account` | User profile and settings |
| Order History | `/account/orders` | Past orders list |
| Wishlist | `/account/wishlist` | Saved products |

---

## 5. API Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth.js authentication handler |
| `/api/auth/register` | POST | New user registration (hashes password with bcryptjs) |
| `/api/products` | GET | Fetch products with filtering/pagination |
| `/api/services` | GET | Fetch services list |
| `/api/orders` | GET | Fetch user's order history |
| `/api/checkout` | POST | Create Stripe checkout session + pending Order record |
| `/api/webhooks/stripe` | POST | Handle Stripe `checkout.session.completed` webhook → update Order to CONFIRMED |

---

## 6. Database Schema (18 Models)

```
User, Account, Session, VerificationToken   ← Auth
Category, Subcategory                        ← Catalogue structure
Product, ProductImage, ProductVariant        ← Products
Review, WishlistItem                         ← Social / engagement
Cart, CartItem                               ← Shopping cart
Order, OrderItem, Address                    ← Orders
Service, ServiceBooking                      ← Renovation services
```

---

## 7. Seed Data

- **14 product categories:** Furniture, Lighting, Wall Art & Decor, Textiles & Soft Furnishings, Kitchen & Dining, Bathroom, Outdoor Living, Storage & Organisation, Plants & Botanicals, Art & Sculptures, Flooring & Tiles, Smart Home, Paint & Wallcoverings, Architectural Elements
- **25+ products** across all categories — with real Unsplash product photography URLs, descriptions, materials, origins, dimensions, pricing
- **8 services:** Interior Design Consultation, Full Room Makeover, Kitchen Renovation, Bathroom Renovation, Outdoor & Garden Design, Smart Home Installation, Color & Material Consultation, Furniture Curation Service

---

## 8. Key Components

| Component | Location | Purpose |
|---|---|---|
| Navbar | `components/layout/Navbar.tsx` | Fixed nav, transparent-on-hero / solid-on-scroll, dropdown menus, search overlay, mobile drawer, cart badge |
| Footer | `components/layout/Footer.tsx` | Links, newsletter, social |
| CartDrawer | `components/cart/CartDrawer.tsx` | Slide-in cart from right, quantity controls, subtotal, checkout CTA |
| HeroSection | `components/home/HeroSection.tsx` | Cinematic full-screen hero with animated text |
| CategoryGrid | `components/home/CategoryGrid.tsx` | Editorial grid of all 14 categories |
| FeaturedProducts | `components/home/FeaturedProducts.tsx` | Scrollable product card row |
| ServicesSection | `components/home/ServicesSection.tsx` | Services preview on homepage |
| AnimateOnScroll | `components/ui/AnimateOnScroll.tsx` | Scroll-triggered reveal animations |
| ProductCard | `components/products/ProductCard.tsx` | Reusable product card with wishlist toggle |
| Providers | `components/Providers.tsx` | Wraps app with NextAuth SessionProvider |

---

## 9. Configuration Files

| File | Purpose |
|---|---|
| `tailwind.config.ts` | Custom colours, fonts, animations |
| `prisma/schema.prisma` | Full database schema (18 models) |
| `prisma/schema.sql` | SQL version of schema — paste into Supabase SQL Editor to create all tables |
| `prisma/seed.ts` | TypeScript seed script for categories, products, services |
| `lib/auth.ts` | NextAuth config (Prisma adapter, Google provider, credentials provider) |
| `lib/store.ts` | Zustand cart + wishlist stores |
| `lib/db.ts` | Prisma client singleton |
| `lib/stripe.ts` | Stripe client singleton |
| `vercel.json` | Build command (`prisma generate && next build`), region (`iad1`) |
| `.github/workflows/deploy.yml` | GitHub Actions CI/CD pipeline |

---

## 10. Git Commit History

| Commit | Date (UTC) | Author | Description |
|---|---|---|---|
| `45a995f` | 17 Mar 2026 | paullo007 | Initial commit |
| `9461f64` | 28 Mar 2026 | Claude | Full Maison Avant-Garde website build |
| `6876ab1` | 28 Mar 2026 | Claude | Vercel config + Supabase connection pooling |
| `4e76e5a` | 28 Mar 2026 | Claude | schema.sql for Supabase SQL Editor |
| `f609120` | 28 Mar 2026 | Claude | GitHub Actions CI/CD workflow |

---

## 11. Deployment Setup

### Vercel (Frontend)
- Connected to GitHub repo `paullo007/Ecommerce`, branch `claude/test-uks1U`
- Build command: `prisma generate && next build`
- Framework: Next.js

### Required Environment Variables (set in Vercel dashboard)
```
DATABASE_URL=postgresql://postgres.xpzukyuobvsnpqxjznox:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.xpzukyuobvsnpqxjznox:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
NEXTAUTH_SECRET=[random 32-char string]
NEXTAUTH_URL=https://[your-vercel-url]
NEXT_PUBLIC_APP_URL=https://[your-vercel-url]
STRIPE_SECRET_KEY=sk_test_51TFtF6F...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51TFtF6F...
STRIPE_WEBHOOK_SECRET=[from Stripe dashboard after registering webhook]
GOOGLE_CLIENT_ID=[optional — for Google OAuth]
GOOGLE_CLIENT_SECRET=[optional — for Google OAuth]
```

### Supabase (Database)
- Project reference: `xpzukyuobvsnpqxjznox`
- Region: ap-southeast-1 (Singapore)
- Schema setup: Run `prisma/schema.sql` in Supabase SQL Editor

---

## 12. Outstanding Steps to Go Live

The following steps still need to be completed before the website is fully operational:

1. **Run `prisma/schema.sql` in Supabase SQL Editor**
   - Go to Supabase dashboard → SQL Editor
   - Paste the full contents of `prisma/schema.sql` from the GitHub repo
   - Click Run — this creates all 18 database tables

2. **Load seed data**
   - Run the seed SQL (generated by Claude Code CLI) in Supabase SQL Editor
   - This populates all categories, products, and services

3. **Update Vercel environment variables**
   - Set `NEXTAUTH_URL` to your actual Vercel deployment URL
   - Set `NEXT_PUBLIC_APP_URL` to the same URL

4. **Register Stripe webhook**
   - Go to Stripe Dashboard → Webhooks → Add endpoint
   - URL: `https://[your-vercel-url]/api/webhooks/stripe`
   - Event: `checkout.session.completed`
   - Copy the signing secret → set as `STRIPE_WEBHOOK_SECRET` in Vercel

5. **Reset Supabase database password**
   - The database password was shared in chat — it should be rotated for security
   - Go to Supabase Dashboard → Settings → Database → Reset Password

6. **Redeploy on Vercel** after updating environment variables

---

## 13. Security Notes

- Passwords are hashed with `bcryptjs` before storage
- Stripe webhook signature is verified before processing
- Environment variables are never committed to git (`.gitignore` excludes `.env`)
- NextAuth uses CSRF protection and signed session tokens
- **Action required:** Rotate the Supabase database password (it was shared in this session)

---

*Document generated: April 4, 2026 (SGT)*
*Session: claude.ai/code/session_01KbwtfyMtfRyahqTVszuj1h*
