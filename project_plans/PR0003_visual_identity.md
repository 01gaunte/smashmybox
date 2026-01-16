<!--
Version: v2.00
Last Updated: 2026-01-16
Changelog:
- v2.00 (2026-01-16): Major addition - V1 Game Mechanics Specification with complete interaction rules
- v1.00 (2026-01-16): Initial document creation with visual identity and design system

Version Control Rules:
- Major changes (X.00 → X+1.00): Strategic pivots, complete restructuring, scope changes
- Minor changes (X.YY → X.YY+0.01): Small edits, clarifications, task updates, notes
-->


# PR0003 – Visual Identity & Box Design

**Status:** In Progress (holding page completed, V1 mechanics defined)
**Priority:** High
**Dependencies:** PR0002 (user flow influences visual requirements)

---

## Objective

Create a strong, playful visual metaphor that makes the platform instantly recognizable and builds trust through familiar parcel/package imagery. Define complete V1 game mechanics for implementation.

---

## V1 Game Mechanics Specification

**Status:** Claude-Code Ready
**Scope:** Core gameplay, UX rules, edge cases (no licensing or payments implementation)

### 0. High-Level Concept

SmashMyBox is a **deterministic, single-winner, shared prize box** game.

- Each box has a **face value** (e.g. £10, £100)
- Users deposit money ("coins") into a **hidden prize meter**
- The box **pays out instantly** when the prize meter reaches the face value
- Users never see progress; only the final smash event is revealed
- Any excess contribution beyond the face value is **overshoot → house**
- Platform also takes a small fixed edge; charity allocation may apply

### 1. Boxes & Concurrency

- Exactly **6 boxes** are visible and playable at all times
- Each box has:
  - Face value
  - Associated cause/charity (name + logo)
  - Cosmetic skin (visual/audio only)
- All boxes share **identical mechanics**; cosmetics never affect outcomes

### 2. Global State Model

- Each box has **one authoritative global state**, shared by all users
- State is stored server-side and mutated sequentially
- No per-user or per-session illusion states

**Box States:**
1. `ACTIVE` - Currently accepting deposits
2. `SMASHED` - Prize claimed, visible to all
3. `ARCHIVED` - Moved to history
4. `REPLACED` - New box in slot

### 3. Deposits ("Coins")

- Users may deposit **any monetary amount**
- UX recommendation (non-binding):
  *"Probably don't put in more than 100% of the box value 😉"*
- Deposits are represented visually as "coins" regardless of amount

#### Processing Rules
- Deposits are processed **server-side, sequentially**, by confirmed timestamp
- A deposit:
  - Adds value to the hidden prize meter
  - If it causes the prize meter to reach or exceed the face value:
    - Only the required amount fills the prize
    - Any excess becomes **overshoot → house**
    - The depositor **wins the box**

### 4. Feedback & Sensory Design

#### Visual / Audio
- **Binary feedback only**:
  - No visible progress
  - No "hot/cold", no bars, no numbers
- **Deposit:**
  - Subtle animation
  - Muted, short sound
- **Settling:**
  - Silence
- **Smash:**
  - Loud, unmistakable sound
  - Strong visual break
  - Strong haptic feedback

#### Haptics
- Used **only**:
  - On coin insertion (subtle)
  - On smash (strong)
- Never used to simulate progress

### 5. Interaction Friction

- After each deposit, the box enters a **short "settling" state**
  - Deposits disabled during animation (1–3 seconds)
  - Prevents spam and increases tension

### 6. Winning & Visibility

- Win events are **fully public**:
  - Box visibly smashes for everyone
  - Face value displayed
  - Winner shown by alias (real name optional)
- Winner receives private confirmation and receipt

### 7. Post-Win Lifecycle

- After smashing:
  - Box remains visibly smashed for a duration
  - Duration scales inversely with site/box activity
- Then:
  - Box is archived
  - A new box replaces it in the same slot

### 8. History & Transparency

#### Public
- A lightweight "Recent Smashes" list is visible to all:
  - Alias
  - Amount
  - Timestamp
- No contribution data
- No analytics

#### Contribution-Gated
- Users who contributed to a box unlock richer history for that box:
  - Winner alias
  - Timestamp
  - Final payout
- Internal fill mechanics are **never** revealed

### 9. Authentication

- **Login required before any deposit**
- Users choose an alias during onboarding
- All actions are attributable to an authenticated account

### 10. Fairness & Race Conditions

- If multiple deposits arrive close together:
  - The **first server-confirmed deposit** that completes the prize wins
  - All others are processed against the updated state
- No randomness is introduced

### 11. Error Handling

- All deposit attempts must resolve to:
  - Explicit success, or
  - Explicit failure
- No ambiguous states
- Clear retry paths provided

### 12. Responsible-Play Nudges

- Included in V1 as **light, non-blocking nudges**:
  - Session-duration reminders
  - Spend reminders
  - Optional self-set limits
- No forced lockouts by default
- Tone is calm, respectful, non-judgmental

### 13. Tone & Copy

- Default tone: **dramatic, restrained, suspenseful**
- Silence is used deliberately
- Occasional playful copy allowed sparingly
- Never informational or jokey during core tension moments

### 14. Explicit Disclosures

- House edge and overshoot mechanics are:
  - Clearly explained before first deposit
  - Always accessible via "How it works"
  - Never hidden
- Language is plain and friendly, not legalese

### 15. Non-Goals (Explicitly Out of Scope for V1)

- No visible odds
- No progress indicators
- No chat/comments
- No mechanical box differences
- No forced social features
- No anonymous play

### 16. Implementation Note for Claude

**Do not invent mechanics.**
If a behavior is not specified above, ask for clarification rather than assume.

---

## Core Visual Metaphor

### The Box as Parcel
- Physical package aesthetic
- Brown cardboard/kraft paper texture
- Visible wear and aging
- Stamps, postmarks, and labels
- Packing tape details
- Real-world shipping parallels

### Why This Works
- Universal recognition (everyone knows parcels)
- Built-in anticipation (packages = something coming)
- Natural aging metaphor (older packages look more worn)
- Tangible feel in digital space
- Trust through familiarity

---

## Aging System

### Mechanism
Boxes visually "age" based on days since creation:
- **Day 0-7:** Fresh, clean, minimal wear
- **Day 8-30:** Light aging, visible postmarks
- **Day 31-90:** Moderate wear, multiple stamps
- **Day 91+:** Heavy wear, faded colors, distressed

### Visual Properties by Age
```css
--ageDays: [calculated from creation date]
--ageDarken: calc(min(var(--ageDays), 240) / 240)

Effects:
- Saturation: decreases over time
- Brightness: decreases slightly
- Contrast: increases slightly
- Stamp opacity: increases
- Texture overlay: becomes more prominent
```

### Implementation
- CSS custom properties
- Client-side calculation
- No server state needed
- Real-time updates daily

---

## Box Anatomy

### Essential Elements

**1. Face Value (Primary)**
- Large, bold typography
- High contrast
- Embossed/printed effect
- Example: "£1,000"

**2. Creation Date Stamp**
- Fixed format: YYYY-MM-DD
- Monospace font
- "Official" appearance
- Position: Top right

**3. Age Label**
- "X days old"
- Updates automatically
- Subtle prominence

**4. Postmark**
- Circular stamp overlay
- Increases opacity with age
- Positioned bottom left
- Blurred/smudged effect

**5. Delivery Stamp**
- Rectangular stamp badge
- Text variants:
  - "SMASH MAIL"
  - "AIR POST"
  - "PRIORITY"
  - "SIGNED FOR"
- Position: Bottom right

**6. Packing Tape**
- Vertical center strip
- Semi-transparent overlay
- Subtle shimmer effect

**7. Surface Texture**
- Cardboard grain
- Subtle noise overlay
- Directional lighting
- Shadow depth

---

## Color Palette

### Primary (Parcel Tones)
- `--paper: #caa77a` (base cardboard)
- `--paper2: #b99263` (shadow/depth)
- `--edge: rgba(0,0,0,.25)` (borders)

### Background (Dark Mode)
- `--bg: #0b0f14` (deep blue-black)
- Gradient overlays with accent colors
- Radial gradients for depth

### Accents
- Blue: `rgba(89,134,255,.22)` (top left)
- Pink: `rgba(255,111,145,.18)` (top right)
- Green: `rgba(93,255,203,.10)` (bottom)

### Text
- `--ink: #e9edf3` (light text on dark)
- `--muted: #aab3c2` (secondary text)
- On-box text: `rgba(12,12,12,.85)` (dark on kraft)

---

## Typography

### Display (Box Values)
- Weight: 800 (extra bold)
- Size: 22px (cards), scalable
- Letter-spacing: +0.2px
- Shadow: `0 1px 0 rgba(255,255,255,.25)` (embossed)

### Stamps & Labels
- Font: Monospace
- Size: 10-12px
- Transform: Slight rotation
- Uppercase for stamps

### Body Copy
- Font: System UI sans-serif stack
- Sizes: 12px (small), 15px (body), 34px (titles)
- Line height: 1.35-1.5

---

## Box States

### Active Box
- Full color saturation
- Clean appearance
- Subtle animations on hover
- Interactive feel

### Filling Box
- Progress indicator (optional)
- Pulsing effect on contribute button
- No visible fill level inside box

### Complete Box
- "Opened" visual state?
- Completion badge
- Celebration confetti effect?
- Timestamp of completion

### Cancelled Box
- Desaturated
- "CANCELLED" stamp overlay
- Reduced opacity
- No interactions

---

## Responsive Behavior

### Desktop (1080px+)
- 2-column grid for box gallery
- Larger box cards
- Hover effects

### Tablet (900px - 1080px)
- 2-column grid (narrower)
- Maintain readability

### Mobile (< 900px)
- Single column
- Full-width boxes
- Simplified stamps
- Touch-optimized buttons

---

## Animation & Interaction

### Micro-interactions
- Button press: `translateY(1px)`
- Hover: Background brightness shift
- Card hover: Subtle lift/shadow
- Contribute: Ripple effect

### Loading States
- Box appears with fade-in
- Stamps appear sequentially
- Age calculation smooth transition

### Transitions
- Color shifts: 200ms ease
- Transform: 80ms ease
- Opacity: 150ms ease

---

## Brand Assets

### Logo
- Abstract box icon
- Diagonal stripe pattern
- Glassmorphic card
- 42×42px (holding page)
- Scalable vector version needed

### Favicon
- Simplified box icon
- High contrast
- 32×32px, 16×16px sizes

### Social Cards (Future)
- Box visual with value
- Age indicator
- Platform branding
- 1200×630px (Open Graph)

---

## Design System Components

### Card Component
```
.card {
  border-radius: 18px
  border: 1px solid rgba(255,255,255,.12)
  background: gradient (top to bottom)
  box-shadow: deep, diffused
  backdrop-filter: blur(10px) [where supported]
}
```

### Button Component
```
.btn {
  padding: 12px 14px
  border-radius: 14px
  background: gradient + glassmorphic
  transition: fast on press
}
```

### Input Component
```
.input {
  flex container
  background: rgba(0,0,0,.15)
  border: subtle white
  backdrop-filter: blur
}
```

---

## Implementation Notes

### Current Status (Holding Page)
- ✅ Dark background with gradient overlays
- ✅ Parcel grid with 4 example boxes
- ✅ Aging system working (CSS variables)
- ✅ Stamps and postmarks
- ✅ Responsive layout
- ✅ Grain texture overlay

### Next Steps
- [ ] Finalize logo design
- [ ] Create box state variations
- [ ] Design contribution flow screens
- [ ] Build component library
- [ ] Create brand guidelines doc

---

## Success Criteria

- [ ] Box metaphor immediately recognizable
- [ ] Aging effect clearly visible over time
- [ ] Visual hierarchy guides user attention
- [ ] Trust signals present and clear
- [ ] Responsive across all devices
- [ ] Accessible (WCAG AA minimum)

---

## References & Inspiration

- Physical parcel tracking aesthetics
- Vintage shipping labels
- Brown kraft paper packaging
- Postal stamp design
- Minimalist glassmorphism
- Dark mode UI best practices

---

## Notes

*(Add design iterations, user feedback, and visual experiments here)*
