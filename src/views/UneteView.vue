<script setup>
  import { ref, onMounted, computed } from 'vue'
  import axios from 'axios'
  import { useRoute } from 'vue-router'
  import { useHead } from '@vueuse/head'
  import { useGtm } from '@gtm-support/vue-gtm'
  import { reset } from '@formkit/vue'
  import { useI18n } from 'vue-i18n'
  import becarios from '@/assets/img/CreativeBasecamp.svg'

  const { t, locale } = useI18n()
  const route = useRoute()
  const gtm = useGtm()


  // Construye la URL exacta en la que estamos navegando
  const urlCanonica = computed(() => {
    const base = 'https://tolkogroup.com'
    const path = route.path.replace(/\/$/, '')
    return `${base}${path}`
  })

  // --- CONFIGURACIÓN DE SEO ---
  useHead({
    title: computed(() => t('careers.meta.title')),
    htmlAttrs: {
      lang: () => locale.value,
    },
    meta: [
      {
        name: 'description',
        content: computed(() => t('careers.meta.description')),
      },
      {
        name: 'keywords',
        content: computed(() => t('careers.meta.keywords')),
      },
      // Etiquetas Open Graph (Fundamentales si compartes la vacante en LinkedIn/WhatsApp)
      {
        property: 'og:title',
        content: computed(() => t('careers.meta.title')),
      },
      {
        property: 'og:description',
        content: computed(() => t('careers.meta.description')),
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:image',
        content: 'https://tolkogroup.com/img/bg-creativeBasecamp.png', // Ajusta a la ruta real cuando la subas
      },
      { property: 'og:url', content: urlCanonica }, // 🌟 DINÁMICO: Cambia según el idioma
      {
        property: 'og:image:alt',
        content: 'Creative Basecamp - Programa de Becarios Tolko',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: urlCanonica,
      },
    ],
    // NUEVO: Script de Datos Estructurados
    script: [
      {
        type: 'application/ld+json',
        children: computed(() =>
          JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'JobPosting',
            title: 'Becario de Comunicación / Marketing - Creative Basecamp',
            description: 'Programa de Becarios Tolko: Aprende haciendo y creando para marcas reales. 20 horas a la semana, presenciales en Polanco.',
            hiringOrganization: {
              '@type': 'Organization',
              name: 'Tolko Group',
              sameAs: 'https://tolkogroup.com',
              logo: 'https://tolkogroup.com/logo-tolko.svg',
            },
            employmentType: 'INTERN',
            jobLocation: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Polanco',
                addressRegion: 'CDMX',
                addressCountry: 'MX',
              },
            },
          }),
        ),
      },
    ],
  })

  // --- ESTADO PARA LA UI ---
  const showScrollTopButton = ref(false)
  const isScrolled = ref(false)
  const cargando = ref(false)
  const exito = ref('')
  const errorMsg = ref('')

  // --- ESTADO DEL FORMULARIO ---
  const nombre = ref('')
  const telefono = ref('')
  const email = ref('')
  const cv = ref(null)

  const handleSubmit = async formData => {
    cargando.value = true
    errorMsg.value = ''
    exito.value = ''

    // --- Validar el peso del archivo (Límite 2MB) ---
    if (formData.cv && formData.cv.length > 0) {
      const file = formData.cv[0].file
      const maxSizeBytes = 2 * 1024 * 1024 // 2MB expresado en bytes

      if (file.size > maxSizeBytes) {
        // Usamos una variable de traducción o texto fijo si lo prefieres
        errorMsg.value = t('careers.form.errorSize') || 'El archivo supera los 2MB permitidos.'
        cargando.value = false
        return // Detenemos la ejecución aquí
      }
    }

    try {
      // Para subir archivos, necesitamos usar FormData en lugar de un objeto normal
      const payload = new FormData()
      payload.append('nombre', formData.nombre)
      payload.append('telefono', formData.telefono)
      payload.append('email', formData.email)

      // FormKit maneja los archivos como un arreglo de objetos. Extraemos el archivo real.
      if (formData.cv && formData.cv.length > 0) {
        payload.append('cv', formData.cv[0].file)
      }

      const url = `${import.meta.env.VITE_API_BASE_URL}/careers` // Ajusta este endpoint según tu backend

      // Configuramos los headers para indicar que enviamos un archivo
      const { data } = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (gtm) {
        gtm.trackEvent({
          event: 'generate_lead',
          category: 'Bolsa de Trabajo',
          action: 'Formulario de Equipo Enviado',
        })
      }

      exito.value = data.msg || t('careers.form.success')
      reset('frmUnete')

      nombre.value = ''
      telefono.value = ''
      email.value = ''
      cv.value = null
    } catch (error) {
      errorMsg.value = error.response?.data?.msg || t('careers.form.errorGeneral')
    } finally {
      cargando.value = false
      setTimeout(() => {
        exito.value = ''
        errorMsg.value = ''
      }, 5000)
    }
  }

  const handleScroll = () => {
    if (typeof window === 'undefined') return

    const scrollTop = window.scrollY || window.pageYOffset || 0
    showScrollTopButton.value = scrollTop > 0
    isScrolled.value = scrollTop > 50
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      // Ejecutar una vez para establecer estado inicial
      handleScroll()
    }
  })
</script>

<template>
  <div class="font-Light bg-black text-white bg-becario bg-cover bg-center relative">
    <div class="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-gradient-to-t from-[#181818] to-transparent pointer-events-none"></div>
    <section id="section-unete" class="container relative z-10 py-12 pt-32 text-black flex flex-col md:flex-row items-center gap-10">
      <!-- SECCIÓN IZQUIERDA (INFO DEL PROGRAMA) -->
      <div class="w-full md:w-1/2 text-white pr-0 md:pr-12 flex flex-col justify-center">
        <!-- Título principal -->
        <div class="mb-8 text-center">
          <h1 class="font-extrabold text-3xl md:text-4xl tracking-tight leading-none mb-2 sr-only">Creative Basecamp: Programa de Becarios Tolko</h1>
          <img :src="becarios" alt="Creative Basecamp" class="inline-flex w-64 md:w-3/4 mx-auto md:mx-0 mb-4" />
          <p class="text-lg font-light">
            {{ $t('careers.program_subtitle') }}
            <strong>{{ $t('careers.tolko_interns') }}</strong>
          </p>
        </div>

        <!-- Titular secundario -->
        <h2 class="text-xl md:text-2xl font-bold mb-10 leading-snug text-center md:text-left" v-html="$t('careers.learn_doing')"></h2>

        <!-- Etiqueta "Buscamos:" (Estilo Píldora) -->
        <div class="text-center md:text-left mb-6">
          <div class="bg-black/60 text-white font-bold py-2 px-8 rounded-full inline-block text-lg shadow-lg">
            {{ $t('careers.we_look_for') }}
          </div>
        </div>

        <!-- Lista de requisitos con viñetas personalizadas -->
        <ul class="space-y-4 mb-10 text-base font-light list-none">
          <li class="flex items-start">
            <span class="mr-4 mt-2.5 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
            <span v-html="$t('careers.req_1')"></span>
          </li>
          <li class="flex items-start">
            <span class="mr-4 mt-2.5 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
            <span v-html="$t('careers.req_2')"></span>
          </li>
          <li class="flex items-start">
            <span class="mr-4 mt-2.5 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
            <span v-html="$t('careers.req_3')"></span>
          </li>
        </ul>

        <!-- Condiciones (Esquema y Ganancias) -->
        <div class="space-y-8 text-center md:text-left">
          <div>
            <p class="font-light text-lg mb-1">{{ $t('careers.scheme_title') }}</p>
            <p class="text-base font-bold">{{ $t('careers.scheme_desc') }}</p>
          </div>
          <div>
            <p class="font-light text-lg mb-1">{{ $t('careers.you_gain_title') }}</p>
            <p class="text-base">{{ $t('careers.you_gain_desc') }}</p>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <h2 class="text-white text-3xl font-bold md:text-4xl text-center mb-10">
          {{ $t('careers.title') }}
        </h2>

        <ClientOnly>
          <FormKit type="form" id="frmUnete" :actions="false" @submit="handleSubmit">
            <div class="grid md:grid-cols-2 grid-cols-1 gap-6">
              <!-- Nombre -->
              <FormKit
                v-model.trim="nombre"
                type="text"
                id="nombre"
                name="nombre"
                :placeholder="$t('careers.form.placeholderName')"
                validation="required"
                :validation-messages="{
                  required: $t('careers.form.requiredName'),
                }" />

              <!-- Teléfono -->
              <FormKit
                v-model.trim="telefono"
                type="text"
                id="telefono"
                name="telefono"
                :placeholder="$t('careers.form.placeholderTelephone')"
                validation="required"
                :validation-messages="{
                  required: $t('careers.form.requiredTelephone'),
                }" />

              <!-- Email -->
              <div class="md:col-span-2">
                <FormKit
                  v-model.trim="email"
                  type="email"
                  id="email"
                  name="email"
                  :placeholder="$t('careers.form.placeholderEmail')"
                  validation="required|email"
                  :validation-messages="{
                    required: $t('careers.form.requiredEmail'),
                    email: $t('careers.form.formatEmail'),
                  }" />
              </div>

              <!-- Archivo (CV) -->
              <div class="md:col-span-2 text-white">
                <FormKit
                  v-model="cv"
                  type="file"
                  id="cv"
                  name="cv"
                  :label="$t('careers.form.labelCV')"
                  accept=".pdf,.doc,.docx"
                  validation="required"
                  :validation-messages="{
                    required: $t('careers.form.requiredCV'),
                  }"
                  input-class="block w-full mt-2 text-sm text-gray-300 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-tolko-red file:text-white hover:file:bg-red-700 file:cursor-pointer file:transition-colors cursor-pointer" />
              </div>

              <!-- Botón -->
              <div class="md:col-span-2">
                <FormKit type="submit" :disabled="cargando">
                  {{ $t('careers.form.send') }}
                </FormKit>
              </div>
            </div>
          </FormKit>

          <template #fallback>
            <div class="text-center text-white p-8">
              <p>{{ $t('careers.form.loading') }}</p>
            </div>
          </template>
        </ClientOnly>

        <!-- Mensajes de estado -->
        <p v-if="cargando" class="text-center mt-4 p-2 bg-yellow-100 text-yellow-700 rounded">
          {{ $t('careers.form.sending') }}
        </p>
        <p v-if="exito" class="text-center mt-4 p-2 bg-green-100 text-green-700 rounded">
          {{ exito }}
        </p>
        <p v-if="errorMsg" class="text-center mt-4 p-2 bg-red-100 text-red-700 rounded">
          {{ errorMsg }}
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
