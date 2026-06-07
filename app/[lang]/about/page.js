import { getDictionary } from "@/lib/dictionaries";
import { logos } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    path: "/about",
    title: dict.nav.about,
    description: dict.about.lead,
  });
}

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const paras = dict.about.paragraphs;

  return (
    <>
      <PageHeader kicker={dict.about.kicker} title={dict.about.title} subtitle={dict.about.lead} />

      {/* Story */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="space-y-5 text-[1.02rem] leading-[1.85] text-pretty text-ink-soft">
              <p className="text-ink! first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-brand-red">
                {paras[0]}
              </p>
              {paras.slice(1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <figure className="lg:sticky lg:top-28">
                <div className="overflow-hidden rounded-3xl shadow-[var(--shadow-lift)]">
                  <img
                    src="/cover/4.jpg"
                    alt="An early Pristine Group residence"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <figcaption className="mt-5 flex items-center gap-4 rounded-2xl border border-line p-4">
                  <img src={logos.heritage} alt="The original Gupta's mark" className="h-16 w-auto rounded" />
                  <span className="text-sm text-ink-soft italic">{dict.about.heritageLabel}</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-deep py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              align="center"
              kicker={dict.about.valuesKicker}
              title={dict.about.valuesTitle}
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dict.about.values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-paper p-7 transition-shadow duration-300 hover:shadow-[var(--shadow-soft)]">
                  <span className="text-gradient font-display text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="hairline mt-4 block" />
                  <h3 className="mt-5 font-display text-xl text-ink">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
