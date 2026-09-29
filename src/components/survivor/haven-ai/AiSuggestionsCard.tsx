import React, { useRef } from "react";
import {
  SparklesIcon,
  ScaleIcon,
  ShieldCheckIcon,
  RupeeIcon,
  HeartIcon,
  ArrowRightIcon,
  AnimatedIconHandle,
} from "@/components/icons";

export interface AiSuggestion {
  id: string;
  category: "relief" | "court" | "protection" | "wellness";
  title: string;
  description: string;
  statutoryRef: string;
  actionText: string;
  promptText: string;
}

interface AiSuggestionsCardProps {
  onApplySuggestion: (promptText: string) => void;
}

const SUGGESTIONS: AiSuggestion[] = [
  {
    id: "sug-1",
    category: "relief",
    title: "Claim Travel & Daily Allowance (TA/DA)",
    description:
      "As a summoned state witness under Rule 11 of SC/ST (PoA) Rules 1995, you are entitled to advance travel fare and daily maintenance on October 14.",
    statutoryRef: "Rule 11 SC/ST Rules 1995",
    actionText: "Prepare TA/DA Request with Haven",
    promptText:
      "How do I claim travel and daily maintenance allowance under Rule 11 of SC/ST PoA Rules for my October 14 hearing?",
  },
  {
    id: "sug-2",
    category: "court",
    title: "Petition for In-Camera Deposition Screen",
    description:
      "You have the right to request the Special Judge to place a physical partition or screen so you do not have to directly face the accused party.",
    statutoryRef: "Section 15A(6)(b) SC/ST PoA Act",
    actionText: "Draft In-Camera Request",
    promptText:
      "Can Haven help me understand how my advocate can petition the court for a partition screen or in-camera hearing under Section 15A?",
  },
  {
    id: "sug-3",
    category: "protection",
    title: "High Court Bail Hearing Monitoring",
    description:
      "The accused filed an interlocutory bail petition. Ensure SI R. Deshmukh has your current contact details for emergency route tracking.",
    statutoryRef: "Section 15A(3) Right to Notice",
    actionText: "Check Protection Protocol",
    promptText:
      "Under Section 15A(3), am I entitled to be informed before the accused party's bail hearing is decided?",
  },
  {
    id: "sug-4",
    category: "wellness",
    title: "Sensory Grounding Ahead of Hearing",
    description:
      "Pre-hearing anxiety often peaks 2 weeks before testimony. Practice our trauma-informed 5-senses grounding reflection.",
    statutoryRef: "WHO Psychological First Aid",
    actionText: "Start Grounding Reflection",
    promptText:
      "Please guide me through a calming sensory awareness reflection to help with pre-hearing nervousness.",
  },
];

export const AiSuggestionsCard: React.FC<AiSuggestionsCardProps> = ({
  onApplySuggestion,
}) => {
  const headerSparklesRef = useRef<AnimatedIconHandle>(null);
  const categoryIconRefs = useRef<{ [key: string]: AnimatedIconHandle | null }>({});
  const arrowRefs = useRef<{ [key: string]: AnimatedIconHandle | null }>({});

  const renderCategoryIcon = (category: string, id: string) => {
    switch (category) {
      case "relief":
        return (
          <RupeeIcon
            ref={(el) => (categoryIconRefs.current[id] = el)}
            size={14}
            className="text-emerald-800 dark:text-emerald-400"
          />
        );
      case "court":
        return (
          <ScaleIcon
            ref={(el) => (categoryIconRefs.current[id] = el)}
            size={14}
            className="text-teal-800 dark:text-haven-teal"
          />
        );
      case "protection":
        return (
          <ShieldCheckIcon
            ref={(el) => (categoryIconRefs.current[id] = el)}
            size={14}
            className="text-amber-700 dark:text-amber-400"
          />
        );
      case "wellness":
      default:
        return (
          <HeartIcon
            ref={(el) => (categoryIconRefs.current[id] = el)}
            size={14}
            className="text-indigo-700 dark:text-indigo-400"
          />
        );
    }
  };

  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case "relief":
        return "bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border-emerald-500/30";
      case "court":
        return "bg-teal-500/15 text-teal-800 dark:text-haven-teal border-teal-500/30";
      case "protection":
        return "bg-amber-500/15 text-amber-800 dark:text-amber-400 border-amber-500/30";
      case "wellness":
      default:
        return "bg-indigo-500/15 text-indigo-800 dark:text-indigo-400 border-indigo-500/30";
    }
  };

  return (
    <div
      className="glass-card rounded-2xl p-5 border border-teal-500/20 shadow-xl space-y-4 group cursor-default"
      onMouseEnter={() => headerSparklesRef.current?.startAnimation()}
      onMouseLeave={() => headerSparklesRef.current?.stopAnimation()}
    >
      {/* 1. Header with Live Dynamic Indicator */}
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-800 dark:text-haven-teal group-hover:scale-110 transition-transform">
            <SparklesIcon ref={headerSparklesRef} size={18} className="text-teal-800 dark:text-haven-teal" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-foreground tracking-tight group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors">
                AI Suggestions & Insights
              </h3>
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_6px_rgba(94,234,212,0.8)]" />
            </div>
            <p className="text-[11px] text-muted-foreground">
              Dynamic recommendations synthesized from your case timeline & rights
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-800 dark:text-haven-teal border border-teal-500/20 hidden sm:inline">
          {SUGGESTIONS.length} Active
        </span>
      </div>

      {/* 2. Suggestions List with Full Container Hover Trigger for both Icon and Arrow */}
      <div className="space-y-3">
        {SUGGESTIONS.map((item) => {
          const badgeStyle = getCategoryBadgeStyle(item.category);

          return (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-black/30 border border-teal-600/20 dark:border-teal-500/20 hover:border-teal-600/50 dark:hover:border-teal-400/40 hover:bg-teal-50/90 dark:hover:bg-white/[0.03] transition-all group/item shadow-sm cursor-pointer"
              onMouseEnter={() => {
                categoryIconRefs.current[item.id]?.startAnimation();
                arrowRefs.current[item.id]?.startAnimation();
              }}
              onMouseLeave={() => {
                categoryIconRefs.current[item.id]?.stopAnimation();
                arrowRefs.current[item.id]?.stopAnimation();
              }}
              onClick={() => onApplySuggestion(item.promptText)}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-white/80 dark:bg-white/5 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    {renderCategoryIcon(item.category, item.id)}
                  </div>
                  <h4 className="text-xs font-bold text-foreground group-hover/item:text-teal-800 dark:group-hover/item:text-haven-teal transition-colors leading-tight">
                    {item.title}
                  </h4>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider border whitespace-nowrap ${badgeStyle}`}>
                  {item.statutoryRef}
                </span>
              </div>

              <p className="text-[11px] text-muted-foreground leading-relaxed mb-3 pl-8">
                {item.description}
              </p>

              {/* Action Button */}
              <div className="w-full py-1.5 px-3 rounded-lg bg-white/90 dark:bg-white/5 hover:bg-teal-500/15 border border-teal-600/25 dark:border-teal-500/25 text-teal-800 dark:text-haven-teal text-[11px] font-semibold flex items-center justify-between transition-all group-hover/item:border-teal-600/50 dark:group-hover/item:border-haven-teal/50">
                <span>{item.actionText}</span>
                <ArrowRightIcon
                  ref={(el) => (arrowRefs.current[item.id] = el)}
                  size={12}
                  className="text-teal-800 dark:text-haven-teal group-hover/item:translate-x-0.5 transition-transform"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
