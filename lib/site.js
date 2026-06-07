// Language-independent site constants: contact details, external endpoints,
// brand facts. Keep translatable copy in dictionaries/ — keep facts here.

export const FOUNDED_YEAR = 1973;

export const site = {
  name: "Gupta's Pristine Group",
  shortName: "Pristine Group",
  url: "https://www.grouppristine.com",
  address: {
    lines: ["303, Ashok Bhawan - 93, Nehru Place", "New Delhi - 110019"],
    mapUrl: "https://goo.gl/maps/dVosGt7vb6haAF518",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.713467154677!2d77.25031531508074!3d28.548330982451084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3c564455555%3A0x432a1f11c4c8f62c!2sPristine%20Group!5e0!3m2!1sen!2sin!4v1632153308490!5m2!1sen!2sin",
  },
  phones: [
    { display: "+91 - 11-26431151", href: "tel:+911126431151" },
    { display: "+91 - 11-26431148", href: "tel:+911126431148" },
  ],
  email: "care@grouppristine.com",
  developer: { name: "@avisionx", url: "https://avisionx.net/" },
};

// Google Forms endpoints. Submitting a GET to formResponse with the prefilled
// entry IDs records a response — the same lightweight pipeline the site has
// always used (no backend required, works from a static export).
export const FORMS = {
  contact: {
    formId: "1FAIpQLSclvNomLE2jNLcCUj_A4daUDhrPws8U6kR9RENJoHRS_OZtMg",
    fields: {
      name: "entry.1832782791",
      email: "entry.862181333",
      contact: "entry.662822698",
      message: "entry.429037016",
    },
  },
  careers: {
    formId: "1FAIpQLSfmPXlIWXNV8FAQPnE_9l825r07xk2C8gxr4gaUjK9FKr8Ysg",
    fields: {
      name: "entry.1832782791",
      email: "entry.862181333",
      contact: "entry.662822698",
      designation: "entry.429037016",
      employer: "entry.1926150187",
      linkedin: "entry.533786538",
      resume: "entry.2069208664",
    },
  },
};

export function buildFormUrl({ formId, fields }, values) {
  const params = new URLSearchParams({ usp: "pp_url" });
  for (const [key, entry] of Object.entries(fields)) {
    params.append(entry, values[key] ?? "");
  }
  return `https://docs.google.com/forms/d/e/${formId}/formResponse?${params.toString()}`;
}

// Client-side news feed (works fine in a static export — fetched in the browser).
export const NEWS_API = {
  full: "https://raw.githubusercontent.com/avisionx/pristine-group-news-api/main/news.json",
  top: "https://raw.githubusercontent.com/avisionx/pristine-group-news-api/main/news-top.json",
};

// Heritage / brand marks (served from /public/img).
export const logos = {
  color: "/img/logo.png",
  white: "/img/logo-white.png",
  black: "/img/logo-black.png",
  heritage: "/img/logo-old.jpg",
};

// Number of full-bleed hero slides available in /public/cover and /public/cover-mobile.
export const HERO_SLIDE_COUNT = 5;
