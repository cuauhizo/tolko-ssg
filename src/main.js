import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import router from './router'
import { createGtm } from '@gtm-support/vue-gtm'
import AOS from 'aos'
import { createI18n } from 'vue-i18n'
import { messages } from '@/lang/messages.js'
import VueNumberFormat from 'vue-number-format'
import './assets/main.css'
import 'aos/dist/aos.css'
import { plugin, defaultConfig } from '@formkit/vue'
import formKitConfig from '../formkit.config.js'

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

    // Guard de navegación para interceptar el idioma desde la URL
    router.beforeEach((to, from, next) => {
      // Obtenemos el primer segmento de la ruta (ej: 'en' o 'es')
      const segmentoIdioma = to.path.split('/')[1]

      if (segmentoIdioma === 'es') {
        i18n.global.locale.value = 'es'
      } else if (segmentoIdioma === 'en') {
        i18n.global.locale.value = 'en'
      } else if (to.path === '/') {
        // Si entra a la raíz pura '/', le asignamos el idioma por defecto
        i18n.global.locale.value = 'en'
      }
      next()
    })

    // Puedes mover la inicialización de AOS aquí, o en un componente de nivel superior como App.vue
    if (isClient) {
      app.use(
        createGtm({
          id: import.meta.env.VITE_GTM_ID, // Reemplaza esto con el ID real de tu contenedor GTM
          defer: false, // Inyecta el script normalmente
          compatibility: false,
          vueRouter: router, // ¡MAGIA! Esto hace que GTM rastree cada vez que cambias de página sin recargar
          debug: false, // Ponlo en 'false' cuando lo subas a producción
        }),
      )
      app.use(VueNumberFormat, { prefix: '$ ', decimal: '.', thousand: ',' })
      app.use(plugin, defaultConfig(formKitConfig))
      AOS.init()
    }
  },
)
