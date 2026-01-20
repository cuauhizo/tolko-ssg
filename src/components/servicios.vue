<script setup></script>

<template>
  <section id="section2">
    <p class="container md:text-4xl pt-4 text-center max-w-5xl" data-aos="fade-up">
      {{ $t('section2.We_help_you_through') }}
      <br />
      <span class="font-SemiBoldItalic text-tolko-red text-3xl md:text-5xl">{{ $t('section2.full_360_communication_support') }}</span>
      <br />
      {{ $t('section2.in_one_team') }}
    </p>
    <div class="container grid grid-cols-1 gap-5 justify-items-center items-center py-12 md:grid-cols-2 lg:w-[60%]" data-aos="fade-up">
      <div class="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-[#181818] h-full flex flex-col hover:bg-tolko-red hover:transition-all">
        <div class="px-6 py-4 flex-1">
          <div class="text-3xl mb-5 font-SemiBoldItalic">
            {{ $t('section2.card1.title') }}
          </div>
          <p class="text-base">
            {{ $t('section2.card1.description') }}
          </p>
        </div>
      </div>
      <div class="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-[#181818] h-full flex flex-col hover:bg-tolko-red hover:transition-all">
        <div class="px-6 py-4 flex-1">
          <div class="text-3xl mb-5 font-SemiBoldItalic">
            {{ $t('section2.card2.title') }}
          </div>
          <p class="text-base">
            {{ $t('section2.card2.description') }}
          </p>
        </div>
      </div>
      <div class="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-[#181818] h-full flex flex-col hover:bg-tolko-red hover:transition-all">
        <div class="px-6 py-4 flex-1">
          <div class="text-3xl mb-5 font-SemiBoldItalic">
            {{ $t('section2.card3.title') }}
          </div>
          <p class="text-base">
            {{ $t('section2.card3.description') }}
          </p>
        </div>
      </div>
      <div class="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-[#181818] h-full flex flex-col hover:bg-tolko-red hover:transition-all">
        <div class="px-6 py-4 flex-1">
          <div class="text-3xl mb-5 font-SemiBoldItalic">
            {{ $t('section2.card4.title') }}
          </div>
          <p class="text-base">
            {{ $t('section2.card4.description') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
