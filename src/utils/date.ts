/**
 * Date and reading-time utilities.
 */

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

/**
 * Format a `Date` into a human-readable Chinese date string.
 *
 * @example formatDate(new Date("2020-01-29")) // "2020年1月29日"
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}年${month}月${day}日`;
}

/**
 * Format a `Date` into an ISO-style date string (YYYY-MM-DD).
 *
 * @example formatISODate(new Date("2020-01-29")) // "2020-01-29"
 */
export function formatISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// ---------------------------------------------------------------------------
// Reading time
// ---------------------------------------------------------------------------

/**
 * Estimate reading time for a piece of content.
 *
 * The calculation uses a rate of roughly **300 Chinese characters per minute**
 * which is a commonly accepted average for adult readers of Chinese text.
 * HTML tags are stripped before counting so that markup does not inflate
 * the estimate.
 *
 * @param content  Raw markdown / HTML content.
 * @returns        Estimated reading time in whole minutes (minimum 1).
 */
export function getReadingTime(content: string): number {
  const CHARS_PER_MINUTE = 300;

  // Strip HTML tags so they don't contribute to character count.
  const stripped = stripHtml(content);

  // Count characters that are either:
  //   - CJK unified ideographs / common CJK ranges, or
  //   - ASCII word characters (treated as word-based reading).
  let charCount = 0;
  let wordCount = 0;

  for (const char of stripped) {
    if (isCJK(char)) {
      charCount += 1;
    }
  }

  // Count English words (sequences of Latin letters / digits).
  const latinWords = stripped.match(/[a-zA-Z0-9]+/g);
  if (latinWords) {
    // Roughly 1 English word ≈ 1.5 CJK characters in reading effort.
    wordCount = latinWords.length;
  }

  const total = charCount + wordCount * 1.5;
  const minutes = Math.ceil(total / CHARS_PER_MINUTE);

  // Always return at least 1 minute so a post never shows "0 min read".
  return Math.max(1, minutes);
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Remove all HTML tags from a string. */
function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

/** Check whether a single character falls within common CJK Unicode ranges. */
function isCJK(char: string): boolean {
  const code = char.codePointAt(0);
  if (code === undefined) {
    return false;
  }

  return (
    // CJK Unified Ideographs
    (code >= 0x4e00 && code <= 0x9fff) ||
    // CJK Unified Ideographs Extension A
    (code >= 0x3400 && code <= 0x4dbf) ||
    // CJK Unified Ideographs Extension B – F (supplementary planes)
    (code >= 0x20000 && code <= 0x2a6df) ||
    // CJK Compatibility Ideographs
    (code >= 0xf900 && code <= 0xfaff) ||
    // Katakana & Hiragana
    (code >= 0x3040 && code <= 0x30ff) ||
    // Hangul Syllables (Korean)
    (code >= 0xac00 && code <= 0xd7a3) ||
    // Fullwidth forms
    (code >= 0xff00 && code <= 0xffef)
  );
}
