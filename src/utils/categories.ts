/**
 * Category normalization utilities.
 *
 * Astro content collections may store frontmatter `categories` in
 * several shapes depending on the historical authoring convention.
 * This module normalises all of them into a single `NormalizedCategory[]`
 * so consuming components only ever deal with one structure.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type NormalizedCategory = {
  /** Top-level category, e.g. "生活" */
  primary: string;
  /** Optional sub-category, e.g. "乐理" */
  secondary?: string;
  /** Slash-joined path, e.g. "音乐/乐理" */
  fullPath: string;
};

// ---------------------------------------------------------------------------
// Normalizer
// ---------------------------------------------------------------------------

/**
 * Normalise the raw `categories` frontmatter value into a consistent array.
 *
 * Supported input formats:
 *
 * | Format          | Example                              |
 * |-----------------|--------------------------------------|
 * | `string`        | `"生活"`                             |
 * | `string[]`      | `["音乐", "乐理"]`                   |
 * | `string[][]`    | `[["电子设计", "Mbed"]]`             |
 * | mixed array     | `["生活", ["电子设计", "Mbed"]]`     |
 */
export function normalizeCategories(raw: unknown): NormalizedCategory[] {
  if (!raw) {
    return [];
  }

  // A bare string → single category with no sub-category.
  if (typeof raw === "string") {
    return toNormalized([raw]);
  }

  // We expect an array from here on.
  if (!Array.isArray(raw)) {
    return [];
  }

  const results: NormalizedCategory[] = [];

  for (const item of raw) {
    // Nested array, e.g. ["电子设计", "Mbed"]
    if (Array.isArray(item)) {
      const strings = item.filter(isNonEmptyString);
      if (strings.length > 0) {
        results.push(...toNormalizedList(strings));
      }
      continue;
    }

    // Flat string entry, e.g. "音乐"
    if (typeof item === "string" && item.length > 0) {
      results.push(toNormalized([item])[0]);
      continue;
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a single `NormalizedCategory` from a list of segments. */
function toNormalized(segments: string[]): NormalizedCategory {
  const primary = segments[0];
  const secondary = segments.length > 1 ? segments.slice(1).join("/") : undefined;
  const fullPath = segments.join("/");

  return {
    primary,
    ...(secondary ? { secondary } : {}),
    fullPath,
  };
}

/** Build one `NormalizedCategory` per segment so each gets its own entry. */
function toNormalizedList(segments: string[]): NormalizedCategory[] {
  if (segments.length === 0) {
    return [];
  }

  // If there is more than one segment treat them as a path hierarchy.
  return [toNormalized(segments)];
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}
