// Build a locale-prefixed, trailing-slash href (matches next.config trailingSlash).
//   href("en")              -> "/en/"
//   href("en", "/about")    -> "/en/about/"
//   href("en", "/projects/retail") -> "/en/projects/retail/"
export function href(lang, path = "/") {
  const clean = path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `/${lang}${clean}/`;
}
