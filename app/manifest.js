import { site } from "@/lib/site";
import { i18n } from "@/lib/i18n-config";

export const dynamic = "force-static";

export default function manifest() {
  return {
    name: site.name,
    short_name: site.shortName,
    description:
      "One of the foundational builders of Delhi-NCR — homes, landmarks and trust since 1973.",
    start_url: `/${i18n.defaultLocale}/`,
    display: "standalone",
    background_color: "#f7f4ee",
    theme_color: "#262422",
    icons: [
      {
        src: "/icon/android-icon-192x192-dunplab-manifest-48525.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      { src: "/android-chrome-144x144.png", sizes: "144x144", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
