import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 mt-auto py-6 sm:py-8 text-center px-4 border-t border-white/5 dark:border-teal-500/10">
      <div className="max-w-4xl mx-auto space-y-2.5">
        {/* Line 1 with a small pulse-gentle teal dot */}
        <p className="text-xs sm:text-sm font-medium text-foreground/85 flex items-center justify-center gap-2">
          <span
            aria-hidden="true"
            className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(94,234,212,0.8)] animate-pulse-gentle flex-shrink-0"
          />
          <span>In distress now? Tele-MANAS 14416 · Emergency 112</span>
        </p>

        {/* Line 2: Copyright and Hackathon credentials */}
        <p className="text-xs text-muted-foreground tracking-wide">
          © 2026 Haven · Team Esoteric · Smart India Hackathon 2026 · PS 26094
        </p>
      </div>
    </footer>
  );
};
