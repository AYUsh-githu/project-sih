import React from "react";

export interface SkeletonBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  animate?: boolean;
}

/**
 * Fundamental Haven Skeleton Element with subtle glassmorphic background & cyan/teal shimmer
 */
export const SkeletonBase: React.FC<SkeletonBaseProps> = ({
  className = "",
  animate = true,
  ...props
}) => {
  return (
    <div
      aria-hidden="true"
      className={`haven-skeleton-base ${
        animate ? "haven-skeleton-shimmer" : ""
      } rounded-lg ${className}`}
      {...props}
    />
  );
};

export interface SkeletonTextProps extends SkeletonBaseProps {
  width?: string;
  height?: string;
}

/**
 * Single-line text placeholder
 */
export const SkeletonText: React.FC<SkeletonTextProps> = ({
  width = "w-full",
  height = "h-3.5",
  className = "",
  ...props
}) => {
  return (
    <SkeletonBase
      className={`${width} ${height} rounded-md ${className}`}
      {...props}
    />
  );
};

export interface SkeletonTitleProps extends SkeletonBaseProps {
  width?: string;
  height?: string;
}

/**
 * Headline / Section title placeholder
 */
export const SkeletonTitle: React.FC<SkeletonTitleProps> = ({
  width = "w-48",
  height = "h-7 sm:h-8",
  className = "",
  ...props
}) => {
  return (
    <SkeletonBase
      className={`${width} ${height} rounded-xl ${className}`}
      {...props}
    />
  );
};

export interface SkeletonAvatarProps extends SkeletonBaseProps {
  size?: string;
}

/**
 * Circular avatar placeholder
 */
export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = "w-12 h-12",
  className = "",
  ...props
}) => {
  return (
    <SkeletonBase
      className={`${size} rounded-full flex-shrink-0 ${className}`}
      {...props}
    />
  );
};

export interface SkeletonIconProps extends SkeletonBaseProps {
  size?: string;
}

/**
 * Icon container placeholder matching Haven's rounded-xl icons
 */
export const SkeletonIcon: React.FC<SkeletonIconProps> = ({
  size = "w-10 h-10",
  className = "",
  ...props
}) => {
  return (
    <SkeletonBase
      className={`${size} rounded-xl flex-shrink-0 ${className}`}
      {...props}
    />
  );
};

export interface SkeletonButtonProps extends SkeletonBaseProps {
  width?: string;
  height?: string;
  pill?: boolean;
}

/**
 * Button placeholder matching Haven's rounded-2xl or rounded-xl buttons
 */
export const SkeletonButton: React.FC<SkeletonButtonProps> = ({
  width = "w-32",
  height = "h-11",
  pill = false,
  className = "",
  ...props
}) => {
  return (
    <SkeletonBase
      className={`${width} ${height} ${pill ? "rounded-full" : "rounded-2xl"} ${className}`}
      {...props}
    />
  );
};

export interface SkeletonBadgeProps extends SkeletonBaseProps {
  width?: string;
}

/**
 * Compact status/docket badge placeholder
 */
export const SkeletonBadge: React.FC<SkeletonBadgeProps> = ({
  width = "w-24",
  className = "",
  ...props
}) => {
  return (
    <SkeletonBase
      className={`${width} h-6 rounded-full flex-shrink-0 ${className}`}
      {...props}
    />
  );
};

export interface SkeletonInputProps extends SkeletonBaseProps {
  height?: string;
}

/**
 * Search or form input placeholder
 */
export const SkeletonInput: React.FC<SkeletonInputProps> = ({
  height = "h-12",
  className = "",
  ...props
}) => {
  return (
    <SkeletonBase
      className={`w-full ${height} rounded-xl border border-teal-500/15 ${className}`}
      {...props}
    />
  );
};

export interface SkeletonParagraphProps {
  lines?: number;
  className?: string;
}

/**
 * Multi-line paragraph placeholder with natural ragged text widths
 */
export const SkeletonParagraph: React.FC<SkeletonParagraphProps> = ({
  lines = 3,
  className = "",
}) => {
  const widths = ["w-full", "w-[94%]", "w-[85%]", "w-[72%]"];

  return (
    <div aria-hidden="true" className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonText
          key={i}
          width={widths[i % widths.length]}
          height="h-3.5"
        />
      ))}
    </div>
  );
};

export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Card surface placeholder matching Haven's dark glassmorphism
 */
export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      aria-hidden="true"
      className={`glass-card rounded-2xl border border-teal-500/15 p-6 shadow-xl relative overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export interface SkeletonStatProps extends SkeletonBaseProps {
  className?: string;
}

/**
 * Stat block placeholder with label, numeric value and subtitle
 */
export const SkeletonStat: React.FC<SkeletonStatProps> = ({
  className = "",
  ...props
}) => {
  return (
    <div aria-hidden="true" className={`space-y-2 p-4 rounded-xl haven-skeleton-base ${className}`} {...props}>
      <SkeletonText width="w-20" height="h-3" />
      <SkeletonTitle width="w-28" height="h-7" />
      <SkeletonText width="w-36" height="h-3" />
    </div>
  );
};

export interface SkeletonListItemProps {
  hasAvatar?: boolean;
  hasAction?: boolean;
  className?: string;
}

/**
 * List row placeholder with avatar/icon, 2-line text, and optional action
 */
export const SkeletonListItem: React.FC<SkeletonListItemProps> = ({
  hasAvatar = true,
  hasAction = true,
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-between p-3.5 rounded-xl haven-skeleton-base gap-3 ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {hasAvatar && <SkeletonAvatar size="w-10 h-10" />}
        <div className="flex-1 space-y-1.5 min-w-0">
          <SkeletonText width="w-3/4" height="h-4" />
          <SkeletonText width="w-1/2" height="h-3" />
        </div>
      </div>
      {hasAction && <SkeletonBadge width="w-16" />}
    </div>
  );
};

export interface SkeletonTimelineProps {
  steps?: number;
  className?: string;
}

/**
 * Timeline rail placeholder with connected stages
 */
export const SkeletonTimeline: React.FC<SkeletonTimelineProps> = ({
  steps = 4,
  className = "",
}) => {
  return (
    <div aria-hidden="true" className={`space-y-4 ${className}`}>
      {Array.from({ length: steps }).map((_, i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="flex flex-col items-center">
            <SkeletonAvatar size="w-8 h-8" />
            {i < steps - 1 && (
              <div className="w-0.5 h-12 haven-skeleton-base my-1" />
            )}
          </div>
          <div className="flex-1 space-y-2 pt-1 pb-4">
            <div className="flex items-center justify-between gap-2">
              <SkeletonText width="w-40" height="h-4" />
              <SkeletonBadge width="w-20" />
            </div>
            <SkeletonText width="w-full" height="h-3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export interface SkeletonChartProps {
  height?: string;
  className?: string;
}

/**
 * Chart card placeholder with subtle bar graphs
 */
export const SkeletonChart: React.FC<SkeletonChartProps> = ({
  height = "h-48",
  className = "",
}) => {
  return (
    <SkeletonCard className={`flex flex-col justify-between ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <SkeletonTitle width="w-36" height="h-5" />
        <SkeletonBadge width="w-20" />
      </div>
      <div className={`w-full ${height} flex items-end justify-between gap-3 px-2 py-4 haven-skeleton-base rounded-xl`}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md haven-skeleton-shimmer bg-teal-500/10"
            style={{
              height: `${25 + ((i * 19 + 7) % 65)}%`,
            }}
          />
        ))}
      </div>
    </SkeletonCard>
  );
};

export interface SkeletonTableProps {
  rows?: number;
  cols?: number;
  className?: string;
}

/**
 * Table placeholder with header row & data rows
 */
export const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 4,
  cols = 4,
  className = "",
}) => {
  return (
    <div aria-hidden="true" className={`haven-skeleton-base rounded-2xl p-4 space-y-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/5">
        {Array.from({ length: cols }).map((_, i) => (
          <SkeletonText key={i} width="w-24" height="h-4" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="flex items-center justify-between gap-4 py-2 border-b border-white/5 last:border-0"
        >
          {Array.from({ length: cols }).map((_, colIdx) => (
            <SkeletonText
              key={colIdx}
              width={colIdx === 0 ? "w-32" : "w-20"}
              height="h-3.5"
            />
          ))}
        </div>
      ))}
    </div>
  );
};
