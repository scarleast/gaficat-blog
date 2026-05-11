/**
 * Excerpt extraction utilities.
 *
 * Given the raw body of a post (markdown, possibly containing HTML) this
 * module extracts a short, plain-text excerpt suitable for listing pages
 * and meta descriptions.
 */

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Default maximum excerpt length in characters. */
const DEFAULT_MAX_LENGTH = 140;

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Extract a plain-text excerpt from post content.
 *
 * The function first looks for an explicit `<!-- more -->` marker.  If the
 * marker is present, everything before it becomes the excerpt.  Otherwise
 * the first `maxLength` characters of the content are used.
 *
 * HTML tags and markdown image syntax are stripped from the result so the
 * excerpt is always plain text.
 *
 * @param content    Raw post content (markdown / HTML).
 * @param maxLength  Maximum number of characters to return (default 140).
 * @returns          A plain-text excerpt string.
 */
export function getExcerpt(content: string, maxLength: number = DEFAULT_MAX_LENGTH): string {
  if (!content) {
    return "";
  }

  // 1. Attempt to extract text before <!-- more -->.
  const moreIndex = content.indexOf("<!-- more -->");
  const rawExcerpt = moreIndex !== -1 ? content.slice(0, moreIndex) : content;

  // 2. Strip markdown images: ![alt](url)
  let text = rawExcerpt.replace(/!\[[^\]]*\]\([^)]*\)/g, "");

  // 3. Strip markdown links but keep the link text: [text](url) → text
  text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");

  // 4. Strip HTML tags.
  text = stripHtml(text);

  // 5. Remove leading/trailing whitespace and collapse runs of whitespace.
  text = text.replace(/\s+/g, " ").trim();

  // 6. Truncate to maxLength, breaking at the last whole character.
  if (text.length <= maxLength) {
    return text;
  }

  // Try to break at the last space so we don't cut a word in half.
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > maxLength * 0.5) {
    return truncated.slice(0, lastSpace) + "...";
  }

  return truncated + "...";
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Remove all HTML tags from a string. */
function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}
