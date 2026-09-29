import React, { useState, useRef, useEffect } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { TriangleAlertIcon, PhoneVolumeIcon, AnimatedIconHandle } from "@/components/icons";
import { useAvatar } from "@/context/AvatarContext";

interface ThreatReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThreatReportModal: React.FC<ThreatReportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [threatType, setThreatType] = useState<string>("verbal");
  const [description, setDescription] = useState("");
  const [needImmediateEscort, setNeedImmediateEscort] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { onThreatAlert, triggerCategory } = useAvatar();

  // Animated icon refs
  const headerAlertRef = useRef<AnimatedIconHandle>(null);
  const phoneCallRef = useRef<AnimatedIconHandle>(null);
  const submitAlertRef = useRef<AnimatedIconHandle>(null);

  // Trigger avatar concern alert on open
  useEffect(() => {
    if (isOpen) {
      onThreatAlert();
    }
  }, [isOpen, onThreatAlert]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    triggerCategory("send");

    setTimeout(() => {
      triggerCategory("success");
    }, 1200);

    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="threat-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="glass-card p-6 sm:p-8 max-w-lg w-full relative border border-rose-500/40 animate-modal-in shadow-2xl bg-white/95 dark:bg-slate-900/95 text-foreground rounded-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div
          className="flex items-center gap-3 mb-4 cursor-pointer group"
          onMouseEnter={() => headerAlertRef.current?.startAnimation()}
          onMouseLeave={() => headerAlertRef.current?.stopAnimation()}
        >
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-700 dark:text-rose-300 transition-transform duration-300 group-hover:scale-110">
            <TriangleAlertIcon ref={headerAlertRef} size={24} className="text-rose-600 dark:text-rose-400" />
          </div>
          <div>
            <h3 id="threat-modal-title" className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-rose-600 dark:group-hover:text-rose-300">
              Report Witness Intimidation / Threat
            </h3>
            <p className="text-xs text-rose-700 dark:text-rose-300 font-medium">
              Section 15A SC/ST (PoA) Act · Priority Protection Escalation
            </p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="py-6 text-center space-y-3 animate-scale-in">
            <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-foreground">
              High-Priority Alert Transmitted
            </h4>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Your report has been dispatched to the Special Protection Cell & SP Office. A protection officer is contacting you immediately.
            </p>
            <div className="pt-2">
              <a
                href="tel:112"
                onMouseEnter={() => phoneCallRef.current?.startAnimation()}
                onMouseLeave={() => phoneCallRef.current?.stopAnimation()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-bold hover:bg-rose-500/30 transition-colors cursor-pointer"
              >
                <PhoneVolumeIcon ref={phoneCallRef} size={16} className="text-rose-600 dark:text-rose-300" />
                <span>Call Emergency 112 Right Now</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Under Section 15A, the State is legally mandated to protect victims and witnesses from threats, coercion, inducement, or violence.
            </p>

            <div>
              <label className="text-xs font-semibold text-foreground/90 block mb-1.5">
                Type of Concern
              </label>
              <select
                value={threatType}
                onChange={(e) => setThreatType(e.target.value)}
                className="w-full rounded-xl bg-slate-100/90 dark:bg-slate-950/60 border border-slate-300/80 dark:border-border p-2.5 text-xs sm:text-sm text-foreground focus-visible:ring-2 focus-visible:ring-rose-400 outline-none"
              >
                <option value="verbal">Verbal Threat / Intimidation from Accused Party</option>
                <option value="physical">Physical Following / Suspicious Presence near Residence</option>
                <option value="phone">Coercive Phone Calls / Anonymous Messages</option>
                <option value="court">Intimidation regarding Court Appearance / Deposition</option>
                <option value="economic">Economic Boycott or Social Pressure</option>
              </select>
            </div>

            <div>
              <label htmlFor="threat-details" className="text-xs font-semibold text-foreground/90 block mb-1.5">
                Brief Details (Date, time, person, or location)
              </label>
              <textarea
                id="threat-details"
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what occurred so the protection cell can act effectively..."
                className="w-full rounded-xl bg-slate-100/90 dark:bg-slate-950/60 border border-slate-300/80 dark:border-border p-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-rose-400 outline-none resize-none"
              />
            </div>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 cursor-pointer text-xs text-foreground">
              <input
                type="checkbox"
                checked={needImmediateEscort}
                onChange={(e) => setNeedImmediateEscort(e.target.checked)}
                className="accent-rose-500 w-4 h-4 rounded"
              />
              <span className="font-medium">
                Request immediate police patrol / escort at my residence
              </span>
            </label>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl glass-card text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                onMouseEnter={() => submitAlertRef.current?.startAnimation()}
                onMouseLeave={() => submitAlertRef.current?.stopAnimation()}
                className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-lg shadow-rose-500/25 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <TriangleAlertIcon ref={submitAlertRef} size={15} className="text-white" />
                <span>Submit Priority Report</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
