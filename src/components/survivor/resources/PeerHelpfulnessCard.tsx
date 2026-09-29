import React, { useRef } from "react";
import { UsersGroupIcon, AnimatedIconHandle } from "@/components/icons";

interface PeerHelpfulnessCardProps {
  onSelectHearingGuide?: () => void;
}

export const PeerHelpfulnessCard: React.FC<PeerHelpfulnessCardProps> = ({
  onSelectHearingGuide,
}) => {
  const usersRef = useRef<AnimatedIconHandle>(null);

  return (
    <div
      onClick={onSelectHearingGuide}
      onMouseEnter={() => usersRef.current?.startAnimation()}
      onMouseLeave={() => usersRef.current?.stopAnimation()}
      className="glass-card rounded-2xl p-5 border border-teal-500/20 shadow-md relative overflow-hidden group hover:border-teal-500/40 transition-all cursor-pointer bg-gradient-to-br from-teal-500/[0.06] via-emerald-500/[0.04] to-transparent"
    >
      {/* Background Soft Glow & Silhouette */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0 group-hover:scale-110 transition-transform">
          <UsersGroupIcon
            ref={usersRef}
            size={18}
            className="text-teal-800 dark:text-haven-teal"
          />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground tracking-tight group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors">
            Helpful for You
          </h3>
          <p className="text-[10px] text-muted-foreground">
            Others in similar circumstances found this helpful
          </p>
        </div>
      </div>

      {/* Peer Stat Content */}
      <div className="p-3 rounded-xl bg-white/70 dark:bg-white/[0.03] border border-teal-500/25 space-y-1.5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold text-teal-800 dark:text-haven-teal">
            67%
          </span>
          <span className="text-xs font-semibold text-foreground">
            of witnesses in Stage 3
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-snug">
          reported feeling significantly more grounded after reading the <strong>&ldquo;Understanding a Hearing&rdquo;</strong> guide before entering court.
        </p>
      </div>
    </div>
  );
};

export default PeerHelpfulnessCard;
