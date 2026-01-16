# HebronAI Tools Foundation 🏗️

## Overview

This document outlines the complete foundation architecture for HebronAI's tools system.

---

## 🗄️ Database Schema

### Tables

#### 1. `generations`
Stores all content generation requests (Image, Audio, Video, Web App)

```sql
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key → auth.users)
- type: TEXT (image|audio|video|webapp)
- prompt: TEXT
- result_url: TEXT
- metadata: JSONB
- status: TEXT (pending|processing|completed|failed)
- error: TEXT
- credits_used: INTEGER
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

#### 2. `finance_queries`
Tracks finance tool usage (Crypto, Stocks, Currency, Calculator)

```sql
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key → auth.users)
- tool_type: TEXT (crypto|stocks|currency|calculator)
- query_params: JSONB
- result_data: JSONB
- created_at: TIMESTAMPTZ
```

#### 3. `design_requests`
Manages design tool requests (Canva, Figma, Screenshot, Logo)

```sql
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key → auth.users)
- tool_type: TEXT (canva|figma|screenshot|logo)
- input_data: JSONB
- output_url: TEXT
- status: TEXT (pending|processing|completed|failed)
- metadata: JSONB
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

#### 4. `dev_tasks`
Handles developer tool tasks (GitHub, Gmail, API, Deploy)

```sql
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key → auth.users)
- tool_type: TEXT (github|gmail|api|deploy)
- task_data: JSONB
- result: JSONB
- status: TEXT (pending|processing|completed|failed)
- error: TEXT
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

#### 5. `user_credits`
Tracks user credit balance and usage

```sql
- user_id: UUID (Primary Key, Foreign Key → auth.users)
- total_credits: INTEGER (default: 100)
- used_credits: INTEGER (default: 0)
- last_reset_at: TIMESTAMPTZ
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

---

## 📦 Storage Buckets

### 1. `generations`
- Stores generated images, audio, and video files
- Public bucket with user-scoped access
- Path: `{user_id}/{type}/{filename}`

### 2. `designs`
- Stores design outputs (logos, screenshots, etc.)
- Public bucket with user-scoped access
- Path: `{user_id}/{tool_type}/{filename}`

---

## 🔐 Security (RLS)

All tables have Row Level Security enabled with these policies:

- **SELECT**: Users can only view their own records
- **INSERT**: Users can only create records for themselves
- **UPDATE**: Users can only update their own records
- **DELETE**: Not allowed (records are preserved for history)

---

## ⚙️ Database Functions

### Credits Management

#### `increment_used_credits(user_id UUID, amount INTEGER)`
Deducts credits after successful tool usage

#### `get_available_credits(user_id UUID) RETURNS INTEGER`
Returns remaining credits for a user

#### `reset_user_credits(user_id UUID)`
Resets used_credits to 0 (run monthly)

#### `add_bonus_credits(user_id UUID, amount INTEGER)`
Adds bonus credits to user account

---

## 🔄 Unified Handler System

### Location
`lib/tools/handler.ts`

### Flow
```
1. User clicks tool button
2. Frontend calls API route
3. API route calls handleToolRequest()
4. Handler validates user & credits
5. Handler routes to specific tool handler
6. Tool handler creates DB record
7. Tool handler calls external API (async)
8. Credits are deducted
9. Response returned to frontend
```

### Interface
```typescript
interface ToolRequest {
  category: 'generate' | 'finance' | 'design' | 'dev'
  tool: string
  params: Record<string, any>
  userId: string
}

interface ToolResponse {
  success: boolean
  data?: any
  error?: string
  creditsUsed?: number
}
```

---

## 📁 API Routes Structure

```
app/api/tools/
├── generate/
│   └── route.ts (handles all generation types)
├── finance/
│   └── route.ts (handles all finance tools)
├── design/
│   └── route.ts (handles all design tools)
└── dev/
    └── route.ts (handles all dev tools)
```

---

## 🎯 Credits System

### Credit Costs

| Tool Category | Cost per Use |
|--------------|-------------|
| Image Generation | 1 credit |
| Audio Generation | 1 credit |
| Video Generation | 2 credits |
| Web App Generation | 1 credit |
| Finance Tools | FREE |
| Design Tools | 1 credit |
| Dev Tools | FREE |

### Default Allocation
- New users: **100 credits/month**
- Resets automatically on 1st of each month

---

## 🚀 Setup Instructions

### 1. Run Database Migrations

```bash
# In Supabase SQL Editor, run:
supabase/migrations/20260116_tools_foundation.sql
supabase/migrations/20260116_credits_functions.sql
```

### 2. Create Storage Buckets

```sql
-- Already included in migration, but verify:
SELECT * FROM storage.buckets 
WHERE id IN ('generations', 'designs');
```

### 3. Environment Variables

Add to `.env.local`:

```env
# External APIs (to be configured per tool)
OPENAI_API_KEY=your_key_here
ELEVENLABS_API_KEY=your_key_here
# ... more as needed
```

---

## 📊 Monitoring

### Key Metrics to Track

1. **Credits Usage**
```sql
SELECT 
  COUNT(*) as total_users,
  AVG(used_credits) as avg_credits_used,
  SUM(used_credits) as total_credits_used
FROM user_credits;
```

2. **Tool Popularity**
```sql
SELECT type, COUNT(*) 
FROM generations 
GROUP BY type 
ORDER BY count DESC;
```

3. **Success Rate**
```sql
SELECT 
  status, 
  COUNT(*) * 100.0 / SUM(COUNT(*)) OVER () as percentage
FROM generations 
GROUP BY status;
```

---

## ✅ Next Steps

Foundation is complete! Now ready for:

1. **Phase 2**: Build individual tool implementations
2. **Phase 3**: Add real-time status updates
3. **Phase 4**: Implement external API integrations

---

## 🛠️ Development Workflow

For each new tool:

1. Add API route (`app/api/tools/{category}/route.ts`)
2. Implement external API call
3. Update handler in `lib/tools/handler.ts`
4. Test with Postman/Thunder Client
5. Connect frontend dropdown
6. Deploy & monitor

---

**Foundation Status**: ✅ **COMPLETE**

**Ready for**: Phase 2 - Individual Tool Development
