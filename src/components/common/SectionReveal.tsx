import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

type Direction = "up" | "left" | "right";

type SectionRevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
};

const directions: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 }
};

export default function SectionReveal({
  children,
  direction = "up",
  delay = 0,
  className = ""
}: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotionPreference();
  const offset = directions[direction];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </motion.div>
  );
}
