import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // ✅ FIX para vue-i18n en ViteSSG (evita el ReferenceError)
  define: {
    __VUE_PROD_DEVTOOLS__: false,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  },

  // ✅ Recomendado para SSR/SSG con FormKit e i18n  
  ssr: {
    noExternal: ['@formkit/vue', '@formkit/i18n', '@formkit/themes', 'vue-i18n'],
    external: ['parse5']
  },

  // ✅ Opcional pero recomendado para optimizar dependencias
  optimizeDeps: {
    include: ['@formkit/vue', '@formkit/i18n', '@formkit/themes', 'vue-i18n']
  }
})
