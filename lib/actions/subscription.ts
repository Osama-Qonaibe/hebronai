'use server'

import { createClient } from '@/lib/supabase/server'
import type { Plan, Subscription, Usage } from '@/lib/types/subscription'

export async function getUserSubscription(
  userId: string
): Promise<Subscription | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*, plan:plans(*)')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single()

  if (error) return null
  return data as Subscription
}

export async function getUserPlan(userId: string): Promise<Plan> {
  const subscription = await getUserSubscription(userId)

  if (!subscription || !subscription.plan) {
    const supabase = await createClient()
    const { data } = await supabase
      .from('plans')
      .select('*')
      .eq('id', 'free')
      .single()

    return data as Plan
  }

  return subscription.plan as Plan
}

export async function checkUserLimit(
  userId: string,
  limitType: 'messages' | 'searches' | 'files'
): Promise<boolean> {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('check_user_limit', {
    p_user_id: userId,
    p_limit_type: limitType
  })

  if (error) return false
  return data as boolean
}

export async function trackUsage(
  userId: string,
  type: 'message' | 'search' | 'file' | 'api',
  count: number = 1
): Promise<void> {
  const supabase = await createClient()

  await supabase.rpc('increment_usage', {
    p_user_id: userId,
    p_type: type,
    p_count: count
  })
}

export async function getUserUsage(userId: string): Promise<Usage | null> {
  const supabase = await createClient()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { data, error } = await supabase
    .from('usage')
    .select('*')
    .eq('user_id', userId)
    .gte('period_start', today.toISOString())
    .single()

  if (error) return null
  return data as Usage
}

export async function getAllPlans(): Promise<Plan[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })

  if (error) return []
  return data as Plan[]
}

export async function getPlanById(planId: string): Promise<Plan | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('id', planId)
    .single()

  if (error) return null
  return data as Plan
}
