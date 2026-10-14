export function formatSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function metaDescription(description: string | null | undefined, fallback: string) {
  if (!description) return fallback;

  const normalized = description.replace(/\s+/g, ' ').trim();
  return normalized.length > 155 ? `${normalized.slice(0, 152).trimEnd()}...` : normalized;
}
