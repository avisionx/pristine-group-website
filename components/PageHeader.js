import clsx from "clsx";
import Kicker from "./Kicker";

// Inner-page header. With `image` it renders a cinematic media band (white text
// over a darkened photo); without, a calm cream band. Both pad the top to clear
// the fixed navbar.
export default function PageHeader({ kicker, title, subtitle, image, align = "left" }) {
  const center = align === "center";

  if (image) {
    return (
      <header className="relative flex min-h-[58svh] items-end overflow-hidden bg-ink">
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70 animate-kenburns"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-ink/30" />
        <div
          className={clsx(
            "relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-36 sm:px-8 sm:pt-44",
            center && "text-center",
          )}
        >
          {kicker ? (
            <div className={clsx(center && "flex justify-center")}>
              <Kicker light>{kicker}</Kicker>
            </div>
          ) : null}
          <h1 className="mt-5 max-w-4xl font-display text-[2.6rem] leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-5 max-w-2xl text-pretty text-lg italic text-white/80">{subtitle}</p>
          ) : null}
        </div>
      </header>
    );
  }

  return (
    <header className="bg-cream">
      <div
        className={clsx(
          "mx-auto max-w-7xl px-5 pb-12 pt-32 sm:px-8 sm:pt-44",
          center && "text-center",
        )}
      >
        {kicker ? (
          <div className={clsx(center && "flex justify-center")}>
            <Kicker>{kicker}</Kicker>
          </div>
        ) : null}
        <h1 className="mt-5 max-w-4xl font-display text-[2.6rem] leading-[1.04] text-ink sm:text-6xl lg:text-[4.2rem]">
          {title}
        </h1>
        {subtitle ? (
          <p
            className={clsx(
              "mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft",
              center && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        ) : null}
        <span className={clsx("hairline mt-8 block", center && "mx-auto")} />
      </div>
    </header>
  );
}
