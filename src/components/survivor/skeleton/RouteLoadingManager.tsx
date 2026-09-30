import React from "react";
import { useLocation } from "react-router-dom";
import { usePageLoading } from "@/context/PageLoadingContext";
import { HomeSkeleton } from "./HomeSkeleton";
import { HavenAiSkeleton } from "./HavenAiSkeleton";
import { CaseTrackingSkeleton } from "./CaseTrackingSkeleton";
import { CommunitySkeleton } from "./CommunitySkeleton";
import { ResourcesSkeleton } from "./ResourcesSkeleton";
import { SettingsSkeleton } from "./SettingsSkeleton";
import { PageLoadingError } from "./PageLoadingError";

interface RouteLoadingManagerProps {
  children: React.ReactNode;
}

export const RouteLoadingManager: React.FC<RouteLoadingManagerProps> = ({
  children,
}) => {
  const { isLoading, error, retryLoading } = usePageLoading();
  const location = useLocation();

  const getPageTitle = (path: string): string => {
    if (path.includes("haven-ai")) return "Haven AI Companion";
    if (path.includes("case-tracking")) return "Case Tracking & Legal Monitor";
    if (path.includes("community")) return "Community & Peer Support Circles";
    if (path.includes("resources")) return "Legal & Healing Resources";
    if (path.includes("settings")) return "Companion Studio & Settings";
    return "Home Dashboard";
  };

  const renderSkeleton = (path: string) => {
    if (path.includes("haven-ai")) {
      return <HavenAiSkeleton />;
    }
    if (path.includes("case-tracking")) {
      return <CaseTrackingSkeleton />;
    }
    if (path.includes("community")) {
      return <CommunitySkeleton />;
    }
    if (path.includes("resources")) {
      return <ResourcesSkeleton />;
    }
    if (path.includes("settings")) {
      return <SettingsSkeleton />;
    }
    return <HomeSkeleton />;
  };

  const pageTitle = getPageTitle(location.pathname);

  // If page encountered an error during data or network fetch
  if (error) {
    return (
      <div className="flex-1 flex flex-col w-full justify-center">
        <PageLoadingError error={error} onRetry={retryLoading} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col w-full relative">
      {/* Screen Reader polite status announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        {isLoading
          ? `Loading ${pageTitle}... Please hold on.`
          : `${pageTitle} is ready.`}
      </div>

      {isLoading ? (
        <div
          role="region"
          aria-busy="true"
          aria-label={`Loading ${pageTitle}`}
          className="flex-1 flex flex-col w-full animate-fade-in"
        >
          {renderSkeleton(location.pathname)}
        </div>
      ) : (
        <div
          role="region"
          aria-busy="false"
          aria-label={pageTitle}
          className="flex-1 flex flex-col w-full page-enter"
        >
          {children}
        </div>
      )}
    </div>
  );
};
