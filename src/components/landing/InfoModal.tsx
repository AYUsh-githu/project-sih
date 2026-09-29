import React, { useEffect, useRef } from "react";
import { ShieldCheck, X } from "lucide-react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | HTMLAnchorElement | null>;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, triggerRef }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap & Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    // Focus close button initially
    const timeout = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        triggerRef?.current?.focus();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeout);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      aria-describedby="privacy-modal-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
          triggerRef?.current?.focus();
        }
      }}
    >
      <div
        ref={modalRef}
        className="glass-card p-6 sm:p-8 max-w-lg w-full relative border border-teal-500/30 animate-modal-in shadow-2xl bg-slate-900/90 text-foreground"
      >
        {/* Close icon button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => {
            onClose();
            triggerRef?.current?.focus();
          }}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-haven-teal">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 id="privacy-modal-title" className="text-xl font-bold tracking-tight">
            How Haven Protects Your Privacy
          </h2>
        </div>

        {/* Modal Body - Exact Copy Required */}
        <p
          id="privacy-modal-desc"
          className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6"
        >
          Haven shows each helper only the information their role needs. Your journals and
          check-ins are reviewed by trained humans before any action. Every access is
          logged. You control your consent at every step.
        </p>

        {/* Modal Action */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              onClose();
              triggerRef?.current?.focus();
            }}
            className="px-5 py-2.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-sm font-semibold transition-all hover:scale-105"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
