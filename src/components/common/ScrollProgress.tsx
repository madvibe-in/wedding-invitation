import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  return (
    <div className="fixed left-8 top-1/2 z-40 hidden h-20 w-px -translate-y-1/2 bg-[rgba(217,182,176,0.2)] md:block">
      <motion.div
        className="h-full w-px origin-top bg-[var(--blush)]"
        style={{ scaleY }}
        aria-hidden="true"
      />
    </div>
  );
}
