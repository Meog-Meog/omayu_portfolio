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
          content: 'https://mayuteramoto.netlify.app/image/ogp.png',
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
    { path: '~/components/v2' },
    { path: '~/components/v2/panels' },
    { path: '~/components/v2/fullScreenPanels' },
    { path: '~/components/v2/buttons' },
    { path: '~/components/organisms' },
    { path: '~/components/molecules' },
    { path: '~/components/atoms' },
  ],
  css: ['@/assets/css/main.css'],
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
