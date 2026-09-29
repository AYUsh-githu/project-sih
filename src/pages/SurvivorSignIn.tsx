import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { CrisisStrip, EmergencyPanel } from "@/components/survivor/layout";
import { DocketStep, OtpStep, ProfileConsentStep } from "@/components/survivor/auth";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";

export type StepState = "docket" | "otp" | "profile" | "immediate";

export const SurvivorSignIn: React.FC = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<StepState>("docket");
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [docketNumber, setDocketNumber] = useState<string>("");
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const [ariaLiveMessage, setAriaLiveMessage] = useState<string>("Step 1: Enter your NHAA docket number");

  // Handle successful docket lookup
  const handleDocketSuccess = (enteredDocket: string, firstTime: boolean) => {
    setDocketNumber(enteredDocket);
    setIsFirstTime(firstTime);
    setDirection("forward");
    setStep("otp");
    setAriaLiveMessage("Step 2: Enter the 6-digit verification code sent to your phone");
  };

  // Handle successful OTP verification
  const handleOtpSuccess = () => {
    if (isFirstTime) {
      setDirection("forward");
      setStep("profile");
      setAriaLiveMessage("Step 3: Tell us your preferred name and language");
    } else {
      // Returning docket proceeds directly to Survivor Home
      navigate("/survivor/home");
    }
  };

  // Handle back from OTP to Docket
  const handleOtpBack = () => {
    setDirection("back");
    setStep("docket");
    setAriaLiveMessage("Returned to Step 1: NHAA docket entry");
  };

  // Handle profile consent completion
  const handleProfileComplete = (_profile: { preferredName: string; language: string }) => {
    // Navigate to placeholder dashboard
    navigate("/survivor/home");
  };

  // Ungated Immediate Support handler (ensures no survivor in crisis is blocked by docket form)
  const handleImmediateSupport = () => {
    setDirection("forward");
    setStep("immediate");
    setAriaLiveMessage("Immediate Crisis Support and Hotlines");
  };

  // Animation class based on direction
  const animationClass =
    step === "docket" && direction === "forward"
      ? "animate-scale-in"
      : direction === "forward"
      ? "animate-slide-in-right"
      : "animate-slide-in-left";

  return (
    <div className="min-h-screen relative flex flex-col justify-between p-4 sm:p-6 page-enter">
      <InteractiveBackground />

      {/* Screen reader live region for announcing step changes */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {ariaLiveMessage}
      </div>

      {/* Top Bar with Home Link & Theme Toggle (Matching PortalStub) */}
      <header className="flex items-center justify-between max-w-5xl mx-auto w-full pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-haven-teal transition-colors font-medium focus-visible:ring-2 focus-visible:ring-haven-teal rounded-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Haven</span>
        </Link>

        <ThemeToggleButton />
      </header>

      {/* Main Centered Form Container (max-w-lg) */}
      <main className="flex-1 flex items-center justify-center py-8 sm:py-12">
        <div className="w-full max-w-lg mx-auto">
          <div
            key={step}
            className={`glass-card p-6 sm:p-10 w-full rounded-2xl border border-teal-500/20 shadow-2xl overflow-hidden ${animationClass}`}
          >
            {step === "docket" && (
              <DocketStep
                onSuccess={handleDocketSuccess}
                onImmediateSupport={handleImmediateSupport}
              />
            )}

            {step === "otp" && (
              <OtpStep
                docketNumber={docketNumber}
                onSuccess={handleOtpSuccess}
                onBack={handleOtpBack}
              />
            )}

            {step === "profile" && (
              <ProfileConsentStep onComplete={handleProfileComplete} />
            )}

            {step === "immediate" && (
              <EmergencyPanel
                onDismiss={() => {
                  setDirection("back");
                  setStep("docket");
                }}
                dismissLabel="Return to Docket Sign In"
              />
            )}
          </div>
        </div>
      </main>

      {/* Pinned Crisis Strip above footer on every step */}
      <CrisisStrip />

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-muted-foreground">
        © 2026 Haven · Team Esoteric · Smart India Hackathon 2026
      </footer>
    </div>
  );
};
