import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems, wedding } from "../../data/weddingData";

export default function FloatingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  return (
    <motion.header
      role="navigation"
      aria-label="Wedding invitation navigation"
      className="sticky top-0 z-50 border-b border-[rgba(217,182,176,0.3)] bg-[rgba(248,242,239,0.85)] backdrop-blur-md"
      animate={{
        boxShadow: scrolled ? "0 4px 24px rgba(78,61,66,0.08)" : "0 0 0 rgba(78,61,66,0)"
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-[72px] md:px-8">
        <a
          href="#hero"
          className="light-focus font-script text-[28px] leading-none text-[var(--plum)]"
          aria-label="Riya and Arjun wedding home"
        >
          R ✦ A
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="light-focus border-b border-transparent pb-1 font-body text-xs font-medium uppercase tracking-[0.12em] text-[rgba(78,61,66,0.7)] transition duration-200 hover:border-[var(--blush)] hover:text-[var(--plum)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <span className="hidden rounded-full border border-[rgba(201,168,124,0.4)] bg-[rgba(240,217,191,0.3)] px-3 py-1 font-body text-[11px] font-semibold tracking-[0.18em] text-[var(--plum)] sm:inline-flex">
            {wedding.datePill}
          </span>
          <motion.a
            href="#rsvp"
            className="dark-focus hidden rounded-full bg-[var(--plum)] px-4 py-2 font-body text-xs font-semibold text-[var(--pearl)] transition-colors duration-200 hover:bg-[var(--champagne-dk)] md:inline-flex"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Reserve Your Seat
          </motion.a>
          <button
            type="button"
            className="light-focus inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(217,182,176,0.45)] bg-[rgba(255,250,247,0.5)] text-[var(--plum)] lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="border-t border-[rgba(217,182,176,0.25)] bg-[rgba(248,242,239,0.96)] px-4 py-5 shadow-[0_16px_40px_rgba(78,61,66,0.08)] lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="light-focus font-body text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(78,61,66,0.72)]"
                >
                  {item.label}
                </a>
              ))}
              <motion.a
                href="#rsvp"
                onClick={() => setMenuOpen(false)}
                className="dark-focus mt-2 inline-flex w-max rounded-full bg-[var(--plum)] px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.12em] text-[var(--pearl)]"
                whileTap={{ scale: 0.97 }}
              >
                Reserve
              </motion.a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
