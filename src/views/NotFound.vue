<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useHead } from '@vueuse/head'

  const { t, locale } = useI18n()
  useHead({
    title: computed(() => t('notFound.title')),
    htmlAttrs: {
      lang: () => locale.value,
    },
  })
</script>

<template>
  <section id="section1" class="container flex flex-wrap justify-items-center items-center content-center min-h-lvh gap-12 py-[5rem] xl:min-h-[695px]">
    <div class="w-full" data-aos="fade-right" data-aos-anchor-placement="top-bottom">
      <h1 class="hero-text font-lemon-bold text-center text-[2.244rem] md:text-[3.196rem] font-bold">{{ $t('notFound.head') }}</h1>
    </div>
    <div class="space-y-6 md:space-y-8 w-full" data-aos="fade-left">
      <h2 class="uppercase text-center leading-7">
        <span class="text-[1.246rem] font-lemon-light">{{ $t('notFound.text') }}</span>
      </h2>
    </div>
    <div class="w-full flex justify-center items-center">
      <router-link to="/" class="py-2.5 px-2.5 rounded-[15px] hover:opacity-80 bg-tolko-red text-white">{{ $t('notFound.textBtn') }}</router-link>
    </div>
  </section>
</template>
