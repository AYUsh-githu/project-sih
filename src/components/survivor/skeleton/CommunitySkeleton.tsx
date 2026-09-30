import React from "react";
import {
  SkeletonCard,
  SkeletonTitle,
  SkeletonText,
  SkeletonBadge,
  SkeletonIcon,
  SkeletonButton,
  SkeletonAvatar,
  SkeletonParagraph,
} from "./primitives";

export const CommunitySkeleton: React.FC = () => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading Community and Peer Support circles"
      className="flex-1 flex flex-col max-w-7xl mx-auto w-full py-2 sm:py-4 px-2 sm:px-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Main Area - 8 cols on lg) */}
        <div className="lg:col-span-8 flex flex-col w-full space-y-6">
          {/* 1. Hero Reassurance Banner */}
          <SkeletonCard className="p-6 sm:p-8">
            <div className="space-y-3">
              <SkeletonBadge width="w-48" />
              <SkeletonTitle width="w-72 sm:w-96" height="h-8 sm:h-9" />
              <SkeletonParagraph lines={2} className="max-w-2xl" />

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <SkeletonBadge width="w-36" />
                <SkeletonBadge width="w-40" />
              </div>
            </div>
          </SkeletonCard>

          {/* 2. 4-Themed Support Circles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard
                key={i}
                className="p-5 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <SkeletonIcon size="w-10 h-10" />
                    <SkeletonBadge width="w-20" />
                  </div>
                  <SkeletonTitle width="w-40" height="h-5" className="mb-2" />
                  <SkeletonParagraph lines={2} />
                </div>

                <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                  <SkeletonText width="w-24" height="h-3" />
                  <SkeletonButton width="w-28" height="h-8" />
                </div>
              </SkeletonCard>
            ))}
          </div>

          {/* 3. Bottom Row: Featured Circle Spotlight & Safety Protocol */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {/* Featured Circle */}
            <SkeletonCard className="p-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <SkeletonBadge width="w-28" />
                  <SkeletonIcon size="w-6 h-6" />
                </div>
                <SkeletonTitle width="w-44" height="h-5" />
                <SkeletonParagraph lines={2} />
              </div>
              <div className="pt-4 mt-4 border-t border-border/40 flex justify-end">
                <SkeletonButton width="w-32" height="h-8" />
              </div>
            </SkeletonCard>

            {/* Safety Protocol */}
            <SkeletonCard className="p-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <SkeletonIcon size="w-7 h-7" />
                  <SkeletonTitle width="w-48" height="h-5" />
                </div>
                <div className="space-y-2 pt-1">
                  <SkeletonText width="w-full" height="h-3" />
                  <SkeletonText width="w-5/6" height="h-3" />
                  <SkeletonText width="w-4/5" height="h-3" />
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-border/40 flex justify-end">
                <SkeletonBadge width="w-32" />
              </div>
            </SkeletonCard>
          </div>
        </div>

        {/* Right Column (Sidebar - 4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col w-full space-y-5">
          {/* 4. Haven AI Smart Community Suggestion */}
          <SkeletonCard className="p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border/40">
              <SkeletonIcon size="w-8 h-8" />
              <div className="space-y-1">
                <SkeletonTitle width="w-36" height="h-4" />
                <SkeletonText width="w-28" height="h-2.5" />
              </div>
            </div>
            <SkeletonParagraph lines={3} />
            <SkeletonButton width="w-full" height="h-9" />
          </SkeletonCard>

          {/* 5. Suggested Peer Match */}
          <SkeletonCard className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <SkeletonTitle width="w-36" height="h-4" />
              <SkeletonBadge width="w-20" />
            </div>
            <div className="flex items-center gap-3">
              <SkeletonAvatar size="w-11 h-11" />
              <div className="space-y-1">
                <SkeletonTitle width="w-32" height="h-4" />
                <SkeletonText width="w-40" height="h-2.5" />
              </div>
            </div>
            <SkeletonText width="w-full" height="h-3" />
            <SkeletonButton width="w-full" height="h-9" />
          </SkeletonCard>

          {/* 6. Restorative Quote of the Day */}
          <SkeletonCard className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <SkeletonBadge width="w-28" />
              <SkeletonIcon size="w-5 h-5" />
            </div>
            <SkeletonParagraph lines={3} />
            <div className="flex justify-end pt-1">
              <SkeletonText width="w-24" height="h-3" />
            </div>
          </SkeletonCard>
        </div>
      </div>
    </div>
  );
};
