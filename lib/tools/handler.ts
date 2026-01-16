import { createClient } from '@/lib/supabase/server'
import { DesignTool, DevTool, FinanceTool } from '@/lib/types/tools'
import { GenerationMode } from '@/lib/types/generation'

export type ToolCategory = 'generate' | 'finance' | 'design' | 'dev'

export type ToolType = GenerationMode | FinanceTool | DesignTool | DevTool

export interface ToolRequest {
  category: ToolCategory
  tool: ToolType
  params: Record<string, any>
  userId: string
}

export interface ToolResponse {
  success: boolean
  data?: any
  error?: string
  creditsUsed?: number
}

/**
 * Unified handler for all tool requests
 * Handles validation, credits, API calls, and storage
 */
export async function handleToolRequest(
  request: ToolRequest
): Promise<ToolResponse> {
  const { category, tool, params, userId } = request

  try {
    // 1. Validate user authentication
    if (!userId) {
      return { success: false, error: 'User not authenticated' }
    }

    // 2. Check user credits
    const hasCredits = await checkUserCredits(userId)
    if (!hasCredits) {
      return { success: false, error: 'Insufficient credits' }
    }

    // 3. Route to specific handler
    let result: ToolResponse

    switch (category) {
      case 'generate':
        result = await handleGeneration(tool as GenerationMode, params, userId)
        break
      case 'finance':
        result = await handleFinance(tool as FinanceTool, params, userId)
        break
      case 'design':
        result = await handleDesign(tool as DesignTool, params, userId)
        break
      case 'dev':
        result = await handleDev(tool as DevTool, params, userId)
        break
      default:
        return { success: false, error: 'Invalid tool category' }
    }

    // 4. Deduct credits if successful
    if (result.success && result.creditsUsed) {
      await deductCredits(userId, result.creditsUsed)
    }

    return result
  } catch (error) {
    console.error('Tool request error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Check if user has available credits
 */
async function checkUserCredits(userId: string): Promise<boolean> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('user_credits')
    .select('total_credits, used_credits')
    .eq('user_id', userId)
    .single()

  if (error || !data) {
    return false
  }

  return data.total_credits > data.used_credits
}

/**
 * Deduct credits from user account
 */
async function deductCredits(
  userId: string,
  amount: number
): Promise<void> {
  const supabase = await createClient()

  await supabase.rpc('increment_used_credits', {
    user_id: userId,
    amount
  })
}

/**
 * Handle generation requests (image, audio, video, webapp)
 */
async function handleGeneration(
  mode: GenerationMode,
  params: any,
  userId: string
): Promise<ToolResponse> {
  const supabase = await createClient()

  // Create generation record
  const { data, error } = await supabase
    .from('generations')
    .insert({
      user_id: userId,
      type: mode,
      prompt: params.prompt || '',
      status: 'pending',
      metadata: params
    })
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return {
    success: true,
    data: { id: data.id, status: 'pending' },
    creditsUsed: 1
  }
}

/**
 * Handle finance requests (crypto, stocks, currency, calculator)
 */
async function handleFinance(
  tool: FinanceTool,
  params: any,
  userId: string
): Promise<ToolResponse> {
  const supabase = await createClient()

  // Finance queries are free (no credits)
  const { data, error } = await supabase
    .from('finance_queries')
    .insert({
      user_id: userId,
      tool_type: tool,
      query_params: params
    })
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return {
    success: true,
    data: { id: data.id },
    creditsUsed: 0 // Finance tools are free
  }
}

/**
 * Handle design requests (canva, figma, screenshot, logo)
 */
async function handleDesign(
  tool: DesignTool,
  params: any,
  userId: string
): Promise<ToolResponse> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('design_requests')
    .insert({
      user_id: userId,
      tool_type: tool,
      input_data: params,
      status: 'pending'
    })
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return {
    success: true,
    data: { id: data.id, status: 'pending' },
    creditsUsed: 1
  }
}

/**
 * Handle dev requests (github, gmail, api, deploy)
 */
async function handleDev(
  tool: DevTool,
  params: any,
  userId: string
): Promise<ToolResponse> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('dev_tasks')
    .insert({
      user_id: userId,
      tool_type: tool,
      task_data: params,
      status: 'pending'
    })
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return {
    success: true,
    data: { id: data.id, status: 'pending' },
    creditsUsed: 0 // Dev tools are free for now
  }
}
