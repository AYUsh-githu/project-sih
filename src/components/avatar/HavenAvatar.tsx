import React, { useEffect, useRef } from "react";
import "@/lib/avatar/agent-robot-avatar/agent-robot-avatar.js";
import { installAvatarMotions } from "@/lib/avatar/avatar-motions.js";

interface HavenAvatarProps {
  size?: number | string;
  color?: string;
  headCurvature?: number | string;
  autoSleep?: number | string;
  className?: string;
  onAvatarRef?: (instance: any) => void;
  interactive?: boolean;
}

export const HavenAvatar: React.FC<HavenAvatarProps> = ({
  size = 140,
  color = "#134e4a",
  headCurvature = 75,
  autoSleep = 0,
  className = "",
  onAvatarRef,
  interactive = true,
}) => {
  const avatarRef = useRef<any>(null);

  useEffect(() => {
    const el = avatarRef.current;
    if (!el) return;

    let motionCleanup: any = null;

    try {
      // Install trauma-informed somatic motions
      motionCleanup = installAvatarMotions(el, {
        liveIdle: interactive,
        playful: false,
      });

      if (onAvatarRef) {
        onAvatarRef(el);
      }
    } catch (e) {
      console.warn("Avatar motion initialization:", e);
    }

    return () => {
      if (motionCleanup && typeof motionCleanup.setLiveIdle === "function") {
        motionCleanup.setLiveIdle(false);
      }
    };
  }, [interactive, onAvatarRef]);

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <agent-robot-avatar
        ref={avatarRef}
        size={String(size)}
        color={color}
        head-roundness={String(headCurvature)}
        auto-sleep={String(autoSleep)}
        style={{
          display: "block",
          pointerEvents: interactive ? "auto" : "none",
          cursor: interactive ? "grab" : "default",
        }}
      />
    </div>
  );
};

export default HavenAvatar;
