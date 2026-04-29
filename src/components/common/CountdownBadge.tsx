import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "../../data/weddingData";
import { useCountdown } from "../../hooks/useCountdown";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

const units = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" }
] as const;

export default function CountdownBadge() {
  const remaining = useCountdown(wedding.targetDate);
  const prefersReducedMotion = useReducedMotionPreference();

  return (
    <div className="hero-countdown grid w-full grid-cols-2 gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-center">
      {units.map((unit, index) => (
        <div className="contents" key={unit.key}>
          <div className="rounded-xl border border-[rgba(240,217,191,0.45)] bg-[rgba(240,217,191,0.25)] px-3 py-3 text-center">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={remaining[unit.key]}
                initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="font-display text-4xl font-semibold leading-none text-[var(--plum)]"
              >
                {String(remaining[unit.key]).padStart(unit.key === "days" ? 1 : 2, "0")}
              </motion.div>
            </AnimatePresence>
            <div className="mt-2 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgba(78,61,66,0.62)]">
              {unit.label}
            </div>
          </div>
          {index < units.length - 1 ? (
            <span className="hidden font-display text-3xl text-[var(--blush)] sm:block">:</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
