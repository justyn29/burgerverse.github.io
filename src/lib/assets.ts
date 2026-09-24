/**
 * Centralized asset URL resolver for GitHub Pages and local development.
 * Automatically prefixes the repository subpath (e.g. /burgerverse.github.io) in production.
 */
export const BASE_PATH = 
  process.env.NEXT_PUBLIC_BASE_PATH ?? 
  (process.env.NODE_ENV === "production" ? "/burgerverse.github.io" : "");

export function asset(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (BASE_PATH && clean.startsWith(BASE_PATH)) {
    return clean;
  }
  return `${BASE_PATH}${clean}`;
}
