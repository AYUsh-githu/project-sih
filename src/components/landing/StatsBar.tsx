import React from "react";

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  {
    value: "24/7",
    label: "Tele-MANAS & emergency support",
  },
  {
    value: "12+",
    label: "Indian languages planned",
  },
  {
    value: "100%",
    label: "Consent-first, human-reviewed",
  },
];

export const StatsBar: React.FC = () => {
  return (
    <section className="py-4 sm:py-5 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Outer entrance animation */}
      <div className="animate-fade-in opacity-0" style={{ animationFillMode: "forwards" }}>
        {/* One wide .glass-card: smooth hover lift and return, smooth stable shine sweep with 2.2s delay */}
        <div
          style={{ "--shine-delay": "2.2s" } as React.CSSProperties}
          className="glass-card relative overflow-hidden group p-8 sm:p-10 rounded-2xl border border-white/10 dark:border-teal-500/20 shadow-2xl cursor-default"
        >
          {/* Shimmer sweep effect across bar on hover */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-teal-400/15 to-transparent pointer-events-none"
          />

          {/* 3 Stats Grid - Stacks on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/10 dark:divide-teal-500/15">
            {stats.map((stat, idx) => (
              <div key={stat.value} className={idx > 0 ? "pt-6 md:pt-0 md:px-4" : "md:px-4"}>
                {/* Number in accent gradient with text-reveal */}
                <div className="overflow-hidden">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-teal-300 via-cyan-400 to-teal-200 bg-clip-text text-transparent animate-text-reveal inline-block">
                    {stat.value}
                  </span>
                </div>
                {/* Stat Description Label */}
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-2 leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
