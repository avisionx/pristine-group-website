import { site, FOUNDED_YEAR } from "./site";
import { i18n } from "./i18n-config";
import { href } from "./links";

export const BRAND = "Gupta's Pristine Group";
const DEFAULT_OG = "/og-image.jpg";

// Open Graph expects underscored locales. Extend as languages are added.
const OG_LOCALE = { en: "en_US", hi: "hi_IN", pa: "pa_IN" };

export function absoluteUrl(path) {
  return new URL(path, site.url).toString();
}

// Canonical URL for this locale + hreflang alternates for every locale
// (plus x-default → the default locale). Scales automatically with i18n.locales.
export function buildAlternates(lang, path = "/") {
  const languages = {};
  for (const code of i18n.locales) {
    languages[code] = absoluteUrl(href(code, path));
  }
  languages["x-default"] = absoluteUrl(href(i18n.defaultLocale, path));
  return { canonical: absoluteUrl(href(lang, path)), languages };
}

// Complete per-page Metadata: title, description, canonical/hreflang,
// Open Graph and Twitter cards. `isHome` keeps the brand title un-templated.
export function buildMetadata({
  lang,
  path = "/",
  title,
  description,
  image,
  type = "website",
  isHome = false,
}) {
  const url = absoluteUrl(href(lang, path));
  const ogImage = absoluteUrl(image || DEFAULT_OG);
  const ogTitle = isHome ? title : `${title} · ${BRAND}`;
  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: buildAlternates(lang, path),
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: BRAND,
      locale: OG_LOCALE[lang] || "en_US",
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
  };
}

// schema.org structured data — a real-estate business entity with full NAP
// (name/address/phone) for rich results and local SEO.
export function organizationJsonLd(description) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${site.url}/#organization`,
    name: BRAND,
    alternateName: site.shortName,
    url: site.url,
    logo: absoluteUrl("/img/logo.png"),
    image: absoluteUrl(DEFAULT_OG),
    description,
    foundingDate: String(FOUNDED_YEAR),
    address: {
      "@type": "PostalAddress",
      streetAddress: "303, Ashok Bhawan - 93, Nehru Place",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110019",
      addressCountry: "IN",
    },
    telephone: site.phones.map((p) => p.href.replace("tel:", "")),
    email: site.email,
    areaServed: ["Delhi NCR", "Punjab", "Haryana"],
    knowsAbout: [
      "Residential Real Estate",
      "Commercial Real Estate",
      "Retail Real Estate",
      "Warehousing",
      "Industrial Real Estate",
      "Luxury Farmhouses",
    ],
  };
}

// Breadcrumb trail for nested pages → breadcrumb rich results.
// `items` is [{ name, url }] from root to current page.
export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: BRAND,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: i18n.locales,
  };
}
