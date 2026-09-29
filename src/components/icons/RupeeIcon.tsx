import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

export const RupeeIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".rupee-symbol",
        { scale: [1, 1.12, 1] },
        { duration: 0.35, ease: "easeOut" },
      );
      await animate(
        ".rupee-main",
        { pathLength: [0.6, 1] },
        { duration: 0.3, ease: "easeInOut" },
      );
      animate(
        ".rupee-line",
        { pathLength: [0, 1] },
        { duration: 0.25, ease: "easeOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".rupee-symbol", { scale: 1 }, { duration: 0.2 });
      animate(".rupee-main, .rupee-line", { pathLength: 1 }, { duration: 0.2 });
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
        <motion.g className="rupee-symbol" style={{ transformOrigin: "12px 12px" }}>
          <motion.path
            className="rupee-main"
            d="M18 5h-11h3a4 4 0 0 1 0 8h-3l6 6"
          />
          <motion.path className="rupee-line" d="M7 9l11 0" />
        </motion.g>
      </motion.svg>
    );
  },
);

RupeeIcon.displayName = "RupeeIcon";
export default RupeeIcon;
