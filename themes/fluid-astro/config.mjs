import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import yaml from 'js-yaml';

const configPath = resolve(process.cwd(), 'themes/fluid-astro/_config.yml');
const loaded = yaml.load(readFileSync(configPath, 'utf8')) || {};

export const fluidThemeConfigPath = configPath;

export const fluidThemeConfig = {
  site: {
    title: '加菲猫的创客工坊',
    subtitle: '踏上取经路比取得真经更重要。',
    description: '',
    url: 'https://www.gaficat.com',
    language: 'zh-CN',
    ...(loaded.site || {}),
  },
  navbar: {
    blog_title: loaded.site?.title || '加菲猫的创客工坊',
    menu: [],
    search: true,
    color_toggle: true,
    ...(loaded.navbar || {}),
  },
  banner: {
    image: 'https://pic.gaficat.com/halo/banner.png',
    mask_alpha: 0.3,
    parallax: true,
    index_height: '100vh',
    post_height: '70vh',
    page_height: '60vh',
    ...(loaded.banner || {}),
  },
  index: {
    slogan: {
      text: loaded.site?.subtitle || '踏上取经路比取得真经更重要。',
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
    copyright: { enable: true, ...(loaded.post?.copyright || {}) },
    prev_next: true,
    ...(loaded.post || {}),
  },
  footer: {
    powered: {
      enable: true,
      generator: { name: 'Astro', url: 'https://astro.build/' },
      theme: { name: 'Fluid', url: 'https://github.com/chengzhongxue/halo-theme-fluid' },
      ...(loaded.footer?.powered || {}),
    },
    upyun: {
      enable: true,
      text_prefix: '本站由',
      text_suffix: '提供对象存储服务',
      url: 'https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral',
      logo: '/img/upyun_logo8.svg',
      ...(loaded.footer?.upyun || {}),
    },
    beian: {
      icp: { text: '', url: 'https://beian.miit.gov.cn/', ...(loaded.footer?.beian?.icp || {}) },
      police: { text: '', url: '', icon: '/img/police_beian.png', ...(loaded.footer?.beian?.police || {}) },
      ...(loaded.footer?.beian || {}),
    },
    ...(loaded.footer || {}),
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
