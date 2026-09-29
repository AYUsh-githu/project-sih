import React from "react";
import { Menu } from "lucide-react";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { LanguageDropdown } from "./LanguageDropdown";
import { EmergencyButton } from "./EmergencyButton";

interface TopBarProps {
  onOpenMobileSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenMobileSidebar }) => {
  return (
    <header className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border bg-[var(--glass-bg)] backdrop-blur-xl z-10 transition-colors duration-300">
      {/* Left section: mobile hamburger button & optional title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          aria-label="Open navigation menu"
          className="md:hidden p-2 rounded-xl glass-card text-foreground hover:text-haven-teal hover:border-teal-400/40 transition-colors focus-visible:ring-2 focus-visible:ring-haven-teal cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground font-medium">
          <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(94,234,212,0.8)] animate-pulse-gentle" />
          <span>Survivor Dashboard</span>
        </div>
      </div>

      {/* Right cluster in specified exact order: ThemeToggle, LanguageDropdown, EmergencyButton */}
      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggleButton />
        <LanguageDropdown />
        <EmergencyButton />
      </div>
    </header>
  );
};
