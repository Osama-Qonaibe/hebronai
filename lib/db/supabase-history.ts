import { createClient } from '@/lib/supabase/server'
import { type Chat } from '@/lib/types'

export async function getSupabaseChats(userId?: string | null) {
  if (!userId) return []

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('chat_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching chats from Supabase:', error)
    return []
  }

  return (data || []).map(item => ({
    id: item.id,
    title: item.title,
    userId: item.user_id,
    createdAt: new Date(item.created_at),
    messages: item.messages,
    path: item.path,
    sharePath: item.share_path
  })) as Chat[]
}

export async function getSupabaseChat(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('chat_history')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching chat from Supabase:', error)
    return null
  }

  return {
    id: data.id,
    title: data.title,
    userId: data.user_id,
    createdAt: new Date(data.created_at),
    messages: data.messages,
    path: data.path,
    sharePath: data.share_path
  } as Chat
}

export async function saveSupabaseChat(chat: Chat) {
  const supabase = await createClient()
  const { error } = await supabase.from('chat_history').upsert({
    id: chat.id,
    user_id: chat.userId,
    title: chat.title,
    path: chat.path,
    messages: chat.messages,
    share_path: chat.sharePath,
    updated_at: new Date().toISOString()
  })

  if (error) {
    console.error('Error saving chat to Supabase:', error)
    throw error
  }
}

export async function deleteSupabaseChat(id: string, userId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('chat_history')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) {
    console.error('Error deleting chat from Supabase:', error)
    throw error
  }
}

export async function clearSupabaseChats(userId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('chat_history')
    .delete()
    .eq('user_id', userId)

  if (error) {
    console.error('Error clearing chats from Supabase:', error)
    throw error
  }
}
