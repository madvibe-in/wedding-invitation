import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import CustomCursor from "./components/common/CustomCursor";
import ScrollProgress from "./components/common/ScrollProgress";
import CountdownSection from "./components/sections/CountdownSection";
import ElegantFooter from "./components/sections/ElegantFooter";
import HeroInvitation from "./components/sections/HeroInvitation";
import VenueMap from "./components/sections/VenueMap";
import WeddingDetails from "./components/sections/WeddingDetails";
import { useDocumentMeta } from "./hooks/useDocumentMeta";
import { useFontsReady } from "./hooks/useFontsReady";
import { useReducedMotionPreference } from "./hooks/useReducedMotionPreference";
import { gsap } from "./lib/gsap";

export default function App() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const fontsReady = useFontsReady();
  const prefersReducedMotion = useReducedMotionPreference();

  useDocumentMeta();

  useEffect(() => {
    if (!rootRef.current || !fontsReady || prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      [
        { trigger: "#countdown", color: "#fffaf7" },
        { trigger: "#venue", color: "#f8f2ef" },
        { trigger: "#details", color: "#fffaf7" },
        { trigger: "footer", color: "#4e3d42" }
      ].forEach(({ trigger, color }) => {
        gsap.to("body", {
          backgroundColor: color,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top 65%",
            end: "bottom 35%",
            scrub: true
          }
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [fontsReady, prefersReducedMotion]);

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
      <CustomCursor disabled={prefersReducedMotion} />
      <ScrollProgress />
      <AnimatePresence mode="wait">
        {fontsReady ? (
          <motion.div
            key="invitation"
            ref={rootRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="min-h-screen bg-[var(--ivory)]"
          >
            <main>
              <HeroInvitation />
              <CountdownSection />
              <VenueMap />
              <WeddingDetails />
            </main>
            <ElegantFooter />
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            className="fixed inset-0 bg-[var(--ivory)]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
