import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { InfoModal } from "./InfoModal";

export const RoleGate: React.FC = () => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const privacyTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="text-center py-6">
      {/* Role Gate navigation with two centered buttons */}
      <nav
        aria-label="Choose your portal"
        className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md sm:max-w-lg mx-auto px-4"
      >
        {/* Button A: "Survivor Portal" - violet->teal gradient, classes: .btn-hero .animated-border; entrance scale-in; navigates to /survivor */}
        <Link
          to="/survivor"
          className="btn-hero animated-border animate-scale-in w-full sm:w-auto text-center min-w-[200px] flex items-center justify-center group text-lg tracking-wide font-semibold shadow-xl"
        >
          <span>Survivor Portal</span>
        </Link>

        {/* Button B: "Authority Portal" - teal glass, classes: .btn-glass; entrance scale-in (100ms stagger); navigates to /authority */}
        <Link
          to="/authority"
          className="btn-glass animate-scale-in opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards] w-full sm:w-auto text-center min-w-[200px] flex items-center justify-center group text-lg tracking-wide font-semibold shadow-xl"
        >
          <span>Authority Portal</span>
        </Link>
      </nav>

      {/* Below buttons: small underlined link "How Haven protects your privacy" -> opens InfoModal */}
      <div className="mt-5">
        <button
          ref={privacyTriggerRef}
          type="button"
          onClick={() => setIsPrivacyModalOpen(true)}
          className="text-xs text-muted-foreground hover:text-haven-teal underline underline-offset-4 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-haven-teal rounded-sm"
        >
          How Haven protects your privacy
        </button>
      </div>

      {/* Privacy Info Modal */}
      <InfoModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        triggerRef={privacyTriggerRef}
      />
    </section>
  );
};
