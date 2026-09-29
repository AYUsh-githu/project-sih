import React, { useState, useRef } from "react";
import { ShieldCheckIcon, HeartIcon } from "@/components/icons";
import type { AnimatedIconHandle } from "@/components/icons/types";
import { Sparkles, AlertCircle } from "lucide-react";
import { useAvatar } from "@/context/AvatarContext";

interface GreetingHeaderProps {
  userName?: string;
  docketNumber?: string;
  onOpenEmergency?: () => void;
}

type MoodState = "calm" | "okay" | "anxious" | "sad" | "overwhelmed" | null;

export const GreetingHeader: React.FC<GreetingHeaderProps> = ({
  userName = "Priya",
  docketNumber = "NHAA-2026-8821",
  onOpenEmergency,
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodState>(null);
  const heartRef = useRef<AnimatedIconHandle>(null);
  const { onMoodSelect } = useAvatar();

  // Time-aware greeting computation
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const handleMoodClick = (mood: MoodState) => {
    setSelectedMood(mood);
    heartRef.current?.startAnimation();

    if (mood) {
      if (mood === "calm") onMoodSelect("great");
      else if (mood === "okay") onMoodSelect("okay");
      else if (mood === "anxious" || mood === "sad") onMoodSelect("struggling");
      else if (mood === "overwhelmed") onMoodSelect("crisis");
    }

    if (mood === "overwhelmed" && onOpenEmergency) {
      // Prompt quick support options
    }
  };

  return (
    <div className="glass-card p-6 sm:p-8 rounded-2xl border border-teal-500/20 shadow-xl mb-6 relative overflow-hidden">
      {/* Decorative subtle ambient gradient accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Personalized Greeting & Assurance */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 border border-teal-500/30 text-haven-teal">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Protected Space
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-mono bg-white/5 px-2.5 py-1 rounded-full border border-border">
              <ShieldCheckIcon size={14} className="text-haven-teal" />
              <span>{docketNumber}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {getGreeting()},{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
              {userName}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
            Take a deep breath. You are safe here, every action is confidential, and support is always within your reach.
          </p>
        </div>

        {/* Right: Gentle Check-in Mood Bar with Easy Container Hover Trigger */}
        <div
          onMouseEnter={() => heartRef.current?.startAnimation()}
          onMouseLeave={() => heartRef.current?.stopAnimation()}
          className="flex flex-col sm:items-end justify-center bg-teal-50/70 dark:bg-black/40 p-4 rounded-xl border border-teal-600/20 dark:border-teal-500/20 backdrop-blur-md max-w-lg w-full md:w-auto shadow-sm dark:shadow-inner group cursor-default transition-all hover:border-teal-600/40 dark:hover:border-teal-500/40"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-foreground/90 mb-2.5">
            <HeartIcon ref={heartRef} size={16} className="text-teal-700 dark:text-haven-teal flex-shrink-0" />
            <span>Mood Check-in · How are you feeling right now?</span>
          </div>

          <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-2 w-full">
            <button
              type="button"
              onClick={() => handleMoodClick("calm")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                selectedMood === "calm"
                  ? "bg-teal-500/25 dark:bg-teal-500/30 border-2 border-teal-600 dark:border-teal-400 text-teal-950 dark:text-teal-200 shadow-[0_0_15px_rgba(94,234,212,0.4)] scale-105 font-bold"
                  : "bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-slate-700 dark:text-muted-foreground hover:text-foreground border border-slate-200/80 dark:border-border/40 shadow-xs"
              }`}
            >
              <span>🌿</span>
              <span>Calm</span>
            </button>

            <button
              type="button"
              onClick={() => handleMoodClick("okay")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                selectedMood === "okay"
                  ? "bg-cyan-500/25 dark:bg-cyan-500/30 border-2 border-cyan-600 dark:border-cyan-400 text-cyan-950 dark:text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-105 font-bold"
                  : "bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-slate-700 dark:text-muted-foreground hover:text-foreground border border-slate-200/80 dark:border-border/40 shadow-xs"
              }`}
            >
              <span>🙂</span>
              <span>Okay</span>
            </button>

            <button
              type="button"
              onClick={() => handleMoodClick("anxious")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                selectedMood === "anxious"
                  ? "bg-amber-500/25 dark:bg-amber-500/30 border-2 border-amber-600 dark:border-amber-400 text-amber-950 dark:text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.4)] scale-105 font-bold"
                  : "bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-slate-700 dark:text-muted-foreground hover:text-foreground border border-slate-200/80 dark:border-border/40 shadow-xs"
              }`}
            >
              <span>😟</span>
              <span>Anxious</span>
            </button>

            <button
              type="button"
              onClick={() => handleMoodClick("sad")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                selectedMood === "sad"
                  ? "bg-indigo-500/25 dark:bg-indigo-500/30 border-2 border-indigo-600 dark:border-indigo-400 text-indigo-950 dark:text-indigo-200 shadow-[0_0_15px_rgba(129,140,248,0.4)] scale-105 font-bold"
                  : "bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-slate-700 dark:text-muted-foreground hover:text-foreground border border-slate-200/80 dark:border-border/40 shadow-xs"
              }`}
            >
              <span>🌧️</span>
              <span>Sad</span>
            </button>

            <button
              type="button"
              onClick={() => handleMoodClick("overwhelmed")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                selectedMood === "overwhelmed"
                  ? "bg-rose-500/25 dark:bg-rose-500/30 border-2 border-rose-600 dark:border-rose-400 text-rose-950 dark:text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.4)] scale-105 font-bold"
                  : "bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30"
              }`}
            >
              <span>⚡</span>
              <span>Overwhelmed</span>
            </button>
          </div>

          {selectedMood && (
            <div className="text-[11px] text-haven-teal mt-2.5 text-right animate-fade-in flex items-center gap-1.5 justify-end">
              <Sparkles className="w-3.5 h-3.5 inline text-teal-300 flex-shrink-0" />
              <span>
                {selectedMood === "calm" && "Feeling centered and safe. Take this steady peace with you."}
                {selectedMood === "okay" && "Moving step by step. That is more than enough today."}
                {selectedMood === "anxious" && "Anxiety is natural before hearings. Haven AI and your counselor are right beside you."}
                {selectedMood === "sad" && "Your sadness is deeply honored. You don't have to carry it alone."}
                {selectedMood === "overwhelmed" && "Pause and breathe. Connect with Haven AI or Tele-MANAS (14416) for immediate comfort."}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
