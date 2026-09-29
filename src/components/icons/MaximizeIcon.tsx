import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

export const MaximizeIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".arrow-top-right",
        { x: [0, 2, 0], y: [0, -2, 0] },
        { duration: 0.35, ease: "easeOut" }
      );
      animate(
        ".arrow-bottom-left",
        { x: [0, -2, 0], y: [0, 2, 0] },
        { duration: 0.35, ease: "easeOut" }
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".arrow-top-right", { x: 0, y: 0 }, { duration: 0.2 });
      animate(".arrow-bottom-left", { x: 0, y: 0 }, { duration: 0.2 });
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
          className="arrow-top-right"
          d="M15 3h6v6"
          style={{ transformOrigin: "18px 6px" }}
        />
        <motion.path
          className="arrow-top-right"
          d="M14 10 21 3"
          style={{ transformOrigin: "18px 6px" }}
        />
        <motion.path
          className="arrow-bottom-left"
          d="M9 21H3v-6"
          style={{ transformOrigin: "6px 18px" }}
        />
        <motion.path
          className="arrow-bottom-left"
          d="M10 14 3 21"
          style={{ transformOrigin: "6px 18px" }}
        />
      </motion.svg>
    );
  }
);

MaximizeIcon.displayName = "MaximizeIcon";
