import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

export const MessageSquareIcon = forwardRef<
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
        ".msg-bubble",
        { scale: [1, 1.08, 0.96, 1.02, 1] },
        { duration: 0.45, ease: "easeOut" },
      );
      // Sequentially animate typing dots
      animate(
        ".msg-dot-1",
        { y: [-2, 0], opacity: [0.4, 1] },
        { duration: 0.25, ease: "easeOut" },
      );
      animate(
        ".msg-dot-2",
        { y: [-2, 0], opacity: [0.4, 1] },
        { duration: 0.25, ease: "easeOut", delay: 0.1 },
      );
      animate(
        ".msg-dot-3",
        { y: [-2, 0], opacity: [0.4, 1] },
        { duration: 0.25, ease: "easeOut", delay: 0.2 },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".msg-bubble", { scale: 1 }, { duration: 0.2 });
      animate(".msg-dot-1, .msg-dot-2, .msg-dot-3", { y: 0, opacity: 1 }, { duration: 0.2 });
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
          className="msg-bubble"
          style={{ transformOrigin: "12px 12px" }}
          d="M21 14l-3 -3h-10a3 3 0 0 1 -3 -3v-2a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5"
        />
        <motion.path
          className="msg-bubble"
          style={{ transformOrigin: "12px 12px" }}
          d="M8 9h.01"
        />
        <motion.path
          className="msg-dot-1"
          style={{ transformOrigin: "9px 13px" }}
          d="M9 13h.01"
        />
        <motion.path
          className="msg-dot-2"
          style={{ transformOrigin: "12px 13px" }}
          d="M13 13h.01"
        />
        <motion.path
          className="msg-dot-3"
          style={{ transformOrigin: "16px 13px" }}
          d="M17 13h.01"
        />
      </motion.svg>
    );
  },
);

MessageSquareIcon.displayName = "MessageSquareIcon";
export default MessageSquareIcon;
