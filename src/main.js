import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import router from './router'
import AOS from 'aos'
import { createI18n } from 'vue-i18n'
import { messages } from '@/lang/messages.js'
import VueNumberFormat from 'vue-number-format'
import './assets/main.css'
import 'aos/dist/aos.css'
import { plugin, defaultConfig } from '@formkit/vue'
import formKitConfig from '../formkit.config.js'
import { createGtm } from '@gtm-support/vue-gtm'

// --- Configura i18n ---
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  legacy: false,
})

export const createApp = ViteSSG(
  App,
  {
    routes: router.options.routes,
  },
  ({ app, router, routes, isClient, initialState }) => {
    // Instalar plugins de Vue como Vue Router
    app.use(router)
    app.use(i18n)
    
    // Puedes mover la inicialización de AOS aquí, o en un componente de nivel superior como App.vue
    if (isClient) {
      app.use(createGtm({
        id: 'GTM-WQQ6SXMJ', // Reemplaza por tu ID de GTM
        defer: false,
        enabled: true,
        debug: true, // Cambiar a false en producción
        loadScript: true,
        vueRouter: router, // ESTO es lo que permite medir secciones automáticamente
      }))
      app.use(VueNumberFormat, { prefix: '$ ', decimal: '.', thousand: ',' })
      app.use(plugin, defaultConfig(formKitConfig))
      AOS.init()
    }
  },
)
