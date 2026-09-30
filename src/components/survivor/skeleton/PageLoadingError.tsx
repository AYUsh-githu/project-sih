import React from "react";
import { RotateCcw, ShieldCheck, PhoneCall, AlertCircle } from "lucide-react";

interface PageLoadingErrorProps {
  error?: string | null;
  onRetry: () => void;
}

export const PageLoadingError: React.FC<PageLoadingErrorProps> = ({
  error,
  onRetry,
}) => {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto w-full py-12 px-4 animate-fade-in"
    >
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-rose-500/25 shadow-2xl text-center space-y-5 w-full relative overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-400 flex items-center justify-center mx-auto shadow-inner">
          <AlertCircle className="w-7 h-7" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            Connection Momentarily Delayed
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {error ||
              "We encountered an issue preparing this page. Rest assured that all your case notes, identity, and docket details remain completely safe and encrypted under Section 15A."}
          </p>
        </div>

        {/* DPDP Reassurance */}
        <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-800 dark:text-haven-teal flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          <span>DPDP Act 2025 & Section 15A End-to-End Encryption Active</span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-sm shadow-lg hover:shadow-glow-teal hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Connection</span>
          </button>

          <a
            href="tel:14416"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900/5 dark:bg-white/5 hover:bg-white/10 border border-border text-xs font-semibold text-foreground flex items-center justify-center gap-2 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Tele-MANAS (14416)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
