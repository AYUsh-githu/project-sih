import React, { useState, useRef, useEffect } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { HandHeartIcon, PhoneIcon, MessageSquareIcon, ShieldCheckIcon, AnimatedIconHandle } from "@/components/icons";
import { useAvatar } from "@/context/AvatarContext";

interface CounselorContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CounselorContactModal: React.FC<CounselorContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [preferredMode, setPreferredMode] = useState<"audio" | "chat" | "first-aid">("audio");
  const [note, setNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { triggerCategory, onTyping } = useAvatar();

  // Animated icon refs
  const headerIconRef = useRef<AnimatedIconHandle>(null);
  const audioPhoneRef = useRef<AnimatedIconHandle>(null);
  const chatMsgRef = useRef<AnimatedIconHandle>(null);
  const helpHeartRef = useRef<AnimatedIconHandle>(null);

  // Trigger avatar active listening when counselor modal opens
  useEffect(() => {
    if (isOpen) {
      triggerCategory("listen");
    }
  }, [isOpen, triggerCategory]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    triggerCategory("send");

    setTimeout(() => {
      triggerCategory("success");
    }, 1100);

    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="counselor-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="glass-card p-6 sm:p-8 max-w-lg w-full relative border border-teal-500/30 animate-modal-in shadow-2xl bg-white/95 dark:bg-slate-900/95 text-foreground rounded-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div
          className="flex items-center gap-3 mb-4 cursor-pointer group"
          onMouseEnter={() => headerIconRef.current?.startAnimation()}
          onMouseLeave={() => headerIconRef.current?.stopAnimation()}
        >
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-800 dark:text-haven-teal transition-transform duration-300 group-hover:scale-110">
            <HandHeartIcon ref={headerIconRef} size={26} />
          </div>
          <div>
            <h3 id="counselor-modal-title" className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-teal-700 dark:group-hover:text-haven-teal">
              Reach Your Counselor
            </h3>
            <p className="text-xs text-muted-foreground">
              Direct connection with Dr. Ananya Sharma · District Support Unit
            </p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3 animate-scale-in">
            <div className="w-14 h-14 rounded-full bg-teal-500/20 text-teal-800 dark:text-haven-teal flex items-center justify-center mx-auto shadow-glow-teal">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-foreground">
              Request Received
            </h4>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
              Dr. Ananya Sharma will connect with you via your preferred mode within 15–30 minutes. You are safe.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground/90 block mb-2">
                How would you prefer to connect?
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPreferredMode("audio")}
                  onMouseEnter={() => audioPhoneRef.current?.startAnimation()}
                  onMouseLeave={() => audioPhoneRef.current?.stopAnimation()}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    preferredMode === "audio"
                      ? "bg-teal-500/20 border-teal-600 dark:border-teal-400 text-teal-800 dark:text-haven-teal font-semibold shadow-[0_0_12px_rgba(15,118,110,0.15)] dark:shadow-[0_0_12px_rgba(94,234,212,0.2)]"
                      : "bg-slate-50 dark:bg-white/5 border-border/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="flex justify-center mb-1.5">
                    <PhoneIcon ref={audioPhoneRef} size={18} className={preferredMode === "audio" ? "text-teal-800 dark:text-haven-teal" : "text-muted-foreground"} />
                  </div>
                  <span className="text-xs block">Audio Call</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreferredMode("chat")}
                  onMouseEnter={() => chatMsgRef.current?.startAnimation()}
                  onMouseLeave={() => chatMsgRef.current?.stopAnimation()}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    preferredMode === "chat"
                      ? "bg-teal-500/20 border-teal-600 dark:border-teal-400 text-teal-800 dark:text-haven-teal font-semibold shadow-[0_0_12px_rgba(15,118,110,0.15)] dark:shadow-[0_0_12px_rgba(94,234,212,0.2)]"
                      : "bg-slate-50 dark:bg-white/5 border-border/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="flex justify-center mb-1.5">
                    <MessageSquareIcon ref={chatMsgRef} size={18} className={preferredMode === "chat" ? "text-teal-800 dark:text-haven-teal" : "text-muted-foreground"} />
                  </div>
                  <span className="text-xs block">Private Chat</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreferredMode("first-aid")}
                  onMouseEnter={() => helpHeartRef.current?.startAnimation()}
                  onMouseLeave={() => helpHeartRef.current?.stopAnimation()}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    preferredMode === "first-aid"
                      ? "bg-teal-500/20 border-teal-600 dark:border-teal-400 text-teal-800 dark:text-haven-teal font-semibold shadow-[0_0_12px_rgba(15,118,110,0.15)] dark:shadow-[0_0_12px_rgba(94,234,212,0.2)]"
                      : "bg-slate-50 dark:bg-white/5 border-border/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="flex justify-center mb-1.5">
                    <HandHeartIcon ref={helpHeartRef} size={18} className={preferredMode === "first-aid" ? "text-teal-800 dark:text-haven-teal" : "text-muted-foreground"} />
                  </div>
                  <span className="text-xs block">Urgent Help</span>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="session-note" className="text-xs font-semibold text-foreground/90 block mb-1.5">
                Is there something specific on your mind? (Optional)
              </label>
              <textarea
                id="session-note"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Anxiety about next court hearing, need help with relief paperwork..."
                className="w-full rounded-xl bg-slate-100/90 dark:bg-slate-950/50 border border-slate-300/80 dark:border-border p-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-teal-600 dark:focus-visible:ring-haven-teal outline-none resize-none"
              />
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-900 dark:text-haven-teal">
              <ShieldCheckIcon size={16} className="flex-shrink-0 text-teal-700 dark:text-teal-400" />
              <span>
                Confidential session · No audio is recorded without your explicit consent.
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl glass-card text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary px-5 py-2 text-xs font-bold text-slate-950 cursor-pointer"
              >
                Request Connection
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
