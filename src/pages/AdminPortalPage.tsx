import React, { useState } from "react";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import {
  AdminHeader,
  AdminRoleCard,
  CounselorSignInModal,
  DistrictOfficerSignInModal,
  StateOfficerSignInModal,
} from "@/components/admin";
import {
  CounselorCareIcon,
  DistrictCourtIcon,
  StateSecretariatIcon,
} from "@/components/icons";
import { ShieldCheck, CheckCircle2, LogOut, ExternalLink } from "lucide-react";

export const AdminPortalPage: React.FC = () => {
  const [activeModal, setActiveModal] = useState<"counselor" | "district" | "state" | null>(null);
  const [authenticatedStaff, setAuthenticatedStaff] = useState<any | null>(null);

  const handleAuthSuccess = (staffData: any) => {
    setAuthenticatedStaff(staffData);
  };

  const handleSignOut = () => {
    setAuthenticatedStaff(null);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden text-foreground">
      {/* Background Interactive Canvas Particle Layer & Radial Blobs */}
      <InteractiveBackground />

      {/* Top Header Bar */}
      <AdminHeader />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-8 sm:py-12 z-10 max-w-7xl mx-auto w-full page-enter">
        {/* Active Session Notification (if signed in) */}
        {authenticatedStaff && (
          <div className="w-full max-w-3xl mb-8 p-4 rounded-2xl glass-card border border-emerald-500/40 bg-emerald-500/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-scale-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    Active Session:
                  </span>
                  <strong className="text-sm text-foreground">
                    {authenticatedStaff.name}
                  </strong>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 border border-emerald-500/30">
                    {authenticatedStaff.staffId || authenticatedStaff.badgeId || authenticatedStaff.cadreId}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Jurisdiction: <strong>{authenticatedStaff.district || authenticatedStaff.jurisdiction || authenticatedStaff.stateDept}</strong> · Role: <span className="capitalize">{authenticatedStaff.role.replace("_", " ")}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 dark:bg-white/10 hover:bg-rose-500/15 text-foreground hover:text-rose-600 dark:hover:text-rose-400 text-xs font-semibold border border-border transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        )}

        {/* Hero Title Section Matching Screenshot Layout */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            Welcome to Haven
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-2 font-medium">
            A unified platform for coordinated support, safety and justice.
          </p>
          <p className="text-xs sm:text-sm text-teal-800 dark:text-haven-teal font-semibold tracking-wide">
            Choose your role to continue.
          </p>
        </div>

        {/* 3-Column Role Selection Grid Matching Screenshot Structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl mb-12">
          {/* Card 1: Counselor */}
          <AdminRoleCard
            id="counselor"
            title="Counselor"
            badge="Tele-MANAS & District Psychologists"
            description="Provide support, track progress and connect with individuals in need."
            buttonLabel="Continue as Counselor"
            icon={CounselorCareIcon}
            accentColor="teal"
            onSelect={() => setActiveModal("counselor")}
          />

          {/* Card 2: District Officer */}
          <AdminRoleCard
            id="district"
            title="District Officer"
            badge="Magistrate & SP Protection Cell"
            description="Manage cases, coordinate services and ensure timely support at the district level."
            buttonLabel="Continue as District Officer"
            icon={DistrictCourtIcon}
            accentColor="amber"
            onSelect={() => setActiveModal("district")}
          />

          {/* Card 3: State Officer */}
          <AdminRoleCard
            id="state"
            title="State Officer"
            badge="Secretariat & SLVMC High Committee"
            description="Oversee district operations, monitor progress and support state-level coordination."
            buttonLabel="Continue as State Officer"
            icon={StateSecretariatIcon}
            accentColor="emerald"
            onSelect={() => setActiveModal("state")}
          />
        </div>

        {/* Statutory Compliance Footer Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-muted-foreground py-3 px-5 rounded-2xl glass-card border border-teal-500/15">
          <span className="flex items-center gap-1.5 text-teal-800 dark:text-haven-teal font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Statutory Multi-Tier Governance</span>
          </span>
          <span className="hidden sm:inline text-muted-foreground/60">·</span>
          <span>Section 15A SC/ST (PoA) Act</span>
          <span className="hidden sm:inline text-muted-foreground/60">·</span>
          <span>Tele-MANAS Guidelines</span>
          <span className="hidden sm:inline text-muted-foreground/60">·</span>
          <span>DPDP Act 2025 Protected</span>
        </div>
      </main>

      {/* Role-Specific Authentication Modals */}
      <CounselorSignInModal
        isOpen={activeModal === "counselor"}
        onClose={() => setActiveModal(null)}
        onSuccess={handleAuthSuccess}
      />

      <DistrictOfficerSignInModal
        isOpen={activeModal === "district"}
        onClose={() => setActiveModal(null)}
        onSuccess={handleAuthSuccess}
      />

      <StateOfficerSignInModal
        isOpen={activeModal === "state"}
        onClose={() => setActiveModal(null)}
        onSuccess={handleAuthSuccess}
      />

      {/* Slim Page Footer */}
      <footer className="text-center py-4 text-xs text-muted-foreground border-t border-border/40 z-10">
        © 2026 Haven · Team Esoteric · Smart India Hackathon 2026 (Problem Statement ID 26094)
      </footer>
    </div>
  );
};

export default AdminPortalPage;
