import React, { useState, useRef } from "react";
import { UserCheck, Sparkles, Check, Globe } from "lucide-react";
import { InfoModal } from "@/components/landing/InfoModal";

interface ProfileConsentStepProps {
  onComplete: (profile: { preferredName: string; language: string }) => void;
}

/**
 * HUMAN REVIEW FLAGS / OUT OF SCOPE:
 * - PROFILE CONSENT MANDATORY STATUS: Confirm with product/legal whether ProfileConsentStep
 *   is strictly mandatory before accessing the portal, or skippable for returning/urgent survivor journeys.
 */

const INDIAN_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi (हिन्दी)" },
  { code: "bn", label: "Bengali (বাংলা)" },
  { code: "te", label: "Telugu (తెలుగు)" },
  { code: "mr", label: "Marathi (मराठी)" },
  { code: "ta", label: "Tamil (தமிழ்)" },
  { code: "gu", label: "Gujarati (ગુજરાતી)" },
  { code: "ur", label: "Urdu (اردو)" },
  { code: "kn", label: "Kannada (ಕನ್ನಡ)" },
  { code: "or", label: "Odia (ଓଡ଼ିଆ)" },
  { code: "ml", label: "Malayalam (മലയാളം)" },
  { code: "pa", label: "Punjabi (ਪੰਜਾਬੀ)" },
  { code: "as", label: "Assamese (অসমীয়া)" },
];

export const ProfileConsentStep: React.FC<ProfileConsentStepProps> = ({ onComplete }) => {
  const [preferredName, setPreferredName] = useState("");
  const [language, setLanguage] = useState("en");
  const [hasConsented, setHasConsented] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const privacyTriggerRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConsented) return;
    onComplete({
      preferredName: preferredName.trim() || "Friend",
      language,
    });
  };

  return (
    <div className="w-full">
      {/* Icon badge */}
      <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-5 text-haven-teal shadow-inner">
        <UserCheck className="w-7 h-7 text-haven-teal" />
      </div>

      {/* Heading & Subtext */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
          Set up your safe space
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Tell us how you would like Haven to address and assist you.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5 text-left">
        {/* Preferred Name / Alias (Explicitly not legal name) */}
        <div>
          <label
            htmlFor="preferred-name"
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
          >
            What should we call you?
          </label>
          <input
            id="preferred-name"
            type="text"
            value={preferredName}
            onChange={(e) => setPreferredName(e.target.value)}
            placeholder="Preferred name or alias (e.g. Priya)"
            autoComplete="nickname"
            className="w-full px-4 py-3.5 rounded-xl bg-slate-900/60 dark:bg-slate-950/60 text-foreground placeholder:text-muted-foreground/50 border border-border hover:border-teal-400/40 focus:border-haven-teal focus:ring-2 focus:ring-haven-teal/20 transition-all duration-200 outline-none text-base"
          />
          <p className="text-xs text-muted-foreground/75 mt-1.5">
            You do not need to provide your legal name. You are in control of your identity.
          </p>
        </div>

        {/* Preferred Language Select */}
        <div>
          <label
            htmlFor="preferred-language"
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
          >
            Preferred Language
          </label>
          <div className="relative">
            <select
              id="preferred-language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-900/60 dark:bg-slate-950/60 text-foreground border border-border hover:border-teal-400/40 focus:border-haven-teal focus:ring-2 focus:ring-haven-teal/20 transition-all duration-200 outline-none text-base appearance-none cursor-pointer pr-10"
            >
              {INDIAN_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                  {lang.label}
                </option>
              ))}
            </select>
            <Globe className="w-5 h-5 text-muted-foreground pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
          <p className="text-xs text-muted-foreground/75 mt-1.5">
            All check-ins, messages, and guidance will be adapted to your chosen language.
          </p>
        </div>

        {/* Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center mt-0.5">
              <input
                type="checkbox"
                checked={hasConsented}
                onChange={(e) => setHasConsented(e.target.checked)}
                className="peer sr-only"
                id="consent-checkbox"
                required
              />
              <div className="w-5 h-5 rounded-md border border-border bg-slate-900/60 dark:bg-slate-950/60 peer-checked:bg-haven-teal peer-checked:border-haven-teal peer-focus-visible:ring-2 peer-focus-visible:ring-haven-teal transition-all flex items-center justify-center">
                {hasConsented && <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />}
              </div>
            </div>
            <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed select-none">
              <span>I understand that Haven shares data solely on a role-scoped, need-to-know basis with human review. I have reviewed </span>
              <button
                ref={privacyTriggerRef}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsPrivacyModalOpen(true);
                }}
                className="text-haven-teal hover:underline font-medium inline cursor-pointer focus-visible:ring-2 focus-visible:ring-haven-teal rounded-sm"
              >
                how Haven protects my privacy
              </button>
              <span> and consent to proceed.</span>
            </div>
          </label>
        </div>

        {/* Primary CTA */}
        <button
          type="submit"
          disabled={!hasConsented}
          className="btn-hero w-full flex items-center justify-center gap-2 text-base font-semibold shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none mt-6"
        >
          <Sparkles className="w-5 h-5" />
          <span>Enter Haven</span>
        </button>
      </form>

      {/* Reused InfoModal Component */}
      <InfoModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        triggerRef={privacyTriggerRef}
      />
    </div>
  );
};
