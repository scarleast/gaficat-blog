import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const packageDir = dirname(fileURLToPath(import.meta.url));
const packageConfigPath = resolve(packageDir, '_config.yml');

function resolveConfigPath() {
  if (process.env.FLUID_ASTRO_CONFIG) {
    return resolve(process.cwd(), process.env.FLUID_ASTRO_CONFIG);
  }

  const hostThemeConfigPath = resolve(process.cwd(), 'themes/fluid-astro/_config.yml');
  if (existsSync(hostThemeConfigPath)) {
    return hostThemeConfigPath;
  }

  return packageConfigPath;
}

const configPath = resolveConfigPath();
const loaded = yaml.load(readFileSync(configPath, 'utf8')) || {};

export const fluidThemeConfigPath = configPath;

function buildFluidThemeConfig(config) {
  return {
  site: {
    title: '',
    subtitle: '',
    description: '',
    url: '',
    language: 'zh-CN',
    ...(config.site || {}),
  },
  author: {
    name: '',
    avatar: '',
    intro: '',
    email: '',
    social: {
      zhihu: { enable: false, label: '', url: '', ...(config.author?.social?.zhihu || {}) },
      email: { enable: false, label: '', url: '', ...(config.author?.social?.email || {}) },
    },
    ...Object.fromEntries(Object.entries(config.author || {}).filter(([key]) => key !== 'social')),
  },
  seo: {
    og_locale: 'zh_CN',
    twitter_card: 'summary_large_image',
    ...(config.seo || {}),
  },
  feed: {
    title: config.site?.title || '',
    description: config.site?.description || '',
    language: config.site?.language || 'zh-CN',
    limit: 20,
    ...(config.feed || {}),
  },
  navbar: {
    blog_title: config.site?.title || '',
    menu: [],
    search: true,
    color_toggle: true,
    ...(config.navbar || {}),
  },
  banner: {
    image: '',
    mask_alpha: 0.3,
    parallax: true,
    index_height: '100vh',
    post_height: '70vh',
    page_height: '60vh',
    ...(config.banner || {}),
  },
  index: {
    slogan: {
      text: config.site?.subtitle || '',
      random: true,
      hitokoto: true,
      jinrishici: true,
      ...(config.index?.slogan || {}),
    },
    post_url: '/posts/:abbrlink.html',
    per_page: 10,
    ...(config.index || {}),
  },
  post: {
    toc: true,
    word_count: true,
    read_time: true,
    copyright: {
      enable: true,
      author: config.author?.name || '',
      license_url: '',
      ...(config.post?.copyright || {}),
    },
    prev_next: true,
    ...Object.fromEntries(Object.entries(config.post || {}).filter(([key]) => key !== 'copyright')),
  },
  pages: {
    about: {
      title: '',
      description: '',
      ...(config.pages?.about || {}),
    },
    aboutme: {
      fallback_description: config.author?.name ? `关于 ${config.author.name}` : '',
      ...(config.pages?.aboutme || {}),
    },
    links: {
      title: '',
      description: '',
      ...(config.pages?.links || {}),
    },
    ...Object.fromEntries(Object.entries(config.pages || {}).filter(([key]) => !['about', 'aboutme', 'links'].includes(key))),
  },
  links: {
    friends: config.links?.friends || [],
    application: {
      email: config.author?.email || '',
      subject: '',
      body: '',
      blog_name: config.site?.title || '',
      description: config.site?.subtitle || '',
      url: config.site?.url || '',
      icon: config.author?.avatar || '',
      ...(config.links?.application || {}),
    },
    ...Object.fromEntries(Object.entries(config.links || {}).filter(([key]) => !['friends', 'application'].includes(key))),
  },
  footer: {
    powered: {
      enable: true,
      generator: { name: '', url: '', ...(config.footer?.powered?.generator || {}) },
      theme: { name: '', url: '', ...(config.footer?.powered?.theme || {}) },
      ...Object.fromEntries(Object.entries(config.footer?.powered || {}).filter(([key]) => !['generator', 'theme'].includes(key))),
    },
    upyun: {
      enable: true,
      text_prefix: '',
      text_suffix: '',
      url: '',
      logo: '',
      ...(config.footer?.upyun || {}),
    },
    beian: {
      icp: { text: '', url: '', ...(config.footer?.beian?.icp || {}) },
      police: { text: '', url: '', icon: '', ...(config.footer?.beian?.police || {}) },
      ...Object.fromEntries(Object.entries(config.footer?.beian || {}).filter(([key]) => !['icp', 'police'].includes(key))),
    },
    ...Object.fromEntries(Object.entries(config.footer || {}).filter(([key]) => !['powered', 'upyun', 'beian'].includes(key))),
  },
  dark_mode: {
    enable: true,
    default: 'dark',
    ...(config.dark_mode || {}),
  },
  color: {
    theme_color: {
      dark: '#1f3144',
      light: '#2f4154',
      ...(config.color?.theme_color || {}),
    },
    ...(config.color || {}),
  },
  };
}

export const fluidThemeConfig = buildFluidThemeConfig(loaded);

export function fluidBannerStyle() {
  return `background-image: url('${fluidThemeConfig.banner.image}');`;
}

export function fluidMaskStyle() {
  return `background-color: rgba(0, 0, 0, ${fluidThemeConfig.banner.mask_alpha});`;
}

export function loadFluidThemeConfig(configFilePath = fluidThemeConfigPath) {
  const config = yaml.load(readFileSync(resolve(process.cwd(), configFilePath), 'utf8')) || {};
  return buildFluidThemeConfig(config);
}
