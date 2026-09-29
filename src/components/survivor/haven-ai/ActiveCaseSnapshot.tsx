import React, { useRef } from "react";
import {
  ScaleIcon,
  ShieldCheckIcon,
  HandHeartIcon,
  CalendarIcon,
  PhoneIcon,
  TriangleAlertIcon,
  ArrowRightIcon,
  AnimatedIconHandle,
} from "@/components/icons";
import { MapPin, User, FileText } from "lucide-react";

interface ActiveCaseSnapshotProps {
  onAskHaven: (prompt: string) => void;
  onOpenThreatReport: () => void;
  onOpenCounselor: () => void;
}

export const ActiveCaseSnapshot: React.FC<ActiveCaseSnapshotProps> = ({
  onAskHaven,
  onOpenThreatReport,
  onOpenCounselor,
}) => {
  const scaleRef = useRef<AnimatedIconHandle>(null);
  const shieldRef = useRef<AnimatedIconHandle>(null);
  const counselorRef = useRef<AnimatedIconHandle>(null);
  const threatRef = useRef<AnimatedIconHandle>(null);
  const arrow1Ref = useRef<AnimatedIconHandle>(null);
  const arrow2Ref = useRef<AnimatedIconHandle>(null);

  return (
    <div className="glass-card rounded-2xl p-5 border border-teal-500/20 shadow-xl flex flex-col justify-between space-y-4">
      {/* 1. Header with Case ID */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-bold text-foreground tracking-tight">
            Active Case Snapshot
          </h3>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-teal-500/15 text-teal-800 dark:text-haven-teal border border-teal-500/30">
            NHAA-2026-8821
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground">
          Special Court Proceedings · Section 15A Protected
        </p>
      </div>

      {/* 2. Next Hearing Card (From Sketch) */}
      <div
        className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-black/30 border border-teal-600/20 dark:border-teal-500/20 group hover:border-teal-600/40 dark:hover:border-teal-400/40 transition-all cursor-default"
        onMouseEnter={() => {
          scaleRef.current?.startAnimation();
          arrow1Ref.current?.startAnimation();
        }}
        onMouseLeave={() => {
          scaleRef.current?.stopAnimation();
          arrow1Ref.current?.stopAnimation();
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-800 dark:text-haven-teal">
              <ScaleIcon ref={scaleRef} size={15} className="text-teal-800 dark:text-haven-teal" />
            </div>
            <span className="text-xs font-bold text-foreground">Next Hearing</span>
          </div>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
            In 18 Days
          </span>
        </div>

        <div className="space-y-1 text-[11px] mb-3">
          <div className="flex items-center gap-1.5 text-foreground font-semibold">
            <CalendarIcon size={12} className="text-teal-700 dark:text-haven-teal flex-shrink-0" />
            <span>October 14, 2026 · 10:30 AM</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <span>Special Sessions Court #4, District Complex</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <FileText className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <span>Examination-in-Chief & Deposition</span>
          </div>
        </div>

        {/* Quick Trigger to Ask Haven AI */}
        <button
          type="button"
          onClick={() =>
            onAskHaven(
              "How should I prepare for my examination-in-chief and deposition on October 14?"
            )
          }
          className="w-full py-1.5 px-2.5 rounded-lg bg-white/90 dark:bg-white/5 hover:bg-teal-500/15 border border-teal-600/25 dark:border-teal-500/25 text-teal-800 dark:text-haven-teal text-[11px] font-semibold flex items-center justify-between transition-colors cursor-pointer"
        >
          <span>Ask Haven to prepare questions</span>
          <ArrowRightIcon ref={arrow1Ref} size={12} className="text-teal-800 dark:text-haven-teal" />
        </button>
      </div>

      {/* 3. Protection Tier Card (From Sketch) */}
      <div
        className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-black/30 border border-teal-600/20 dark:border-teal-500/20 group hover:border-teal-600/40 dark:hover:border-teal-400/40 transition-all cursor-default"
        onMouseEnter={() => {
          shieldRef.current?.startAnimation();
          threatRef.current?.startAnimation();
        }}
        onMouseLeave={() => {
          shieldRef.current?.stopAnimation();
          threatRef.current?.stopAnimation();
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-800 dark:text-emerald-400">
              <ShieldCheckIcon ref={shieldRef} size={15} className="text-emerald-800 dark:text-emerald-400" />
            </div>
            <span className="text-xs font-bold text-foreground">Protection Tier</span>
          </div>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border border-emerald-500/30">
            Tier II Active
          </span>
        </div>

        <div className="space-y-1 text-[11px] text-muted-foreground mb-3">
          <p className="leading-relaxed">
            State-mandated residential patrol & secure transport on hearing days.
          </p>
          <div className="flex items-center gap-1.5 text-foreground font-medium pt-1">
            <User className="w-3 h-3 text-teal-700 dark:text-haven-teal flex-shrink-0" />
            <span>SI R. Deshmukh · Special Cell</span>
          </div>
        </div>

        {/* Threat Escalation Action */}
        <button
          type="button"
          onClick={onOpenThreatReport}
          className="w-full py-1.5 px-2.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-[11px] font-semibold flex items-center justify-between transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <TriangleAlertIcon ref={threatRef} size={12} className="text-rose-600 dark:text-rose-400" />
            <span>Report Intimidation / Threat</span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider">Priority</span>
        </button>
      </div>

      {/* 4. Assigned Care Coordinator Card */}
      <div
        className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-black/30 border border-teal-600/20 dark:border-teal-500/20 group hover:border-teal-600/40 dark:hover:border-teal-400/40 transition-all cursor-default"
        onMouseEnter={() => {
          counselorRef.current?.startAnimation();
          arrow2Ref.current?.startAnimation();
        }}
        onMouseLeave={() => {
          counselorRef.current?.stopAnimation();
          arrow2Ref.current?.stopAnimation();
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-800 dark:text-haven-teal">
              <HandHeartIcon ref={counselorRef} size={15} className="text-teal-800 dark:text-haven-teal" />
            </div>
            <span className="text-xs font-bold text-foreground">Support Counselor</span>
          </div>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-teal-500/15 text-teal-800 dark:text-haven-teal border border-teal-500/30">
            Assigned
          </span>
        </div>

        <p className="text-[11px] text-muted-foreground mb-3">
          Dr. Ananya Sharma · District Mental Health Unit (Tele-MANAS)
        </p>

        <button
          type="button"
          onClick={onOpenCounselor}
          className="w-full py-1.5 px-2.5 rounded-lg bg-white/90 dark:bg-white/5 hover:bg-teal-500/15 border border-teal-600/25 dark:border-teal-500/25 text-teal-800 dark:text-haven-teal text-[11px] font-semibold flex items-center justify-between transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <PhoneIcon size={12} className="text-teal-700 dark:text-haven-teal" />
            <span>Connect with Counselor</span>
          </span>
          <ArrowRightIcon ref={arrow2Ref} size={12} className="text-teal-800 dark:text-haven-teal" />
        </button>
      </div>
    </div>
  );
};
