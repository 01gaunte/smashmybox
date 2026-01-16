<!--
Version: v1.00
Last Updated: 2026-01-16
Changelog:
- v1.00 (2026-01-16): Initial document creation

Version Control Rules:
- Major changes (X.00 → X+1.00): Strategic pivots, complete restructuring, scope changes
- Minor changes (X.YY → X.YY+0.01): Small edits, clarifications, task updates, notes
-->


# PR0004 – Contribution & Payout Logic

**Status:** Not Started
**Priority:** Critical
**Dependencies:** PR0001 (legal framework), PR0002 (user flow)

---

## Objective

Define how money moves through the system from contribution to payout, including fee structure and optional splits.

---

## Contribution Rules

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
