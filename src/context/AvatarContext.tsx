import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { useTheme } from "./ThemeContext";
import type { TaskCategoryKey } from "@/lib/avatar/avatar-motions";

export interface AvatarSettings {
  chassisColor: string;
  haloGlowIntensity: number; // 0 to 100
  avatarSize: number; // 100 to 180 (px)
  headCurvature: number; // 0 to 100 (%)
  autoSleep: number; // 0 (disabled) or seconds
  isDockVisible: boolean;
}

export const CHASSIS_PRESETS = [
  { id: "radiant-cyan", name: "Radiant Cyan", color: "#2dd4bf", textColor: "#070b12", icon: "🌟" },
  { id: "cosmic-teal", name: "Cosmic Teal", color: "#134e4a", textColor: "#ffffff", icon: "🛡️" },
  { id: "botanical-sage", name: "Botanical Sage", color: "#0f766e", textColor: "#ffffff", icon: "🌿" },
  { id: "cosmic-indigo", name: "Cosmic Indigo", color: "#818cf8", textColor: "#070b12", icon: "🔮" },
  { id: "solar-amber", name: "Solar Amber", color: "#d97706", textColor: "#ffffff", icon: "☀️" },
  { id: "alabaster-shell", name: "Alabaster Shell", color: "#f1f5f9", textColor: "#070b12", icon: "⚪" },
];

const DEFAULT_SETTINGS: AvatarSettings = {
  chassisColor: "#134e4a",
  haloGlowIntensity: 75,
  avatarSize: 140,
  headCurvature: 75,
  autoSleep: 0,
  isDockVisible: true,
};

interface AvatarContextType {
  settings: AvatarSettings;
  updateSettings: (newSettings: Partial<AvatarSettings>) => void;
  resetSettings: () => void;
  triggerMotion: (action: string) => void;
  triggerCategory: (category: TaskCategoryKey) => void;
  activeMotion: string;
  registerDockAvatar: (el: any) => void;
  registerPreviewAvatar: (el: any) => void;

  // Semantically aligned human action triggers
  onTyping: () => void;
  onVoiceStart: () => void;
  onVoiceStop: () => void;
  onMessageSend: () => void;
  onAiThinking: () => void;
  onAiComplete: () => void;
  onMoodSelect: (mood: string) => void;
  onThreatAlert: () => void;
  onEmergencySos: () => void;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAvatar must be used within an AvatarProvider");
  }
  return context;
};

export const AvatarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme();
  const [settings, setSettings] = useState<AvatarSettings>(() => {
    try {
      const saved = localStorage.getItem("haven_avatar_settings");
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Could not load avatar settings from storage:", e);
    }
    return DEFAULT_SETTINGS;
  });

  const [activeMotion, setActiveMotion] = useState<string>("idle");
  const dockAvatarRef = useRef<any>(null);
  const previewAvatarRef = useRef<any>(null);
  const typingTimerRef = useRef<any>(null);
  const isTypingRef = useRef<boolean>(false);

  // Synchronize CSS variable for halo glow intensity
  useEffect(() => {
    const alpha = (settings.haloGlowIntensity / 100).toFixed(2);
    document.documentElement.style.setProperty("--avatar-glow-alpha", alpha);
  }, [settings.haloGlowIntensity]);

  // Adjust default chassis color for theme if user has default
  useEffect(() => {
    if (theme === "light" && settings.chassisColor === "#134e4a") {
      setSettings((prev) => ({ ...prev, chassisColor: "#0f766e" }));
    } else if (theme === "dark" && settings.chassisColor === "#0f766e") {
      setSettings((prev) => ({ ...prev, chassisColor: "#134e4a" }));
    }
  }, [theme]);

  const updateSettings = useCallback((newSettings: Partial<AvatarSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem("haven_avatar_settings", JSON.stringify(updated));
      } catch (e) {
        console.warn("Could not persist avatar settings:", e);
      }
      return updated;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.setItem("haven_avatar_settings", JSON.stringify(DEFAULT_SETTINGS));
    } catch (e) {}
  }, []);

  const registerDockAvatar = useCallback((el: any) => {
    dockAvatarRef.current = el;
  }, []);

  const registerPreviewAvatar = useCallback((el: any) => {
    previewAvatarRef.current = el;
  }, []);

  const triggerMotion = useCallback((action: string) => {
    setActiveMotion(action);

    const playOn = (avatarEl: any) => {
      if (!avatarEl) return;
      try {
        if (typeof avatarEl.play === "function") {
          avatarEl.play(action);
        } else if (typeof avatarEl.playTaskCategory === "function") {
          avatarEl.playTaskCategory(action);
        }
      } catch (err) {
        console.debug("Avatar motion trigger:", err);
      }
    };

    playOn(dockAvatarRef.current);
    playOn(previewAvatarRef.current);
  }, []);

  const triggerCategory = useCallback((category: TaskCategoryKey) => {
    setActiveMotion(category);

    const playCategoryOn = (avatarEl: any) => {
      if (!avatarEl) return;
      try {
        if (typeof avatarEl.playRandom === "function") {
          avatarEl.playRandom(category);
        } else if (typeof avatarEl.play === "function") {
          avatarEl.play(category);
        }
      } catch (err) {
        console.debug("Avatar category trigger:", err);
      }
    };

    playCategoryOn(dockAvatarRef.current);
    playCategoryOn(previewAvatarRef.current);
  }, []);

  // 1. Debounced Typing Motion Tracker
  const onTyping = useCallback(() => {
    if (!isTypingRef.current) {
      isTypingRef.current = true;
      triggerCategory("input");
    }

    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    typingTimerRef.current = setTimeout(() => {
      isTypingRef.current = false;
      // Smooth return to idle when typing halts
      const el = dockAvatarRef.current;
      if (el && typeof el.play === "function") {
        el.play("idle");
      }
    }, 1600);
  }, [triggerCategory]);

  // 2. Voice Dictation
  const onVoiceStart = useCallback(() => {
    triggerCategory("listen");
  }, [triggerCategory]);

  const onVoiceStop = useCallback(() => {
    triggerMotion("idle");
  }, [triggerMotion]);

  // 3. Message Send / Dispatch
  const onMessageSend = useCallback(() => {
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    isTypingRef.current = false;
    triggerCategory("send");
  }, [triggerCategory]);

  // 4. AI Thinking / Statutory Lookup
  const onAiThinking = useCallback(() => {
    triggerCategory("thinking");
  }, [triggerCategory]);

  // 5. AI Complete
  const onAiComplete = useCallback(() => {
    triggerCategory("speak");
  }, [triggerCategory]);

  // 6. Mood Check-in
  const onMoodSelect = useCallback((mood: string) => {
    const m = mood.toLowerCase();
    if (m.includes("great") || m.includes("good")) {
      triggerCategory("success");
    } else if (m.includes("okay")) {
      triggerCategory("listen");
    } else if (m.includes("struggling")) {
      triggerCategory("calm");
    } else if (m.includes("crisis")) {
      triggerCategory("concern");
    } else {
      triggerCategory("presence");
    }
  }, [triggerCategory]);

  // 7. Threat Alert / Intimidation Report
  const onThreatAlert = useCallback(() => {
    triggerCategory("concern");
  }, [triggerCategory]);

  // 8. Emergency SOS / Danger Dispatch
  const onEmergencySos = useCallback(() => {
    triggerCategory("crisis");
  }, [triggerCategory]);

  return (
    <AvatarContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        triggerMotion,
        triggerCategory,
        activeMotion,
        registerDockAvatar,
        registerPreviewAvatar,
        onTyping,
        onVoiceStart,
        onVoiceStop,
        onMessageSend,
        onAiThinking,
        onAiComplete,
        onMoodSelect,
        onThreatAlert,
        onEmergencySos,
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
};

export default AvatarProvider;
