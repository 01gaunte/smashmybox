<!--
Version: v1.00
Last Updated: 2026-01-16
Changelog:
- v1.00 (2026-01-16): Initial document creation

Version Control Rules:
- Major changes (X.00 → X+1.00): Strategic pivots, complete restructuring, scope changes
- Minor changes (X.YY → X.YY+0.01): Small edits, clarifications, task updates, notes
-->


# PR0006 – Accounts & Identity (MVP+)

**Status:** Not Started
**Priority:** Medium
**Dependencies:** PR0002 (user roles), PR0005 (infrastructure)

---

## Objective

Introduce lightweight identity system only when necessary, keeping barriers to participation minimal.

---

## Core Principles

1. **No Account Required to Contribute** - Maximize conversion
2. **Optional Account for Creators** - Track boxes, view analytics
3. **Email-First Authentication** - No passwords initially
4. **Minimal Data Collection** - GDPR compliance by design

---

## MVP Requirements

### Anonymous Contributors (Default)
- No signup required
- Email for receipt (optional)
- Payment details via Stripe (not stored)

### Box Creators
- Email required for:
  - Box management
  - Payout notifications
  - Analytics access
- Magic link authentication
- Optional profile (name only)

---

## Authentication Methods

### Phase 1: Magic Links (Recommended)
- User enters email
- Receives one-time login link
- Link expires after 15 minutes
- Session lasts 30 days

**Pros:**
- No password management
- Secure
- Low friction
- Email verification built-in

### Phase 2: Social Auth (Optional)
- Google OAuth
- GitHub OAuth
- For creators only

---

## Data Model

```sql
users:
  - id (uuid)
  - email (string, unique)
  - name (string, nullable)
  - created_at (timestamp)
  - last_login (timestamp)

sessions:
  - id (uuid)
  - user_id (uuid, foreign key)
  - token (string, hashed)
  - expires_at (timestamp)
  - created_at (timestamp)

magic_links:
  - id (uuid)
  - email (string)
  - token (string, hashed)
  - expires_at (timestamp)
  - used (boolean)
  - created_at (timestamp)
```

---

## User Dashboard (Creators Only)

### Features
- List of created boxes
- Box status (active, filled, completed)
- Total funds raised
- Analytics per box
- Edit box details (before filling)
- Cancel box (if needed)

---

## Privacy & Data Protection

### Data Minimization
- Collect only: email, name (optional)
- No phone numbers
- No addresses (unless required for payouts)
- No date of birth

### GDPR Compliance
- Right to access data
- Right to deletion
- Right to data portability
- Privacy policy
- Cookie consent (minimal cookies)

### Data Retention
- Active accounts: Indefinite
- Inactive accounts: Delete after 2 years
- Transaction records: 6+ years (legal requirement)

---

## Success Criteria

- [ ] <5% friction for contributors (no account needed)
- [ ] <30s signup for creators
- [ ] Zero password resets (magic links)
- [ ] GDPR compliant

---

## Notes

*(Add auth implementation details, security audit findings, user feedback)*
