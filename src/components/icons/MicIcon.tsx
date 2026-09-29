import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

export const MicIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".mic-capsule",
        { scale: [1, 1.15, 1], y: [0, -1.5, 0] },
        { duration: 0.35, ease: "easeOut" }
      );
      animate(
        ".mic-waves",
        { scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] },
        { duration: 0.4, ease: "easeInOut" }
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".mic-capsule", { scale: 1, y: 0 }, { duration: 0.2 });
      animate(".mic-waves", { scale: 1, opacity: 1 }, { duration: 0.2 });
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`cursor-pointer ${className}`}
        onHoverStart={start}
        onHoverEnd={stop}
        style={{ overflow: "visible" }}
      >
        <motion.path
          className="mic-capsule"
          d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"
          style={{ transformOrigin: "12px 7px" }}
        />
        <motion.path
          className="mic-waves"
          d="M19 10v2a7 7 0 0 1-14 0v-2"
          style={{ transformOrigin: "12px 12px" }}
        />
        <line x1="12" x2="12" y1="19" y2="22" />
      </motion.svg>
    );
  }
);

MicIcon.displayName = "MicIcon";
