import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type CustomCursorProps = {
  disabled?: boolean;
};

export default function CustomCursor({ disabled = false }: CustomCursorProps) {
  const [active, setActive] = useState(false);
  const [hasPointerPosition, setHasPointerPosition] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, { stiffness: 520, damping: 38, mass: 0.25 });
  const y = useSpring(mouseY, { stiffness: 520, damping: 38, mass: 0.25 });

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const update = () => setIsFinePointer(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (disabled) {
      return undefined;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || event.pointerType === "pen") {
        setIsFinePointer(true);
      }

      mouseX.set(event.clientX - 16);
      mouseY.set(event.clientY - 16);
      setHasPointerPosition(true);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [disabled, mouseX, mouseY]);

  useEffect(() => {
    document.body.classList.remove("cursor-enabled");

    if (disabled || !isFinePointer) {
      document.body.classList.remove("cursor-enabled");
      return undefined;
    }

    const enter = () => setActive(true);
    const leave = () => setActive(false);
    const targets = document.querySelectorAll<HTMLElement>(
      'a, button, input, textarea, select, label, [data-cursor="hover"]'
    );

    targets.forEach((target) => {
      target.addEventListener("mouseenter", enter);
      target.addEventListener("mouseleave", leave);
    });

    return () => {
      document.body.classList.remove("cursor-enabled");
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", enter);
        target.removeEventListener("mouseleave", leave);
      });
    };
  }, [disabled, isFinePointer]);

  if (disabled || !isFinePointer) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] flex h-8 w-8 items-center justify-center rounded-full border border-[var(--plum)] bg-[rgba(255,250,247,0.18)] shadow-[0_0_0_1px_rgba(240,217,191,0.55),0_8px_24px_rgba(78,61,66,0.18)]"
      style={{ x, y }}
      animate={{
        opacity: hasPointerPosition ? 1 : 0,
        scale: active ? 2 : 1,
        backgroundColor: active ? "rgba(217,182,176,0.28)" : "rgba(255,250,247,0.18)"
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      aria-hidden="true"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--plum)] shadow-[0_0_10px_rgba(255,250,247,0.7)]" />
    </motion.div>
  );
}
