<script setup>
import { useI18n } from "vue-i18n";

const {t} = useI18n();
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="pt-14 pb-14 grid gap-8 lg:grid-cols-2">
      <div class="rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.8385670250163!2d69.28048651572577!3d41.3341236072578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b4dcdaf9689%3A0x2490b96ecb183f39!2z0JzQuNC90LjRgdGC0LXRgNGB0YLQstC-INC_0L4g0YfRgNC10LfQstGL0YfQsNC50L3Ri9C8INGB0LjRgtGD0LDRhtC40Y_QvA!5e0!3m2!1sru!2s!4v1643610696968!5m2!1sru!2s"
          width="100%"
          height="643"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div class="p-5 bg-white rounded-lg" v-html="t('contact')">
      </div>
    </div>
  </div>
</template>

<style></style>
