import React, { useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { SunIcon, MoonIcon, AnimatedIconHandle } from "@/components/icons";
import { useAvatar } from "@/context/AvatarContext";

interface ThemeToggleButtonProps {
  className?: string;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const { triggerCategory } = useAvatar();
  const iconRef = useRef<AnimatedIconHandle>(null);

  const handleToggle = () => {
    toggleTheme();
    triggerCategory("presence");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
      aria-label="Toggle theme"
      className={`p-2.5 rounded-xl glass-card text-foreground hover:text-haven-teal hover:border-teal-400/40 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-haven-teal cursor-pointer ${className}`}
    >
      {theme === "dark" ? (
        <SunIcon ref={iconRef} size={20} className="w-5 h-5 text-amber-300" />
      ) : (
        <MoonIcon ref={iconRef} size={20} className="w-5 h-5 text-slate-700 dark:text-slate-300" />
      )}
    </button>
  );
};

