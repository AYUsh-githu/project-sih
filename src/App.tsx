import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  SparklesIcon,
  FileDescriptionIcon,
  UsersGroupIcon,
  BookIcon,
} from "@/components/icons";
import { ThemeProvider } from "@/context/ThemeContext";
import { AvatarProvider } from "@/context/AvatarContext";
import { Landing } from "@/pages/Landing";
import { SurvivorSignIn } from "@/pages/SurvivorSignIn";
import { SurvivorLayout } from "@/pages/SurvivorLayout";
import { SurvivorHome } from "@/pages/SurvivorHome";
import { HavenAiPage } from "@/pages/HavenAiPage";
import { CaseTrackingPage } from "@/pages/CaseTrackingPage";
import { CommunityPage } from "@/pages/CommunityPage";
import { ResourcesPage } from "@/pages/ResourcesPage";
import { SettingsPage } from "@/pages/SettingsPage";

import { AdminPortalPage } from "@/pages/AdminPortalPage";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AvatarProvider>
        <BrowserRouter>
          <Routes>
            {/* Main Landing Page */}
            <Route path="/" element={<Landing />} />

            {/* Survivor Sign-In & Dashboard */}
            <Route path="/survivor" element={<SurvivorSignIn />} />
            <Route path="/survivor" element={<SurvivorLayout />}>
              <Route path="home" element={<SurvivorHome />} />
              <Route path="haven-ai" element={<HavenAiPage />} />
              <Route path="case-tracking" element={<CaseTrackingPage />} />
              <Route path="community" element={<CommunityPage />} />
              <Route path="resources" element={<ResourcesPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Admin & Authority Portal Routes */}
            <Route path="/admin" element={<AdminPortalPage />} />
            <Route path="/authority" element={<AdminPortalPage />} />

            {/* Fallback to landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AvatarProvider>
    </ThemeProvider>
  );
};

export default App;
