import "server-only";
import { i18n } from "./i18n-config";

// Each locale's dictionary is loaded lazily so only the requested language is
// bundled into a given statically-exported page. Register new languages here.
const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  hi: () => import("@/dictionaries/hi.json").then((m) => m.default),
  // pa: () => import("@/dictionaries/pa.json").then((m) => m.default),
};

export async function getDictionary(locale) {
  const load = dictionaries[locale] ?? dictionaries[i18n.defaultLocale];
  return load();
}
