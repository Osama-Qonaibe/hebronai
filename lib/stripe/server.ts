import Stripe from 'stripe'

import { STRIPE_CONFIG } from './config'

let stripeInstance: Stripe | null = null

function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!STRIPE_CONFIG.secretKey) {
      throw new Error('Stripe secret key not configured')
    }
    stripeInstance = new Stripe(STRIPE_CONFIG.secretKey, {
      apiVersion: STRIPE_CONFIG.apiVersion,
      typescript: true
    })
  }
  return stripeInstance
}

export const stripe = new Proxy({} as Stripe, {
  get: (target, prop) => {
    const instance = getStripe()
    return instance[prop as keyof Stripe]
  }
})

export async function createCustomer(params: {
  email: string
  userId: string
  name?: string
}): Promise<Stripe.Customer> {
  return await getStripe().customers.create({
    email: params.email,
    name: params.name,
    metadata: {
      user_id: params.userId
    }
  })
}

export async function createCheckoutSession(params: {
  customerId: string
  priceId: string
  successUrl: string
  cancelUrl: string
}): Promise<Stripe.Checkout.Session> {
  return await getStripe().checkout.sessions.create({
    customer: params.customerId,
    line_items: [
      {
        price: params.priceId,
        quantity: 1
      }
    ],
    mode: 'subscription',
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    allow_promotion_codes: true
  })
}

export async function createBillingPortalSession(params: {
  customerId: string
  returnUrl: string
}): Promise<Stripe.BillingPortal.Session> {
  return await getStripe().billingPortal.sessions.create({
    customer: params.customerId,
    return_url: params.returnUrl
  })
}

export async function cancelSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  return await getStripe().subscriptions.update(subscriptionId, {
    cancel_at_period_end: true
  })
}

export async function reactivateSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  return await getStripe().subscriptions.update(subscriptionId, {
    cancel_at_period_end: false
  })
}
