import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { getProject, projectOrder } from "@/lib/projects";
import { href } from "@/lib/links";
import { buildMetadata, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import JsonLd from "@/components/JsonLd";

// This segment introduces `category`, so it must enumerate its values for the
// static export. Runs once per parent locale.
export async function generateStaticParams() {
  return projectOrder.map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const { lang, category } = await params;
  const dict = await getDictionary(lang);
  const copy = dict.projects[category];
  const project = getProject(category);
  if (!copy) return {};
  return buildMetadata({
    lang,
    path: `/projects/${category}`,
    title: copy.title,
    description: copy.intro?.[0] || copy.tagline,
    image: project?.hero,
  });
}

export default async function ProjectDetailPage({ params }) {
  const { lang, category } = await params;
  const project = getProject(category);
  const dict = await getDictionary(lang);
  const copy = dict.projects[category];

  if (!project || !copy) notFound();

  const others = projectOrder.filter((slug) => slug !== category);

  const breadcrumb = breadcrumbJsonLd([
    { name: dict.nav.home, url: absoluteUrl(href(lang, "/")) },
    { name: dict.projects.indexTitle, url: absoluteUrl(href(lang, "/projects")) },
    { name: copy.title, url: absoluteUrl(href(lang, `/projects/${category}`)) },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <PageHeader
        image={project.hero}
        kicker={dict.projects.indexTitle}
        title={copy.title}
        subtitle={copy.tagline}
      />

      {/* Overview */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-8">
            <span className="kicker text-brand-red">{dict.projects.overviewLabel}</span>
            <div className="mt-6 space-y-5 text-lg leading-[1.8] text-pretty text-ink-soft">
              {copy.intro.map((p, i) => (
                <p key={i} className={i === 0 ? "text-ink!" : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          {copy.locations?.length ? (
            <Reveal delay={0.1} className="lg:col-span-4">
              <div className="rounded-2xl border border-line bg-paper p-7 lg:sticky lg:top-28">
                <h3 className="flex items-center gap-2 font-display text-lg text-ink">
                  <MapPin className="h-5 w-5 text-brand-blue" />
                  {dict.projects.locationsLabel}
                </h3>
                <span className="hairline mt-4 block" />
                <ul className="mt-5 flex flex-wrap gap-2">
                  {copy.locations.map((loc) => (
                    <li
                      key={loc}
                      className="rounded-full bg-cream px-3.5 py-1.5 text-sm text-ink-soft"
                    >
                      {loc}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}
        </div>

        {/* Sub-sections (e.g. affordable housing, individual malls) */}
        {copy.sections?.length ? (
          <div className="mt-16 space-y-12 border-t border-line pt-14">
            {copy.sections.map((sec) => (
              <Reveal key={sec.title}>
                <div className="grid gap-6 lg:grid-cols-12">
                  <h3 className="font-display text-2xl text-ink lg:col-span-4 lg:text-3xl">
                    {sec.title}
                  </h3>
                  <div className="lg:col-span-8">
                    <div className="space-y-4 leading-relaxed text-ink-soft">
                      {sec.body.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                    {sec.brochure ? (
                      <a
                        href={sec.brochure}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-5 inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink transition-all hover:border-transparent hover:bg-ink hover:text-cream"
                      >
                        <Download className="h-4 w-4" />
                        {dict.common.downloadBrochure}
                      </a>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : null}
      </section>

      {/* Gallery */}
      <section className="bg-cream-deep py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading kicker={dict.projects.featuredLabel} title={copy.title} />
          </Reveal>
          <div className="mt-12">
            <Gallery images={project.gallery} label={copy.title} />
          </div>
        </div>
      </section>

      {/* Explore other segments */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <span className="kicker text-brand-red">{dict.projects.indexKicker}</span>
        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {others.map((slug) => (
            <Link
              key={slug}
              href={href(lang, `/projects/${slug}`)}
              className="group flex items-center justify-between gap-3 bg-cream px-5 py-5 transition-colors hover:bg-paper"
            >
              <span className="font-display text-lg text-ink">{dict.projects[slug].title}</span>
              <ArrowUpRight className="h-4 w-4 text-ink-soft transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-blue" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
