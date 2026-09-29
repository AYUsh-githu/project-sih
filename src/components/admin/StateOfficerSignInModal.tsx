import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ShieldCheck, Building2, Sparkles, ArrowRight } from "lucide-react";
import { StateSecretariatIcon } from "@/components/icons";

interface StateOfficerSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (stateOfficerData: any) => void;
}

export const StateOfficerSignInModal: React.FC<StateOfficerSignInModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<"credentials" | "otp" | "success">("credentials");
  const [ssoId, setSsoId] = useState("");
  const [cadreId, setCadreId] = useState("");
  const [stateDept, setStateDept] = useState("Directorate of Scheduled Castes Development");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setStep("credentials");
      setErrorMsg("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleQuickFill = () => {
    setSsoId("janparichay.director.scwelfare@gov.in");
    setCadreId("IAS-SLVMC-2026");
    setStateDept("Directorate of Scheduled Castes Development");
    setErrorMsg("");
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ssoId.trim() || !cadreId.trim()) {
      setErrorMsg("Please provide your Jan Parichay National SSO ID and Cadre / Secretariat ID.");
      return;
    }
    setErrorMsg("");
    setStep("otp");
  };

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const nextOtp = [...otp];
    nextOtp[index] = val.slice(-1);
    setOtp(nextOtp);

    // Auto advance focus
    if (val && index < 5) {
      const nextInput = document.getElementById(`state-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
    setTimeout(() => {
      onSuccess({
        role: "state_officer",
        name: "Smt. K. Meenakshi, IAS",
        cadreId: cadreId || "IAS-SLVMC-2026",
        stateDept,
      });
      onClose();
    }, 1800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="glass-card max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-2xl relative bg-white/95 dark:bg-slate-900/95 text-foreground animate-scale-in overflow-hidden">
        {/* Top Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-600/30 dark:border-emerald-400/30 flex items-center justify-center text-emerald-800 dark:text-emerald-300 flex-shrink-0 shadow-xs">
            <StateSecretariatIcon size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-foreground">
                State Officer Sign-In
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/15 text-emerald-900 dark:text-emerald-300 border border-emerald-500/30">
                SLVMC Oversight
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              State Secretariat, Directorate of SC/ST Welfare & SLVMC High-Power Committee
            </p>
          </div>
        </div>

        {/* Step 1: Credentials Form */}
        {step === "credentials" && (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4 text-xs">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-800 dark:text-rose-300 text-xs">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-foreground font-semibold mb-1">
                Jan Parichay / National SSO Email ID
              </label>
              <input
                type="email"
                value={ssoId}
                onChange={(e) => setSsoId(e.target.value)}
                placeholder="director.scwelfare@gov.in"
                className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-50/70 dark:bg-black/40 border border-emerald-600/20 dark:border-emerald-500/20 text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-1">
                State Cadre ID / Secretariat Security Token
              </label>
              <input
                type="text"
                value={cadreId}
                onChange={(e) => setCadreId(e.target.value)}
                placeholder="e.g. IAS-SLVMC-2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-50/70 dark:bg-black/40 border border-emerald-600/20 dark:border-emerald-500/20 text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-1">
                State Department / Oversight Portfolio
              </label>
              <select
                value={stateDept}
                onChange={(e) => setStateDept(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-50/70 dark:bg-black/40 border border-emerald-600/20 dark:border-emerald-500/20 text-foreground outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Directorate of Scheduled Castes Development">Directorate of Scheduled Castes Development</option>
                <option value="Tribal Welfare Department">Tribal Welfare Department & Special Cells</option>
                <option value="State Legal Services Authority">State Legal Services Authority (SLSA Oversight)</option>
                <option value="Home Department (Police Modernization)">Home Department (PoA Act Monitoring Cell)</option>
              </select>
            </div>

            {/* Quick Demo Fill Button */}
            <div className="pt-1 flex items-center justify-between">
              <button
                type="button"
                onClick={handleQuickFill}
                className="inline-flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-semibold hover:underline cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fill Evaluator Demo Credentials</span>
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:text-slate-950 font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <span>Verify & Proceed to Multi-Factor Auth</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-black/40 border border-emerald-600/20 dark:border-emerald-500/20">
              <span className="text-muted-foreground block mb-0.5">National SSO 2FA Security Key:</span>
              <span className="text-foreground font-semibold">
                OTP sent to Jan Parichay linked terminal for <strong>IAS-SLVMC-2026</strong>
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 py-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`state-otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-10 h-12 text-center text-lg font-mono font-bold rounded-xl bg-emerald-50/80 dark:bg-black/40 border border-emerald-600/30 dark:border-emerald-500/30 text-foreground outline-none focus:ring-2 focus:ring-emerald-500"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <button
                type="button"
                onClick={() => setOtp(["9", "8", "7", "6", "5", "4"])}
                className="text-emerald-800 dark:text-emerald-300 font-semibold hover:underline cursor-pointer"
              >
                Auto-Fill Demo Code (987654)
              </button>
              <button
                type="button"
                onClick={() => setStep("credentials")}
                className="hover:underline cursor-pointer"
              >
                Change SSO ID
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:text-slate-950 font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <span>Authenticate State Executive Session</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 3: Success Banner */}
        {step === "success" && (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center animate-bounce-gentle">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-foreground">
              State Oversight Session Authorized
            </h4>
            <p className="text-xs text-muted-foreground max-w-xs">
              Welcome, Smt. K. Meenakshi, IAS. Initializing State-Level Vigilance & Monitoring Committee (SLVMC) Overview...
            </p>
          </div>
        )}

        {/* Statutory Reassurance */}
        <div className="mt-5 pt-3.5 border-t border-border/50 flex items-center justify-between text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Rule 16 & 17 SC/ST (PoA) Rules 1995 · SLVMC Framework</span>
          </span>
          <span>Jan Parichay SSO Secured</span>
        </div>
      </div>
    </div>
  );
};

export default StateOfficerSignInModal;
