import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import yaml from 'js-yaml';

const configPath = resolve(process.cwd(), 'themes/fluid-astro/_config.yml');
const loaded = yaml.load(readFileSync(configPath, 'utf8')) || {};

export const fluidThemeConfigPath = configPath;

export const fluidThemeConfig = {
  site: {
    title: '',
    subtitle: '',
    description: '',
    url: '',
    language: 'zh-CN',
    ...(loaded.site || {}),
  },
  author: {
    name: '',
    avatar: '',
    intro: '',
    email: '',
    social: {
      zhihu: { enable: false, label: '', url: '', ...(loaded.author?.social?.zhihu || {}) },
      email: { enable: false, label: '', url: '', ...(loaded.author?.social?.email || {}) },
    },
    ...Object.fromEntries(Object.entries(loaded.author || {}).filter(([key]) => key !== 'social')),
  },
  seo: {
    og_locale: 'zh_CN',
    twitter_card: 'summary_large_image',
    ...(loaded.seo || {}),
  },
  feed: {
    title: loaded.site?.title || '',
    description: loaded.site?.description || '',
    language: loaded.site?.language || 'zh-CN',
    limit: 20,
    ...(loaded.feed || {}),
  },
  navbar: {
    blog_title: loaded.site?.title || '',
    menu: [],
    search: true,
    color_toggle: true,
    ...(loaded.navbar || {}),
  },
  banner: {
    image: '',
    mask_alpha: 0.3,
    parallax: true,
    index_height: '100vh',
    post_height: '70vh',
    page_height: '60vh',
    ...(loaded.banner || {}),
  },
  index: {
    slogan: {
      text: loaded.site?.subtitle || '',
      random: true,
      hitokoto: true,
      jinrishici: true,
      ...(loaded.index?.slogan || {}),
    },
    post_url: '/posts/:abbrlink.html',
    per_page: 10,
    ...(loaded.index || {}),
  },
  post: {
    toc: true,
    word_count: true,
    read_time: true,
    copyright: {
      enable: true,
      author: loaded.author?.name || '',
      license_url: '',
      ...(loaded.post?.copyright || {}),
    },
    prev_next: true,
    ...Object.fromEntries(Object.entries(loaded.post || {}).filter(([key]) => key !== 'copyright')),
  },
  pages: {
    about: {
      title: '',
      description: '',
      ...(loaded.pages?.about || {}),
    },
    aboutme: {
      fallback_description: loaded.author?.name ? `关于 ${loaded.author.name}` : '',
      ...(loaded.pages?.aboutme || {}),
    },
    links: {
      title: '',
      description: '',
      ...(loaded.pages?.links || {}),
    },
    ...Object.fromEntries(Object.entries(loaded.pages || {}).filter(([key]) => !['about', 'aboutme', 'links'].includes(key))),
  },
  links: {
    friends: loaded.links?.friends || [],
    application: {
      email: loaded.author?.email || '',
      subject: '',
      body: '',
      blog_name: loaded.site?.title || '',
      description: loaded.site?.subtitle || '',
      url: loaded.site?.url || '',
      icon: loaded.author?.avatar || '',
      ...(loaded.links?.application || {}),
    },
    ...Object.fromEntries(Object.entries(loaded.links || {}).filter(([key]) => !['friends', 'application'].includes(key))),
  },
  footer: {
    powered: {
      enable: true,
      generator: { name: '', url: '', ...(loaded.footer?.powered?.generator || {}) },
      theme: { name: '', url: '', ...(loaded.footer?.powered?.theme || {}) },
      ...Object.fromEntries(Object.entries(loaded.footer?.powered || {}).filter(([key]) => !['generator', 'theme'].includes(key))),
    },
    upyun: {
      enable: true,
      text_prefix: '',
      text_suffix: '',
      url: '',
      logo: '',
      ...(loaded.footer?.upyun || {}),
    },
    beian: {
      icp: { text: '', url: '', ...(loaded.footer?.beian?.icp || {}) },
      police: { text: '', url: '', icon: '', ...(loaded.footer?.beian?.police || {}) },
      ...Object.fromEntries(Object.entries(loaded.footer?.beian || {}).filter(([key]) => !['icp', 'police'].includes(key))),
    },
    ...Object.fromEntries(Object.entries(loaded.footer || {}).filter(([key]) => !['powered', 'upyun', 'beian'].includes(key))),
  },
  dark_mode: {
    enable: true,
    default: 'dark',
    ...(loaded.dark_mode || {}),
  },
  color: {
    theme_color: {
      dark: '#1f3144',
      light: '#2f4154',
      ...(loaded.color?.theme_color || {}),
    },
    ...(loaded.color || {}),
  },
};

export function fluidBannerStyle() {
  return `background-image: url('${fluidThemeConfig.banner.image}');`;
}

export function fluidMaskStyle() {
  return `background-color: rgba(0, 0, 0, ${fluidThemeConfig.banner.mask_alpha});`;
}
