import React, { useState } from "react";
import {
  HavenAiStage,
  ActiveCaseSnapshot,
  AiSuggestionsCard,
  ChatHistorySection,
  PastChatSession,
} from "@/components/survivor/haven-ai";
import {
  CounselorContactModal,
  ThreatReportModal,
} from "@/components/survivor/home";

export const HavenAiPage: React.FC = () => {
  const [externalPrompt, setExternalPrompt] = useState<string | null>(null);
  const [isThreatModalOpen, setIsThreatModalOpen] = useState(false);
  const [isCounselorModalOpen, setIsCounselorModalOpen] = useState(false);

  const handleAskHaven = (promptText: string) => {
    setExternalPrompt(promptText);
    // Smooth scroll to top of Haven AI stage on mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectSession = (session: PastChatSession) => {
    setExternalPrompt(
      `Let us resume our conversation regarding: "${session.title}". Could you summarize key rights and next steps where we left off?`
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full page-enter py-2 sm:py-4">
      {/* 2-Column Responsive Layout:
          LEFT COLUMN: Haven AI Stage + Chat History (Compressed directly below Haven AI)
          RIGHT COLUMN: Active Case Snapshot + AI Suggestions (Down to Case Snapshot)
      */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Conversational Stage & Chat History Archive (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col space-y-5 w-full">
          {/* Main Haven AI Stage with smooth motion expansion */}
          <HavenAiStage
            externalPrompt={externalPrompt}
            onClearExternalPrompt={() => setExternalPrompt(null)}
            onOpenThreatReport={() => setIsThreatModalOpen(true)}
            onOpenCounselor={() => setIsCounselorModalOpen(true)}
          />

          {/* Chat History & Encrypted Journaling Drawer (Placed directly below Haven AI) */}
          <ChatHistorySection onSelectSession={handleSelectSession} />
        </div>

        {/* RIGHT COLUMN: Case Snapshot & AI Suggestions (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col space-y-5 w-full">
          {/* Active Case Snapshot (Next Hearing, Protection Tier, Assigned Counselor) */}
          <ActiveCaseSnapshot
            onAskHaven={handleAskHaven}
            onOpenThreatReport={() => setIsThreatModalOpen(true)}
            onOpenCounselor={() => setIsCounselorModalOpen(true)}
          />

          {/* AI Suggestions & Recommendations (Placed below Active Case Snapshot) */}
          <AiSuggestionsCard onApplySuggestion={handleAskHaven} />
        </div>
      </div>

      {/* Interactive Modals */}
      <ThreatReportModal
        isOpen={isThreatModalOpen}
        onClose={() => setIsThreatModalOpen(false)}
      />

      <CounselorContactModal
        isOpen={isCounselorModalOpen}
        onClose={() => setIsCounselorModalOpen(false)}
      />
    </div>
  );
};

export default HavenAiPage;
