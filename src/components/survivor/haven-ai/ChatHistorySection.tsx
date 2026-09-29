import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HistoryIcon,
  ScaleIcon,
  HeartIcon,
  TriangleAlertIcon,
  SparklesIcon,
  ArrowRightIcon,
  AnimatedIconHandle,
} from "@/components/icons";
import { Search, Trash2, Lock, ChevronDown, ChevronUp } from "lucide-react";

export interface PastChatSession {
  id: string;
  title: string;
  summary: string;
  timestamp: string;
  date: string;
  category: "legal" | "emotional" | "safety" | "all";
  messagesCount: number;
}

interface ChatHistorySectionProps {
  onSelectSession: (session: PastChatSession) => void;
}

const INITIAL_SESSIONS: PastChatSession[] = [
  {
    id: "sess-1",
    title: "Deposition Rights & In-Camera Proceedings",
    summary:
      "Explored Section 15A provisions for requesting in-camera witness examination and Special Public Prosecutor presence to minimize court anxiety.",
    timestamp: "10:30 AM",
    date: "Today",
    category: "legal",
    messagesCount: 6,
  },
  {
    id: "sess-2",
    title: "Grounding Reflection during High Stress",
    summary:
      "Completed 5-4-3-2-1 sensory awareness exercise when experiencing anxious feelings about the upcoming hearing date.",
    timestamp: "04:15 PM",
    date: "Yesterday",
    category: "emotional",
    messagesCount: 8,
  },
  {
    id: "sess-3",
    title: "Section 15A Witness Protection Verification",
    summary:
      "Confirmed Tier II escort arrangements with Special Protection Cell and saved contact details for SI R. Deshmukh.",
    timestamp: "11:20 AM",
    date: "Sep 22, 2026",
    category: "safety",
    messagesCount: 4,
  },
  {
    id: "sess-4",
    title: "Financial Relief Status & Paperwork Inquiry",
    summary:
      "Clarified stage-wise disbursement under SC/ST PoA Rules 1995: 50% on charge-sheet and remaining 50% on court conclusion.",
    timestamp: "02:40 PM",
    date: "Sep 18, 2026",
    category: "legal",
    messagesCount: 5,
  },
];

export const ChatHistorySection: React.FC<ChatHistorySectionProps> = ({
  onSelectSession,
}) => {
  const [sessions, setSessions] = useState<PastChatSession[]>(INITIAL_SESSIONS);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "legal" | "emotional" | "safety">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const historyRef = useRef<AnimatedIconHandle>(null);
  const sessionCategoryRefs = useRef<{ [key: string]: AnimatedIconHandle | null }>({});
  const cardArrowRefs = useRef<{ [key: string]: AnimatedIconHandle | null }>({});

  const filteredSessions = sessions.filter((s) => {
    const matchesCategory =
      selectedCategory === "all" || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your local conversation history on this device?")) {
      setSessions([]);
    }
  };

  const renderCategoryIcon = (category: string, id: string) => {
    switch (category) {
      case "legal":
        return (
          <ScaleIcon
            ref={(el) => (sessionCategoryRefs.current[id] = el)}
            size={13}
            className="text-teal-800 dark:text-haven-teal"
          />
        );
      case "emotional":
        return (
          <HeartIcon
            ref={(el) => (sessionCategoryRefs.current[id] = el)}
            size={13}
            className="text-rose-600 dark:text-rose-400"
          />
        );
      case "safety":
        return (
          <TriangleAlertIcon
            ref={(el) => (sessionCategoryRefs.current[id] = el)}
            size={13}
            className="text-amber-600 dark:text-amber-400"
          />
        );
      default:
        return (
          <SparklesIcon
            ref={(el) => (sessionCategoryRefs.current[id] = el)}
            size={13}
            className="text-teal-800 dark:text-haven-teal"
          />
        );
    }
  };

  return (
    <div
      className="glass-card rounded-2xl p-5 border border-teal-500/20 shadow-xl space-y-4 group cursor-default"
      onMouseEnter={() => historyRef.current?.startAnimation()}
      onMouseLeave={() => historyRef.current?.stopAnimation()}
    >
      {/* 1. Header with Collapse Toggle and Privacy Indicator */}
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-800 dark:text-haven-teal group-hover:scale-110 transition-transform">
            <HistoryIcon ref={historyRef} size={18} className="text-teal-800 dark:text-haven-teal" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground tracking-tight group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors">
              Chat History & Encrypted Journaling
            </h3>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>DPDP 2025 · End-to-end encrypted on device</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {sessions.length > 0 && !isCollapsed && (
            <button
              type="button"
              onClick={handleClearAll}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-rose-700 dark:text-rose-300 hover:bg-rose-500/15 border border-rose-500/25 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Trash2 className="w-3 h-3" />
              <span className="hidden sm:inline">Clear History</span>
            </button>
          )}

          {/* Collapse / Expand Toggle Button */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand history" : "Collapse history"}
            aria-label="Toggle history visibility"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            {isCollapsed ? (
              <ChevronDown className="w-4 h-4 text-teal-700 dark:text-haven-teal" />
            ) : (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 overflow-hidden"
          >
            {/* 2. Search & Category Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {(
                  [
                    { key: "all", label: "All" },
                    { key: "legal", label: "Legal Rights" },
                    { key: "emotional", label: "Emotional" },
                    { key: "safety", label: "Safety" },
                  ] as const
                ).map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => setSelectedCategory(filter.key)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === filter.key
                        ? "bg-teal-500/20 text-teal-800 dark:text-haven-teal border border-teal-600/30 dark:border-teal-400/40 shadow-sm"
                        : "bg-white/60 dark:bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/80 dark:hover:bg-white/10 border border-transparent"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search past chats..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-slate-100/90 dark:bg-slate-950/60 border border-slate-300/80 dark:border-border text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-teal-600 dark:focus-visible:ring-haven-teal outline-none"
                />
              </div>
            </div>

            {/* 3. Session Cards Grid with Dual-Trigger Container Hover */}
            {filteredSessions.length === 0 ? (
              <div className="py-6 text-center text-xs text-muted-foreground">
                No past sessions found matching your criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredSessions.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => onSelectSession(session)}
                    onMouseEnter={() => {
                      sessionCategoryRefs.current[session.id]?.startAnimation();
                      cardArrowRefs.current[session.id]?.startAnimation();
                    }}
                    onMouseLeave={() => {
                      sessionCategoryRefs.current[session.id]?.stopAnimation();
                      cardArrowRefs.current[session.id]?.stopAnimation();
                    }}
                    className="p-3.5 rounded-xl bg-teal-50/60 dark:bg-white/[0.02] border border-teal-600/20 dark:border-teal-500/20 hover:border-teal-600/50 dark:hover:border-haven-teal/60 hover:bg-teal-50/90 dark:hover:bg-teal-500/10 transition-all cursor-pointer group/session shadow-sm hover:shadow"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-teal-500/15 flex items-center justify-center flex-shrink-0 group-hover/session:scale-110 transition-transform">
                          {renderCategoryIcon(session.category, session.id)}
                        </div>
                        <h4 className="text-xs font-bold text-foreground group-hover/session:text-teal-800 dark:group-hover/session:text-haven-teal transition-colors truncate max-w-[160px] sm:max-w-[190px]">
                          {session.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-muted-foreground">
                          {session.date}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteSession(session.id, e)}
                          title="Remove from history"
                          className="p-1 text-muted-foreground/60 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed mb-2.5 pl-8">
                      {session.summary}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1.5 border-t border-border/40">
                      <span>{session.messagesCount} exchanges</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-teal-800 dark:text-haven-teal group-hover/session:translate-x-0.5 transition-transform">
                        <span>Resume</span>
                        <ArrowRightIcon
                          ref={(el) => (cardArrowRefs.current[session.id] = el)}
                          size={10}
                          className="text-teal-800 dark:text-haven-teal"
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
