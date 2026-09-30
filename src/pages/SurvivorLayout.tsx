import React, { useState, useRef, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { Sidebar, TopBar, CrisisStrip } from "@/components/survivor/layout";
import { HavenAvatarDock } from "@/components/avatar/HavenAvatarDock";
import { PageLoadingProvider } from "@/context/PageLoadingContext";
import { RouteLoadingManager } from "@/components/survivor/skeleton";

export const SurvivorLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  // Instantly reset scroll to top on tab/route navigation
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <PageLoadingProvider>
      <div className="flex h-screen w-full overflow-hidden relative text-foreground">
        {/* InteractiveBackground behind everything (z-0) */}
        <InteractiveBackground />

        {/* Foreground Container (z-10) with Sidebar and Main Area as siblings */}
        <div className="relative z-10 flex h-full w-full overflow-hidden">
          {/* Sidebar Rail / Mobile Drawer */}
          <Sidebar
            isCollapsed={isCollapsed}
            onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
            isMobileOpen={isMobileOpen}
            onCloseMobile={() => setIsMobileOpen(false)}
          />

          {/* Main Content Column: TopBar pinned at top, Outlet below in scrollable flex-1 */}
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
            <TopBar onOpenMobileSidebar={() => setIsMobileOpen(true)} />

            <main ref={mainRef} className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col justify-between">
              <div className="flex-1 flex flex-col">
                <RouteLoadingManager>
                  <Outlet />
                </RouteLoadingManager>
              </div>

              {/* Redundant CrisisStrip for safety + Slim footer at very bottom */}
              <div className="mt-8 flex-shrink-0">
                <CrisisStrip />
                <footer className="text-center py-4 text-xs text-muted-foreground">
                  © 2026 Haven · Team Esoteric · Smart India Hackathon 2026
                </footer>
              </div>
            </main>
          </div>
        </div>

        {/* Persistent Floating Bottom-Right Avatar Dock */}
        <HavenAvatarDock />
      </div>
    </PageLoadingProvider>
  );
};
