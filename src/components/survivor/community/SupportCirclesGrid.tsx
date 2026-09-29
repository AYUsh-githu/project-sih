import React, { useRef } from "react";
import {
  ScaleIcon,
  MoonIcon,
  SproutIcon,
  HandHeartIcon,
  UsersGroupIcon,
  ArrowRightIcon,
  AnimatedIconHandle,
} from "@/components/icons";

export interface SupportCircleItem {
  id: string;
  title: string;
  subtitle: string;
  languages: string[];
  membersCount: number;
  activeNow: number;
  themeColor: string;
  gradientBg: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  facilitator: string;
  pinnedTopic: string;
}

export const SUPPORT_CIRCLES: SupportCircleItem[] = [
  {
    id: "legal-process",
    title: "Hearings & Legal Process",
    subtitle: "Share, learn, feel less alone.",
    languages: ["English", "Hindi"],
    membersCount: 24,
    activeNow: 6,
    themeColor: "teal",
    gradientBg: "from-teal-500/20 via-emerald-500/10 to-transparent",
    borderColor: "border-teal-500/30 hover:border-teal-400/60",
    iconBg: "bg-teal-500/15 border-teal-500/30",
    iconColor: "text-teal-800 dark:text-haven-teal",
    facilitator: "Adv. Shri M. K. Rao (DLSA)",
    pinnedTopic: "How to prepare for pre-trial witness deposition without overwhelm",
  },
  {
    id: "isolation-loneliness",
    title: "Isolation & Loneliness",
    subtitle: "You're not alone here.",
    languages: ["English", "Telugu"],
    membersCount: 18,
    activeNow: 4,
    themeColor: "indigo",
    gradientBg: "from-indigo-500/20 via-purple-500/10 to-transparent",
    borderColor: "border-indigo-500/30 hover:border-indigo-400/60",
    iconBg: "bg-indigo-500/15 border-indigo-500/30",
    iconColor: "text-indigo-700 dark:text-indigo-300",
    facilitator: "Dr. Ananya Sharma (Clinical Psychologist)",
    pinnedTopic: "Reconnecting with community after experiencing social boycott",
  },
  {
    id: "rebuilding-routine",
    title: "Rebuilding Routine",
    subtitle: "Small steps. Big progress.",
    languages: ["English", "Hindi"],
    membersCount: 16,
    activeNow: 3,
    themeColor: "emerald",
    gradientBg: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderColor: "border-emerald-500/30 hover:border-emerald-400/60",
    iconBg: "bg-emerald-500/15 border-emerald-500/30",
    iconColor: "text-emerald-700 dark:text-emerald-300",
    facilitator: "Sneha Patel (DMHU Trauma Specialist)",
    pinnedTopic: "Gentle morning habits that keep the nervous system grounded",
  },
  {
    id: "family-strain",
    title: "Family & Social Strain",
    subtitle: "Find support, share, heal.",
    languages: ["English", "Kannada"],
    membersCount: 16,
    activeNow: 5,
    themeColor: "amber",
    gradientBg: "from-amber-500/20 via-orange-500/10 to-transparent",
    borderColor: "border-amber-500/30 hover:border-amber-400/60",
    iconBg: "bg-amber-500/15 border-amber-500/30",
    iconColor: "text-amber-800 dark:text-amber-300",
    facilitator: "Rajeshwar Rao (Social Rehabilitation Officer)",
    pinnedTopic: "Navigating family tension while standing as a key witness",
  },
];

interface SupportCirclesGridProps {
  onSelectCircle: (circle: SupportCircleItem) => void;
}

export const SupportCirclesGrid: React.FC<SupportCirclesGridProps> = ({
  onSelectCircle,
}) => {
  const headerUsersRef = useRef<AnimatedIconHandle>(null);

  // Dedicated refs for the 4 circle card icons
  const scaleRef = useRef<AnimatedIconHandle>(null);
  const moonRef = useRef<AnimatedIconHandle>(null);
  const sproutRef = useRef<AnimatedIconHandle>(null);
  const heartRef = useRef<AnimatedIconHandle>(null);

  // Dedicated refs for the 4 arrow icons
  const arrow1Ref = useRef<AnimatedIconHandle>(null);
  const arrow2Ref = useRef<AnimatedIconHandle>(null);
  const arrow3Ref = useRef<AnimatedIconHandle>(null);
  const arrow4Ref = useRef<AnimatedIconHandle>(null);

  const cardRefs = [
    { iconRef: scaleRef, arrowRef: arrow1Ref },
    { iconRef: moonRef, arrowRef: arrow2Ref },
    { iconRef: sproutRef, arrowRef: arrow3Ref },
    { iconRef: heartRef, arrowRef: arrow4Ref },
  ];

  return (
    <div className="mb-6">
      {/* Section Header */}
      <div
        onMouseEnter={() => headerUsersRef.current?.startAnimation()}
        onMouseLeave={() => headerUsersRef.current?.stopAnimation()}
        className="flex items-center gap-3 mb-4 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-600/30 dark:border-teal-400/30 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs">
          <UsersGroupIcon
            ref={headerUsersRef}
            size={22}
            className="text-teal-800 dark:text-haven-teal"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground tracking-tight group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors">
            Support Circles
          </h2>
          <p className="text-xs text-muted-foreground">
            Join a circle that feels right for you. Each space is themed, moderated, and safe.
          </p>
        </div>
      </div>

      {/* 4 Themed Circle Cards Grid (Faithful to Sketch & Reference) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {SUPPORT_CIRCLES.map((circle, index) => {
          const { iconRef, arrowRef } = cardRefs[index];

          return (
            <div
              key={circle.id}
              onClick={() => onSelectCircle(circle)}
              onMouseEnter={() => {
                iconRef.current?.startAnimation();
                arrowRef.current?.startAnimation();
              }}
              onMouseLeave={() => {
                iconRef.current?.stopAnimation();
                arrowRef.current?.stopAnimation();
              }}
              className={`glass-card rounded-2xl p-5 border ${circle.borderColor} shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden`}
            >
              {/* Subtle Themed Top Aura Glow */}
              <div
                className={`absolute top-0 left-0 right-0 h-28 bg-gradient-to-b ${circle.gradientBg} pointer-events-none`}
              />

              <div className="relative z-10">
                {/* Top Row: Illustrated Thematic Icon & Active Status Pill */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl ${circle.iconBg} border flex items-center justify-center ${circle.iconColor} group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                  >
                    {index === 0 && (
                      <ScaleIcon
                        ref={scaleRef}
                        size={24}
                        className={circle.iconColor}
                      />
                    )}
                    {index === 1 && (
                      <MoonIcon
                        ref={moonRef}
                        size={24}
                        className={circle.iconColor}
                      />
                    )}
                    {index === 2 && (
                      <SproutIcon
                        ref={sproutRef}
                        size={24}
                        className={circle.iconColor}
                      />
                    )}
                    {index === 3 && (
                      <HandHeartIcon
                        ref={heartRef}
                        size={24}
                        className={circle.iconColor}
                      />
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {circle.activeNow} Active
                  </span>
                </div>

                {/* Circle Title & Subtitle */}
                <h3 className="text-sm font-bold text-foreground group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors tracking-tight line-clamp-1">
                  {circle.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                  {circle.subtitle}
                </p>

                {/* Language Support Badges */}
                <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                  {circle.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/60 dark:bg-white/[0.04] text-foreground border border-border/60"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Member Counter & Arrow Navigation */}
              <div className="relative z-10 pt-4 mt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium group-hover:text-foreground transition-colors">
                  <span className="w-2 h-2 rounded-full bg-teal-500/50" />
                  {circle.membersCount} members
                </span>

                <div className="w-7 h-7 rounded-lg bg-teal-500/10 group-hover:bg-teal-500/20 flex items-center justify-center text-teal-800 dark:text-haven-teal group-hover:translate-x-0.5 transition-all">
                  <ArrowRightIcon
                    ref={arrowRef}
                    size={15}
                    className="text-teal-800 dark:text-haven-teal"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SupportCirclesGrid;
