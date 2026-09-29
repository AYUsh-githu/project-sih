import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SparklesIcon,
  MicIcon,
  SendIcon,
  MaximizeIcon,
  ShieldCheckIcon,
  ScaleIcon,
  HeartIcon,
  AnimatedIconHandle,
} from "@/components/icons";
import { Volume2, VolumeX, Minimize2, Copy, Check } from "lucide-react";
import { useAvatar } from "@/context/AvatarContext";

export interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  category?: "legal" | "emotional" | "safety" | "general";
  isTyping?: boolean;
}

interface HavenAiStageProps {
  onSendMessage?: (text: string) => void;
  externalPrompt?: string | null;
  onClearExternalPrompt?: () => void;
  onOpenThreatReport?: () => void;
  onOpenCounselor?: () => void;
}

const DEFAULT_MESSAGES: Message[] = [
  {
    id: "msg-1",
    sender: "ai",
    text: "Welcome, Priya. I am your confidential Haven AI companion. Whether you have questions about your Section 15A witness rights, need reassurance ahead of your court date, or simply want a quiet space to reflect, I am here with you. What would you like to explore today?",
    timestamp: "10:14 AM",
    category: "general",
  },
];

const PROMPT_SUGGESTIONS = [
  {
    id: "p1",
    label: "Prepare for Court (Oct 14)",
    query: "What should I expect during my witness deposition on October 14, and what are my rights in court?",
    icon: ScaleIcon,
    tag: "Legal Rights",
  },
  {
    id: "p2",
    label: "Section 15A Witness Protection",
    query: "How does Section 15A of the SC/ST Act protect me and my family against threats or intimidation?",
    icon: ShieldCheckIcon,
    tag: "Safety Protocol",
  },
  {
    id: "p3",
    label: "Grounding Reflection",
    query: "I am feeling overwhelmed with stress today. Can you guide me through a calming sensory grounding reflection?",
    icon: HeartIcon,
    tag: "Emotional Well-being",
  },
];

export const HavenAiStage: React.FC<HavenAiStageProps> = ({
  onSendMessage,
  externalPrompt,
  onClearExternalPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>(DEFAULT_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Avatar somatic interaction hooks
  const {
    onTyping,
    onVoiceStart,
    onVoiceStop,
    onMessageSend,
    onAiThinking,
    onAiComplete,
    triggerCategory,
  } = useAvatar();

  // Icon refs for dual-trigger animations
  const sparklesRef = useRef<AnimatedIconHandle>(null);
  const micRef = useRef<AnimatedIconHandle>(null);
  const sendRef = useRef<AnimatedIconHandle>(null);
  const maximizeRef = useRef<AnimatedIconHandle>(null);
  const promptIconRefs = useRef<{ [key: string]: AnimatedIconHandle | null }>({});
  const chatFeedRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  // Synchronously measure collapsed & expanded pixel dimensions for glitch-free animation
  const [dimensions, setDimensions] = useState<{
    collapsedWidth: number;
    expandedWidth: number;
  }>({ collapsedWidth: 0, expandedWidth: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (placeholderRef.current) {
        const collapsed = placeholderRef.current.offsetWidth;
        const gridEl = placeholderRef.current.closest(".grid") as HTMLElement | null;
        const expanded = gridEl ? gridEl.offsetWidth : placeholderRef.current.offsetWidth;
        if (collapsed > 0 && expanded > 0) {
          setDimensions({
            collapsedWidth: collapsed,
            expandedWidth: expanded,
          });
        }
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (placeholderRef.current) {
      resizeObserver.observe(placeholderRef.current);
      const gridEl = placeholderRef.current.closest(".grid");
      if (gridEl) resizeObserver.observe(gridEl);
    }

    window.addEventListener("resize", updateDimensions);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Scroll inner chat feed to bottom when new messages arrive (scoped strictly to feed container, never page)
  useEffect(() => {
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTo({
        top: chatFeedRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Handle external prompt injection from case snapshot or AI suggestions
  useEffect(() => {
    if (externalPrompt) {
      handleUserSend(externalPrompt);
      if (onClearExternalPrompt) onClearExternalPrompt();
    }
  }, [externalPrompt]);

  const handleExpand = () => {
    setIsExpanded(true);
    const mainEl = document.querySelector("main");
    if (mainEl && mainEl.scrollTop > 5) {
      mainEl.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleContract = () => {
    setIsExpanded(false);
  };

  // Pressing Escape smoothly dismisses expanded stage
  useEffect(() => {
    if (!isExpanded) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleContract();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  // Recording timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleUserSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    onMessageSend();

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Avatar triggers thinking & legal reasoning
    onAiThinking();

    // Simulate AI response based on topic
    setTimeout(() => {
      let reply = "";
      let category: "legal" | "emotional" | "safety" | "general" = "general";

      const lower = trimmed.toLowerCase();
      if (lower.includes("court") || lower.includes("deposition") || lower.includes("hearing") || lower.includes("screen") || lower.includes("partition")) {
        category = "legal";
        reply =
          "Under Section 15A of the SC/ST (PoA) Act, you have the statutory right to request a physical barrier or in-camera deposition to prevent direct visual contact with the accused. You are also entitled to advance travel fare (TA/DA) under Rule 11 of the 1995 Rules. Would you like me to prepare a structured checklist for your meeting with the Special Public Prosecutor?";
      } else if (lower.includes("threat") || lower.includes("intimidation") || lower.includes("protect") || lower.includes("bail")) {
        category = "safety";
        reply =
          "Your safety is legally protected under Section 15A(3). The State is obligated to notify you before any bail hearing of the accused. If you experience suspicious calls or vehicle monitoring near your home, we can immediately alert the Special Protection Cell & Sub-Inspector R. Deshmukh with one tap.";
      } else if (lower.includes("anxious") || lower.includes("stress") || lower.includes("grounding") || lower.includes("overwhelmed") || lower.includes("reflection")) {
        category = "emotional";
        reply =
          "It is completely normal to feel tension in your body before court proceedings. Let us center your mind right now: feel your feet resting firmly on the floor. Take in 3 specific colors in the room, touch the surface beneath your hands, and know that you are not alone in this journey. You have rights, and our care team is beside you.";
      } else if (lower.includes("ta/da") || lower.includes("allowance") || lower.includes("rule 11") || lower.includes("travel")) {
        category = "legal";
        reply =
          "Under Rule 11 of SC/ST (PoA) Rules 1995, summoned witnesses and their escorts are paid advance travelling allowances and daily maintenance (DA) directly by the District Magistrate or Special Court. Keep your train/bus receipts handy, and we can file Form IV with your advocate on hearing morning.";
      } else {
        reply =
          "Thank you for sharing that with me. I have logged this inquiry into your private encrypted session. Remember, Dr. Ananya Sharma and your dedicated protection officer are also coordinated through Haven whenever you need human assistance.";
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        category,
      };

      setMessages((prev) => [...prev, aiMsg]);
      onAiComplete();
      if (onSendMessage) onSendMessage(trimmed);
    }, 850);
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      micRef.current?.startAnimation();
      onVoiceStart();
    } else {
      setIsRecording(false);
      micRef.current?.stopAnimation();
      onVoiceStop();
      const simulatedTranscripts = [
        "Can I petition the Special Court for an in-camera hearing or a partition screen?",
        "How do I claim travel and daily allowance under Rule 11 of SC/ST Rules for my deposition?",
        "I feel anxious about seeing the accused's family outside the court gate next week.",
      ];
      const randomText = simulatedTranscripts[Math.floor(Math.random() * simulatedTranscripts.length)];
      setInputText(randomText);
      inputRef.current?.focus();
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Reusable Stage Interior Content
  const renderStageBody = (expanded: boolean) => (
    <>
      {/* 1. Stage Top Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-border bg-teal-50/50 dark:bg-white/[0.02]">
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-9 h-9 rounded-xl bg-teal-500/15 border border-teal-600/30 dark:border-teal-400/30 flex items-center justify-center text-teal-800 dark:text-haven-teal group-hover:scale-105 transition-transform">
            <SparklesIcon ref={sparklesRef} size={20} className="text-teal-800 dark:text-haven-teal" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-foreground tracking-tight group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors">
                Haven AI
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live & Protected
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Trauma-Informed Assistant · SC/ST (PoA) Act & DPDP 2025 Protected
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Read out loud toggle */}
          <button
            type="button"
            onClick={() => setIsSpeaking(!isSpeaking)}
            title={isSpeaking ? "Mute audio playback" : "Enable spoken assistance"}
            aria-label="Toggle voice readout"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            {isSpeaking ? (
              <Volume2 className="w-4 h-4 text-teal-700 dark:text-haven-teal" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Expand / Minimize Stage Toggle with smooth corner animation */}
          {expanded ? (
            <button
              type="button"
              onClick={handleContract}
              title="Contract back to dashboard position (Esc)"
              aria-label="Contract stage"
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <Minimize2 className="w-4 h-4 text-teal-700 dark:text-haven-teal group-hover:scale-110 transition-transform" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleExpand}
              onMouseEnter={() => maximizeRef.current?.startAnimation()}
              onMouseLeave={() => maximizeRef.current?.stopAnimation()}
              title="Expand smoothly across screen"
              aria-label="Expand stage"
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <MaximizeIcon ref={maximizeRef} size={18} className="text-teal-700 dark:text-haven-teal" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Chat Dialogue Feed */}
      <div ref={chatFeedRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            } animate-fade-in`}
          >
            <div className="flex items-center gap-2 mb-1 px-1">
              <span className="text-[11px] font-semibold text-muted-foreground">
                {msg.sender === "ai" ? "Haven AI" : "You (Priya)"}
              </span>
              <span className="text-[10px] text-muted-foreground/70">
                {msg.timestamp}
              </span>
              {msg.category && msg.category !== "general" && (
                <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-teal-500/10 text-teal-800 dark:text-teal-300 font-semibold border border-teal-500/20">
                  {msg.category}
                </span>
              )}
            </div>

            <div
              className={`relative group max-w-[88%] sm:max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed transition-all ${
                msg.sender === "user"
                  ? "bg-teal-600 text-white dark:bg-teal-500/25 dark:text-white dark:border dark:border-teal-400/40 rounded-br-sm shadow-md"
                  : "bg-white/95 dark:bg-slate-900/90 text-foreground border border-teal-600/15 dark:border-teal-500/20 rounded-bl-sm shadow-sm"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>

              {/* Action buttons on AI responses */}
              {msg.sender === "ai" && (
                <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-[10px] text-teal-800 dark:text-haven-teal">
                    <ShieldCheckIcon size={13} className="w-3.5 h-3.5" />
                    <span>Protected Guidance</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => copyToClipboard(msg.id, msg.text)}
                    aria-label="Copy guidance"
                    className="inline-flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Suggested Prompt Chips with Container Hover Trigger */}
      <div className="px-4 sm:px-6 py-2.5 border-t border-border/60 bg-teal-50/40 dark:bg-white/[0.01]">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Suggested Prompts
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PROMPT_SUGGESTIONS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  triggerCategory("inspect");
                  handleUserSend(item.query);
                }}
                onMouseEnter={() => promptIconRefs.current[item.id]?.startAnimation()}
                onMouseLeave={() => promptIconRefs.current[item.id]?.stopAnimation()}
                className="group p-2.5 rounded-xl text-left bg-white/80 dark:bg-white/[0.03] border border-teal-600/20 dark:border-teal-500/20 hover:border-teal-600/50 dark:hover:border-haven-teal/60 hover:bg-teal-50/80 dark:hover:bg-teal-500/10 transition-all cursor-pointer shadow-sm hover:shadow"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-md bg-teal-500/15 flex items-center justify-center text-teal-800 dark:text-haven-teal flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon
                      ref={(el) => (promptIconRefs.current[item.id] = el)}
                      size={12}
                      className="w-3 h-3 text-teal-800 dark:text-haven-teal"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-foreground group-hover:text-teal-800 dark:group-hover:text-haven-teal transition-colors truncate">
                    {item.label}
                  </span>
                </div>
                <span className="text-[9px] text-muted-foreground block truncate">
                  {item.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Input Bar with Prominent Circular Voice / Mic Button */}
      <div className="p-3 sm:p-4 border-t border-border bg-white/95 dark:bg-slate-900/95">
        {isRecording ? (
          <div className="flex items-center justify-between p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-800 dark:text-rose-300 animate-pulse">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <div className="text-xs font-semibold">
                Listening to your voice... ({recordingSeconds}s)
              </div>
            </div>

            <div className="flex items-center gap-1.5 h-4">
              <span className="w-1 bg-rose-500 rounded-full animate-wave-1 h-3" />
              <span className="w-1 bg-rose-500 rounded-full animate-wave-2 h-5" />
              <span className="w-1 bg-rose-500 rounded-full animate-wave-3 h-4" />
              <span className="w-1 bg-rose-500 rounded-full animate-wave-1 h-6" />
              <span className="w-1 bg-rose-500 rounded-full animate-wave-2 h-2" />
            </div>

            <button
              type="button"
              onClick={toggleRecording}
              className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow"
            >
              Done Speaking
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserSend(inputText);
            }}
            className="flex items-center gap-2"
          >
            {/* Text input */}
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  onTyping();
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") {
                    onTyping();
                  }
                }}
                placeholder="Type your message, ask about rights, or share how you feel..."
                className="w-full py-2.5 pl-4 pr-10 rounded-xl bg-slate-100/90 dark:bg-slate-950/60 border border-slate-300/80 dark:border-border text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-teal-600 dark:focus-visible:ring-haven-teal outline-none transition-all"
              />
            </div>

            {/* Prominent Circular Mic Button */}
            <button
              type="button"
              onClick={toggleRecording}
              onMouseEnter={() => micRef.current?.startAnimation()}
              onMouseLeave={() => micRef.current?.stopAnimation()}
              title="Speak to Haven AI (Voice Input)"
              aria-label="Activate microphone"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-teal-500/20 hover:bg-teal-500/30 border border-teal-600/30 dark:border-teal-400/40 text-teal-800 dark:text-haven-teal flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm cursor-pointer group flex-shrink-0"
            >
              <MicIcon ref={micRef} size={20} className="w-5 h-5 text-teal-800 dark:text-haven-teal" />
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim()}
              onMouseEnter={() => sendRef.current?.startAnimation()}
              onMouseLeave={() => sendRef.current?.stopAnimation()}
              title="Send message"
              aria-label="Send message"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl btn-primary flex items-center justify-center text-slate-950 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer flex-shrink-0"
            >
              <SendIcon ref={sendRef} size={18} className="w-4 h-4 text-slate-950" />
            </button>
          </form>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* 
        Dimmed Backdrop:
        Soft ambient darkening behind the stage while expanded.
      */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="stage-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={handleContract}
            className="fixed inset-0 z-30 bg-slate-950/65 dark:bg-black/75 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* 
        PERMANENT IN-FLOW PLACEHOLDER:
        Maintains the exact 560px slot in the left column at all times.
        ChatHistorySection is always docked immediately beneath this slot.
        Never mounts or unmounts, completely preventing DOM layout shifts.
      */}
      <div
        ref={placeholderRef}
        className="h-[560px] w-full rounded-2xl border border-transparent pointer-events-none select-none invisible"
        aria-hidden="true"
      />

      {/* 
        ANCHORED STAGE CONTAINER:
        - Physically anchored at absolute top-0 left-0 of the 12-col grid at ALL times.
        - Top-left corner stays strictly pinned at (0, 0) with zero upward translation.
        - When expanding: width smoothly glides rightward to expandedWidth, height glides downward to 740px.
        - When contracting: width smoothly glides leftward back to collapsedWidth, height glides back to 560px.
        - Direct dimension animation with Apple-style fluid curve ensures 100% stable, glitch-free motion.
      */}
      <motion.div
        animate={{
          width: isExpanded
            ? (dimensions.expandedWidth > 0 ? dimensions.expandedWidth : "100%")
            : (dimensions.collapsedWidth > 0 ? dimensions.collapsedWidth : "100%"),
          height: isExpanded ? 740 : 560,
        }}
        transition={
          isExpanded
            ? {
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1], // Preserved awesome expansion glide
              }
            : {
                type: "spring",
                stiffness: 220,
                damping: 24,
                mass: 0.8, // Restored smooth spring contraction
              }
        }
        className={`absolute top-0 left-0 glass-card rounded-2xl flex flex-col border shadow-xl overflow-hidden transition-colors ${
          dimensions.collapsedWidth === 0
            ? "w-full lg:w-[calc((700%-100px)/12)]"
            : ""
        } ${
          isExpanded
            ? "z-40 border-teal-500/40 shadow-2xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl"
            : "z-20 border-teal-500/20"
        }`}
        style={{
          maxWidth: "100%",
        }}
        onMouseEnter={() => sparklesRef.current?.startAnimation()}
        onMouseLeave={() => sparklesRef.current?.stopAnimation()}
      >
        {renderStageBody(isExpanded)}
      </motion.div>
    </>
  );
};
