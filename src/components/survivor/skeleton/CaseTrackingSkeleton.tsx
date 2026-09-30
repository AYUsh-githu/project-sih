import React from "react";
import {
  SkeletonCard,
  SkeletonTitle,
  SkeletonText,
  SkeletonBadge,
  SkeletonIcon,
  SkeletonButton,
  SkeletonAvatar,
} from "./primitives";

export const CaseTrackingSkeleton: React.FC = () => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading Case Tracking and Legal Monitor"
      className="flex-1 flex flex-col max-w-6xl mx-auto w-full py-2 sm:py-4"
    >
      {/* 1. 4-Node Case Stage Progression Rail */}
      <SkeletonCard className="p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-border/50 mb-6">
          <div className="flex items-center gap-2.5">
            <SkeletonIcon size="w-9 h-9" />
            <div className="space-y-1">
              <SkeletonTitle width="w-56" height="h-6" />
              <SkeletonText width="w-64" height="h-3" />
            </div>
          </div>
          <SkeletonBadge width="w-32" />
        </div>

        {/* 4 Connected Stages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-xl haven-skeleton-base border border-teal-500/10 space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <SkeletonAvatar size="w-7 h-7" />
                <SkeletonBadge width="w-20" />
              </div>
              <SkeletonTitle width="w-28" height="h-5" />
              <SkeletonText width="w-full" height="h-3" />
              <SkeletonText width="w-2/3" height="h-2.5" />
            </div>
          ))}
        </div>
      </SkeletonCard>

      {/* 2. Middle Row: Counselor Profile (Left) & Financial Relief (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch mb-6">
        {/* Left Column: Counselor Details (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col w-full">
          <SkeletonCard className="p-6 flex flex-col justify-between h-full min-h-[300px]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border/50 mb-4">
                <div className="flex items-center gap-3">
                  <SkeletonAvatar size="w-12 h-12" />
                  <div className="space-y-1">
                    <SkeletonTitle width="w-40" height="h-5" />
                    <SkeletonText width="w-48" height="h-3" />
                  </div>
                </div>
                <SkeletonBadge width="w-24" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl haven-skeleton-base border border-teal-500/10 space-y-1.5">
                  <SkeletonText width="w-24" height="h-2.5" />
                  <SkeletonText width="w-32" height="h-4" />
                </div>
                <div className="p-3 rounded-xl haven-skeleton-base border border-teal-500/10 space-y-1.5">
                  <SkeletonText width="w-24" height="h-2.5" />
                  <SkeletonText width="w-32" height="h-4" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-border/40">
              <SkeletonButton width="w-44" height="h-10" />
              <SkeletonButton width="w-32" height="h-10" />
            </div>
          </SkeletonCard>
        </div>

        {/* Right Column: Financial Relief & DBT Status (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col w-full">
          <SkeletonCard className="p-6 flex flex-col justify-between h-full min-h-[300px]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border/50 mb-4">
                <div className="flex items-center gap-2">
                  <SkeletonIcon size="w-8 h-8" />
                  <SkeletonTitle width="w-44" height="h-5" />
                </div>
                <SkeletonBadge width="w-20" />
              </div>

              {/* Big amount block */}
              <div className="p-4 rounded-xl haven-skeleton-base border border-teal-500/15 mb-3 space-y-2">
                <SkeletonText width="w-32" height="h-3" />
                <SkeletonTitle width="w-40" height="h-8" />
                <div className="w-full h-2 rounded-full haven-skeleton-shimmer bg-teal-500/20" />
              </div>

              <div className="p-3 rounded-xl haven-skeleton-base border border-teal-500/10 flex items-center justify-between">
                <SkeletonText width="w-36" height="h-3" />
                <SkeletonBadge width="w-24" />
              </div>
            </div>

            <div className="pt-3 border-t border-border/40 flex justify-end">
              <SkeletonButton width="w-36" height="h-9" />
            </div>
          </SkeletonCard>
        </div>
      </div>

      {/* 3. Statutory Case Timeline */}
      <SkeletonCard className="p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-border/50 mb-6">
          <div className="flex items-center gap-2.5">
            <SkeletonIcon size="w-10 h-10" />
            <div className="space-y-1">
              <SkeletonTitle width="w-48" height="h-6" />
              <SkeletonText width="w-60" height="h-3" />
            </div>
          </div>
          <SkeletonBadge width="w-36" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-xl haven-skeleton-base border border-teal-500/10 space-y-2"
            >
              <div className="flex items-center justify-between">
                <SkeletonAvatar size="w-6 h-6" />
                <SkeletonBadge width="w-16" />
              </div>
              <SkeletonTitle width="w-28" height="h-5" />
              <SkeletonText width="w-full" height="h-3" />
              <SkeletonText width="w-2/3" height="h-2.5" />
            </div>
          ))}
        </div>
      </SkeletonCard>

      {/* 4. Encrypted Legal Document Vault */}
      <SkeletonCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-border/50 mb-5">
          <div className="flex items-center gap-2.5">
            <SkeletonIcon size="w-9 h-9" />
            <div className="space-y-1">
              <SkeletonTitle width="w-56" height="h-6" />
              <SkeletonText width="w-48" height="h-3" />
            </div>
          </div>
          <SkeletonBadge width="w-36" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-xl haven-skeleton-base border border-teal-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <SkeletonIcon size="w-10 h-10" />
                <div className="space-y-1">
                  <SkeletonText width="w-48" height="h-4" />
                  <SkeletonText width="w-64" height="h-3" />
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <SkeletonBadge width="w-24" />
                <SkeletonButton width="w-28" height="h-8" />
              </div>
            </div>
          ))}
        </div>
      </SkeletonCard>
    </div>
  );
};
