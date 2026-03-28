import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { generateOrderNumber } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()
    const { items, shipping } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Build Stripe line items
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
      },
      quantity: item.quantity,
    }))

    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    const shippingCost = subtotal >= 200 ? 0 : 15

    // Create order in DB (pending payment)
    const orderNumber = generateOrderNumber()

    let orderId: string | null = null
    if (session?.user?.id) {
      // Create address
      const address = await db.address.create({
        data: {
          firstName: shipping.firstName || '',
          lastName: shipping.lastName || '',
          line1: shipping.address || '',
          city: shipping.city || '',
          state: shipping.state || '',
          postalCode: shipping.zip || '',
          country: shipping.country || 'US',
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
            create: items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              productName: item.name,
              productSlug: item.slug || '',
            })),
          },
        },
      })
      orderId = order.id
    }

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
        orderId: orderId || '',
        userId: session?.user?.id || '',
      },
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cart`,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 })
  }
}
