type ClassNameProps = {
  className?: string;
};

type FloralDividerProps = ClassNameProps & {
  muted?: boolean;
};

export function FloralDivider({ className = "", muted = false }: FloralDividerProps) {
  return (
    <svg
      className={className}
      width="160"
      height="20"
      viewBox="0 0 160 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        className="floral-draw"
        d="M8 10 C35 2, 55 2, 80 10 C105 18, 126 18, 152 10"
        stroke={muted ? "rgba(217,182,176,0.3)" : "rgba(217,182,176,0.65)"}
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        className="floral-draw"
        d="M47 6 C43 2, 38 1, 35 5 C39 8, 44 9, 47 6Z M111 14 C116 18, 122 18, 125 13 C119 11, 115 11, 111 14Z M78 9 C75 5, 75 2, 80 1 C84 4, 84 7, 80 10Z"
        stroke={muted ? "rgba(217,182,176,0.3)" : "rgba(217,182,176,0.55)"}
        strokeWidth="0.8"
        fill="none"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="8.5" r="1.4" fill="rgba(217,182,176,0.55)" />
      <circle cx="136" cy="11.5" r="1.4" fill="rgba(217,182,176,0.55)" />
    </svg>
  );
}

export function BotanicalAccent({ className = "" }: ClassNameProps) {
  return (
    <svg
      className={className}
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M18 66 C28 46, 36 27, 61 13"
        stroke="rgba(183,203,181,0.42)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {[
        "M30 44 C20 41, 15 34, 18 26 C27 29, 31 35, 30 44Z",
        "M39 30 C29 26, 27 18, 32 12 C40 17, 43 23, 39 30Z",
        "M48 23 C48 13, 54 8, 62 8 C63 17, 57 23, 48 23Z",
        "M24 56 C16 55, 10 50, 10 43 C18 43, 24 48, 24 56Z",
        "M50 20 C59 21, 65 27, 65 35 C56 34, 51 29, 50 20Z"
      ].map((d) => (
        <path
          key={d}
          d={d}
          fill="rgba(183,203,181,0.13)"
          stroke="rgba(183,203,181,0.36)"
          strokeWidth="0.8"
        />
      ))}
    </svg>
  );
}

export function FloatingPetal({ className = "" }: ClassNameProps) {
  return (
    <svg
      className={className}
      width="12"
      height="18"
      viewBox="0 0 12 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5.8 1.1 C11.1 5.4, 13 12.2, 6.6 17.1 C0.7 13.8, -0.6 6.7, 5.8 1.1Z"
        fill="rgba(217,182,176,0.22)"
      />
    </svg>
  );
}

export function SectionWave({ className = "" }: ClassNameProps) {
  return (
    <div className={`pointer-events-none h-8 overflow-hidden ${className}`} aria-hidden="true">
      <svg width="100%" height="32" viewBox="0 0 1440 32" preserveAspectRatio="none">
        <path
          d="M0 18 C220 36, 430 0, 720 17 C970 32, 1180 4, 1440 18"
          stroke="rgba(217,182,176,0.22)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}

export function SectionNumber({ children }: { children: string }) {
  return (
    <span
      className="pointer-events-none absolute right-4 top-8 z-0 select-none font-display text-[120px] font-bold leading-none text-[rgba(78,61,66,0.045)] md:right-10 md:text-[160px]"
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export function InstagramGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.3" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}
