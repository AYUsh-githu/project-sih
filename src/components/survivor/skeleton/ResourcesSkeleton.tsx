import React from "react";
import {
  SkeletonCard,
  SkeletonTitle,
  SkeletonText,
  SkeletonBadge,
  SkeletonIcon,
  SkeletonButton,
  SkeletonInput,
  SkeletonParagraph,
} from "./primitives";

export const ResourcesSkeleton: React.FC = () => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading Legal and Healing Resources library"
      className="flex-1 flex flex-col max-w-7xl mx-auto w-full py-2 sm:py-4 px-2 sm:px-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Main Hub (8 cols on lg) */}
        <div className="lg:col-span-8 flex flex-col w-full space-y-5">
          {/* 1. Search Strip & Category Chips */}
          <div className="space-y-3">
            <SkeletonInput height="h-12" />
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonButton
                  key={i}
                  width={i === 0 ? "w-16" : "w-28"}
                  height="h-8"
                  pill
                />
              ))}
            </div>
          </div>

          {/* 2. Emergency Help Banner */}
          <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <SkeletonIcon size="w-9 h-9" />
              <div className="space-y-1">
                <SkeletonText width="w-48" height="h-4" />
                <SkeletonText width="w-64" height="h-3" />
              </div>
            </div>
            <SkeletonButton width="w-36" height="h-9" />
          </div>

          {/* 3. Suggested Resource Banner */}
          <SkeletonCard className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <SkeletonBadge width="w-32" />
                <SkeletonTitle width="w-64" height="h-6" />
                <SkeletonParagraph lines={2} />
              </div>
              <SkeletonButton width="w-36" height="h-10" />
            </div>
          </SkeletonCard>

          {/* 4. Explore by Need 5-Item Grid */}
          <div>
            <div className="mb-3">
              <SkeletonTitle width="w-40" height="h-5" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl haven-skeleton-base border border-teal-500/10 flex flex-col items-center justify-center space-y-2 text-center"
                >
                  <SkeletonIcon size="w-8 h-8" />
                  <SkeletonText width="w-20" height="h-3" />
                </div>
              ))}
            </div>
          </div>

          {/* 5. Featured Statutory Guides Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <SkeletonTitle width="w-48" height="h-5" />
              <SkeletonText width="w-24" height="h-3" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard
                  key={i}
                  className="p-5 flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <SkeletonBadge width="w-24" />
                      <SkeletonIcon size="w-5 h-5" />
                    </div>
                    <SkeletonTitle width="w-44" height="h-5" className="mb-2" />
                    <SkeletonParagraph lines={2} />
                  </div>

                  <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                    <SkeletonText width="w-24" height="h-3" />
                    <SkeletonButton width="w-24" height="h-8" />
                  </div>
                </SkeletonCard>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar (4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col w-full space-y-5">
          {/* 6. Accessibility & Language Panel */}
          <SkeletonCard className="p-5 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border/40">
              <SkeletonIcon size="w-6 h-6" />
              <SkeletonTitle width="w-44" height="h-4" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <SkeletonText width="w-32" height="h-3.5" />
                <SkeletonButton width="w-12" height="h-6" pill />
              </div>
              <div className="flex items-center justify-between">
                <SkeletonText width="w-36" height="h-3.5" />
                <SkeletonButton width="w-12" height="h-6" pill />
              </div>
              <div className="pt-2">
                <SkeletonText width="w-28" height="h-3" className="mb-2" />
                <div className="flex items-center gap-2">
                  <SkeletonButton width="w-16" height="h-7" />
                  <SkeletonButton width="w-16" height="h-7" />
                  <SkeletonButton width="w-16" height="h-7" />
                </div>
              </div>
            </div>
          </SkeletonCard>

          {/* 7. Your Saved Bookmarks */}
          <SkeletonCard className="p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <SkeletonTitle width="w-36" height="h-4" />
              <SkeletonBadge width="w-16" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg haven-skeleton-base border border-teal-500/10 space-y-1"
                >
                  <SkeletonText width="w-full" height="h-3.5" />
                  <SkeletonText width="w-2/3" height="h-2.5" />
                </div>
              ))}
            </div>
          </SkeletonCard>

          {/* 8. Recently Viewed History */}
          <SkeletonCard className="p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <SkeletonTitle width="w-32" height="h-4" />
              <SkeletonIcon size="w-4 h-4" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg haven-skeleton-base border border-teal-500/10 space-y-1"
                >
                  <SkeletonText width="w-5/6" height="h-3.5" />
                  <SkeletonText width="w-1/2" height="h-2.5" />
                </div>
              ))}
            </div>
          </SkeletonCard>

          {/* 9. Helpful for You (Peer Social Proof) */}
          <SkeletonCard className="p-5 space-y-3">
            <div className="flex items-center gap-2 pb-2">
              <SkeletonIcon size="w-5 h-5" />
              <SkeletonTitle width="w-32" height="h-4" />
            </div>
            <SkeletonParagraph lines={2} />
            <SkeletonButton width="w-full" height="h-8" />
          </SkeletonCard>
        </div>
      </div>
    </div>
  );
};
