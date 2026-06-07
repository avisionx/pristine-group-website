import Link from "next/link";
import { i18n } from "@/lib/i18n-config";

// The site root only exists to forward visitors into the default locale.
// Static export has no server/middleware, so the redirect is done with a
// meta-refresh + inline script (both fire before paint on every host).
export const metadata = {
  robots: { index: false, follow: false },
};

export default function RootRedirect() {
  const target = `/${i18n.defaultLocale}/`;
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(target)});`,
        }}
      />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          color: "#5c574f",
          background: "#f7f4ee",
        }}
      >
        <p>
          Redirecting to{" "}
          <Link href={target} style={{ color: "#0497f3" }}>
            Gupta&apos;s Pristine Group
          </Link>
          …
        </p>
      </div>
    </>
  );
}
