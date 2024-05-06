import 'dotenv/config';
import process from 'node:process';

import { DefaultTheme, defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "СПБ Вики",
  description: "Вики сайт, для проекта СПБедрок",
  lang: "ru-RU",
  base: "/",
  lastUpdated: true,
  cleanUrls: true,
  assetsDir: "assets",
  srcDir: "src",
  sitemap: {
    hostname: 'https://spb-wiki.blocksum.app/'
  },

  head: [
    ['link', { rel: 'icon', href: '/spb.png' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  themeConfig: {
    // logo: "/logo.png",
    // https://vitepress.dev/reference/default-theme-config
    outlineTitle: 'На этой странице',
    search: getSearchConfig(process.env),
    lastUpdated: {
      text: 'Обновлено',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },
    editLink: {
      pattern: 'https://github.com/blocksum-holding/spb-wiki/edit/main/docs/:path',
      text: 'Редактировать эту страницу на GitHub'
    },
    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница'
    },
    nav: [
      { text: 'Гайды', link: '/guide/guide-server' },
      { text: 'Правила', link: '/rules-server/game-part' }
    ],

    sidebar: [
      {
        text: 'Гайды',
        items: [
          { text: 'Гайд по серверу', link: '/guide/guide-server' },
          { text: 'Пример по создании, страницы', link: '/guide/markdown-examples' }
        ]
      },
      {
        text: 'Правила',
        items: [
          { text: 'Правила игровая часть', link: '/rules-server/game-part' },
          { text: 'Правила техническая часть', link: '/rules-server/technical-part' }
        ]
      }
    ],
  }
})

function getSearchConfig(env: NodeJS.ProcessEnv){
  if (env.DOCSEARCH_APP_ID && env.DOCSEARCH_KEY) {
    return {
      provider: 'algolia',
      options: {
        indexName: 'spb-blocksum',
        appId: env.DOCSEARCH_APP_ID,
        apiKey: env.DOCSEARCH_KEY,
        placeholder: "Попробуем найти?",
      }
    } satisfies DefaultTheme.Config['search'];
  }
}