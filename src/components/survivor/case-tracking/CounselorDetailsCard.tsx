import React, { useRef } from "react";
import {
  HandHeartIcon,
  CalendarIcon,
  PhoneIcon,
  SparklesIcon,
  ShieldCheckIcon,
  AnimatedIconHandle,
} from "@/components/icons";
import { UserCheck, Clock, Award, Video } from "lucide-react";

interface CounselorDetailsCardProps {
  onOpenCounselorModal?: () => void;
  onAskHaven?: (prompt: string) => void;
}

export const CounselorDetailsCard: React.FC<CounselorDetailsCardProps> = ({
  onOpenCounselorModal,
  onAskHaven,
}) => {
  const cardHeartRef = useRef<AnimatedIconHandle>(null);
  const calendarRef = useRef<AnimatedIconHandle>(null);
  const phoneRef = useRef<AnimatedIconHandle>(null);
  const sparklesRef = useRef<AnimatedIconHandle>(null);
  const shieldRef = useRef<AnimatedIconHandle>(null);

  const handleHavenPrep = () => {
    if (onAskHaven) {
      onAskHaven(
        "I have a scheduled counseling session with Dr. Ananya Sharma on Oct 02. Can you help me organize my thoughts and prepare questions about my court anxiety?"
      );
    }
  };

  return (
    <div
      onMouseEnter={() => cardHeartRef.current?.startAnimation()}
      onMouseLeave={() => cardHeartRef.current?.stopAnimation()}
      className="glass-card rounded-2xl p-6 border border-teal-500/20 shadow-xl relative overflow-hidden flex flex-col justify-between h-full"
    >
      {/* Background Ambient Glow */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Card Header */}
        <div
          onMouseEnter={() => cardHeartRef.current?.startAnimation()}
          onMouseLeave={() => cardHeartRef.current?.stopAnimation()}
          className="flex items-center justify-between pb-4 border-b border-border/50 cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-teal-600/30 dark:border-teal-400/30 flex items-center justify-center text-teal-800 dark:text-haven-teal group-hover:scale-105 transition-transform shadow-sm">
              <HandHeartIcon ref={cardHeartRef} size={26} className="text-teal-800 dark:text-haven-teal" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground tracking-tight group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors">
                Assigned Support Counselor
              </h2>
              <p className="text-[11px] text-muted-foreground">
                Designated District Mental Health Specialist · Tele-MANAS
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border border-emerald-500/30">
            <UserCheck className="w-3.5 h-3.5" />
            Active Care
          </span>
        </div>

        {/* Counselor Profile Details */}
        <div className="pt-5 pb-4">
          <div className="flex items-start gap-4">
            {/* Avatar Badge */}
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-700/30 border-2 border-teal-500/40 flex items-center justify-center text-lg font-bold text-teal-900 dark:text-teal-200 shadow-sm">
                AS
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
            </div>

            {/* Bio & Credential Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-foreground">
                  Dr. Ananya Sharma
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/10 text-teal-800 dark:text-teal-300 font-semibold border border-teal-500/20">
                  Ph.D. Clinical Psychology
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                District Mental Health Unit (DMHU) · Trauma & Victim Recovery
              </p>

              <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-teal-700 dark:text-haven-teal" />
                  Reg #DMHU-2024-819
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-teal-700 dark:text-haven-teal" />
                  Assigned 16 Aug 2026
                </span>
              </div>
            </div>
          </div>

          {/* Upcoming Consultation Box */}
          <div
            onMouseEnter={() => calendarRef.current?.startAnimation()}
            onMouseLeave={() => calendarRef.current?.stopAnimation()}
            className="mt-4 p-4 rounded-xl bg-teal-50/80 dark:bg-white/[0.02] border border-teal-600/20 dark:border-teal-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group hover:border-teal-500/40 hover:bg-teal-50 dark:hover:bg-white/[0.04] transition-all shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0 group-hover:scale-110 transition-transform shadow-xs">
                <CalendarIcon ref={calendarRef} size={22} className="text-teal-800 dark:text-haven-teal" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground block">
                  Next Scheduled Consultation
                </span>
                <span className="text-xs font-bold text-foreground group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors">
                  Wednesday, 02 Oct 2026 · 11:30 AM
                </span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-600/10 dark:bg-teal-400/15 text-teal-800 dark:text-haven-teal border border-teal-600/20 self-start sm:self-auto">
              <Video className="w-3.5 h-3.5" />
              Encrypted Tele-Consult
            </span>
          </div>

          {/* Privacy Guarantee Pill */}
          <div
            onMouseEnter={() => shieldRef.current?.startAnimation()}
            onMouseLeave={() => shieldRef.current?.stopAnimation()}
            className="mt-3.5 flex items-center gap-2 text-[11px] text-muted-foreground cursor-pointer group p-1.5 rounded-lg hover:bg-teal-50/50 dark:hover:bg-white/[0.02] transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <ShieldCheckIcon ref={shieldRef} size={18} className="text-teal-700 dark:text-haven-teal" />
            </div>
            <span className="group-hover:text-foreground transition-colors">
              All psychological notes are client-side encrypted and strictly protected under DPDP Act 2025.
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-border/50 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={onOpenCounselorModal}
          onMouseEnter={() => phoneRef.current?.startAnimation()}
          onMouseLeave={() => phoneRef.current?.stopAnimation()}
          className="btn-primary py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold cursor-pointer group shadow-sm"
        >
          <PhoneIcon ref={phoneRef} size={18} className="text-slate-950 group-hover:scale-110 transition-transform" />
          <span>Book / Reschedule</span>
        </button>

        <button
          type="button"
          onClick={handleHavenPrep}
          onMouseEnter={() => sparklesRef.current?.startAnimation()}
          onMouseLeave={() => sparklesRef.current?.stopAnimation()}
          className="py-2.5 px-4 rounded-xl bg-white/80 dark:bg-white/[0.04] border border-teal-600/20 dark:border-teal-500/20 hover:border-teal-600/40 text-foreground hover:text-teal-800 dark:hover:text-haven-teal text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer group shadow-sm"
        >
          <SparklesIcon ref={sparklesRef} size={18} className="text-teal-800 dark:text-haven-teal group-hover:scale-110 transition-transform" />
          <span>Prep with Haven AI</span>
        </button>
      </div>
    </div>
  );
};
