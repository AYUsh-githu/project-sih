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

export const HomeSkeleton: React.FC = () => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading Home dashboard"
      className="flex-1 flex flex-col max-w-6xl mx-auto w-full py-2 sm:py-4"
    >
      {/* 1. Greeting Header & Mood Check-in Skeleton */}
      <SkeletonCard className="p-6 sm:p-8 mb-6">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: Personalized Greeting & Assurance */}
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <SkeletonBadge width="w-32" />
              <SkeletonBadge width="w-40" />
            </div>

            <SkeletonTitle width="w-64 sm:w-80" height="h-9 sm:h-10" />
            <SkeletonParagraph lines={2} className="max-w-xl" />
          </div>

          {/* Right: Gentle Check-in Mood Bar */}
          <div className="flex flex-col sm:items-end justify-center bg-teal-50/70 dark:bg-black/40 p-4 rounded-xl border border-teal-600/20 dark:border-teal-500/20 max-w-lg w-full md:w-auto">
            <div className="flex items-center gap-2 mb-3">
              <SkeletonIcon size="w-4 h-4" />
              <SkeletonText width="w-48" height="h-3" />
            </div>

            <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-2 w-full">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonButton
                  key={i}
                  width="w-20"
                  height="h-8"
                  pill
                />
              ))}
            </div>
          </div>
        </div>
      </SkeletonCard>

      {/* 2. Quick Actions Grid Skeleton (3 Feature Cards) */}
      <section aria-hidden="true" className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard
              key={i}
              className="p-6 sm:p-8 flex flex-col justify-between min-h-[260px]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <SkeletonIcon size="w-12 h-12" />
                  <SkeletonBadge width="w-24" />
                </div>
                <SkeletonTitle width="w-36" height="h-6" className="mb-2" />
                <SkeletonParagraph lines={2} />
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <SkeletonText width="w-28" height="h-4" />
                <SkeletonIcon size="w-5 h-5" />
              </div>
            </SkeletonCard>
          ))}
        </div>
      </section>

      {/* 3. My Case Timeline Skeleton */}
      <SkeletonCard className="p-6 sm:p-8 mb-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-border/50 mb-6">
          <div className="flex items-center gap-2.5">
            <SkeletonIcon size="w-10 h-10" />
            <div className="space-y-1">
              <SkeletonTitle width="w-44" height="h-6" />
              <SkeletonText width="w-56" height="h-3" />
            </div>
          </div>
          <SkeletonBadge width="w-36" />
        </div>

        {/* 4 Case Milestones Horizontal/Vertical Rail */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-xl haven-skeleton-base border border-teal-500/10 space-y-3"
            >
              <div className="flex items-center justify-between">
                <SkeletonAvatar size="w-7 h-7" />
                <SkeletonBadge width="w-20" />
              </div>
              <SkeletonTitle width="w-28" height="h-5" />
              <SkeletonText width="w-full" height="h-3" />
              <SkeletonText width="w-3/4" height="h-3" />
            </div>
          ))}
        </div>

        {/* Critical Witness Threat Action Box */}
        <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <SkeletonIcon size="w-9 h-9" />
            <div className="space-y-1">
              <SkeletonText width="w-48" height="h-4" />
              <SkeletonText width="w-72" height="h-3" />
            </div>
          </div>
          <SkeletonButton width="w-32" height="h-9" />
        </div>

        {/* Financial Relief Rail Summary */}
        <div className="p-4 rounded-xl border border-teal-500/20 bg-teal-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <SkeletonIcon size="w-9 h-9" />
            <div className="space-y-1">
              <SkeletonText width="w-40" height="h-4" />
              <SkeletonText width="w-60" height="h-3" />
            </div>
          </div>
          <SkeletonBadge width="w-28" />
        </div>
      </SkeletonCard>

      {/* 4. Upcoming Appointment Card Skeleton */}
      <SkeletonCard className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-border/50 mb-5">
          <div className="flex items-center gap-2.5">
            <SkeletonIcon size="w-10 h-10" />
            <div className="space-y-1">
              <SkeletonTitle width="w-48" height="h-6" />
              <SkeletonText width="w-40" height="h-3" />
            </div>
          </div>
          <SkeletonBadge width="w-32" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <SkeletonAvatar size="w-14 h-14" />
            <div className="space-y-1.5">
              <SkeletonTitle width="w-40" height="h-5" />
              <SkeletonText width="w-52" height="h-3.5" />
              <div className="flex items-center gap-2 pt-1">
                <SkeletonBadge width="w-24" />
                <SkeletonBadge width="w-28" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SkeletonButton width="w-40" height="h-11" />
            <SkeletonButton width="w-28" height="h-11" />
          </div>
        </div>
      </SkeletonCard>
    </div>
  );
};
