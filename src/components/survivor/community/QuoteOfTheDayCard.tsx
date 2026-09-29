import React, { useState, useRef } from "react";
import { HeartIcon, SparklesIcon, AnimatedIconHandle } from "@/components/icons";
import { RefreshCw, Check, Copy } from "lucide-react";

interface DailyQuote {
  quote: string;
  theme: string;
  author: string;
}

const DAILY_QUOTES: DailyQuote[] = [
  {
    quote: "Kind people make hard days lighter.",
    theme: "Community & Empathy",
    author: "Daily Reflection",
  },
  {
    quote: "Healing is not linear, and your courage today is enough.",
    theme: "Restoration",
    author: "Trauma Recovery Guide",
  },
  {
    quote: "You have survived 100% of your hardest moments. You do not carry this alone.",
    theme: "Inner Strength",
    author: "Tele-MANAS Affirmation",
  },
  {
    quote: "Small moments of gentle peace are the seeds of deep resilience.",
    theme: "Grounding",
    author: "Mindful Recovery",
  },
];

export const QuoteOfTheDayCard: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [likesCount, setLikesCount] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const heartRef = useRef<AnimatedIconHandle>(null);
  const sparklesRef = useRef<AnimatedIconHandle>(null);

  const currentQuote = DAILY_QUOTES[quoteIndex];

  const handleNextQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuoteIndex((prev) => (prev + 1) % DAILY_QUOTES.length);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLiked) {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
      heartRef.current?.startAnimation();
    } else {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    }
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`"${currentQuote.quote}" — ${currentQuote.theme}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onMouseEnter={() => {
        sparklesRef.current?.startAnimation();
        heartRef.current?.startAnimation();
      }}
      onMouseLeave={() => {
        sparklesRef.current?.stopAnimation();
        heartRef.current?.stopAnimation();
      }}
      className="glass-card rounded-2xl p-6 border border-teal-500/25 shadow-xl relative overflow-hidden group hover:border-teal-400/50 transition-all flex flex-col justify-between min-h-[220px]"
    >
      {/* Scenic Nature Gradient Aesthetic (Matches Reference Art: Twilight Lake & Mountain Glow) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/85 via-teal-950/60 to-indigo-950/70 dark:from-black/85 dark:via-teal-950/80 dark:to-indigo-950/80 z-0 pointer-events-none" />
      
      {/* Scenic Mountain Silhouette SVG Overlay */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30 pointer-events-none z-0">
        <svg
          viewBox="0 0 400 200"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          <path
            d="M0 160 Q100 110 200 140 T400 120 L400 200 L0 200 Z"
            fill="currentColor"
            className="text-teal-400"
          />
          <path
            d="M0 175 Q150 140 280 165 T400 150 L400 200 L0 200 Z"
            fill="currentColor"
            className="text-emerald-500"
          />
          <circle cx="320" cy="90" r="28" fill="currentColor" className="text-amber-300 opacity-40 blur-sm" />
        </svg>
      </div>

      {/* Top Header Controls */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-500/20 backdrop-blur-md flex items-center justify-center text-haven-teal">
            <SparklesIcon
              ref={sparklesRef}
              size={15}
              className="text-haven-teal"
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-200">
            Quote of the Day
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleCopy}
            title="Copy reflection"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-teal-100 hover:text-white transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={handleNextQuote}
            title="Next daily reflection"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-teal-100 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
          </button>
        </div>
      </div>

      {/* Middle: Prominent Trauma-Informed Quote */}
      <div className="relative z-10 py-4 my-auto">
        <blockquote className="text-base sm:text-lg font-serif italic text-white leading-relaxed drop-shadow-sm">
          &ldquo;{currentQuote.quote}&rdquo;
        </blockquote>
        <span className="block text-[11px] font-medium text-teal-200/90 mt-2 font-sans">
          — {currentQuote.theme}
        </span>
      </div>

      {/* Bottom: Empathy Reaction Strip */}
      <div className="relative z-10 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-teal-100/90">
        <button
          type="button"
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl transition-all cursor-pointer ${
            isLiked
              ? "bg-rose-500/30 text-rose-200 border border-rose-400/40"
              : "bg-white/10 hover:bg-white/20 text-white"
          }`}
        >
          <HeartIcon
            ref={heartRef}
            size={14}
            className={isLiked ? "text-rose-300 fill-rose-300" : "text-rose-200"}
          />
          <span className="font-semibold text-[11px]">{likesCount} sent peace</span>
        </button>

        <span className="text-[10px] text-teal-200/80">
          Updated Daily at Sunrise
        </span>
      </div>
    </div>
  );
};

export default QuoteOfTheDayCard;
