<!--
Version: v2.00
Last Updated: 2026-01-16
Changelog:
- v2.00 (2026-01-16): Major revision - Authoritative hosting strategy, serverless clarification, deployment discipline
- v1.00 (2026-01-16): Initial document creation with basic infrastructure options

Version Control Rules:
- Major changes (X.00 → X+1.00): Strategic pivots, complete restructuring, scope changes
- Minor changes (X.YY → X.YY+0.01): Small edits, clarifications, task updates, notes
-->


# PR0005 – Hosting & Infrastructure

**Status:** Active (Initial Deployment Complete)
**Priority:** High
**Dependencies:** PR0004 (payout logic influences architecture)

---

## Objective

Define hosting choices, scalability path, and deployment discipline. Keep the stack as simple as possible for as long as possible.

---

## 1. Guiding Principle

**Keep the stack as simple as possible for as long as possible.**

Only introduce infrastructure when the product *forces* us to.

This project deliberately avoids premature backend complexity.

---

## 2. Current State (As-Is)

The project is already deployed with:

- **Source control:** GitHub (01gaunte/smashmybox)
- **Hosting:** Vercel (Free tier)
- **Domain:** smashmybox.com (Porkbun)
- **Frontend:** Static HTML / CSS (holding page)
- **Backend:** None
- **Payments:** None
- **Persistent state:** None
- **Deployment:** Automatic on push to main
- **SSL:** Automatic via Vercel

**This is the correct setup for the current stage.**

---

## 3. Initial Stack (Holding Page Phase)

### What We Are Using
- GitHub for version control
- Vercel for deployment and hosting
- Static assets only (HTML, CSS, images)

### What We Are Explicitly NOT Using Yet
- No database
- No API
- No authentication
- No payment processing
- No server processes

### Why This Works
- Zero operational overhead
- Extremely fast deployments
- Easy rollbacks
- Free or near-free cost
- Scales automatically for traffic spikes
- No infrastructure decisions blocking progress

---

## 4. What "Serverless Functions" Mean (Clarified)

**A serverless function is NOT an HTML page.**

It is:
- A small piece of backend code
- Executed **only when triggered**
- Automatically scaled
- No server to manage or maintain

### Examples of Future Use
- Accepting a contribution request
- Validating a payment intent
- Updating a box's global state
- Triggering a payout when a box is filled

### On Vercel, These Are Typically
- JavaScript / TypeScript functions
- Deployed alongside the frontend
- Invoked via HTTPS endpoints (e.g., `/api/contribute`)

### Key Point
> Serverless functions let us add backend logic *without* running a traditional server.

---

## 5. Planned Evolution (To-Be)

When the product moves beyond a holding page, the stack evolves **incrementally**:

### Phase 1 — Interactive Frontend
- Static frontend remains on Vercel
- UI becomes dynamic (React / Next.js)
- Client-side state management
- No money movement yet
- No backend required

**Timeline:** When UI design is ready

### Phase 2 — Serverless Logic
- Vercel Serverless Functions added
- Functions handle:
  - Box state reads
  - Contribution submission validation
  - Win detection
  - State mutations
- Still no traditional server

**Timeline:** When game mechanics need server-side enforcement

### Phase 3 — Payments
- Third-party payment provider (Stripe recommended)
- Payments handled **outside** core logic
- Webhooks processed via serverless functions
- Payment processor holds funds in escrow

**Timeline:** When real money enters system (requires licensing)

### Phase 4 — Persistence & Events
- Database added only when required (PostgreSQL recommended)
- Event-driven payout triggers
- Clear separation:
  - **Frontend** = experience
  - **Functions** = rules
  - **Payments** = external trust layer
  - **Database** = authoritative state

**Timeline:** When box history and user accounts needed

---

## 6. Scalability Philosophy

### What Vercel Handles Automatically
- Traffic spikes
- CDN distribution (global edge network)
- Global availability
- HTTPS/SSL certificates
- Automatic deployments
- Preview environments for PRs

### What Serverless Functions Provide
- Horizontal scaling by default
- No capacity planning required
- Pay-per-execution pricing
- No single point of failure

### What We Explicitly Avoid (For Now)
- Self-hosted servers
- Long-running processes
- Stateful backend services in V1
- Container orchestration
- Database until absolutely needed

---

## 7. Deployment Checklist (V1)

For each deployment:
- [ ] Changes committed to GitHub
- [ ] Vercel build passes
- [ ] Holding page renders correctly on desktop
- [ ] Holding page renders correctly on mobile
- [ ] No backend dependencies introduced accidentally
- [ ] No breaking changes to existing URLs
- [ ] Rollback path verified
- [ ] DNS remains configured correctly

---

## 8. Hosting Decision Log

### Decision: GitHub + Vercel for V1
**Rationale:**
- Already deployed and working
- Zero friction
- Industry-standard stack
- Scales well into serverless backend later
- Free tier sufficient for early stages
- Strong Next.js integration for future phases

**Alternatives Considered:**
- Netlify: Similar to Vercel, but less Next.js-focused
- Railway/Render: Requires more configuration, overkill for static
- AWS/GCP/Azure: Far too complex for current needs

**Revisit When:**
- Money movement begins (licensing required)
- Global state must be persisted (database needed)
- Regulatory requirements demand segregation
- Scale exceeds Vercel's free/paid tier limits

---

## 9. Non-Goals (Explicit)

These are deliberately out of scope:

- No dedicated servers
- No container orchestration (Docker/Kubernetes)
- No self-managed infrastructure
- No early database commitments
- No microservices architecture
- No service mesh
- No complex CI/CD pipelines (Vercel auto-deploy is sufficient)

---

## 10. Summary

**Current State:**
- GitHub + Vercel + Static HTML = Correct for holding page
- Zero cost, zero complexity, fully deployed

**Next Steps:**
- Vercel remains hosting platform
- Serverless functions provide backend logic when needed
- Database added only when persistence required
- Payment provider integrated when licensing allows

**Key Insight:**
> Vercel is **sufficient and correct** for holding page, early interactive prototypes, and initial game UI. Serverless functions provide a clean, low-risk path to backend logic **when needed**, without abandoning the existing stack.

**Nothing more is required at this stage.**

---

## Original MVP Architecture (Reference)

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
