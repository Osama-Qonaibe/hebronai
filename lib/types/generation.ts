export type GenerationMode = 'text' | 'image' | 'video' | 'audio' | 'webapp' | 'code'

export interface TempFile {
  id: string
  userId: string
  type: GenerationMode
  storagePath: string
  fileUrl: string
  fileSize?: number
  metadata?: Record<string, any>
  createdAt: Date
  expiresAt: Date
}

export interface GenerationResult {
  type: GenerationMode
  url?: string
  content?: string
  metadata?: Record<string, any>
}
