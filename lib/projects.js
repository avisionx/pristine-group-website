// Language-independent project configuration: slugs, imagery and icons.
// Translatable copy (title, tagline, intro, sections, locations) lives in
// dictionaries/<lang>.json under `projects.<slug>` and is merged at render time.
//
// `order` defines the canonical sequence used on the home grid and projects
// index. Each `thumb` maps to /public/projects/<n>.jpg in that same order.

export const projectOrder = [
  "residential",
  "commercial",
  "retail",
  "luxury_farmhouses",
  "warehousing",
  "industrial",
];

export const projects = {
  residential: {
    slug: "residential",
    icon: "Home",
    accent: "blue",
    thumb: "/projects/1.jpg",
    hero: "/residential/gated/2.jpg",
    gallery: [
      "/residential/gated/1.jpg",
      "/residential/gated/2.jpg",
      "/residential/gated/3.jpg",
      "/residential/gated/4.jpg",
      "/residential/gated/5.jpg",
      "/residential/gated/6.jpg",
      "/residential/1.png",
      "/residential/2.png",
      "/residential/3.jpg",
    ],
  },
  commercial: {
    slug: "commercial",
    icon: "Building2",
    accent: "red",
    thumb: "/projects/2.jpg",
    hero: "/commercial/1.jpg",
    gallery: [
      "/commercial/1.jpg",
      "/commercial/2.jpg",
      "/commercial/3.jpg",
      "/commercial/4.jpg",
      "/commercial/5.jpg",
      "/commercial/6.jpg",
    ],
  },
  retail: {
    slug: "retail",
    icon: "ShoppingBag",
    accent: "blue",
    thumb: "/projects/3.jpg",
    hero: "/retail/1.jpg",
    gallery: ["/retail/1.jpg", "/retail/2.jpg", "/retail/3.jpg"],
  },
  luxury_farmhouses: {
    slug: "luxury_farmhouses",
    icon: "Trees",
    accent: "red",
    thumb: "/projects/4.jpg",
    hero: "/farmhouse/1.jpg",
    gallery: [
      "/farmhouse/1.jpg",
      "/farmhouse/2.jpg",
      "/farmhouse/3.jpg",
      "/farmhouse/4.jpg",
      "/farmhouse/5.jpg",
      "/farmhouse/6.jpg",
      "/farmhouse/7.jpg",
      "/farmhouse/8.jpg",
    ],
  },
  warehousing: {
    slug: "warehousing",
    icon: "Warehouse",
    accent: "blue",
    thumb: "/projects/5.jpg",
    hero: "/warehousing/1.jpg",
    gallery: ["/warehousing/1.jpg"],
  },
  industrial: {
    slug: "industrial",
    icon: "Factory",
    accent: "red",
    thumb: "/projects/6.jpg",
    hero: "/industrial/1.jpg",
    gallery: ["/industrial/1.jpg", "/industrial/2.png"],
  },
};

export function getProject(slug) {
  return projects[slug] ?? null;
}
