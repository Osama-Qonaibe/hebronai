# Subscription System Setup

## Database Setup

1. Run the migration in Supabase:
```sql
-- Execute: supabase/migrations/001_subscriptions.sql
```

2. Verify tables created:
- plans
- subscriptions
- usage
- invoices

## Stripe Setup

### 1. Create Stripe Account
- Go to [stripe.com](https://stripe.com)
- Create account or login

### 2. Create Products

Create 3 products with prices:

**Starter Plan**
- Name: Starter
- Price: $4.99/month
- Recurring: Monthly
- Copy Price ID → `STRIPE_PRICE_STARTER`

**Pro Plan**
- Name: Pro
- Price: $9.99/month
- Recurring: Monthly
- Copy Price ID → `STRIPE_PRICE_PRO`

**Business Plan**
- Name: Business
- Price: $29.99/month
- Recurring: Monthly
- Copy Price ID → `STRIPE_PRICE_BUSINESS`

### 3. Get API Keys

Developers → API keys:
- Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Secret key → `STRIPE_SECRET_KEY`

### 4. Setup Webhook

Developers → Webhooks → Add endpoint:
- URL: `https://your-domain.com/api/stripe/webhook`
- Events to send:
  - checkout.session.completed
  - customer.subscription.created
  - customer.subscription.updated
  - customer.subscription.deleted
  - invoice.paid
  - invoice.payment_failed
- Copy signing secret → `STRIPE_WEBHOOK_SECRET`

### 5. Update Supabase Plans

Update the plans table with Stripe Price IDs:
```sql
UPDATE plans SET stripe_price_id = 'price_xxx' WHERE id = 'starter';
UPDATE plans SET stripe_price_id = 'price_xxx' WHERE id = 'pro';
UPDATE plans SET stripe_price_id = 'price_xxx' WHERE id = 'business';
```

## Environment Variables

Add to `.env.local`:
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com

STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_BUSINESS=price_...
```

## Testing

### Test Cards

**Successful payment:**
- Card: 4242 4242 4242 4242
- Exp: Any future date
- CVC: Any 3 digits

**Payment requires authentication:**
- Card: 4000 0025 0000 3155

**Payment is declined:**
- Card: 4000 0000 0000 9995

### Test Webhook Locally

1. Install Stripe CLI:
```bash
stripe login
```

2. Forward webhooks:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

3. Copy webhook signing secret to `.env.local`

## Usage

### Check User Subscription
```typescript
import { getUserPlan } from '@/lib/actions/subscription'

const plan = await getUserPlan(userId)
console.log(plan.name) // Free, Starter, Pro, Business
```

### Check Limits
```typescript
import { checkUserLimit } from '@/lib/actions/subscription'

const canSend = await checkUserLimit(userId, 'messages')
if (!canSend) {
  // Show upgrade prompt
}
```

### Track Usage
```typescript
import { trackUsage } from '@/lib/actions/subscription'

await trackUsage(userId, 'message', 1)
```

### Create Checkout Session
```typescript
const response = await fetch('/api/stripe/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ priceId: 'price_xxx' })
})

const { url } = await response.json()
window.location.href = url
```

### Open Billing Portal
```typescript
const response = await fetch('/api/stripe/portal', {
  method: 'POST'
})

const { url } = await response.json()
window.location.href = url
```

## Production Checklist

- [ ] Switch to live Stripe keys
- [ ] Update webhook URL to production
- [ ] Test all payment flows
- [ ] Set up Stripe tax collection (if needed)
- [ ] Configure email receipts
- [ ] Set up billing alerts
- [ ] Review subscription settings
- [ ] Test cancellation flow
- [ ] Test upgrade/downgrade flow
