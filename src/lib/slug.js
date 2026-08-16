export function normalizeString(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function toCamelCaseSlug(str) {
  const words = normalizeString(str).split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  return words
    .map((word, i) => {
      const lower = word.toLowerCase();
      return i === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
}