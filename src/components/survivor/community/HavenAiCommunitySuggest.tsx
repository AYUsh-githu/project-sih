import React, { useRef } from "react";
import {
  SparklesIcon,
  ScaleIcon,
  ArrowRightIcon,
  AnimatedIconHandle,
} from "@/components/icons";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SUPPORT_CIRCLES, SupportCircleItem } from "./SupportCirclesGrid";

interface HavenAiCommunitySuggestProps {
  onJoinCircle: (circle: SupportCircleItem) => void;
}

export const HavenAiCommunitySuggest: React.FC<HavenAiCommunitySuggestProps> = ({
  onJoinCircle,
}) => {
  const navigate = useNavigate();
  const sparklesRef = useRef<AnimatedIconHandle>(null);
  const scaleRef = useRef<AnimatedIconHandle>(null);
  const arrowRef = useRef<AnimatedIconHandle>(null);

  const recommendedCircle =
    SUPPORT_CIRCLES.find((c) => c.id === "legal-process") || SUPPORT_CIRCLES[0];

  const handleAskHaven = () => {
    navigate("/survivor/haven-ai");
  };

  return (
    <div
      onMouseEnter={() => {
        sparklesRef.current?.startAnimation();
        scaleRef.current?.startAnimation();
        arrowRef.current?.startAnimation();
      }}
      onMouseLeave={() => {
        sparklesRef.current?.stopAnimation();
        scaleRef.current?.stopAnimation();
        arrowRef.current?.stopAnimation();
      }}
      className="glass-card rounded-2xl p-5 border border-teal-500/25 shadow-xl relative overflow-hidden group hover:border-teal-400/50 transition-all mb-5"
    >
      {/* Background Radiance Glow */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-gradient-to-br from-teal-500/20 via-indigo-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-border/50 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0 group-hover:scale-110 transition-transform">
            <SparklesIcon
              ref={sparklesRef}
              size={18}
              className="text-teal-800 dark:text-haven-teal"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground tracking-tight group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors">
              Haven AI Suggestion
            </h3>
            <p className="text-[10px] text-muted-foreground">
              Personalized based on Docket & AI Chat Context
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-teal-500/15 text-teal-800 dark:text-haven-teal border border-teal-500/30">
          Smart Match
        </span>
      </div>

      {/* Synthesis Reasoning Box */}
      <div className="py-3.5 space-y-3 relative z-10">
        <div className="p-3 rounded-xl bg-teal-50/80 dark:bg-white/[0.03] border border-teal-600/20 dark:border-teal-500/20 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-teal-800 dark:text-haven-teal">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span>Active Case Context: Special Court Hearing in 18 Days</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Survivors preparing for Fast-Track hearings frequently feel elevated anxiety. Joining peers in your stage provides practical court tips and reassurance.
          </p>
        </div>

        {/* Recommended Space Card */}
        <div
          onClick={() => onJoinCircle(recommendedCircle)}
          className="p-3.5 rounded-xl bg-white/70 dark:bg-white/[0.02] border border-teal-500/30 hover:border-teal-400/60 hover:bg-teal-50/60 dark:hover:bg-white/[0.05] transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0 group-hover:scale-105 transition-transform">
              <ScaleIcon
                ref={scaleRef}
                size={20}
                className="text-teal-800 dark:text-haven-teal"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-foreground">
                  {recommendedCircle.title}
                </h4>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors" />
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                8 peers at Stage 3 active now · Sharing DLSA tips
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 relative z-10 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onJoinCircle(recommendedCircle)}
          className="btn-primary py-2 px-3 rounded-xl text-xs font-bold text-slate-950 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
        >
          <span>Join Circle</span>
          <ArrowRightIcon ref={arrowRef} size={13} className="text-slate-950" />
        </button>

        <button
          type="button"
          onClick={handleAskHaven}
          className="py-2 px-3 rounded-xl bg-white/80 dark:bg-white/[0.04] border border-teal-600/20 dark:border-teal-500/20 hover:border-teal-600/40 text-foreground hover:text-teal-800 dark:hover:text-haven-teal text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 text-teal-700 dark:text-haven-teal" />
          <span>Ask Haven AI</span>
        </button>
      </div>
    </div>
  );
};

export default HavenAiCommunitySuggest;
