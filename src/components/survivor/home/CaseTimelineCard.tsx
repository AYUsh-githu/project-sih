import React, { useState, useRef } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import {
  FileDescriptionIcon,
  ShieldCheckIcon,
  ScaleIcon,
  ClockIcon,
  TriangleAlertIcon,
  ArrowRightIcon,
  RupeeIcon,
  AnimatedIconHandle,
} from "@/components/icons";
import { useAvatar } from "@/context/AvatarContext";

interface TimelineStep {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  status: "completed" | "current" | "upcoming";
  reliefInfo?: string;
  details: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: "fir",
    title: "FIR Registered",
    subtitle: "Section 3(1)(r)(s) SC/ST PoA Act",
    date: "14 Aug 2026",
    status: "completed",
    reliefInfo: "Stage 1 Relief: ₹1,25,000 Disbursed to Bank A/C",
    details: "First Information Report filed at Central District PS. Immediate medical checkup completed. NHAA docket opened.",
  },
  {
    id: "chargesheet",
    title: "Investigation & Charge Sheet",
    subtitle: "Submitted by DySP within 60-day limit",
    date: "28 Sep 2026",
    status: "completed",
    reliefInfo: "Stage 2 Relief: ₹2,50,000 Approved & In Transit",
    details: "Forensic evidence and witness statements catalogued. Charge sheet submitted to the Designated Special Court.",
  },
  {
    id: "trial",
    title: "Special Court Hearing",
    subtitle: "Active Stage · Fast-Track Special Court #3",
    date: "12 Oct 2026 (Next Hearing)",
    status: "current",
    reliefInfo: "Travel & Daily Allowance (TA/DA) Provided",
    details: "Pre-trial conference scheduled. Witness protection protocol under Section 15A verified with local Superintendent of Police.",
  },
  {
    id: "rehabilitation",
    title: "Final Verdict & Rehabilitation",
    subtitle: "Restoration & Post-Trial Welfare",
    date: "Pending Trial Conclusion",
    status: "upcoming",
    reliefInfo: "Stage 3 Relief: Balance ₹5,00,000 + Housing/Vocational Grant",
    details: "District Level Vigilance and Monitoring Committee ensures full economic rehabilitation and government scheme enrollment.",
  },
];

interface CaseTimelineCardProps {
  onReportThreat?: () => void;
}

export const CaseTimelineCard: React.FC<CaseTimelineCardProps> = ({
  onReportThreat,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReliefModal, setShowReliefModal] = useState(false);
  const { triggerCategory } = useAvatar();

  const handleToggleExpand = () => {
    triggerCategory("inspect");
    setIsExpanded((prev) => !prev);
  };

  const handleOpenRelief = () => {
    triggerCategory("inspect");
    setShowReliefModal(true);
  };

  // Animated icon refs for container-level trigger
  const fileIconRef = useRef<AnimatedIconHandle>(null);
  const sec15aRef = useRef<AnimatedIconHandle>(null);
  const dlsaRef = useRef<AnimatedIconHandle>(null);
  const activeStepClockRef = useRef<AnimatedIconHandle>(null);
  const nextActionClockRef = useRef<AnimatedIconHandle>(null);
  const reportThreatRef = useRef<AnimatedIconHandle>(null);
  const reliefScaleRef = useRef<AnimatedIconHandle>(null);
  const viewDetailsArrowRef = useRef<AnimatedIconHandle>(null);

  return (
    <div className="glass-card p-6 sm:p-8 rounded-2xl border border-teal-500/20 shadow-xl mb-6 relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/50">
        <div>
          <div
            className="flex items-center gap-2 mb-1.5 cursor-pointer group"
            onMouseEnter={() => fileIconRef.current?.startAnimation()}
            onMouseLeave={() => fileIconRef.current?.stopAnimation()}
          >
            <span className="w-8 h-8 rounded-lg bg-teal-500/15 dark:bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-700 dark:text-haven-teal transition-transform duration-300 group-hover:scale-110">
              <FileDescriptionIcon ref={fileIconRef} size={18} />
            </span>
            <h2 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-teal-700 dark:group-hover:text-haven-teal">
              My Case Timeline
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-800 dark:text-haven-teal font-semibold">
              Stage 3 of 4
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-muted-foreground">
            Special Court Fast-Track Proceedings · Special Case No. SC-412/2026
          </p>
        </div>

        {/* Protection & DLSA Status Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/25 text-teal-800 dark:text-haven-teal text-xs font-semibold cursor-pointer transition-all duration-300 hover:bg-teal-500/15 hover:border-teal-500/40 hover:shadow-glow-teal"
            onMouseEnter={() => sec15aRef.current?.startAnimation()}
            onMouseLeave={() => sec15aRef.current?.stopAnimation()}
          >
            <ShieldCheckIcon ref={sec15aRef} size={16} className="text-teal-700 dark:text-teal-400" />
            <span>Sec 15A Protection Active</span>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-800 dark:text-cyan-300 text-xs font-semibold cursor-pointer transition-all duration-300 hover:bg-cyan-500/15 hover:border-cyan-500/40"
            onMouseEnter={() => dlsaRef.current?.startAnimation()}
            onMouseLeave={() => dlsaRef.current?.stopAnimation()}
          >
            <ScaleIcon ref={dlsaRef} size={16} className="text-cyan-700 dark:text-cyan-400" />
            <span>Free Legal Aid (DLSA)</span>
          </div>
        </div>
      </div>

      {/* Interactive Horizontal Stepper & Timeline (Dedicated track, zero container overlay) */}
      <div className="py-4">
        {/* DESKTOP TIMELINE (md:block): Line and nodes are on their own clean track, cards sit cleanly below */}
        <div className="hidden md:block">
          {/* Stepper Track */}
          <div className="relative pt-2 pb-6 px-4">
            {/* Background Rail connecting centers of Col 1 (12.5%) to Col 4 (87.5%) */}
            <div className="absolute top-[28px] left-[12.5%] right-[12.5%] h-1 bg-border/60 dark:bg-slate-700/60 rounded-full z-0">
              {/* Progress fill from Step 1 to Active Step 3 (66.66% of the track length) */}
              <div
                className="h-full bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 rounded-full shadow-[0_0_12px_rgba(94,234,212,0.5)] transition-all duration-700"
                style={{ width: "66.66%" }}
              />
            </div>

            {/* Stepper Nodes */}
            <div className="grid grid-cols-4 relative z-10">
              {TIMELINE_STEPS.map((step, index) => {
                const isDone = step.status === "completed";
                const isCurrent = step.status === "current";

                return (
                  <div key={step.id} className="flex flex-col items-center">
                    {/* Circle Node */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ring-4 ring-card ${
                        isDone
                          ? "bg-teal-500 text-slate-950 shadow-glow-teal"
                          : isCurrent
                          ? "bg-teal-500/20 border-2 border-teal-400 text-haven-teal shadow-[0_0_20px_rgba(94,234,212,0.4)] animate-pulse-gentle"
                          : "bg-slate-100 dark:bg-slate-800/90 border border-slate-300/80 dark:border-border text-slate-500 dark:text-muted-foreground"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-6 h-6 text-slate-950 stroke-[2.5]" />
                      ) : isCurrent ? (
                        <ClockIcon ref={activeStepClockRef} size={22} className="text-teal-700 dark:text-haven-teal" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>

                    {/* Node Status Badge */}
                    <div className="mt-2.5 flex items-center gap-1.5">
                      {isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 animate-ping inline-block" />
                      )}
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider ${
                          isCurrent
                            ? "text-teal-800 dark:text-haven-teal"
                            : isDone
                            ? "text-teal-700 dark:text-teal-400/90"
                            : "text-slate-500 dark:text-muted-foreground/70"
                        }`}
                      >
                        {isCurrent ? "Active Stage" : isDone ? "Completed" : "Upcoming"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Cards Grid: Cleanly separated below the stepper track without any line overlay */}
          <div className="grid grid-cols-4 gap-4 mt-2">
            {TIMELINE_STEPS.map((step, index) => {
              const isDone = step.status === "completed";
              const isCurrent = step.status === "current";

              return (
                <div
                  key={step.id}
                  onMouseEnter={() => {
                    if (isCurrent) activeStepClockRef.current?.startAnimation();
                  }}
                  onMouseLeave={() => {
                    if (isCurrent) activeStepClockRef.current?.stopAnimation();
                  }}
                  className={`flex flex-col justify-between p-4 rounded-xl transition-all duration-300 ${
                    isCurrent
                      ? "bg-teal-500/[0.08] border-2 border-teal-500/40 shadow-[0_0_25px_rgba(94,234,212,0.12)] -translate-y-1"
                      : "bg-white/[0.02] border border-border/30 hover:border-border/60 hover:bg-white/[0.03]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold mb-1.5">
                      <span
                        className={
                          isCurrent
                            ? "text-haven-teal font-bold"
                            : isDone
                            ? "text-teal-400"
                            : "text-muted-foreground"
                        }
                      >
                        Stage {index + 1}
                      </span>
                      <span
                        className={`text-[11px] ${
                          isCurrent ? "text-haven-teal font-bold" : "text-muted-foreground"
                        }`}
                      >
                        {step.date}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-foreground mb-1 leading-snug">
                      {step.title}
                    </h4>

                    <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                      {step.subtitle}
                    </p>
                  </div>

                  {step.reliefInfo && (
                    <div
                      className={`mt-auto pt-2.5 border-t ${
                        isCurrent ? "border-teal-500/20" : "border-border/30"
                      }`}
                    >
                      <span
                        className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-md ${
                          isCurrent
                            ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-300"
                            : isDone
                            ? "bg-teal-500/10 border border-teal-500/20 text-teal-300"
                            : "bg-white/5 border border-border/30 text-muted-foreground"
                        }`}
                      >
                        {step.reliefInfo}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE TIMELINE (md:hidden): Vertical stepper connecting rail down the left */}
        <div className="md:hidden relative pl-2 space-y-4">
          {/* Continuous vertical connecting line from center of Node 1 to Node 4 */}
          <div className="absolute top-5 bottom-5 left-[23px] w-0.5 bg-border/60 dark:bg-slate-700/60 z-0">
            {/* Active vertical progress line (Step 1 to Step 3 = ~66%) */}
            <div className="w-full bg-gradient-to-b from-teal-500 via-cyan-400 to-teal-400 h-[66.7%]" />
          </div>

          {TIMELINE_STEPS.map((step, index) => {
            const isDone = step.status === "completed";
            const isCurrent = step.status === "current";

            return (
              <div key={step.id} className="relative flex items-start gap-3 z-10">
                {/* Node Circle */}
                <div
                  className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs ring-4 ring-card transition-all ${
                    isDone
                      ? "bg-teal-500 text-slate-950 shadow-glow-teal"
                      : isCurrent
                      ? "bg-teal-500/20 border-2 border-teal-400 text-haven-teal shadow-[0_0_15px_rgba(94,234,212,0.4)] animate-pulse-gentle"
                      : "bg-slate-100 dark:bg-slate-800/90 border border-slate-300/80 dark:border-border text-slate-500 dark:text-muted-foreground"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  ) : isCurrent ? (
                    <ClockIcon size={18} className="text-haven-teal" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Content Card to the right */}
                <div
                  className={`flex-1 p-3.5 rounded-xl border transition-all ${
                    isCurrent
                      ? "bg-teal-500/[0.08] border-teal-500/40 shadow-lg"
                      : "bg-white/[0.02] border-border/30 hover:border-border/60"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                    <span
                      className={
                        isCurrent
                          ? "text-haven-teal font-bold"
                          : isDone
                          ? "text-teal-400"
                          : "text-muted-foreground"
                      }
                    >
                      Stage {index + 1} · {isCurrent ? "Active" : isDone ? "Completed" : "Upcoming"}
                    </span>
                    <span
                      className={`text-[11px] ${
                        isCurrent ? "text-haven-teal font-bold" : "text-muted-foreground"
                      }`}
                    >
                      {step.date}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-foreground mb-0.5">{step.title}</h4>

                  <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                    {step.subtitle}
                  </p>

                  {step.reliefInfo && (
                    <span
                      className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-md ${
                        isCurrent
                          ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-300"
                          : isDone
                          ? "bg-teal-500/10 border border-teal-500/20 text-teal-300"
                          : "bg-white/5 border border-border/30 text-muted-foreground"
                      }`}
                    >
                      {step.reliefInfo}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-Column Action & Financial Relief Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Next Critical Action (7 cols) */}
        <div
          className="lg:col-span-7 bg-amber-50/70 dark:bg-black/40 rounded-xl p-4 sm:p-5 border border-amber-300/50 dark:border-teal-500/15 flex flex-col justify-between transition-all duration-300 hover:border-amber-400/60 dark:hover:border-amber-400/40 shadow-xs dark:shadow-none"
          onMouseEnter={() => nextActionClockRef.current?.startAnimation()}
          onMouseLeave={() => nextActionClockRef.current?.stopAnimation()}
        >
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 dark:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-700 dark:text-amber-300 flex-shrink-0 mt-0.5">
                  <ClockIcon ref={nextActionClockRef} size={18} className="text-amber-700 dark:text-amber-300" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    Next Critical Action
                  </div>
                  <p className="text-sm text-foreground font-medium mt-0.5">
                    Special Court Hearing on <span className="text-teal-700 dark:text-haven-teal font-bold">12 October 2026, 10:30 AM</span> at District Sessions Court.
                  </p>
                  <p className="text-xs text-slate-600 dark:text-muted-foreground mt-0.5">
                    Designated Police Escort assigned · Advocate Shri M. K. Rao (DLSA) will represent you.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 mt-2 sm:mt-0">
                <button
                  type="button"
                  onClick={handleToggleExpand}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card text-xs font-semibold text-foreground hover:text-teal-700 dark:hover:text-haven-teal cursor-pointer transition-colors"
                >
                  <span>{isExpanded ? "Hide Details" : "Case Record"}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {onReportThreat && (
                  <button
                    type="button"
                    onClick={onReportThreat}
                    onMouseEnter={() => reportThreatRef.current?.startAnimation()}
                    onMouseLeave={() => reportThreatRef.current?.stopAnimation()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-300 hover:bg-rose-500/25 text-xs font-semibold cursor-pointer transition-colors"
                    title="Report any harassment, intimidation, or threat to the Special Protection Cell"
                  >
                    <TriangleAlertIcon ref={reportThreatRef} size={15} className="text-rose-600 dark:text-rose-400" />
                    <span className="hidden sm:inline">Report Threat</span>
                  </button>
                )}
              </div>
            </div>

            {/* Expanded Case Details */}
            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-border/50 text-xs sm:text-sm space-y-3 animate-scale-in text-slate-600 dark:text-muted-foreground">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-2.5 rounded-lg bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-border/40">
                    <span className="text-[10px] text-slate-500 dark:text-muted-foreground uppercase block font-semibold">Special Court</span>
                    <span className="text-foreground font-medium text-xs">Court Hall 2, District Complex</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-border/40">
                    <span className="text-[10px] text-slate-500 dark:text-muted-foreground uppercase block font-semibold">Legal Aid Advocate</span>
                    <span className="text-foreground font-medium text-xs">Adv. M. K. Rao (+91 98480 23114)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-border/40">
                    <span className="text-[10px] text-slate-500 dark:text-muted-foreground uppercase block font-semibold">Protection Officer</span>
                    <span className="text-foreground font-medium text-xs">Inspector R. Verma (Escort Unit)</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-muted-foreground/80 leading-relaxed italic">
                  * Under Section 15A(6)(a) of the SC/ST PoA Act, you have the right to reasonable, accurate, and timely notice of any court proceeding and continuous protection from intimidation.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Financial Compensation Relief Donut Gauge (5 cols) */}
        <div
          className="lg:col-span-5 glass-card rounded-xl p-4 sm:p-5 border border-teal-500/25 relative overflow-hidden flex flex-col justify-between shadow-lg transition-all duration-300 hover:border-teal-400/50"
          onMouseEnter={() => reliefScaleRef.current?.startAnimation()}
          onMouseLeave={() => reliefScaleRef.current?.stopAnimation()}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/15 dark:bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-700 dark:text-haven-teal">
                <RupeeIcon ref={reliefScaleRef} size={18} className="text-teal-700 dark:text-teal-300" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  Financial Compensation Relief
                </h3>
                <span className="text-[10px] text-slate-500 dark:text-muted-foreground">
                  Statutory support for your recovery
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenRelief}
              onMouseEnter={() => viewDetailsArrowRef.current?.startAnimation()}
              onMouseLeave={() => viewDetailsArrowRef.current?.stopAnimation()}
              className="text-xs font-semibold text-teal-700 dark:text-haven-teal hover:text-teal-900 dark:hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer transition-colors group"
            >
              <span>View details</span>
              <ArrowRightIcon ref={viewDetailsArrowRef} size={14} className="text-teal-700 dark:text-haven-teal group-hover:text-teal-900 dark:group-hover:text-cyan-300" />
            </button>
          </div>

          <div className="flex items-center gap-4 py-2">
            {/* SVG Circular Progress Gauge (75% Disbursed) */}
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-slate-200 dark:text-slate-800/80"
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="url(#reliefGaugeGrad)"
                  strokeWidth="6"
                  strokeDasharray="201.06"
                  strokeDashoffset="50.26"
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                  fill="none"
                />
                <defs>
                  <linearGradient id="reliefGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-extrabold text-foreground leading-none">
                  75%
                </span>
                <span className="text-[8px] uppercase tracking-wider text-teal-700 dark:text-teal-400 font-bold mt-0.5">
                  Paid
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xl font-extrabold text-foreground tracking-tight">
                ₹ 3,75,000
              </div>
              <div className="text-xs text-slate-600 dark:text-muted-foreground">
                Disbursed of <span className="text-foreground font-semibold">₹ 5,00,000</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-[10px] text-emerald-800 dark:text-emerald-400 font-semibold bg-emerald-500/15 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25 dark:border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <span>Stage 1 & 2 Released · Stage 3 on Verdict</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Relief Details Modal */}
      {showReliefModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowReliefModal(false);
          }}
        >
          <div className="glass-card p-6 sm:p-8 max-w-lg w-full relative border border-teal-500/30 animate-modal-in shadow-2xl bg-slate-900/95 text-foreground rounded-2xl">
            <button
              type="button"
              onClick={() => setShowReliefModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <ScaleIcon size={20} className="text-haven-teal" />
              <h3 className="text-lg font-bold text-foreground">
                Statutory Compensation & Relief Schedule
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Under Scheduled Castes & Scheduled Tribes (Prevention of Atrocities) Amendment Rules 2016 (Annexure-I). Relief is disbursed directly to your bank account via PFMS.
            </p>

            <div className="space-y-3 mb-6">
              {/* Stage 1 */}
              <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/25">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-haven-teal">Stage 1: FIR Registration (25%)</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">₹ 1,25,000 · Paid</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Disbursed on 14 Aug 2026 directly into Aadhaar-linked Bank Account following medical report.
                </p>
              </div>

              {/* Stage 2 */}
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/25">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-cyan-300">Stage 2: Charge Sheet to Court (50%)</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">₹ 2,50,000 · Approved</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Approved on 28 Sep 2026 upon DySP submission of investigation docket to Special Court #3.
                </p>
              </div>

              {/* Stage 3 */}
              <div className="p-3 rounded-xl bg-white/5 border border-border/40">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-foreground">Stage 3: Verdict & Rehabilitation (25%)</span>
                  <span className="text-xs font-mono font-bold text-muted-foreground">₹ 1,25,000 · Pending</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Disbursed upon conclusion of trial. Additionally entitles survivor to social welfare schemes, housing, and livelihood support under Rule 12(4).
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowReliefModal(false)}
                className="btn-primary text-xs font-semibold text-slate-950 px-5 py-2 cursor-pointer"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
