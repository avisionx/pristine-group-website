"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Languages } from "lucide-react";
import clsx from "clsx";
import { i18n } from "@/lib/i18n-config";

// Swaps the leading /<lang>/ segment of the current path. Hidden automatically
// while only one locale exists; ready the moment another is registered.
export default function LanguageSwitcher({ lang, light = false }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (i18n.locales.length <= 1) return null;

  const swapTo = (target) => {
    const parts = (pathname || `/${lang}/`).split("/");
    parts[1] = target;
    const joined = parts.join("/");
    return joined.endsWith("/") ? joined : `${joined}/`;
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={clsx(
          "flex items-center gap-1.5 text-sm font-medium transition-colors",
          light ? "text-white/90 hover:text-white" : "text-ink hover:text-brand-blue",
        )}
      >
        <Languages className="h-4 w-4" />
        <span className="uppercase">{lang}</span>
        <ChevronDown className={clsx("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-3 min-w-40 overflow-hidden rounded-xl border border-line bg-paper py-1.5 shadow-[var(--shadow-soft)]"
        >
          {i18n.locales.map((code) => (
            <li key={code}>
              <Link
                href={swapTo(code)}
                className="flex items-center justify-between px-4 py-2 text-sm text-ink hover:bg-cream"
              >
                {i18n.localeNames[code] ?? code}
                {code === lang ? <Check className="h-4 w-4 text-brand-blue" /> : null}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
