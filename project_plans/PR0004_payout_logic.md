<!--
Version: v2.00
Last Updated: 2026-01-16
Changelog:
- v2.00 (2026-01-16): Major addition - Authoritative payout mechanics with overshoot handling, fee allocation, and invariants
- v1.00 (2026-01-16): Initial document creation with basic fee structure

Version Control Rules:
- Major changes (X.00 → X+1.00): Strategic pivots, complete restructuring, scope changes
- Minor changes (X.YY → X.YY+0.01): Small edits, clarifications, task updates, notes
-->


# PR0004 – Contribution & Payout Logic

**Status:** Authoritative Specification Complete
**Priority:** Critical
**Dependencies:** PR0001 (legal framework), PR0002 (user flow), PR0003 (game mechanics)

---

## Objective

Define how money moves through the system from contribution to payout, including fee structure, overshoot handling, and payout guarantees. This document is **authoritative** for implementation.

---

## Authoritative Payout Mechanics

### 1. Face Value vs Target Fill Value

**Critical Distinction:**
- **Face Value** = Net amount winner receives (e.g. £10)
- **Target Fill Value** = Gross amount needed to fund the prize (e.g. ~£13)

The Target Fill Value includes:
- Face value (prize)
- Platform fee (~1%)
- Charity allocation (~4%, creator-defined)
- Payment processing fees
- Taxes / duties (jurisdiction-dependent)

**Key Rule:** Winner always receives exactly the face value. No deductions.

---

### 2. Contribution Processing

All contributions are:
- Processed **server-side, sequentially**
- Ordered by confirmed timestamp
- Applied to a hidden running total (not visible to users)

---

### 3. Win Condition

A box "fills" and pays out when:
```
Running Total ≥ Target Fill Value
```

**At this moment:**
- The box immediately pays out the **face value** to the winning contributor
- The box enters the **SMASHED** state

---

### 4. Overshoot Handling (Critical)

If a contribution causes the total to exceed the target fill value:

- Only the amount required to reach the target fill value is applied
- **Any excess amount is classified as overshoot**
- **Overshoot goes directly to the house**

#### Example
- Target Fill Value: £13
- Current Total: £9
- User contributes: £5

**Result:**
- £4 applied to complete the box
- £1 overshoot → house
- Winner receives £10

**Important:** Overshoot is **not** shared with charity and **not** part of the prize.

---

### 5. Fee & Charity Allocation

From the **gross fill buffer** (the ~30% above face value):

- **Platform fee** (default: ~1%)
- **Charity allocation** (default: ~4%, creator-defined)
- **Taxes / duties** (jurisdiction-dependent)

These are calculated deterministically.

There is:
- No randomness
- No variable odds
- No rollover of funds between boxes

---

### 6. Transparency & Disclosure

- The main game UI focuses on the experience, not calculations
- A persistent **"How it works" / Terms** link explains:
  - Net prize guarantee
  - Gross fill buffer
  - Overshoot handling
  - Platform and charity allocations

**Before a user's first contribution**, they must:
- Acknowledge a short, plain-language explanation of the above

---

### 7. Invariants (Must Always Be True)

These rules must **never** be violated:

1. Winner always receives exactly the face value
2. Fees are never deducted from the prize
3. Overshoot always benefits the house
4. Contributions are deterministic and sequential
5. No hidden randomness exists anywhere in payout logic
6. Target Fill Value > Face Value (always includes buffer)
7. Running total is never visible to users
8. Only one winner per box

---

### 8. Non-Goals (Explicit)

- No visible pot size
- No visible progress indicators
- No partial payouts
- No shared winnings
- No carry-over between boxes
- No refunds for overshoot
- No winner selection randomness

---

### 9. Implementation Note (Claude Guidance)

If any situation arises not explicitly covered above:
- **Do not invent behaviour**
- Pause and request clarification

This logic is foundational and must be treated as authoritative.

---

## Original Contribution Rules (Context)

### Basic Mechanics
- Contributions accumulate toward fixed target
- No maximum on individual contributions
- Minimum contribution: £1 (or configurable)
- All contributions final (no refunds once accepted)
- Box fills when target reached (not exceeded)

### Over-contribution Handling
**What happens if total would exceed target?**

**Option A: Exact Fill Only**
- System calculates remaining amount needed
- Contributors can only fill exact remainder
- Example: Target £100, current £95, max contribution £5

**Option B: Accept Overfill**
- Accept contributions that exceed target
- Excess either:
  - Refunded to last contributor
  - Goes to platform/charity
  - Carries to next box (if recurring)

**Recommendation:** Option A (exact fill) for clarity and determinism

---

## Fee Structure

### Platform Fee
- Percentage of target value
- Deducted from payout OR added to contribution
- Options:
  - 5% platform fee
  - 3% + payment processing (pass-through)
  - Flat fee per box

### Payment Processing Fees
- Stripe: ~2.9% + £0.20 per transaction
- PayPal: ~2.9% + £0.30 per transaction
- Who pays? Platform or contributors?

### Example Calculation
```
Target: £100
Platform fee: 5%
Payment fee: 2.9% + £0.20 (per contribution)

Scenario: 10 contributions of £10 each
- Gross collected: £100
- Payment fees: (£0.29 + £0.20) × 10 = £4.90
- Platform fee: £100 × 0.05 = £5.00
- Net payout: £100 - £4.90 - £5.00 = £90.10

OR

- Contributor pays fees (loaded onto contribution)
- Each £10 contribution = £10.59 charged
- Target adjusts to £105.90 to reach £100 net
```

---

## Payout Allocation

### Creator-Defined Split
Box creator can specify:
- 100% to recipient (default)
- Split between recipient and charity
- Split between multiple recipients

### Examples
- 80% to club fund, 20% to local charity
- 100% to fundraising cause
- 50/50 split between two beneficiaries

### Constraints
- Must equal 100%
- Maximum 3 recipients (keep it simple)
- Charity must be verifiable (later phase)

---

## Payout Triggers

### Automatic Trigger
```
When: box.totalContributions >= box.targetValue
Then: initiate payout sequence
```

### Payout Sequence
1. Box state → "FILLED"
2. Calculate final amounts (fees, splits)
3. Generate payout transactions
4. Send to payment processor
5. Track payout status
6. Send notifications
7. Box state → "COMPLETED"

### Failed Payout Handling
- Retry logic (3 attempts)
- Hold funds in escrow
- Manual review after failures
- Notification to creator and recipient

---

## Escrow & Holding

### During Filling Phase
- Funds held by payment processor (Stripe)
- Not transferred until target reached
- Funds secured and isolated

### Legal Considerations
- Platform never "holds" funds directly
- Payment processor is merchant of record
- Reduces regulatory burden

---

## Edge Cases

### 1. Box Never Fills
- Time limit on boxes? (30, 60, 90 days)
- Auto-refund if expired?
- Creator can cancel and refund?

### 2. Recipient Unreachable
- Hold payout for claim period (30 days)
- Fallback to creator
- Fallback to charity
- Last resort: platform holds indefinitely

### 3. Disputed Contributions
- Chargeback handling
- Fraud detection
- Box cancellation if fraud detected

### 4. Box Deleted Before Filling
- Refund all contributions
- Notify all contributors
- Platform absorbs processing fees

---

## Transparency Requirements

### What Contributors See
- Target value
- Current total (optional - design decision)
- Fee structure
- Where money goes

### What Creators See
- Real-time contributions
- Contributor count (not identities)
- Expected payout amount
- Fee breakdown

---

## Technical Requirements

- Payment processor integration (Stripe Connect)
- Webhook handling for payment events
- Payout calculation engine
- Fee configuration system
- Transaction ledger
- Audit trail

---

## Regulatory Compliance

- Clear terms on non-refundable contributions
- Transparent fee disclosure
- Anti-money laundering checks (if required)
- Transaction limits (if required)
- Record keeping (6+ years)

---

## Success Criteria

- [ ] Fee structure defined and justified
- [ ] Payout calculation logic documented
- [ ] Edge cases handled
- [ ] Payment flow mapped
- [ ] Compliance requirements met

---

## Notes

*(Add financial modeling, payment processor research, and calculations here)*
