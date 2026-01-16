export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  secretKey: process.env.STRIPE_SECRET_KEY || '',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  apiVersion: '2024-12-18.acacia' as const,
  currency: 'usd',
  successUrl: process.env.NEXT_PUBLIC_APP_URL + '/dashboard?success=true',
  cancelUrl: process.env.NEXT_PUBLIC_APP_URL + '/pricing?canceled=true'
}

export const PLAN_PRICE_IDS = {
  starter: process.env.STRIPE_PRICE_STARTER || '',
  pro: process.env.STRIPE_PRICE_PRO || '',
  business: process.env.STRIPE_PRICE_BUSINESS || ''
}
