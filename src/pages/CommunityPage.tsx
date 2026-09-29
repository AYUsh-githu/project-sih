import React, { useState } from "react";
import {
  CommunityHeroBanner,
  SupportCirclesGrid,
  FeaturedCircleCard,
  SafetyProtocolCard,
  HavenAiCommunitySuggest,
  SuggestedPeerMatchCard,
  QuoteOfTheDayCard,
  CircleDiscussionModal,
  SupportCircleItem,
} from "@/components/survivor/community";

export const CommunityPage: React.FC = () => {
  const [activeCircle, setActiveCircle] = useState<SupportCircleItem | null>(null);

  const handleOpenCircle = (circle: SupportCircleItem) => {
    setActiveCircle(circle);
  };

  const handleCloseCircle = () => {
    setActiveCircle(null);
  };

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full page-enter py-2 sm:py-4 px-2 sm:px-4">
      {/* 2-Column Responsive Layout Matching Reference Geometry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Main Area - 8 cols on lg) */}
        <div className="lg:col-span-8 flex flex-col w-full space-y-6">
          {/* 1. Hero Reassurance Banner & Ethereal Constellation */}
          <CommunityHeroBanner />

          {/* 2. 4-Themed Support Circles Grid */}
          <SupportCirclesGrid onSelectCircle={handleOpenCircle} />

          {/* 3. Bottom Row: Featured Circle Spotlight (Left) & Safety Protocol (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            <FeaturedCircleCard onJoinCircle={handleOpenCircle} />
            <SafetyProtocolCard />
          </div>
        </div>

        {/* Right Column (Sidebar - 4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col w-full space-y-5">
          {/* 4. Haven AI Smart Community Suggestion (Replaces Today's Prompt as requested) */}
          <HavenAiCommunitySuggest onJoinCircle={handleOpenCircle} />

          {/* 5. Suggested Peer Match (Anonymized Stage Compatibility) */}
          <SuggestedPeerMatchCard />

          {/* 6. Restorative "Quote of the Day" with Serene Nature Aesthetic */}
          <QuoteOfTheDayCard />
        </div>
      </div>

      {/* Interactive Trauma-Informed Circle Discussion Modal */}
      <CircleDiscussionModal
        circle={activeCircle}
        onClose={handleCloseCircle}
      />
    </div>
  );
};

export default CommunityPage;
