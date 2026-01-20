<template>
  <div class="selectbox">
    <div class="select" id="select" @click="toggleOptions">
      <div class="contenido-select">
        <img v-if="selectedImg" :src="selectedImg" :alt="`${currentLanguageText}`"  />
      </div>
      <i class="fas fa-angle-down"></i>
    </div>

    <div class="opciones" id="opciones" :class="{ active: optionsActive }">
      <a href="#" class="opcion" v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`"
        @click.prevent="selectOption(locale)">
        <div class="contenido-opcion">
          <img :src="getFlag(locale)" :alt="`${languageTexts[locale]}`" />
        </div>
      </a>
    </div>
  </div>
  <input type="hidden" name="pais" id="inputSelect" :value="$i18n.locale" />
</template>

<script setup>
import { ref, watch, computed  } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, availableLocales, locale } = useI18n();
const idioma = ref(locale);

const flags = {
  es: '/lenguaje/mexico.png',
  en: '/lenguaje/united-states-of-america.png',
};

const languageTexts = {
  es: 'Español',
  en: 'Inglés',
};

const selectedImg = ref(flags[locale.value] || '');
const optionsActive = ref(false);

// Computed para el texto del idioma actual
const currentLanguageText = computed(() => {
  return languageTexts[idioma.value] || '';
});

const toggleOptions = () => {
  optionsActive.value = !optionsActive.value;
};

const selectOption = (locale) => {
  idioma.value = locale;
  selectedImg.value = flags[locale];
  optionsActive.value = false;
};

const getFlag = (locale) => flags[locale] || '';

watch(
  () => idioma,
  (newLocale) => {
    selectedImg.value = getFlag(newLocale);
  }
);
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
