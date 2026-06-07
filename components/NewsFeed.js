"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Clock, Loader2 } from "lucide-react";
import Reveal from "./Reveal";
import { NEWS_API } from "@/lib/site";

export default function NewsFeed({ dict, endpoint = "full", limit }) {
  const [items, setItems] = useState(null); // null = loading
  const [hoursAgo, setHoursAgo] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(endpoint === "top" ? NEWS_API.top : NEWS_API.full)
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        const news = Array.isArray(data.news) ? data.news : [];
        setItems(limit ? news.slice(0, limit) : news);
        try {
          const { date, time } = data.updated_at;
          const updated = new Date(
            date.Y,
            parseInt(date.m, 10) - 1,
            date.d,
            parseInt(time.H, 10) + 5,
            parseInt(time.M, 10) + 30,
          );
          setHoursAgo(Math.abs(Math.ceil(((updated - new Date()) % 86400000) / 3600000)));
        } catch {
          /* timestamp is best-effort */
        }
      })
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [endpoint, limit]);

  if (error) {
    return <p className="text-ink-soft">{dict.unavailable}</p>;
  }

  if (items === null) {
    return (
      <div className="flex items-center gap-3 text-ink-soft">
        <Loader2 className="h-5 w-5 animate-spin text-brand-blue" />
        {dict.loading}
      </div>
    );
  }

  return (
    <div>
      {hoursAgo !== null ? (
        <p className="mb-8 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-ink-soft uppercase">
          <Clock className="h-4 w-4 text-brand-blue" />
          {dict.lastUpdated} {hoursAgo} {dict.hoursAgo}
        </p>
      ) : null}

      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={`${item.title}-${i}`} delay={(i % 3) * 0.08}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-cream-deep">
                <img
                  src={item.img}
                  alt={item.title || ""}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                {item.tag ? (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-medium text-brand-blue-deep">
                    {item.tag}
                  </span>
                ) : null}
                <h3 className="font-display text-xl leading-snug text-ink">
                  {String(item.title || "").replace(/^(.{70}[^\s]*).*/, "$1")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {String(item.para || "").substring(0, 138)}…
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-red">
                  {dict.continueReading}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
