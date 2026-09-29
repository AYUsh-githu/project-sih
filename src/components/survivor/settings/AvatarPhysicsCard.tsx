import React from "react";
import { useAvatar } from "@/context/AvatarContext";

export const AvatarPhysicsCard: React.FC = () => {
  const { settings, updateSettings } = useAvatar();

  return (
    <div className="glass-card rounded-2xl p-6 border border-teal-500/20 shadow-xl mb-6 relative overflow-hidden">
      {/* Interactive Tactile Physics Cheatsheet (Directly from Screenshot) */}
      <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-black/40 border border-teal-600/20 dark:border-teal-500/20 mb-5">
        <h4 className="text-xs sm:text-sm font-bold text-foreground mb-3">
          Interactive Tactile Physics:
        </h4>

        <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-teal-800 dark:text-haven-teal font-bold">•</span>
            <span>
              <strong className="text-foreground">Eye Follow:</strong> Avatar gaze interpolates smoothly with cursor coordinates across all pages.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-800 dark:text-haven-teal font-bold">•</span>
            <span>
              <strong className="text-foreground">Head Drag:</strong> Click & pull the avatar to stretch elastic SVG jelly spring physics.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-800 dark:text-haven-teal font-bold">•</span>
            <span>
              <strong className="text-foreground">Center Press:</strong> Press and hold avatar center to compress squish.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-800 dark:text-haven-teal font-bold">•</span>
            <span>
              <strong className="text-foreground">Antenna Drag:</strong> Pull antenna tip upwards to test spring recoil.
            </span>
          </li>
        </ul>
      </div>

      {/* Dock Display Preference */}
      <div className="flex items-center justify-between gap-4 pt-3 border-t border-border/50">
        <div>
          <span className="text-xs font-bold text-foreground block">
            Show Floating Avatar in Bottom-Right Corner
          </span>
          <span className="text-[11px] text-muted-foreground">
            Keeps your therapeutic companion present across all survivor pages.
          </span>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={settings.isDockVisible}
          onClick={() =>
            updateSettings({ isDockVisible: !settings.isDockVisible })
          }
          className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer relative flex-shrink-0 ${
            settings.isDockVisible ? "bg-teal-600 dark:bg-haven-teal" : "bg-slate-300 dark:bg-slate-700"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white dark:bg-slate-950 transition-transform ${
              settings.isDockVisible ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default AvatarPhysicsCard;
