# Haven — AI-Powered Dynamic Mental Health Monitoring & Distress-Response System
## Core Architecture, Development Standards & Agent Directives
**Smart India Hackathon 2026 (SIH 2026)** · **Problem Statement ID**: 26094  
**Team**: Esoteric · **Domain**: MedTech / BioTech / HealthTech (Software)  
**Governing Laws & Standards**: SC/ST (PoA) Act (Section 15A Witness Protection), DPDP Act & Rules 2025, Tele-MANAS Guidelines, ERSS 112, WHO Psychological First Aid.

---

## 1. Executive Project Plan & Statutory Foundation

### 1.1 Problem Statement & Solution Vision
Haven is a purpose-built, trauma-informed digital ecosystem providing continuous mental-health monitoring, early distress prediction, and closed-loop escalation for survivors of atrocities and vulnerable witnesses. Rather than treating distress in isolation, Haven evaluates psychological indicators alongside the **wider stress context**:
- Witness intimidation and coercion (Section 15A SC/ST PoA Act).
- Court delays and repeated hearing appearances.
- Economic hardship and delayed financial relief disbursement (SC/ST PoA Rules 1995 & 2016–18 amendments).
- Social boycotts and rehabilitation barriers.

### 1.2 Core Modules & Human Workflows
1. **Survivor Portal (`/survivor/*`)**:
   - **Calm, High-Clarity Interface**: Clean, low-cognitive-load navigation designed for survivors under stress.
   - **Time-Aware Greeting & Instant Mood Check-in**: Tracks emotional trajectory and offers voluntary, instant support options.
   - **My Case Timeline**: Real-time statutory tracking (FIR Ingestion $\to$ Charge Sheet filing $\to$ Special Court proceedings $\to$ Rehabilitation relief) without overwhelming legal jargon.
   - **Financial Relief Tracker**: Transparent progress rail monitoring state victim compensation disbursements.
   - **Witness Protection Escalation**: Rapid reporting of intimidation or threats directly routed to the Special Protection Cell / SP Office.
   - **Direct Counselor Scheduling**: Book encrypted, confidential audio/chat sessions with licensed district counselors.
   - **Safety First / Quick Exit**: Immediate, single-click redirect to Google or double-press `Escape` for covert privacy.
   - **Discreet DPDP Protected State**: End-to-end client-side confidentiality reassuring the survivor that data is never leaked or unencrypted.
2. **Authority & Counselor Queue (Planned Phase 2)**:
   - Role-scoped data isolation (counselors see psychological evidence; authorities receive only protection/relief logistics).
   - Strict audit logs and zero alert fatigue through deadline-aware escalation rules.
3. **Emergency Pathways**:
   - Integrated Tele-MANAS (14416) helpline and National Emergency Response (112) with zero-login requirement.

---

## 2. Master Theme System: Dark vs. Light Mode Balance

### 2.1 The Golden Rule of Theming
> [!IMPORTANT]
> **Zero Regression on Dark Mode**: Never modify the `:root` CSS variables or dark mode styles when refining Light Mode. Dark Mode is the established baseline cosmic glassmorphism aesthetic. Always use scoped Tailwind `dark:` variants or `.light` CSS selectors for theme adjustments.

### 2.2 Color Palettes

| Element | Dark Mode (`:root`) | Light Mode (`.light`) | WCAG Contrast Rationale |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | Deep Cosmic `#070b12` (`222 47% 5%`) | Sunlit Alabaster `#fbfcfb` (`150 20% 98%`) | Calming, therapeutic, non-harsh white |
| **Card Surface** | Deep Glass `rgba(13, 20, 36, 0.72)` | Pure Silk Glass `rgba(255, 255, 255, 0.86)` | High readability without opaque glare |
| **Primary Accent** | Radiant Teal `#5eead4` (`174 85% 65%`) | Deep Botanical Sage `#0f766e` (`174 84% 28%`) | Light aqua `#5eead4` washes out on white (1.4:1 contrast); Botanical Sage yields 6.8:1+ (WCAG AAA) |
| **Secondary Accent** | Cosmic Indigo `#818cf8` (`234 89% 74%`) | Oceanic Navy `#1d4ed8` / `#0369a1` | Rich depth and clear hierarchy |
| **Crisis / Alert** | Soft Rose `#f43f5e` / `#fda4af` | Deep Crimson `#be123c` (`rose-700`) | Crisp legibility for critical emergency triggers |
| **Card Borders** | Luminous Teal `rgba(94, 234, 212, 0.15)` | Subtle Sage `rgba(15, 118, 110, 0.14)` | Elegant framing without distracting heavy lines |

### 2.3 Resolving "Dark Slabs" in Light Mode
Never hardcode dark Tailwind background classes like `bg-slate-900`, `bg-slate-950/60`, or `bg-black/50` on card sub-elements or modals. Always scope them with `dark:`:
```tsx
// ❌ WRONG: Renders an unsightly black box in Light Mode
<div className="bg-slate-900 p-4 rounded-xl">...</div>

// ✅ CORRECT: Tinted card in light mode, cosmic slab in dark mode
<div className="bg-teal-50/70 dark:bg-black/40 border border-teal-600/20 dark:border-teal-500/20 p-4 rounded-xl">...</div>

// ✅ For inputs and textareas:
<textarea className="bg-slate-100/90 dark:bg-slate-950/50 border border-slate-300/80 dark:border-border text-foreground" />

// ✅ For modals:
<div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-teal-500/30 text-foreground" />
```

---

## 3. Dynamic Background & Fluid Motion Architecture

### 3.1 Background Layer Architecture (`InteractiveBackground.tsx`)
The background uses a multi-layered hybrid of HTML5 Canvas particle physics and CSS GPU-accelerated SVG radial fluid blobs:
1. **Canvas Particle Layer (z-index 0)**:
   - Floating organic dust particles with gentle wandering vectors.
   - Mouse repulsion / gravitational spring physics on pointer move.
   - In Dark Mode: Luminescent teal/cyan dots (`--particle-alpha: 0.72`).
   - In Light Mode: Velvety botanical sage specks (`--particle-alpha: 0.58`) rendered with crisp contrast against alabaster.
2. **Fluid Ambient Blobs (`.blob-a`, `.blob-b`, `.blob-c`)**:
   - `blob-a`: Flowing eucalyptus/teal aura drifting via `@keyframes blob-drift`.
   - `blob-b`: Cool cyan/morning sky aura undulating via `@keyframes blob-pulse`.
   - `blob-c`: Warm sunlit morning amber aura (`rgba(254, 240, 138, 0.35)` in `.light`, subtle deep teal in dark mode) positioned centrally to create a restorative breathing atmosphere.
   - `--blob-opacity: 0.42` in light mode ensures fluid motion is distinctly visible without blowing out card readability.

### 3.2 Motion Principles & Smoothness
- Always use `transform: translate3d(...)` and `filter: blur(...)` to leverage GPU compositing.
- Respect `prefers-reduced-motion`: When reduced motion is detected, freeze particle trajectories and pause ambient blob drifting.

---

## 4. Interactive Animated Icons Architecture (itshover Pattern)

### 4.1 Ref-Based Animation Handle Pattern
All interactive icons must be located in `@/components/icons/*` and follow the `AnimatedIconHandle` contract:

```typescript
// types.ts
export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export interface AnimatedIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}
```

### 4.2 Standard Icon Component Implementation Pattern
```tsx
import React, { forwardRef, useImperativeHandle, useState } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";

export const ExampleIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ size = 20, className = "", ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    useImperativeHandle(ref, () => ({
      startAnimation: () => setIsHovered(true),
      stopAnimation: () => setIsHovered(false),
    }));

    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`transition-transform duration-300 ${
          isHovered ? "scale-110 text-haven-teal" : ""
        } ${className}`}
        {...props}
      >
        {/* Animated paths with CSS transitions */}
      </svg>
    );
  }
);
ExampleIcon.displayName = "ExampleIcon";
```

### 4.3 Mandatory Dual-Trigger Pattern
Icons must animate not only when the icon itself is hovered, but **also when any part of its parent container/card is hovered**:
```tsx
const ParentCard: React.FC = () => {
  const iconRef = useRef<AnimatedIconHandle>(null);

  return (
    <div
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
      className="group glass-card p-4 hover:border-teal-400/40 cursor-pointer"
    >
      <ExampleIcon ref={iconRef} className="w-5 h-5 text-teal-800 dark:text-haven-teal" />
      <span>Interactive Card</span>
    </div>
  );
};
```

---

## 5. Strict Negative Constraints

> [!CAUTION]
> 1. **DO NOT ADD ANY BREATHING PACER OR BREATHING CIRCLE EXERCISE**: The user has explicitly disallowed breathing pacers/exercises on the dashboard. Do not reintroduce them under any circumstances.
> 2. **NO DARK MODE CONTRAST REGRESSION**: Dark mode must never look washed-out, gray, or altered. Always verify dark mode after making style changes.
> 3. **NO RAW API KEYS OR UNENCRYPTED PII**: DPDP Act compliance demands that victim dockets, phone numbers, and notes are never stored or logged in plain text.
> 4. **NO OVERLAYING TIMELINE LINES**: Ensure the vertical rail lines in `CaseTimelineCard` maintain absolute positioning strictly inside the node column so they never run across text or action cards.

---

## 6. Component Architecture & Modular Directory Layout

The survivor ecosystem components are structured domain-wise under `src/components/survivor/` with clean barrel exports:

```
src/components/survivor/
├── home/                         # Home Dashboard widgets & interactive modals
│   ├── GreetingHeader.tsx        # Time-aware greeting & interactive mood check-in
│   ├── QuickActionsGrid.tsx      # Quick links (Haven AI, Resources, Counselor)
│   ├── CaseTimelineCard.tsx      # Section 15A statutory timeline & financial relief rail
│   ├── UpcomingAppointmentCard.tsx # Counselor session card & encrypted call join
│   ├── CounselorContactModal.tsx # Booking modal for licensed district counselors
│   ├── ThreatReportModal.tsx     # Intimidation escalation to SP / Protection Cell
│   └── index.ts                  # Barrel export
├── layout/                       # Persistent layout & safety wrappers
│   ├── Sidebar.tsx               # Collapsible desktop rail & responsive mobile drawer
│   ├── TopBar.tsx                # Status indicator, theme toggle, language, emergency
│   ├── CrisisStrip.tsx           # Floating distress contact footer (Tele-MANAS & 112)
│   ├── EmergencyButton.tsx       # Rapid SOS modal trigger
│   ├── EmergencyPanel.tsx        # Emergency numbers & crisis first-aid dialer
│   ├── LanguageDropdown.tsx      # Multilingual selector (Telugu, Hindi, English, etc.)
│   └── index.ts                  # Barrel export
├── auth/                         # Survivor onboarding & docket verification
│   ├── DocketStep.tsx            # NHAA docket entry with format guidance
│   ├── OtpStep.tsx               # Multi-digit OTP verification step
│   ├── ProfileConsentStep.tsx    # DPDP-compliant consent & preferred name setup
│   └── index.ts                  # Barrel export
├── haven-ai/                     # Haven AI Companion Page modules
│   ├── HavenAiStage.tsx          # Conversational stage, prompt chips, voice mic, expand toggle
│   ├── ActiveCaseSnapshot.tsx    # Next Hearing, Section 15A protection tier, counselor card
│   ├── AiSuggestionsCard.tsx     # Contextual legal, relief & safety recommendations
│   ├── ChatHistorySection.tsx    # Encrypted session archive with search & collapse toggle
│   └── index.ts                  # Barrel export
├── common/                       # Shared survivor placeholders & utilities
│   ├── DashboardPlaceholder.tsx  # Upcoming phase feature stubs
│   └── index.ts                  # Barrel export
└── index.ts                      # Master barrel re-exporting all subfolders
```

---

## 7. Code Style & Technical Stack

- **Framework**: React 18+ with TypeScript (Strict mode enabled).
- **Styling**: Tailwind CSS + Vanilla CSS custom variables (`src/index.css`).
- **Icons**: Custom animated SVGs in `src/components/icons/*` built on Lucide base geometry.
- **Routing**: `react-router-dom` with persistent layouts (`SurvivorLayout`).
- **Performance**: Zero external heavy 3D bundles for background canvas; pure Canvas2D API for lightweight 60 FPS rendering.
- **Accessibility (a11y)**:
  - Accessible names and ARIA labels on all interactive buttons.
  - Trap focus and support `Escape` dismissal on all modals.
  - Double `Escape` listener for the emergency Quick Exit feature.
