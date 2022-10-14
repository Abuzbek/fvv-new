<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="pt-14 pb-14 grid gap-8 lg:grid-cols-2">
      <div class="rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d360.671216212484!2d69.4012205175053!3d41.33100424151471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef7db9b04351d%3A0xcebbbdf12be271e1!2sFVV%20Akademiyasi%20huzuridagi%20Fuqaro%20muhofazasi%20instituti!5e0!3m2!1sru!2s!4v1660033429166!5m2!1sru!2s"
          width="100%" height="643" style="border:0;" allowfullscreen="" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div class="p-5 bg-white rounded-lg" v-html="t('contact')">
      </div>
    </div>
  </div>
</template>

<style>
</style>
