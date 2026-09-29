import React from "react";
import { HeartPulse, ShieldCheck, Users, BookOpen } from "lucide-react";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delayMs: number;
}

const features: Feature[] = [
  {
    icon: HeartPulse,
    title: "Dynamic Monitoring",
    description:
      "Gentle check-ins and continuous wellbeing signals over time — support, never surveillance.",
    delayMs: 0,
  },
  {
    icon: ShieldCheck,
    title: "Private & Secure by Design",
    description:
      "Consent-first, role-scoped access with audit logs, aligned with DPDP Act 2025.",
    delayMs: 80,
  },
  {
    icon: Users,
    title: "Human Support Network",
    description:
      "Counsellors, supervised peer support and Tele-MANAS — AI assists, humans decide.",
    delayMs: 160,
  },
  {
    icon: BookOpen,
    title: "Clarity & Resources",
    description:
      "Case clarity, rights, relief and rehabilitation guidance in your language.",
    delayMs: 240,
  },
];

export const FeatureCards: React.FC = () => {
  // Tilt handler: write CSS variables --tilt-rx and --tilt-ry
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Gentle tilt: ±5 degrees
    const rx = ((y - centerY) / centerY) * -5;
    const ry = ((x - centerX) / centerX) * 5;
    e.currentTarget.style.setProperty("--tilt-rx", `${rx.toFixed(2)}deg`);
    e.currentTarget.style.setProperty("--tilt-ry", `${ry.toFixed(2)}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    // Reset smoothly to 0deg so the CSS transition smoothly returns the card to flat resting position
    e.currentTarget.style.setProperty("--tilt-rx", "0deg");
    e.currentTarget.style.setProperty("--tilt-ry", "0deg");
  };

  return (
    <section className="py-5 sm:py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 4 Feature Cards Grid: 1 col mobile / 2 col md / 4 col lg */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            /* Outer container handles entrance stagger without locking transform on the interactive card */
            <div
              key={feature.title}
              style={{
                animationDelay: `${feature.delayMs}ms`,
                animationFillMode: "forwards",
              }}
              className="animate-scale-in opacity-0 h-full"
            >
              {/* Inner glass-card: handles hover lift and return, smooth reflection, and cursor tilt */}
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={
                  {
                    "--shine-delay": `${i * 1.1}s`,
                  } as React.CSSProperties
                }
                className="glass-card tilt-card p-6 sm:p-7 flex flex-col items-center text-center group rounded-2xl hover:border-teal-400/40 cursor-default h-full select-none"
              >
                {/* Icon in a gradient circle; gets pulse-gentle on card hover */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-teal-500/25 via-cyan-500/20 to-teal-400/10 border border-teal-500/30 flex items-center justify-center mb-5 text-haven-teal shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-7 h-7 group-hover:animate-pulse-gentle transition-transform duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-2.5 tracking-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
