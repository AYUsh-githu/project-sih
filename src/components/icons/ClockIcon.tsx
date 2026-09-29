import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

export const ClockIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      // Rotate minute hand full circle, hour hand quarter circle
      animate(
        ".clock-minute",
        { rotate: 360 },
        { duration: 0.6, ease: "easeInOut" },
      );
      animate(
        ".clock-hour",
        { rotate: 90 },
        { duration: 0.6, ease: "easeInOut" },
      );
      animate(
        ".clock-face",
        { scale: [1, 1.06, 1] },
        { duration: 0.3, ease: "easeOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".clock-minute", { rotate: 0 }, { duration: 0.25 });
      animate(".clock-hour", { rotate: 0 }, { duration: 0.25 });
      animate(".clock-face", { scale: 1 }, { duration: 0.2 });
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
        <motion.circle
          className="clock-face"
          cx="12"
          cy="12"
          r="9"
          style={{ transformOrigin: "12px 12px" }}
        />
        <motion.path
          className="clock-hour"
          d="M12 12l-2 3"
          style={{ transformOrigin: "12px 12px" }}
        />
        <motion.path
          className="clock-minute"
          d="M12 7v5"
          style={{ transformOrigin: "12px 12px" }}
        />
      </motion.svg>
    );
  },
);

ClockIcon.displayName = "ClockIcon";
export default ClockIcon;
