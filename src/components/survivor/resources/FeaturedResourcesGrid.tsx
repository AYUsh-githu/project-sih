import React, { useRef } from "react";
import {
  ScaleIcon,
  ClockIcon,
  HeartIcon,
  BookmarkIcon,
  AnimatedIconHandle,
} from "@/components/icons";
import { Volume2, Check } from "lucide-react";
import { ResourceItem } from "./resourceData";

interface FeaturedResourcesGridProps {
  resources: ResourceItem[];
  savedResourceIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onSelectResource: (resource: ResourceItem) => void;
}

export const FeaturedResourcesGrid: React.FC<FeaturedResourcesGridProps> = ({
  resources,
  savedResourceIds,
  onToggleSave,
  onSelectResource,
}) => {
  // Explicit animated refs for card headers
  const card1Ref = useRef<AnimatedIconHandle>(null);
  const card2Ref = useRef<AnimatedIconHandle>(null);
  const card3Ref = useRef<AnimatedIconHandle>(null);
  const cardRefs = [card1Ref, card2Ref, card3Ref];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-foreground tracking-tight">
            Featured Resources
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Trusted statutory guidance & trauma-informed care, simplified for you.
          </p>
        </div>
      </div>

      {/* Grid of 3 Detailed Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {resources.slice(0, 3).map((guide, idx) => {
          const isSaved = savedResourceIds.includes(guide.id);
          const iconRef = cardRefs[idx % cardRefs.length];

          return (
            <div
              key={guide.id}
              onClick={() => onSelectResource(guide)}
              onMouseEnter={() => iconRef.current?.startAnimation()}
              onMouseLeave={() => iconRef.current?.stopAnimation()}
              className="glass-card rounded-2xl p-5 border border-teal-500/20 hover:border-teal-500/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
            >
              {/* Subtle Ambient Card Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-xl pointer-events-none" />

              <div>
                {/* Top Row: Category Badge, Language & Bookmark */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-800 dark:text-haven-teal border border-teal-500/20">
                      {guide.categoryLabel}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground">
                      {guide.language}
                    </span>
                  </div>

                  {/* Bookmark Toggle Button */}
                  <button
                    type="button"
                    onClick={(e) => onToggleSave(guide.id, e)}
                    title={isSaved ? "Remove bookmark" : "Save resource"}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      isSaved
                        ? "bg-teal-500/20 border-teal-500/40 text-teal-800 dark:text-haven-teal"
                        : "bg-white/60 dark:bg-white/[0.04] border-border/60 text-muted-foreground hover:text-foreground hover:border-teal-500/30"
                    }`}
                  >
                    <BookmarkIcon
                      size={15}
                      className={isSaved ? "fill-current text-teal-800 dark:text-haven-teal" : ""}
                    />
                  </button>
                </div>

                {/* Guide Title with Icon */}
                <div className="flex items-start gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                    {idx === 0 && (
                      <ScaleIcon ref={card1Ref} size={18} className="text-teal-800 dark:text-haven-teal" />
                    )}
                    {idx === 1 && (
                      <ClockIcon ref={card2Ref} size={18} className="text-teal-800 dark:text-haven-teal" />
                    )}
                    {idx === 2 && (
                      <HeartIcon ref={card3Ref} size={18} className="text-teal-800 dark:text-haven-teal" />
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-foreground group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors tracking-tight leading-snug">
                    {guide.title}
                  </h3>
                </div>

                {/* Excerpt / Summary */}
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                  {guide.summary}
                </p>

                {/* Read Time & Audio Badges */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                    <span>⏱️</span>
                    <span>{guide.readTime}</span>
                  </span>
                  <span className="text-muted-foreground/40">•</span>
                  <span className="text-[10px] text-teal-800 dark:text-haven-teal font-medium flex items-center gap-1">
                    <Volume2 className="w-3 h-3" />
                    <span>Audio ({guide.audioLength})</span>
                  </span>
                </div>
              </div>

              {/* Card Footer: Official Source & Last Updated */}
              <div className="pt-3 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="truncate max-w-[170px]" title={guide.source}>
                  Source: <strong className="text-foreground">{guide.source}</strong>
                </span>
                <span className="flex-shrink-0">{guide.lastUpdated}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedResourcesGrid;
