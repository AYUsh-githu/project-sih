import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

export const DistrictCourtIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".court-roof",
        { translateY: [0, -3, 0] },
        { duration: 0.45, ease: "easeOut" }
      );
      animate(
        ".court-pillars",
        { scaleY: [1, 1.08, 1] },
        { duration: 0.45, ease: "easeInOut" }
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".court-roof", { translateY: 0 }, { duration: 0.2 });
      animate(".court-pillars", { scaleY: 1 }, { duration: 0.2 });
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
        {/* Triangular Pediment / Roof */}
        <motion.path
          className="court-roof"
          d="M3 9l9 -6l9 6v1h-18z"
          style={{ transformOrigin: "12px 6px" }}
        />

        {/* 4 Pillars */}
        <motion.g
          className="court-pillars"
          style={{ transformOrigin: "12px 18px" }}
        >
          <line x1="6" y1="10" x2="6" y2="18" />
          <line x1="10" y1="10" x2="10" y2="18" />
          <line x1="14" y1="10" x2="14" y2="18" />
          <line x1="18" y1="10" x2="18" y2="18" />
        </motion.g>

        {/* Base Steps */}
        <line x1="3" y1="18" x2="21" y2="18" />
        <line x1="2" y1="21" x2="22" y2="21" />
      </motion.svg>
    );
  }
);

DistrictCourtIcon.displayName = "DistrictCourtIcon";
export default DistrictCourtIcon;
