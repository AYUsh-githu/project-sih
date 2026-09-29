import React, { useRef } from "react";
import { HistoryIcon, ArrowRightIcon, AnimatedIconHandle } from "@/components/icons";
import { ResourceItem, FEATURED_RESOURCES } from "./resourceData";

interface RecentlyViewedCardProps {
  onSelectResource: (resource: ResourceItem) => void;
}

export const RecentlyViewedCard: React.FC<RecentlyViewedCardProps> = ({
  onSelectResource,
}) => {
  const historyRef = useRef<AnimatedIconHandle>(null);
  const arrowRef = useRef<AnimatedIconHandle>(null);

  // 3 recently read guides
  const recentGuides = FEATURED_RESOURCES.slice(1, 4);

  return (
    <div
      onMouseEnter={() => {
        historyRef.current?.startAnimation();
        arrowRef.current?.startAnimation();
      }}
      onMouseLeave={() => {
        historyRef.current?.stopAnimation();
        arrowRef.current?.stopAnimation();
      }}
      className="glass-card rounded-2xl p-5 border border-teal-500/20 shadow-md relative overflow-hidden mb-5 group hover:border-teal-500/40 transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0 group-hover:scale-105 transition-transform">
            <HistoryIcon
              ref={historyRef}
              size={18}
              className="text-teal-800 dark:text-haven-teal"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground tracking-tight group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors">
              Recently Viewed
            </h3>
            <p className="text-[10px] text-muted-foreground">
              Continue where you left off
            </p>
          </div>
        </div>

        <span className="text-[10px] text-muted-foreground font-mono">
          3 history items
        </span>
      </div>

      {/* List */}
      <div className="pt-3 space-y-2">
        {recentGuides.map((guide) => (
          <div
            key={guide.id}
            onClick={() => onSelectResource(guide)}
            className="p-3 rounded-xl bg-white/70 dark:bg-white/[0.03] border border-border/60 hover:border-teal-500/40 hover:bg-teal-50/50 dark:hover:bg-white/[0.06] flex items-center justify-between gap-2.5 transition-all cursor-pointer group/item"
          >
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-foreground group-hover/item:text-teal-800 dark:group-hover:text-haven-teal transition-colors truncate">
                {guide.title}
              </h4>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
                <span>{guide.categoryLabel}</span>
                <span>•</span>
                <span>{guide.readTime}</span>
              </div>
            </div>

            <div className="w-6 h-6 rounded-md bg-teal-500/10 flex items-center justify-center text-teal-800 dark:text-haven-teal group-hover/item:translate-x-0.5 transition-transform">
              <ArrowRightIcon size={12} className="text-teal-800 dark:text-haven-teal" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedCard;
