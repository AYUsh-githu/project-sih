import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

export const CounselorCareIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".counselor-heart",
        { scale: [1, 1.25, 1], filter: ["drop-shadow(0 0 0px transparent)", "drop-shadow(0 0 8px rgba(45,212,191,0.8))", "drop-shadow(0 0 0px transparent)"] },
        { duration: 0.5, ease: "easeInOut" }
      );
      animate(
        ".counselor-person",
        { translateY: [0, -2, 0] },
        { duration: 0.45, ease: "easeOut" }
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".counselor-heart", { scale: 1, filter: "none" }, { duration: 0.2 });
      animate(".counselor-person", { translateY: 0 }, { duration: 0.2 });
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
        {/* Person Head & Shoulders */}
        <motion.g className="counselor-person">
          <circle cx="12" cy="7" r="4" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </motion.g>

        {/* Small Heart emblem at lower right */}
        <motion.path
          className="counselor-heart"
          d="M17.5 13a2.5 2.5 0 0 0 -2.5 2.5c0 1.5 2.5 3.5 2.5 3.5s2.5 -2 2.5 -3.5a2.5 2.5 0 0 0 -2.5 -2.5z"
          style={{ transformOrigin: "17.5px 15.5px" }}
          fill="currentColor"
          fillOpacity={0.2}
        />
      </motion.svg>
    );
  }
);

CounselorCareIcon.displayName = "CounselorCareIcon";
export default CounselorCareIcon;
