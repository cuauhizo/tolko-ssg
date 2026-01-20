import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router' // ¡Importa createMemoryHistory!

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
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
})

export default router
