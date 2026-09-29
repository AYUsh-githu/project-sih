import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

export const CalendarIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".cal-pins",
        { y: [-3, 0] },
        { duration: 0.3, ease: "easeOut" },
      );
      await animate(
        ".cal-body",
        { scale: [1, 1.06, 0.98, 1] },
        { duration: 0.4, ease: "easeInOut" },
      );
      animate(
        ".cal-day",
        { opacity: [0.3, 1], scale: [0.8, 1] },
        { duration: 0.25, ease: "easeOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".cal-pins", { y: 0 }, { duration: 0.2 });
      animate(".cal-body", { scale: 1 }, { duration: 0.2 });
      animate(".cal-day", { opacity: 1, scale: 1 }, { duration: 0.2 });
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
        <motion.path
          className="cal-body"
          style={{ transformOrigin: "12px 14px" }}
          d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"
        />
        <motion.path className="cal-pins" d="M16 3v4" />
        <motion.path className="cal-pins" d="M8 3v4" />
        <path d="M4 11h16" />
        <motion.path
          className="cal-day"
          style={{ transformOrigin: "11px 15px" }}
          d="M11 15h1v4"
        />
      </motion.svg>
    );
  },
);

CalendarIcon.displayName = "CalendarIcon";
export default CalendarIcon;
