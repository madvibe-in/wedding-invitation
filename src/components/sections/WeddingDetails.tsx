import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { FloralDivider, SectionNumber } from "../common/Decor";
import SectionReveal from "../common/SectionReveal";
import {
  receptionTimeline,
  weddingDayTimeline,
  type ScheduleItem
} from "../../data/weddingData";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { gsap } from "../../lib/gsap";

type TimelineCardProps = {
  eyebrow: string;
  title: string;
  note: string;
  items: ScheduleItem[];
  accent: "blush" | "champagne";
};

const accentStyles = {
  blush: {
    band: "from-[#f3ded9] to-[#d9b6b0]",
    icon: "bg-[rgba(217,182,176,0.24)] text-[rgba(112,67,67,0.9)]"
  },
  champagne: {
    band: "from-[#eee1cf] to-[#d8c5aa]",
    icon: "bg-[rgba(240,217,191,0.38)] text-[rgba(132,91,45,0.95)]"
  }
} as const;

function TimelineCard({ eyebrow, title, note, items, accent }: TimelineCardProps) {
  const styles = accentStyles[accent];

  return (
    <motion.article
      className="planning-card overflow-hidden rounded-[24px] border border-[rgba(217,182,176,0.42)] bg-[rgba(255,250,247,0.94)] shadow-[0_22px_64px_rgba(78,61,66,0.09)]"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className={`bg-linear-to-r ${styles.band} px-7 py-5 text-center`}>
        <p className="font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[rgba(78,61,66,0.58)]">
          {eyebrow}
        </p>
        <h3 className="mt-1 font-display text-[34px] font-light uppercase leading-none text-[var(--plum)]">
          {title}
        </h3>
      </div>

      <div className="px-6 py-8 sm:px-8">
        <p className="mx-auto max-w-sm text-center font-display text-[22px] italic leading-tight text-[rgba(78,61,66,0.7)]">
          {note}
        </p>
        <FloralDivider className="mx-auto mt-6" />

        <div className="mt-8">
          {items.map(({ time, title: itemTitle, detail, Icon }, index) => {
            const last = index === items.length - 1;

            return (
              <div key={`${time}-${itemTitle}`} className="grid grid-cols-[64px_1fr] gap-4">
                <time className="pt-1 text-right font-display text-xl leading-none text-[var(--plum)]">
                  {time}
                </time>
                <div className={`relative pl-8 ${last ? "pb-0" : "pb-7"}`}>
                  {!last ? (
                    <span
                      className="absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-px bg-[rgba(217,182,176,0.46)]"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span
                    className={`absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full ${styles.icon}`}
                  >
                    <Icon size={15} aria-hidden="true" />
                  </span>
                  <h4 className="font-display text-[24px] font-normal leading-tight text-[var(--plum)]">
                    {itemTitle}
                  </h4>
                  <p className="mt-1 font-body text-[13px] leading-[1.65] text-[rgba(78,61,66,0.64)]">
                    {detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}

export default function WeddingDetails() {
  const rootRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(".planning-card", {
        y: 54,
        opacity: 0,
        duration: 0.8,
        stagger: 0.16,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".planning-grid",
          start: "top 78%"
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="details"
      ref={rootRef}
      className="relative overflow-hidden bg-[var(--pearl)] px-4 py-20 md:px-8 md:py-28"
    >
      <SectionNumber>03</SectionNumber>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(217,182,176,0.22),transparent_28%),radial-gradient(circle_at_85%_80%,rgba(240,217,191,0.24),transparent_30%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionReveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="font-script text-[46px] leading-none text-[var(--champagne-dk)]">
            Wedding
          </p>
          <h2 className="font-display text-5xl font-light uppercase leading-none text-[var(--plum)] md:text-7xl">
            Timeline
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-[14px] leading-[1.8] text-[rgba(78,61,66,0.64)] md:text-[15px]">
            A clear flow for the ceremony and reception, designed to feel graceful on the day and easy for guests to follow.
          </p>
        </SectionReveal>

        <div className="planning-grid grid gap-6 lg:grid-cols-2 lg:items-start">
          <TimelineCard
            eyebrow="Wedding day planning"
            title="Ceremony"
            note="From morning blessings to dinner with the families."
            items={weddingDayTimeline}
            accent="blush"
          />
          <TimelineCard
            eyebrow="Reception day planning"
            title="Reception"
            note="An evening of greetings, dinner, music, and celebration."
            items={receptionTimeline}
            accent="champagne"
          />
        </div>
      </div>
    </section>
  );
}
