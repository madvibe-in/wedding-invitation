import { motion } from "framer-motion";
import { Shirt } from "lucide-react";
import { useEffect, useRef } from "react";
import { FloralDivider, InstagramGlyph } from "../common/Decor";
import { footerLinks, wedding } from "../../data/weddingData";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { gsap } from "../../lib/gsap";

export default function ElegantFooter() {
  const rootRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(".footer-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%"
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <footer
      ref={rootRef}
      className="relative min-h-[400px] bg-[linear-gradient(180deg,var(--plum)_0%,#2e2028_100%)] px-4 py-20 text-center md:px-8"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <FloralDivider muted className="footer-reveal" />
        <div className="footer-reveal mt-8 font-script text-[52px] leading-none text-[var(--champagne)]">
          {wedding.couple}
        </div>
        <p className="footer-reveal mt-5 font-body text-[13px] uppercase tracking-[0.16em] text-[rgba(255,250,247,0.5)]">
          {wedding.date} - {wedding.city}
        </p>
        <FloralDivider muted className="footer-reveal mt-8 rotate-180" />

        <div className="footer-reveal mt-10 flex items-center justify-center gap-3">
          {footerLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="dark-focus flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(217,182,176,0.2)] bg-[rgba(255,250,247,0.08)] text-[var(--pearl)]"
              whileHover={{ scale: 1.12, rotate: 5 }}
              whileTap={{ scale: 0.96 }}
            >
              {"Icon" in link ? <link.Icon size={18} aria-hidden="true" /> : <InstagramGlyph />}
            </motion.a>
          ))}
        </div>

        <div className="footer-reveal mt-8 inline-flex items-center gap-2 rounded-full border border-[rgba(240,217,191,0.2)] bg-[rgba(240,217,191,0.1)] px-4 py-2 font-body text-xs text-[rgba(240,217,191,0.8)]">
          <Shirt size={15} aria-hidden="true" />
          Dress Code: Traditional & Black Tie
        </div>

        <p className="footer-reveal mt-8 font-display text-xl italic text-[rgba(255,250,247,0.6)]">
          We can't wait to celebrate with you.
        </p>

        <div className="footer-reveal mt-10 h-px w-full max-w-md bg-[rgba(217,182,176,0.2)]" />

        <p className="footer-reveal mt-8 font-body text-[11px] text-[rgba(255,250,247,0.3)]">
          Copyright 2027 {wedding.couple} | Made with love in {wedding.city}
        </p>
      </div>
    </footer>
  );
}
