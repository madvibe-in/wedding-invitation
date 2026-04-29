import SectionReveal from "./SectionReveal";

type SectionHeadingProps = {
  label: string;
  title: string;
  subtitle?: string;
  accent?: "blush" | "lavender";
  italic?: boolean;
};

export default function SectionHeading({
  label,
  title,
  subtitle,
  accent = "blush",
  italic = false
}: SectionHeadingProps) {
  const accentColor = accent === "lavender" ? "text-[var(--lavender)]" : "text-[var(--blush)]";

  return (
    <SectionReveal className="relative z-10 mx-auto mb-14 max-w-3xl text-center">
      <p className={`font-body text-[11px] font-semibold uppercase tracking-[0.2em] ${accentColor}`}>
        {label}
      </p>
      <h2
        className={`mt-4 font-display text-5xl font-light leading-[0.98] text-[var(--plum)] md:text-7xl ${
          italic ? "italic" : ""
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-5 max-w-2xl font-body text-[15px] leading-[1.75] text-[rgba(78,61,66,0.68)] md:text-[17px]">
          {subtitle}
        </p>
      ) : null}
    </SectionReveal>
  );
}
