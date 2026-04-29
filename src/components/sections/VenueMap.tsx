import { motion } from "framer-motion";
import { ExternalLink, MapPin, Navigation } from "lucide-react";
import { useEffect, useRef } from "react";
import { SectionNumber } from "../common/Decor";
import SectionReveal from "../common/SectionReveal";
import { travelRows, venueAddress, wedding } from "../../data/weddingData";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { gsap } from "../../lib/gsap";

export default function VenueMap() {
  const rootRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(".venue-info-card", {
        y: 56,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".venue-info-card",
          start: "top 80%"
        }
      });

      gsap.to(".venue-image", {
        scale: 1.08,
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
      id="venue"
      ref={rootRef}
      className="relative overflow-hidden bg-[var(--ivory)] px-4 py-20 md:px-8 md:py-28"
    >
      <SectionNumber>02</SectionNumber>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,var(--pearl),rgba(248,242,239,0))]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <SectionReveal className="mx-auto mb-10 max-w-xl text-center">
          <p className="font-script text-[46px] leading-none text-[var(--champagne-dk)]">
            The
          </p>
          <h2 className="font-display text-5xl font-light uppercase leading-none text-[var(--plum)] md:text-7xl">
            Details
          </h2>
        </SectionReveal>

        <motion.article
          className="venue-info-card overflow-hidden rounded-[22px] border border-[rgba(217,182,176,0.46)] bg-[var(--pearl)] shadow-[0_24px_70px_rgba(78,61,66,0.11)]"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <div className="relative h-[236px] overflow-hidden sm:h-[320px]">
            <img
              src={wedding.venueImage}
              alt="Elegant outdoor wedding ceremony venue"
              loading="lazy"
              className="venue-image h-full w-full object-cover object-center"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(32,24,28,0.04)_0%,rgba(32,24,28,0.22)_100%)]"
              aria-hidden="true"
            />
          </div>

          <div className="bg-[linear-gradient(90deg,#eee1cf,#d8c5aa)] px-6 py-3 text-center">
            <p className="font-display text-[15px] uppercase tracking-[0.12em] text-[var(--plum)]">
              Location
            </p>
          </div>

          <div className="px-6 py-8 text-center sm:px-10">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(217,182,176,0.24)] text-[var(--plum)]">
              <MapPin size={20} aria-hidden="true" />
            </div>

            <h3 className="mt-5 font-display text-3xl font-light leading-tight text-[var(--plum)]">
              {wedding.venue}
            </h3>

            <address className="mt-4 not-italic font-body text-[13px] uppercase leading-[1.8] tracking-[0.08em] text-[rgba(78,61,66,0.62)]">
              {venueAddress.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            <div className="mx-auto my-7 h-px max-w-xs bg-[linear-gradient(90deg,transparent,rgba(217,182,176,0.62),transparent)]" />

            <div className="grid gap-3 text-left sm:grid-cols-3">
              {travelRows.map(({ Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 rounded-2xl border border-[rgba(217,182,176,0.28)] bg-[rgba(248,242,239,0.58)] px-4 py-3 font-body text-[12px] leading-snug text-[rgba(78,61,66,0.66)]"
                >
                  <Icon size={16} className="shrink-0 text-[var(--champagne-dk)]" aria-hidden="true" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <motion.a
              href={wedding.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="light-focus mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#eee1cf,#d8c5aa)] px-7 py-4 font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--plum)] shadow-[0_14px_34px_rgba(78,61,66,0.1)] sm:w-auto sm:min-w-[260px]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Navigation size={16} aria-hidden="true" />
              Google map
              <ExternalLink size={14} aria-hidden="true" />
            </motion.a>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
