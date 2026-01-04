import { resolve } from 'path'

export default {
  // ===============================
  // CORE CONFIG
  // ===============================
  ssr: true,
  target: 'server',

  generate: {
    fallback: true
  },

  alias: {
    images: resolve(__dirname, './assets/images'),
    style: resolve(__dirname, './assets/style')
  },

  // ===============================
  // GLOBAL SEO / HEAD
  // ===============================
  head: {
    htmlAttrs: {
      lang: 'en'
    },

    titleTemplate: '%s | JustPlay TV',
    title: 'Watch Free Movies & TV Shows',

    meta: [
      { charset: 'utf-8' },

      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },

      {
        hid: 'description',
        name: 'description',
        content:
          'Watch free movies and TV shows online on JustPlay TV. Stream instantly in HD without download.'
      },

      {
        name: 'google-site-verification',
        content: '8jTfz360_CnOJB4bILz7tEpumsS2BBAyQXEZuKEJSWk'
      },

      {
        hid: 'robots',
        name: 'robots',
        content: 'index, follow'
      },

      // OPEN GRAPH
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'JustPlay TV – Free Streaming'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Stream free movies and TV shows online in HD quality on JustPlay TV.'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:locale',
        property: 'og:locale',
        content: 'en_US'
      }
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
      },

      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
      }
    ]
  },

  // ===============================
  // GLOBAL CSS
  // ===============================
  css: ['@/assets/style/app.css'],

  // ===============================
  // PLUGINS (NO DUPLICATE ❗)
  // ===============================
  plugins: [
    '~/plugins/lodash.js',
    { src: '~/plugins/infiniteloading.js', mode: 'client' }
  ],

  // ===============================
  // AUTO COMPONENTS
  // ===============================
  components: true,

  // ===============================
  // MODULES
  // ===============================
  buildModules: ['@nuxtjs/moment'],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap'
  ],

  // ===============================
  // SITEMAP
  // ===============================
  sitemap: {
    hostname: 'https://justplay-tv.online',
    gzip: true
  },

  // ===============================
  // I18N
  // ===============================
  i18n: {
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en-US.js' }
    ]
  },

  // ===============================
  // AXIOS
  // ===============================
  axios: {
    baseURL: 'https://api.themoviedb.org/3'
  },

  // ===============================
  // BUILD OPTIMIZATION
  // ===============================
  build: {
    terser: {
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  }
}
