import React, { useRef, useState } from "react";
import {
  UsersGroupIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  AnimatedIconHandle,
} from "@/components/icons";
import { X, Check } from "lucide-react";

export const SuggestedPeerMatchCard: React.FC = () => {
  const [showMatchModal, setShowMatchModal] = useState(false);
  const usersRef = useRef<AnimatedIconHandle>(null);
  const arrowRef = useRef<AnimatedIconHandle>(null);
  const shieldRef = useRef<AnimatedIconHandle>(null);

  return (
    <>
      <div
        onMouseEnter={() => {
          usersRef.current?.startAnimation();
          arrowRef.current?.startAnimation();
        }}
        onMouseLeave={() => {
          usersRef.current?.stopAnimation();
          arrowRef.current?.stopAnimation();
        }}
        className="glass-card rounded-2xl p-5 border border-teal-500/20 shadow-md relative overflow-hidden group hover:border-teal-500/40 transition-all mb-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-border/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0 group-hover:scale-110 transition-transform">
              <UsersGroupIcon
                ref={usersRef}
                size={18}
                className="text-teal-800 dark:text-haven-teal"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground tracking-tight group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors">
                Suggested Peer Match
              </h3>
              <p className="text-[10px] text-muted-foreground">
                Matched by Case Milestone & Emotional Trajectory
              </p>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
            94% Stage Match
          </span>
        </div>

        {/* Peer Profile Card */}
        <div className="py-4 flex items-center gap-3.5">
          {/* Pseudonymous Glowing Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-indigo-500/30 via-purple-500/40 to-teal-400/30 border-2 border-indigo-400/50 flex items-center justify-center text-foreground font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
              A-84
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-foreground">
                On a similar stage of your journey
              </h4>
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
              You both are navigating Fast-Track legal proceedings and working with DLSA advocates.
            </p>

            <span className="inline-block mt-2 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-teal-500/10 text-teal-800 dark:text-haven-teal border border-teal-500/20">
              Stage 3 · Special Court Proceeding
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-border/50">
          <button
            type="button"
            onClick={() => setShowMatchModal(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-white/80 dark:bg-white/[0.04] border border-teal-600/20 dark:border-teal-500/20 hover:border-teal-600/50 hover:bg-teal-50/70 dark:hover:bg-white/[0.08] text-foreground hover:text-teal-800 dark:hover:text-haven-teal text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer group shadow-xs"
          >
            <span>See Match Details</span>
            <ArrowRightIcon ref={arrowRef} size={14} className="text-teal-800 dark:text-haven-teal" />
          </button>
        </div>
      </div>

      {/* Moderated Peer Match Details Modal */}
      {showMatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-teal-500/30 max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-500/15 flex items-center justify-center text-teal-800 dark:text-haven-teal">
                  <UsersGroupIcon size={20} className="text-teal-800 dark:text-haven-teal" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Peer Match: Aura-84
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Clinically-Screened Stage Compatibility
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowMatchModal(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-teal-50/70 dark:bg-white/[0.03] border border-teal-500/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500/30 to-teal-400/30 border border-teal-400/40 flex items-center justify-center font-bold text-foreground text-sm flex-shrink-0">
                  A-84
                </div>
                <div>
                  <div className="font-bold text-foreground text-xs">
                    Pseudonym: Aura-84 · Central District
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    Status: Stage 3 (Hearing in 14 Days) · Language: English / Telugu
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-950/60 border border-border text-[11px] space-y-1.5">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Shared Common Ground</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-1">
                  <li>Both registered under SC/ST PoA Act with Tier II Witness Protection</li>
                  <li>Actively attending pre-trial sessions at Fast-Track Court</li>
                  <li>Expressed anxiety about speaking in court hall setting</li>
                </ul>
              </div>

              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300">
                <ShieldCheckIcon
                  ref={shieldRef}
                  size={16}
                  className="flex-shrink-0 mt-0.5 text-amber-700 dark:text-amber-400"
                />
                <span>
                  For witness safety under Section 15A, interactions take place exclusively inside the moderated <strong>Hearings & Legal Process</strong> Circle.
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowMatchModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 text-foreground text-xs font-semibold cursor-pointer"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={() => setShowMatchModal(false)}
                className="btn-primary px-4 py-2 rounded-xl text-slate-950 text-xs font-bold cursor-pointer"
              >
                Say Hello in Circle
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuggestedPeerMatchCard;
