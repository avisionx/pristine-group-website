import { i18n } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import NotFoundContent from "@/components/NotFoundContent";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default async function NotFound() {
  // Embed every locale's 404 strings; the client picks one from the URL path
  // (a static host serves this single 404.html for all missing routes).
  const strings = {};
  for (const lang of i18n.locales) {
    const dict = await getDictionary(lang);
    strings[lang] = dict.notFound;
  }

  return (
    <NotFoundContent
      strings={strings}
      defaultLocale={i18n.defaultLocale}
      locales={i18n.locales}
    />
  );
}
