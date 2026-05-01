import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { FloralDivider, FloatingPetal } from "../common/Decor";
import { wedding } from "../../data/weddingData";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { gsap } from "../../lib/gsap";

function GoldCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 60 C14 40, 26 22, 52 8"
        stroke="rgba(201,168,124,0.38)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M22 38 C14 34, 12 26, 18 20 C26 25, 28 32, 22 38Z"
        fill="rgba(201,168,124,0.07)"
        stroke="rgba(201,168,124,0.32)"
        strokeWidth="0.75"
      />
      <path
        d="M34 22 C27 15, 30 8, 38 5 C44 13, 42 20, 34 22Z"
        fill="rgba(240,217,191,0.06)"
        stroke="rgba(240,217,191,0.3)"
        strokeWidth="0.75"
      />
      <path
        d="M43 16 C51 11, 58 13, 62 21 C53 25, 47 22, 43 16Z"
        fill="rgba(201,168,124,0.06)"
        stroke="rgba(201,168,124,0.26)"
        strokeWidth="0.75"
      />
      <circle cx="10" cy="58" r="1.2" fill="rgba(201,168,124,0.35)" />
      <circle cx="54" cy="10" r="1.2" fill="rgba(201,168,124,0.35)" />
    </svg>
  );
}

export default function HeroInvitation() {
  const rootRef = useRef<HTMLElement | null>(null);
  const scrollAnimationRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();

  const revealInvitation = () => {
    const root = rootRef.current;
    if (!root) return;

    if (scrollAnimationRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationRef.current);
    }

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = Math.min(root.offsetTop + root.offsetHeight - window.innerHeight, maxScroll);
    const startY = window.scrollY;
    const distance = targetY - startY;

    if (Math.abs(distance) < 2 || prefersReducedMotion) {
      window.scrollTo(0, targetY);
      return;
    }

    const startedAt = window.performance.now();
    const duration = 1500;
    const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

    const step = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      window.scrollTo(0, startY + distance * easeOutCubic(progress));
      if (progress < 1) {
        scrollAnimationRef.current = window.requestAnimationFrame(step);
      } else {
        scrollAnimationRef.current = null;
      }
    };

    scrollAnimationRef.current = window.requestAnimationFrame(step);
  };

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.set(".wedding-card", { y: 36, opacity: 0 });
      gsap.set(".card-reveal", { y: 16, opacity: 0 });
      gsap.set(".envelope-top-flap", {
        rotateX: 0,
        transformPerspective: 1200,
        transformOrigin: "50% 0%"
      });

      const reveal = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.05
        }
      });

      reveal
        .to(".envelope-copy", { y: -34, opacity: 0, duration: 0.32 }, 0.02)
        .to(".envelope-seal", { scale: 0.38, opacity: 0, y: -28, duration: 0.34 }, 0.04)
        .to(".envelope-top-flap", { yPercent: -64, rotateX: -64, opacity: 0.32, duration: 0.72 }, 0.12)
        .to(".envelope-left-fold", { xPercent: -42, opacity: 0.2, duration: 0.68 }, 0.18)
        .to(".envelope-right-fold", { xPercent: 42, opacity: 0.2, duration: 0.68 }, 0.18)
        .to(".envelope-bottom-pocket", { yPercent: 42, opacity: 0.22, duration: 0.72 }, 0.2)
        .to(".envelope-shell", { opacity: 0, duration: 0.58 }, 0.36)
        .to(".wedding-card", { y: 0, opacity: 1, duration: 0.82 }, 0.42)
        .to(".card-reveal", { y: 0, opacity: 1, stagger: 0.07, duration: 0.42 }, 0.72)
        .to(".hero-scroll-hint", { opacity: 0, y: 16, duration: 0.25 }, 0.25);

      gsap.utils.toArray<HTMLElement>(".hero-petal").forEach((petal, index) => {
        gsap.to(petal, {
          x: index % 2 === 0 ? 8 : -8,
          y: index % 2 === 0 ? -12 : 12,
          rotate: index % 2 === 0 ? 8 : -8,
          duration: 5 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current !== null) {
        window.cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative h-[240svh]"
    >
      <div className="sticky top-0 h-[100dvh] min-h-[100svh] overflow-hidden">

        {/* Background photo */}
        <div
          className="absolute inset-0 bg-[url('/bg.webp')] bg-cover bg-center bg-no-repeat"
          aria-hidden="true"
        />
        {/* Premium dark overlay — rich and cinematic */}
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,4,1,0.84)_0%,rgba(14,7,2,0.52)_35%,rgba(14,7,2,0.56)_65%,rgba(8,4,1,0.88)_100%)]"
          aria-hidden="true"
        />
        {/* Edge vignette */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,rgba(0,0,0,0.5)_100%)]"
          aria-hidden="true"
        />

        {/* Envelope animation layer */}
        <div className="envelope-shell absolute inset-x-0 top-0 bottom-[-120px] z-10 overflow-hidden bg-[linear-gradient(145deg,#fffdfb_0%,#f7ead9_42%,#ead8c2_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,250,247,0.7),transparent_35%),linear-gradient(180deg,rgba(255,250,247,0.6),rgba(240,217,191,0.22))]" />

          <div className="envelope-top-flap absolute inset-x-0 top-0 z-40 h-[60dvh] [backface-visibility:hidden] [clip-path:polygon(0_0,100%_0,50%_100%)] [transform-style:preserve-3d] bg-[linear-gradient(180deg,#fffaf7_0%,#ead8c2_100%)] shadow-[0_18px_52px_rgba(78,61,66,0.12)]" />
          <div className="envelope-left-fold absolute top-0 bottom-[-120px] left-0 z-30 w-[62vw] [clip-path:polygon(0_0,100%_50%,0_100%)] bg-[linear-gradient(100deg,rgba(217,182,176,0.42),rgba(255,250,247,0.12))]" />
          <div className="envelope-right-fold absolute top-0 bottom-[-120px] right-0 z-30 w-[62vw] [clip-path:polygon(100%_0,0_50%,100%_100%)] bg-[linear-gradient(260deg,rgba(203,191,215,0.28),rgba(255,250,247,0.08))]" />
          <div className="envelope-bottom-pocket absolute inset-x-0 bottom-[-120px] z-35 h-[calc(72dvh+120px)] [clip-path:polygon(0_0,50%_32%,100%_0,100%_100%,0_100%)] bg-[linear-gradient(180deg,#f5e2ca_0%,#fffaf7_44%,#dcc09a_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]" />
          <div className="absolute left-1/2 top-1/2 z-50 h-px w-[86vw] max-w-5xl -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(201,168,124,0.55),transparent)]" />

          <FloatingPetal className="hero-petal absolute left-[9%] top-[16%] z-[55] h-5 w-4 -rotate-12 opacity-60" />
          <FloatingPetal className="hero-petal absolute right-[11%] top-[19%] z-[55] h-5 w-4 rotate-12 opacity-60" />
          <FloatingPetal className="hero-petal absolute bottom-[24%] left-[14%] z-[55] h-5 w-4 rotate-6 opacity-55" />
          <FloatingPetal className="hero-petal absolute bottom-[19%] right-[14%] z-[55] h-5 w-4 -rotate-6 opacity-55" />

          <div className="absolute inset-x-0 top-[28%] z-[60] flex justify-center px-6 md:top-[30%]">
            <div className="envelope-copy flex w-full max-w-[360px] flex-col items-center text-center">
              <p className="font-body text-[9px] font-semibold uppercase tracking-[0.24em] text-[rgba(78,61,66,0.48)] sm:text-[10px]">
                Together with their families
              </p>
              <p className="mt-5 font-script text-[58px] leading-none text-[var(--plum)] drop-shadow-[0_1px_0_rgba(255,255,255,0.72)] sm:text-[76px]">
                {wedding.brideFirst}
              </p>
              <span className="-my-1 font-display text-[26px] italic leading-none text-[rgba(78,61,66,0.62)]">
                &
              </span>
              <p className="font-script text-[58px] leading-none text-[var(--plum)] drop-shadow-[0_1px_0_rgba(255,255,255,0.72)] sm:text-[76px]">
                {wedding.groomFirst}
              </p>
              <p className="mt-8 font-body text-[10px] font-semibold uppercase tracking-[0.26em] text-[rgba(78,61,66,0.48)]">
                {wedding.date}
              </p>
            </div>
          </div>

          <div className="absolute inset-x-0 top-[58%] z-[65] flex justify-center">
            <button
              type="button"
              onClick={revealInvitation}
              className="envelope-seal light-focus flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(255,250,247,0.78)] bg-[linear-gradient(145deg,#e8cb91,#b9883f)] shadow-[0_16px_36px_rgba(78,61,66,0.24),inset_0_0_0_5px_rgba(255,250,247,0.17)] transition-transform duration-300 hover:scale-105 sm:h-20 sm:w-20"
              aria-label="Reveal wedding invitation"
            >
              <span className="font-display text-[9px] font-semibold uppercase tracking-[0.18em] text-[rgba(70,42,20,0.78)]">
                Open
              </span>
            </button>
          </div>
        </div>

        {/* Revealed content — floats over the dark background photo */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
          <article
            className={`wedding-card pointer-events-auto relative flex flex-col items-center text-center ${
              prefersReducedMotion ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Gold corner ornaments */}
            <GoldCorner className="pointer-events-none absolute -left-8 -top-8 opacity-80 sm:-left-12 sm:-top-12" />
            <GoldCorner className="pointer-events-none absolute -bottom-8 -right-8 rotate-180 opacity-80 sm:-bottom-12 sm:-right-12" />

            {/* Thin gold rule + label */}
            <div className="card-reveal mb-7 flex items-center gap-4">
              <div className="h-px w-10 bg-[linear-gradient(90deg,transparent,rgba(201,168,124,0.5))] sm:w-14" />
              <p className="font-body text-[8px] font-semibold uppercase tracking-[0.32em] text-[rgba(201,168,124,0.72)] sm:text-[9px]">
                Wedding Invitation
              </p>
              <div className="h-px w-10 bg-[linear-gradient(90deg,rgba(201,168,124,0.5),transparent)] sm:w-14" />
            </div>

            {/* Names */}
            <h1 className="card-reveal flex flex-col items-center gap-0.5">
              <span className="font-script text-[72px] leading-none text-white [text-shadow:0_4px_32px_rgba(201,168,124,0.22)] sm:text-[96px] md:text-[112px]">
                {wedding.brideFirst}
              </span>
              <span className="font-display text-[26px] italic leading-none text-[rgba(201,168,124,0.7)] sm:text-[30px]">
                &
              </span>
              <span className="font-script text-[72px] leading-none text-white [text-shadow:0_4px_32px_rgba(201,168,124,0.22)] sm:text-[96px] md:text-[112px]">
                {wedding.groomFirst}
              </span>
            </h1>

            {/* Floral divider — brightened for dark bg */}
            <div className="card-reveal mt-8 opacity-70 [filter:brightness(1.6)_saturate(0.5)]">
              <FloralDivider />
            </div>

            {/* Date */}
            <div className="card-reveal mt-8 space-y-1.5">
              <p className="font-body text-[9px] font-semibold uppercase tracking-[0.3em] text-[rgba(201,168,124,0.78)] sm:text-[10px]">
                {wedding.date}
              </p>
              <p className="font-display text-[20px] italic leading-snug text-[rgba(255,250,247,0.68)] sm:text-[23px]">
                {wedding.dateLong}
              </p>
            </div>

            {/* Venue */}
            <div className="card-reveal mt-5 flex items-start justify-center gap-2 text-center">
              <MapPin size={13} className="mt-[3px] shrink-0 text-[rgba(217,182,176,0.75)]" aria-hidden="true" />
              <p className="font-body text-[10px] font-medium uppercase leading-[1.9] tracking-[0.14em] text-[rgba(255,250,247,0.48)] sm:text-[11px]">
                {wedding.venue}
                <span className="block">{wedding.city}</span>
              </p>
            </div>

            {/* Thin rule before CTA */}
            <div className="card-reveal mt-8 h-px w-24 bg-[linear-gradient(90deg,transparent,rgba(201,168,124,0.3),transparent)]" />

            {/* CTA */}
            <div className="card-reveal mt-6">
              <motion.a
                href={wedding.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(201,168,124,0.35)] px-8 py-3 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgba(201,168,124,0.82)] backdrop-blur-[2px] transition-all duration-300 hover:border-[rgba(201,168,124,0.62)] hover:bg-[rgba(201,168,124,0.07)] hover:text-[rgba(240,217,191,1)] sm:text-[11px]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <MapPin size={12} aria-hidden="true" />
                View on Maps
              </motion.a>
            </div>
          </article>
        </div>

        {/* Scroll hint */}
        <div className="absolute inset-x-0 bottom-6 z-40 flex justify-center">
          <div className="hero-scroll-hint flex flex-col items-center text-[rgba(201,168,124,0.52)]">
            <span className="h-7 w-px bg-[rgba(201,168,124,0.28)]" />
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <ChevronDown size={18} />
            </motion.span>
            <span className="sr-only">Scroll to open invitation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
