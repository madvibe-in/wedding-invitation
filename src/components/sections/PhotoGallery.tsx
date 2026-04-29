import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SectionNumber } from "../common/Decor";
import SectionHeading from "../common/SectionHeading";
import { galleryImages } from "../../data/weddingData";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { gsap } from "../../lib/gsap";

export default function PhotoGallery() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();

  const close = useCallback(() => setActiveIndex(null), []);
  const showNext = useCallback(() => {
    setActiveIndex((index) => (index === null ? 0 : (index + 1) % galleryImages.length));
  }, []);
  const showPrevious = useCallback(() => {
    setActiveIndex((index) =>
      index === null ? galleryImages.length - 1 : (index - 1 + galleryImages.length) % galleryImages.length
    );
  }, []);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(".gallery-item", {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".gallery-masonry",
          start: "top 85%"
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (activeIndex === null) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
      if (event.key === "ArrowRight") {
        showNext();
      }
      if (event.key === "ArrowLeft") {
        showPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, close, showNext, showPrevious]);

  const activeImage = activeIndex === null ? null : galleryImages[activeIndex];

  return (
    <section
      id="gallery"
      ref={rootRef}
      className="section-pad relative overflow-hidden bg-[var(--ivory)] px-4 md:px-8"
    >
      <SectionNumber>03</SectionNumber>
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading label="Our Moments" title="A Lifetime of Frames" />

        <div className="gallery-masonry">
          {galleryImages.map((image, index) => (
            <motion.button
              key={image.src}
              type="button"
              className="gallery-item light-focus block w-full cursor-zoom-in overflow-hidden rounded-[20px] bg-[var(--pearl)] text-left shadow-[0_12px_34px_rgba(78,61,66,0.08)]"
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              aria-label={`Open gallery image ${index + 1}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-auto w-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(78,61,66,0.92)] px-4 py-8 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Wedding photo lightbox"
          >
            <motion.img
              key={activeImage.src}
              src={activeImage.src.replace("w=600", "w=1400")}
              alt={activeImage.alt}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            />
            <motion.button
              type="button"
              className="dark-focus absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,250,247,0.25)] bg-[rgba(255,250,247,0.08)] text-[var(--pearl)]"
              onClick={(event) => {
                event.stopPropagation();
                close();
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close gallery lightbox"
            >
              <X size={20} />
            </motion.button>
            <motion.button
              type="button"
              className="dark-focus absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(255,250,247,0.22)] bg-[rgba(255,250,247,0.08)] text-[var(--pearl)] md:left-8"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Show previous photo"
            >
              <ChevronLeft size={22} />
            </motion.button>
            <motion.button
              type="button"
              className="dark-focus absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(255,250,247,0.22)] bg-[rgba(255,250,247,0.08)] text-[var(--pearl)] md:right-8"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Show next photo"
            >
              <ChevronRight size={22} />
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
