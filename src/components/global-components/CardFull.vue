<script setup>
import { defineProps } from "vue";
defineProps(["photo", "title", "text", "created_at"]);
</script>
<template>
  <div class="card p-5 grid grid-cols-2 gap-8 rounded-lg mb-14">
    <div class="card-img">
      <img :src="photo" class="w-full" alt="" />
    </div>
    <div>
      <h3 class="mb-3 text-lg text-gray-900">{{ title }}</h3>
      <p class="mb-4 text-gray-900">{{ text }}</p>
      <span class="text-gray-500">{{ created_at }}</span>
    </div>
  </div>
</template>
