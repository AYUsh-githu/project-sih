import React, { useState } from "react";
import {
  GreetingHeader,
  QuickActionsGrid,
  CaseTimelineCard,
  UpcomingAppointmentCard,
  CounselorContactModal,
  ThreatReportModal,
} from "@/components/survivor/home";
import { EmergencyPanel } from "@/components/survivor/layout";
import { X } from "lucide-react";

export const SurvivorHome: React.FC = () => {
  const [isCounselorModalOpen, setIsCounselorModalOpen] = useState(false);
  const [isThreatModalOpen, setIsThreatModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full page-enter py-2 sm:py-4">
      {/* 1. Time-Aware Greeting Header & Mood Check-in */}
      <GreetingHeader
        userName="Priya"
        docketNumber="NHAA-2026-8821"
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
      />

      {/* 2. Quick Actions Grid (Haven AI, Resources, Reach Counselor) */}
      <QuickActionsGrid
        onOpenCounselorModal={() => setIsCounselorModalOpen(true)}
      />

      {/* 3. My Case Timeline (Milestones: FIR -> Charge Sheet -> Special Court -> Rehabilitation) */}
      <CaseTimelineCard
        onReportThreat={() => setIsThreatModalOpen(true)}
      />

      {/* 4. Upcoming Appointment (Dr. Ananya Sharma, Encrypted Call) */}
      <UpcomingAppointmentCard
        onOpenCounselorModal={() => setIsCounselorModalOpen(true)}
      />

      {/* Interactive Modals */}
      <CounselorContactModal
        isOpen={isCounselorModalOpen}
        onClose={() => setIsCounselorModalOpen(false)}
      />

      <ThreatReportModal
        isOpen={isThreatModalOpen}
        onClose={() => setIsThreatModalOpen(false)}
      />

      {/* Immediate Emergency Modal (if triggered via Distress check-in) */}
      {isEmergencyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsEmergencyModalOpen(false);
          }}
        >
          <div className="glass-card p-6 sm:p-8 max-w-lg w-full relative border border-rose-500/40 animate-modal-in shadow-2xl bg-white/95 dark:bg-slate-900/95 text-foreground rounded-2xl">
            <button
              type="button"
              onClick={() => setIsEmergencyModalOpen(false)}
              aria-label="Close emergency panel"
              className="absolute top-4 right-4 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <EmergencyPanel
              onDismiss={() => setIsEmergencyModalOpen(false)}
              dismissLabel="Close"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SurvivorHome;
