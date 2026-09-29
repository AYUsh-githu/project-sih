import React, { useState, useRef } from "react";
import {
  CheckCircle,
  X,
} from "lucide-react";
import {
  CalendarIcon,
  ClockIcon,
  PhoneIcon,
  PhoneVolumeIcon,
  AnimatedIconHandle,
} from "@/components/icons";

interface UpcomingAppointmentCardProps {
  onOpenCounselorModal?: () => void;
}

export const UpcomingAppointmentCard: React.FC<UpcomingAppointmentCardProps> = ({
  onOpenCounselorModal,
}) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [rescheduleConfirmed, setRescheduleConfirmed] = useState(false);

  // Animated icon refs for container-level trigger
  const calendarRef = useRef<AnimatedIconHandle>(null);
  const timeClockRef = useRef<AnimatedIconHandle>(null);
  const callPhoneRef = useRef<AnimatedIconHandle>(null);
  const teleManasRef = useRef<AnimatedIconHandle>(null);

  const handleJoin = () => {
    setIsJoined(true);
  };

  const handleConfirmReschedule = () => {
    setRescheduleConfirmed(true);
    setTimeout(() => {
      setIsRescheduling(false);
      setRescheduleConfirmed(false);
    }, 2000);
  };

  return (
    <>
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-teal-500/20 shadow-xl relative overflow-hidden">
        {/* Header with container hover trigger */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-border/50 cursor-pointer group"
          onMouseEnter={() => calendarRef.current?.startAnimation()}
          onMouseLeave={() => calendarRef.current?.stopAnimation()}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500/25 via-cyan-500/20 to-teal-400/10 border border-teal-500/30 flex items-center justify-center text-haven-teal shadow-inner transition-transform duration-300 group-hover:scale-110">
              <CalendarIcon ref={calendarRef} size={20} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-haven-teal">
                Upcoming Appointment
              </h2>
              <span className="text-xs text-muted-foreground">
                Assigned Trauma Counseling & Psychological First Aid
              </span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            Confirmed Session
          </span>
        </div>

        {/* Content Body with Live Audio Waveform */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-6 items-center">
          {/* Col 1: Counselor Profile Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Counselor Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 via-cyan-500 to-indigo-600 p-0.5 shadow-md">
                <div className="w-full h-full rounded-2xl bg-teal-50 dark:bg-slate-900 flex items-center justify-center text-teal-800 dark:text-teal-300 font-bold text-xl">
                  AS
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-white dark:text-slate-950 font-bold shadow-xs">
                ✓
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  Dr. Ananya Sharma, Ph.D.
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-800 dark:text-haven-teal font-semibold">
                  Verified Counselor
                </span>
              </div>

              <p className="text-xs text-teal-700 dark:text-haven-teal font-medium">
                Clinical Psychologist · District Trauma Care Unit & Tele-MANAS Partner
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground">
                <span
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/25 text-teal-800 dark:text-haven-teal font-medium cursor-pointer transition-colors hover:bg-teal-500/20"
                  onMouseEnter={() => timeClockRef.current?.startAnimation()}
                  onMouseLeave={() => timeClockRef.current?.stopAnimation()}
                >
                  <ClockIcon ref={timeClockRef} size={15} className="text-teal-700 dark:text-haven-teal" />
                  <span>Tomorrow, 10:30 AM – 11:15 AM (45 min)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Live Audio Frequency Waveform Visualizer (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-950/40 border border-slate-200/80 dark:border-teal-500/15 shadow-xs dark:shadow-none">
            <div className="flex items-center justify-between w-full mb-2 px-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
                Live Audio Channel
              </span>
              <span className="text-[10px] text-slate-500 dark:text-muted-foreground font-mono">
                E2EE Active
              </span>
            </div>

            {/* Animated Audio Waveform Bars */}
            <div className="h-10 w-full flex items-center justify-center gap-[3px] py-1 px-2 overflow-hidden">
              {[
                8, 14, 22, 12, 28, 36, 18, 24, 32, 14, 28, 38, 22, 16, 30, 40,
                26, 18, 34, 22, 12, 26, 32, 16, 22, 10, 18, 8,
              ].map((height, i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full bg-gradient-to-t from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:via-cyan-300 dark:to-indigo-400 transition-all duration-300"
                  style={{
                    height: `${height}px`,
                    animation: `pulse 1.${(i % 5) + 2}s ease-in-out infinite alternate`,
                    animationDelay: `${(i * 0.04).toFixed(2)}s`,
                  }}
                />
              ))}
            </div>

            <span className="text-[10px] text-slate-500 dark:text-muted-foreground mt-1.5 font-medium">
              Audio stream initialized · Ready for private check-in
            </span>
          </div>

          {/* Col 3: Action Buttons (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-2.5 lg:items-end justify-center">
            {isJoined ? (
              <div className="w-full sm:w-auto px-5 py-3 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-800 dark:text-haven-teal text-sm font-semibold flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 animate-pulse" />
                <span>Call Room Open · Connecting Safely...</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleJoin}
                onMouseEnter={() => callPhoneRef.current?.startAnimation()}
                onMouseLeave={() => callPhoneRef.current?.stopAnimation()}
                className="btn-primary w-full inline-flex items-center justify-center gap-2 text-slate-950 font-bold text-sm shadow-glow-teal cursor-pointer"
              >
                <PhoneIcon ref={callPhoneRef} size={16} className="text-slate-950" />
                <span>Join Encrypted Call</span>
              </button>
            )}

            <div className="flex items-center gap-2 w-full">
              <button
                type="button"
                onClick={() => setIsRescheduling(true)}
                className="flex-1 px-3.5 py-2 rounded-xl glass-card text-xs font-semibold text-slate-600 dark:text-muted-foreground hover:text-foreground hover:border-teal-400/30 transition-colors cursor-pointer text-center"
              >
                Reschedule
              </button>

              <a
                href="tel:14416"
                onMouseEnter={() => teleManasRef.current?.startAnimation()}
                onMouseLeave={() => teleManasRef.current?.stopAnimation()}
                className="flex-1 px-3.5 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/25 text-teal-800 dark:text-haven-teal text-xs font-semibold transition-colors text-center inline-flex items-center justify-center gap-1.5 cursor-pointer"
                title="Call Tele-MANAS 14416 if you need to talk right now"
              >
                <PhoneVolumeIcon ref={teleManasRef} size={15} className="text-teal-700 dark:text-haven-teal" />
                <span>14416</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer reassurance banner */}
        <div className="mt-2 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span>Camera is disabled by default for privacy. Speak or type freely.</span>
          </span>
          <span className="font-mono text-muted-foreground/70 hidden sm:inline">
            Session ID: #SESS-26094-88
          </span>
        </div>
      </div>

      {/* Reschedule Modal */}
      {isRescheduling && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsRescheduling(false);
          }}
        >
          <div className="glass-card p-6 sm:p-8 max-w-md w-full relative border border-teal-500/30 animate-modal-in shadow-2xl bg-slate-900/95 text-foreground rounded-2xl">
            <button
              type="button"
              onClick={() => setIsRescheduling(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-foreground mb-2">
              Reschedule Session
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Select an alternative slot with Dr. Ananya Sharma. We will coordinate smoothly with no penalty or hassle.
            </p>

            <div className="space-y-2 mb-6">
              {[
                "Tomorrow at 03:00 PM – 03:45 PM",
                "Monday, Oct 5 at 10:30 AM – 11:15 AM",
                "Tuesday, Oct 6 at 04:00 PM – 04:45 PM",
              ].map((slot, i) => (
                <label
                  key={slot}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border/60 hover:border-teal-400/40 bg-white/5 cursor-pointer text-xs sm:text-sm text-foreground"
                >
                  <input
                    type="radio"
                    name="slot"
                    defaultChecked={i === 0}
                    className="accent-teal-400"
                  />
                  <span>{slot}</span>
                </label>
              ))}
            </div>

            {rescheduleConfirmed ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold text-center animate-fade-in">
                ✓ Reschedule request received! Counselor will confirm via SMS.
              </div>
            ) : (
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRescheduling(false)}
                  className="px-4 py-2 rounded-xl glass-card text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReschedule}
                  className="btn-primary text-xs font-semibold text-slate-950 px-5 py-2 cursor-pointer"
                >
                  Confirm New Slot
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
