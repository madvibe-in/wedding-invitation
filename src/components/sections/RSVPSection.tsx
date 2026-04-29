import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { SectionNumber } from "../common/Decor";
import { wedding } from "../../data/weddingData";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { gsap } from "../../lib/gsap";

const fieldMotion = {
  initial: { y: 20, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.45, ease: "easeOut" }
} as const;

export default function RSVPSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [attendance, setAttendance] = useState("Joyfully Accepts");
  const [submitted, setSubmitted] = useState(false);
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(".rsvp-title-block", {
        y: 40,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 76%"
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const motionProps = prefersReducedMotion ? {} : fieldMotion;

  return (
    <section
      id="rsvp"
      ref={rootRef}
      className="section-pad pattern-dots relative overflow-hidden bg-[var(--plum)] px-4 text-center md:px-8"
    >
      <SectionNumber>05</SectionNumber>
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="rsvp-title-block">
          <div className="font-script text-[72px] leading-none text-[var(--champagne)] [text-shadow:0_0_40px_rgba(240,217,191,0.4)]">
            R ✦ A
          </div>
          <p className="mt-6 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--blush)]">
            You're Invited
          </p>
          <h2 className="mt-4 font-display text-5xl font-light leading-none text-[var(--pearl)] md:text-7xl">
            Join Us in Celebration
          </h2>
          <p className="mx-auto mt-6 max-w-[480px] font-body text-base leading-[1.8] text-[rgba(255,250,247,0.75)]">
            We would be honored to share this joyful day with you. Your presence is the only gift we need.
          </p>
          <div className="mt-7 inline-flex rounded-full border border-[rgba(240,217,191,0.3)] bg-[rgba(240,217,191,0.12)] px-5 py-2 font-body text-[13px] text-[var(--champagne)]">
            {wedding.date}
          </div>
        </div>

        <form className="mx-auto mt-12 grid max-w-3xl gap-4 text-left" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div {...motionProps}>
              <label htmlFor="fullName" className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.16em] text-[rgba(255,250,247,0.72)]">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                required
                placeholder="Your full name"
                className="dark-focus w-full rounded-xl border border-[rgba(217,182,176,0.3)] bg-[rgba(255,250,247,0.06)] px-4 py-3 font-body text-sm text-[var(--pearl)] placeholder:text-[rgba(255,250,247,0.3)] focus:border-[var(--champagne)] focus:shadow-[0_0_0_3px_rgba(240,217,191,0.15)] focus:outline-none"
              />
            </motion.div>
            <motion.div {...motionProps} transition={{ ...fieldMotion.transition, delay: 0.1 }}>
              <label htmlFor="email" className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.16em] text-[rgba(255,250,247,0.72)]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="email@example.com"
                className="dark-focus w-full rounded-xl border border-[rgba(217,182,176,0.3)] bg-[rgba(255,250,247,0.06)] px-4 py-3 font-body text-sm text-[var(--pearl)] placeholder:text-[rgba(255,250,247,0.3)] focus:border-[var(--champagne)] focus:shadow-[0_0_0_3px_rgba(240,217,191,0.15)] focus:outline-none"
              />
            </motion.div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <motion.div {...motionProps} transition={{ ...fieldMotion.transition, delay: 0.2 }}>
              <label htmlFor="guests" className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.16em] text-[rgba(255,250,247,0.72)]">
                Number of Guests
              </label>
              <select
                id="guests"
                name="guests"
                className="dark-focus w-full rounded-xl border border-[rgba(217,182,176,0.3)] bg-[rgba(255,250,247,0.06)] px-4 py-3 font-body text-sm text-[var(--pearl)] focus:border-[var(--champagne)] focus:shadow-[0_0_0_3px_rgba(240,217,191,0.15)] focus:outline-none"
              >
                {["1", "2", "3", "4", "5+"].map((option) => (
                  <option key={option} value={option} className="bg-[var(--plum)] text-[var(--pearl)]">
                    {option}
                  </option>
                ))}
              </select>
            </motion.div>
            <motion.div {...motionProps} transition={{ ...fieldMotion.transition, delay: 0.3 }}>
              <span className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.16em] text-[rgba(255,250,247,0.72)]">
                Attendance
              </span>
              <div className="grid gap-2 sm:grid-cols-2">
                {["Joyfully Accepts", "Regretfully Declines"].map((option) => (
                  <label
                    key={option}
                    className={`dark-focus flex min-h-[48px] items-center justify-center rounded-xl border px-3 text-center font-body text-xs font-semibold transition ${
                      attendance === option
                        ? "border-[var(--champagne)] bg-[rgba(240,217,191,0.18)] text-[var(--champagne)]"
                        : "border-[rgba(217,182,176,0.3)] bg-[rgba(255,250,247,0.06)] text-[rgba(255,250,247,0.72)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value={option}
                      checked={attendance === option}
                      onChange={() => setAttendance(option)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div {...motionProps} transition={{ ...fieldMotion.transition, delay: 0.4 }}>
            <label htmlFor="message" className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.16em] text-[rgba(255,250,247,0.72)]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder="A note for the couple (optional)"
              className="dark-focus w-full resize-none rounded-xl border border-[rgba(217,182,176,0.3)] bg-[rgba(255,250,247,0.06)] px-4 py-3 font-body text-sm text-[var(--pearl)] placeholder:text-[rgba(255,250,247,0.3)] focus:border-[var(--champagne)] focus:shadow-[0_0_0_3px_rgba(240,217,191,0.15)] focus:outline-none"
            />
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center gap-4 pt-3 sm:flex-row"
            {...motionProps}
            transition={{ ...fieldMotion.transition, delay: 0.5 }}
          >
            <motion.button
              type="submit"
              className="shimmer-button dark-focus w-full rounded-full bg-[var(--champagne)] px-8 py-4 font-body text-[15px] font-semibold text-[var(--plum)] sm:w-auto"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Send with Love ♡
            </motion.button>

            <AnimatePresence>
              {submitted ? (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(240,217,191,0.3)] bg-[rgba(240,217,191,0.12)] px-4 py-2 font-body text-sm text-[var(--champagne)]"
                  role="status"
                >
                  <Heart size={16} fill="rgba(240,217,191,0.38)" aria-hidden="true" />
                  We can't wait to see you!
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </form>
      </div>
    </section>
  );
}
