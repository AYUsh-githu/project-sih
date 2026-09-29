# Haven — AI-Powered Dynamic Mental Health Monitoring & Distress-Response System
## Core Architecture, Development Standards & Agent Directives
See full documentation in [AGENTS.md](file:///c:/Users/santo/OneDrive/Desktop/finalist/AGENTS.md).

> This file mirrors [AGENTS.md](file:///c:/Users/santo/OneDrive/Desktop/finalist/AGENTS.md) for direct reference across all sessions.

---

### Key Agent Directives Quick Reference:
1. **Core Project**: Smart India Hackathon 2026 (Problem Statement ID 26094), Team Esoteric. Trauma-informed distress prediction & dynamic mental health monitoring for victims of atrocities under SC/ST (PoA) Act, Section 15A Witness Protection, Tele-MANAS, and DPDP Act 2025.
2. **Dual-Theme Isolation**:
   - **Never alter `:root` default variables** when tweaking light mode. Dark mode cosmic teal glass is the baseline.
   - Use Tailwind `dark:` variants everywhere.
   - In Light Mode, use deep botanical sage (`text-teal-800` / `#0f766e`) instead of washed-out light cyan (`#5eead4`).
   - Eliminate all "dark slabs" (e.g. `bg-slate-900` without `dark:`) in light mode by using `bg-white/95 dark:bg-slate-900/95` or `bg-teal-50/70 dark:bg-black/40`.
3. **Background Dynamics**:
   - `InteractiveBackground.tsx` runs interactive particle canvas with fluid ambient radial blobs (`blob-a`, `blob-b`, `blob-c`).
   - Light mode uses warm sunrise amber (`blob-c`) + eucalyptus sage (`blob-a`) with balanced opacity (`--blob-opacity: 0.42`) so motion is vividly visible and calming.
4. **Interactive Animated Icons (`itshover` pattern)**:
   - Use `AnimatedIconHandle` (`startAnimation`, `stopAnimation`) in `@/components/icons/*`.
   - **Dual-Trigger Requirement**: Animate both when the icon is hovered directly AND when its parent card/container is hovered (`onMouseEnter={() => ref.current?.startAnimation()}`).
5. **Strict Negative Constraints**:
   - **NO breathing pacer or breathing exercise** on the dashboard.
   - **No dark mode visual regression**.
6. **Structured Directory Layout**:
   - `src/components/survivor/home/`: Home widgets & modals (`GreetingHeader`, `QuickActionsGrid`, `CaseTimelineCard`, `UpcomingAppointmentCard`, `CounselorContactModal`, `ThreatReportModal`).
   - `src/components/survivor/layout/`: Persistent layout & emergency elements (`Sidebar`, `TopBar`, `CrisisStrip`, `EmergencyButton`, `EmergencyPanel`, `LanguageDropdown`).
   - `src/components/survivor/haven-ai/`: Haven AI Companion page modules (`HavenAiStage`, `ActiveCaseSnapshot`, `AiSuggestionsCard`, `ChatHistorySection`).
   - `src/components/survivor/auth/`: Sign-in steps (`DocketStep`, `OtpStep`, `ProfileConsentStep`).
   - `src/components/survivor/common/`: Shared placeholders (`DashboardPlaceholder`).
   - `src/components/survivor/index.ts`: Master barrel export.
