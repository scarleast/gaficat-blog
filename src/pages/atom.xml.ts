import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts'))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, 20);

  return rss({
    title: '加菲猫的创客工坊',
    description: '分享各种电子设计DIY、物联网DIY、读书笔记、生活想法、流行钢琴、工作踩坑',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/posts/${post.data.abbrlink}.html`,
      description: post.data.excerpt || '',
    })),
    customData: '<language>zh-CN</language>',
  });
}
