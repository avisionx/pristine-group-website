import { getDictionary } from "@/lib/dictionaries";
import { projectOrder, projects } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    path: "/projects",
    title: dict.projects.indexTitle,
    description: dict.projects.indexSubtitle,
  });
}

export default async function ProjectsIndexPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        kicker={dict.projects.indexKicker}
        title={dict.projects.indexTitle}
        subtitle={dict.projects.indexSubtitle}
      />
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:pb-32">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      </section>
    </>
  );
}
