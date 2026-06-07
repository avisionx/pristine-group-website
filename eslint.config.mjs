import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tailwind from "eslint-plugin-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Build artifacts and vendored output — never lint these.
  {
    ignores: [".next/**", "out/**", "node_modules/**"],
  },

  // Next.js recommended rules + Core Web Vitals, bridged from the legacy
  // shareable config (eslint-config-next is still eslintrc-format) into
  // ESLint 9's flat config.
  ...compat.extends("next/core-web-vitals"),

  // Tailwind CSS rules (class ordering, shorthands, contradicting/unknown
  // classes). Ships a native flat config for ESLint 9.
  ...tailwind.configs["flat/recommended"],

  {
    settings: {
      tailwindcss: {
        // Tailwind v4 is CSS-first — there is no tailwind.config.js, so the
        // plugin's default config lookup fails. Point it at the CSS entry so it
        // reads the @theme tokens (bg-cream, text-ink, text-brand-blue, …) and
        // @layer utilities instead of reporting them as unknown classes.
        // Must be absolute: tailwind-api-utils resolves the tailwindcss package
        // relative to this path's directory, and a relative path breaks that.
        config: join(__dirname, "app/globals.css"),
      },
    },
    rules: {
      // Static export (next.config.mjs: output "export" + images.unoptimized).
      // next/image can't optimize without a server and renders a plain <img>
      // anyway, so the rule's premise doesn't hold here.
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
