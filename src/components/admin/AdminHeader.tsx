import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bell, ChevronDown } from "lucide-react";
import { SproutIcon } from "@/components/icons";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";

export const AdminHeader: React.FC = () => {
  return (
    <header className="flex-shrink-0 flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-border bg-[var(--glass-bg)] backdrop-blur-xl z-20 transition-colors duration-300">
      {/* Brand & Subtitle */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-foreground hover:text-haven-teal transition-colors group"
        >
          <div className="w-8 h-8 rounded-xl bg-teal-500/15 border border-teal-600/30 dark:border-teal-400/30 flex items-center justify-center text-teal-800 dark:text-haven-teal group-hover:scale-105 transition-transform shadow-xs">
            <SproutIcon size={18} className="text-teal-800 dark:text-haven-teal" />
          </div>
          <span className="text-lg font-extrabold tracking-tight">Haven</span>
        </Link>

        {/* Vertical divider and tagline */}
        <div className="hidden md:flex items-center gap-3 pl-3 border-l border-border/60 text-xs text-muted-foreground font-medium">
          <span>Support</span>
          <span className="w-1 h-1 rounded-full bg-teal-500/60" />
          <span>Protection</span>
          <span className="w-1 h-1 rounded-full bg-teal-500/60" />
          <span>Justice</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notification Bell */}
        <div
          title="Active Government Alerts"
          className="p-2 rounded-xl glass-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer relative"
        >
          <Bell className="w-4 h-4 text-teal-700 dark:text-haven-teal" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_6px_rgba(94,234,212,0.8)]" />
        </div>

        {/* Government Portal Badge */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-card border border-teal-500/25 text-xs font-semibold text-foreground">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Government Portal</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground ml-0.5" />
        </div>

        {/* Theme Toggle */}
        <ThemeToggleButton />

        {/* Back to Home Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50/80 dark:bg-white/[0.04] hover:bg-teal-500/15 border border-border/60 hover:border-teal-500/30 text-xs font-semibold text-foreground transition-all duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Home</span>
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;
