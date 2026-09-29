import React, { useRef } from "react";
import { BookmarkIcon, ArrowRightIcon, AnimatedIconHandle } from "@/components/icons";
import { ResourceItem, FEATURED_RESOURCES } from "./resourceData";

interface SavedResourcesCardProps {
  savedResourceIds: string[];
  onSelectResource: (resource: ResourceItem) => void;
}

export const SavedResourcesCard: React.FC<SavedResourcesCardProps> = ({
  savedResourceIds,
  onSelectResource,
}) => {
  const bookmarkRef = useRef<AnimatedIconHandle>(null);
  const arrowRef = useRef<AnimatedIconHandle>(null);

  const savedItems = FEATURED_RESOURCES.filter((r) =>
    savedResourceIds.includes(r.id)
  );

  return (
    <div
      onMouseEnter={() => {
        bookmarkRef.current?.startAnimation();
        arrowRef.current?.startAnimation();
      }}
      onMouseLeave={() => {
        bookmarkRef.current?.stopAnimation();
        arrowRef.current?.stopAnimation();
      }}
      className="glass-card rounded-2xl p-5 border border-teal-500/20 shadow-md relative overflow-hidden mb-5 group hover:border-teal-500/40 transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0 group-hover:scale-105 transition-transform">
            <BookmarkIcon
              ref={bookmarkRef}
              size={16}
              className="text-teal-800 dark:text-haven-teal"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground tracking-tight group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors">
              Your Saved Resources
            </h3>
            <p className="text-[10px] text-muted-foreground">
              Quick access to your statutory bookmarks
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-800 dark:text-haven-teal border border-teal-500/30">
          {savedItems.length} {savedItems.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Bookmarked Items List */}
      <div className="pt-3 space-y-2">
        {savedItems.length > 0 ? (
          savedItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectResource(item)}
              className="p-3 rounded-xl bg-white/70 dark:bg-white/[0.03] border border-border/60 hover:border-teal-500/40 hover:bg-teal-50/50 dark:hover:bg-white/[0.06] flex items-center justify-between gap-2.5 transition-all cursor-pointer group/item"
            >
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-foreground group-hover/item:text-teal-800 dark:group-hover/item:text-haven-teal transition-colors truncate">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
                  <span>{item.categoryLabel}</span>
                  <span>•</span>
                  <span>{item.readTime}</span>
                </div>
              </div>

              <div className="w-6 h-6 rounded-md bg-teal-500/10 flex items-center justify-center text-teal-800 dark:text-haven-teal group-hover/item:translate-x-0.5 transition-transform">
                <ArrowRightIcon size={12} className="text-teal-800 dark:text-haven-teal" />
              </div>
            </div>
          ))
        ) : (
          <div className="py-4 text-center text-xs text-muted-foreground">
            <p>No saved resources yet.</p>
            <p className="text-[10px] text-muted-foreground/80 mt-0.5">
              Click the bookmark icon on any guide to save it for quick offline reading.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedResourcesCard;
