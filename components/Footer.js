import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { href } from "@/lib/links";
import { site, logos } from "@/lib/site";
import LogoLockup from "./LogoLockup";

export default function Footer({ lang, dict, projects, year }) {
  return (
    <footer className="relative bg-ink text-cream/80 mt-8">
      {/* Skyline silhouette horizon — sits on the cream page and dips into the
          dark footer below. `multiply` removes the asset's white backdrop. */}
      <div className="bg-cream" aria-hidden>
        <div
          className="h-[110px] w-full bg-repeat-x"
          style={{
            backgroundImage: "url(/img/skyline.webp)",
            backgroundSize: "auto 110px",
            backgroundPositionX: "center",
            mixBlendMode: "multiply",
            opacity: 0.85,
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-12 pt-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href={href(lang)} className="inline-block">
              <LogoLockup
                mainSrc={logos.white}
                variant="dark"
              />
            </Link>
            <p className="mt-5 max-w-xs font-display text-xl text-cream">{dict.footer.tagline}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">{dict.footer.blurb}</p>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <FooterHeading>{dict.footer.contactHeading}</FooterHeading>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                <a
                  href={site.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-relaxed text-cream/75 transition-colors hover:text-cream"
                >
                  {site.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                <div className="text-cream/75">
                  {site.phones.map((p, i) => (
                    <span key={p.href}>
                      <a href={p.href} className="transition-colors hover:text-cream">
                        {p.display}
                      </a>
                      {i < site.phones.length - 1 ? <span className="opacity-40">, </span> : null}
                    </span>
                  ))}
                  <span className="mt-1 block text-xs text-cream/45">{dict.contact.info.hours}</span>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                <a
                  href={`mailto:${site.email}`}
                  className="text-cream/75 transition-colors hover:text-cream"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick links + Projects */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4">
            <div>
              <FooterHeading>{dict.footer.quickLinksHeading}</FooterHeading>
              <ul className="mt-5 space-y-2.5 text-sm">
                {[
                  { label: dict.nav.home, path: "/" },
                  { label: dict.nav.about, path: "/about" },
                  { label: dict.nav.news, path: "/news" },
                  { label: dict.nav.careers, path: "/careers" },
                  { label: dict.nav.contact, path: "/contact" },
                ].map((l) => (
                  <li key={l.path}>
                    <FooterLink href={href(lang, l.path)}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <FooterHeading>{dict.footer.projectsHeading}</FooterHeading>
              <ul className="mt-5 space-y-2.5 text-sm">
                {projects.map((p) => (
                  <li key={p.slug}>
                    <FooterLink href={href(lang, `/projects/${p.slug}`)}>{p.title}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © Gupta&apos;s Pristine Group {year}. {dict.footer.rights}
          </p>
          <p>
            {dict.footer.developedBy}{" "}
            <a
              href={site.developer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/70 underline-offset-2 hover:text-cream hover:underline"
            >
              {site.developer.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wider uppercase text-white/90">
        {children}
      </h3>
      {/* Hairline sits on its own line beneath the heading (block-level break
          before it, since .hairline is inline-flex). */}
      <span className="hairline mt-3 block" />
    </div>
  );
}

function FooterLink({ href: to, children }) {
  return (
    <Link
      href={to}
      className="group inline-flex items-center gap-1 text-white/70 transition-colors hover:text-white"
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
}
