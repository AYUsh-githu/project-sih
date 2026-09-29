import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { TriangleAlertIcon, AnimatedIconHandle } from "@/components/icons";
import { EmergencyPanel } from "./EmergencyPanel";
import { useAvatar } from "@/context/AvatarContext";

export const EmergencyButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { onEmergencySos } = useAvatar();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const alertIconRef = useRef<AnimatedIconHandle>(null);

  // Focus management and Escape key handling
  useEffect(() => {
    if (!isOpen) return;

    onEmergencySos();

    const timeout = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
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
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => alertIconRef.current?.startAnimation()}
        onMouseLeave={() => alertIconRef.current?.stopAnimation()}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Immediate Emergency Crisis Support"
        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold 
                   bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-300 hover:bg-rose-500/25 
                   transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer 
                   focus-visible:ring-2 focus-visible:ring-rose-400 group"
      >
        <TriangleAlertIcon ref={alertIconRef} size={16} className="w-4 h-4 flex-shrink-0 text-rose-600 dark:text-rose-400" />
        <span className="hidden sm:inline">Emergency</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Emergency Crisis Support"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <div
            ref={modalRef}
            className="glass-card p-6 sm:p-8 max-w-lg w-full relative border border-rose-500/30 animate-modal-in shadow-2xl bg-white/95 dark:bg-slate-900/95 text-foreground rounded-2xl"
          >
            {/* Top Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              aria-label="Close emergency panel"
              className="absolute top-4 right-4 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-haven-teal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Extracted Panel */}
            <EmergencyPanel onDismiss={handleClose} dismissLabel="Close" />
          </div>
        </div>
      )}
    </>
  );
};
