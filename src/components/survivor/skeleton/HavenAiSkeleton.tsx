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
  SkeletonInput,
} from "./primitives";

export const HavenAiSkeleton: React.FC = () => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading Haven AI companion"
      className="flex-1 flex flex-col max-w-6xl mx-auto w-full py-2 sm:py-4"
    >
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Haven AI Stage & Chat History Archive (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col space-y-5 w-full">
          {/* Main Haven AI Stage Skeleton */}
          <SkeletonCard className="p-5 sm:p-6 flex flex-col min-h-[580px] justify-between">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <SkeletonAvatar size="w-11 h-11" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <SkeletonTitle width="w-28" height="h-5" />
                      <SkeletonBadge width="w-20" />
                    </div>
                    <SkeletonText width="w-36" height="h-3" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <SkeletonBadge width="w-28" />
                  <SkeletonIcon size="w-9 h-9" />
                </div>
              </div>

              {/* Prompt Suggestion Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl haven-skeleton-base border border-teal-500/10 space-y-1.5"
                  >
                    <div className="flex items-center gap-1.5">
                      <SkeletonIcon size="w-4 h-4" />
                      <SkeletonText width="w-20" height="h-3" />
                    </div>
                    <SkeletonText width="w-full" height="h-3.5" />
                  </div>
                ))}
              </div>

              {/* Chat Message Bubble Area */}
              <div className="space-y-4 py-2">
                {/* AI Welcome Message Bubble */}
                <div className="max-w-[90%] p-4 rounded-2xl rounded-tl-sm haven-skeleton-base border border-teal-500/15 space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <SkeletonAvatar size="w-6 h-6" />
                    <SkeletonText width="w-24" height="h-3.5" />
                    <SkeletonBadge width="w-16" />
                  </div>
                  <SkeletonParagraph lines={3} />
                  <div className="flex justify-end pt-1">
                    <SkeletonText width="w-14" height="h-2.5" />
                  </div>
                </div>

                {/* Optional Second Prompt Placeholder */}
                <div className="max-w-[75%] ml-auto p-3.5 rounded-2xl rounded-tr-sm haven-skeleton-base border border-white/5 space-y-1.5">
                  <SkeletonText width="w-full" height="h-3" />
                  <SkeletonText width="w-3/4" height="h-3" />
                </div>
              </div>
            </div>

            {/* Input Row at bottom */}
            <div className="pt-4 border-t border-border/40">
              <div className="p-2.5 rounded-2xl bg-teal-50/70 dark:bg-black/40 border border-teal-600/20 dark:border-teal-500/20 flex items-center gap-2.5">
                <SkeletonInput height="h-10" className="border-0 bg-transparent flex-1" />
                <SkeletonIcon size="w-10 h-10" />
                <SkeletonIcon size="w-10 h-10" />
              </div>
            </div>
          </SkeletonCard>

          {/* Chat History Section Skeleton */}
          <SkeletonCard className="p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <SkeletonIcon size="w-7 h-7" />
                <SkeletonTitle width="w-44" height="h-5" />
              </div>
              <SkeletonBadge width="w-24" />
            </div>

            <div className="space-y-2.5">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl haven-skeleton-base border border-teal-500/10 flex items-center justify-between gap-3"
                >
                  <div className="space-y-1 flex-1">
                    <SkeletonText width="w-3/4" height="h-3.5" />
                    <SkeletonText width="w-1/3" height="h-2.5" />
                  </div>
                  <SkeletonBadge width="w-16" />
                </div>
              ))}
            </div>
          </SkeletonCard>
        </div>

        {/* RIGHT COLUMN: Active Case Snapshot & AI Suggestions (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col space-y-5 w-full">
          {/* Active Case Snapshot */}
          <SkeletonCard className="p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border/50">
              <SkeletonTitle width="w-36" height="h-5" />
              <SkeletonBadge width="w-28" />
            </div>

            {/* Next Hearing Card */}
            <div className="p-4 rounded-xl haven-skeleton-base border border-teal-500/10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SkeletonIcon size="w-5 h-5" />
                  <SkeletonText width="w-24" height="h-3" />
                </div>
                <SkeletonBadge width="w-16" />
              </div>
              <SkeletonTitle width="w-48" height="h-6" />
              <SkeletonText width="w-40" height="h-3" />
            </div>

            {/* Protection Tier Card */}
            <div className="p-4 rounded-xl haven-skeleton-base border border-teal-500/10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SkeletonIcon size="w-5 h-5" />
                  <SkeletonText width="w-32" height="h-3" />
                </div>
                <SkeletonBadge width="w-20" />
              </div>
              <SkeletonText width="w-full" height="h-3" />
              <SkeletonButton width="w-full" height="h-9" />
            </div>

            {/* Assigned Counselor Card */}
            <div className="p-4 rounded-xl haven-skeleton-base border border-teal-500/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <SkeletonAvatar size="w-10 h-10" />
                <div className="space-y-1">
                  <SkeletonTitle width="w-28" height="h-4" />
                  <SkeletonText width="w-36" height="h-2.5" />
                </div>
              </div>
              <SkeletonButton width="w-20" height="h-8" />
            </div>
          </SkeletonCard>

          {/* AI Suggestions Card */}
          <SkeletonCard className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <SkeletonIcon size="w-6 h-6" />
                <SkeletonTitle width="w-32" height="h-5" />
              </div>
              <SkeletonBadge width="w-20" />
            </div>
            <SkeletonText width="w-52" height="h-3" />

            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl haven-skeleton-base border border-teal-500/10 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <SkeletonText width="w-28" height="h-3.5" />
                    <SkeletonBadge width="w-16" />
                  </div>
                  <SkeletonText width="w-full" height="h-3" />
                  <div className="flex justify-end pt-1">
                    <SkeletonButton width="w-24" height="h-7" />
                  </div>
                </div>
              ))}
            </div>
          </SkeletonCard>
        </div>
      </div>
    </div>
  );
};
