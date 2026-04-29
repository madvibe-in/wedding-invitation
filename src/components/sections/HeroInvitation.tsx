import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { FloralDivider, FloatingPetal } from "../common/Decor";
import { wedding } from "../../data/weddingData";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { gsap } from "../../lib/gsap";

function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="78"
      height="78"
      viewBox="0 0 78 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 64 C17 43, 29 24, 54 12"
        stroke="rgba(183,203,181,0.42)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M25 41 C17 37, 15 29, 21 24 C29 29, 31 35, 25 41Z"
        fill="rgba(183,203,181,0.12)"
        stroke="rgba(183,203,181,0.38)"
        strokeWidth="0.8"
      />
      <path
        d="M37 26 C30 19, 33 11, 41 8 C47 16, 45 23, 37 26Z"
        fill="rgba(217,182,176,0.12)"
        stroke="rgba(217,182,176,0.42)"
        strokeWidth="0.8"
      />
      <path
        d="M45 20 C53 15, 61 17, 65 25 C56 29, 49 27, 45 20Z"
        fill="rgba(240,217,191,0.16)"
        stroke="rgba(201,168,124,0.36)"
        strokeWidth="0.8"
      />
    </svg>
  );
}

export default function HeroInvitation() {
  const rootRef = useRef<HTMLElement | null>(null);
  const scrollAnimationRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();

  const revealInvitation = () => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

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
    if (!rootRef.current || prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(".wedding-card", { y: 64, opacity: 0, scale: 0.96 });
      gsap.set(".card-reveal", { y: 22, opacity: 0 });
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
        .to(".envelope-shell", { opacity: 0.22, duration: 0.58 }, 0.36)
        .to(".wedding-card", { y: 0, opacity: 1, scale: 1, duration: 0.82 }, 0.42)
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
      className="relative h-[240svh] bg-[linear-gradient(145deg,#f8f2ef_0%,#fffaf7_42%,#f0e8f4_100%)]"
    >
      <div className="sticky top-0 h-[100dvh] min-h-[100svh] overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(240,217,191,0.5),transparent_34%),radial-gradient(circle_at_12%_82%,rgba(183,203,181,0.2),transparent_30%),radial-gradient(circle_at_88%_78%,rgba(203,191,215,0.25),transparent_32%)]"
          aria-hidden="true"
        />

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
                RSVP
              </span>
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center px-4 py-5">
          <article
            className={`wedding-card relative flex h-[min(84svh,620px)] w-[min(90vw,430px)] flex-col items-center justify-center overflow-hidden rounded-[28px] border border-[rgba(217,182,176,0.62)] bg-[rgba(255,253,251,0.985)] px-7 py-8 text-center opacity-0 shadow-[0_24px_78px_rgba(78,61,66,0.18)] ${
              prefersReducedMotion ? "opacity-100" : ""
            }`}
          >
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(240,217,191,0.32),transparent_30%),linear-gradient(180deg,#fffdfb_0%,#fffaf7_52%,#f8f2ef_100%)]"
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-4 rounded-[22px] border border-[rgba(201,168,124,0.18)]" />
            <CornerOrnament className="pointer-events-none absolute left-2 top-2 opacity-90" />
            <CornerOrnament className="pointer-events-none absolute bottom-2 right-2 rotate-180 opacity-90" />
            <div className="pointer-events-none absolute left-6 right-6 top-6 h-px bg-[linear-gradient(90deg,transparent,rgba(201,168,124,0.5),transparent)]" />
            <div className="pointer-events-none absolute bottom-6 left-6 right-6 h-px bg-[linear-gradient(90deg,transparent,rgba(201,168,124,0.5),transparent)]" />

            <div className="relative z-10 mx-auto flex w-full max-w-[320px] flex-col items-center">
              <p className="card-reveal font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-[rgba(78,61,66,0.52)]">
                Wedding invitation
              </p>

              <h1 className="card-reveal mt-7 font-display text-[54px] font-light leading-[0.9] text-[var(--plum)] sm:text-[64px]">
                <span className="block">{wedding.brideFirst}</span>
                <span className="block font-display text-[29px] italic leading-none text-[rgba(78,61,66,0.62)]">
                  &
                </span>
                <span className="block">{wedding.groomFirst}</span>
              </h1>

              <FloralDivider className="card-reveal mx-auto mt-7" />

              <div className="card-reveal mt-7 space-y-3">
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--champagne-dk)]">
                  {wedding.date}
                </p>
                <p className="mx-auto max-w-[280px] font-display text-[22px] italic leading-tight text-[rgba(78,61,66,0.78)]">
                  {wedding.dateLong}
                </p>
              </div>

              <div className="card-reveal mt-7 flex items-start justify-center gap-2 text-center">
                <MapPin size={17} className="mt-1 shrink-0 text-[var(--blush)]" aria-hidden="true" />
                <p className="font-body text-[12px] font-medium uppercase leading-[1.7] tracking-[0.12em] text-[rgba(78,61,66,0.64)]">
                  {wedding.venue}
                  <span className="block">{wedding.city}</span>
                </p>
              </div>

              <div className="card-reveal mt-9 flex w-full flex-col gap-3">
                <motion.a
                  href={wedding.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="light-focus pointer-events-auto rounded-full border border-[rgba(78,61,66,0.18)] bg-[rgba(255,250,247,0.68)] px-6 py-3 font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[rgba(78,61,66,0.7)]"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Google map
                </motion.a>
              </div>
            </div>
          </article>
        </div>

        <div className="absolute inset-x-0 bottom-5 z-40 flex justify-center">
          <div className="hero-scroll-hint flex flex-col items-center text-[rgba(78,61,66,0.58)]">
            <span className="h-8 w-px bg-[rgba(78,61,66,0.22)]" />
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <ChevronDown size={19} />
            </motion.span>
            <span className="sr-only">Scroll to open invitation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
