import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import { site } from "@/lib/site";
import { i18n } from "@/lib/i18n-config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

const DEFAULT_TITLE = "Gupta's Pristine Group — Redefining Real Estate";
const DEFAULT_DESC =
  "One of the foundational builders of the Delhi-NCR region. Four generations of trust across residential, commercial, retail, warehousing, industrial and luxury farmhouses — since 1973.";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: DEFAULT_TITLE,
    template: "%s · Gupta's Pristine Group",
  },
  description: DEFAULT_DESC,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Real Estate",
  keywords: [
    "Pristine Group",
    "Gupta's Pristine",
    "real estate Delhi NCR",
    "real estate developers Delhi",
    "builders Delhi NCR",
    "luxury farmhouses Delhi",
    "commercial property Delhi",
    "residential property Delhi NCR",
    "Nehru Place real estate",
    "Faridabad mall",
    "warehousing Delhi",
    "industrial property Faridabad",
  ],
  formatDetection: { email: false, address: false, telephone: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description:
      "Four generations of building landmarks across Delhi-NCR — homes, high streets and horizons, since 1973.",
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: DEFAULT_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: "Four generations of building landmarks across Delhi-NCR — since 1973.",
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  themeColor: "#262422",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang={i18n.defaultLocale}
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
