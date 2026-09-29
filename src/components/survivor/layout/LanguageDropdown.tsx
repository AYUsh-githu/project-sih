import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { GlobeIcon, AnimatedIconHandle } from "@/components/icons";

interface LanguageOption {
  code: string;
  label: string;
  nativeLabel: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
  { code: "hi", label: "Hindi", nativeLabel: "హిन्दी" },
  { code: "en", label: "English", nativeLabel: "English" },
];

export const LanguageDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string>("English");
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const globeRef = useRef<AnimatedIconHandle>(null);

  // Close on outside click or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (lang: string) => {
    setSelectedLang(lang);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => globeRef.current?.startAnimation()}
        onMouseLeave={() => globeRef.current?.stopAnimation()}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select display language"
        className="glass-card flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium text-foreground hover:text-haven-teal hover:border-teal-400/40 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-haven-teal cursor-pointer group"
      >
        <GlobeIcon ref={globeRef} size={16} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-800 dark:text-haven-teal flex-shrink-0" />
        <span className="truncate max-w-[70px] sm:max-w-[100px]">{selectedLang}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180 text-teal-800 dark:text-haven-teal" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Available languages"
          className="glass-card absolute right-0 mt-2 w-52 sm:w-56 rounded-xl border border-teal-500/25 shadow-2xl p-1.5 z-50 animate-scale-in bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl"
        >
          <div className="py-1">
            {LANGUAGES.map((lang) => {
              const isSelected = selectedLang === lang.label;
              return (
                <button
                  key={lang.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(lang.label)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors cursor-pointer text-left ${
                    isSelected
                      ? "bg-teal-500/15 text-teal-800 dark:text-haven-teal font-semibold"
                      : "text-foreground hover:bg-slate-100/80 dark:hover:bg-white/5 hover:text-teal-800 dark:hover:text-haven-teal"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.label}</span>
                    <span className="text-xs text-muted-foreground">({lang.nativeLabel})</span>
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-teal-700 dark:text-haven-teal" />}
                </button>
              );
            })}
          </div>

          {/* 12+ languages placeholder banner */}
          <div className="border-t border-border/60 mt-1 pt-2 px-3 pb-1">
            <span className="block text-[11px] text-muted-foreground italic">
              12+ more languages coming soon
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
