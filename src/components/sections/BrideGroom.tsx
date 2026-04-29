import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useRef } from "react";
import { BotanicalAccent, FloralDivider, SectionNumber } from "../common/Decor";
import SectionHeading from "../common/SectionHeading";
import SectionReveal from "../common/SectionReveal";
import { people, type Person } from "../../data/weddingData";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { gsap } from "../../lib/gsap";

function PersonCard({ person, className = "" }: { person: Person; className?: string }) {
  const isLavender = person.accent === "lavender";

  return (
    <motion.article
      className={`person-card overflow-hidden rounded-[32px] border border-[rgba(217,182,176,0.35)] ${
        isLavender ? "bg-[rgba(203,191,215,0.12)]" : "bg-[var(--pearl)]"
      } shadow-[0_24px_70px_rgba(78,61,66,0.08)] ${className}`}
      whileHover="hover"
    >
      <div className="relative h-[340px] overflow-hidden md:h-[390px]">
        <motion.img
          src={person.image}
          alt={person.alt}
          loading="lazy"
          className="h-full w-full object-cover brightness-[1.02] saturate-[0.9]"
          variants={{
            hover: {
              scale: 1.04,
              transition: { duration: 0.6, ease: "easeOut" }
            }
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(248,242,239,0.9)] to-transparent" />
      </div>

      <div className="px-7 pb-8 pt-7 md:px-9">
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgba(78,61,66,0.48)]">
          {person.role}
        </p>
        <h3 className="mt-2 font-display text-4xl font-light leading-tight text-[var(--plum)]">
          {person.name}
        </h3>
        <p
          className={`mt-1 font-script text-[26px] leading-none ${
            isLavender ? "text-[var(--lavender)]" : "text-[var(--blush)]"
          }`}
        >
          {person.tagline}
        </p>
        <p className="mt-5 font-body text-sm leading-[1.75] text-[rgba(78,61,66,0.72)]">
          {person.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {person.favorites.map((favorite) => (
            <span
              key={favorite}
              className="rounded-full border border-[rgba(201,168,124,0.2)] bg-[rgba(240,217,191,0.2)] px-3 py-1 font-body text-[11px] text-[var(--plum)]"
            >
              ✦ {favorite}
            </span>
          ))}
        </div>
        <div className="mt-7 flex items-center justify-between gap-6">
          <span
            className={`inline-block rotate-[3deg] font-script text-[38px] leading-none ${
              isLavender ? "text-[var(--lavender)]" : "text-[var(--blush)]"
            }`}
          >
            {person.signature}
          </span>
          <FloralDivider className="w-32 opacity-80" />
        </div>
      </div>
    </motion.article>
  );
}

export default function BrideGroom() {
  const rootRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(".bride-card", {
        x: -60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".people-grid",
          start: "top 75%"
        }
      });

      gsap.from(".groom-card", {
        x: 60,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".people-grid",
          start: "top 75%"
        }
      });

      gsap.to(".botanical-scroll", {
        rotate: 4,
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="story"
      ref={rootRef}
      className="section-pad relative overflow-hidden bg-[linear-gradient(160deg,#f8f2ef_0%,#fffaf7_50%,#f0e8f4_100%)] px-4 md:px-8"
    >
      <SectionNumber>02</SectionNumber>
      <BotanicalAccent className="botanical-scroll absolute left-5 top-12 opacity-80" />
      <BotanicalAccent className="botanical-scroll absolute bottom-16 right-5 rotate-180 opacity-80" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading label="The Souls" title="Two Hearts, One Story" accent="lavender" italic />

        <div className="people-grid grid gap-6 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
          <PersonCard person={people[0]} className="bride-card" />
          <PersonCard person={people[1]} className="groom-card lg:mt-16" />
        </div>

        <SectionReveal className="mx-auto mt-16 max-w-3xl text-center">
          <blockquote className="font-display text-[22px] italic leading-[1.45] text-[rgba(78,61,66,0.82)] md:text-[28px]">
            “Met at a rooftop in Bombay, fell in love over terrible coffee, and decided the world
            is better as two.”
          </blockquote>
          <div className="mt-6 flex flex-col items-center gap-2">
            <Heart size={18} className="text-[var(--blush)]" fill="rgba(217,182,176,0.22)" />
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgba(217,182,176,0.72)]">
              Since 2021
            </span>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
