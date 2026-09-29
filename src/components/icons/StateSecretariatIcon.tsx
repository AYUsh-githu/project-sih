import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

export const StateSecretariatIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".dome-crest",
        { translateY: [0, -3, 0], scale: [1, 1.1, 1] },
        { duration: 0.5, ease: "easeOut" }
      );
      animate(
        ".dome-body",
        { scale: [1, 1.05, 1] },
        { duration: 0.45, ease: "easeInOut" }
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".dome-crest", { translateY: 0, scale: 1 }, { duration: 0.2 });
      animate(".dome-body", { scale: 1 }, { duration: 0.2 });
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
        {/* Top Flag / Finial */}
        <motion.g className="dome-crest" style={{ transformOrigin: "12px 3px" }}>
          <line x1="12" y1="2" x2="12" y2="5" />
          <path d="M12 2l3 1.5l-3 1.5z" fill="currentColor" fillOpacity={0.4} />
        </motion.g>

        {/* Dome */}
        <motion.path
          className="dome-body"
          d="M6 10a6 6 0 0 1 12 0v1h-12z"
          style={{ transformOrigin: "12px 10px" }}
        />

        {/* Facade Columns & Portal */}
        <path d="M4 11h16v8h-16z" />
        <path d="M9 19v-4a3 3 0 0 1 6 0v4" />

        {/* Base Steps */}
        <line x1="2" y1="22" x2="22" y2="22" />
        <line x1="4" y1="19" x2="20" y2="19" />
      </motion.svg>
    );
  }
);

StateSecretariatIcon.displayName = "StateSecretariatIcon";
export default StateSecretariatIcon;
