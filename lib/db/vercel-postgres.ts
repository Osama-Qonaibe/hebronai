import { createPool } from '@vercel/postgres'

/**
 * Vercel Postgres client utility
 * Requires POSTGRES_URL environment variable
 */
export const db = createPool()

export async function createChatHistoryTable() {
  await db.sql`
    CREATE TABLE IF NOT EXISTS chat_history (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      messages JSONB NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `
}
