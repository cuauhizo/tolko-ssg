<script setup>
  import { ref, reactive, watch } from 'vue'
  import Modal from '@/components/modal.vue'
  import { useI18n } from 'vue-i18n'

  const { t, locale } = useI18n()
  const idioma = ref(locale)

  const servicios = reactive([
    {
      id: 1,
      titulo: t('section1.list.list1.title'),
      descipcion: t('section1.list.list1.description'),
    },
    {
      id: 2,
      titulo: t('section1.list.list2.title'),
      descipcion: t('section1.list.list2.description'),
    },
    {
      id: 3,
      titulo: t('section1.list.list3.title'),
      descipcion: t('section1.list.list3.description'),
    },
    {
      id: 4,
      titulo: t('section1.list.list4.title'),
      descipcion: t('section1.list.list4.description'),
    },
    {
      id: 5,
      titulo: t('section1.list.list5.title'),
      descipcion: t('section1.list.list5.description'),
    },
    {
      id: 6,
      titulo: t('section1.list.list6.title'),
      descipcion: t('section1.list.list6.description'),
    },
    {
      id: 7,
      titulo: t('section1.list.list7.title'),
      descipcion: t('section1.list.list7.description'),
    },
    // {
    //   id: 8,
    //   titulo: t('section1.list.list8.title'),
    //   descipcion: t('section1.list.list8.description'),
    // },
    // {
    //   id: 9,
    //   titulo: t('section1.list.list9.title'),
    //   descipcion: t('section1.list.list9.description'),
    // },
  ])

  // ================== Modal ================
  const modal = reactive({
    mostrar: false,
    animar: false,
  })

  const mostrarModal = servicio => {
    modal.mostrar = true
    modal.servicio = servicio
    setTimeout(() => {
      modal.animar = true
    }, 300)
  }
  const ocultarModal = () => {
    modal.animar = false
    setTimeout(() => {
      modal.mostrar = false
    }, 300)
  }

  watch(idioma, nuevoIdioma => {
    servicios.forEach((servicio, index) => {
      servicios[index].titulo = t(`section1.list.list${index + 1}.title`)
      servicios[index].descipcion = t(`section1.list.list${index + 1}.description`)
    })
  })
</script>

<template>
  <section id="section1" class="container grid gap-5 justify-items-center items-center py-12 lg:grid-cols-2">
    <div>
      <h1 class="text-3xl md:text-6xl font-SemiBoldItalic texto-con-bordes ml-3" data-aos="fade-right">
        {{ $t('section1.title') }}
      </h1>
    </div>
    <Modal v-if="modal.mostrar" @ocultar-modal="ocultarModal" :modal="modal" :servicio="modal.servicio" />
    <article class="space-y-6 md:space-y-8" data-aos="fade-left">
      <ul class="mt-5 text-base mx-auto text-left font-medium leading-none md:mr-0 md:text-left">
        <li v-for="servicio in servicios" :key="servicio.id">
          <p class="py-3.5 w-full flex items-center md:justify-end">
            <span class="ml-5 mr-2.5 w-1 h-7 bg-tolko-red rounded-r-md"></span>
            <span class="cursor-pointer hover:text-tolko-red" @click="mostrarModal(servicio)">
              {{ servicio.titulo }}
            </span>
          </p>
        </li>
      </ul>
    </article>
  </section>
</template>
