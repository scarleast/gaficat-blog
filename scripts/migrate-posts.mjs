#!/usr/bin/env node

/**
 * migrate-posts.mjs
 *
 * Migrates blog posts from Hexo format to Astro format.
 *
 * Source: /Users/scarleast/Documents/gaficat_blog_hexo_backup/source/_posts/
 * Target: /Users/scarleast/Documents/gaficat_blog/src/content/posts/
 *
 * Uses only Node.js built-in modules (fs, path).
 * Parses YAML frontmatter manually using string operations.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname, extname, basename } from 'node:path';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const SOURCE_DIR = '/Users/scarleast/Documents/gaficat_blog_hexo_backup/source/_posts';
const TARGET_DIR = '/Users/scarleast/Documents/gaficat_blog/src/content/posts';

// Fields to keep in the output frontmatter (lower-case keys for comparison)
const KEEP_FIELDS = new Set([
  'title',
  'date',
  'abbrlink',
  'tags',
  'categories',
  'math',
  'sticky',
  'toc',
]);

// Fields to unconditionally drop
const DROP_FIELDS = new Set([
  'top',
  'cover',
  'layout',    // also matches "Layout" via case-insensitive check
  'password',
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Recursively collect all .md file paths under `dir`.
 */
function collectMarkdownFiles(dir) {
  const results = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMarkdownFiles(fullPath));
    } else if (extname(entry.name).toLowerCase() === '.md') {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Split file content into [frontmatterString, bodyString].
 * Returns [null, fullContent] if no valid frontmatter delimiters are found.
 */
function splitFrontmatter(content) {
  // Content must start with "---\n" (possibly with a BOM before it)
  const trimmed = content.replace(/^\uFEFF/, '');
  if (!trimmed.startsWith('---\n') && !trimmed.startsWith('---\r\n')) {
    return [null, content];
  }

  // Find the closing "---"
  // Start searching after the opening "---\n"
  const afterOpening = trimmed.indexOf('\n') + 1;
  const closingIdx = trimmed.indexOf('\n---', afterOpening);
  if (closingIdx === -1) {
    return [null, content];
  }

  const fm = trimmed.substring(afterOpening, closingIdx);
  const body = trimmed.substring(closingIdx + 4); // skip past "\n---"
  // The body may start with \n or \r\n, keep it as-is (it's the markdown body)
  return [fm, body];
}

/**
 * Parse the frontmatter text into a JS object.
 * Handles:
 *   - Simple key: value pairs
 *   - Inline arrays  [a, b, c]
 *   - Block arrays   "- value"  or  "- [a, b]"
 *   - Nested YAML    "- - a\n    - b"
 */
function parseFrontmatter(fmText) {
  const result = {};
  const lines = fmText.split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip blank lines
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Must be a top-level key: value (no leading whitespace)
    const kvMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)/);
    if (!kvMatch) {
      // Unexpected line format, skip
      i++;
      continue;
    }

    const key = kvMatch[1];                            // preserve original for display
    const normalizedKey = key.toLowerCase();            // normalize for lookups
    const rest = kvMatch[2].trimEnd(); // value portion on the same line (trimmed right)

    // Case 1: key: <inline value> (no newline continuation)
    // Check if there are continuation lines (indented lines following)
    const nextNonBlank = peekNextContentLine(lines, i + 1);

    if (nextNonBlank === null || !nextNonBlank.line.startsWith(' ') && !nextNonBlank.line.startsWith('\t')) {
      // No continuation. Parse the inline value.
      result[normalizedKey] = parseInlineValue(rest);
      i++;
      continue;
    }

    // Case 2: key: followed by indented block (array items)
    // The rest may be empty (e.g. "tags:\n  - a")
    // or may contain a value (should not normally happen, but handle gracefully)
    if (rest !== '') {
      // The rest is the value; no block continuation expected
      result[normalizedKey] = parseInlineValue(rest);
      i++;
      continue;
    }

    // Collect all indented lines that belong to this key.
    // An indented line is one that starts with whitespace (space or tab) or is blank.
    // We stop when we hit a non-blank line that does NOT start with whitespace.
    const blockLines = [];
    i++; // move past the key line
    while (i < lines.length && (/^\s/.test(lines[i]) || lines[i].trim() === '')) {
      blockLines.push(lines[i]);
      i++;
    }

    result[normalizedKey] = parseBlockValue(blockLines);
  }

  return result;
}

/**
 * Look ahead from `startIdx` to find the next non-blank line.
 * Returns { idx, line } or null.
 */
function peekNextContentLine(lines, startIdx) {
  for (let j = startIdx; j < lines.length; j++) {
    if (lines[j].trim() !== '') {
      return { idx: j, line: lines[j] };
    }
  }
  return null;
}

/**
 * Parse an inline YAML value (the portion after "key: ").
 */
function parseInlineValue(val) {
  // Empty -> null
  if (val === '' || val === '~' || val === 'null') {
    return null;
  }

  // Boolean
  if (val === 'true') return true;
  if (val === 'false') return false;

  // Quoted string
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1);
  }

  // Inline array [a, b, c]
  if (val.startsWith('[') && val.endsWith(']')) {
    return parseInlineArray(val);
  }

  // Number
  if (/^-?\d+(\.\d+)?$/.test(val)) {
    return Number(val);
  }

  // Plain string
  return val;
}

/**
 * Parse an inline array like "[电子设计, Mbed]" or "[a]".
 */
function parseInlineArray(str) {
  const inner = str.slice(1, -1).trim();
  if (inner === '') return [];
  return inner.split(',').map(s => s.trim());
}

/**
 * Parse a block of indented lines into a value.
 * Handles:
 *   - Simple list:       "- value\n- value"
 *   - Inline arrays:     "- [a, b]\n- [c, d]"
 *   - Nested YAML list:  "- - a\n    - b"
 */
function parseBlockValue(blockLines) {
  // Remove blank lines, keep indentation info
  const nonBlank = blockLines.filter(l => l.trim() !== '');
  if (nonBlank.length === 0) return null;

  // Determine the common indent (minimum leading spaces among non-blank lines)
  let minIndent = Infinity;
  for (const l of nonBlank) {
    const spaces = l.match(/^(\s*)/)[1].length;
    if (spaces < minIndent) minIndent = spaces;
  }

  // Strip the common indent
  const stripped = nonBlank.map(l => l.substring(minIndent));

  // Check if top-level lines start with "- " (may have sub-items indented under them)
  // We consider a line a "list item" if it starts with "- " at the stripped level.
  // Lines that don't start with "- " are continuations of the previous list item.
  const hasDash = stripped.some(l => /^- /.test(l));

  if (!hasDash) {
    // No list items found; return as-is
    return stripped;
  }

  // Group lines into list items.
  // A line starting with "- " starts a new item.
  // Other lines are continuations of the current item.
  const items = [];
  let currentItem = null;

  for (const l of stripped) {
    if (/^- /.test(l)) {
      // Start a new list item
      if (currentItem !== null) {
        items.push(currentItem);
      }
      currentItem = { main: l.substring(2).trim(), continuations: [] };
    } else if (currentItem !== null) {
      // Continuation line (nested under the current "- " item)
      currentItem.continuations.push(l);
    }
  }
  if (currentItem !== null) {
    items.push(currentItem);
  }

  // Now parse each item
  const result = items.map(item => {
    // If the main content starts with "- ", this is a nested list "- - value"
    if (/^- /.test(item.main)) {
      // This is a nested list item
      const subItems = [{ main: item.main.substring(2).trim() }];
      for (const cont of item.continuations) {
        // Continuation lines like "  - value"
        const trimmed = cont.trimStart();
        if (trimmed.startsWith('- ')) {
          subItems.push({ main: trimmed.substring(2).trim(), continuations: [] });
        } else {
          // Other continuation text
          subItems[subItems.length - 1].continuations.push(cont);
        }
      }
      // Return the sub-items as an array of strings
      return subItems.map(si => si.main);
    }

    // If the main content starts with "[", it's an inline array
    if (/^\[/.test(item.main)) {
      return parseInlineArray(item.main);
    }

    // Otherwise it's a scalar value
    return parseInlineValue(item.main);
  });

  return result;
}

// ---------------------------------------------------------------------------
// Normalization
// ---------------------------------------------------------------------------

/**
 * Normalize categories to the Astro schema format:
 *   string | string[] | string[][]
 *
 * Known input patterns:
 *   a) [音乐, 乐理]                    -> ["音乐", "乐理"]
 *   b) [[电子设计, Mbed]]              -> ["电子设计", "Mbed"]   (single sub-array -> flatten)
 *   c) [["教程", "建站"]]              -> ["教程", "建站"]       (single sub-array -> flatten)
 *   d) "生活"                          -> "生活"
 *   e) ["生活"]                        -> ["生活"]
 *   f) [["电子设计", "树莓派"], ["教程", "树莓派"]]
 *                                      -> [["电子设计","树莓派"], ["教程","树莓派"]]
 *                                         (multiple sub-arrays -> keep as-is)
 *
 * Rule: If array-of-arrays has exactly one sub-array, flatten to string[].
 *       If multiple sub-arrays, keep as string[][].
 */
function normalizeCategories(cats) {
  if (cats === null || cats === undefined) {
    return [];
  }

  // Plain string
  if (typeof cats === 'string') {
    return cats;
  }

  // At this point it must be an array
  if (!Array.isArray(cats)) {
    return [];
  }

  if (cats.length === 0) return [];

  // Check if any element is itself an array
  const hasSubArray = cats.some(item => Array.isArray(item));

  if (hasSubArray) {
    // If exactly one element and it's an array, flatten it
    // This handles: [[电子设计, Mbed]] -> [电子设计, Mbed]
    if (cats.length === 1 && Array.isArray(cats[0])) {
      return cats[0];
    }

    // Multiple sub-arrays: keep as array of arrays
    return cats.map(item => {
      if (Array.isArray(item)) return item;
      // Scalar inside array-of-arrays context: wrap it
      return [item];
    });
  }

  // Flat array: ["生活"] or ["音乐", "乐理"]
  // In Hexo convention, a flat array represents a single category hierarchy
  // e.g. ["音乐", "乐理"] means category path 音乐 > 乐理
  return cats;
}

/**
 * Normalize tags to always be string[].
 * Handles: "生活" (scalar), ["tag1", "tag2"] (array), null, undefined
 */
function normalizeTags(tags) {
  if (tags === null || tags === undefined) {
    return [];
  }
  if (typeof tags === 'string') {
    return [tags];
  }
  if (Array.isArray(tags)) {
    return tags.map(t => String(t));
  }
  return [String(tags)];
}

/**
 * Merge math/mathjax into a single boolean `math`.
 */
function computeMath(parsed) {
  if (parsed.math === true || parsed.mathjax === true) {
    return true;
  }
  if (parsed.math === false || parsed.mathjax === false) {
    return false;
  }
  // Default false
  return false;
}

// ---------------------------------------------------------------------------
// Output serialization
// ---------------------------------------------------------------------------

/**
 * Serialize a value to YAML-like inline format for frontmatter output.
 */
function yamlValue(val) {
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (typeof val === 'number') return String(val);
  if (typeof val === 'string') {
    // Quote if it contains special YAML characters
    if (/:|\{|\}|\[|\]|,|&|\*|#|\?|\||-|<|>|=|!|%|@|`|\s/.test(val) || val === '' || val === 'true' || val === 'false' || val === 'null') {
      const escaped = val.replace(/'/g, "''");
      return `'${escaped}'`;
    }
    return val;
  }
  if (Array.isArray(val)) return yamlArray(val);
  return String(val);
}

/**
 * Serialize an array to YAML format.
 * For arrays of arrays, uses multi-line format.
 * For flat arrays, uses multi-line "- item" format.
 */
function yamlArray(arr) {
  if (arr.length === 0) return '[]';

  // Check if any element is an array (array of arrays)
  const hasSubArray = arr.some(item => Array.isArray(item));

  if (hasSubArray) {
    // Multi-line format for array of arrays
    const lines = arr.map(item => {
      if (Array.isArray(item)) {
        return `  - [${item.join(', ')}]`;
      }
      return `  - ${yamlValue(item)}`;
    });
    return '\n' + lines.join('\n');
  }

  // Flat array - use multi-line format
  const lines = arr.map(item => `  - ${yamlValue(item)}`);
  return '\n' + lines.join('\n');
}

/**
 * Build the output frontmatter string from the normalized fields.
 */
function buildFrontmatter(fields) {
  // Ordered field list for consistent output
  const fieldOrder = ['title', 'date', 'abbrlink', 'tags', 'categories', 'math', 'toc', 'sticky'];

  const lines = ['---'];
  for (const key of fieldOrder) {
    if (!(key in fields)) continue;
    const val = fields[key];

    if (key === 'tags') {
      if (Array.isArray(val) && val.length === 0) continue;
      lines.push(`tags:${yamlArray(val)}`);
    } else if (key === 'categories') {
      if (typeof val === 'string') {
        lines.push(`categories: ${yamlValue(val)}`);
      } else if (Array.isArray(val) && val.length === 0) {
        continue;
      } else if (Array.isArray(val)) {
        lines.push(`categories:${yamlArray(val)}`);
      }
    } else {
      lines.push(`${key}: ${yamlValue(val)}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('=== Hexo -> Astro Post Migration ===\n');
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Target: ${TARGET_DIR}\n`);

  if (!existsSync(SOURCE_DIR)) {
    console.error(`ERROR: Source directory does not exist: ${SOURCE_DIR}`);
    process.exit(1);
  }

  const files = collectMarkdownFiles(SOURCE_DIR);
  console.log(`Found ${files.length} markdown files.\n`);

  let migrated = 0;
  let skipped = 0;
  const warnings = [];

  for (const filePath of files) {
    const relPath = relative(SOURCE_DIR, filePath);
    const fileName = basename(filePath);

    try {
      // Read file
      const raw = readFileSync(filePath, 'utf-8');

      // Split frontmatter and body
      const [fmText, body] = splitFrontmatter(raw);

      if (fmText === null) {
        warnings.push(`[${relPath}] No valid frontmatter found, skipping.`);
        skipped++;
        continue;
      }

      // Parse frontmatter
      const parsed = parseFrontmatter(fmText);

      // Validate required fields
      if (!parsed.title) {
        warnings.push(`[${relPath}] Missing "title" field, skipping.`);
        skipped++;
        continue;
      }
      if (!parsed.date) {
        warnings.push(`[${relPath}] Missing "date" field, skipping.`);
        skipped++;
        continue;
      }
      if (!parsed.abbrlink) {
        warnings.push(`[${relPath}] Missing "abbrlink" field, skipping.`);
        skipped++;
        continue;
      }

      // Build normalized output fields
      const output = {};

      // title
      output.title = String(parsed.title || '');

      // date - keep as-is string
      output.date = String(parsed.date || '');

      // abbrlink
      output.abbrlink = String(parsed.abbrlink || '');

      // tags - normalize to string[]
      output.tags = normalizeTags(parsed.tags);

      // categories - normalize per Astro schema
      const rawCats = parsed.categories;
      output.categories = normalizeCategories(rawCats);

      // math - merge math/mathjax
      output.math = computeMath(parsed);

      // toc - keep if present, default true per Astro schema
      if (parsed.toc !== undefined && parsed.toc !== null) {
        output.toc = parsed.toc === true;
      } else {
        output.toc = true;
      }

      // sticky - keep if present and non-zero/falsy
      if (parsed.sticky !== undefined && parsed.sticky !== null && parsed.sticky !== 0 && parsed.sticky !== false) {
        output.sticky = Number(parsed.sticky);
      }

      // Build output frontmatter
      const newFm = buildFrontmatter(output);

      // Combine: frontmatter + body (body already starts with \n)
      const outputContent = newFm + body;

      // Determine target path (preserve subdirectory structure)
      const targetRelPath = relPath;
      const targetFullPath = join(TARGET_DIR, targetRelPath);
      const targetDir = dirname(targetFullPath);

      // Create target directory if needed
      mkdirSync(targetDir, { recursive: true });

      // Write file
      writeFileSync(targetFullPath, outputContent, 'utf-8');

      migrated++;

      // Log fields that were transformed
      const notes = [];
      if (parsed.mathjax !== undefined) {
        notes.push('mathjax merged -> math');
      }
      if (parsed.top !== undefined) {
        notes.push('top removed');
      }
      if (parsed.cover !== undefined) {
        notes.push('cover removed');
      }
      if (parsed.layout !== undefined) {
        notes.push('layout removed');
      }
      if (parsed.password !== undefined) {
        notes.push('password removed');
      }

      const noteStr = notes.length > 0 ? ` (${notes.join(', ')})` : '';
      console.log(`  [OK] ${relPath}${noteStr}`);

    } catch (err) {
      warnings.push(`[${relPath}] ERROR: ${err.message}`);
      skipped++;
    }
  }

  // Print summary
  console.log('\n=== Migration Summary ===');
  console.log(`  Total files found:  ${files.length}`);
  console.log(`  Successfully migrated: ${migrated}`);
  console.log(`  Skipped/Errors:     ${skipped}`);

  if (warnings.length > 0) {
    console.log(`\n--- Warnings (${warnings.length}) ---`);
    for (const w of warnings) {
      console.log(`  ! ${w}`);
    }
  }

  console.log('\nDone.');
}

main();
