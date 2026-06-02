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

  // Computed para construir la URL base según el idioma activo
  const currentUrl = computed(() => {
    // Si es el idioma por defecto (en), podemos dejar la raíz o /en. Lo ideal es mantener consistencia.
    return `https://tolkogroup.com/${locale.value}`
  })

  useHead({
    title: computed(() => t('meta.title')),
    htmlAttrs: {
      lang: () => locale.value,
    },
    meta: [
      // 📝 NOTA: Se eliminó el canonical de aquí porque no es una etiqueta meta
      { name: 'description', content: computed(() => t('meta.description')) },
      { name: 'keywords', content: computed(() => t('meta.keywords')) },
      { property: 'og:title', content: computed(() => t('meta.title')) },
      { property: 'og:description', content: computed(() => t('meta.description')) },
      { property: 'og:image', content: 'https://tolkogroup.com/logo-tolko.svg' },
      { property: 'og:url', content: currentUrl }, // 🌟 DINÁMICO: Cambia según el idioma
      { property: 'og:type', content: 'website' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: computed(() => t('meta.title')) },
      { name: 'twitter:description', content: computed(() => t('meta.description')) },
      { name: 'twitter:image', content: 'https://tolkogroup.com/logo-tolko.svg' },
      { name: 'twitter:url', content: currentUrl }, // 🌟 DINÁMICO
    ],
    // 🌟 NUEVO: El lugar correcto para las etiquetas <link>
    link: [
      { rel: 'canonical', href: currentUrl }, // Canonical corregido y dinámico

      // Etiquetas hreflang indispensables para SEO internacional
      { rel: 'alternate', hreflang: 'en', href: 'https://tolkogroup.com/en' },
      { rel: 'alternate', hreflang: 'es', href: 'https://tolkogroup.com/es' },
      { rel: 'alternate', hreflang: 'x-default', href: 'https://tolkogroup.com/' }, // URL de caída por defecto
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Tolko Group',
          alternateName: 'Tolko',
          url: 'https://tolkogroup.com/',
          logo: 'https://tolkogroup.com/logo-tolko.svg',
          description: t('meta.description'),
          contactPoint: [
            {
              '@type': 'ContactPoint',
              telephone: '+52-55-6726-0647',
              contactType: 'customer service',
              email: 'tolko360@tolkogroup.com',
              areaServed: 'MX',
              availableLanguage: ['Spanish', 'English'],
            },
          ],
          sameAs: ['https://www.facebook.com/tolkogroup/', 'https://twitter.com/tolkogroup', 'https://www.instagram.com/grupo_tolko', 'https://www.linkedin.com/company/tolko/'],
        }),
      },
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
