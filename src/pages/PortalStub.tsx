import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, HeartHandshake } from "lucide-react";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface PortalStubProps {
  portalName: "Survivor Portal" | "Authority Portal";
}

export const PortalStub: React.FC<PortalStubProps> = ({ portalName }) => {
  const { theme, toggleTheme } = useTheme();
  const isSurvivor = portalName === "Survivor Portal";

  return (
    <div className="min-h-screen relative flex flex-col justify-between p-4 sm:p-6 page-enter">
      <InteractiveBackground />

      {/* Top Bar with Home Link & Theme Toggle */}
      <header className="flex items-center justify-between max-w-5xl mx-auto w-full pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-haven-teal transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Haven</span>
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2.5 rounded-xl glass-card text-foreground hover:text-haven-teal hover:border-teal-400/40 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-haven-teal"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-amber-300" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700" />
          )}
        </button>
      </header>

      {/* Centered Glass Card with Scale-in */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="glass-card animate-scale-in p-8 sm:p-12 max-w-md w-full text-center rounded-2xl border border-teal-500/20 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-6 text-haven-teal shadow-inner">
            {isSurvivor ? (
              <HeartHandshake className="w-8 h-8 animate-bounce-gentle" />
            ) : (
              <ShieldCheck className="w-8 h-8 animate-bounce-gentle" />
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            {portalName}
          </h1>

          <p className="text-muted-foreground text-base mb-8">
            This portal arrives in the next build.
          </p>

          <Link
            to="/"
            className="btn-primary inline-flex items-center justify-center gap-2 w-full text-slate-950 font-semibold text-center"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Landing Page</span>
          </Link>
        </div>
      </main>

      <footer className="text-center py-4 text-xs text-muted-foreground">
        © 2026 Haven · Team Esoteric · Smart India Hackathon 2026
      </footer>
    </div>
  );
};
