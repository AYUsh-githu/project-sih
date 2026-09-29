import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  SparklesIcon,
  BookIcon,
  HandHeartIcon,
  MessageSquareIcon,
  ShieldCheckIcon,
  CalendarIcon,
  ArrowRightIcon,
} from "@/components/icons";
import type { AnimatedIconHandle } from "@/components/icons/types";

interface QuickActionsGridProps {
  onOpenCounselorModal: () => void;
}

export const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({
  onOpenCounselorModal,
}) => {
  const sparklesRef = useRef<AnimatedIconHandle>(null);
  const bookRef = useRef<AnimatedIconHandle>(null);
  const heartRef = useRef<AnimatedIconHandle>(null);
  const msgRef = useRef<AnimatedIconHandle>(null);
  const arrow1Ref = useRef<AnimatedIconHandle>(null);
  const arrow2Ref = useRef<AnimatedIconHandle>(null);
  const arrow3Ref = useRef<AnimatedIconHandle>(null);
  const calRef = useRef<AnimatedIconHandle>(null);

  // Tilt & Mouse Spotlight handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = ((y - centerY) / centerY) * -6;
    const ry = ((x - centerX) / centerX) * 6;
    e.currentTarget.style.setProperty("--tilt-rx", `${rx.toFixed(2)}deg`);
    e.currentTarget.style.setProperty("--tilt-ry", `${ry.toFixed(2)}deg`);
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--tilt-rx", "0deg");
    e.currentTarget.style.setProperty("--tilt-ry", "0deg");
  };

  return (
    <section aria-label="Quick Actions" className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* 1. Haven AI */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={(e) => {
            handleMouseLeave(e);
            sparklesRef.current?.stopAnimation();
            msgRef.current?.stopAnimation();
            arrow1Ref.current?.stopAnimation();
          }}
          onMouseEnter={() => {
            sparklesRef.current?.startAnimation();
            msgRef.current?.startAnimation();
            arrow1Ref.current?.startAnimation();
          }}
          className="glass-card tilt-card group p-6 rounded-2xl border border-teal-500/25 hover:border-teal-400/60 flex flex-col justify-between transition-all duration-300 relative overflow-hidden shadow-lg cursor-pointer"
          style={{
            background:
              "radial-gradient(circle 260px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(94, 234, 212, 0.12), transparent 80%), var(--glass-bg)",
          }}
        >
          {/* Subtle Ambient Aura */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-teal-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-teal-400/25 transition-all" />

          <div>
            <div className="flex items-start justify-between mb-4">
              {/* Holographic Glowing Haven AI Orb */}
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500/30 via-cyan-500/20 to-indigo-500/20 border border-teal-400/40 flex items-center justify-center text-haven-teal shadow-[0_0_20px_rgba(94,234,212,0.25)] group-hover:shadow-[0_0_28px_rgba(94,234,212,0.45)] group-hover:scale-105 transition-all duration-300">
                  <SparklesIcon ref={sparklesRef} size={26} className="w-6 h-6 text-teal-300" />
                </div>
                {/* Live micro status dot */}
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
              </div>

              <span className="text-[11px] font-semibold tracking-wider text-teal-800 dark:text-teal-300 bg-teal-500/15 px-3 py-1 rounded-full border border-teal-500/30 shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 animate-ping" />
                <span>Always here</span>
              </span>
            </div>

            <h2 className="text-lg font-bold text-foreground mb-1 tracking-tight group-hover:text-teal-700 dark:group-hover:text-haven-teal transition-colors">
              Haven AI
            </h2>
            <p className="text-xs text-teal-700 dark:text-haven-teal/90 font-semibold mb-1">
              Your voice & text companion
            </p>
            <p className="text-xs text-slate-600 dark:text-muted-foreground leading-relaxed mb-4">
              Talk, vent, or just be. Safe, completely confidential, whenever you need.
            </p>
          </div>

          <Link
            to="/survivor/haven-ai"
            className="inline-flex items-center justify-between text-xs sm:text-sm font-semibold text-teal-700 dark:text-haven-teal hover:text-teal-900 dark:hover:text-cyan-300 pt-3 border-t border-border/40 group/link"
          >
            <span className="flex items-center gap-2">
              <MessageSquareIcon ref={msgRef} size={16} />
              <span>Start a conversation</span>
            </span>
            <ArrowRightIcon ref={arrow1Ref} size={16} className="group-hover/link:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* 2. Resources */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={(e) => {
            handleMouseLeave(e);
            bookRef.current?.stopAnimation();
            arrow2Ref.current?.stopAnimation();
          }}
          onMouseEnter={() => {
            bookRef.current?.startAnimation();
            arrow2Ref.current?.startAnimation();
          }}
          className="glass-card tilt-card group p-6 rounded-2xl border border-teal-500/25 hover:border-cyan-400/60 flex flex-col justify-between transition-all duration-300 relative overflow-hidden shadow-lg cursor-pointer"
          style={{
            background:
              "radial-gradient(circle 260px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34, 211, 238, 0.12), transparent 80%), var(--glass-bg)",
          }}
        >
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-400/25 transition-all" />

          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/30 via-teal-500/20 to-blue-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] group-hover:shadow-[0_0_28px_rgba(34,211,238,0.45)] group-hover:scale-105 transition-all duration-300">
                <BookIcon ref={bookRef} size={26} className="w-6 h-6 text-cyan-300" />
              </div>
              <span className="text-[11px] font-semibold tracking-wider text-cyan-800 dark:text-cyan-300 bg-cyan-500/15 px-3 py-1 rounded-full border border-cyan-400/30 shadow-sm flex items-center gap-1.5">
                <ShieldCheckIcon size={14} className="text-cyan-700 dark:text-cyan-300" />
                <span>Trusted & verified</span>
              </span>
            </div>

            <h2 className="text-lg font-bold text-foreground mb-1 tracking-tight group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
              Legal Resources
            </h2>
            <p className="text-xs text-cyan-700 dark:text-cyan-300/90 font-semibold mb-1">
              Know your rights. Find support.
            </p>
            <p className="text-xs text-slate-600 dark:text-muted-foreground leading-relaxed mb-4">
              Access trusted guides on legal aid (DLSA), statutory compensation, and fast-track court rules.
            </p>
          </div>

          <Link
            to="/survivor/resources"
            className="inline-flex items-center justify-between text-xs sm:text-sm font-semibold text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-teal-300 pt-3 border-t border-border/40 group/link"
          >
            <span className="flex items-center gap-2">
              <ShieldCheckIcon size={16} />
              <span>Explore resources</span>
            </span>
            <ArrowRightIcon ref={arrow2Ref} size={16} className="group-hover/link:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* 3. Reach Counselor */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={(e) => {
            handleMouseLeave(e);
            heartRef.current?.stopAnimation();
            calRef.current?.stopAnimation();
            arrow3Ref.current?.stopAnimation();
          }}
          onMouseEnter={() => {
            heartRef.current?.startAnimation();
            calRef.current?.startAnimation();
            arrow3Ref.current?.startAnimation();
          }}
          className="glass-card tilt-card group p-6 rounded-2xl border border-teal-500/25 hover:border-teal-400/60 flex flex-col justify-between transition-all duration-300 relative overflow-hidden shadow-lg cursor-pointer"
          style={{
            background:
              "radial-gradient(circle 260px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(94, 234, 212, 0.12), transparent 80%), var(--glass-bg)",
          }}
        >
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-400/25 transition-all" />

          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500/30 via-indigo-500/20 to-teal-400/20 border border-teal-400/40 flex items-center justify-center text-haven-teal shadow-[0_0_20px_rgba(94,234,212,0.25)] group-hover:shadow-[0_0_28px_rgba(94,234,212,0.45)] group-hover:scale-105 transition-all duration-300">
                <HandHeartIcon ref={heartRef} size={26} className="w-6 h-6 text-haven-teal" />
              </div>
              <span className="text-[11px] font-semibold tracking-wider text-teal-800 dark:text-teal-300 bg-teal-500/15 px-3 py-1 rounded-full border border-teal-400/30 shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                <span>Confidential & secure</span>
              </span>
            </div>

            <h2 className="text-lg font-bold text-foreground mb-1 tracking-tight group-hover:text-teal-700 dark:group-hover:text-haven-teal transition-colors">
              Reach Counselor
            </h2>
            <p className="text-xs text-teal-700 dark:text-teal-300/90 font-semibold mb-1">
              Professional trauma care, real people.
            </p>
            <p className="text-xs text-slate-600 dark:text-muted-foreground leading-relaxed mb-4">
              Connect with your assigned clinical psychologist or request an immediate crisis counseling session.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenCounselorModal}
            className="inline-flex items-center justify-between text-xs sm:text-sm font-semibold text-teal-700 dark:text-haven-teal hover:text-teal-900 dark:hover:text-cyan-300 pt-3 border-t border-border/40 group/link cursor-pointer w-full text-left"
          >
            <span className="flex items-center gap-2">
              <CalendarIcon ref={calRef} size={16} />
              <span>Book / Contact</span>
            </span>
            <ArrowRightIcon ref={arrow3Ref} size={16} className="group-hover/link:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
