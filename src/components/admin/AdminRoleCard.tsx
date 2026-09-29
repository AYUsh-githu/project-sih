import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import type { AnimatedIconHandle, AnimatedIconProps } from "@/components/icons/types";

export interface AdminRoleCardProps {
  id: "counselor" | "district" | "state";
  title: string;
  badge?: string;
  description: string;
  buttonLabel: string;
  icon: React.ForwardRefExoticComponent<
    AnimatedIconProps & React.RefAttributes<AnimatedIconHandle>
  >;
  accentColor: "teal" | "amber" | "emerald";
  onSelect: () => void;
}

export const AdminRoleCard: React.FC<AdminRoleCardProps> = ({
  title,
  badge,
  description,
  buttonLabel,
  icon: Icon,
  accentColor,
  onSelect,
}) => {
  const iconRef = useRef<AnimatedIconHandle>(null);

  // Theme-tailored styles for each role tier
  const colorStyles = {
    teal: {
      cardBorder: "border-teal-500/25 hover:border-teal-400/60 dark:border-teal-500/30 dark:hover:border-haven-teal/70",
      glowBg: "bg-teal-500/10 group-hover:bg-teal-500/15",
      iconContainer: "bg-teal-500/15 dark:bg-teal-500/20 border-teal-600/30 dark:border-teal-400/40 text-teal-800 dark:text-haven-teal shadow-[0_0_20px_rgba(45,212,191,0.25)]",
      badge: "bg-teal-500/15 text-teal-900 dark:text-haven-teal border-teal-500/30",
      button: "bg-teal-600 hover:bg-teal-700 dark:bg-teal-500/20 dark:hover:bg-teal-500/30 text-white dark:text-haven-teal border border-teal-600/30 dark:border-teal-400/40 shadow-sm",
      btnArrow: "text-white dark:text-haven-teal",
    },
    amber: {
      cardBorder: "border-amber-500/25 hover:border-amber-400/60 dark:border-amber-500/30 dark:hover:border-amber-400/70",
      glowBg: "bg-amber-500/10 group-hover:bg-amber-500/15",
      iconContainer: "bg-amber-500/15 dark:bg-amber-500/20 border-amber-600/30 dark:border-amber-400/40 text-amber-800 dark:text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)]",
      badge: "bg-amber-500/15 text-amber-900 dark:text-amber-300 border-amber-500/30",
      button: "bg-amber-600 hover:bg-amber-700 dark:bg-amber-500/20 dark:hover:bg-amber-500/30 text-white dark:text-amber-300 border border-amber-600/30 dark:border-amber-400/40 shadow-sm",
      btnArrow: "text-white dark:text-amber-300",
    },
    emerald: {
      cardBorder: "border-emerald-500/25 hover:border-emerald-400/60 dark:border-emerald-500/30 dark:hover:border-emerald-400/70",
      glowBg: "bg-emerald-500/10 group-hover:bg-emerald-500/15",
      iconContainer: "bg-emerald-500/15 dark:bg-emerald-500/20 border-emerald-600/30 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
      badge: "bg-emerald-500/15 text-emerald-900 dark:text-emerald-300 border-emerald-500/30",
      button: "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500/20 dark:hover:bg-emerald-500/30 text-white dark:text-emerald-300 border border-emerald-600/30 dark:border-emerald-400/40 shadow-sm",
      btnArrow: "text-white dark:text-emerald-300",
    },
  }[accentColor];

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
      className={`glass-card group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer overflow-hidden ${colorStyles.cardBorder}`}
    >
      {/* Background Soft Aura */}
      <div
        className={`absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl transition-opacity duration-500 opacity-60 group-hover:opacity-100 pointer-events-none ${colorStyles.glowBg}`}
      />

      {/* Top Section: Icon, Badge, and Title */}
      <div className="flex flex-col items-center text-center">
        {/* Prominent Circular Icon Container (Dual-Trigger) */}
        <div
          className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-110 mb-5 relative ${colorStyles.iconContainer}`}
        >
          <Icon ref={iconRef} size={36} className="transition-transform duration-300" />
        </div>

        {/* Optional Role Badge */}
        {badge && (
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 border ${colorStyles.badge}`}
          >
            {badge}
          </span>
        )}

        {/* Role Title */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight mb-3 group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors">
          {title}
        </h2>

        {/* Role Purpose Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs mb-8">
          {description}
        </p>
      </div>

      {/* Action Button: "Continue as ..." */}
      <div className="pt-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`w-full py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 group-hover:scale-[1.02] cursor-pointer ${colorStyles.button}`}
        >
          <span>{buttonLabel}</span>
          <ArrowRight
            className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${colorStyles.btnArrow}`}
          />
        </button>
      </div>
    </div>
  );
};

export default AdminRoleCard;
