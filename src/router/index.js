import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router' // ¡Importa createMemoryHistory!

const routes = [
  {
    path: '/',
    name: 'Root',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/en',
    name: 'HomeEN',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/es',
    name: 'HomeES',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/creative-basecamp',
    name: 'Unete',
    // Ajusta la ruta del import dependiendo de dónde guardaste el archivo
    component: () => import('@/views/UneteView.vue'),
  },
  // Ruta comodín para 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  // **Esta es la línea clave que debes cambiar**
  // Usa createMemoryHistory() para SSR (cuando 'window' no existe)
  // y createWebHistory() para el cliente (navegador)
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes,
  // --- NUEVA FUNCIONALIDAD DE SCROLL ---
  scrollBehavior(to, from, savedPosition) {
    // Si el usuario usa los botones de "Atrás/Adelante" del navegador, lo regresa a donde estaba leyendo
    if (savedPosition) {
      return savedPosition
    }
    // Si es una navegación nueva, lo manda hasta arriba al inicio de la página
    else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

export default router
