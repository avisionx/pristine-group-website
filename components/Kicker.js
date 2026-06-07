import clsx from "clsx";

// Small tracked label with a leading hairline — the recurring section eyebrow.
export default function Kicker({ children, light = false, className }) {
  return (
    <span
      className={clsx(
        "kicker inline-flex items-center gap-3",
        light ? "text-white/80" : "text-brand-red",
        className,
      )}
    >
      <span
        aria-hidden
        className={clsx("h-px w-7", light ? "bg-white/45" : "bg-brand-red/55")}
      />
      {children}
    </span>
  );
}
