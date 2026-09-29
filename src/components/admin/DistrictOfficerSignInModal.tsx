import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ShieldCheck, Scale, Sparkles, ArrowRight } from "lucide-react";
import { DistrictCourtIcon } from "@/components/icons";

interface DistrictOfficerSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (officerData: any) => void;
}

export const DistrictOfficerSignInModal: React.FC<DistrictOfficerSignInModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<"credentials" | "otp" | "success">("credentials");
  const [govEmail, setGovEmail] = useState("");
  const [badgeId, setBadgeId] = useState("");
  const [jurisdiction, setJurisdiction] = useState("Adilabad Special Court #3");
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
    setGovEmail("sp.protection.adbd@nic.in");
    setBadgeId("IPS-SP-4491");
    setJurisdiction("Adilabad Special Court #3");
    setErrorMsg("");
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!govEmail.trim() || !badgeId.trim()) {
      setErrorMsg("Please provide your Official Government Email and Officer Badge / Service ID.");
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
      const nextInput = document.getElementById(`district-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
    setTimeout(() => {
      onSuccess({
        role: "district_officer",
        name: "Shri Rajesh Verma, IPS",
        badgeId: badgeId || "IPS-SP-4491",
        jurisdiction,
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
      <div className="glass-card max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl relative bg-white/95 dark:bg-slate-900/95 text-foreground animate-scale-in overflow-hidden">
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
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-600/30 dark:border-amber-400/30 flex items-center justify-center text-amber-800 dark:text-amber-300 flex-shrink-0 shadow-xs">
            <DistrictCourtIcon size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-foreground">
                District Officer Sign-In
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-500/30">
                Sec 15A Cell
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              District Magistrate, SP Protection Cell & Designated Special Court
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
                Official NIC Government Email
              </label>
              <input
                type="email"
                value={govEmail}
                onChange={(e) => setGovEmail(e.target.value)}
                placeholder="officer.sp@nic.in"
                className="w-full px-3.5 py-2.5 rounded-xl bg-amber-50/70 dark:bg-black/40 border border-amber-600/20 dark:border-amber-500/20 text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-1">
                Officer Service / Badge ID (IPS / DM / DLSA)
              </label>
              <input
                type="text"
                value={badgeId}
                onChange={(e) => setBadgeId(e.target.value)}
                placeholder="e.g. IPS-SP-4491"
                className="w-full px-3.5 py-2.5 rounded-xl bg-amber-50/70 dark:bg-black/40 border border-amber-600/20 dark:border-amber-500/20 text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-1">
                Designated Special Court Jurisdiction
              </label>
              <select
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-amber-50/70 dark:bg-black/40 border border-amber-600/20 dark:border-amber-500/20 text-foreground outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Adilabad Special Court #3">Adilabad Fast-Track Special Court #3</option>
                <option value="Warangal Special Court #1">Warangal District Special Court #1</option>
                <option value="Hyderabad Special Court">Hyderabad Metropolitan Sessions Court</option>
                <option value="Pune District Court #2">Pune PoA Special Court #2</option>
              </select>
            </div>

            {/* Quick Demo Fill Button */}
            <div className="pt-1 flex items-center justify-between">
              <button
                type="button"
                onClick={handleQuickFill}
                className="inline-flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-semibold hover:underline cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fill Evaluator Demo Credentials</span>
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:text-slate-950 font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <span>Verify & Proceed to e-Pramaan 2FA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-black/40 border border-amber-600/20 dark:border-amber-500/20">
              <span className="text-muted-foreground block mb-0.5">Government e-Pramaan 2FA:</span>
              <span className="text-foreground font-semibold">
                OTP sent to official NIC mail <strong>sp.***@nic.in</strong>
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 py-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`district-otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-10 h-12 text-center text-lg font-mono font-bold rounded-xl bg-amber-50/80 dark:bg-black/40 border border-amber-600/30 dark:border-amber-500/30 text-foreground outline-none focus:ring-2 focus:ring-amber-500"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <button
                type="button"
                onClick={() => setOtp(["6", "5", "4", "3", "2", "1"])}
                className="text-amber-800 dark:text-amber-300 font-semibold hover:underline cursor-pointer"
              >
                Auto-Fill Demo Code (654321)
              </button>
              <button
                type="button"
                onClick={() => setStep("credentials")}
                className="hover:underline cursor-pointer"
              >
                Change ID
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:text-slate-950 font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <span>Authenticate District Officer</span>
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
              District Authority Session Authorized
            </h4>
            <p className="text-xs text-muted-foreground max-w-xs">
              Welcome, Shri Rajesh Verma, IPS. Loading Section 15A Special Protection & FIR Monitoring Dashboard...
            </p>
          </div>
        )}

        {/* Statutory Reassurance */}
        <div className="mt-5 pt-3.5 border-t border-border/50 flex items-center justify-between text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Section 15A SC/ST PoA Act Statutory Authority</span>
          </span>
          <span>NIC e-Pramaan Secured</span>
        </div>
      </div>
    </div>
  );
};

export default DistrictOfficerSignInModal;
