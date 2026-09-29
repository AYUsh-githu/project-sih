import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, LogOut } from "lucide-react";
import {
  HomeIcon,
  SparklesIcon,
  FileDescriptionIcon,
  UsersGroupIcon,
  BookIcon,
  ShieldCheckIcon,
  SettingsIcon,
} from "@/components/icons";
import type { AnimatedIconHandle, AnimatedIconProps } from "@/components/icons/types";

interface NavItemConfig {
  to: string;
  label: string;
  icon: React.ForwardRefExoticComponent<
    AnimatedIconProps & React.RefAttributes<AnimatedIconHandle>
  >;
}

const NAV_ITEMS: NavItemConfig[] = [
  { to: "/survivor/home", label: "Home", icon: HomeIcon },
  { to: "/survivor/haven-ai", label: "Haven AI", icon: SparklesIcon },
  { to: "/survivor/case-tracking", label: "Case Tracking", icon: FileDescriptionIcon },
  { to: "/survivor/community", label: "Community & Peer Support", icon: UsersGroupIcon },
  { to: "/survivor/resources", label: "Resources", icon: BookIcon },
  { to: "/survivor/settings", label: "Settings", icon: SettingsIcon },
];

interface SidebarNavItemProps {
  item: NavItemConfig;
  isCollapsed: boolean;
  onItemClick?: () => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  item,
  isCollapsed,
  onItemClick,
}) => {
  const iconRef = useRef<AnimatedIconHandle>(null);
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      title={isCollapsed ? item.label : undefined}
      onClick={onItemClick}
      onMouseEnter={() => {
        iconRef.current?.startAnimation();
      }}
      onMouseLeave={() => {
        iconRef.current?.stopAnimation();
      }}
      className={({ isActive }) =>
        `group flex items-center gap-3 mx-2.5 my-1 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-haven-teal cursor-pointer ${
          isActive
            ? "bg-teal-500/15 ring-1 ring-teal-600/30 dark:ring-teal-400/30 text-teal-800 dark:text-haven-teal shadow-[0_0_0_1px_rgba(15,118,110,0.15)] dark:shadow-[0_0_0_1px_rgba(94,234,212,0.15)] font-semibold"
            : "text-muted-foreground hover:text-foreground hover:bg-slate-900/5 dark:hover:bg-white/5 hover:translate-x-0.5"
        } ${isCollapsed ? "justify-center px-0" : ""}`
      }
    >
      {({ isActive }) => (
        <>
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
              isActive
                ? "bg-teal-500/20 text-teal-800 dark:text-haven-teal"
                : "bg-slate-900/5 dark:bg-white/5 text-muted-foreground group-hover:text-foreground group-hover:bg-slate-900/10 dark:group-hover:bg-white/10"
            }`}
          >
            <Icon ref={iconRef} className="w-5 h-5 flex-shrink-0" />
          </div>
          {!isCollapsed && <span className="truncate">{item.label}</span>}
        </>
      )}
    </NavLink>
  );
};

const DpdpBadge: React.FC<{ onQuickExit?: () => void }> = ({ onQuickExit }) => {
  const shieldRef = useRef<AnimatedIconHandle>(null);

  const handleQuickExit = () => {
    // Immediate survivor protection: redirect to safe neutral page
    window.location.replace("https://www.google.com");
  };

  return (
    <div className="p-3 m-3 space-y-2 hidden md:block">
      {/* DPDP Protected Reassurance Card */}
      <div
        onMouseEnter={() => shieldRef.current?.startAnimation()}
        onMouseLeave={() => shieldRef.current?.stopAnimation()}
        className="p-3.5 rounded-xl glass-card border border-teal-500/20 text-xs text-muted-foreground cursor-default hover:border-teal-500/40 hover:bg-white/[0.04] transition-all group"
      >
        <div className="flex items-center gap-2 text-teal-800 dark:text-haven-teal font-semibold mb-1">
          <ShieldCheckIcon
            ref={shieldRef}
            size={16}
            className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform text-teal-700 dark:text-haven-teal"
          />
          <span>DPDP Protected</span>
        </div>
        <p className="text-[10px] leading-relaxed text-muted-foreground/90">
          Your identity and activity remain end-to-end encrypted and confidential.
        </p>
      </div>

      {/* Quick Exit Discreet Safety Button (Matches Reference UI) */}
      <button
        type="button"
        onClick={handleQuickExit}
        title="Instantly leave this site and open Google (Double Esc)"
        className="w-full py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer group"
      >
        <span className="flex items-center gap-2">
          <LogOut className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Quick Exit</span>
        </span>
        <kbd className="text-[10px] font-mono bg-rose-100 dark:bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-300 dark:border-rose-500/30 text-rose-800 dark:text-rose-300">
          Esc × 2
        </kbd>
      </button>
    </div>
  );
};

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  // Mobile drawer Escape listener + Double Escape for Quick Exit
  useEffect(() => {
    let lastEsc = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const now = Date.now();
        if (now - lastEsc < 800) {
          // Double Esc triggered: Quick Exit
          window.location.replace("https://www.google.com");
          return;
        }
        lastEsc = now;

        if (isMobileOpen) {
          e.preventDefault();
          onCloseMobile();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen, onCloseMobile]);

  const navContent = (
    <nav
      aria-label="Survivor dashboard"
      className="flex-1 flex flex-col justify-between overflow-y-auto overflow-x-hidden py-2"
    >
      <div className="flex flex-col">
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.to}
            item={item}
            isCollapsed={isCollapsed}
            onItemClick={() => {
              if (isMobileOpen) {
                onCloseMobile();
              }
            }}
          />
        ))}
      </div>

      {/* Safety Reassurance Badge & Quick Exit in expanded desktop sidebar */}
      {!isCollapsed && <DpdpBadge />}
    </nav>
  );

  return (
    <>
      {/* 1. Mobile Backdrop */}
      {isMobileOpen && (
        <div
          role="presentation"
          aria-hidden="true"
          onClick={onCloseMobile}
          className="md:hidden fixed inset-0 z-40 bg-background/60 backdrop-blur-sm animate-fade-in"
        />
      )}

      {/* 2. Mobile Drawer (using .sidebar-enter / .sidebar-enter-active / .sidebar-exit / .sidebar-exit-active from index.css) */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation drawer"
        className={`md:hidden fixed top-0 left-0 bottom-0 z-50 w-72 max-w-[85vw] flex flex-col bg-[var(--glass-bg)] border-r border-border backdrop-blur-xl shadow-2xl transition-transform duration-300 ease-gentle ${
          isMobileOpen
            ? "translate-x-0 sidebar-enter sidebar-enter-active"
            : "-translate-x-full sidebar-exit sidebar-exit-active pointer-events-none"
        }`}
      >
        {/* Mobile Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-800 dark:text-haven-teal">
              <ShieldCheckIcon size={16} className="w-4 h-4" />
            </div>
            <span className="font-bold text-foreground text-base tracking-tight">
              Haven Survivor
            </span>
          </div>

          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close navigation menu"
            className="p-2 rounded-xl glass-card text-muted-foreground hover:text-foreground hover:border-teal-400/40 transition-colors focus-visible:ring-2 focus-visible:ring-haven-teal cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Navigation List */}
        {navContent}
      </aside>

      {/* 3. Desktop Persistent Rail (md and up) */}
      <aside
        className={`hidden md:flex flex-col flex-shrink-0 h-full bg-[var(--glass-bg)] border-r border-border backdrop-blur-xl z-20 transition-all duration-300 ease-gentle ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Desktop Header with Brand & Collapse Button */}
        <div
          className={`flex items-center p-4 border-b border-border min-h-[64px] ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0">
                <ShieldCheckIcon size={16} className="w-4 h-4" />
              </div>
              <span className="font-bold text-foreground text-base tracking-tight truncate">
                Haven
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="p-2 rounded-xl glass-card text-foreground hover:text-haven-teal hover:border-teal-400/40 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-haven-teal cursor-pointer"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-teal-700 dark:text-haven-teal" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        {navContent}
      </aside>
    </>
  );
};
