<!--
Version: v2.00
Last Updated: 2026-01-16
Changelog:
- v2.00 (2026-01-16): Major revision - Two-stage identity model, mandatory auth for financial transactions, KYC escalation on payout
- v1.00 (2026-01-16): Initial document creation with magic link approach

Version Control Rules:
- Major changes (X.00 → X+1.00): Strategic pivots, complete restructuring, scope changes
- Minor changes (X.YY → X.YY+0.01): Small edits, clarifications, task updates, notes
-->


# PR0006 – Accounts & Identity (MVP+)

**Status:** Defined / Ready for Implementation
**Priority:** Critical
**Dependencies:** PR0002 (user roles), PR0005 (infrastructure), PR0003 (game mechanics)

---

## Objective

Define identity, authentication, and data minimization strategy for a financial game that balances compliance, security, user experience, and privacy.

---

## 1. Core Position (Agreed)

Because SmashMyBox involves **financial transactions**,
**all users must be authenticated before participating**.

However:
- **Identity is minimal at entry**
- **Full KYC is required only at payout**

This balances:
- Compliance (AML/KYC requirements)
- Security (audit trail for money)
- User experience (low friction entry)
- Data minimization (collect only when needed)

---

## 2. Identity Model Overview

### Two-Stage Identity Model

**Stage 1: Account Identity (Entry-Level)**
- Required to interact with boxes
- Minimal data collected
- No KYC or ID documents
- Purpose: Basic authentication and audit trail

**Stage 2: Payout Identity (Escalated)**
- Required to withdraw winnings
- Full KYC / AML checks
- Jurisdiction-dependent requirements
- Purpose: Regulatory compliance

**Key Principle:** Identity escalation happens only when necessary.

---

## 3. Sign-Up & Login (Entry-Level Identity)

### Required at Sign-Up
- **Email address** (verified)
- **Password** OR passwordless email link (magic link)
- **Display alias** (chosen by user, shown publicly on wins)

### Explicitly NOT Required at Sign-Up
- Legal name
- Address
- Date of birth
- Government ID documents
- Payment details (beyond contribution method)
- Phone number
- Social security / tax ID

### Authentication Rules
- User **must be logged in** before making any contribution
- Anonymous or guest play is **not permitted**
- Authentication persists across sessions (30-day default)
- Session management via secure tokens

**Rationale:**
- Financial transactions require attributable identity
- Audit trail for all money movement
- Prevents abuse and fraud
- Enables responsible gambling features

---

## 4. User Experience After Login

### Primary UX Principle
> **Logging in should never pull the user away from the game.**

### Behavior
- After login/signup, user is **returned directly to the home page**
- The **six active boxes** remain the primary focus
- No forced dashboard or onboarding flow
- No interstitials or "welcome" screens
- Game is immediately playable

### Logged-In Indicators
- **Avatar icon** (top-right corner)
  - Shows user's alias initial or chosen avatar
  - Click for quick menu
- **Hamburger menu** for optional account management
  - Accessible but not prominent
  - Contains settings, logout, help

### Design Philosophy
The game is the interface. Account management is secondary.

---

## 5. Account Management (Minimal)

Accessible via hamburger menu or avatar dropdown:

### Account Settings
- Change email / password
- Set or edit display alias
- Update avatar (optional)
- View basic account info
- Set responsible-play limits (optional)
- Delete account (with warnings)
- Log out

### What's NOT in Account Management
- No heavy dashboard
- No social features in V1
- No detailed statistics (beyond wins)
- No creator-specific features (deferred)

**Rationale:** Keep V1 focused on core game experience.

---

## 6. Box Creation & Management (Deferred)

**Important Note:**
- In V1, boxes are **system-managed** (the six core boxes)
- User-created boxes are explicitly **out of scope for PR0006**
- Creator dashboards for charities / organizations addressed in future project
- This document focuses solely on **player identity**

**If/when creator features are added:**
- Separate creator verification flow
- Additional KYC for charity/organization creators
- Analytics dashboard for created boxes
- But this is not V1.

---

## 7. Payout & KYC Escalation

### KYC Trigger
KYC (Know Your Customer) is required when a user:
1. **Wins a box** AND
2. **Attempts to withdraw funds**

**Not before.**

### At Payout, Collect:
- **Legal name** (full)
- **Date of birth**
- **Residential address**
- **Government-issued ID** (passport, driver's license, national ID)
- **Tax identification** (if required by jurisdiction)
- **Additional AML data** as required by Malta MGA or payment processor

### KYC Process Flow
```
User wins box
  ↓
Attempts withdrawal
  ↓
KYC check initiated
  ↓
User submits documents
  ↓
Verification (automated + manual review)
  ↓
Approval → Payout proceeds
OR
Rejection → User notified, can resubmit
```

### Rules
- **No payout occurs until KYC is successfully completed**
- KYC data is **never requested earlier** than necessary
- Users are **clearly informed** of this requirement:
  - During signup (in terms)
  - Before first contribution (acknowledgment)
  - Upon winning (before withdrawal)
- KYC verification typically completes within 24-48 hours

**Rationale:**
- Regulatory compliance (Malta MGA requirements)
- Anti-money laundering (AML)
- Fraud prevention
- Tax reporting obligations

---

## 8. Data Minimization Principles

### Core Principle
**Collect only what is required, when it is required.**

### Data Separation
Three distinct data silos:

1. **Account Data** (Entry-Level)
   - Email, password hash, alias
   - Minimal, always accessible to user

2. **Transaction Data** (Game Activity)
   - Contributions, wins, timestamps
   - Linked to account ID
   - Audit trail for compliance

3. **KYC Data** (Payout-Level)
   - Legal name, DOB, address, ID documents
   - Stored separately with enhanced security
   - Only collected when payout triggered
   - Encrypted at rest

### Retention Policy
- **Account data:** Retained while account active
- **Transaction data:** 6+ years (legal requirement)
- **KYC data:** As required by jurisdiction (typically 5-7 years post-transaction)
- **Deleted accounts:** Personal data purged, transaction records anonymized

---

## 9. Transparency & Disclosure

### During Signup
Users are informed:
- "You must complete identity verification to withdraw winnings"
- Plain language explanation
- Link to full terms

### Before First Contribution
- Brief reminder in contribution flow
- Acknowledgment checkbox (one-time)

### At Withdrawal
- Clear KYC requirements displayed
- Estimated verification time
- What documents are needed

**No surprise identity checks.**

---

## 10. Security & Compliance Notes

### Authentication Security
- **Bcrypt/Argon2** for password hashing
- **HTTPS-only** for all communication
- **CSRF protection** on all forms
- **Rate limiting** on login attempts
- **Session tokens** securely stored (httpOnly, secure, sameSite)

### Compliance Requirements
- Audit trail for all contributions
- Identity escalation aligns with Malta MGA standards
- AML/KYC procedures documented
- Data protection (GDPR compliant)
- Right to access, deletion, portability supported

---

## 11. Non-Goals (Explicit)

These are deliberately out of scope:

- No anonymous play
- No guest checkout
- No social login **dependency** (may add as option later)
- No mandatory KYC at signup
- No heavy dashboards in V1
- No user-created boxes in V1
- No social features (friends, chat, etc.)
- No gamification badges/levels linked to identity

---

## 12. Implementation Note (Claude Guidance)

When implementing:
- **Default to minimal data** collection
- Escalate identity requirements **only on payout**
- Do not invent additional profile fields
- Keep login UX **lightweight and non-blocking**
- Never request data "just in case" - wait for actual need

If a scenario arises not covered above:
- **Do not invent behavior**
- Pause and request clarification

This is authoritative for implementation.

---

## Original MVP Requirements (Reference)

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
