import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CareersForm from "@/components/CareersForm";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    path: "/careers",
    title: dict.nav.careers,
    description: dict.careers.subtitle,
  });
}

export default async function CareersPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        kicker={dict.careers.kicker}
        title={dict.careers.title}
        subtitle={dict.careers.subtitle}
      />
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <CareersForm dict={dict.careers} />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-2xl border border-line bg-paper p-7 lg:sticky lg:top-28">
              <span className="kicker text-brand-red">{dict.careers.kicker}</span>
              <h2 className="mt-4 font-display text-2xl text-ink">{dict.careers.title}</h2>
              <span className="hairline mt-4 block" />
              <p className="mt-5 text-sm leading-relaxed text-ink-soft">{dict.careers.subtitle}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {dict.careers.designations.map((d) => (
                  <li key={d} className="rounded-full bg-cream px-3.5 py-1.5 text-sm text-ink-soft">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
