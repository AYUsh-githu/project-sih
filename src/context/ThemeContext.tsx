import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("haven_theme") as Theme | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Default dark theme
      setTheme("dark");
      applyTheme("dark");
    }
  }, []);

  const applyTheme = (t: Theme) => {
    if (t === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  };

  const toggleTheme = () => {
    // Initiate smooth fade-overlay transition to prevent white flash
    setIsTransitioning(true);

    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("haven_theme", nextTheme);
    applyTheme(nextTheme);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 350);

    return () => clearTimeout(timer);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
      {/* Theme Transition Fade Overlay: prevents flash and provides calm cross-fade */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 ease-out ${
          isTransitioning
            ? "opacity-40 bg-slate-900/40 backdrop-blur-[1px]"
            : "opacity-0"
        }`}
      />
    </ThemeContext.Provider>
  );
};
