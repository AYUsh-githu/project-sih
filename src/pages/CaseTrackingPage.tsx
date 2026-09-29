import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CaseStageRail,
  CounselorDetailsCard,
  FinancialReliefCard,
  LegalDocumentVault,
} from "@/components/survivor/case-tracking";
import {
  CaseTimelineCard,
  CounselorContactModal,
  ThreatReportModal,
} from "@/components/survivor/home";

export const CaseTrackingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isThreatModalOpen, setIsThreatModalOpen] = useState(false);
  const [isCounselorModalOpen, setIsCounselorModalOpen] = useState(false);

  const handleAskHaven = (promptText: string) => {
    // Navigate to Haven AI with preloaded inquiry if desired
    navigate("/survivor/haven-ai");
  };

  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full page-enter py-2 sm:py-4">
      {/* 1. Top Section: 4-Node Case Stage Progression Rail (From Sketch) */}
      <CaseStageRail />

      {/* 2. Middle Row: Counselor Details (Left) & Money Received / Relief (Right) (From Sketch) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch mb-6">
        {/* Left Column: Assigned Counselor Profile & Care Details (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col w-full">
          <CounselorDetailsCard
            onOpenCounselorModal={() => setIsCounselorModalOpen(true)}
            onAskHaven={handleAskHaven}
          />
        </div>

        {/* Right Column: Financial Relief & DBT Status Card (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col w-full">
          <FinancialReliefCard />
        </div>
      </div>

      {/* 3. Statutory Case Timeline (Preserved from Home Page as requested) */}
      <CaseTimelineCard onReportThreat={() => setIsThreatModalOpen(true)} />

      {/* 4. Encrypted Legal Document Vault & Court Orders */}
      <LegalDocumentVault />

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

export default CaseTrackingPage;
