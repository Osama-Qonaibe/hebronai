export type PlanInterval = 'month' | 'year'

export type SubscriptionStatus =
  | 'active'
  | 'canceled'
  | 'past_due'
  | 'unpaid'
  | 'trialing'
  | 'incomplete'

export interface PlanFeatures {
  models: string[]
  web_search: boolean
  file_upload: boolean
  api_access: boolean
  priority_support: boolean
  messages_per_month: number | null
  searches_per_day: number | null
  max_file_size_mb: number | null
}

export interface Plan {
  id: string
  name: string
  description: string | null
  price: number
  currency: string
  interval: PlanInterval
  features: PlanFeatures
  stripe_price_id: string | null
  stripe_product_id: string | null
  active: boolean
  popular: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan_id: string
  stripe_customer_id: string
  stripe_subscription_id: string | null
  stripe_payment_method_id: string | null
  status: SubscriptionStatus
  current_period_start: string | null
  current_period_end: string | null
  cancel_at_period_end: boolean
  canceled_at: string | null
  trial_end: string | null
  created_at: string
  updated_at: string
  plan?: Plan
}

export interface Usage {
  id: string
  user_id: string
  subscription_id: string | null
  messages_count: number
  searches_count: number
  file_uploads_count: number
  api_calls_count: number
  period_start: string
  period_end: string
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: string
  user_id: string
  subscription_id: string | null
  stripe_invoice_id: string
  stripe_payment_intent_id: string | null
  amount: number
  currency: string
  status: string
  invoice_pdf: string | null
  period_start: string | null
  period_end: string | null
  paid_at: string | null
  created_at: string
}
