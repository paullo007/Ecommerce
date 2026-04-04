import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { generateOrderNumber } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { validateOrigin } from '@/lib/security'
import { z } from 'zod'

const cartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(99),
})

const shippingSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional().default(''),
  address: z.string().min(1).max(500),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  zip: z.string().min(1).max(20),
  country: z.string().max(10).optional().default('US'),
})

const checkoutSchema = z.object({
  items: z.array(cartItemSchema).min(1).max(50),
  shipping: shippingSchema,
})

export async function POST(req: NextRequest) {
  try {
    // CSRF: validate request origin
    if (!validateOrigin(req)) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }

    // Require authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Please sign in to checkout.' }, { status: 401 })
    }

    const body = await req.json()
    const parsed = checkoutSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid checkout data.' }, { status: 400 })
    }

    const { items, shipping } = parsed.data

    // SECURITY: Fetch actual prices from database — never trust client prices
    const productIds = items.map((item) => item.productId)
    const products = await db.product.findMany({
      where: { id: { in: productIds }, isAvailable: true },
      include: {
        images: { where: { primary: true }, take: 1 },
      },
    })

    const productMap = new Map(products.map((p) => [p.id, p]))

    // Verify all requested products exist and are available
    for (const item of items) {
      const product = productMap.get(item.productId)
      if (!product) {
        return NextResponse.json(
          { error: `Product not found or unavailable.` },
          { status: 400 }
        )
      }
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for "${product.name}".` },
          { status: 400 }
        )
      }
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Build Stripe line items using SERVER-SIDE prices
    const lineItems = items.map((item) => {
      const product = productMap.get(item.productId)!
      const primaryImage = product.images[0]
      return {
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            images: primaryImage ? [primaryImage.url] : [],
          },
        },
        quantity: item.quantity,
      }
    })

    const subtotal = items.reduce((sum, item) => {
      const product = productMap.get(item.productId)!
      return sum + product.price * item.quantity
    }, 0)
    const shippingCost = subtotal >= 200 ? 0 : 15

    // Create order in DB (pending payment)
    const orderNumber = generateOrderNumber()

    const address = await db.address.create({
      data: {
        firstName: shipping.firstName,
        lastName: shipping.lastName,
        line1: shipping.address,
        city: shipping.city,
        state: shipping.state,
        postalCode: shipping.zip,
        country: shipping.country,
        phone: shipping.phone,
      },
    })

    const order = await db.order.create({
      data: {
        orderNumber,
        userId: session.user.id,
        addressId: address.id,
        status: 'PENDING',
        subtotal,
        shipping: shippingCost,
        tax: subtotal * 0.08,
        total: subtotal + shippingCost + subtotal * 0.08,
        items: {
          create: items.map((item) => {
            const product = productMap.get(item.productId)!
            return {
              productId: item.productId,
              quantity: item.quantity,
              price: product.price,
              productName: product.name,
              productSlug: product.slug,
            }
          }),
        },
      },
    })

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: shippingCost * 100, currency: 'usd' },
            display_name: shippingCost === 0 ? 'Free Shipping' : 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],
      customer_email: shipping.email,
      metadata: {
        orderNumber,
        orderId: order.id,
        userId: session.user.id,
      },
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cart`,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 })
  }
}
