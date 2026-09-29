import React, { useRef } from "react";
import {
  ScaleIcon,
  HeartIcon,
  RupeeIcon,
  ClockIcon,
  TriangleAlertIcon,
  ArrowRightIcon,
  AnimatedIconHandle,
} from "@/components/icons";
import { Volume2 } from "lucide-react";

interface CategoryNeedItem {
  id: string;
  title: string;
  description: string;
  themeColor: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
}

const CATEGORY_NEEDS: CategoryNeedItem[] = [
  {
    id: "legal",
    title: "Legal & Rights",
    description: "Know your rights, learn about laws and policies, and access free legal support.",
    themeColor: "teal",
    borderColor: "border-teal-500/30 hover:border-teal-400/60",
    iconBg: "bg-teal-500/15 border-teal-500/30",
    iconColor: "text-teal-800 dark:text-haven-teal",
  },
  {
    id: "coping",
    title: "Emotional Support & Coping",
    description: "Build resilience, manage stress, and find healthy ways to steady your thoughts.",
    themeColor: "indigo",
    borderColor: "border-indigo-500/30 hover:border-indigo-400/60",
    iconBg: "bg-indigo-500/15 border-indigo-500/30",
    iconColor: "text-indigo-700 dark:text-indigo-300",
  },
  {
    id: "practical",
    title: "Livelihood & Practical Help",
    description: "Access financial relief tranches, Rule 11 travel allowance, and daily living aid.",
    themeColor: "amber",
    borderColor: "border-amber-500/30 hover:border-amber-400/60",
    iconBg: "bg-amber-500/15 border-amber-500/30",
    iconColor: "text-amber-800 dark:text-amber-300",
  },
  {
    id: "process",
    title: "Understanding the Process",
    description: "Step-by-step guides on FIRs, DySP deadlines, and court proceeding stages.",
    themeColor: "cyan",
    borderColor: "border-cyan-500/30 hover:border-cyan-400/60",
    iconBg: "bg-cyan-500/15 border-cyan-500/30",
    iconColor: "text-cyan-700 dark:text-cyan-300",
  },
  {
    id: "emergency",
    title: "Emergency & Immediate Help",
    description: "Witness protection units, SP cell escalation, and crisis first-aid lines.",
    themeColor: "rose",
    borderColor: "border-rose-500/30 hover:border-rose-500/60",
    iconBg: "bg-rose-500/15 border-rose-500/30",
    iconColor: "text-rose-700 dark:text-rose-400",
  },
];

interface ExploreByNeedGridProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}

export const ExploreByNeedGrid: React.FC<ExploreByNeedGridProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  // Dedicated explicit refs for each of the 5 categories
  const scaleRef = useRef<AnimatedIconHandle>(null);
  const heartRef = useRef<AnimatedIconHandle>(null);
  const rupeeRef = useRef<AnimatedIconHandle>(null);
  const clockRef = useRef<AnimatedIconHandle>(null);
  const alertRef = useRef<AnimatedIconHandle>(null);

  // Arrow refs
  const arrow1Ref = useRef<AnimatedIconHandle>(null);
  const arrow2Ref = useRef<AnimatedIconHandle>(null);
  const arrow3Ref = useRef<AnimatedIconHandle>(null);
  const arrow4Ref = useRef<AnimatedIconHandle>(null);
  const arrow5Ref = useRef<AnimatedIconHandle>(null);

  const cardRefs = [
    { iconRef: scaleRef, arrowRef: arrow1Ref },
    { iconRef: heartRef, arrowRef: arrow2Ref },
    { iconRef: rupeeRef, arrowRef: arrow3Ref },
    { iconRef: clockRef, arrowRef: arrow4Ref },
    { iconRef: alertRef, arrowRef: arrow5Ref },
  ];

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-foreground tracking-tight">
          Explore by Need
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Find the right support, when you need it most. Every topic is verified and plain-language ready.
        </p>
      </div>

      {/* 5-Card Rail */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5">
        {CATEGORY_NEEDS.map((item, index) => {
          const { iconRef, arrowRef } = cardRefs[index];
          const isSelected = selectedCategory === item.id;

          return (
            <div
              key={item.id}
              onClick={() => onSelectCategory(item.id)}
              onMouseEnter={() => {
                iconRef.current?.startAnimation();
                arrowRef.current?.startAnimation();
              }}
              onMouseLeave={() => {
                iconRef.current?.stopAnimation();
                arrowRef.current?.stopAnimation();
              }}
              className={`glass-card rounded-2xl p-4 border ${
                isSelected
                  ? "border-teal-500 ring-2 ring-teal-500/25 bg-teal-50/70 dark:bg-white/[0.05]"
                  : item.borderColor
              } shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group`}
            >
              <div>
                {/* Themed Icon */}
                <div
                  className={`w-11 h-11 rounded-2xl ${item.iconBg} border flex items-center justify-center ${item.iconColor} group-hover:scale-110 transition-transform duration-300 shadow-xs mb-3`}
                >
                  {index === 0 && (
                    <ScaleIcon
                      ref={scaleRef}
                      size={22}
                      className={item.iconColor}
                    />
                  )}
                  {index === 1 && (
                    <HeartIcon
                      ref={heartRef}
                      size={22}
                      className={item.iconColor}
                    />
                  )}
                  {index === 2 && (
                    <RupeeIcon
                      ref={rupeeRef}
                      size={22}
                      className={item.iconColor}
                    />
                  )}
                  {index === 3 && (
                    <ClockIcon
                      ref={clockRef}
                      size={22}
                      className={item.iconColor}
                    />
                  )}
                  {index === 4 && (
                    <TriangleAlertIcon
                      ref={alertRef}
                      size={22}
                      className={item.iconColor}
                    />
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors tracking-tight line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Row: Audio Pill & Right Arrow */}
              <div className="pt-3 mt-3 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="inline-flex items-center gap-1 font-medium group-hover:text-foreground transition-colors">
                  <Volume2 className="w-3 h-3 text-teal-700 dark:text-haven-teal" />
                  <span>Audio available</span>
                </span>

                <div className="w-5 h-5 rounded-md bg-teal-500/10 group-hover:bg-teal-500/20 flex items-center justify-center text-teal-800 dark:text-haven-teal group-hover:translate-x-0.5 transition-all">
                  <ArrowRightIcon ref={arrowRef} size={11} className="text-teal-800 dark:text-haven-teal" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreByNeedGrid;
