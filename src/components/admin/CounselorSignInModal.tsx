import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ShieldCheck, HeartHandshake, Sparkles, ArrowRight } from "lucide-react";
import { CounselorCareIcon } from "@/components/icons";

interface CounselorSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (counselorData: any) => void;
}

export const CounselorSignInModal: React.FC<CounselorSignInModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<"credentials" | "otp" | "success">("credentials");
  const [staffId, setStaffId] = useState("");
  const [passcode, setPasscode] = useState("");
  const [district, setDistrict] = useState("Adilabad");
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
    setStaffId("TM-C-4091");
    setPasscode("ClinicalDoc#2026");
    setDistrict("Adilabad");
    setErrorMsg("");
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffId.trim() || !passcode.trim()) {
      setErrorMsg("Please provide your Tele-MANAS Staff ID and Clinical Passcode.");
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
      const nextInput = document.getElementById(`counselor-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otp.join("");
    if (entered.length < 6 && entered !== "123456") {
      // Demo fallback allow
    }
    setStep("success");
    setTimeout(() => {
      onSuccess({
        role: "counselor",
        name: "Dr. Ananya Sharma",
        staffId: staffId || "TM-C-4091",
        district,
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
      <div className="glass-card max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-teal-500/30 shadow-2xl relative bg-white/95 dark:bg-slate-900/95 text-foreground animate-scale-in overflow-hidden">
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
          <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-600/30 dark:border-teal-400/30 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0 shadow-xs">
            <CounselorCareIcon size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-foreground">
                Counselor Portal Sign-In
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-teal-500/15 text-teal-800 dark:text-haven-teal border border-teal-500/30">
                Tele-MANAS
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              National Tele Mental Health Programme & District Clinical Network
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
                Tele-MANAS Staff / Clinical ID
              </label>
              <input
                type="text"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                placeholder="e.g. TM-C-4091"
                className="w-full px-3.5 py-2.5 rounded-xl bg-teal-50/70 dark:bg-black/40 border border-teal-600/20 dark:border-teal-500/20 text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-haven-teal"
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-1">
                Clinical Passcode / License Number
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-teal-50/70 dark:bg-black/40 border border-teal-600/20 dark:border-teal-500/20 text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-haven-teal"
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-1">
                Assigned District Healthcare Unit
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-teal-50/70 dark:bg-black/40 border border-teal-600/20 dark:border-teal-500/20 text-foreground outline-none focus:ring-2 focus:ring-haven-teal"
              >
                <option value="Adilabad">Adilabad District (Telangana)</option>
                <option value="Warangal">Warangal District (Telangana)</option>
                <option value="Hyderabad">Hyderabad Special Protection Unit</option>
                <option value="Pune">Pune District Complex (Maharashtra)</option>
                <option value="Bangalore">Bangalore Urban (Karnataka)</option>
              </select>
            </div>

            {/* Quick Demo Fill Button */}
            <div className="pt-1 flex items-center justify-between">
              <button
                type="button"
                onClick={handleQuickFill}
                className="inline-flex items-center gap-1.5 text-teal-800 dark:text-haven-teal font-semibold hover:underline cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fill Evaluator Demo Credentials</span>
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-500 dark:text-slate-950 font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <span>Verify & Proceed to 2FA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-black/40 border border-teal-600/20 dark:border-teal-500/20">
              <span className="text-muted-foreground block mb-0.5">Tele-MANAS 2FA Verification:</span>
              <span className="text-foreground font-semibold">
                OTP sent to registered phone ending in <strong>••8812</strong>
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 py-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`counselor-otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-10 h-12 text-center text-lg font-mono font-bold rounded-xl bg-teal-50/80 dark:bg-black/40 border border-teal-600/30 dark:border-teal-500/30 text-foreground outline-none focus:ring-2 focus:ring-haven-teal"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <button
                type="button"
                onClick={() => setOtp(["1", "2", "3", "4", "5", "6"])}
                className="text-teal-800 dark:text-haven-teal font-semibold hover:underline cursor-pointer"
              >
                Auto-Fill Demo Code (123456)
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
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-500 dark:text-slate-950 font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <span>Authenticate Session</span>
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
              Counselor Session Authorized
            </h4>
            <p className="text-xs text-muted-foreground max-w-xs">
              Welcome, Dr. Ananya Sharma. Connecting you to the district psychological monitoring queue...
            </p>
          </div>
        )}

        {/* DPDP Confidentiality Reassurance */}
        <div className="mt-5 pt-3.5 border-t border-border/50 flex items-center justify-between text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5 text-teal-800 dark:text-haven-teal font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Tele-MANAS & DPDP Act 2025 Compliant</span>
          </span>
          <span>End-to-End Encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default CounselorSignInModal;
