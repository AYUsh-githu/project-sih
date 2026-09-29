import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, Loader2, KeyRound } from "lucide-react";

interface OtpStepProps {
  docketNumber: string;
  onSuccess: () => void;
  onBack: () => void;
}

/**
 * HUMAN REVIEW FLAGS / OUT OF SCOPE:
 * - OTP DELIVERY MECHANISM: Needs confirmation on whether OTP delivery uses a phone number already on
 *   file with NHAA (e.g., masked ••••••••42 in current UI), or if Haven collects a separate contact at first sign-in.
 */

export const OtpStep: React.FC<OtpStepProps> = ({ onSuccess, onBack }) => {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus the first input on initial mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // 30s countdown timer for Resend Code
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleDigitChange = (index: number, value: string) => {
    // Only accept numeric inputs
    const cleanVal = value.replace(/\D/g, "");
    if (!cleanVal) {
      const updated = [...digits];
      updated[index] = "";
      setDigits(updated);
      return;
    }

    // Single character entry
    const char = cleanVal.slice(-1);
    const updated = [...digits];
    updated[index] = char;
    setDigits(updated);

    // Auto-advance to next input
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Move back to previous box on backspace when current box is empty
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pastedData) return;

    const updated = [...digits];
    for (let i = 0; i < 6; i++) {
      updated[i] = pastedData[i] || "";
    }
    setDigits(updated);

    // Focus last filled or next empty box
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setCountdown(30);
    // In real app, dispatch resend OTP API call
  };

  const isComplete = digits.every((d) => d.trim().length === 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete || isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 600);
  };

  return (
    <div className="w-full relative">
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        aria-label="Back to docket entry"
        className="absolute -top-1 -left-1 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-teal-950/40 transition-colors focus-visible:ring-2 focus-visible:ring-haven-teal flex items-center gap-1 text-xs sm:text-sm font-medium"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Icon badge */}
      <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-5 text-haven-teal shadow-inner">
        <KeyRound className="w-7 h-7 text-haven-teal" />
      </div>

      {/* Heading & Subtext */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
          Verify it's you
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-sm mx-auto">
          We've sent a 6-digit code to the mobile number linked to this case (••••••••42).
        </p>
      </div>

      {/* OTP Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* 6 Digit Input Boxes */}
        <div className="flex justify-center items-center gap-2 sm:gap-3" onPaste={handlePaste}>
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              aria-label={`Digit ${idx + 1} of 6`}
              className="w-11 h-13 sm:w-13 sm:h-15 text-center text-xl sm:text-2xl font-bold rounded-xl glass-card border border-border bg-slate-900/60 dark:bg-slate-950/60 text-foreground transition-all duration-200 outline-none hover:border-teal-400/40 focus:border-teal-400/80 focus:ring-2 focus:ring-haven-teal/30 select-all"
            />
          ))}
        </div>

        {/* Resend Code countdown */}
        <div className="text-center">
          {countdown > 0 ? (
            <span className="text-xs sm:text-sm text-muted-foreground">
              Resend code in <strong className="text-foreground">{countdown}s</strong>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-xs sm:text-sm text-haven-teal hover:underline font-semibold focus-visible:ring-2 focus-visible:ring-haven-teal rounded-sm cursor-pointer"
            >
              Resend code
            </button>
          )}
        </div>

        {/* Primary CTA */}
        <button
          type="submit"
          disabled={!isComplete || isLoading}
          className="btn-hero w-full flex items-center justify-center gap-2 text-base font-semibold shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verifying code...</span>
            </>
          ) : (
            <span>Verify & Continue</span>
          )}
        </button>
      </form>
    </div>
  );
};
