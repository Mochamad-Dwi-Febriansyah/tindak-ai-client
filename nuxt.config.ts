// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
 dir: {
    app: 'app'
  },
  future: {
  compatibilityVersion: 4,
},

  experimental: {
    scanPageMeta: 'after-resolve',
    sharedPrerenderData: false,
    compileTemplate: true,
    resetAsyncDataToUndefined: true,
    templateUtils: true,
    relativeWatchPaths: true,
    normalizeComponentNames: false,
    spaLoadingTemplateLocation: 'within',
    parseErrorData: false,
    pendingWhenIdle: true,
    alwaysRunFetchOnKeyChange: true,
    defaults: {
      useAsyncData: {
        deep: true
      }
    }
  },

  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false
    }
  },
  app:{
    head: {
      title: 'Tindak AI',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'description', content: 'Tindak AI Platform pengaduan infrastruktur, tata kelola, dll.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/logo.png' }
      ]
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@vee-validate/nuxt', '@nuxt/icon', '@pinia/nuxt' ],

   runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
    },
})