import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

export const HistoryIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".history-hands",
        { rotate: [0, -90, -45] },
        { duration: 0.45, ease: "easeInOut" }
      );
      animate(
        ".history-circle",
        { rotate: [0, -30, 0] },
        { duration: 0.4, ease: "easeOut" }
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".history-hands", { rotate: 0 }, { duration: 0.2 });
      animate(".history-circle", { rotate: 0 }, { duration: 0.2 });
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
          className="history-circle"
          d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
          style={{ transformOrigin: "12px 12px" }}
        />
        <path d="M3 3v5h5" />
        <motion.path
          className="history-hands"
          d="M12 7v5l3 3"
          style={{ transformOrigin: "12px 12px" }}
        />
      </motion.svg>
    );
  }
);

HistoryIcon.displayName = "HistoryIcon";
