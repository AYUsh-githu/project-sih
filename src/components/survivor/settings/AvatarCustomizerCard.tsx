import React from "react";
import { useAvatar, CHASSIS_PRESETS } from "@/context/AvatarContext";

export const AvatarCustomizerCard: React.FC = () => {
  const { settings, updateSettings } = useAvatar();

  return (
    <div className="glass-card rounded-2xl p-6 border border-teal-500/20 shadow-xl mb-6 relative overflow-hidden">
      {/* 1. Dark Mode High-Contrast Visibility Engine (Directly from Screenshot) */}
      <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-black/40 border border-teal-600/20 dark:border-teal-500/20 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">🌓</span>
          <h3 className="text-sm sm:text-base font-bold text-foreground">
            Dark Mode High-Contrast Visibility Engine
          </h3>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
          In dark mode, dark chassis colors can disappear into the canvas. Haven solves this with dual-spectrum rim lighting: an active <strong>Luminescent Cosmic Drop-Shadow Aura</strong> and <strong>Chassis High-Contrast Presets</strong> that ensure the avatar is unmistakably visible and therapeutic.
        </p>

        <div>
          <div className="flex items-center justify-between text-xs font-bold text-foreground mb-1.5">
            <span>Cosmic Halo Glow Intensity:</span>
            <span className="text-teal-800 dark:text-haven-teal font-mono">
              {settings.haloGlowIntensity}%
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={settings.haloGlowIntensity}
            onChange={(e) =>
              updateSettings({ haloGlowIntensity: Number(e.target.value) })
            }
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
        </div>
      </div>

      {/* 2. Chassis Color & Persona Presets (Directly from Screenshot) */}
      <div className="mb-6">
        <label className="text-xs sm:text-sm font-bold text-foreground block mb-3">
          Chassis Color & Persona Presets:
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5">
          {CHASSIS_PRESETS.map((preset) => {
            const isSelected = settings.chassisColor.toLowerCase() === preset.color.toLowerCase();

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => updateSettings({ chassisColor: preset.color })}
                style={{
                  backgroundColor: preset.color,
                  color: preset.textColor,
                }}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                  isSelected
                    ? "ring-4 ring-teal-400/80 scale-105 shadow-md"
                    : "opacity-90 hover:opacity-100 hover:scale-102"
                }`}
              >
                <span>{preset.icon}</span>
                <span>{preset.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Geometry & Scale Sliders (Directly from Screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/50">
        {/* Avatar Size */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-foreground mb-1.5">
            <span>Avatar Size:</span>
            <span className="text-teal-800 dark:text-haven-teal font-mono">
              {settings.avatarSize}px
            </span>
          </div>

          <input
            type="range"
            min={100}
            max={180}
            step={5}
            value={settings.avatarSize}
            onChange={(e) =>
              updateSettings({ avatarSize: Number(e.target.value) })
            }
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
        </div>

        {/* Head Curvature */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-foreground mb-1.5">
            <span>Head Curvature:</span>
            <span className="text-teal-800 dark:text-haven-teal font-mono">
              {settings.headCurvature}%
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={settings.headCurvature}
            onChange={(e) =>
              updateSettings({ headCurvature: Number(e.target.value) })
            }
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AvatarCustomizerCard;
