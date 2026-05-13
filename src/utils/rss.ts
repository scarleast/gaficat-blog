import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { fluidThemeConfig } from '../../themes/fluid-astro/config.mjs';

type FeedUrlMode = 'modern' | 'legacy';

interface BuildRssOptions {
  urlMode?: FeedUrlMode;
}

function postLink(abbrlink: string, urlMode: FeedUrlMode) {
  const path = `/posts/${abbrlink}`;
  return urlMode === 'legacy' ? `${path}.html` : path;
}

export async function buildRssResponse(context: APIContext, options: BuildRssOptions = {}) {
  const urlMode = options.urlMode ?? 'modern';
  const posts = (await getCollection('posts'))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, fluidThemeConfig.feed.limit);

  return rss({
    title: fluidThemeConfig.feed.title,
    description: fluidThemeConfig.feed.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: postLink(post.data.abbrlink, urlMode),
      description: post.data.excerpt || '',
    })),
    customData: `<language>${fluidThemeConfig.feed.language}</language>`,
    trailingSlash: false,
  });
}
