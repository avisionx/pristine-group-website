import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import NewsFeed from "@/components/NewsFeed";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    path: "/news",
    title: dict.nav.news,
    description: dict.news.subtitle,
  });
}

export default async function NewsPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader kicker={dict.news.kicker} title={dict.news.title} subtitle={dict.news.subtitle} />
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:pb-32">
        <NewsFeed dict={dict.news} endpoint="full" />
      </section>
    </>
  );
}
