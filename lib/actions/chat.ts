'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import {
  clearSupabaseChats,
  deleteSupabaseChat,
  getSupabaseChat,
  getSupabaseChats,
  saveSupabaseChat
} from '@/lib/db/supabase-history'
import { type Chat } from '@/lib/types'

export async function getChats(userId?: string | null) {
  return await getSupabaseChats(userId)
}

export async function getChatsPage(
  userId: string,
  limit = 20,
  offset = 0
): Promise<{ chats: Chat[]; nextOffset: number | null }> {
  // Simple pagination implementation for Supabase
  const chats = await getSupabaseChats(userId)
  const slicedChats = chats.slice(offset, offset + limit)
  const nextOffset = chats.length > offset + limit ? offset + limit : null
  return { chats: slicedChats, nextOffset }
}

export async function getChat(id: string, userId: string = 'anonymous') {
  return await getSupabaseChat(id)
}

export async function clearChats(
  userId: string = 'anonymous'
): Promise<{ error?: string }> {
  try {
    await clearSupabaseChats(userId)
    revalidatePath('/')
    redirect('/')
  } catch (error) {
    return { error: 'Failed to clear chats' }
  }
}

export async function deleteChat(
  chatId: string,
  userId = 'anonymous'
): Promise<{ error?: string }> {
  try {
    await deleteSupabaseChat(chatId, userId)
    revalidatePath('/')
    return {}
  } catch (error) {
    return { error: 'Failed to delete chat' }
  }
}

export async function saveChat(chat: Chat, userId: string = 'anonymous') {
  try {
    await saveSupabaseChat(chat)
  } catch (error) {
    console.error('Save chat error:', error)
    throw error
  }
}

export async function getSharedChat(id: string) {
  const chat = await getSupabaseChat(id)
  if (!chat || !chat.sharePath) {
    return null
  }
  return chat
}

export async function shareChat(id: string, userId: string = 'anonymous') {
  const chat = await getSupabaseChat(id)
  if (!chat || chat.userId !== userId) {
    return null
  }

  const payload = {
    ...chat,
    sharePath: `/share/${id}`
  }

  await saveSupabaseChat(payload)
  return payload
}
