"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { href } from "@/lib/links";
import { logos } from "@/lib/site";
import LanguageSwitcher from "./LanguageSwitcher";
import LogoLockup from "./LogoLockup";

const ITEM_VARIANTS = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0 },
};

export default function Navbar({ lang, dict, projects }) {
  const pathname = usePathname();
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = !isHome || scrolled;
  const onDark = isHome && !scrolled;

  const navLinks = [
    { label: dict.nav.about, path: "/about" },
    { label: dict.nav.news, path: "/news" },
    { label: dict.nav.careers, path: "/careers" },
  ];

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          solid
            ? "border-b border-line/80 bg-cream/90 backdrop-blur-md shadow-[0_4px_30px_-12px_rgba(38,36,34,0.25)]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8 lg:py-4">
          {/* Logo */}
          <Link href={href(lang)} aria-label="Gupta's Pristine Group — Home" className="shrink-0">
            <LogoLockup
              mainSrc={onDark ? logos.white : logos.color}
              variant={onDark ? "dark" : "light"}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            <NavLink href={href(lang, "/about")} onDark={onDark}>
              {dict.nav.about}
            </NavLink>

            {/* Projects dropdown */}
            <div className="group relative">
              <Link
                href={href(lang, "/projects")}
                className={clsx(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide transition-colors",
                  onDark ? "text-white/90 hover:text-white" : "text-ink hover:text-brand-blue",
                )}
              >
                {dict.nav.projects}
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <ul className="overflow-hidden rounded-2xl border border-line bg-paper p-2 shadow-[var(--shadow-soft)]">
                  {projects.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={href(lang, `/projects/${p.slug}`)}
                        className="block rounded-xl px-4 py-2.5 text-sm text-ink transition-colors hover:bg-cream hover:text-brand-blue"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {navLinks.slice(1).map((l) => (
              <NavLink key={l.path} href={href(lang, l.path)} onDark={onDark}>
                {l.label}
              </NavLink>
            ))}

            <div className="ml-2 flex items-center gap-4">
              <LanguageSwitcher lang={lang} light={onDark} />
              <Link
                href={href(lang, "/contact")}
                className={clsx(
                  "rounded-full border px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300",
                  onDark
                    ? "border-white/40 text-white hover:bg-white hover:text-ink"
                    : "border-ink/20 text-ink hover:border-transparent hover:bg-ink hover:text-cream",
                )}
              >
                {dict.nav.contact}
              </Link>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={dict.nav.menu}
            className={clsx(
              "lg:hidden transition-colors",
              onDark ? "text-white" : "text-ink",
            )}
          >
            <Menu className="h-7 w-7" />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-cream lg:hidden"
          >
            <div className="flex h-full flex-col px-6 py-5">
              <div className="flex items-center justify-between">
                <LogoLockup
                  mainSrc={logos.color}
                  variant="light"
                  mainClassName="h-10 w-auto"
                  heritageClassName="h-10 w-auto"
                  dividerClassName="h-8"
                />
                <button type="button" onClick={() => setOpen(false)} aria-label={dict.nav.close}>
                  <X className="h-7 w-7 text-ink" />
                </button>
              </div>

              <motion.ul
                className="mt-8 flex flex-1 flex-col gap-0.5 overflow-y-auto overscroll-contain pb-6 no-scrollbar"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } } }}
              >
                <MobileItem href={href(lang, "/")} label={dict.nav.home} />
                <MobileItem href={href(lang, "/about")} label={dict.nav.about} />

                {/* Projects links to its index page; segments listed beneath it */}
                <MobileItem href={href(lang, "/projects")} label={dict.nav.projects} />
                {projects.map((p) => (
                  <MobileItem
                    key={p.slug}
                    href={href(lang, `/projects/${p.slug}`)}
                    label={p.title}
                    indent
                  />
                ))}

                <MobileItem href={href(lang, "/news")} label={dict.nav.news} className="pt-2" />
                <MobileItem href={href(lang, "/careers")} label={dict.nav.careers} />
                <MobileItem href={href(lang, "/contact")} label={dict.nav.contact} />
              </motion.ul>

              <div className="mt-auto border-t border-line pt-5">
                <LanguageSwitcher lang={lang} />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, onDark, children }) {
  return (
    <Link
      href={href}
      className={clsx(
        "px-4 py-2 text-sm font-medium tracking-wide transition-colors",
        onDark ? "text-white/90 hover:text-white" : "text-ink hover:text-brand-blue",
      )}
    >
      {children}
    </Link>
  );
}

function MobileItem({ href, label, indent = false, className }) {
  return (
    <motion.li variants={ITEM_VARIANTS} className={className}>
      <Link
        href={href}
        className={clsx(
          "block font-display leading-tight text-ink transition-colors hover:text-brand-blue",
          indent ? "py-1.5 pl-4 text-xl text-ink-soft" : "py-1.5 text-[1.7rem]",
        )}
      >
        {label}
      </Link>
    </motion.li>
  );
}
