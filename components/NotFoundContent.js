"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { logos } from "@/lib/site";
import LogoLockup from "./LogoLockup";

// A static host serves one /404.html for every missing route, so the locale
// can't be known at build time. We read it from the URL on the client and pick
// the matching translation (passed in for every locale). Initial paint is the
// default locale to match the prerendered HTML; it swaps after hydration.
export default function NotFoundContent({ strings, defaultLocale, locales }) {
  const [lang, setLang] = useState(defaultLocale);

  useEffect(() => {
    const seg = window.location.pathname.split("/").filter(Boolean)[0];
    const next = seg && locales.includes(seg) ? seg : defaultLocale;
    setLang(next);
    document.documentElement.lang = next;
    const t = strings[next];
    if (t?.title) document.title = `${t.title} · Gupta's Pristine Group`;
  }, [locales, defaultLocale, strings]);

  const t = strings[lang] || strings[defaultLocale];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <LogoLockup
        mainSrc={logos.color}
        variant="light"
        mainClassName="h-12 w-auto"
        heritageClassName="h-12 w-auto"
        dividerClassName="h-9"
      />
      <p className="text-gradient mt-12 font-display text-[7rem] leading-none">404</p>
      <h1 className="mt-1 font-display text-3xl text-ink">{t.title}</h1>
      <p className="mt-3 max-w-sm text-ink-soft">{t.subtitle}</p>
      <Link
        href={`/${lang}/`}
        className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-ink/90"
      >
        {t.back}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
