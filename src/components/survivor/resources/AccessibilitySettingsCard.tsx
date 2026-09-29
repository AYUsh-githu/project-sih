import React from "react";
import { Volume2, BookOpen, Type, Globe } from "lucide-react";

interface AccessibilitySettingsCardProps {
  audioNarrationEnabled: boolean;
  onToggleAudioNarration: () => void;
  plainLanguageEnabled: boolean;
  onTogglePlainLanguage: () => void;
  textSize: "normal" | "large" | "xlarge";
  onChangeTextSize: (size: "normal" | "large" | "xlarge") => void;
  language: string;
  onChangeLanguage: (lang: string) => void;
}

export const AccessibilitySettingsCard: React.FC<AccessibilitySettingsCardProps> = ({
  audioNarrationEnabled,
  onToggleAudioNarration,
  plainLanguageEnabled,
  onTogglePlainLanguage,
  textSize,
  onChangeTextSize,
  language,
  onChangeLanguage,
}) => {
  return (
    <div className="glass-card rounded-2xl p-5 border border-teal-500/20 shadow-md relative overflow-hidden mb-5">
      {/* Header */}
      <div className="pb-3.5 border-b border-border/50">
        <h3 className="text-sm font-bold text-foreground tracking-tight">
          Accessibility & Language
        </h3>
        <p className="text-[10px] text-muted-foreground">
          Make reading & listening comfortable for you
        </p>
      </div>

      <div className="pt-3.5 space-y-3.5 text-xs">
        {/* Audio Narration Toggle */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0">
              <Volume2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold text-foreground block leading-none">
                Audio narration
              </span>
              <span className="text-[10px] text-muted-foreground">
                Read aloud automatically
              </span>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={audioNarrationEnabled}
            onClick={onToggleAudioNarration}
            className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer relative ${
              audioNarrationEnabled ? "bg-teal-600 dark:bg-haven-teal" : "bg-slate-300 dark:bg-slate-700"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white dark:bg-slate-950 transition-transform ${
                audioNarrationEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Plain Language Summary Toggle */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold text-foreground block leading-none">
                Plain language summary
              </span>
              <span className="text-[10px] text-muted-foreground">
                Simplify statutory legal jargon
              </span>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={plainLanguageEnabled}
            onClick={onTogglePlainLanguage}
            className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer relative ${
              plainLanguageEnabled ? "bg-teal-600 dark:bg-haven-teal" : "bg-slate-300 dark:bg-slate-700"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white dark:bg-slate-950 transition-transform ${
                plainLanguageEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Text Size Control */}
        <div className="flex items-center justify-between gap-3 pt-1 border-t border-border/40">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Type className="w-3.5 h-3.5 text-teal-800 dark:text-haven-teal" />
            <span className="font-medium text-[11px]">Text size</span>
          </div>

          <div className="flex items-center gap-1 bg-white/70 dark:bg-white/[0.04] p-1 rounded-xl border border-border/60">
            {(["normal", "large", "xlarge"] as const).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => onChangeTextSize(size)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  textSize === size
                    ? "bg-teal-600 text-white dark:bg-haven-teal dark:text-slate-950 shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {size === "normal" ? "A" : size === "large" ? "A+" : "A++"}
              </button>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div className="flex items-center justify-between gap-3 pt-1 border-t border-border/40">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe className="w-3.5 h-3.5 text-teal-800 dark:text-haven-teal" />
            <span className="font-medium text-[11px]">Language</span>
          </div>

          <select
            value={language}
            onChange={(e) => onChangeLanguage(e.target.value)}
            className="px-2.5 py-1 rounded-xl bg-white/80 dark:bg-slate-900 border border-teal-500/30 text-foreground text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-haven-teal cursor-pointer"
          >
            <option value="English">English</option>
            <option value="Hindi">हिंदी (Hindi)</option>
            <option value="Telugu">తెలుగు (Telugu)</option>
            <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettingsCard;
