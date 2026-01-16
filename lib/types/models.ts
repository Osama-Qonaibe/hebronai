export interface Model {
  id: string
  name: string
  provider: string
  providerId: string
  enabled: boolean
  toolCallType: 'native' | 'manual'
  toolCallModel?: string
  tier?: 'free' | 'paid' | 'trial'
  category?: 'premium' | 'reasoning' | 'fast' | 'vision' | 'realtime'
  releaseDate?: string
  capabilities?: string[]
  contextWindow?: number
}
