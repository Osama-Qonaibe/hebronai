import { createClient } from '@/lib/supabase/client'
import { TempFile } from '@/lib/types/generation'

const BUCKET_NAME = 'temp-files'

export async function uploadTempFile(
  file: File | Blob,
  userId: string,
  type: string
): Promise<{ path: string; url: string }> {
  const supabase = createClient()
  const fileExt = file instanceof File ? file.name.split('.').pop() : 'bin'
  const fileName = `${userId}/${type}/${Date.now()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file)

  if (error) throw error

  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName)

  return {
    path: data.path,
    url: urlData.publicUrl
  }
}

export async function deleteTempFile(path: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([path])
  if (error) throw error
}

export async function saveTempFileRecord(
  record: Omit<TempFile, 'id' | 'createdAt' | 'expiresAt'>
): Promise<TempFile> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('temp_files')
    .insert({
      user_id: record.userId,
      type: record.type,
      storage_path: record.storagePath,
      file_url: record.fileUrl,
      file_size: record.fileSize,
      metadata: record.metadata || {}
    })
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    userId: data.user_id,
    type: data.type,
    storagePath: data.storage_path,
    fileUrl: data.file_url,
    fileSize: data.file_size,
    metadata: data.metadata,
    createdAt: new Date(data.created_at),
    expiresAt: new Date(data.expires_at)
  }
}

export async function getExpiredFiles(): Promise<TempFile[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('temp_files')
    .select('*')
    .lt('expires_at', new Date().toISOString())

  if (error) throw error

  return data.map(item => ({
    id: item.id,
    userId: item.user_id,
    type: item.type,
    storagePath: item.storage_path,
    fileUrl: item.file_url,
    fileSize: item.file_size,
    metadata: item.metadata,
    createdAt: new Date(item.created_at),
    expiresAt: new Date(item.expires_at)
  }))
}
