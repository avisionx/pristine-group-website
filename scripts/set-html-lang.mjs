// Post-build: stamp the correct `<html lang>` into each non-default locale's
// exported HTML.
//
// Why this exists: Next requires the ROOT app/layout.js to render <html>/<body>,
// but that layout is above the [lang] segment and can't read the locale — so it
// can only emit one static lang ("en"). There's no Next-native way to set the
// html lang from the nested [lang] layout. For a static export the reliable fix
// is to rewrite the attribute in the generated files. (A runtime inline script
// in HtmlLangSync also corrects it, which additionally covers `next dev`.)

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { i18n } from "../lib/i18n-config.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "out");

async function htmlFiles(dir) {
  const found = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await htmlFiles(p)));
    else if (entry.name.endsWith(".html")) found.push(p);
  }
  return found;
}

let total = 0;
for (const lang of i18n.locales) {
  if (lang === i18n.defaultLocale) continue; // already correct
  const files = await htmlFiles(join(OUT, lang));
  let n = 0;
  for (const file of files) {
    const html = await readFile(file, "utf8");
    const fixed = html.replace(/(<html\b[^>]*?\blang=")[^"]*(")/i, `$1${lang}$2`);
    if (fixed !== html) {
      await writeFile(file, fixed);
      n += 1;
    }
  }
  total += n;
  console.log(`  lang="${lang}" → ${n} html files`);
}
console.log(`✓ set-html-lang: updated ${total} files`);
