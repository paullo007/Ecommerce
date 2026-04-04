import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import { CheckoutSuccessClient } from './CheckoutSuccessClient'

interface Props {
  searchParams: { session_id?: string }
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const sessionId = searchParams.session_id

  if (!sessionId) {
    redirect('/cart')
  }

  // Verify the Stripe session is real and was paid
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      redirect('/cart')
    }

    return (
      <CheckoutSuccessClient
        orderNumber={session.metadata?.orderNumber || undefined}
      />
    )
  } catch {
    // Invalid or expired session ID
    redirect('/cart')
  }
}
