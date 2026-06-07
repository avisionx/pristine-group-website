import { notFound } from "next/navigation";
import { i18n, isValidLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { projectOrder } from "@/lib/projects";
import { FOUNDED_YEAR } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HtmlLangSync from "@/components/HtmlLangSync";
import ScrollProgress from "@/components/ScrollProgress";
import JsonLd from "@/components/JsonLd";

// Pre-render every registered locale at build time (export-safe i18n).
export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    // `absolute` = this locale's home title verbatim (no parent template);
    // `template` still wraps child pages, e.g. "About · Gupta's Pristine Group".
    title: { absolute: dict.meta.title, template: "%s · Gupta's Pristine Group" },
    description: dict.meta.description,
  };
}

export default async function LocaleLayout({ children, params }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const projects = projectOrder.map((slug) => ({
    slug,
    title: dict.projects[slug].title,
  }));
  // Baked at build time — fine for a static copyright line.
  const year = Math.max(new Date().getFullYear(), FOUNDED_YEAR);

  return (
    <>
      <JsonLd data={organizationJsonLd(dict.meta.description)} />
      <JsonLd data={websiteJsonLd()} />
      <HtmlLangSync lang={lang} />
      <ScrollProgress />
      <Navbar lang={lang} dict={dict} projects={projects} />
      <main id="main">{children}</main>
      <Footer lang={lang} dict={dict} projects={projects} year={year} />
    </>
  );
}
