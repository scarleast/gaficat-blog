import { getCollection } from "astro:content";
import { normalizeCategories } from "../utils/categories";
import { getExcerpt } from "../utils/excerpt";

function stripForSearch(content: string): string {
  return content
    .replace(/^\s*import\s.+$/gm, " ")
    .replace(/^\s*export\s.+$/gm, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/[#>*_\-[\](){},.!?:;"'`~|\\/]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function categoryNames(raw: unknown): string[] {
  const normalized = normalizeCategories(raw);
  const list = Array.isArray(normalized) ? normalized : [normalized];
  return list
    .filter(Boolean)
    .map((category) => category.fullPath)
    .filter(Boolean);
}

function searchExcerpt(content: string, fallback?: string): string {
  if (fallback) {
    return fallback;
  }

  const text = stripForSearch(content);
  return text.length > 180 ? `${text.slice(0, 180)}...` : text;
}

export async function GET() {
  const posts = (await getCollection("posts"))
    .filter((post) => !("draft" in post.data && post.data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((post) => {
      const categories = categoryNames(post.data.categories);
      const excerpt = searchExcerpt(post.body, post.data.excerpt || getExcerpt(stripForSearch(post.body), 180));
      const bodyText = stripForSearch(post.body).slice(0, 5000);

      return {
        title: post.data.title,
        url: `/posts/${post.data.abbrlink}`,
        date: post.data.date.toISOString(),
        tags: post.data.tags,
        categories,
        excerpt,
        text: [
          post.data.title,
          categories.join(" "),
          post.data.tags.join(" "),
          excerpt,
          bodyText,
        ].join(" "),
      };
    });

  return new Response(JSON.stringify(posts), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
