<!--
Version: v1.00
Last Updated: 2026-01-16
Changelog:
- v1.00 (2026-01-16): Initial document creation

Version Control Rules:
- Major changes (X.00 → X+1.00): Strategic pivots, complete restructuring, scope changes
- Minor changes (X.YY → X.YY+0.01): Small edits, clarifications, task updates, notes
-->


# PR0003 – Visual Identity & Box Design

**Status:** In Progress (holding page completed)
**Priority:** High
**Dependencies:** PR0002 (user flow influences visual requirements)

---

## Objective

Create a strong, playful visual metaphor that makes the platform instantly recognizable and builds trust through familiar parcel/package imagery.

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
