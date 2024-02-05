// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  builder: 'vite',
  modules: ['@nuxt/ui'],
  colorMode: {
    classSuffix: ''
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true
  }
})
