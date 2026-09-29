import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, AlertCircle, Shield } from "lucide-react";

interface DocketStepProps {
  onSuccess: (docketNumber: string, isFirstTime: boolean) => void;
  onImmediateSupport?: () => void;
}

/**
 * HUMAN REVIEW FLAGS / OUT OF SCOPE:
 * 1. REAL NHAA DOCKET FORMAT: The exact format/regex for National Helpline Against Atrocities (NHAA)
 *    docket numbers is not publicly documented. Needs confirmation against the backend schema/dataset.
 *    Currently accepts alphanumeric strings of length >= 6 (e.g. NHAA-2026-9842).
 * 2. FIRST-TIME VS RETURNING STATUS: Mock logic sets `isFirstTime` if docket ends with an odd number or contains 'NEW'.
 *    Real implementation should receive this from the lookup API response.
 */

export const DocketStep: React.FC<DocketStepProps> = ({ onSuccess, onImmediateSupport }) => {
  const [docketNumber, setDocketNumber] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Basic client-side validation: trimmed length >= 6
  // TODO: Confirm the real NHAA docket format/regex once backend is wired
  const trimmed = docketNumber.trim();
  const isValidLength = trimmed.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidLength || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);

    // Simulated lookup delay
    setTimeout(() => {
      setIsLoading(false);

      // Simulated error condition for testing invalid/not-found docket
      if (trimmed.toUpperCase() === "INVALID" || trimmed.toUpperCase() === "NOTFOUND") {
        setErrorMessage("We couldn't locate this docket number. Please check the SMS from NHAA or reach out for immediate support.");
        return;
      }

      // Determine mock first-time vs returning docket
      // E.g. Dockets containing 'NEW' or ending with an odd digit are treated as first-time
      const isFirstTime = trimmed.toUpperCase().includes("NEW") || /\d$/.test(trimmed) && parseInt(trimmed.slice(-1)) % 2 !== 0;

      onSuccess(trimmed, isFirstTime);
    }, 600);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocketNumber(e.target.value);
    if (!isTouched) setIsTouched(true);
    if (errorMessage) setErrorMessage(null);
  };

  return (
    <div className="w-full">
      {/* Icon badge */}
      <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-5 text-haven-teal shadow-inner">
        <Shield className="w-7 h-7 text-haven-teal" />
      </div>

      {/* Heading & Subtext */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
          Sign in to Haven
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Enter your NHAA docket number to continue.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label
            htmlFor="docket-input"
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 text-left"
          >
            NHAA Docket Number
          </label>
          <div className="relative">
            <input
              id="docket-input"
              type="text"
              value={docketNumber}
              onChange={handleInputChange}
              onBlur={() => setIsTouched(true)}
              autoComplete="off"
              spellCheck={false}
              placeholder="e.g. NHAA-2026-9842"
              aria-invalid={!!errorMessage}
              aria-describedby={errorMessage ? "docket-error" : "docket-helper"}
              className={`w-full px-4 py-3.5 rounded-xl bg-slate-900/60 dark:bg-slate-950/60 text-foreground placeholder:text-muted-foreground/50 border transition-all duration-200 outline-none text-base font-medium ${
                errorMessage
                  ? "border-destructive ring-1 ring-destructive focus:ring-2 focus:ring-destructive"
                  : "border-border hover:border-teal-400/40 focus:border-haven-teal focus:ring-2 focus:ring-haven-teal/20"
              }`}
            />
          </div>

          {/* Helper text / Error message container (fixed min-height to prevent layout shift) */}
          <div className="min-h-[2.5rem] mt-2 text-left">
            {errorMessage ? (
              <div
                id="docket-error"
                role="alert"
                aria-live="assertive"
                className="flex items-start gap-2 text-xs sm:text-sm text-destructive animate-fade-in font-medium"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            ) : (
              <p
                id="docket-helper"
                className="text-xs text-muted-foreground/80 leading-normal"
              >
                This is the number you received by SMS when your case was registered with the National Helpline Against Atrocities.
              </p>
            )}
          </div>
        </div>

        {/* Primary CTA */}
        <button
          type="submit"
          disabled={!isValidLength || isLoading}
          className="btn-hero w-full flex items-center justify-center gap-2 text-base font-semibold shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Looking up docket...</span>
            </>
          ) : (
            <span>Continue</span>
          )}
        </button>
      </form>

      {/* Secondary Ungated Support Link */}
      <div className="mt-6 pt-4 border-t border-border/40 text-center">
        {onImmediateSupport ? (
          <button
            type="button"
            onClick={onImmediateSupport}
            className="text-xs sm:text-sm text-muted-foreground hover:text-haven-teal underline underline-offset-4 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-haven-teal rounded-sm"
          >
            Don't have a docket number yet?
          </button>
        ) : (
          <Link
            to="/survivor/immediate"
            className="text-xs sm:text-sm text-muted-foreground hover:text-haven-teal underline underline-offset-4 transition-colors focus-visible:ring-2 focus-visible:ring-haven-teal rounded-sm"
          >
            Don't have a docket number yet?
          </Link>
        )}
      </div>
    </div>
  );
};
