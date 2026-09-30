import React from "react";
import {
  SkeletonCard,
  SkeletonTitle,
  SkeletonText,
  SkeletonBadge,
  SkeletonIcon,
  SkeletonButton,
  SkeletonParagraph,
} from "./primitives";

export const SettingsSkeleton: React.FC = () => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading Companion Studio and Settings"
      className="flex-1 flex flex-col max-w-5xl mx-auto w-full py-2 sm:py-4 px-2 sm:px-4"
    >
      {/* Page Header */}
      <div className="mb-6 pb-4 border-b border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <SkeletonBadge width="w-32" />
          <SkeletonText width="w-36" height="h-3" />
        </div>
        <SkeletonTitle width="w-72 sm:w-80" height="h-7 sm:h-8" className="mb-1" />
        <SkeletonText width="w-full max-w-xl" height="h-3.5" />
      </div>

      {/* 1. Avatar Motion Sandbox Preview */}
      <SkeletonCard className="p-6 mb-6">
        <div className="flex items-center justify-between pb-4 border-b border-border/50 mb-4">
          <div className="flex items-center gap-2">
            <SkeletonIcon size="w-7 h-7" />
            <SkeletonTitle width="w-48" height="h-5" />
          </div>
          <SkeletonBadge width="w-24" />
        </div>

        {/* Large Stage Area */}
        <div className="w-full h-64 sm:h-72 rounded-xl haven-skeleton-base border border-teal-500/10 flex flex-col items-center justify-center p-6 space-y-4 mb-4">
          <div className="w-28 h-28 rounded-full haven-skeleton-shimmer bg-teal-500/15" />
          <SkeletonText width="w-48" height="h-3.5" />
        </div>

        {/* Expression buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonButton key={i} width="w-24" height="h-8" pill />
          ))}
        </div>
      </SkeletonCard>

      {/* 2. Customizer Card */}
      <SkeletonCard className="p-6 mb-6">
        <div className="flex items-center justify-between pb-4 border-b border-border/50 mb-5">
          <div className="flex items-center gap-2">
            <SkeletonIcon size="w-7 h-7" />
            <SkeletonTitle width="w-52" height="h-5" />
          </div>
          <SkeletonBadge width="w-20" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl haven-skeleton-base border border-teal-500/10 space-y-3">
            <SkeletonText width="w-32" height="h-3.5" />
            <div className="w-full h-2 rounded-full haven-skeleton-shimmer bg-teal-500/20" />
          </div>
          <div className="p-4 rounded-xl haven-skeleton-base border border-teal-500/10 space-y-3">
            <SkeletonText width="w-32" height="h-3.5" />
            <div className="w-full h-2 rounded-full haven-skeleton-shimmer bg-teal-500/20" />
          </div>
        </div>
      </SkeletonCard>

      {/* 3. Physics Card */}
      <SkeletonCard className="p-6 mb-6">
        <div className="flex items-center justify-between pb-4 border-b border-border/50 mb-5">
          <div className="flex items-center gap-2">
            <SkeletonIcon size="w-7 h-7" />
            <SkeletonTitle width="w-48" height="h-5" />
          </div>
          <SkeletonBadge width="w-28" />
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-xl haven-skeleton-base border border-teal-500/10 flex items-center justify-between">
            <SkeletonText width="w-48" height="h-3.5" />
            <SkeletonButton width="w-12" height="h-6" pill />
          </div>
          <div className="p-3.5 rounded-xl haven-skeleton-base border border-teal-500/10 flex items-center justify-between">
            <SkeletonText width="w-52" height="h-3.5" />
            <SkeletonButton width="w-12" height="h-6" pill />
          </div>
        </div>
      </SkeletonCard>

      {/* 4. Privacy & DPDP Controls */}
      <SkeletonCard className="p-6 mb-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-border/50 mb-4">
          <SkeletonIcon size="w-8 h-8" />
          <div className="space-y-1">
            <SkeletonTitle width="w-64" height="h-4" />
            <SkeletonText width="w-48" height="h-2.5" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl haven-skeleton-base border border-teal-500/10 space-y-2">
            <div className="flex items-center gap-2">
              <SkeletonIcon size="w-4 h-4" />
              <SkeletonText width="w-36" height="h-3.5" />
            </div>
            <SkeletonParagraph lines={2} />
          </div>

          <div className="p-3.5 rounded-xl haven-skeleton-base border border-teal-500/10 space-y-2">
            <div className="flex items-center gap-2">
              <SkeletonIcon size="w-4 h-4" />
              <SkeletonText width="w-40" height="h-3.5" />
            </div>
            <SkeletonParagraph lines={2} />
          </div>
        </div>
      </SkeletonCard>
    </div>
  );
};
