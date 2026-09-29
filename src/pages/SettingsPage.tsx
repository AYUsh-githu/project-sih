import React from "react";
import {
  AvatarMotionSandbox,
  AvatarCustomizerCard,
  AvatarPhysicsCard,
} from "@/components/survivor/settings";
import { ShieldCheck, UserCheck, Bell, Key } from "lucide-react";

export const SettingsPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full page-enter py-2 sm:py-4 px-2 sm:px-4">
      {/* Page Header */}
      <div className="mb-6 pb-4 border-b border-border/50">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-800 dark:text-haven-teal border border-teal-500/30">
            SIH 2026 Innovation
          </span>
          <span className="text-xs text-muted-foreground">· Docket #NHAA-2026-8821</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
          Companion Studio & Settings
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Customize your trauma-informed Haven avatar, tactile physics, dark mode glow aura, and statutory DPDP preferences.
        </p>
      </div>

      {/* 1. Live Interactive Avatar Preview & Expression Tester */}
      <AvatarMotionSandbox />

      {/* 2. Dark Mode High-Contrast Engine, Chassis Palette & Geometry Sliders */}
      <AvatarCustomizerCard />

      {/* 3. Interactive Tactile Physics Cheatsheet & Dock Visibility Toggle */}
      <AvatarPhysicsCard />

      {/* 4. Statutory & DPDP Act 2025 Privacy Controls */}
      <div className="glass-card rounded-2xl p-6 border border-teal-500/20 shadow-xl mb-6 relative overflow-hidden">
        <div className="flex items-center gap-2.5 pb-4 border-b border-border/50 mb-4">
          <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-800 dark:text-haven-teal">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              DPDP Act 2025 Confidentiality & Witness Shield
            </h3>
            <p className="text-[10px] text-muted-foreground">
              Section 15A SC/ST PoA Act Identity Protection
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-white/[0.02] border border-border/60 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-foreground">
              <UserCheck className="w-3.5 h-3.5 text-teal-800 dark:text-haven-teal" />
              <span>Pseudonymous Identity</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Current Alias: <strong className="text-foreground font-mono">LotusCourage_92</strong>. Real name and docket are client-side encrypted.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-white/[0.02] border border-border/60 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-foreground">
              <Bell className="w-3.5 h-3.5 text-teal-800 dark:text-haven-teal" />
              <span>Hearing Reminder Alerts</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Encrypted SMS & WhatsApp notice active for next hearing (Oct 14, 2026).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
