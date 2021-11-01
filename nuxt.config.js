export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'assai',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/global-mixins',
    '~/services/http.service.js',
    // { src: '~/plugins/vue-aos', mode: 'client' },
    // { src: '~/directives/aos-directive.js', ssr: true },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  router: {
    middleware: 'router_middleware'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg',
    'nuxt-i18n',
    '@nuxtjs/device',
    ['cookie-universal-nuxt', { parseJSON: false }],
    'vue-social-sharing/nuxt'
  ],

  i18n: {
    locales: [
      { name: 'United States', code: 'en', file: 'EN.js' },
      { name: 'Russian', code: 'ru', file: 'RU.js' },
      { name: 'China', code: 'zh', file: 'ZH.js' },
    ],
    detectBrowserLanguage: false,
    defaultLocale: 'en',
    lazy: true,
    langDir: 'lang/',
    vueI18nLoader: true,
    strategy: 'prefix_except_default'
  },

  extend(config, ctx) {
    config.devtool = ctx.isClient ? 'eval-source-map' : 'inline-source-map';
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    styleResources: {
      scss : '~/assets/scss/_nuxt-imports.scss'
    },
  },
}
