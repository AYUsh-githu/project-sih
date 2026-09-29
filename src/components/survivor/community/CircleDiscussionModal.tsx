import React, { useState, useRef, useEffect } from "react";
import {
  ShieldCheckIcon,
  SendIcon,
  SparklesIcon,
  AnimatedIconHandle,
} from "@/components/icons";
import { X, Lock, CheckCircle2 } from "lucide-react";
import { SupportCircleItem } from "./SupportCirclesGrid";
import { useAvatar } from "@/context/AvatarContext";

interface CircleMessage {
  id: string;
  senderAlias: string;
  role?: string;
  stageTag: string;
  timestamp: string;
  content: string;
  reactions: {
    heart: number;
    space: number;
    strength: number;
  };
}

const INITIAL_MESSAGES: Record<string, CircleMessage[]> = {
  "legal-process": [
    {
      id: "m1",
      senderAlias: "Adv. Shri M. K. Rao",
      role: "DLSA Certified Facilitator",
      stageTag: "Legal Guide",
      timestamp: "Today, 10:15 AM",
      content:
        "Welcome everyone. Remember that under Section 15A(6), you are entitled to advance notice of court dates and separate waiting rooms at the Special Court so you never have to encounter the accused. Take a deep breath — we are with you every step.",
      reactions: { heart: 14, space: 9, strength: 22 },
    },
    {
      id: "m2",
      senderAlias: "Aura-84",
      stageTag: "Stage 3 Witness",
      timestamp: "Today, 11:20 AM",
      content:
        "Had my pre-trial conference yesterday with the protection officer. Having the designated police escort outside really relieved my family's anxiety. If anyone has questions about how the travel allowance voucher works, happy to share.",
      reactions: { heart: 8, space: 12, strength: 15 },
    },
    {
      id: "m3",
      senderAlias: "CalmRiver-19",
      stageTag: "Stage 2 Survivor",
      timestamp: "Today, 12:05 PM",
      content:
        "Reading this helps so much. My DySP submitted the charge sheet last week. Still nervous for court, but knowing we have free DLSA aid makes me feel less isolated.",
      reactions: { heart: 11, space: 7, strength: 18 },
    },
  ],
  default: [
    {
      id: "dm1",
      senderAlias: "Dr. Ananya Sharma",
      role: "Lead Clinical Psychologist",
      stageTag: "Facilitator",
      timestamp: "Today, 9:00 AM",
      content:
        "Welcome to this restorative space. In this circle, there is no pressure to share more than feels comfortable. Even sitting quietly and reading what others share is a powerful act of healing.",
      reactions: { heart: 19, space: 14, strength: 26 },
    },
    {
      id: "dm2",
      senderAlias: "SilverOak-32",
      stageTag: "Recovery Journey",
      timestamp: "Today, 10:45 AM",
      content:
        "Taking things 15 minutes at a time. Planted a little basil pot on my window sill this morning — small routines make the day feel mine again.",
      reactions: { heart: 15, space: 10, strength: 12 },
    },
  ],
};

interface CircleDiscussionModalProps {
  circle: SupportCircleItem | null;
  onClose: () => void;
}

export const CircleDiscussionModal: React.FC<CircleDiscussionModalProps> = ({
  circle,
  onClose,
}) => {
  const [messages, setMessages] = useState<CircleMessage[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [userReactions, setUserReactions] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sendIconRef = useRef<AnimatedIconHandle>(null);
  const shieldRef = useRef<AnimatedIconHandle>(null);

  const { onTyping, onMessageSend, triggerCategory } = useAvatar();

  useEffect(() => {
    if (circle) {
      const feed = INITIAL_MESSAGES[circle.id] || INITIAL_MESSAGES.default;
      setMessages(feed);
    }
  }, [circle]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!circle) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    onMessageSend();

    const newMsg: CircleMessage = {
      id: `usr-${Date.now()}`,
      senderAlias: "LotusCourage_92",
      stageTag: "Stage 3 Survivor (You)",
      timestamp: "Just now",
      content: inputVal.trim(),
      reactions: { heart: 1, space: 1, strength: 1 },
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal("");
    sendIconRef.current?.startAnimation();

    setTimeout(() => {
      triggerCategory("success");
    }, 600);
  };

  const handleReaction = (msgId: string, reactionType: "heart" | "space" | "strength") => {
    triggerCategory("success");
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId) {
          return {
            ...msg,
            reactions: {
              ...msg.reactions,
              [reactionType]: msg.reactions[reactionType] + 1,
            },
          };
        }
        return msg;
      })
    );
    setUserReactions((prev) => ({ ...prev, [msgId]: reactionType }));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-teal-500/30 max-w-2xl w-full flex flex-col shadow-2xl relative overflow-hidden h-[90vh] max-h-[720px] animate-scale-in">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-border/60 flex items-center justify-between gap-3 bg-teal-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl ${circle.iconBg} border flex items-center justify-center ${circle.iconColor} shadow-sm`}
            >
              <SparklesIcon size={20} className={circle.iconColor} />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-foreground">
                  {circle.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {circle.activeNow} Active Peers
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Facilitator: <strong className="text-foreground">{circle.facilitator}</strong> · {circle.languages.join(" & ")}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close circle discussion"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 15A Anonymity Reassurance Strip */}
        <div className="px-4 sm:px-5 py-2.5 bg-teal-500/10 border-b border-teal-500/20 flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon
              ref={shieldRef}
              size={15}
              className="text-teal-800 dark:text-haven-teal flex-shrink-0"
            />
            <span>
              Your Alias: <strong className="text-teal-800 dark:text-haven-teal font-mono">LotusCourage_92</strong> (Cryptographically Masked)
            </span>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
            <Lock className="w-3 h-3" />
            End-to-End Moderated
          </span>
        </div>

        {/* Pinned Discussion Topic Card */}
        <div className="px-4 sm:px-5 py-2.5 bg-slate-50 dark:bg-black/20 border-b border-border/40 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-haven-teal block">
            Pinned Facilitator Topic
          </span>
          <p className="text-foreground font-medium mt-0.5">
            &ldquo;{circle.pinnedTopic}&rdquo;
          </p>
        </div>

        {/* Message Feed Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-xl border transition-all ${
                msg.senderAlias.includes("You")
                  ? "bg-teal-500/10 border-teal-500/30 ml-6 sm:ml-12"
                  : msg.role
                  ? "bg-indigo-50/80 dark:bg-indigo-950/20 border-indigo-400/30 shadow-xs"
                  : "bg-white/70 dark:bg-white/[0.03] border-border/60 hover:border-teal-500/30"
              }`}
            >
              {/* Message Header */}
              <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">
                    {msg.senderAlias}
                  </span>
                  {msg.role && (
                    <span className="px-2 py-0.2 rounded-md text-[10px] font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      {msg.role}
                    </span>
                  )}
                  <span className="text-[10px] text-muted-foreground font-medium">
                    · {msg.stageTag}
                  </span>
                </div>

                <span className="text-[10px] text-muted-foreground/80">
                  {msg.timestamp}
                </span>
              </div>

              {/* Message Content */}
              <p className="text-xs sm:text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </p>

              {/* Empathy Reaction Chips */}
              <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-border/40 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleReaction(msg.id, "heart")}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                    userReactions[msg.id] === "heart"
                      ? "bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-white/5 text-muted-foreground"
                  }`}
                >
                  <span>❤️ With you</span>
                  <span className="font-bold">{msg.reactions.heart}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleReaction(msg.id, "space")}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                    userReactions[msg.id] === "space"
                      ? "bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-white/5 text-muted-foreground"
                  }`}
                >
                  <span>🌸 Holding space</span>
                  <span className="font-bold">{msg.reactions.space}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleReaction(msg.id, "strength")}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                    userReactions[msg.id] === "strength"
                      ? "bg-teal-500/20 text-teal-800 dark:text-haven-teal border border-teal-500/30"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-white/5 text-muted-foreground"
                  }`}
                >
                  <span>🛡️ Stay strong</span>
                  <span className="font-bold">{msg.reactions.strength}</span>
                </button>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Form */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 sm:p-4 border-t border-border/60 bg-teal-50/40 dark:bg-white/[0.02]"
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                onTyping();
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") {
                  onTyping();
                }
              }}
              placeholder="Share an encouraging thought or reflection..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-teal-500/30 text-foreground text-xs placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-haven-teal/50 shadow-inner"
            />

            <button
              type="submit"
              disabled={!inputVal.trim()}
              onMouseEnter={() => sendIconRef.current?.startAnimation()}
              onMouseLeave={() => sendIconRef.current?.stopAnimation()}
              className="btn-primary p-2.5 rounded-xl text-slate-950 flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all"
            >
              <SendIcon ref={sendIconRef} size={18} className="text-slate-950" />
            </button>
          </div>

          <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-teal-800 dark:text-haven-teal" />
              Automated PII & phone number filter active for your protection.
            </span>
            <span className="font-mono">Press Enter to send</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CircleDiscussionModal;
