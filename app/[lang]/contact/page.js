import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    path: "/contact",
    title: dict.nav.contact,
    description: dict.contact.subtitle,
  });
}

export default async function ContactPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const info = dict.contact.info;

  return (
    <>
      <PageHeader
        kicker={dict.contact.kicker}
        title={dict.contact.title}
        subtitle={dict.contact.subtitle}
      />

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <ContactForm dict={dict.contact} />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-2xl border border-line bg-paper p-7">
              <ul className="space-y-7">
                <InfoRow icon={MapPin} title={info.officeLabel}>
                  <a
                    href={site.address.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leading-relaxed text-ink-soft transition-colors hover:text-brand-blue"
                  >
                    {site.address.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </a>
                </InfoRow>

                <InfoRow icon={Phone} title={info.phoneLabel}>
                  <div className="text-ink-soft">
                    {site.phones.map((p) => (
                      <a
                        key={p.href}
                        href={p.href}
                        className="block transition-colors hover:text-brand-blue"
                      >
                        {p.display}
                      </a>
                    ))}
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-ink-soft/80">
                      <Clock className="h-3.5 w-3.5" />
                      {info.hours}
                    </span>
                  </div>
                </InfoRow>

                <InfoRow icon={Mail} title={info.emailLabel}>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-ink-soft transition-colors hover:text-brand-blue"
                  >
                    {site.email}
                  </a>
                </InfoRow>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:pb-32">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-line shadow-[var(--shadow-soft)]">
            <iframe
              title="Pristine Group — Corporate Office"
              src={site.address.mapEmbed}
              className="h-[420px] w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}

function InfoRow({ icon: Icon, title, children }) {
  return (
    <li className="flex gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-blue/10 text-brand-blue">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs tracking-[0.18em] text-ink uppercase">{title}</p>
        <div className="mt-1.5">{children}</div>
      </div>
    </li>
  );
}
