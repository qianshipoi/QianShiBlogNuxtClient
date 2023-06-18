import prismjs from 'vite-plugin-prismjs';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  vite: {
    plugins: [
      prismjs({
        // languages: ['json'],
        languages: 'all',
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_colors.scss" as *;'
        }
      }
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5142/',
          changeOrigin: true
        }
      }
    },
    optimizeDeps: {
      include: ['@kangc/v-md-editor/lib/theme/vuepress.js']
    }
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://localhost:7245/api'
    }
  },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  piniaPersistedstate: {
    storage: 'sessionStorage',
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
  typescript: {
    shim: false
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  routeRules: {
    '/admin/**': { ssr: false },
    '/admin': { ssr: false },
    '/login': { ssr: false }
  },
  plugins: [
    '~/plugins/antd.ts',
    '~/plugins/vMdEditor.client.ts'
  ]
})
