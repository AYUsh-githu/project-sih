import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { Hero } from "@/components/landing/Hero";
import { RoleGate } from "@/components/landing/RoleGate";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { StatsBar } from "@/components/landing/StatsBar";
import { Footer } from "@/components/landing/Footer";

export const Landing: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen relative flex flex-col justify-between page-enter">
      {/* 2) Interactive Background with particles and gradient blobs */}
      <InteractiveBackground />

      {/* 1) Fixed Top-Right Theme Toggle Button */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-40">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-3 rounded-2xl glass-card text-foreground hover:text-haven-teal hover:border-teal-400/40 transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-haven-teal"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-amber-300 transition-transform duration-300 rotate-0 hover:rotate-45" />
          ) : (
            <Moon className="w-5 h-5 text-slate-800 transition-transform duration-300 -rotate-12 hover:rotate-0" />
          )}
        </button>
      </div>

      {/* Main Content Flow: Hero -> Role Gate -> Feature Cards -> Stats Bar */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* 3) Hero */}
        <Hero />

        {/* 4) Role Gate (contains 5: InfoModal) */}
        <RoleGate />

        {/* 6) Feature Cards */}
        <FeatureCards />

        {/* 7) Stats Bar */}
        <StatsBar />
      </main>

      {/* 8) Footer */}
      <Footer />
    </div>
  );
};
