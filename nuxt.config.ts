import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja',
        prefix: 'og: http://ogp.me/ns#',
      },
      meta: [
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Mayu Teramoto' },
        {
          property: 'og:image',
          content: 'https://mayuteramoto.netlify.app/images/ogp.png',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
    },
  },
  components: [
    { path: '~/components/organisms' },
    { path: '~/components/molecules' },
  ],
  css: ['@/assets/css/main.css'],
  modules: ['@nuxt/image'],
  vite: {
    plugins: [
      svgLoader({
        defaultImport: 'component',
        svgo: false,
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/css/_mixin.scss";',
        },
      },
    },
  },
  build: {
    transpile: ['gsap'],
  },
})
