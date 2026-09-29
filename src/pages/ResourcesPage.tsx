import React, { useState, useMemo } from "react";
import {
  ResourceSearchStrip,
  EmergencyHelpBanner,
  SuggestedResourceBanner,
  ExploreByNeedGrid,
  FeaturedResourcesGrid,
  AccessibilitySettingsCard,
  SavedResourcesCard,
  RecentlyViewedCard,
  PeerHelpfulnessCard,
  ResourceReaderModal,
  ResourceItem,
  FEATURED_RESOURCES,
} from "@/components/survivor/resources";
import { EmergencyPanel } from "@/components/survivor/layout";
import { useAvatar } from "@/context/AvatarContext";

export const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [savedResourceIds, setSavedResourceIds] = useState<string[]>([
    "sec-15a-guide",
    "dbt-relief-tracker-guide",
  ]);
  const [activeReadingResource, setActiveReadingResource] =
    useState<ResourceItem | null>(null);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const { triggerCategory, onTyping } = useAvatar();

  // Accessibility States
  const [audioNarrationEnabled, setAudioNarrationEnabled] = useState(false);
  const [plainLanguageEnabled, setPlainLanguageEnabled] = useState(true);
  const [textSize, setTextSize] = useState<"normal" | "large" | "xlarge">(
    "normal"
  );
  const [language, setLanguage] = useState("English");

  // Filtered resources calculation
  const filteredResources = useMemo(() => {
    return FEATURED_RESOURCES.filter((item) => {
      // Category match
      const categoryMatch =
        selectedCategory === "all" || item.category === selectedCategory;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const searchMatch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.plainLanguageSummary.toLowerCase().includes(query) ||
        item.tags.some((t) => t.toLowerCase().includes(query));

      return categoryMatch && searchMatch;
    });
  }, [searchQuery, selectedCategory]);

  const handleToggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    triggerCategory("success");
    setSavedResourceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenReading = (resource: ResourceItem) => {
    triggerCategory("inspect");
    setActiveReadingResource(resource);
  };

  const handleOpenHearingGuide = () => {
    const hearingGuide = FEATURED_RESOURCES.find(
      (r) => r.id === "after-fir-process"
    ) || FEATURED_RESOURCES[0];
    handleOpenReading(hearingGuide);
  };

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full page-enter py-2 sm:py-4 px-2 sm:px-4">
      {/* 2-Column Responsive Layout Matching Reference Geometry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Main Hub (8 cols on lg) */}
        <div className="lg:col-span-8 flex flex-col w-full">
          {/* 1. Interactive Search & Quick Category Filters */}
          <ResourceSearchStrip
            searchQuery={searchQuery}
            onSearchChange={(q) => {
              setSearchQuery(q);
              onTyping();
            }}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            resultsCount={filteredResources.length}
          />

          {/* 2. Emergency & Immediate Help Quick-Dial Strip */}
          <EmergencyHelpBanner
            onOpenEmergencyModal={() => setShowEmergencyModal(true)}
          />

          {/* 3. Personalized Contextual Recommendation ("Suggested for you") */}
          <SuggestedResourceBanner
            onSelectResource={handleOpenReading}
          />

          {/* 4. Explore by Need Modular Rail (5 Categories) */}
          <ExploreByNeedGrid
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* 5. Featured Statutory Guides Grid */}
          <FeaturedResourcesGrid
            resources={filteredResources}
            savedResourceIds={savedResourceIds}
            onToggleSave={handleToggleSave}
            onSelectResource={handleOpenReading}
          />
        </div>

        {/* Right Column: Sidebar (4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col w-full">
          {/* 6. Accessibility & Language Panel */}
          <AccessibilitySettingsCard
            audioNarrationEnabled={audioNarrationEnabled}
            onToggleAudioNarration={() =>
              setAudioNarrationEnabled(!audioNarrationEnabled)
            }
            plainLanguageEnabled={plainLanguageEnabled}
            onTogglePlainLanguage={() =>
              setPlainLanguageEnabled(!plainLanguageEnabled)
            }
            textSize={textSize}
            onChangeTextSize={setTextSize}
            language={language}
            onChangeLanguage={setLanguage}
          />

          {/* 7. Your Saved Bookmarks */}
          <SavedResourcesCard
            savedResourceIds={savedResourceIds}
            onSelectResource={(res) => setActiveReadingResource(res)}
          />

          {/* 8. Recently Viewed History */}
          <RecentlyViewedCard
            onSelectResource={(res) => setActiveReadingResource(res)}
          />

          {/* 9. Helpful for You (Peer Social Proof) */}
          <PeerHelpfulnessCard onSelectHearingGuide={handleOpenHearingGuide} />

          {/* NOTE: "Need someone to talk to?" is EXCLUDED as explicitly directed */}
        </div>
      </div>

      {/* Interactive Resource Reader Modal with Audio Player & Plain Language Toggle */}
      <ResourceReaderModal
        resource={activeReadingResource}
        isOpen={Boolean(activeReadingResource)}
        onClose={() => setActiveReadingResource(null)}
        isSaved={
          activeReadingResource
            ? savedResourceIds.includes(activeReadingResource.id)
            : false
        }
        onToggleSave={() => {
          if (activeReadingResource) {
            handleToggleSave(activeReadingResource.id);
          }
        }}
        defaultPlainLanguage={plainLanguageEnabled}
        textSize={textSize}
      />

      {/* Emergency Distress Dialing Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-rose-500/30 max-w-lg w-full p-6 shadow-2xl relative">
            <EmergencyPanel
              onDismiss={() => setShowEmergencyModal(false)}
              dismissLabel="Close Emergency Center"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
