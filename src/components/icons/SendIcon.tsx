import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

export const SendIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".send-plane",
        { x: [0, 4, 0], y: [0, -3, 0], rotate: [0, -8, 0] },
        { duration: 0.4, ease: "easeInOut" }
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".send-plane", { x: 0, y: 0, rotate: 0 }, { duration: 0.2 });
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
          className="send-plane"
          d="m22 2-7 20-4-9-9-4Z"
          style={{ transformOrigin: "12px 12px" }}
        />
        <motion.path
          className="send-plane"
          d="M22 2 11 13"
          style={{ transformOrigin: "12px 12px" }}
        />
      </motion.svg>
    );
  }
);

SendIcon.displayName = "SendIcon";
