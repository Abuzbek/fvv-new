<script setup>
import { defineProps } from "vue";
defineProps(["photo", "title", "text", "date"]);
</script>
<template>
  <div class="card p-4 h-full rounded-lg" style="background: #fffbf4">
    <div>
      <h3 class="mb-3 text-xl text-gray-800">{{ title }}</h3>
      <span class="text-gray-500 block mb-4">{{ date }}</span>
      <router-link class="text-primary text-lg underline" to="#!">
        Batafsil
      </router-link>
    </div>
  </div>
</template>
