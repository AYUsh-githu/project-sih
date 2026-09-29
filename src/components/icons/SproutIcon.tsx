import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

export const SproutIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      // Stem grows upward slightly
      animate(
        ".sprout-stem",
        { scaleY: [1, 1.15, 1] },
        { duration: 0.45, ease: "easeOut" },
      );
      // Left leaf unfurls and sways
      animate(
        ".sprout-left",
        { rotate: [-15, 0], scale: [0.9, 1.1, 1] },
        { duration: 0.5, ease: "easeOut" },
      );
      // Right leaf sways with slight delay
      animate(
        ".sprout-right",
        { rotate: [15, 0], scale: [0.9, 1.1, 1] },
        { duration: 0.5, delay: 0.08, ease: "easeOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".sprout-stem", { scaleY: 1 }, { duration: 0.25 });
      animate(".sprout-left", { rotate: 0, scale: 1 }, { duration: 0.25 });
      animate(".sprout-right", { rotate: 0, scale: 1 }, { duration: 0.25 });
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        {/* Main stem */}
        <motion.path
          className="sprout-stem"
          d="M12 10v10"
          style={{ transformOrigin: "12px 20px" }}
        />
        {/* Left leaf */}
        <motion.path
          className="sprout-left"
          d="M12 14a6 6 0 0 1 -6 -6a6 6 0 0 1 6 0"
          style={{ transformOrigin: "12px 14px" }}
        />
        {/* Right leaf */}
        <motion.path
          className="sprout-right"
          d="M12 10a6 6 0 0 1 6 -6a6 6 0 0 1 0 6"
          style={{ transformOrigin: "12px 10px" }}
        />
      </motion.svg>
    );
  },
);

SproutIcon.displayName = "SproutIcon";
export default SproutIcon;
