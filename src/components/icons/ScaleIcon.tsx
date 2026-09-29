import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

export const ScaleIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      // Beam tilts left then right
      await animate(
        ".scale-beam",
        { rotate: [-6, 6, -3, 0] },
        { duration: 0.6, ease: "easeInOut" },
      );
      animate(
        ".scale-left-pan",
        { y: [2, -2, 1, 0] },
        { duration: 0.6, ease: "easeInOut" },
      );
      animate(
        ".scale-right-pan",
        { y: [-2, 2, -1, 0] },
        { duration: 0.6, ease: "easeInOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".scale-beam", { rotate: 0 }, { duration: 0.25 });
      animate(".scale-left-pan, .scale-right-pan", { y: 0 }, { duration: 0.25 });
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
        <path d="M12 3v18" />
        <path d="M9 21h6" />
        {/* Tilting beam */}
        <motion.path
          className="scale-beam"
          d="M6 6l6 -1l6 1"
          style={{ transformOrigin: "12px 5px" }}
        />
        {/* Left pan */}
        <motion.g className="scale-left-pan">
          <path d="M3 13a3 3 0 0 0 6 0l-3 -7z" />
        </motion.g>
        {/* Right pan */}
        <motion.g className="scale-right-pan">
          <path d="M15 13a3 3 0 0 0 6 0l-3 -7z" />
        </motion.g>
      </motion.svg>
    );
  },
);

ScaleIcon.displayName = "ScaleIcon";
export default ScaleIcon;
