import React from "react";
import { SparklesIcon } from "@/components/icons";

interface DashboardPlaceholderProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string; size?: number | string }>;
  chips?: string[];
}

export const DashboardPlaceholder: React.FC<DashboardPlaceholderProps> = ({
  title,
  description = "This section is coming in the next build. Dynamic monitoring, human care network, and case support are actively being integrated.",
  icon: Icon = SparklesIcon,
  chips = [],
}) => {
  // Tilt handler: write CSS variables --tilt-rx and --tilt-ry
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Gentle tilt: ±5 degrees
    const rx = ((y - centerY) / centerY) * -5;
    const ry = ((x - centerX) / centerX) * 5;
    e.currentTarget.style.setProperty("--tilt-rx", `${rx.toFixed(2)}deg`);
    e.currentTarget.style.setProperty("--tilt-ry", `${ry.toFixed(2)}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    // Reset smoothly to 0deg so the CSS transition smoothly returns the card to flat resting position
    e.currentTarget.style.setProperty("--tilt-rx", "0deg");
    e.currentTarget.style.setProperty("--tilt-ry", "0deg");
  };

  return (
    <div className="flex-1 flex items-center justify-center py-8 sm:py-12">
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-card tilt-card group animate-scale-in p-8 sm:p-12 max-w-md w-full text-center rounded-2xl border border-teal-500/20 shadow-2xl select-none"
      >
        {/* Gradient Icon Container matching FeatureCards.tsx */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-teal-500/25 via-cyan-500/20 to-teal-400/10 border border-teal-500/30 flex items-center justify-center mx-auto mb-6 text-haven-teal shadow-inner group-hover:scale-105 transition-transform duration-300">
          <Icon className="w-8 h-8 group-hover:animate-pulse-gentle transition-transform duration-300" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-foreground">
          {title}
        </h1>

        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          {description}
        </p>

        {/* Feature preview chips */}
        {chips.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-teal-500/10 border border-teal-500/20 text-[11px] text-haven-teal px-3 py-1 font-medium"
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* Active development badge with shimmer animation */}
        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-haven-teal text-xs font-medium bg-[length:200%_100%] animate-shimmer">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>In Active Development · Safe & Confidential</span>
        </div>
      </div>
    </div>
  );
};
