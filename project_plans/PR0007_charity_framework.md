<!--
Version: v1.00
Last Updated: 2026-01-16
Changelog:
- v1.00 (2026-01-16): Initial document creation

Version Control Rules:
- Major changes (X.00 → X+1.00): Strategic pivots, complete restructuring, scope changes
- Minor changes (X.YY → X.YY+0.01): Small edits, clarifications, task updates, notes
-->


# PR0007 – Charity & Cause Framework

**Status:** Not Started
**Priority:** Medium
**Dependencies:** PR0004 (payout logic), PR0006 (accounts)

---

## Objective

Allow box creators to designate charitable causes or organizations, adding social impact dimension to the platform.

---

## Framework Principles

1. **Creator-Defined** - Creator chooses cause/charity
2. **Open Interpretation** - Club fund, event fund, or registered charity
3. **Transparent Allocation** - Clear display of where money goes
4. **No Platform Endorsement** - We facilitate, not recommend
5. **Optional Feature** - Not required for box creation

---

## Charity Types

### Registered Charities
- UK Charity Commission registered
- Charity number verified
- Tax benefits (Gift Aid potential)

### Community Causes
- Local clubs
- Sports teams
- School funds
- Community projects

### Personal Causes
- Medical fundraising
- Event funding
- Project support

---

## Split Allocation Options

### Option 1: Single Beneficiary (Default)
- 100% to one recipient
- Simplest flow

### Option 2: Simple Split
- Primary recipient + charity
- Example: 80% to winner, 20% to charity

### Option 3: Multiple Beneficiaries (Future)
- Up to 3 recipients
- Custom percentages
- Must total 100%

---

## Charity Verification

### MVP Approach
- Free-text charity name
- Optional charity number (UK)
- No verification initially
- Rely on creator honesty

### Future Enhancement
- API integration with Charity Commission
- Auto-verify charity number
- Display charity details
- Badge for verified charities

---

## Tax Considerations

### Gift Aid (UK)
- Registered charities can claim 25% extra
- Requires contributor opt-in
- Legal complexity (phase 2+)

### Tax Receipts
- Charity issues receipts (not platform)
- Platform provides transaction details
- Charity handles tax obligations

---

## UI/UX

### Box Creation
```
[ ] This box supports a charity or cause

[Text input: Charity/cause name]
[Text input: Charity number (optional)]
[Slider: Allocation percentage]

Preview:
80% goes to [Recipient Name]
20% goes to [Charity Name]
```

### Box Display
```
📦 Box for [Cause Name]
Supporting: [Charity Name]
```

---

## Compliance & Legal

### Platform Liability
- Platform is payment facilitator only
- Charity verification is creator's responsibility
- Clear terms of service

### Charity Fraud Prevention
- Report suspicious boxes
- Manual review of high-value charity boxes
- Block known fraudulent entities

---

## Success Criteria

- [ ] Charity field added to box creation
- [ ] Split allocation working
- [ ] Charity displayed on box page
- [ ] Payout split implemented
- [ ] Fraud reporting mechanism

---

## Notes

*(Add charity partnership discussions, legal advice, user feedback)*
