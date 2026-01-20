<script setup>
  import { computed } from 'vue'
  import { useHead } from '@vueuse/head'
  import Hero from '@/components/hero.vue'
  import Nosotros from '@/components/nosotros.vue'
  import Servicios from '@/components/servicios.vue'
  import Resultados from '@/components/resultados.vue'
  import Contacto from '@/components/contacto.vue'

  import { useI18n } from 'vue-i18n'

  const { t, locale } = useI18n()

  useHead({
    title: computed(() => t('meta.title')),
    htmlAttrs: {
      lang: () => locale.value,
    },
    meta: [
      { name: 'description', content: computed(() => t('meta.description')) },
      { name: 'keywords', content: computed(() => t('meta.keywords')) },
      { property: 'og:title', content: computed(() => t('meta.title')) },
      { property: 'og:description', content: computed(() => t('meta.description')) },
      { property: 'og:image', content: 'https://tolkogroup.com/logo-tolko.svg' },
      { property: 'og:url', content: 'https://tolkogroup.com/' },
      { property: 'og:type', content: 'website' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: computed(() => t('meta.title')) },
      { name: 'twitter:description', content: computed(() => t('meta.description')) },
      { name: 'twitter:image', content: 'https://tolkogroup.com/logo-tolko.svg' },
      { name: 'twitter:url', content: 'https://tolkogroup.com/' },
    ],
  })
</script>

<template>
  <Hero />
  <Nosotros />
  <Servicios />
  <Resultados />
  <Contacto />
</template>
