import React, { useRef } from "react";
import {
  FileDescriptionIcon,
  HandHeartIcon,
  ScaleIcon,
  ShieldCheckIcon,
  ClockIcon,
  AnimatedIconHandle,
} from "@/components/icons";
import { Check } from "lucide-react";
import { useAvatar } from "@/context/AvatarContext";

interface CaseStage {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  date: string;
  status: "completed" | "current" | "upcoming";
  badge: string;
  icon: React.ComponentType<{ ref?: any; size?: number | string; className?: string }>;
}

const STAGES: CaseStage[] = [
  {
    id: "stage-1",
    stepNumber: 1,
    title: "Case Received",
    subtitle: "NHAA Docket Ingested · FIR Registered",
    date: "14 Aug 2026",
    status: "completed",
    badge: "Completed",
    icon: FileDescriptionIcon,
  },
  {
    id: "stage-2",
    stepNumber: 2,
    title: "Counselor Assigned",
    subtitle: "Dr. Ananya Sharma · Tele-MANAS Unit",
    date: "16 Aug 2026",
    status: "completed",
    badge: "Allocated",
    icon: HandHeartIcon,
  },
  {
    id: "stage-3",
    stepNumber: 3,
    title: "In Legal Progress",
    subtitle: "Pre-Trial Deposition · Fast-Track Court #3",
    date: "Active (Hearing Oct 14)",
    status: "current",
    badge: "Active Stage",
    icon: ScaleIcon,
  },
  {
    id: "stage-4",
    stepNumber: 4,
    title: "Support Connected",
    subtitle: "Section 15A Tier II Protection & Relief",
    date: "Continuous 24/7",
    status: "current",
    badge: "Protected",
    icon: ShieldCheckIcon,
  },
];

export const CaseStageRail: React.FC = () => {
  const { triggerCategory } = useAvatar();
  const stage1Ref = useRef<AnimatedIconHandle>(null);
  const stage2Ref = useRef<AnimatedIconHandle>(null);
  const stage3Ref = useRef<AnimatedIconHandle>(null);
  const stage4Ref = useRef<AnimatedIconHandle>(null);
  const stageRefs = [stage1Ref, stage2Ref, stage3Ref, stage4Ref];

  const headerClockRef = useRef<AnimatedIconHandle>(null);
  const headerScaleRef = useRef<AnimatedIconHandle>(null);

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-7 border border-teal-500/20 shadow-xl mb-6 relative overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-border/60">
        <div
          onMouseEnter={() => headerScaleRef.current?.startAnimation()}
          onMouseLeave={() => headerScaleRef.current?.stopAnimation()}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-teal-600/30 dark:border-teal-400/30 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
            <ScaleIcon ref={headerScaleRef} size={26} className="text-teal-800 dark:text-haven-teal" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg font-bold text-foreground tracking-tight group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors">
                Case Tracking Overview
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-800 dark:text-haven-teal border border-teal-500/30">
                Docket #NHAA-2026-8821
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              SC/ST (PoA) Act Statutory Timeline · Section 15A Active Witness Protection
            </p>
          </div>
        </div>

        {/* Next Hearing Countdown Pill */}
        <div
          onMouseEnter={() => headerClockRef.current?.startAnimation()}
          onMouseLeave={() => headerClockRef.current?.stopAnimation()}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-teal-50/80 dark:bg-white/[0.03] border border-teal-600/20 dark:border-teal-500/20 self-start sm:self-auto cursor-pointer group hover:border-teal-500/40 transition-colors shadow-xs"
        >
          <ClockIcon ref={headerClockRef} size={20} className="text-teal-700 dark:text-haven-teal group-hover:rotate-12 transition-transform" />
          <span className="text-xs text-foreground font-semibold">
            Next Hearing: <strong className="text-teal-800 dark:text-haven-teal">Oct 14, 2026</strong>
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold border border-amber-500/30">
            In 18 Days
          </span>
        </div>
      </div>

      {/* 
        Clean Horizontal Stepper Rail (Faithful to Sketch):
        - Connecting line runs strictly from circle center to circle center at top.
        - Circles have solid backings with ring borders so line NEVER cuts through them.
        - Text and badges sit safely BELOW the line with zero overlap or intersection!
      */}
      <div className="pt-8 pb-3 px-2 sm:px-6">
        <div className="relative">
          {/* Horizontal Track Line connecting the 4 circle centers on md+ screens */}
          <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-1 bg-slate-200 dark:bg-slate-800 rounded-full z-0">
            {/* Active completed track segment spanning to stage 3 */}
            <div className="h-full bg-gradient-to-r from-teal-500 via-teal-400 to-teal-500 rounded-full w-[67%]" />
          </div>

          {/* 4 Connected Stepper Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative z-10">
            {STAGES.map((stage, index) => {
              const Icon = stage.icon;
              const isCompleted = stage.status === "completed";
              const isCurrent = stage.status === "current";
              const currentRef = stageRefs[index];

              return (
                <div
                  key={stage.id}
                  onMouseEnter={() => {
                    currentRef.current?.startAnimation();
                    triggerCategory("inspect");
                  }}
                  onMouseLeave={() => currentRef.current?.stopAnimation()}
                  className="flex flex-col items-center text-center group cursor-pointer p-3 rounded-2xl transition-all duration-300 hover:bg-teal-50/60 dark:hover:bg-white/[0.03] hover:shadow-sm"
                >
                  {/* Circle Node with Ring Border to isolate from the rail line */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 group-hover:scale-110 shadow-md ring-4 ring-white dark:ring-slate-900 ${
                      isCompleted
                        ? "bg-teal-600 text-white dark:bg-haven-teal dark:text-slate-950"
                        : isCurrent
                        ? "bg-teal-500/20 text-teal-800 dark:text-haven-teal border-2 border-teal-600 dark:border-haven-teal ring-teal-500/30"
                        : "bg-slate-200 dark:bg-slate-800 text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 stroke-[3]" />
                    ) : (
                      <span>{stage.stepNumber}</span>
                    )}
                  </div>

                  {/* Stage Number & Badge */}
                  <div className="flex items-center gap-1.5 mt-3 mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Stage {stage.stepNumber}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                        isCurrent
                          ? "bg-teal-600/15 text-teal-800 dark:text-haven-teal border-teal-600/30 dark:border-teal-400/30 animate-pulse"
                          : isCompleted
                          ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border-emerald-500/30"
                          : "bg-slate-200 dark:bg-slate-800 text-muted-foreground border-transparent"
                      }`}
                    >
                      {stage.badge}
                    </span>
                  </div>

                  {/* Prominent Stage Animated Icon & Title */}
                  <div className="flex flex-col items-center gap-2 mb-1.5">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-800 dark:text-haven-teal group-hover:scale-110 group-hover:border-teal-500/50 transition-all duration-300 shadow-xs">
                      <Icon
                        ref={currentRef}
                        size={22}
                        className="text-teal-800 dark:text-haven-teal"
                      />
                    </div>
                    <h2 className="text-sm font-bold text-foreground group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors">
                      {stage.title}
                    </h2>
                  </div>

                  {/* Subtitle & Date Stamp */}
                  <p className="text-[11px] text-muted-foreground leading-snug max-w-[210px]">
                    {stage.subtitle}
                  </p>
                  <span className="text-[10px] font-semibold text-teal-700/80 dark:text-haven-teal/80 mt-1.5">
                    {stage.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
