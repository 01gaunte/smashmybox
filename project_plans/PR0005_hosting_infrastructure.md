# PR0005 – Hosting & Infrastructure

**Status:** Partially Complete (holding page live)
**Priority:** High
**Dependencies:** PR0004 (payout logic influences architecture)

---

## Objective

Keep the stack simple, scalable, and cost-effective while supporting core functionality.

---

## Current Infrastructure

### Holding Page (Live)
- **Host:** Vercel (Free tier)
- **Domain:** smashmybox.com (Porkbun)
- **Tech:** Static HTML/CSS/JavaScript
- **Git:** GitHub (01gaunte/smashmybox)
- **Deployment:** Automatic on push to main
- **SSL:** Automatic via Vercel

### Benefits
- Zero cost
- Global CDN
- Instant deploys
- No backend complexity

---

## MVP Architecture

### Frontend
**Technology:** Next.js / React (or stay static)
**Hosting:** Vercel
**Features:**
- Server-side rendering for box pages
- Real-time updates (optional)
- Responsive UI
- Progressive Web App (PWA) capabilities

**Why Vercel:**
- Seamless Next.js integration
- Edge functions for dynamic content
- Free tier generous (100GB bandwidth)
- Automatic previews for PRs

### Backend
**Technology:** Node.js / Express OR serverless functions
**Hosting:** Vercel Serverless Functions OR Railway / Render
**Database:** PostgreSQL (Supabase / Railway / Neon)

**API Endpoints:**
```
POST   /api/boxes          - Create box
GET    /api/boxes/:id      - Get box details
POST   /api/contribute     - Process contribution
GET    /api/boxes/:id/status - Check box status
POST   /api/payout         - Trigger payout (webhook)
```

### Database Schema (Initial)
```sql
boxes:
  - id (uuid)
  - creator_id (uuid, nullable for MVP)
  - target_value (decimal)
  - current_value (decimal)
  - status (enum: pending, active, filled, completed, cancelled)
  - created_at (timestamp)
  - completed_at (timestamp, nullable)
  - metadata (jsonb: name, description, charity, etc.)

contributions:
  - id (uuid)
  - box_id (uuid, foreign key)
  - amount (decimal)
  - payment_intent_id (string, from Stripe)
  - status (enum: pending, succeeded, failed, refunded)
  - created_at (timestamp)

payouts:
  - id (uuid)
  - box_id (uuid, foreign key)
  - amount (decimal)
  - recipient_email (string)
  - payout_id (string, from Stripe)
  - status (enum: pending, processing, completed, failed)
  - created_at (timestamp)
```

### Payment Processing
**Provider:** Stripe
**Integration:** Stripe Connect (for payouts)
**Flow:**
1. Contributor initiates payment
2. Stripe Payment Intent created
3. Funds held by Stripe
4. On box fill, Stripe Transfer to recipient
5. Webhook confirms completion

**Why Stripe:**
- Best-in-class API
- Connect platform for payouts
- Strong fraud detection
- Regulatory compliance built-in

---

## Hosting Options Comparison

### Option A: Vercel Full Stack (Recommended for MVP)
**Pros:**
- Single platform
- Serverless functions included
- Free tier: 100GB bandwidth, unlimited functions
- Edge network
- Easy CI/CD

**Cons:**
- Function execution limits (10s on free, 60s on paid)
- Database hosting separate
- Less control over infrastructure

**Cost:** $0 (free tier) → $20/mo (Pro if needed)

### Option B: Traditional VPS (Railway, Render, Fly.io)
**Pros:**
- Full control
- Long-running processes
- Database included
- WebSocket support

**Cons:**
- More configuration
- Manual scaling
- Higher baseline cost

**Cost:** $5-10/mo (starter) → $25+/mo (production)

### Option C: AWS / GCP / Azure
**Pros:**
- Enterprise grade
- Maximum scalability
- Full service suite

**Cons:**
- Complexity overkill for MVP
- Cost unpredictability
- Steep learning curve

**Cost:** $20+/mo (complex to estimate)

---

## Database Hosting

### Option A: Supabase (Recommended)
- PostgreSQL with REST API
- Real-time subscriptions
- Built-in auth (for later)
- Free tier: 500MB, 2GB bandwidth
- **Cost:** $0 (free) → $25/mo (pro)

### Option B: Railway / Render PostgreSQL
- Managed PostgreSQL
- Simple provisioning
- Backup included
- **Cost:** $5-10/mo

### Option C: Neon (Serverless Postgres)
- Scales to zero
- Branch databases (perfect for dev)
- Generous free tier
- **Cost:** $0 (free) → $19/mo

---

## Monitoring & Observability

### Error Tracking
- **Tool:** Sentry (free tier: 5k events/mo)
- Track frontend and backend errors
- User session replay

### Analytics
- **Tool:** Plausible / Fathom (privacy-friendly)
- OR: Vercel Analytics (built-in)
- Track box creation, contributions, completions

### Uptime Monitoring
- **Tool:** UptimeRobot (free tier: 50 monitors)
- Alert on downtime
- Status page

### Logging
- Vercel function logs (built-in)
- Database query logging
- Stripe webhook logs

---

## CI/CD Pipeline

### Current Setup
- GitHub repository
- Vercel auto-deploy on push to main
- Preview deployments on PRs

### Enhancements Needed
- Automated testing (Jest, Playwright)
- Database migrations (Prisma / Knex)
- Environment variable management
- Staging environment

---

## Security Considerations

### SSL/TLS
- Automatic via Vercel
- Enforced HTTPS

### API Security
- Rate limiting (Vercel Edge Config)
- CORS configuration
- API key authentication (for internal endpoints)
- Webhook signature verification (Stripe)

### Data Protection
- Encryption at rest (database provider)
- Encryption in transit (HTTPS)
- PII minimization
- GDPR compliance

### Payment Security
- PCI-DSS compliance via Stripe
- Never store card details
- Tokenization for all payments

---

## Scalability Plan

### Phase 1: MVP (0-1000 boxes)
- Vercel free tier
- Supabase free tier
- Stripe standard fees
- **Cost:** ~$0-10/mo

### Phase 2: Growth (1k-10k boxes)
- Vercel Pro ($20/mo)
- Supabase Pro ($25/mo)
- Upgraded monitoring
- **Cost:** ~$50-100/mo

### Phase 3: Scale (10k+ boxes)
- Vercel Enterprise or migrate
- Dedicated database
- CDN optimization
- Caching layer (Redis)
- **Cost:** $500+/mo

---

## Disaster Recovery

### Backups
- Database: Daily automated backups
- Code: Git version control
- Config: Environment variable snapshots

### Failover
- DNS failover (Cloudflare)
- Database replicas (paid tier)
- Static fallback page

### Incident Response
- Runbook for common issues
- On-call rotation (later phase)
- Status page updates

---

## Development Environment

### Local Setup
```bash
# Frontend
npm run dev (Next.js)

# Backend (if separate)
npm run server

# Database
Docker Compose PostgreSQL
OR
Supabase local development
```

### Testing Environment
- Stripe test mode
- Supabase preview branch
- Vercel preview deployments

---

## Deployment Checklist

### Pre-Launch
- [ ] Domain DNS configured
- [ ] SSL certificates active
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Stripe webhooks configured
- [ ] Monitoring tools active
- [ ] Error tracking configured

### Post-Launch
- [ ] Monitor error rates
- [ ] Check payment flow
- [ ] Verify webhook delivery
- [ ] Test box creation end-to-end
- [ ] Performance audit

---

## Success Criteria

- [ ] Infrastructure supports 10k concurrent users
- [ ] 99.9% uptime achieved
- [ ] Page load <2s (desktop), <3s (mobile)
- [ ] Zero payment failures due to infrastructure
- [ ] Cost per box <£0.10

---

## Notes

*(Add infrastructure decisions, performance metrics, and incident reports here)*
