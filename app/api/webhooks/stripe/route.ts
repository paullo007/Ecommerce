import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    if (process.env.NODE_ENV === 'development') console.error('Webhook signature error:', err.message)
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const { orderId, orderNumber } = session.metadata || {}

        if (orderId) {
          await db.order.update({
            where: { id: orderId },
            data: {
              status: 'CONFIRMED',
              stripeSessionId: session.id,
              stripePaymentId: session.payment_intent as string,
            },
          })
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent
        // Handle payment failure — could notify user
        if (process.env.NODE_ENV === 'development') console.log('Payment failed for:', pi.id)
        break
      }

      default:
        break
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handling failed.' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

