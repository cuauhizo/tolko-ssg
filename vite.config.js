import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import generateSitemap from 'vite-ssg-sitemap'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    ViteImageOptimizer({
      png: {
        quality: 80, // Comprime los PNGs al 80% de calidad
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        lossless: true, // Si usas WebP, no pierde nada de calidad
      },
      svg: {
        multipass: true, // Optimiza a fondo los SVGs (como tus logos e íconos)
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // ✅ FIX para vue-i18n en ViteSSG (evita el ReferenceError)
  define: {
    __VUE_PROD_DEVTOOLS__: false,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },

  // ✅ Recomendado para SSR/SSG con FormKit e i18n
  ssr: {
    noExternal: ['@formkit/vue', '@formkit/i18n', '@formkit/themes', 'vue-i18n'],
    external: ['parse5'],
  },

  // ✅ Opcional pero recomendado para optimizar dependencias
  optimizeDeps: {
    include: ['@formkit/vue', '@formkit/i18n', '@formkit/themes', 'vue-i18n'],
  },

  ssgOptions: {
    script: 'async',
    formatting: 'minify',

    // 3. MAGIA AQUÍ: Se ejecuta al terminar el build
    onFinished() {
      generateSitemap({
        // Asegúrate de poner tu dominio en producción
        hostname: 'https://tolkogroup.com',

        // (Opcional) Si tienes rutas dinámicas como /blog/:id que vite-ssg no
        // puede adivinar por sí solo, las puedes inyectar aquí.
        // Para las estáticas como /contact o /careers, lo hace automático.
        // dynamicRoutes: ['/blog/articulo-1', '/blog/articulo-2']
      })
    },
  },
})
