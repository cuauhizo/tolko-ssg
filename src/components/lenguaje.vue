<template>
  <div class="selectbox">
    <div class="select" id="select" @click="toggleOptions">
      <div class="contenido-select">
        <img v-if="selectedImg" :src="selectedImg" :alt="`${currentLanguageText}`" />
      </div>
      <i class="fas fa-angle-down"></i>
    </div>

    <div class="opciones" id="opciones" :class="{ active: optionsActive }">
      <a href="#" class="opcion" v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" @click.prevent="selectOption(locale)">
        <div class="contenido-opcion">
          <img :src="getFlag(locale)" :alt="`${languageTexts[locale]}`" />
        </div>
      </a>
    </div>
  </div>
  <input type="hidden" name="pais" id="inputSelect" :value="$i18n.locale" />
</template>

<script setup>
  import { ref, watch, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { useGtm } from '@gtm-support/vue-gtm' // 🌟 NUEVO: Importamos GTM

  const router = useRouter()
  const route = useRoute()
  const { t, availableLocales, locale } = useI18n()
  const gtm = useGtm()

  // Usamos el locale global para que siempre concuerde con la URL
  const idioma = ref(locale.value)

  const flags = {
    es: '/lenguaje/mexico.webp',
    en: '/lenguaje/united-states-of-america.webp',
  }

  const languageTexts = {
    es: 'Español',
    en: 'Inglés',
  }

  const selectedImg = ref(flags[locale.value] || '')
  const optionsActive = ref(false)

  // Computed para el texto del idioma actual
  const currentLanguageText = computed(() => {
    return languageTexts[idioma.value] || ''
  })

  const toggleOptions = () => {
    optionsActive.value = !optionsActive.value
  }

  // 🌟 CORRECCIÓN PRINCIPAL: Cambiamos el idioma en caliente sin tocar la URL
  const selectOption = async selectedLocale => {
    // 1. Actualizamos el idioma global de vue-i18n de forma reactiva
    // locale.value = selectedLocale

    // 2. Medición para GTM y GA4 (Lo mantenemos intacto porque está excelente)
    if (gtm) {
      gtm.trackEvent({
        event: 'cambio_idioma',
        idioma_seleccionado: selectedLocale,
      })
    } else if (typeof window !== 'undefined' && window.dataLayer) {
      // Fallback seguro para ViteSSG
      window.dataLayer.push({
        event: 'cambio_idioma',
        idioma_seleccionado: selectedLocale,
      })
    }

    // 2. Cambiamos la URL físicamente según la página
    if (route.path === '/' || route.path === '/es') {
      // Si estamos en el Home, navegamos a la raíz (EN) o a /es (ES)
      const targetPath = selectedLocale === 'en' ? '/' : '/es'
      await router.push(targetPath)
    } else {
      // Si estás en otra página (ej. /creative-basecamp) y cambias el idioma, 
      // actualizamos el i18n directamente, ya que por ahora comparten URL.
      locale.value = selectedLocale
    }

    // 3. Actualizamos la interfaz del componente de la bandera
    idioma.value = selectedLocale
    selectedImg.value = flags[selectedLocale]
    optionsActive.value = false
  }

  const getFlag = locale => flags[locale] || ''

  // 🌟 Opcional pero recomendado: Observar cambios en el locale global
  // por si el usuario usa los botones "Atrás/Adelante" del navegador
  watch(
    () => locale.value,
    newLocale => {
      idioma.value = newLocale
      selectedImg.value = getFlag(newLocale)
    },
  )
</script>

<style scoped>
  .selectbox {
    margin: auto;
    position: relative;
  }

  .select {
    width: 100%;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.2s ease all;
    padding: 0 15px;
    position: relative;
    z-index: 200;
  }

  /* .select.active,
.select:hover {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.16);
} */

  .select i {
    font-size: 15px;
    margin-left: 5px;
    color: #fff;
  }

  .opciones {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.16);
    margin-top: 10px;
    max-height: 400px;
    overflow: auto;
    z-index: 100;
    position: fixed;
    display: none;
  }

  .opciones.active {
    display: block;
    animation: fadeIn 0.3s forwards;
  }

  @keyframes fadeIn {
    from {
      transform: translateY(-200px) scale(0.5);
    }

    to {
      transform: translateY(0) scale(1);
    }
  }

  .contenido-opcion {
    width: 100%;
    display: flex;
    align-items: center;
    transition: 0.2s ease all;
  }

  .opciones .contenido-opcion {
    padding: 15px;
    justify-content: center;
  }

  .contenido-select img,
  .contenido-opcion img {
    width: 35px;
    height: 20px;
  }

  .opciones .contenido-opcion:hover {
    background: #cc0032;
  }

  @media screen and (max-width: 800px) {
    .selectbox {
      width: 100%;
    }
  }
</style>
