import React, { useMemo, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface ParticleData {
  id: number;
  left: number;
  top: number;
  size: number;
  drift: number;
  duration: number;
  delay: number;
}

export const InteractiveBackground: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);

  // Check if touch device on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  // Pointer parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  const rootX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const rootY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  useEffect(() => {
    if (shouldReduceMotion || isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      if (innerWidth > 0 && innerHeight > 0) {
        const normX = e.clientX / innerWidth - 0.5; // -0.5 to 0.5
        const normY = e.clientY / innerHeight - 0.5; // -0.5 to 0.5
        mouseX.set(normX);
        mouseY.set(normY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion, isTouch, mouseX, mouseY]);

  // 36 particles (random once via useMemo)
  const particles = useMemo<ParticleData[]>(() => {
    const list: ParticleData[] = [];
    for (let i = 0; i < 36; i++) {
      // Deterministic pseudo-random distribution so SSR/HMR stays stable
      const pseudo = (seed: number) => {
        const val = Math.sin(seed * 9999 + i * 37) * 10000;
        return val - Math.floor(val);
      };

      const left = pseudo(1) * 98 + 1; // 1% - 99%
      const top = pseudo(2) * 98 + 1; // 1% - 99%
      const size = pseudo(3) * 4 + 2; // 2px - 6px
      const drift = pseudo(4) * 30 + 15; // 15px - 45px
      const duration = pseudo(5) * 10 + 9; // 9s - 19s
      const delay = -(pseudo(6) * 15); // negative delay: already drifting on mount!

      list.push({
        id: i,
        left,
        top,
        size,
        drift,
        duration,
        delay,
      });
    }
    return list;
  }, []);

  const content = (
    <>
      {/* 3 Ambient Gradient Blobs */}
      <div className="blob blob-a" />
      <div className="blob blob-b" />
      <div className="blob blob-c" />

      {/* 36 Particles */}
      {particles.map((p) => {
        if (shouldReduceMotion) {
          return (
            <span
              key={p.id}
              className="particle"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
            />
          );
        }

        return (
          <motion.span
            key={p.id}
            className="particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              y: [0, -p.drift, 0],
              x: [0, p.drift / 3, 0],
              opacity: [0.25, 0.8, 0.25],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </>
  );

  if (shouldReduceMotion || isTouch) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        {content}
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: rootX, y: rootY }}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {content}
    </motion.div>
  );
};
