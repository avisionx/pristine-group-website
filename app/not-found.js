import Link from "next/link";
import { i18n } from "@/lib/i18n-config";
import { logos } from "@/lib/site";
import LogoLockup from "@/components/LogoLockup";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  const home = `/${i18n.defaultLocale}/`;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <LogoLockup
        mainSrc={logos.color}
        variant="light"
        mainClassName="h-12 w-auto"
        heritageClassName="h-12 w-auto"
        dividerClassName="h-9"
      />
      <p className="mt-12 font-display text-[7rem] leading-none text-gradient">404</p>
      <h1 className="mt-1 font-display text-3xl text-ink">Page not found</h1>
      <p className="mt-3 max-w-sm text-ink-soft">
        Looks like you&apos;ve wandered off the blueprint.
      </p>
      <Link
        href={home}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-ink/90"
      >
        Back to Home
      </Link>
    </div>
  );
}
