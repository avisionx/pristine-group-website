import Link from "next/link";
import { ArrowUpRight, Home, Building2, ShoppingBag, Trees, Warehouse, Factory } from "lucide-react";
import { href } from "@/lib/links";

const ICONS = { Home, Building2, ShoppingBag, Trees, Warehouse, Factory };

export default function ProjectCard({ lang, project, title, tagline, index, viewLabel }) {
  const Icon = ICONS[project.icon] ?? Home;

  return (
    <Link
      href={href(lang, `/projects/${project.slug}`)}
      className="group relative block overflow-hidden rounded-2xl bg-ink shadow-[var(--shadow-soft)]"
    >
      <div className="aspect-[4/5] w-full overflow-hidden">
        <img
          src={project.thumb}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        />
      </div>

      {/* Legibility gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/25 to-transparent opacity-90" />

      {/* Index */}
      <span className="absolute right-5 top-4 text-sm tabular-nums text-white/60">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon chip */}
      <span className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-ink">
        <Icon className="h-5 w-5" />
      </span>

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="hairline mb-4 block opacity-80" />
        <h3 className="font-display text-2xl text-white sm:text-3xl">{title}</h3>
        {tagline ? (
          <p className="mt-1.5 max-w-xs text-sm leading-snug text-white/70">{tagline}</p>
        ) : null}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors group-hover:text-white">
          {viewLabel}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
