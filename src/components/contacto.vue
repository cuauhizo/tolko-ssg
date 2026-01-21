<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { reset } from '@formkit/vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// --- ESTADO PARA LA UI ---
const cargando = ref(false);
const exito = ref('');
const errorMsg = ref('');

// --- ESTADO DEL FORMULARIO ---
// Estas variables estaban faltando y causaban problemas
const nombre = ref('');
const telefono = ref('');
const email = ref('');
const servicio = ref('');
const mensaje = ref('');

const handleSubmit = async (formData) => {
  cargando.value = true;
  errorMsg.value = '';
  exito.value = '';

  try {
    const url = `${import.meta.env.VITE_API_URL}/contact`;
    const { data } = await axios.post(url, formData);

    // Enviar evento a GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'form_submission_success',
        form_name: 'contacto_tolko',
        form_id: 'frmContacto'
      });
    }

    exito.value = data.msg;
    reset('frmContacto');

    // Limpiar los v-model manualmente
    nombre.value = '';
    telefono.value = '';
    email.value = '';
    servicio.value = '';
    mensaje.value = '';

  } catch (error) {
    if (error.response && error.response.data && error.response.data.msg) {
      errorMsg.value = error.response.data.msg;
    } else {
      errorMsg.value = 'Error al enviar el formulario. Por favor intenta nuevamente.';
    }
  } finally {
    cargando.value = false;

    setTimeout(() => {
      exito.value = '';
      errorMsg.value = '';
    }, 5000);
  }
};
</script>

<template>
  <section id="section4" class="container py-12 text-black">
    <div class="md:w-2/3 md:mx-auto">
      <h2 class="text-white text-3xl font-bold md:text-4xl text-center mb-10">
        {{ $t('section5.title') }}
      </h2>

      <ClientOnly>
        <FormKit type="form" id="frmContacto" :actions="false" @submit="handleSubmit">
          <div class="grid md:grid-cols-2 grid-cols-1 gap-6">
            <FormKit v-model.trim="nombre" type="text" id="nombre" name="nombre"
              :placeholder="$t('section5.form.placeholderName')" validation="required" :validation-messages="{
                required: $t('section5.form.requiredName'),
              }" />

            <FormKit v-model.trim="telefono" type="text" id="telefono" name="telefono"
              :placeholder="$t('section5.form.placeholderTelephone')" validation="required" :validation-messages="{
                required: $t('section5.form.requiredTelephone'),
              }" />

            <div class="md:col-span-2">
              <FormKit v-model.trim="email" type="email" id="email" name="email"
                :placeholder="$t('section5.form.placeholderEmail')" validation="required|email" :validation-messages="{
                  required: $t('section5.form.requiredEmail'),
                  email: $t('section5.form.formatEmail'),
                }" />
            </div>

            <div class="md:col-span-2">
              <FormKit v-model="servicio" type="select" :label="$t('section5.form.labelService')"
                :placeholder="$t('section5.form.placeholderService')" id="servicio" name="servicio" :options="[
                  $t('section5.form.serviceOptions.op1'),
                  $t('section5.form.serviceOptions.op2'),
                  $t('section5.form.serviceOptions.op3'),
                  $t('section5.form.serviceOptions.op4'),
                  $t('section5.form.serviceOptions.op5'),
                  $t('section5.form.serviceOptions.op6'),
                ]" validation="required" :validation-messages="{
                  required: $t('section5.form.requiredService'),
                }" />
            </div>

            <div class="md:col-span-2">
              <FormKit v-model.trim="mensaje" name="mensaje" type="textarea" rows="5"
                :placeholder="$t('section5.form.placeholderMessage')" maxlength="250" validation="required"
                :validation-messages="{
                  required: $t('section5.form.requiredMessage'),
                }" />
            </div>

            <div class="md:col-span-2">
              <FormKit type="submit">
                {{ $t('section5.form.send') }}
              </FormKit>
            </div>
          </div>
        </FormKit>

        <template #fallback>
          <div class="text-center text-white p-8">
            <p>{{ $t('section5.form.loading') || 'Cargando formulario...' }}</p>
          </div>
        </template>
      </ClientOnly>

      <p v-if="cargando" class="text-center mt-4 p-2 bg-yellow-100 text-yellow-700 rounded">
        Enviando....
      </p>
      <p v-if="exito" class="text-center mt-4 p-2 bg-green-100 text-green-700 rounded">
        {{ exito }}
      </p>
      <p v-if="errorMsg" class="text-center mt-4 p-2 bg-red-100 text-red-700 rounded">
        {{ errorMsg }}
      </p>
    </div>
  </section>
</template>

<style scoped></style>