import React, { useRef } from "react";
import {
  ShieldCheckIcon,
  PhoneVolumeIcon,
  ArrowRightIcon,
  AnimatedIconHandle,
} from "@/components/icons";

interface EmergencyHelpBannerProps {
  onOpenEmergencyModal?: () => void;
}

export const EmergencyHelpBanner: React.FC<EmergencyHelpBannerProps> = ({
  onOpenEmergencyModal,
}) => {
  const shieldRef = useRef<AnimatedIconHandle>(null);
  const teleManasRef = useRef<AnimatedIconHandle>(null);
  const erssRef = useRef<AnimatedIconHandle>(null);
  const arrowRef = useRef<AnimatedIconHandle>(null);

  const handleDial = (number: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${number}`;
  };

  return (
    <div
      onClick={onOpenEmergencyModal}
      onMouseEnter={() => {
        shieldRef.current?.startAnimation();
        arrowRef.current?.startAnimation();
      }}
      onMouseLeave={() => {
        shieldRef.current?.stopAnimation();
        arrowRef.current?.stopAnimation();
      }}
      className="glass-card rounded-2xl p-4 sm:p-5 border border-rose-500/30 hover:border-rose-500/50 shadow-md relative overflow-hidden group cursor-pointer transition-all duration-300 mb-6 bg-gradient-to-r from-rose-500/[0.08] via-amber-500/[0.04] to-transparent"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        {/* Left Side: Reassuring Emergency Headline */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-700 dark:text-rose-400 flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs">
            <ShieldCheckIcon
              ref={shieldRef}
              size={24}
              className="text-rose-700 dark:text-rose-400"
            />
          </div>

          <div>
            <h2 className="text-base font-bold text-foreground tracking-tight group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors">
              Emergency & Immediate Help
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              If you or someone you know is in immediate danger or facing intimidation, reach out now.
            </p>
          </div>
        </div>

        {/* Right Side: Quick Action Calling Cards */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* Tele-MANAS 24/7 Helpline */}
          <button
            type="button"
            onClick={(e) => handleDial("14416", e)}
            onMouseEnter={() => teleManasRef.current?.startAnimation()}
            onMouseLeave={() => teleManasRef.current?.stopAnimation()}
            className="flex-1 sm:flex-none flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/80 dark:bg-white/[0.05] border border-rose-500/25 hover:border-rose-500/50 hover:bg-rose-50/80 dark:hover:bg-rose-500/10 text-foreground transition-all cursor-pointer shadow-xs group/call"
          >
            <div className="w-7 h-7 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0">
              <PhoneVolumeIcon
                ref={teleManasRef}
                size={15}
                className="text-teal-800 dark:text-haven-teal"
              />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold block leading-none">
                Tele-MANAS
              </span>
              <span className="text-xs font-bold text-teal-900 dark:text-haven-teal">
                14416 (24/7)
              </span>
            </div>
          </button>

          {/* ERSS National Emergency 112 */}
          <button
            type="button"
            onClick={(e) => handleDial("112", e)}
            onMouseEnter={() => erssRef.current?.startAnimation()}
            onMouseLeave={() => erssRef.current?.stopAnimation()}
            className="flex-1 sm:flex-none flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/80 dark:bg-white/[0.05] border border-rose-500/25 hover:border-rose-500/50 hover:bg-rose-50/80 dark:hover:bg-rose-500/10 text-foreground transition-all cursor-pointer shadow-xs group/call"
          >
            <div className="w-7 h-7 rounded-lg bg-rose-500/15 flex items-center justify-center text-rose-700 dark:text-rose-400 flex-shrink-0">
              <PhoneVolumeIcon
                ref={erssRef}
                size={15}
                className="text-rose-700 dark:text-rose-400"
              />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold block leading-none">
                Police / ERSS
              </span>
              <span className="text-xs font-bold text-rose-700 dark:text-rose-400">
                112 (Emergency)
              </span>
            </div>
          </button>

          {/* Navigation Chevron */}
          <div className="hidden sm:flex w-7 h-7 rounded-lg bg-rose-500/10 items-center justify-center text-rose-700 dark:text-rose-400 group-hover:translate-x-0.5 transition-transform">
            <ArrowRightIcon ref={arrowRef} size={15} className="text-rose-700 dark:text-rose-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyHelpBanner;
