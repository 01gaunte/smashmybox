# SmashMyBox.com – Product Roadmap
**Project Code:** PR0001 → PR0010
**Stage:** Pre-launch / Holding Page → MVP

---

## Concept Summary

SmashMyBox.com allows individuals, clubs, societies, or businesses to create a virtual "box" with a fixed target value (e.g. £10, £100, £1,000, £10,000).

Participants contribute small amounts into the box.
When the box reaches its target value, it **automatically pays out** to a predefined recipient.

Key characteristics:
- Fixed payout (deterministic outcome)
- No odds, no house edge variability
- Transparent progress
- Optional charity or cause selected by the box creator
- Social / sweepstakes-style participation

---

## PR0001 – Legal & Regulatory Framing

**Objective:**
Position SmashMyBox correctly from a compliance perspective.

**Tasks:**
- Define classification (sweepstakes / prize pool / deterministic payout)
- Confirm UK vs offshore positioning
- Identify payment processor constraints
- Draft initial risk and compliance notes
- Define clear user-facing disclaimers

**Deliverables:**
- Legal positioning note
- Compliance assumptions document

---

## PR0002 – User Roles & Core Flow

**Objective:**
Define how different users interact with the platform.

**Roles:**
- Box Creator (individual, club, business)
- Participant (contributor)
- Recipient (winner / charity / organisation)

**Flow:**
1. Create box
2. Set target value & creation date
3. (Optional) Select charity or cause
4. Share box link
5. Contributions accumulate
6. Box fills → payout triggers

**Deliverables:**
- User flow diagram
- Simple wireframes

---

## PR0003 – Visual Identity & Box Design

**Objective:**
Create a strong, playful visual metaphor.

**Features:**
- Parcel-style boxes
- Visible target value on exterior
- Creation date stamped
- "Ageing" effect over time (weathering, stamps, wear)
- No internal visibility of contributions

**Deliverables:**
- Box visual concepts
- Ageing states (Day 0 → Day N)

---

## PR0004 – Contribution & Payout Logic

**Objective:**
Define how money moves.

**Rules:**
- Contributions accumulate transparently
- Fixed payout when target reached
- Platform fee defined upfront
- Optional charity split defined by creator
- No rollover, no randomness

**Deliverables:**
- Payout logic spec
- Fee & split calculation notes

---

## PR0005 – Hosting & Infrastructure

**Objective:**
Keep the stack simple and scalable.

**Initial Stack:**
- Static holding page (HTML/CSS)
- Deployed via Porkbun / Vercel
- No backend at holding stage

**Later:**
- API for box state
- Secure payment handling
- Event-driven payout triggers

**Deliverables:**
- Hosting decision log
- Deployment checklist

---

## PR0006 – Accounts & Identity (MVP+)

**Objective:**
Introduce identity only when needed.

**Features:**
- Optional account creation
- Email-only login
- Box creator dashboards
- Minimal personal data

**Deliverables:**
- Auth requirements doc
- Data minimisation notes

---

## PR0007 – Charity & Cause Framework

**Objective:**
Allow creator-defined social impact.

**Features:**
- Box creator selects cause or charity
- Open interpretation (club fund, event fund, registered charity)
- Transparent allocation shown on box page
- No platform endorsement implied

**Deliverables:**
- Charity/cause schema
- Disclaimer copy

---

## PR0008 – UX Testing & Trust Signals

**Objective:**
Ensure users understand and trust the mechanism.

**Focus Areas:**
- Clarity of "when it pays out"
- Visibility of progress
- Confidence in fairness
- Emotional payoff of completion

**Deliverables:**
- UX test notes
- Iteration backlog

---

## PR0009 – Soft Launch & Distribution

**Objective:**
Get real users with minimal risk.

**Channels:**
- Clubs & societies
- Offices & teams
- Group chats & social links

**Assets:**
- Shareable box pages
- Simple explainer copy

**Deliverables:**
- Launch checklist
- First-user feedback log

---

## PR0010 – Monitor, Iterate, Scale

**Objective:**
Learn fast and improve continuously.

**Metrics:**
- Time-to-fill
- Average contribution size
- Drop-off points
- Box completion rate

**Next Steps:**
- Box templates
- Recurring boxes
- Event-based boxes
- API integrations

**Deliverables:**
- Metrics dashboard spec
- Iteration roadmap

---

## Status

**Current Focus:**
- Holding page live
- Concept clarity
- Visual metaphor validation

**Next Action:**
PR0001 → PR0003
