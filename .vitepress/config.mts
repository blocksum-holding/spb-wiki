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
    returnToTopLabel: 'Вернуться на верх',
    sidebarMenuLabel: 'Меню',
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
      pattern: 'https://github.com/blocksum-holding/spb-wiki/edit/main/src/:path',
      text: 'Редактировать эту страницу на GitHub'
    },
    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница'
    },
    nav: [
      { text: 'Гайды', link: '/guides/index' },
      { text: 'Правила', link: '/rules/server' },
    ],

    sidebar: [
      {
        text: 'Правила',
        items: [
          { text: 'Правила сервера', link: '/rules/server' },
          { text: 'Штрафы', link: '/rules/fines/index', items: [
            { text: 'Штрафы ТФ', link: '/rules/fines/trade-federation' },
            { text: 'Штрафы Бюрократии', link: '/rules/fines/ministry-of-bureaucracy' }
          ] }
        ]
      },
      {
        text: 'Гайды',
        link: '/guides/guide-server',
        items: [
          { text: 'Смена никнейма', link: '/guides/changing-nickname' },
          { text: 'Откат версии', link: '/guides/rolling-back-version' },
          { text: 'Как зайти на СПБ', items: [
            { text: 'Как зайти на СПБ с Nintendo Switch', link: '/guides/join-on-nintendo-switch'},
            { text: 'Как зайти с PS4/PS5', link: '/guides/join-on-playstation'},
          ]},
          { text: 'Гайд по 4D скинам', collapsed: true, items: [
            { text: 'Замена UUID в паке', link: '/guides/4d-skins/replacing-uuid'},
            { text: 'Добавление скинов в пак', link: '/guides/4d-skins/adding-skins'},
            { text: 'Изменение названия скинов', link: '/guides/4d-skins/changing-skins-name'},
            { text: 'Порт Bedrock Models', link: '/guides/4d-skins/porting-models'},
            { text: 'Анимированные скины', link: '/guides/4d-skins/animated-skins'},
            { text: 'Cоздание светящихся скинов', link: '/guides/4d-skins/creating-glowing-skins'},
          ]},
          { text: 'Пример для страницы', link: '/guides/markdown-examples' }
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
