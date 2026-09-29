import React, { useState, useEffect } from "react";
import {
  BookmarkIcon,
  ShieldCheckIcon,
} from "@/components/icons";
import {
  X,
  Play,
  Pause,
  Download,
  Check,
  RotateCcw,
  BookOpen,
  Volume2,
} from "lucide-react";
import { ResourceItem } from "./resourceData";

interface ResourceReaderModalProps {
  resource: ResourceItem | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
  defaultPlainLanguage?: boolean;
  textSize?: "normal" | "large" | "xlarge";
}

export const ResourceReaderModal: React.FC<ResourceReaderModalProps> = ({
  resource,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  defaultPlainLanguage = true,
  textSize = "normal",
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<"1x" | "1.25x" | "1.5x">("1x");
  const [isPlainLanguage, setIsPlainLanguage] = useState(defaultPlainLanguage);
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    setIsPlainLanguage(defaultPlainLanguage);
  }, [defaultPlainLanguage, resource]);

  // Audio simulation timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  if (!isOpen || !resource) return null;

  const handleDownload = () => {
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2000);
  };

  const contentParagraphs = isPlainLanguage
    ? resource.plainContent
    : resource.fullContent;

  const textSizeClass =
    textSize === "xlarge"
      ? "text-base sm:text-lg leading-loose"
      : textSize === "large"
      ? "text-sm sm:text-base leading-relaxed"
      : "text-xs sm:text-sm leading-relaxed";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-teal-500/30 max-w-2xl w-full flex flex-col shadow-2xl relative overflow-hidden max-h-[90vh] animate-scale-in">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-border/60 flex items-center justify-between gap-3 bg-teal-50/50 dark:bg-white/[0.02]">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-800 dark:text-haven-teal border border-teal-500/30">
                {resource.categoryLabel}
              </span>
              <span className="text-[10px] text-muted-foreground font-medium">
                {resource.language}
              </span>
              <span className="text-muted-foreground/40">•</span>
              <span className="text-[10px] text-muted-foreground font-medium">
                {resource.readTime}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
              {resource.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close guide reader"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Narration Control Bar */}
        <div className="px-4 sm:px-5 py-3 bg-teal-500/10 border-b border-teal-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-8 h-8 rounded-full bg-teal-600 dark:bg-haven-teal text-white dark:text-slate-950 flex items-center justify-center cursor-pointer shadow-xs hover:scale-105 transition-transform"
            >
              {isPlayingAudio ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-teal-800 dark:text-haven-teal" />
                <span className="font-semibold text-foreground text-[11px]">
                  {isPlayingAudio ? "Playing Audio Narration..." : "Listen to Audio Guide"}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  ({resource.audioLength})
                </span>
              </div>

              {/* Progress Rail */}
              <div className="w-44 sm:w-56 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-600 dark:bg-haven-teal rounded-full transition-all duration-300"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Speed & Plain Language Switch Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setPlaybackSpeed((prev) =>
                  prev === "1x" ? "1.25x" : prev === "1.25x" ? "1.5x" : "1x"
                );
              }}
              className="px-2 py-1 rounded-lg bg-white/70 dark:bg-white/[0.05] border border-border/60 text-[10px] font-bold text-foreground cursor-pointer hover:border-teal-500/40"
            >
              {playbackSpeed}
            </button>

            {/* Plain Language Switch */}
            <button
              type="button"
              onClick={() => setIsPlainLanguage(!isPlainLanguage)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                isPlainLanguage
                  ? "bg-teal-600 text-white dark:bg-haven-teal dark:text-slate-950 shadow-xs"
                  : "bg-white/70 dark:bg-white/[0.05] border border-border/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span>{isPlainLanguage ? "Plain Language Active" : "Standard Legal"}</span>
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Summary Callout Box */}
          <div className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-white/[0.03] border border-teal-500/25 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-haven-teal block">
              {isPlainLanguage ? "Simple Summary" : "Official Overview"}
            </span>
            <p className="text-xs text-foreground font-medium leading-relaxed">
              {isPlainLanguage
                ? resource.plainLanguageSummary
                : resource.summary}
            </p>
          </div>

          {/* Paragraphs */}
          <div className={`space-y-3.5 text-foreground/90 ${textSizeClass}`}>
            {contentParagraphs.map((para, index) => (
              <div
                key={index}
                className="p-3 rounded-xl bg-white/60 dark:bg-white/[0.02] border border-border/40"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-teal-500/15 text-teal-800 dark:text-haven-teal flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="flex-1">{para}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Protection & Verification Badge */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon size={16} className="text-teal-800 dark:text-haven-teal" />
              <span>Official Verification: {resource.source}</span>
            </div>
            <span>Last Updated: {resource.lastUpdated}</span>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-border/60 flex items-center justify-between gap-3 bg-teal-50/30 dark:bg-white/[0.02]">
          <button
            type="button"
            onClick={onToggleSave}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isSaved
                ? "bg-teal-500/20 text-teal-800 dark:text-haven-teal border border-teal-500/40"
                : "bg-white/80 dark:bg-white/[0.05] border border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookmarkIcon size={14} className={isSaved ? "fill-current" : ""} />
            <span>{isSaved ? "Saved to Bookmarks" : "Save Guide"}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="px-3 py-2 rounded-xl bg-white/80 dark:bg-white/[0.05] border border-border/60 text-foreground hover:border-teal-500/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {isDownloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Downloaded</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="btn-primary px-5 py-2 rounded-xl text-slate-950 text-xs font-bold cursor-pointer"
            >
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceReaderModal;
