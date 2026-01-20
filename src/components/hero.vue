<template>
  <section>
    <div class="homepage-header-wrapper">
      <div class="contenedor-video">
        <video v-if="$i18n.locale === 'en'" autoplay muted loop playsinline :key="videoKey">
          <source :src="currentVideo.enMp4" type="video/mp4" />
          <source :src="currentVideo.en" type="video/webm" />
        </video>
        <video  autoplay muted loop playsinline :key="videoKey">
          <source :src="currentVideo.es" type="video/webm" />
          <source :src="currentVideo.esMp4" type="video/mp4" />
        </video>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

// default seguro para SSR
const isMobile = ref(false)
const videoKey = ref(`${locale.value}-${Date.now()}`)

// actualizar key cuando cambia el locale
watch(locale, () => {
  videoKey.value = `${locale.value}-${Date.now()}`
})

// detectar mobile SOLO en cliente
const updateIsMobile = () => {
  if (typeof window === 'undefined') return
  isMobile.value = window.innerWidth <= 426
  videoKey.value = `${locale.value}-${Date.now()}`
}

onMounted(() => {
  // primer cálculo en cliente
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateIsMobile)
  }
})

const currentVideo = computed(() => {
  if (isMobile.value) {
    return {
      en: '/video/TLK_MainHeaderMovil.webm',
      enMp4: '/video/TLK_MainHeaderMovil.mp4',
      es: '/video/TLK_MainHeaderMovilEs.webm',
      esMp4: '/video/TLK_MainHeaderMovilEs.mp4',
    }
  } else {
    return {
      en: '/video/TLK_MainHeader.webm',
      enMp4: '/video/TLK_MainHeader.mp4',
      es: '/video/TLK_MainHeaderEs.webm',
      esMp4: '/video/TLK_MainHeaderEs.mp4',
    }
  }
})
</script>

<style scoped>
  .homepage-header-wrapper {
    position: relative;
    height: 100vh;
  }

  .contenedor-video {
    position: absolute;
    background: #000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .contenedor-video video {
    position: relative;
    top: 50%;
    left: 50%;
    object-fit: cover;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
  }
</style>