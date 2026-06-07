import clsx from "clsx";
import Kicker from "./Kicker";

// Reusable editorial section header: eyebrow kicker + serif display title +
// optional supporting subtitle. Presentational (server) — wrap in <Reveal> at
// the call site when an entrance animation is wanted.
export default function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
  light = false,
  as: Tag = "h2",
  className,
  titleClassName,
}) {
  const center = align === "center";
  return (
    <div className={clsx(center ? "mx-auto max-w-3xl text-center" : "max-w-2xl", className)}>
      {kicker ? <Kicker light={light}>{kicker}</Kicker> : null}
      <Tag
        className={clsx(
          "mt-5 text-[2.1rem] leading-[1.08] text-pretty sm:text-5xl lg:text-[3.3rem]",
          light ? "text-white" : "text-ink",
          titleClassName,
        )}
      >
        {title}
      </Tag>
      {subtitle ? (
        <p
          className={clsx(
            "mt-5 text-base leading-relaxed text-pretty sm:text-lg",
            light ? "text-white/75" : "text-ink-soft",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
