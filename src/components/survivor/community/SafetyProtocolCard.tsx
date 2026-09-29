import React, { useRef, useState } from "react";
import {
  ShieldCheckIcon,
  ArrowRightIcon,
  AnimatedIconHandle,
} from "@/components/icons";
import { Check, X, Lock, EyeOff, ShieldAlert, Award } from "lucide-react";

export const SafetyProtocolCard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const shieldRef = useRef<AnimatedIconHandle>(null);
  const arrowRef = useRef<AnimatedIconHandle>(null);

  const SAFETY_RULES = [
    {
      title: "Moderated by trained facilitators",
      desc: "Licensed trauma counselors & district psychologists monitor all rooms 24/7.",
    },
    {
      title: "No unvetted private messaging",
      desc: "Section 15A protection blocks predatory contact, intimidation, or coercion.",
    },
    {
      title: "One-tap anonymous report or flag",
      desc: "Any distressing message is instantly escalated to clinical moderators.",
    },
    {
      title: "You're always in control",
      desc: "Zero PII displayed. Automatic pseudonymous aliases generated for all.",
    },
  ];

  return (
    <>
      <div
        onMouseEnter={() => {
          shieldRef.current?.startAnimation();
          arrowRef.current?.startAnimation();
        }}
        onMouseLeave={() => {
          shieldRef.current?.stopAnimation();
          arrowRef.current?.stopAnimation();
        }}
        className="glass-card rounded-2xl p-5 border border-teal-500/20 shadow-md relative overflow-hidden flex flex-col justify-between h-full group hover:border-teal-500/40 transition-all"
      >
        {/* Subtle Shield Ambient Background */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div>
          {/* Header */}
          <div className="flex items-center gap-2.5 pb-3 border-b border-border/50">
            <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0 group-hover:scale-105 transition-transform">
              <ShieldCheckIcon
                ref={shieldRef}
                size={18}
                className="text-teal-800 dark:text-haven-teal"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors">
                Safety First Protocol
              </h3>
              <p className="text-[10px] text-muted-foreground">
                Statutory Witness Safeguards · Section 15A Compliance
              </p>
            </div>
          </div>

          {/* Checklist */}
          <div className="pt-3.5 space-y-2.5">
            {SAFETY_RULES.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-800 dark:text-emerald-400 flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-foreground block leading-tight">
                    {rule.title}
                  </span>
                  <span className="text-[10px] text-muted-foreground leading-snug">
                    {rule.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Learn More */}
        <div className="pt-3 mt-3 border-t border-border/50 flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground font-medium">
            DPDP Act 2025 Cryptographic Hash
          </span>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="text-xs font-bold text-teal-800 dark:text-haven-teal hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Learn more</span>
            <ArrowRightIcon ref={arrowRef} size={13} className="text-teal-800 dark:text-haven-teal" />
          </button>
        </div>
      </div>

      {/* Safety Protocol Details Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-teal-500/30 max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-500/15 flex items-center justify-center text-teal-800 dark:text-haven-teal">
                  <ShieldCheckIcon size={20} className="text-teal-800 dark:text-haven-teal" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Haven Peer Safety Charter
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Section 15A SC/ST PoA Act & DPDP Act 2025 Protective Mandates
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto text-xs text-muted-foreground">
              <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-white/[0.03] border border-teal-500/20 space-y-1">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <EyeOff className="w-3.5 h-3.5 text-teal-800 dark:text-haven-teal" />
                  <span>Anonymity by Design</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Your legal identity, real name, contact number, and specific case docket numbers are never shown to peers. All survivors interact exclusively through system-assigned pseudonyms.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-white/[0.03] border border-teal-500/20 space-y-1">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-teal-800 dark:text-haven-teal" />
                  <span>Zero Unmoderated 1-on-1 Contact</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  To prevent covert witness tampering, intimidation, or secondary trauma, private 1-on-1 direct messaging is prohibited. All discussions occur in thematic rooms moderated by certified clinicians.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-white/[0.03] border border-teal-500/20 space-y-1">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                  <span>Immediate Distress Escalation</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Automated sentiment screening detects acute distress or crisis keywords in real-time and silently notifies on-duty Tele-MANAS (14416) psychological first-responders.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-white/[0.03] border border-teal-500/20 space-y-1">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-teal-800 dark:text-haven-teal" />
                  <span>Clinical Oversight</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Every circle is assigned a District Mental Health Unit (DMHU) clinical psychologist who guides discussions and ensures trauma-informed boundaries.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="btn-primary px-5 py-2 rounded-xl text-slate-950 text-xs font-bold cursor-pointer"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SafetyProtocolCard;
