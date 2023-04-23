import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  ssr: false,
  components: [
    { path: '~/components/organisms' },
    { path: '~/components/molecules' },
  ],
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [
      svgLoader({
        defaultImport: 'component',
        svgo: false,
      }),
    ],
  },
  build: {
    transpile: ['gsap'],
  },
})
