# PR0002 – User Roles & Core Flow

**Status:** Not Started
**Priority:** High
**Dependencies:** PR0001 (legal framework will influence flow)

---

## Objective

Define how different users interact with the platform and map out the complete user journey from box creation to payout.

---

## User Roles

### 1. Box Creator
**Who:** Individual, club, society, business, or organization
**Goals:**
- Create a box with target value
- Share box link with potential participants
- Track progress toward target
- Define payout recipient (self, charity, group)

**Permissions:**
- Create boxes
- Configure box settings
- View detailed analytics
- Cancel box (before threshold?)
- Define payout allocation

### 2. Participant (Contributor)
**Who:** Anyone with the box link
**Goals:**
- Understand what the box is for
- Contribute to the box
- See box progress (aggregate only)
- Feel confidence in fairness

**Permissions:**
- View box details
- Make contributions
- View aggregate progress
- Share box link

### 3. Recipient
**Who:** Individual, charity, or organization receiving payout
**Goals:**
- Receive payout when box fills
- Verify legitimacy

**Permissions:**
- Receive payout notification
- Claim payout
- View box completion details

---

## Core User Flow

### Phase 1: Box Creation

```
Creator visits SmashMyBox.com
  ↓
[Optional] Sign up / Log in
  ↓
Click "Create Box"
  ↓
Configure box:
  - Target value (£10, £100, £1k, £10k)
  - Box name/description
  - [Optional] Charity/cause
  - [Optional] Custom message
  - Payout allocation (if split)
  ↓
Review & confirm
  ↓
Box created → unique URL generated
  ↓
Share link (email, social, QR code)
```

### Phase 2: Participation

```
Participant receives box link
  ↓
Opens box page
  ↓
Views box details:
  - Target value
  - Creation date
  - Age of box (visual wear)
  - [Optional] Cause/charity
  - Creator message
  ↓
Decides to contribute
  ↓
Clicks "Contribute"
  ↓
Enters contribution amount
  ↓
Payment flow (Stripe/PayPal)
  ↓
Contribution added to box
  ↓
[Optional] Share box link
```

### Phase 3: Box Fills

```
Box reaches target value
  ↓
Payout triggered automatically
  ↓
Notifications sent:
  - Creator notified
  - Recipient notified
  - [Optional] Contributors notified
  ↓
Box marked as "Complete"
  ↓
Box page shows completion:
  - Final total
  - Completion date
  - Payout details (where applicable)
```

---

## User Stories

### As a Box Creator:
- I want to create a box for my club's fundraiser
- I want to share a unique link with club members
- I want to see how close we are to our target
- I want to ensure the money goes to the right place

### As a Participant:
- I want to understand what the box is for before contributing
- I want to see the box is real and trustworthy
- I want to contribute easily without creating an account
- I want to see progress toward the goal

### As a Recipient:
- I want to be notified when the box fills
- I want to claim my payout securely
- I want confirmation of the transaction

---

## Key Questions

1. **Account Requirements:**
   - Do creators need accounts?
   - Do participants need accounts?
   - Email-only login vs social auth?

2. **Progress Visibility:**
   - Show exact amount collected?
   - Show percentage only?
   - Show number of contributions?
   - Show individual contribution amounts?

3. **Box Cancellation:**
   - Can creators cancel unfilled boxes?
   - What happens to existing contributions?
   - Refund policy?

4. **Contribution Limits:**
   - Minimum contribution amount?
   - Maximum contribution amount?
   - Per-person contribution limits?

5. **Payout Mechanics:**
   - Automatic payout or manual claim?
   - Payout timing (immediate / batch)?
   - Failed payout handling?

---

## Wireframe Notes

### Box Creation Screen
- Simple form with clear fields
- Visual preview of box appearance
- Estimated time to fill (based on target)

### Box Page (Public View)
- Prominent box visual with aging effect
- Target value clearly displayed
- Creation date stamp
- Contribute button
- Share options
- Trust signals (SSL, secure payment, terms)

### Contribution Flow
- Amount entry (with suggestions)
- Payment method selection
- Confirmation screen
- Success message with share prompt

### Box Completion View
- Celebratory visual
- Completion stats
- Thank you message
- Share achievement

---

## Technical Requirements

- Unique URL generation (short codes)
- Real-time progress updates (WebSocket or polling?)
- Payment integration (Stripe API)
- Email notification system
- Box state management (pending → active → filled → paid)

---

## Success Criteria

- [ ] All user roles clearly defined
- [ ] Complete user journey mapped
- [ ] Key decision points documented
- [ ] Wireframes created
- [ ] Technical requirements identified

---

## Notes

*(Add user research, feedback, and design decisions here)*
