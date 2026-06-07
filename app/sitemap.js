import { i18n } from "@/lib/i18n-config";
import { projectOrder } from "@/lib/projects";
import { site } from "@/lib/site";
import { href } from "@/lib/links";

export const dynamic = "force-static";

// Every routable path (locale-agnostic). The sitemap is the cross product of
// these with i18n.locales, so adding a language extends the sitemap for free.
const PATHS = [
  "/",
  "/about",
  "/projects",
  ...projectOrder.map((slug) => `/projects/${slug}`),
  "/news",
  "/careers",
  "/contact",
];

export default function sitemap() {
  const abs = (lang, path) => new URL(href(lang, path), site.url).toString();
  const lastModified = new Date();

  const entries = [];
  for (const lang of i18n.locales) {
    for (const path of PATHS) {
      entries.push({
        url: abs(lang, path),
        lastModified,
        changeFrequency: path === "/" ? "weekly" : path === "/news" ? "daily" : "monthly",
        priority: path === "/" ? 1 : path.startsWith("/projects") ? 0.8 : 0.6,
        alternates: {
          languages: Object.fromEntries(i18n.locales.map((l) => [l, abs(l, path)])),
        },
      });
    }
  }
  return entries;
}
