# Portfolio Design & Implementation Plan
## Milosz Misiek - Software Engineer & Doctoral Researcher

**Project:** Personal Portfolio Enhancement  
**Date:** March 24, 2026  
**Status:** Implementation Phase  
**Tech Stack:** Astro + React + Tailwind CSS + Framer Motion

---

## Executive Summary

This document outlines the complete design system and implementation strategy for enhancing the Milosz Misiek personal portfolio. The portfolio showcases a unique dual profile: a senior full-stack engineer at Elastic Email working on AI-powered communication products, and a doctoral candidate (Year 2/4) conducting research in AI security (multi-layer phishing detection).

### Key Principles
- **Minimalist & Dark-First:** Maintains existing aesthetic with monospace elements and subtle borders
- **Professional & Technical:** Reflects both engineering expertise and academic rigor
- **Responsive & Accessible:** Mobile-first design following WCAG AA standards
- **Performance-Optimized:** Smooth animations, lazy loading, minimal bundle impact
- **Data-Driven:** Structured JSON data, TypeScript types, easy to maintain

---

## Page Architecture

### Current Structure
```
Hero Section (Typewriter animation + Status card)
    ↓
Selected Work Section (3 project cards)
    ↓
Footer (Copyright + Social links)
```

### Enhanced Structure
```
Navigation/Header (Existing)
    ↓
Hero Section (Existing - unchanged)
    ↓
Experience Timeline (NEW)
    Vertical timeline: Elastic Email roles + PhD status
    ↓
Publications & Research (NEW)
    Grid of 2-3 research papers with metadata
    ↓
Tech Stack Showcase (NEW)
    Collapsible categories: Frontend, Backend, AI/ML, Database, Tools
    ↓
Featured Products (NEW)
    Company products: Chat Widget, Communication Platform
    ↓
Footer (Existing - unchanged)
```

---

## Design System

### Color Palette

**Dark Mode (Primary)**
```
Background:        #050505 (near-black)
Foreground:        #ffffff (pure white)
Muted:             #888888 (medium gray)
Border:            #1f1f1f (dark gray)
Hover Background:  rgba(255,255,255,0.05)
Hover Border:      rgba(255,255,255,0.1)
Success:           #10b981 (emerald green)
```

**Light Mode (Future - CSS Variables Ready)**
```
Background:        #fafaf9 (off-white)
Foreground:        #1f2937 (dark gray)
Muted:             #6b7280 (medium gray)
Border:            #e5e7eb (light gray)
Hover Background:  rgba(0,0,0,0.03)
Success:           #047857 (emerald dark)
```

### Typography

**Font Stack:** Inter (sans-serif) + JetBrains Mono (monospace)

**Heading Styles:**
- Section Labels: font-mono, text-xs, uppercase, tracking-widest, text-muted
- Entry Titles: font-medium, text-lg/xl/2xl, text-foreground
- Card Titles: font-medium, text-lg/xl, text-foreground

**Body Styles:**
- Default: text-sm/base, text-muted, leading-relaxed
- Secondary: font-mono, text-xs, tracking-widest, text-muted

### Spacing System

```
Section Margins:   mb-32 (between major sections)
Subsection:        mb-12, mb-8 (between items)
Card Gap:          gap-6 (1.5rem between cards)
Item Gap:          gap-4 (1rem between items)
Padding:           px-6 (mobile), md:px-8, lg:px-12
                   py-8 (section content)
```

### Border & Radius

- **Borders:** 1px solid, using `border-border` color
- **Border Radius:** rounded-lg (0.5rem) for cards, rounded-md (0.375rem) for items
- **Hover Borders:** Slight opacity increase on hover (border-border/80)

### Shadows & Depth

- **Cards:** Subtle borders only (no heavy shadows)
- **Hover:** Optional shadow-md on elevation (lifted appearance)
- **No Drop Shadows:** Keep design flat and minimal

---

## Section Specifications

### 1. Experience Timeline

**Layout:** Vertical timeline with left-side connector dot and line

**Components:**
- Section header with label "[ EXPERIENCE ]"
- Timeline entries (stacked vertically)
- Left connector: 1px line + 8px hollow dot
- Entry content: period, role, company, description, highlights, technologies

**Responsive:**
```
Mobile:    ml-4 (left margin)
Tablet:    md:ml-8
Desktop:   lg:ml-12
```

**Styling:**
```
Timeline dot:      border-border, hollow circle, 8px diameter
Timeline line:     1px border-border, left side
Entry spacing:     space-y-12 (3rem vertical)
Role title:        text-lg md:text-xl, font-medium
Description:       text-sm, text-muted, leading-relaxed
Technologies:      font-mono, text-xs, inline with separators
Highlights:        Bullet list, text-sm, text-muted
```

**Animation (Subtle):**
```
Entry Animation:
  - Trigger: Scroll into view (margin: -100px)
  - Initial: opacity: 0, x: -20
  - Final: opacity: 1, x: 0
  - Duration: 0.8s
  - Easing: cubic-bezier(0.16, 1, 0.3, 1)
  - Stagger: 0.1s between items

Hover State:
  - Dot: border-border → border-foreground
  - Text: text-muted → text-foreground
  - Transition: 300ms smooth
  - No layout shift
```

**Mock Data (3 entries):**
1. Senior Full Stack Engineer, Elastic Email (2024-Present)
2. Full Stack Engineer, Previous Company (2023-2024)
3. Doctoral Candidate, University (2023-Present)

---

### 2. Publications & Research

**Layout:** Responsive grid (1 column mobile → 2 columns tablet → 3 columns desktop)

**Components:**
- Section header "[ PUBLICATIONS ]"
- Publication cards (bordered containers)
- Status badge (Published/Under Review)
- Title, authors, topics, excerpt, meta, CTA button

**Responsive:**
```
Mobile:    grid-cols-1, px-6, full-width cards
Tablet:    md:grid-cols-2, md:px-8
Desktop:   lg:grid-cols-3 (optional), lg:px-12
```

**Styling:**
```
Card Border:       1px solid border-border
Card Padding:      p-6
Card Spacing:      gap-6 between cards
Card Radius:       rounded-lg

Status Badge:
  Published:       text-emerald-500, bg-emerald-500/10
  Under Review:    text-amber-500, bg-amber-500/10
  Font:            font-mono, text-xs, uppercase

Title:             font-medium, text-lg md:text-xl, text-foreground
Authors:           font-italic, text-sm, text-muted
Topics:            font-mono, text-xs, inline tags with #
Excerpt:           text-sm, text-muted, line-clamp-3
Meta:              font-mono, text-xs, text-muted

CTA Button:
  Style:           Outlined, 1px border-border
  Padding:         px-4 py-2
  Font:            font-mono, text-xs, uppercase
  Hover:           bg-white/5, border-border/80
  Transition:      300ms
```

**Animation (Subtle):**
```
Card Entrance:
  - Trigger: Scroll into view (margin: -50px)
  - Initial: opacity: 0, y: 20
  - Final: opacity: 1, y: 0
  - Duration: 0.7s
  - Easing: cubic-bezier(0.16, 1, 0.3, 1)

Card Hover:
  - Transform: translateY(-4px)
  - Border: border-border/80
  - Shadow: shadow-md (optional)
  - Duration: 300ms
  - No layout shift
```

**Mock Data (3 papers):**
1. "Multi-Layer Phishing Detection System" - Published 2024
2. "Vision-Based Phishing Detection in Email" - Published 2023
3. "LLM-Based Security Orchestration Framework" - Under Review 2024

---

### 3. Tech Stack Showcase

**Layout:** Collapsible categories with nested tech items grid

**Components:**
- Section header "[ TECH STACK ]"
- Category containers (expandable)
- Tech item cards (grid within each category)
- Proficiency levels (1-5 stars)
- Years of experience badge

**Responsive:**
```
Mobile:    grid-cols-1 per category, categories collapsible by default
Tablet:    md:grid-cols-2 per category, all expanded
Desktop:   lg:grid-cols-3 per category, ample spacing
```

**Styling:**
```
Category Header:
  Font:            font-mono, text-xs, uppercase, tracking-widest
  Color:           text-muted
  Display:         flex justify-between items-center
  Border:          border-b border-border
  Padding:         py-4
  Proficiency:     text-xs, text-muted, inline badge

Tech Item Card:
  Border:          1px solid border-border/50
  Border-radius:   rounded-md
  Padding:         p-4
  Background:      transparent, bg-white/[0.02] on hover
  Transition:      300ms

Tech Item Content:
  Name:            font-medium, text-base, text-foreground
  Level:           5-star display (★★★★★)
  Stars:           text-foreground for filled, text-muted/50 for empty
  Years:           font-mono, text-xs, text-muted
  Description:     text-sm, text-muted/70, leading-relaxed

Hover State:
  - Background: bg-white/5
  - Border: border-border/80
  - Text: text-muted → text-foreground
  - Duration: 300ms
```

**Animation (Subtle):**
```
Category Expand/Collapse:
  - Initial: height 0, opacity 0
  - Final: height auto, opacity 1
  - Duration: 0.4s
  - Easing: cubic-bezier(0.4, 0, 0.2, 1)

Item Entrance:
  - Initial: opacity 0, x -10
  - Final: opacity 1, x 0
  - Duration: 0.4s
  - Stagger: i * 0.05s
```

**Mock Data (5 categories):**
1. Frontend Frameworks: React (5★), Next.js (4★), Astro (4★)
2. Backend & API: Node.js/Express (5★), GraphQL (4★)
3. AI/ML: Python (4★), LLaMA Index (3★), OpenAI API (4★)
4. Database: MongoDB (5★), PostgreSQL (4★)
5. Tools: TypeScript, Git, Docker, npm

---

### 4. Featured Products

**Layout:** Responsive grid with image + content layout (3 columns desktop)

**Components:**
- Section header "[ FEATURED PRODUCTS ]"
- Product cards (image + metadata)
- Product images (4:3 aspect ratio)
- Role, description, tech tags, CTAs

**Responsive:**
```
Mobile:    grid-cols-1, px-6, h-48 images
Tablet:    md:grid-cols-2, md:px-8, md:h-64 images
Desktop:   lg:grid-cols-3, lg:px-12, lg:h-56 images
```

**Styling:**
```
Card Container:
  Border:          1px solid border-border
  Border-radius:   rounded-lg
  Padding:         p-0 (image extends)
  Overflow:        overflow-hidden

Image:
  Aspect Ratio:    4:3 (w-full, object-cover)
  Height:          h-48 md:h-64 lg:h-56
  Background:      bg-background/50
  Hover:           scale-105
  Transition:      0.5s cubic-bezier(0.4, 0, 0.2, 1)

Content:
  Padding:         p-6
  Border-top:      1px border-border/50
  Background:      bg-background/30

Title:             font-medium, text-lg md:text-xl, text-foreground
Role:              font-italic, text-sm, text-muted
Description:       text-sm, text-muted, line-clamp-3
Tech Tags:         font-mono, text-xs, text-muted, inline
                   Separated by " · "

Buttons:
  Style:           Outlined, 1px border-border
  Padding:         px-4 py-2
  Font:            font-mono, text-xs, uppercase
  Spacing:         flex gap-3
  Hover:           bg-white/5, border-border/80
  Transition:      300ms
```

**Animation (Subtle):**
```
Image Hover:
  - Scale: 1.05 (5% zoom)
  - Duration: 0.5s
  - Easing: cubic-bezier(0.4, 0, 0.2, 1)

Card Entrance:
  - Initial: opacity 0, y 20
  - Final: opacity 1, y 0
  - Duration: 0.7s
  - Easing: cubic-bezier(0.16, 1, 0.3, 1)
```

**Mock Data (Company Products Only - 2 featured):**
1. Live Chat Widget & AI Agent
   - Role: Lead Full Stack Engineer
   - Tech: React, TypeScript, WebSocket, GraphQL, OpenAI
   
2. Communication Platform (Team Chat + Email)
   - Role: Full Stack Engineer
   - Tech: Next.js, Express, MongoDB, GraphQL

---

## Component Architecture

### File Structure

```
src/
├── components/
│   ├── FadeIn.tsx (existing)
│   ├── Typewriter.tsx (existing)
│   ├── sections/
│   │   ├── ExperienceTimeline.astro
│   │   ├── PublicationsSection.astro
│   │   ├── TechStackSection.astro
│   │   └── FeaturedProductsSection.astro
│   ├── timeline/
│   │   ├── TimelineEntry.astro
│   │   └── TimelineAnimator.tsx
│   ├── publications/
│   │   ├── PublicationCard.astro
│   │   └── ScrollReveal.tsx
│   ├── tech-stack/
│   │   ├── TechCategory.astro
│   │   ├── TechItem.astro
│   │   └── TechStackInteractive.tsx
│   └── products/
│       ├── ProductCard.astro
│       └── ProductGrid.astro
├── data/
│   ├── schema.d.ts (TypeScript types)
│   ├── experience.json
│   ├── publications.json
│   ├── tech-stack.json
│   └── products.json
├── styles/
│   ├── global.css (existing)
│   ├── animations.css (new)
│   ├── theme.css (new)
│   └── utilities.css (new)
├── layouts/
│   └── Layout.astro (existing)
└── pages/
    └── index.astro (updated)
```

---

## Implementation Phases

### Phase 1: Data & Infrastructure (High Priority)
- ✓ Create `src/data/` directory
- ✓ Define TypeScript schema (`schema.d.ts`)
- ✓ Create JSON data files (experience, publications, tech-stack, products)
- ✓ Create new style files (animations.css, theme.css, utilities.css)

### Phase 2: Static Components (High Priority)
- ✓ Build Astro section wrappers (ExperienceTimeline, PublicationsSection, etc.)
- ✓ Build card/item components (TimelineEntry, PublicationCard, TechItem, etc.)
- ✓ Verify responsive layout at all breakpoints
- ✓ Apply Tailwind utilities correctly

### Phase 3: Interactive Components (High Priority)
- ✓ Create animation wrapper components (ScrollReveal, TimelineAnimator)
- ✓ Implement scroll-triggered animations
- ✓ Add hover state interactivity
- ✓ Implement category expand/collapse for tech stack

### Phase 4: Integration & Styling (High Priority)
- ✓ Update main `index.astro` to include all new sections
- ✓ Ensure proper spacing between sections
- ✓ Verify color consistency across sections
- ✓ Test all hover states

### Phase 5: Testing & Optimization (Medium Priority)
- ✓ Responsive testing (mobile, tablet, desktop)
- ✓ Animation testing (smooth, no jank)
- ✓ Accessibility audit (WCAG AA)
- ✓ Build and verify no errors

---

## Responsive Breakpoints

```
Mobile:    0px - 640px    (base styles)
Tablet:    640px - 1024px (md: prefixed)
Desktop:   1024px+        (lg: prefixed)
```

### Container Rules
- Max-width: `max-w-5xl` (80rem)
- Horizontal margin: `mx-auto`
- Padding: `px-6` (mobile), `md:px-8` (tablet), `lg:px-12` (desktop)

---

## Animation Strategy

### Timing Specifications

**Global Durations:**
- Fast: 300ms (hover states)
- Base: 700-800ms (section enters)
- Slow: 1200ms (reserved)

**Global Easing:**
- Primary: `cubic-bezier(0.16, 1, 0.3, 1)` (smooth, snappy)
- Standard: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out)
- Expand: `cubic-bezier(0.4, 0, 0.2, 1)` (smooth)

**Stagger Pattern:**
- Timeline: 0.1s between items
- Publications: 0.08s between items
- Tech Stack: 0.05s between items
- Products: No stagger (all enter together)

### Animation Best Practices

1. **No Layout Shift:** Use `transform` not `position`/`margin`
2. **Scroll Triggers:** Use Framer Motion's `whileInView` + viewport
3. **Hover Effects:** Smooth 300ms transitions on all interactive elements
4. **Motion Reduction:** Respect `prefers-reduced-motion` media query (optional for now)
5. **Performance:** Use `will-change` sparingly, avoid simultaneous animations

---

## Accessibility Compliance

**WCAG AA Standards:**
- [ ] Color contrast minimum 4.5:1 for text
- [ ] Interactive elements minimum 44×44px (mobile)
- [ ] Semantic HTML structure
- [ ] Focus states visible for keyboard navigation
- [ ] Alt text for all images
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Form labels (if applicable)

**Optional AAA Enhancements:**
- Respect `prefers-reduced-motion` preferences
- Provide high contrast mode option
- Increase font size availability
- Keyboard-only navigation support

---

## Performance Optimization

**Image Optimization:**
- Use `loading="lazy"` for product images
- Specify `width` and `height` attributes
- Use `object-cover` for consistent aspect ratios
- Consider next-gen formats (WebP) for future

**Animation Optimization:**
- Use `transform` and `opacity` (GPU-accelerated)
- Avoid `left`/`top`/`position` changes
- Limit simultaneous animations
- Use `will-change` strategically

**Bundle Size:**
- Lazy load Framer Motion hooks where possible
- Tree-shake unused Tailwind utilities
- Minimize CSS custom properties
- Target <100KB CSS bundle increase

---

## Testing Checklist

### Visual Testing
- [ ] Dark mode colors correct on all sections
- [ ] Hover states visible and smooth
- [ ] Animations 60fps, no jank
- [ ] No text cutoff at any breakpoint
- [ ] Proper spacing and alignment

### Responsive Testing
- [ ] Mobile: 320px, 375px, 480px widths
- [ ] Tablet: 768px, 1024px widths
- [ ] Desktop: 1440px, 1920px widths
- [ ] Touch interactions work (mobile)
- [ ] Keyboard navigation works (all)

### Functional Testing
- [ ] All links functional
- [ ] Images load without CLS
- [ ] Animations trigger correctly
- [ ] Category collapse/expand works
- [ ] No console errors

### Accessibility Testing
- [ ] Keyboard-only navigation
- [ ] Screen reader compatibility
- [ ] Color contrast sufficient (4.5:1)
- [ ] Focus indicators visible
- [ ] Semantic HTML valid

---

## Future Enhancements

**Phase 2 (Optional - For Later):**
- Light mode implementation (CSS variables ready)
- Interactive filters for publications
- Product carousel with multiple images
- Expandable modal for detailed product views
- Search/filter functionality
- Blog section (if needed)

**Phase 3 (Optional - Long Term):**
- Dark mode animation transitions
- Advanced scroll parallax effects
- 3D transforms (subtle)
- Social sharing buttons
- Analytics integration
- SEO optimization

---

## Notes & Conventions

1. **No emoji icons** - Use SVG (Heroicons/Lucide) if icons needed
2. **Consistent spacing** - Always use Tailwind spacing scale
3. **Monospace for labels** - All section headers, meta info use `font-mono`
4. **Mobile-first classes** - Base styles are mobile, add responsive prefixes
5. **Semantic HTML** - Use `<section>`, `<article>`, `<header>` appropriately
6. **Data validation** - Keep JSON files synchronized with TypeScript types
7. **Component reusability** - Extract common patterns into shared components
8. **Performance first** - Lazy load, optimize images, minimize animations

---

## Quick Reference

### Tailwind Utility Classes Used

**Spacing:** `mb-32`, `mb-12`, `mb-8`, `gap-6`, `gap-4`, `p-6`, `px-6`, `py-8`

**Typography:** `font-mono`, `font-medium`, `text-xs`, `text-sm`, `text-lg`, `uppercase`, `tracking-widest`, `leading-relaxed`, `line-clamp-3`

**Colors:** `text-foreground`, `text-muted`, `border-border`, `bg-white/5`, `bg-white/[0.02]`

**Layout:** `max-w-5xl`, `mx-auto`, `grid`, `grid-cols-1`, `md:grid-cols-2`, `lg:grid-cols-3`, `flex`, `overflow-hidden`, `relative`

**Interactive:** `transition-colors`, `duration-300`, `hover:bg-white/5`, `hover:border-border/80`, `cursor-pointer`

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-24 | Initial design & implementation plan |

---

**Ready for implementation!** All sections specified, all animations toned down, all responsive breakpoints defined.
