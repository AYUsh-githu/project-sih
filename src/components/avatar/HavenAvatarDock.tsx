import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAvatar } from "@/context/AvatarContext";
import { HavenAvatar } from "./HavenAvatar";
import { MessageSquare, Settings, Sparkles, X } from "lucide-react";

export const HavenAvatarDock: React.FC = () => {
  const { settings, registerDockAvatar, triggerMotion } = useAvatar();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // If user disabled dock or is on sign in page or landing page, hide dock
  const isExcludedPage =
    location.pathname === "/" ||
    location.pathname === "/survivor" ||
    location.pathname === "/survivor/";

  if (!settings.isDockVisible || isExcludedPage) {
    return null;
  }

  const handleAvatarClick = () => {
    // Play warm welcoming greet on click
    triggerMotion("greetwave");
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-none">
      {/* Quick Interaction Popover (appears when clicked) */}
      {showMenu && (
        <div className="pointer-events-auto mb-3 p-3.5 rounded-2xl glass-card border border-teal-500/30 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl animate-scale-in w-56 text-xs space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-border/50">
            <div className="flex items-center gap-1.5 font-bold text-foreground">
              <Sparkles className="w-3.5 h-3.5 text-teal-800 dark:text-haven-teal" />
              <span>Haven Companion</span>
            </div>
            <button
              type="button"
              onClick={() => setShowMenu(false)}
              className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => {
                setShowMenu(false);
                navigate("/survivor/haven-ai");
              }}
              className="w-full px-3 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-900 dark:text-haven-teal font-semibold flex items-center gap-2 transition-colors cursor-pointer text-left"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Talk to Haven AI</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setShowMenu(false);
                navigate("/survivor/settings");
              }}
              className="w-full px-3 py-2 rounded-xl bg-white/60 dark:bg-white/[0.04] hover:bg-teal-50/60 dark:hover:bg-white/[0.08] text-foreground font-semibold flex items-center gap-2 transition-colors cursor-pointer text-left border border-border/40"
            >
              <Settings className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Customize Avatar</span>
            </button>
          </div>
        </div>
      )}

      {/* 
        Floating Avatar Pedestal & Container:
        - Positioned cleanly at bottom right
        - STRICT RULE FULFILLED: Zero text floating on top of avatar!
      */}
      <div
        onClick={handleAvatarClick}
        title="Haven Companion (Click to interact, drag head or antenna)"
        className="pointer-events-auto relative group cursor-grab active:cursor-grabbing transition-transform hover:scale-105 duration-300"
      >
        <HavenAvatar
          size={settings.avatarSize}
          color={settings.chassisColor}
          headCurvature={settings.headCurvature}
          autoSleep={settings.autoSleep}
          onAvatarRef={registerDockAvatar}
          interactive={true}
        />
      </div>
    </div>
  );
};

export default HavenAvatarDock;
