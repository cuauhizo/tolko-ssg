<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import Lenguaje from '@/components/lenguaje.vue'
  // import Responsive from '@/components/responsive.vue'

  const anio = ref(new Date().getFullYear())
  const showScrollTopButton = ref(false)
  const activeSection = ref(null)
  const isScrolled = ref(false)
  const sectionIds = ['section1', 'section2', 'section3', 'section4', 'section5', 'section6']

  // Ejecuta el scroll al top sólo si window existe
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleScroll = () => {
    if (typeof window === 'undefined') return

    const scrollTop = window.scrollY || window.pageYOffset || 0
    showScrollTopButton.value = scrollTop > 0
    isScrolled.value = scrollTop > 50

    // Detectar sección activa
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          activeSection.value = id
          break
        }
      }
    }
  }

  const cerrarMenu = () => {
    if (typeof document === 'undefined') return
    const checkbox = document.getElementById('menu')
    if (checkbox) checkbox.checked = false
  }

  const scrollToSection = index => {
    if (typeof document === 'undefined') return
    const element = document.getElementById(`section${index}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      // Ejecutar una vez para establecer estado inicial
      handleScroll()
    }
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll)
    }
  })
</script>

<template>
  <!-- Header -->
  <header>
    <div class="fixed z-30 w-full" :class="[{ 'bg-scrolled': isScrolled }]">
      <nav class="container h-30 flex items-center justify-between px-5 py-3 relative text-white">
        <a href="./" class="w-1/3 max-w-[60px]">
          <img src="@/assets/img/logo-tolko.svg" alt="Logo Tolko Group" class="w-full" width="60" height="60" fetchpriority="high" />
        </a>
        <div class="flex items-center justify-end gap-2">
          <input type="checkbox" id="menu" class="peer hidden" />
          <label for="menu" class="bg-open-menu w-6 h-5 bg-cover bg-center cursor-pointer peer-checked:bg-close-menu transition-all z-10 md:hidden"></label>
          <div class="fixed inset-0 bg-gradient-to-b from-white/20 to-tolko-red/70 translate-x-full peer-checked:translate-x-0 transition-transform md:static md:translate-x-0 md:bg-none">
            <ul
              class="absolute inset-x-0 top-24 p-10 items-center bg-white text-black w-[90%] mx-auto rounded-md h-max text-center grid gap-6 font-bold shadow-2xl md:static md:w-max md:bg-transparent md:p-0 md:grid-flow-col md:text-white md:shadow-none">
              <li>
                <a
                  href="#about"
                  @click.prevent="scrollToSection(1); cerrarMenu();">
                  {{ $t('menu.about_us') }}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  @click.prevent="scrollToSection(2); cerrarMenu();">
                  {{ $t('menu.our_services') }}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  @click.prevent="scrollToSection(3); cerrarMenu();">
                  {{ $t('menu.join_our_team') }}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  :class="['py-2.5 px-2.5 rounded-[15px] hover:opacity-80 ', activeSection === 'section6' ? 'bg-tolko-red text-white' : 'bg-tolko-red text-white']"
                  @click.prevent="scrollToSection(4); cerrarMenu();">
                  {{ $t('menu.get_in_touch_with_us') }}
                </a>
              </li>
            </ul>
          </div>
          <Lenguaje />
        </div>
      </nav>
    </div>
  </header>

  <!-- Main -->
  <main>
    <router-view></router-view>
    <button class="fixed bottom-5 right-5 z-50 p-4 bg-tolko-red text-white rounded-full border border-tolko-red shadow-lg" @click="scrollToTop" v-show="showScrollTopButton" aria-label="Ir al inicio">
      <span class="sr-only">Ir Arriba</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  </main>

  <!-- Footer -->
  <footer class="w-full text-gray-700 bg-[#181818]">
    <div class="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5 py-12 mx-auto md:items-start md:py-12 lg:items-start">
      <div class="text-center md:mx-0 md:text-left">
        <a class="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start">
          <img src="@/assets/img/logo-tolko.svg" width="128" height="128" alt="Logo Tolko Group" />
        </a>
        <!-- Social Icons -->
        <div class="mt-4">
          <span class="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
            <a class="text-gray-500 cursor-pointer hover:text-gray-700" href="https://www.facebook.com/tolkogroup/" alt="Facebook" aria-label="Facebook" target="_blank">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a class="ml-3 text-gray-500 cursor-pointer hover:text-gray-700" href="https://twitter.com/tolkogroup" alt="Twitter" aria-label="Twitter" target="_blank">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a class="ml-3 text-gray-500 cursor-pointer hover:text-gray-700" href="https://www.instagram.com/grupo_tolko" alt="Instagram" aria-label="Instagram" target="_blank">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a class="ml-3 text-gray-500 cursor-pointer hover:text-gray-700" href="https://www.linkedin.com/company/tolko/" alt="Linkedin" aria-label="Linkedin" target="_blank">
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
      <div class="text-center xl:pl-20 md:text-left">
        <h2 class="mb-3 text-sm font-medium tracking-widest text-white uppercase title-font">
          {{ $t('footer.list1.item1') }}
        </h2>
        <nav class="mb-10 list-none">
          <ul class="cuauhizo">
            <li class="mt-3">
              <a class="text-gray-500 cursor-pointer hover:text-gray-200" @click="scrollToSection(1)"> {{ $t('footer.list1.item2') }}
              </a>
            </li>
            <li class="mt-3">
              <a class="text-gray-500 cursor-pointer hover:text-gray-200" @click="scrollToSection(2)"> {{ $t('footer.list1.item3') }}
              </a>
            </li>
            <li class="mt-3">
              <a class="text-gray-500 cursor-pointer hover:text-gray-200">
                {{ $t('footer.list1.item4') }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="text-center md:text-left">
        <h2 class="mb-3 text-sm font-medium tracking-widest text-white uppercase title-font">
          {{ $t('footer.list2.item1') }}
        </h2>
        <nav class="mb-10 list-none">
          <ul>
            <li class="mt-3">
              <a class="text-gray-500 cursor-pointer hover:text-gray-200">
                <span class="text-white">{{ $t('footer.list2.item2') }}</span>
                <br />
                {{ $t('footer.list2.item2_1') }}
              </a>
              <br />
              <a class="text-gray-500 cursor-pointer hover:text-gray-200" href="mailto:tolko360@tolkogroup.com">tolko360@tolkogroup.com</a>
              <br />
              <a class="text-gray-500 cursor-pointer hover:text-gray-200" href="https://tolkoproducciones.com/" target="_blank">tolkoproducciones.com</a>
            </li>
            <li class="mt-3">
              <a class="text-gray-500 cursor-pointer hover:text-gray-200">
                <span class="text-white">{{ $t('footer.list2.item3') }}</span>
                <br />
                {{ $t('footer.list2.item3_1') }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="text-center md:text-left">
        <h2 class="mb-3 text-sm font-medium tracking-widest text-white uppercase title-font">
          {{ $t('footer.list3.item1') }}
        </h2>
        <nav class="mb-10 list-none">
          <ul>
            <li class="mt-3">
              <a href="mailto:tolko360@tolkogroup.com" class="text-gray-500 cursor-pointer hover:text-gray-200">tolko360@tolkogroup.com</a>
            </li>
            <li class="mt-3">
              <a class="text-gray-500 cursor-pointer hover:text-gray-200" @click="scrollToSection(4)"> {{ $t('footer.list3.item3') }}
              </a>
            </li>
            <li class="mt-3">
              <a href="tel:+525567260647" class="text-gray-500 cursor-pointer hover:text-gray-200">+52 55 6726 0647</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="container px-5 py-4 mx-auto">
      <p class="text-sm text-white text-center">© {{ anio }} {{ $t('footer.copy') }}</p>
    </div>
  </footer>
  <!-- <Responsive /> -->
</template>

<style scoped>
  nav {
    margin: 0 auto;
    width: 100%;
  }

  .bg-scrolled {
    background-color: rgba(0, 0, 0, 0.5);
    transition: background-color 0.3s ease;
  }
</style>
