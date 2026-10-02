/**
 * Parse JSON content string dari PageSection dengan fallback aman.
 * File ini adalah utility murni (bukan server action) sehingga aman
 * digunakan di Server Component maupun Client Component.
 */
export function parseSectionContent<T = Record<string, unknown>>(
  content: string,
  fallback: T
): T {
  try {
    const parsed = JSON.parse(content);
    if (typeof parsed === "object" && parsed !== null) {
      return parsed as T;
    }
    return fallback;
  } catch {
    return fallback;
  }
}
