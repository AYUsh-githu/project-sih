import React, { useState } from "react";
import { useAvatar } from "@/context/AvatarContext";
import { HavenAvatar } from "@/components/avatar/HavenAvatar";
import { Play } from "lucide-react";

const MOTIONS = [
  { id: "greetwave", label: "Greet & Welcome", desc: "Warm welcoming head tilt, antenna flash, calm forward affirmation." },
  { id: "listen", label: "Active Listening", desc: "Attentive 9° tilt signaling survivor is heard." },
  { id: "thinking", label: "Thinking & Reasoning", desc: "Gentle eye glance and antenna processing pulse." },
  { id: "calm", label: "Settle & Calm", desc: "Deep soothing settle after distress." },
  { id: "sleep", label: "Rest & Slumber", desc: "Eyelids slowly lower into tranquil rest." },
  { id: "wake", label: "Gentle Awakening", desc: "Soft uncurl from rest." },
  { id: "inspect", label: "Reviewing Case", desc: "Analytical focus and careful attention." },
];

export const AvatarMotionSandbox: React.FC = () => {
  const { settings, triggerMotion, registerPreviewAvatar } = useAvatar();
  const [activeMotionLabel, setActiveMotionLabel] = useState(
    "Rest & Gentle Slumber: Eyelid Lower"
  );
  const [activeMotionDesc, setActiveMotionDesc] = useState(
    "Eyelids slowly lower into tranquil rest."
  );

  const handleTestMotion = (m: (typeof MOTIONS)[0]) => {
    setActiveMotionLabel(m.label);
    setActiveMotionDesc(m.desc);
    triggerMotion(m.id);
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-teal-500/20 shadow-xl mb-6 relative overflow-hidden">
      {/* Background Soft Aura */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner: Current Motion (Directly from Screenshot) */}
      <div className="p-4 rounded-xl bg-teal-50/80 dark:bg-white/[0.03] border border-teal-600/25 dark:border-teal-500/25 mb-6 flex items-start gap-3">
        <span className="w-3 h-3 rounded-full bg-teal-400 mt-1 flex-shrink-0 animate-pulse shadow-[0_0_8px_rgba(94,234,212,0.8)]" />
        <div>
          <h3 className="text-sm font-bold text-teal-900 dark:text-haven-teal tracking-tight">
            {activeMotionLabel}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {activeMotionDesc}
          </p>
        </div>
      </div>

      {/* Center Avatar Stage with Tactile Physics */}
      <div className="flex flex-col items-center justify-center py-6 sm:py-8 bg-teal-50/40 dark:bg-black/30 rounded-2xl border border-teal-500/15 mb-6 relative">
        <HavenAvatar
          size={settings.avatarSize}
          color={settings.chassisColor}
          headCurvature={settings.headCurvature}
          autoSleep={0}
          onAvatarRef={registerPreviewAvatar}
          interactive={true}
        />
        <span className="text-[11px] text-muted-foreground mt-3 font-medium">
          Drag avatar head or antenna tip to test elastic spring physics
        </span>
      </div>

      {/* Motion Quick Action Chips */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2.5">
          Trigger Motion Test Sequences:
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {MOTIONS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => handleTestMotion(m)}
              className="px-3 py-1.5 rounded-xl bg-white/70 dark:bg-white/[0.04] border border-teal-500/20 hover:border-teal-500/50 hover:bg-teal-50/60 dark:hover:bg-white/[0.08] text-foreground text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Play className="w-3 h-3 text-teal-700 dark:text-haven-teal fill-current" />
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarMotionSandbox;
