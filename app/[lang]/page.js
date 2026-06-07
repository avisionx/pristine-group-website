import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { projectOrder, projects } from "@/lib/projects";
import { FOUNDED_YEAR } from "@/lib/site";
import { href } from "@/lib/links";
import { buildMetadata } from "@/lib/seo";
import HeroCarousel from "@/components/HeroCarousel";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import ProjectCard from "@/components/ProjectCard";
import NewsFeed from "@/components/NewsFeed";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    path: "/",
    title: dict.meta.title,
    description: dict.meta.description,
    isHome: true,
  });
}

export default async function HomePage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const years = new Date().getFullYear() - FOUNDED_YEAR;

  const stats = dict.home.stats.map((s) => ({
    to: s.value ? parseInt(s.value, 10) : years,
    suffix: s.suffix,
    label: s.label,
  }));

  return (
    <>
      <HeroCarousel lang={lang} dict={dict} />

      {/* About preview */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <SectionHeading kicker={dict.home.aboutKicker} title={dict.home.aboutTitle} />
            <div className="mt-7 space-y-5 text-pretty leading-relaxed text-ink-soft">
              {dict.home.aboutParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Link
              href={href(lang, "/about")}
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink"
            >
              <span className="border-b border-ink/30 pb-1 transition-colors group-hover:border-brand-blue group-hover:text-brand-blue">
                {dict.common.knowMore}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-6">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-[var(--shadow-lift)]">
                <img
                  src="/cover/2.jpg"
                  alt="A Pristine Group luxury development"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 rounded-2xl bg-ink px-6 py-5 text-cream shadow-[var(--shadow-soft)] sm:-left-6">
                <p className="font-display text-4xl leading-none text-gradient">{FOUNDED_YEAR}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cream/70">
                  {dict.common.established}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stats */}
        <Reveal>
          <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-cream px-8 py-10 text-center">
                <p className="font-display text-5xl text-ink sm:text-6xl">
                  <Counter to={s.to} />
                  <span className="text-gradient">{s.suffix}</span>
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.15em] text-ink-soft">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Projects */}
      <section className="bg-cream-deep py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              align="center"
              kicker={dict.home.projectsKicker}
              title={dict.home.projectsTitle}
              subtitle={dict.home.projectsSubtitle}
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projectOrder.map((slug, i) => (
              <Reveal key={slug} delay={(i % 3) * 0.08}>
                <ProjectCard
                  lang={lang}
                  project={projects[slug]}
                  title={dict.projects[slug].title}
                  tagline={dict.projects[slug].tagline}
                  index={i}
                  viewLabel={dict.common.viewProject}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              kicker={dict.home.newsKicker}
              title={dict.home.newsTitle}
              subtitle={dict.home.newsSubtitle}
            />
            <Link
              href={href(lang, "/news")}
              className="group hidden items-center gap-2 text-sm font-medium text-ink sm:inline-flex"
            >
              <span className="border-b border-ink/30 pb-1 transition-colors group-hover:border-brand-blue group-hover:text-brand-blue">
                {dict.common.readMore}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-12">
          <NewsFeed dict={dict.news} endpoint="top" limit={3} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink">
        <img
          src="/img/image.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/50 to-ink/60" />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 lg:py-32">
          <Reveal>
            <h2 className="font-display text-4xl text-white sm:text-5xl lg:text-6xl">
              {dict.home.ctaTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-white/75">
              {dict.home.ctaSubtitle}
            </p>
            <Link
              href={href(lang, "/contact")}
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 text-sm font-medium text-ink transition-all duration-300 hover:bg-white hover:shadow-[var(--shadow-lift)]"
            >
              {dict.home.ctaButton}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
