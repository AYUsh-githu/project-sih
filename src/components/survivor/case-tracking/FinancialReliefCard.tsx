import React, { useRef, useState } from "react";
import {
  RupeeIcon,
  ShieldCheckIcon,
  AnimatedIconHandle,
} from "@/components/icons";
import { Check, ChevronRight, Landmark, ExternalLink, X } from "lucide-react";

interface ReliefDisbursement {
  stage: string;
  label: string;
  amount: string;
  status: "credited" | "scheduled";
  date: string;
  pfmsRef?: string;
}

const DISBURSEMENTS: ReliefDisbursement[] = [
  {
    stage: "Stage 1",
    label: "FIR Registration & Medical Relief",
    amount: "₹1,25,000",
    status: "credited",
    date: "18 Aug 2026",
    pfmsRef: "PFMS/2026/08/9912",
  },
  {
    stage: "Stage 2",
    label: "Investigation & Charge Sheet Filing",
    amount: "₹2,50,000",
    status: "credited",
    date: "30 Sep 2026",
    pfmsRef: "PFMS/2026/09/4418",
  },
  {
    stage: "Stage 3",
    label: "Special Court Deposition / Hearing",
    amount: "₹1,25,000",
    status: "credited",
    date: "02 Oct 2026",
    pfmsRef: "PFMS/2026/10/1105",
  },
  {
    stage: "Stage 4",
    label: "Final Trial Verdict & Rehabilitation",
    amount: "₹3,25,000",
    status: "scheduled",
    date: "Upon Trial Conclusion",
  },
];

export const FinancialReliefCard: React.FC = () => {
  const [showBreakdownModal, setShowBreakdownModal] = useState(false);
  const rupeeIconRef = useRef<AnimatedIconHandle>(null);
  const shieldIconRef = useRef<AnimatedIconHandle>(null);

  const totalEntitled = 825000;
  const totalReceived = 500000;
  const percentageReceived = Math.round((totalReceived / totalEntitled) * 100);

  return (
    <>
      <div
        onMouseEnter={() => rupeeIconRef.current?.startAnimation()}
        onMouseLeave={() => rupeeIconRef.current?.stopAnimation()}
        className="glass-card rounded-2xl p-6 border border-teal-500/20 shadow-xl relative overflow-hidden flex flex-col justify-between h-full"
      >
        {/* Subtle Background Glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div>
          {/* Card Header */}
          <div
            onMouseEnter={() => rupeeIconRef.current?.startAnimation()}
            onMouseLeave={() => rupeeIconRef.current?.stopAnimation()}
            className="flex items-center justify-between pb-4 border-b border-border/50 cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-600/30 dark:border-emerald-400/30 flex items-center justify-center text-emerald-800 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                <RupeeIcon ref={rupeeIconRef} size={18} className="text-emerald-800 dark:text-emerald-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  Financial Relief & Compensation
                </h2>
                <p className="text-[11px] text-muted-foreground">
                  SC/ST (PoA) Amendment Rules 2016-18 Statutory Relief
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border border-emerald-500/30">
              <Landmark className="w-3 h-3" />
              DBT Active
            </span>
          </div>

          {/* Prominent Money Received Highlight */}
          <div className="pt-5 pb-2">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Money Received
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-0.5 flex items-center gap-1">
                  <span className="text-emerald-700 dark:text-emerald-400">₹ 5,00,000</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    / ₹ 8,25,000
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border border-emerald-500/30">
                {percentageReceived}% Disbursed
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="mt-3 w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${percentageReceived}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-1.5">
              <span>₹5,00,000 Credited via DBT</span>
              <span>₹3,25,000 Balance at Verdict</span>
            </div>
          </div>

          {/* Bank Account Verification Info */}
          <div
            onMouseEnter={() => shieldIconRef.current?.startAnimation()}
            onMouseLeave={() => shieldIconRef.current?.stopAnimation()}
            className="mt-3 p-3.5 rounded-xl bg-teal-50/80 dark:bg-white/[0.02] border border-teal-600/20 dark:border-teal-500/20 flex items-center justify-between gap-3 text-xs cursor-pointer group hover:border-teal-500/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0 group-hover:scale-110 transition-transform">
                <ShieldCheckIcon ref={shieldIconRef} size={14} className="text-teal-800 dark:text-haven-teal" />
              </div>
              <div>
                <div className="font-bold text-foreground group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors">
                  State Bank of India · A/C ••••4108
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Verified Aadhaar-Seeded DBT Account · IFSC: SBIN0001428
                </div>
              </div>
            </div>

            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
              <Check className="w-3.5 h-3.5" />
              Verified
            </span>
          </div>
        </div>

        {/* Action Button: View Full DBT Breakdown */}
        <div className="pt-4 border-t border-border/50">
          <button
            type="button"
            onClick={() => setShowBreakdownModal(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-white/80 dark:bg-white/[0.04] border border-teal-600/20 dark:border-teal-500/20 hover:border-teal-600/50 hover:bg-teal-50/80 dark:hover:bg-white/[0.08] text-foreground hover:text-teal-800 dark:hover:text-haven-teal text-xs font-bold flex items-center justify-between transition-all cursor-pointer group shadow-sm"
          >
            <span className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-emerald-700 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>View Full Disbursement & PFMS Tracking</span>
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Full Disbursement Breakdown Modal */}
      {showBreakdownModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-teal-500/30 max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                  <RupeeIcon size={16} className="text-emerald-700 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    PFMS Statutory Relief Ledger
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Direct Benefit Transfer Under SC/ST PoA Rules 1995 & Amendments
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowBreakdownModal(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto">
              {DISBURSEMENTS.map((item, index) => (
                <div
                  key={index}
                  className={`p-3.5 rounded-xl border ${
                    item.status === "credited"
                      ? "bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-500/20"
                      : "bg-slate-50/50 dark:bg-white/[0.02] border-border"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {item.stage}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        item.status === "credited"
                          ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border-emerald-500/30"
                          : "bg-slate-200 dark:bg-slate-800 text-muted-foreground border-transparent"
                      }`}
                    >
                      {item.status === "credited" ? "Disbursed" : "Scheduled at Verdict"}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mt-1">
                    <h4 className="text-xs font-bold text-foreground">{item.label}</h4>
                    <span className="text-sm font-extrabold text-foreground">{item.amount}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-2 pt-2 border-t border-border/50">
                    <span>{item.date}</span>
                    {item.pfmsRef && (
                      <span className="font-mono text-teal-800 dark:text-haven-teal font-semibold">
                        {item.pfmsRef}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5 text-teal-800 dark:text-haven-teal" />
                Linked to Public Financial Management System (PFMS)
              </span>
              <button
                type="button"
                onClick={() => setShowBreakdownModal(false)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
