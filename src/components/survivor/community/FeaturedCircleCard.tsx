import React, { useRef } from "react";
import { SproutIcon, ArrowRightIcon, AnimatedIconHandle } from "@/components/icons";
import { SUPPORT_CIRCLES, SupportCircleItem } from "./SupportCirclesGrid";

interface FeaturedCircleCardProps {
  onJoinCircle: (circle: SupportCircleItem) => void;
}

export const FeaturedCircleCard: React.FC<FeaturedCircleCardProps> = ({
  onJoinCircle,
}) => {
  const sproutRef = useRef<AnimatedIconHandle>(null);
  const arrowRef = useRef<AnimatedIconHandle>(null);

  // Focus on the Rebuilding Routine circle as featured in the reference layout
  const featured =
    SUPPORT_CIRCLES.find((c) => c.id === "rebuilding-routine") ||
    SUPPORT_CIRCLES[2];

  return (
    <div
      onMouseEnter={() => {
        sproutRef.current?.startAnimation();
        arrowRef.current?.startAnimation();
      }}
      onMouseLeave={() => {
        sproutRef.current?.stopAnimation();
        arrowRef.current?.stopAnimation();
      }}
      className="glass-card rounded-2xl p-5 border border-teal-500/20 shadow-md relative overflow-hidden flex flex-col justify-between h-full group hover:border-teal-500/40 transition-all"
    >
      {/* Background Soft Glow */}
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between pb-3 border-b border-border/50">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-haven-teal">
            Featured Circle of the Week
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-800 dark:text-haven-teal border border-teal-500/30">
            Facilitated Session Active
          </span>
        </div>

        <div className="flex items-start gap-4 pt-4">
          {/* Avatar Thumbnail with scenic tranquil styling */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500/25 via-emerald-500/30 to-amber-500/20 border-2 border-teal-500/40 flex items-center justify-center text-teal-800 dark:text-haven-teal shadow-md group-hover:scale-105 transition-transform">
              <SproutIcon ref={sproutRef} size={28} className="text-teal-800 dark:text-haven-teal" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-foreground group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors tracking-tight">
              {featured.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
              {featured.subtitle}
            </p>

            {/* Language & Member Pills */}
            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/60 dark:bg-white/[0.04] text-foreground border border-border/60">
                English & Hindi
              </span>
              <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                18 active participants
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 mt-3 border-t border-border/50 flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">
          Moderated by <strong className="text-foreground">{featured.facilitator}</strong>
        </span>

        <button
          type="button"
          onClick={() => onJoinCircle(featured)}
          className="btn-primary py-2 px-4 rounded-xl text-xs font-bold text-slate-950 flex items-center gap-2 cursor-pointer shadow-sm group-hover:shadow-glow-teal transition-all"
        >
          <span>Join Circle</span>
          <ArrowRightIcon ref={arrowRef} size={14} className="text-slate-950" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedCircleCard;
