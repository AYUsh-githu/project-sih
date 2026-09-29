import React, { useRef } from "react";
import { ShieldCheckIcon, SproutIcon, AnimatedIconHandle } from "@/components/icons";

interface PeerOrb {
  id: string;
  label: string;
  stage: string;
  color: string;
  borderColor: string;
  delay: string;
  top: string;
  left: string;
}

const PEER_ORBS: PeerOrb[] = [
  {
    id: "p1",
    label: "Aura-21",
    stage: "Stage 3 · Fast-Track Court",
    color: "from-teal-400/30 to-teal-600/40",
    borderColor: "border-teal-400/50",
    delay: "0s",
    top: "10%",
    left: "48%",
  },
  {
    id: "p2",
    label: "Echo-55",
    stage: "Stage 2 · Charge Sheet",
    color: "from-indigo-400/30 to-indigo-600/40",
    borderColor: "border-indigo-400/50",
    delay: "0.8s",
    top: "22%",
    left: "78%",
  },
  {
    id: "p3",
    label: "Sol-19",
    stage: "Stage 4 · Relief Approved",
    color: "from-amber-400/30 to-amber-600/40",
    borderColor: "border-amber-400/50",
    delay: "1.4s",
    top: "62%",
    left: "82%",
  },
  {
    id: "p4",
    label: "River-83",
    stage: "Stage 3 · Deposition",
    color: "from-cyan-400/30 to-cyan-600/40",
    borderColor: "border-cyan-400/50",
    delay: "0.4s",
    top: "76%",
    left: "48%",
  },
  {
    id: "p5",
    label: "Zen-07",
    stage: "Stage 1 · FIR Logged",
    color: "from-purple-400/30 to-purple-600/40",
    borderColor: "border-purple-400/50",
    delay: "1.8s",
    top: "62%",
    left: "16%",
  },
  {
    id: "p6",
    label: "Dawn-64",
    stage: "Stage 3 · Legal Aid",
    color: "from-emerald-400/30 to-emerald-600/40",
    borderColor: "border-emerald-400/50",
    delay: "1.1s",
    top: "22%",
    left: "18%",
  },
];

export const CommunityHeroBanner: React.FC = () => {
  const shieldRef = useRef<AnimatedIconHandle>(null);
  const sproutRef = useRef<AnimatedIconHandle>(null);

  return (
    <div
      onMouseEnter={() => {
        shieldRef.current?.startAnimation();
        sproutRef.current?.startAnimation();
      }}
      onMouseLeave={() => {
        shieldRef.current?.stopAnimation();
        sproutRef.current?.stopAnimation();
      }}
      className="glass-card rounded-2xl p-6 sm:p-8 border border-teal-500/20 shadow-xl relative overflow-hidden mb-6 group cursor-default"
    >
      {/* Background Soft Radiance Ambient Blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-teal-500/15 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-60 h-60 bg-gradient-to-tr from-amber-500/10 via-teal-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        {/* Left Column: Reassuring Header & Safety Shield */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              You&apos;re not alone.
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Connect with fellow witnesses and survivors who understand your journey, in a safe, encrypted, and clinician-moderated space.
            </p>
          </div>

          {/* Safety First Guarantee Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-teal-50/80 dark:bg-white/[0.04] border border-teal-600/30 dark:border-teal-500/25 shadow-xs">
            <div className="w-6 h-6 rounded-md bg-teal-500/15 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0">
              <ShieldCheckIcon
                ref={shieldRef}
                size={18}
                className="text-teal-800 dark:text-haven-teal group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-xs font-semibold text-foreground">
              This space is strictly moderated for your emotional safety & legal privacy
            </span>
          </div>

          {/* Core Principles Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-muted-foreground">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-800 dark:text-haven-teal font-medium">
              Section 15A Identity Shielded
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-medium">
              Zero Unvetted DMs
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-medium">
              Facilitated by DMHU Psychologists
            </span>
          </div>
        </div>

        {/* Right Column: Ethereal Constellation Graphic (Faithful to Reference Art) */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* Outer Orbit Halo Ring */}
            <div className="absolute inset-4 rounded-full border border-teal-500/20 dark:border-teal-400/20 shadow-[0_0_35px_rgba(94,234,212,0.1)] animate-pulse-gentle" />
            <div className="absolute inset-10 rounded-full border border-dashed border-indigo-400/25 dark:border-indigo-400/20" />

            {/* Central Sprout Node (Shared Growth & Healing) */}
            <div className="relative z-20 w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500/30 via-emerald-400/20 to-teal-300/30 backdrop-blur-md border border-teal-400/50 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(94,234,212,0.35)] group-hover:scale-105 transition-transform duration-500">
              <SproutIcon
                ref={sproutRef}
                size={28}
                className="text-teal-800 dark:text-haven-teal"
              />
              <span className="text-[9px] font-bold text-teal-900 dark:text-haven-teal uppercase tracking-wider mt-0.5">
                Haven
              </span>
            </div>

            {/* Surrounding Peer Avatar Orbs */}
            {PEER_ORBS.map((orb) => (
              <div
                key={orb.id}
                style={{
                  top: orb.top,
                  left: orb.left,
                  animationDelay: orb.delay,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group/orb cursor-pointer z-10 transition-transform duration-300 hover:scale-125 hover:z-30"
              >
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr ${orb.color} backdrop-blur-md border-2 ${orb.borderColor} flex items-center justify-center shadow-lg transition-all duration-300 group-hover/orb:shadow-[0_0_20px_rgba(94,234,212,0.5)]`}
                >
                  {/* Gentle Avatar Glyph */}
                  <span className="text-xs font-bold text-foreground">
                    {orb.label.slice(0, 2)}
                  </span>
                </div>

                {/* Floating Tooltip Pill */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-slate-900/90 dark:bg-slate-950/95 text-white border border-teal-500/40 text-[10px] whitespace-nowrap opacity-0 group-hover/orb:opacity-100 transition-opacity pointer-events-none shadow-xl z-30">
                  <div className="font-bold text-haven-teal">{orb.label}</div>
                  <div className="text-[9px] text-slate-300">{orb.stage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeroBanner;
