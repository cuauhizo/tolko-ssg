<script setup>
// import cerrarModal from '/assets/img/icon-close-modal.svg';
import cerrarModal from '@/assets/img/icon-close-modal.svg';
// import cerrarModal from '../../public/img/icon-close-modal.svg';
const emit = defineEmits(['ocultar-modal']);
const props = defineProps({
  modal: {
    type: Object,
    required: true,
  },
  servicio: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="fixed bg-gradient-radial z-[999] bg-opacity-60 backdrop-blur-sm left-0 right-0 top-0 bottom-0">
    <div class="grid h-screen w-screen place-items-center transition-all duration-300 ease-in opacity-0"
      :class="[modal.animar ? 'animar opacity-100' : 'cerrar opacity-0']">
      <div
        class="relative m-4 w-3/5 min-w-[90%] max-w-[90%] rounded-3xl bg-[#181818] text-white font-sans text-center text-base font-light leading-relaxed text-blue-gray-500 antialiased md:min-w-[558px] md:max-w-[558px]">
        <div class="absolute -right-2 -top-2">
          <img class="w-8 h-8 cursor-pointer" :src="cerrarModal" @click="$emit('ocultar-modal')" alt="" />
        </div>
        <div
          class="shrink-0 items-center pt-10 pr-10 pl-10 font-semibold leading-snug text-blue-gray-900 antialiased text-center font-SemiBoldItalic text-2xl texto-con-bordes">
          {{ servicio.titulo }}
        </div>
        <div
          class="relative border-t border-t-blue-gray-100 pr-10 pl-10 border-t-[#181818] p-4 font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased">
          {{ servicio.descripcion }}
        </div>
        <div class="flex shrink-0 flex-wrap items-center justify-end p-4 text-blue-gray-500"></div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
