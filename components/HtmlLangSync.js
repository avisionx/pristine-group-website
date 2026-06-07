// Sets <html lang> to the active locale. The root layout statically renders the
// default locale's lang (it sits above the dynamic [lang] segment), so this
// corrects it for other locales. Rendered as an inline script so it runs while
// the document is parsed — before paint and independent of React hydration.
export default function HtmlLangSync({ lang }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang=${JSON.stringify(lang)};`,
      }}
    />
  );
}
