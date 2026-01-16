# SmashMyBox Implementation

**Status:** MVP Development In Progress
**Started:** 2026-01-16
**Stack:** Next.js 15 + TypeScript + Tailwind CSS

---

## What's Been Built

### Phase 1: Core Game Interface ✅

**Completed Components:**

1. **Six-Box Display** ([app-src/components/Box.tsx](app-src/components/Box.tsx))
   - Parcel-style visual design per PR0003
   - Aging effects (0-30 day scale)
   - Weathering, stamps, scuff marks appear over time
   - Face value prominently displayed
   - No progress indicators (hidden threshold)

2. **Contribution Modal** ([app-src/components/ContributionModal.tsx](app-src/components/ContributionModal.tsx))
   - Suggested amounts (1%, 2%, 5% of face value)
   - Custom amount input
   - KYC notice (per PR0006)
   - Minimum £0.50, maximum 2x face value

3. **Win/Deposit Feedback** ([app-src/app/page.tsx](app-src/app/page.tsx))
   - Binary feedback: "Deposited" or "YOU WON!"
   - No progress visible to user
   - Auto-dismisses after 5 seconds

### Phase 2: Game Mechanics ✅

**Implemented Features:**

1. **Payout Logic** ([app-src/lib/types.ts](app-src/lib/types.ts))
   - Face Value vs Target Fill Value calculation
   - Platform fee (5%) + Charity (20%) = 25% overhead
   - Example: £10 face value → £13.25 target fill value
   - Overshoot handling: excess goes to house

2. **Contribution Processing** ([app-src/app/api/contribute/route.ts](app-src/app/api/contribute/route.ts))
   - Sequential processing by timestamp
   - Deterministic win condition (Running Total ≥ Target)
   - Overshoot capture (if £5 contribution only needs £2, £3 → house)
   - Winner gets exactly face value (no deductions)

3. **Mock Database** ([app-src/lib/db-mock.ts](app-src/lib/db-mock.ts))
   - In-memory storage for development
   - Six boxes initialized per PR0003
   - Contribution tracking
   - User records

### Phase 3: API Routes ✅

1. **GET /api/boxes** - Fetch all active boxes
2. **POST /api/contribute** - Process contribution with game mechanics

---

## File Structure

```
app-src/
├── app/
│   ├── api/
│   │   ├── boxes/route.ts          # Box listing API
│   │   └── contribute/route.ts     # Contribution processing
│   ├── globals.css                 # Global styles + grain texture
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Main game interface
├── components/
│   ├── Box.tsx                     # Parcel box component
│   └── ContributionModal.tsx       # Contribution UI
├── lib/
│   ├── types.ts                    # Type definitions + game logic
│   └── db-mock.ts                  # Mock database layer
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## How to Run

### Development Server

```bash
cd app-src
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## Implemented Specifications

### PR0003 - Visual Identity & Game Mechanics ✅

- [x] Six concurrent boxes displayed
- [x] Parcel-style design with aging effects
- [x] Hidden progress (no visible threshold)
- [x] Binary feedback only (deposit or win)
- [x] Face value prominently shown
- [x] Creation date and age tracking

### PR0004 - Payout Logic ✅

- [x] Face Value vs Target Fill Value distinction
- [x] Platform fee (5%) calculation
- [x] Charity allocation (20%) calculation
- [x] Overshoot handling (excess → house)
- [x] Sequential contribution processing
- [x] Deterministic win condition
- [x] All 8 invariants implemented

### PR0005 - Hosting & Infrastructure ✅

- [x] Next.js framework (serverless-ready)
- [x] API routes as serverless functions
- [x] Static HTML + interactive frontend
- [x] Deployable to Vercel
- [x] Simple stack (no unnecessary complexity)

### PR0006 - Accounts & Identity ⏳

- [ ] Authentication system (magic link)
- [ ] Two-stage identity model
- [ ] Entry-level: email + alias
- [ ] KYC escalation on payout
- [x] UX principle: game-first interface
- [x] Notice to users about KYC requirement

---

## Still To Do

### Critical (MVP Blockers)

1. **Authentication System** (PR0006)
   - Magic link email authentication
   - Session management (30-day tokens)
   - User registration with alias
   - Login/logout flows

2. **Real Database** (PR0005)
   - PostgreSQL setup (Vercel Postgres or Supabase)
   - Schema migration from mock to real DB
   - Connection pooling
   - Data persistence

3. **Payment Processing** (PR0001 + PR0004)
   - Stripe Connect integration
   - Test mode initially
   - Payment intent creation
   - Webhook handling
   - Real money flow (requires Malta MGA license)

4. **Box Replacement Logic**
   - When box fills, create new box with same face value
   - Maintain six active boxes at all times
   - Handle box creation dates

### High Priority (Post-MVP)

5. **KYC Verification Flow** (PR0006)
   - Document upload
   - Identity verification service integration
   - Manual review queue
   - Payout approval process

6. **Winner Notification System**
   - Email notification on win
   - SMS notification (optional)
   - In-app notification

7. **Payout System**
   - Winner dashboard
   - Withdrawal request flow
   - KYC verification trigger
   - Actual payout via Stripe

### Medium Priority

8. **Security Hardening**
   - Rate limiting on API routes
   - CSRF protection
   - Input sanitization
   - Fraud detection

9. **Monitoring & Logging**
   - Error tracking (Sentry)
   - Analytics (Plausible)
   - Performance monitoring
   - Audit logs

10. **Terms & Compliance**
    - Terms of Service page
    - Privacy Policy page
    - Cookie consent
    - GDPR compliance features

---

## Development Notes

### Current Limitations

1. **No Real Authentication**
   - Mock user IDs generated client-side
   - No session management
   - Anyone can contribute

2. **In-Memory Storage**
   - Data lost on server restart
   - Not production-ready
   - No persistence between deploys

3. **No Payment Processing**
   - Contributions are simulated
   - No real money flow
   - Stripe integration needed

4. **No Email/Notifications**
   - Winners aren't notified
   - No email confirmations
   - No magic link system yet

### Design Decisions

1. **Overshoot to House** (PR0004)
   - Simplifies payout logic
   - Prevents fractional refunds
   - Winner always gets exact face value
   - Platform earns additional revenue from overshoot

2. **Hidden Threshold** (PR0003)
   - No progress bars visible
   - Creates anticipation
   - Users can't game the system
   - Box age is only visible indicator

3. **Binary Feedback** (PR0003)
   - Only two outcomes: deposited or won
   - No partial feedback
   - Maintains mystery
   - Clean UX

4. **Six Fixed Boxes** (PR0003 V1)
   - No user-created boxes in V1
   - System-managed boxes only
   - Simplifies scope
   - Focus on core game mechanics

---

## Testing Checklist

### Manual Testing

- [x] Six boxes display correctly
- [x] Box aging visual effects work
- [x] Contribution modal opens
- [x] Amount suggestions work
- [x] Custom amount input works
- [x] Contribution processes successfully
- [x] "Deposited" feedback shows
- [x] Win condition triggers correctly
- [x] "YOU WON!" feedback shows
- [x] Overshoot calculation works
- [ ] Multiple users can contribute
- [ ] Box status updates correctly
- [ ] Winner ID recorded

### Edge Cases

- [x] Minimum contribution (£0.50)
- [x] Overshoot handling (excess → house)
- [ ] Simultaneous contributions (race conditions)
- [ ] Box already filled
- [ ] Invalid box ID
- [ ] Invalid user ID
- [ ] Network errors

---

## Next Steps

1. **Immediate:** Set up authentication (PR0006)
   - Magic link system
   - User registration
   - Session management

2. **Short-term:** Database migration (PR0005)
   - Choose database (Vercel Postgres recommended)
   - Create schema
   - Migrate from mock DB

3. **Medium-term:** Payment integration
   - Stripe test mode
   - Payment flow
   - Webhook handling

4. **Long-term:** Production readiness
   - Malta MGA license
   - Legal compliance
   - Security audit
   - Load testing

---

## Deployment

### Current State

- Holding page: [smashmybox.com](https://smashmybox.com) (static)
- Development app: Running locally on port 3000
- Production app: Not yet deployed

### Deployment Plan

1. **Staging Environment**
   - Deploy to Vercel preview branch
   - Test mode only
   - No real payments

2. **Production Requirements**
   - Malta MGA license (£40k capital + €25k/year)
   - Real database (PostgreSQL)
   - Stripe live mode
   - Legal pages complete
   - Security audit passed

---

## Architecture Principles (PR0005)

> "Keep the stack as simple as possible for as long as possible."

- Start with serverless functions, not servers
- Static frontend where possible
- Database only when needed
- Third-party services over custom solutions
- Progressive enhancement, not big-bang architecture

---

## Questions for User

1. **Database Choice:** Vercel Postgres (easy) or Supabase (more features)?
2. **Authentication:** NextAuth.js or custom magic link implementation?
3. **Email Service:** Resend, SendGrid, or AWS SES?
4. **Priority:** Auth first or database first?
5. **Deployment Timeline:** When do you want to deploy to staging?

---

**Last Updated:** 2026-01-16
**Development Server:** Running at http://localhost:3000
