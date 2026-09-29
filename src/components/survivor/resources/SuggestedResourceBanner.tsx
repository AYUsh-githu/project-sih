import React, { useRef } from "react";
import {
  SparklesIcon,
  ArrowRightIcon,
  ClockIcon,
  AnimatedIconHandle,
} from "@/components/icons";
import { Volume2 } from "lucide-react";
import { ResourceItem, FEATURED_RESOURCES } from "./resourceData";

interface SuggestedResourceBannerProps {
  onSelectResource: (resource: ResourceItem) => void;
}

export const SuggestedResourceBanner: React.FC<SuggestedResourceBannerProps> = ({
  onSelectResource,
}) => {
  const sparklesRef = useRef<AnimatedIconHandle>(null);
  const arrowRef = useRef<AnimatedIconHandle>(null);
  const clockRef = useRef<AnimatedIconHandle>(null);

  // The personalized suggested resource based on case stage
  const suggestedGuide: ResourceItem = {
    id: "hearing-guide",
    title: "Understanding a Hearing: What to Expect in Court",
    category: "process",
    categoryLabel: "Understanding the Process",
    readTime: "6 min read",
    audioLength: "4:30",
    language: "English & Hindi",
    summary:
      "Since you have an upcoming hearing scheduled for 14 October at Fast-Track Special Court #3, here is a simple, trauma-informed guide on courtroom procedures, advocate roles, and your Section 15A rights.",
    plainLanguageSummary:
      "A calm, clear explanation of what happens when you enter the courtroom, where you will sit, and how your lawyer will protect you.",
    fullContent: [
      "Court Hall Layout: Inside Special Court #3, you will sit next to your assigned DLSA legal aid counsel (Adv. Shri M. K. Rao). The judge presides from the bench, and the public prosecutor represents the State on your behalf.",
      "In-Camera Proceeding Option: Under Section 15A(6)(b), you have the right to request an in-camera hearing. This means the judge orders all non-essential persons, public spectators, and media to leave the courtroom so you can speak in private comfort.",
      "Travel Allowance & Support: Keep your Rule 11 Form IV voucher stamped by the court clerk to claim full transportation and daily food allowance.",
    ],
    plainContent: [
      "When you walk into the courtroom, you do not stand alone. Your DLSA lawyer sits right beside you.",
      "If having strangers in the room makes you feel scared, your lawyer can ask the judge to close the room so only the judge, lawyers, and court staff are present.",
      "The court clerk will sign your travel voucher so you receive money for your trip and meals before leaving.",
    ],
    source: "Special Court Protocol & DLSA",
    lastUpdated: "22 Jun 2026",
    tags: ["Court Hearing", "Section 15A", "In-Camera", "Fast-Track Court"],
    featured: true,
  };

  return (
    <div
      onClick={() => onSelectResource(suggestedGuide)}
      onMouseEnter={() => {
        sparklesRef.current?.startAnimation();
        arrowRef.current?.startAnimation();
        clockRef.current?.startAnimation();
      }}
      onMouseLeave={() => {
        sparklesRef.current?.stopAnimation();
        arrowRef.current?.stopAnimation();
        clockRef.current?.stopAnimation();
      }}
      className="glass-card rounded-2xl p-5 sm:p-6 border border-teal-500/25 hover:border-teal-400/50 shadow-md relative overflow-hidden group cursor-pointer transition-all duration-300 mb-6 bg-gradient-to-r from-teal-500/[0.08] via-emerald-500/[0.05] to-transparent"
    >
      {/* Background Scenic Leaves & Glow */}
      <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-emerald-500/10 via-teal-500/5 to-transparent pointer-events-none" />
      
      {/* Scenic Nature SVG Silhouette on Right */}
      <div className="absolute right-4 bottom-0 opacity-25 dark:opacity-20 pointer-events-none hidden sm:block">
        <svg width="180" height="110" viewBox="0 0 180 110" fill="none">
          <path
            d="M30 110 C45 60 75 40 110 50 C130 55 150 40 170 30 C175 60 160 90 140 110 Z"
            fill="currentColor"
            className="text-teal-600 dark:text-haven-teal"
          />
          <path
            d="M90 110 C105 75 130 65 160 75 C165 95 155 105 140 110 Z"
            fill="currentColor"
            className="text-emerald-700 dark:text-emerald-400"
          />
        </svg>
      </div>

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          {/* Header Tag */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-teal-500/15 flex items-center justify-center text-teal-800 dark:text-haven-teal">
              <SparklesIcon
                ref={sparklesRef}
                size={14}
                className="text-teal-800 dark:text-haven-teal"
              />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-haven-teal">
              Suggested for you · Based on Oct 14 Hearing
            </span>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors tracking-tight">
              {suggestedGuide.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
              Since you have an upcoming hearing, here is a simple, trauma-informed guide on what to expect, how to sit with your DLSA advocate, and your in-camera rights.
            </p>
          </div>

          {/* Read Time & Audio Badges */}
          <div className="flex items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-white/70 dark:bg-white/[0.04] text-foreground border border-border/60">
              <ClockIcon ref={clockRef} size={12} className="text-teal-700 dark:text-haven-teal" />
              <span>6 min read</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-teal-500/10 text-teal-800 dark:text-haven-teal border border-teal-500/20">
              <Volume2 className="w-3 h-3 text-teal-700 dark:text-haven-teal" />
              <span>Audio narration available</span>
            </span>

            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
              Section 15A Verified
            </span>
          </div>
        </div>

        {/* Right Arrow */}
        <div className="w-8 h-8 rounded-xl bg-teal-500/15 group-hover:bg-teal-500/25 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0 group-hover:translate-x-1 transition-all shadow-xs self-center">
          <ArrowRightIcon ref={arrowRef} size={16} className="text-teal-800 dark:text-haven-teal" />
        </div>
      </div>
    </div>
  );
};

export default SuggestedResourceBanner;
