// Central i18n configuration.
//
// This drives the whole multilanguage setup. To add a language:
//   1. Add its code below (e.g. "hi").
//   2. Create dictionaries/<code>.json (copy en.json and translate the values).
//   3. Register it in lib/dictionaries.js.
// `generateStaticParams` reads `locales` so every language is pre-rendered at
// build time — no server required, fully compatible with `output: "export"`.

export const i18n = {
  defaultLocale: "en",
  locales: ["en", "hi"],
  // Human-readable names shown in the language switcher.
  localeNames: {
    en: "English",
    hi: "हिन्दी",
    // pa: "ਪੰਜਾਬੀ",
  },
};

export function isValidLocale(locale) {
  return i18n.locales.includes(locale);
}
