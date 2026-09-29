import React, { useRef } from "react";
import {
  TriangleAlertIcon,
  HandHeartIcon,
  PhoneVolumeIcon,
  AnimatedIconHandle,
} from "@/components/icons";

interface EmergencyPanelProps {
  onDismiss?: () => void;
  dismissLabel?: string;
  className?: string;
}

export const EmergencyPanel: React.FC<EmergencyPanelProps> = ({
  onDismiss,
  dismissLabel = "Return to Docket Sign In",
  className = "",
}) => {
  const alertRef = useRef<AnimatedIconHandle>(null);
  const teleManasRef = useRef<AnimatedIconHandle>(null);
  const policeRef = useRef<AnimatedIconHandle>(null);

  return (
    <div className={`text-center w-full ${className}`}>
      <div
        className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-5 text-amber-600 dark:text-amber-300 shadow-inner cursor-pointer"
        onMouseEnter={() => alertRef.current?.startAnimation()}
        onMouseLeave={() => alertRef.current?.stopAnimation()}
      >
        <TriangleAlertIcon ref={alertRef} size={28} className="w-7 h-7 text-amber-600 dark:text-amber-300" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
        Immediate Crisis Support
      </h1>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        You do not need a docket number to get help right now. Trained counsellors and emergency personnel are available 24/7.
      </p>

      <div className="space-y-3 mb-6 text-left">
        <a
          href="tel:14416"
          onMouseEnter={() => teleManasRef.current?.startAnimation()}
          onMouseLeave={() => teleManasRef.current?.stopAnimation()}
          className="flex items-center justify-between p-4 rounded-xl glass-card border border-teal-500/30 hover:border-teal-400/60 transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-800 dark:text-haven-teal transition-transform duration-300 group-hover:scale-110">
              <HandHeartIcon ref={teleManasRef} size={20} className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-foreground text-sm group-hover:text-teal-700 dark:group-hover:text-haven-teal transition-colors">Tele-MANAS Mental Health Helpline</div>
              <div className="text-xs text-muted-foreground">Free, confidential psychological first-aid</div>
            </div>
          </div>
          <span className="font-bold text-teal-800 dark:text-haven-teal text-base group-hover:scale-105 transition-transform">14416</span>
        </a>

        <a
          href="tel:112"
          onMouseEnter={() => policeRef.current?.startAnimation()}
          onMouseLeave={() => policeRef.current?.stopAnimation()}
          className="flex items-center justify-between p-4 rounded-xl glass-card border border-rose-500/30 hover:border-rose-400/60 transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-700 dark:text-rose-300 transition-transform duration-300 group-hover:scale-110">
              <PhoneVolumeIcon ref={policeRef} size={20} className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-foreground text-sm group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors">Emergency Police / Medical</div>
              <div className="text-xs text-muted-foreground">Immediate physical safety dispatch</div>
            </div>
          </div>
          <span className="font-bold text-rose-700 dark:text-rose-300 text-base group-hover:scale-105 transition-transform">112</span>
        </a>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="btn-primary w-full text-slate-950 font-semibold cursor-pointer"
        >
          {dismissLabel}
        </button>
      )}
    </div>
  );
};
