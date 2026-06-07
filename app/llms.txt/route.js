import { getDictionary } from "@/lib/dictionaries";
import { i18n } from "@/lib/i18n-config";
import { projectOrder } from "@/lib/projects";
import { site, FOUNDED_YEAR } from "@/lib/site";
import { href } from "@/lib/links";

export const dynamic = "force-static";

// /llms.txt — a concise, link-rich markdown summary of the site for LLMs
// (see llmstxt.org). Generated from the same content as the site, so it never
// drifts. Emitted as a static file by the export.
export async function GET() {
  const lang = i18n.defaultLocale;
  const dict = await getDictionary(lang);
  const abs = (path, l = lang) => new URL(href(l, path), site.url).toString();

  const pages = [
    ["Home", "/", "Company overview, legacy, key statistics and featured segments."],
    [dict.nav.about, "/about", dict.about.lead],
    [dict.projects.indexTitle, "/projects", dict.projects.indexSubtitle],
    [dict.nav.news, "/news", dict.news.subtitle],
    [dict.nav.careers, "/careers", dict.careers.subtitle],
    [dict.nav.contact, "/contact", dict.contact.subtitle],
  ];

  const segments = projectOrder.map((slug) => [
    dict.projects[slug].title,
    `/projects/${slug}`,
    dict.projects[slug].tagline,
  ]);

  const lines = [
    `# ${site.name}`,
    "",
    `> ${dict.meta.description}`,
    "",
    `${site.name} is a fourth-generation real estate developer founded in ${FOUNDED_YEAR}, headquartered at Nehru Place, New Delhi. The group develops and trades across six segments — residential, commercial, retail, warehousing, industrial and luxury farmhouses — primarily in Delhi-NCR, with operations extending into Punjab and Haryana. The site is statically generated and available in English and Hindi.`,
    "",
    "## Key Pages",
    ...pages.map(([t, p, d]) => `- [${t}](${abs(p)}): ${d}`),
    "",
    "## Project Segments",
    ...segments.map(([t, p, d]) => `- [${t}](${abs(p)}): ${d}`),
    "",
    "## Contact",
    `- Address: ${site.address.lines.join(", ")}`,
    `- Phone: ${site.phones.map((p) => p.display).join(", ")}`,
    `- Email: ${site.email}`,
    `- Office hours: ${dict.contact.info.hours}`,
    "",
    "## Languages",
    ...i18n.locales.map((l) => `- ${i18n.localeNames[l] || l}: ${abs("/", l)}`),
    "",
    "## Optional",
    `- [Sitemap](${site.url}/sitemap.xml)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
