import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

export const ArrowRightIcon = forwardRef<
  AnimatedIconHandle,
  AnimatedIconProps
>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".arrow-stem",
        { scaleX: [0.8, 1.2, 1] },
        { duration: 0.35, ease: "easeOut" },
      );
      animate(
        ".arrow-head",
        { x: [0, 4, 2] },
        { duration: 0.35, ease: "easeOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".arrow-stem", { scaleX: 1 }, { duration: 0.2 });
      animate(".arrow-head", { x: 0 }, { duration: 0.2 });
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
          className="arrow-stem"
          d="M5 12h14"
          style={{ transformOrigin: "5px 12px" }}
        />
        <motion.path className="arrow-head" d="M13 18l6 -6" />
        <motion.path className="arrow-head" d="M13 6l6 6" />
      </motion.svg>
    );
  },
);

ArrowRightIcon.displayName = "ArrowRightIcon";
export default ArrowRightIcon;
