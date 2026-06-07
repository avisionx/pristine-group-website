"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { href } from "@/lib/links";
import { HERO_SLIDE_COUNT, FOUNDED_YEAR } from "@/lib/site";

const INTERVAL = 6000;
const slides = Array.from({ length: HERO_SLIDE_COUNT }, (_, i) => i + 1);

export default function HeroCarousel({ lang, dict }) {
  const [index, setIndex] = useState(0);
  const years = new Date().getFullYear() - FOUNDED_YEAR;

  const go = useCallback((n) => setIndex(((n % slides.length) + slides.length) % slides.length), []);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearInterval(id);
  }, [index]);

  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink">
      {/* Slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <picture>
            <source media="(max-width: 640px)" srcSet={`/cover-mobile/${slides[index]}.jpg`} />
            <img
              src={`/cover/${slides[index]}.jpg`}
              alt=""
              className="h-full w-full origin-center object-cover animate-kenburns"
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          </picture>
        </motion.div>
      </AnimatePresence>

      {/* Tint + vignette for legibility (stronger scrim on the left, behind the text) */}
      <div className="absolute inset-0 bg-linear-to-b from-ink/60 via-ink/25 to-ink/75" />
      <div className="absolute inset-0 bg-linear-to-r from-ink/90 via-ink/45 to-transparent" />

      {/* Established label — true vertical text so its box stays a narrow left gutter
          and never overlaps the headline at any width (desktop only). */}
      <span className="absolute left-5 top-1/2 hidden -translate-y-1/2 rotate-180 whitespace-nowrap kicker text-white [writing-mode:vertical-rl] lg:block">
        Est. {FOUNDED_YEAR} — {years} Years
      </span>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 sm:px-8 lg:pl-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="max-w-3xl"
        >
          <span className="kicker inline-flex items-center gap-3 text-white">
            <span className="h-px w-8 bg-white/50" />
            {dict.hero.kicker}
          </span>
          <h1 className="mt-6 font-display text-[3.4rem] font-medium leading-[1.0] text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.5)] sm:text-7xl lg:text-[6.2rem]">
            {dict.hero.titleLine1}
            <span className="pt-3 block italic text-gradient-hero">{dict.hero.titleLine2}</span>
          </h1>
          <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
            {dict.hero.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={href(lang, "/projects")}
              className="group inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:bg-white hover:shadow-[var(--shadow-lift)]"
            >
              {dict.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={href(lang, "/about")}
              className="group inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-white"
            >
              <span className="border-b border-white/40 pb-1 transition-colors group-hover:border-white">
                {dict.hero.ctaSecondary}
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Slide indicators (right, desktop) */}
      <div className="absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {slides.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to slide ${s}`}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <span
              className={`text-xs tabular-nums transition-colors ${
                i === index ? "text-white" : "text-white/75"
              }`}
            >
              {String(s).padStart(2, "0")}
            </span>
            <span
              className={`block h-px transition-all duration-500 ${
                i === index ? "w-8 bg-gradient-brand" : "w-4 bg-white/75 group-hover:w-6"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center">
        <span className="kicker block text-white">{dict.common.scroll}</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="mt-2 inline-block text-white"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </div>
    </section>
  );
}
