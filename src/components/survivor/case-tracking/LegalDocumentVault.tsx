import React, { useState, useRef } from "react";
import {
  FileDescriptionIcon,
  ShieldCheckIcon,
  AnimatedIconHandle,
} from "@/components/icons";
import { Download, Eye, FileText, Lock, Check } from "lucide-react";

interface LegalDoc {
  id: string;
  title: string;
  category: string;
  fileSize: string;
  date: string;
  isEncrypted: boolean;
  docketTag: string;
}

const LEGAL_DOCS: LegalDoc[] = [
  {
    id: "doc-1",
    title: "Certified FIR Copy (Redacted)",
    category: "Police Record · Central District PS",
    fileSize: "1.2 MB",
    date: "14 Aug 2026",
    isEncrypted: true,
    docketTag: "FIR #218/2026",
  },
  {
    id: "doc-2",
    title: "Section 15A Witness Protection Order",
    category: "Special Court Protocol · Tier II",
    fileSize: "840 KB",
    date: "22 Aug 2026",
    isEncrypted: true,
    docketTag: "WPO-2026-09",
  },
  {
    id: "doc-3",
    title: "Rule 11 Advance TA/DA Travel Voucher",
    category: "Form IV Travelling & Daily Allowance",
    fileSize: "420 KB",
    date: "01 Oct 2026",
    isEncrypted: false,
    docketTag: "TA/DA-IV-41",
  },
  {
    id: "doc-4",
    title: "Confidential Trauma Care Assessment",
    category: "Tele-MANAS & DMHU Clinical Record",
    fileSize: "1.5 MB",
    date: "15 Sep 2026",
    isEncrypted: true,
    docketTag: "MED-MH-819",
  },
];

export const LegalDocumentVault: React.FC = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<LegalDoc | null>(null);
  const vaultIconRef = useRef<AnimatedIconHandle>(null);
  const headerShieldRef = useRef<AnimatedIconHandle>(null);
  const docIconRefs = useRef<{ [key: string]: AnimatedIconHandle | null }>({});

  const handleSimulateDownload = (doc: LegalDoc) => {
    setDownloadingId(doc.id);
    setTimeout(() => {
      setDownloadingId(null);
    }, 1500);
  };

  return (
    <>
      <div
        onMouseEnter={() => vaultIconRef.current?.startAnimation()}
        onMouseLeave={() => vaultIconRef.current?.stopAnimation()}
        className="glass-card rounded-2xl p-6 sm:p-7 border border-teal-500/20 shadow-xl mb-6 relative overflow-hidden"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-600/30 dark:border-teal-400/30 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0 group-hover:scale-105 transition-transform">
              <FileDescriptionIcon ref={vaultIconRef} size={20} className="text-teal-800 dark:text-haven-teal" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-foreground tracking-tight">
                  Encrypted Legal Document Vault
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-800 dark:text-haven-teal border border-teal-500/30">
                  <Lock className="w-3 h-3" />
                  DPDP 2025 Secured
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Statutory records, witness protection orders, and travel allowance vouchers
              </p>
            </div>
          </div>

          <div
            onMouseEnter={() => headerShieldRef.current?.startAnimation()}
            onMouseLeave={() => headerShieldRef.current?.stopAnimation()}
            className="flex items-center gap-2 text-xs text-muted-foreground self-start sm:self-auto cursor-pointer group"
          >
            <ShieldCheckIcon ref={headerShieldRef} size={14} className="text-teal-700 dark:text-haven-teal group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-foreground transition-colors">Zero Unencrypted Storage · Client-side Verified</span>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
          {LEGAL_DOCS.map((doc) => (
            <div
              key={doc.id}
              onMouseEnter={() => docIconRefs.current[doc.id]?.startAnimation()}
              onMouseLeave={() => docIconRefs.current[doc.id]?.stopAnimation()}
              className="group p-4 rounded-xl bg-white/80 dark:bg-white/[0.02] border border-teal-600/20 dark:border-teal-500/20 hover:border-teal-600/50 hover:bg-teal-50/70 dark:hover:bg-teal-500/5 transition-all shadow-sm flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0 group-hover:scale-110 transition-transform">
                      <FileDescriptionIcon
                        ref={(el: any) => (docIconRefs.current[doc.id] = el)}
                        size={16}
                        className="text-teal-800 dark:text-haven-teal"
                      />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-foreground group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors">
                        {doc.title}
                      </h3>
                      <span className="text-[10px] text-muted-foreground">
                        {doc.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-muted-foreground border border-border">
                    {doc.docketTag}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-3 pt-2.5 border-t border-border/40">
                  <span>File Size: {doc.fileSize}</span>
                  <span>•</span>
                  <span>Issued: {doc.date}</span>
                  <span>•</span>
                  <span className="text-teal-800 dark:text-haven-teal font-semibold">PDF Encrypted</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPreviewDoc(doc)}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-foreground text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-teal-700 dark:text-haven-teal" />
                  <span>Preview</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulateDownload(doc)}
                  disabled={downloadingId === doc.id}
                  className="flex-1 py-1.5 px-3 rounded-lg btn-primary text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {downloadingId === doc.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-950" />
                      <span>Decrypted</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-slate-950" />
                      <span>Download</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-teal-500/30 max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-800 dark:text-haven-teal">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    {previewDoc.title}
                  </h3>
                  <span className="text-[11px] text-muted-foreground">
                    {previewDoc.docketTag} · Verified Official Copy
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="text-xs px-2.5 py-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="py-6 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-800 dark:text-haven-teal">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">
                  DPDP 2025 Client-Side Decrypted View
                </h4>
                <p className="text-xs text-muted-foreground max-w-sm mt-1">
                  This statutory record is encrypted with your private session key. PII such as home address and phone numbers are automatically redacted for witness safety under Section 15A.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100/90 dark:bg-slate-950/60 border border-border w-full text-left text-xs font-mono space-y-1 text-muted-foreground">
                <div>Document: {previewDoc.title}</div>
                <div>Hash: SHA-256: 9f8e4b2...a810c9</div>
                <div>Protection Status: Section 15A Active Witness</div>
                <div>Designated Special Court: Fast-Track Court #3</div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 text-foreground text-xs font-semibold cursor-pointer"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSimulateDownload(previewDoc);
                  setPreviewDoc(null);
                }}
                className="btn-primary px-4 py-2 rounded-xl text-slate-950 text-xs font-bold cursor-pointer shadow-sm"
              >
                Download Encrypted PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
