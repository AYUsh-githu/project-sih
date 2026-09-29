import React from "react";

export const Hero: React.FC = () => {
  return (
    <section className="text-center pt-6 sm:pt-10 pb-4 max-w-4xl mx-auto px-4">
      {/* H1 "Haven" - text-7xl md:text-8xl, teal->cyan gradient text animated with gradient-shift, entrance via text-reveal */}
      <div className="overflow-hidden mb-3">
        <h1
          className="text-7xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-teal-300 via-cyan-400 to-teal-200 bg-clip-text text-transparent animate-gradient-shift animate-text-reveal pb-2 inline-block"
          style={{
            backgroundSize: "200% 200%",
          }}
        >
          Haven
        </h1>
      </div>

      {/* Subtitle (fade-in, 150ms delay) */}
      <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-medium text-foreground/90 max-w-3xl mx-auto leading-relaxed animate-fade-in opacity-0 [animation-delay:150ms] [animation-fill-mode:forwards]">
        Calm support. Continuous care. Connected protection — for survivors of
        atrocities.
      </p>

      {/* Trust line (fade-in, 300ms delay, small, muted) */}
      <p className="mt-3 text-xs sm:text-sm text-muted-foreground tracking-wider font-normal animate-fade-in opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
        Confidential · Consent-first · Human-reviewed support
      </p>
    </section>
  );
};
