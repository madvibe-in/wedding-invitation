import { AnimatePresence, motion } from "framer-motion";
import { FloralDivider } from "../common/Decor";
import SectionReveal from "../common/SectionReveal";
import { wedding } from "../../data/weddingData";
import { useCountdown } from "../../hooks/useCountdown";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

const units = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" }
] as const;

export default function CountdownSection() {
  const remaining = useCountdown(wedding.targetDate);
  const prefersReducedMotion = useReducedMotionPreference();

  return (
    <section
      id="countdown"
      className="relative overflow-hidden bg-[var(--pearl)] px-4 py-20 text-center md:px-8 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(240,217,191,0.32),transparent_34%),linear-gradient(180deg,rgba(248,242,239,0.55),rgba(255,250,247,0.96))]"
        aria-hidden="true"
      />

      <SectionReveal className="relative z-10 mx-auto max-w-5xl">
        <p className="font-script text-[44px] leading-none text-[var(--champagne-dk)] md:text-[58px]">
          The
        </p>
        <h2 className="font-display text-5xl font-light uppercase leading-none text-[var(--plum)] md:text-7xl">
          Countdown
        </h2>
        <p className="mt-2 font-body text-[10px] font-semibold uppercase tracking-[0.34em] text-[rgba(78,61,66,0.58)] md:text-xs">
          To our forever begins
        </p>
        <FloralDivider className="mx-auto mt-7" />

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-2 sm:gap-5">
          {units.map((unit, index) => (
            <div className="contents" key={unit.key}>
              <div className="min-w-0 text-center">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={remaining[unit.key]}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="font-display text-3xl font-light leading-none text-[#20171c] sm:text-5xl md:text-7xl"
                  >
                    {String(remaining[unit.key]).padStart(unit.key === "days" ? 1 : 2, "0")}
                  </motion.div>
                </AnimatePresence>
                <div className="mt-3 font-body text-[8px] font-semibold uppercase tracking-[0.18em] text-[rgba(78,61,66,0.55)] sm:text-[10px]">
                  {unit.label}
                </div>
              </div>

              {index < units.length - 1 ? (
                <span className="pt-0 font-display text-3xl font-light leading-none text-[rgba(78,61,66,0.28)] sm:text-5xl md:text-7xl">
                  :
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 h-px max-w-sm bg-[linear-gradient(90deg,transparent,rgba(201,168,124,0.6),transparent)]" />
        <p className="mx-auto mt-8 max-w-xl font-display text-2xl italic leading-tight text-[rgba(78,61,66,0.72)] md:text-3xl">
          {wedding.date} at {wedding.venue}
        </p>
      </SectionReveal>
    </section>
  );
}
