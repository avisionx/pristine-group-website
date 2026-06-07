import clsx from "clsx";
import { logos } from "@/lib/site";

// Primary "Gupta's Pristine" wordmark + a vertical divider + the heritage
// "Gupta's — Since 1973" emblem. The heritage asset has a baked-in white
// background (its building is white, so it can't be keyed out), so a rounded
// frame makes it read as an intentional seal on both light and dark surfaces.
//
// Plain presentational component — safe to use from server or client components.
export default function LogoLockup({
  mainSrc,
  variant = "light",
  className,
  mainClassName = "h-12 w-auto sm:h-16",
  heritageClassName = "h-12 w-auto sm:h-16",
  dividerClassName = "h-12 sm:h-16",
}) {
  const onDark = variant === "dark";
  return (
    <span className={clsx("flex items-center gap-3 sm:gap-4", className)}>
      <img src={mainSrc} alt="Gupta's Pristine Group" className={mainClassName} />
      <span
        aria-hidden
        className={clsx("w-px shrink-0", dividerClassName, onDark ? "bg-white/30" : "bg-ink/15")}
      />
      <img
        src={logos.heritage}
        alt="Gupta's — Since 1973"
        className={clsx("w-auto shrink-0", heritageClassName)}
      />
    </span>
  );
}
