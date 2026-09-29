import React from "react";

export const CrisisStrip: React.FC = () => {
  return (
    <div className="py-4 text-center px-4" role="region" aria-label="Emergency Crisis Support">
      <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full glass-card border border-teal-500/20 text-xs sm:text-sm font-medium text-foreground/90 shadow-sm">
        <span
          aria-hidden="true"
          className="w-2.5 h-2.5 rounded-full bg-teal-600 dark:bg-teal-400 shadow-[0_0_8px_rgba(15,118,110,0.5)] dark:shadow-[0_0_8px_rgba(94,234,212,0.8)] animate-pulse-gentle flex-shrink-0"
        />
        <span>In distress right now?</span>
        <a
          href="tel:14416"
          className="text-teal-800 dark:text-haven-teal hover:underline font-semibold focus-visible:ring-2 focus-visible:ring-teal-600 dark:focus-visible:ring-haven-teal rounded-sm"
        >
          Tele-MANAS 14416
        </a>
        <span className="text-muted-foreground">·</span>
        <a
          href="tel:112"
          className="text-teal-800 dark:text-haven-teal hover:underline font-semibold focus-visible:ring-2 focus-visible:ring-teal-600 dark:focus-visible:ring-haven-teal rounded-sm"
        >
          Emergency 112
        </a>
      </div>
    </div>
  );
};
