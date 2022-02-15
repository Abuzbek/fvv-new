<script setup>
import { defineProps } from "@vue/runtime-core";
defineProps(["title", "id", "link", "thumbnail"]);
</script>
<template>
  <a
    :href="link"
    target="_blank"
    class="sm:py-3 block sm:px-4 py-2 px-3 bg-white rounded-md text-center"
  >
    <div class="flex items-center justify-center">
      <img :src="thumbnail" alt="" class="w-16 h-16" />
    </div>
    <div class="pt-2.5">
      <h5 class="sm:text-lg text-base">{{ title }}</h5>
    </div>
  </a>
</template>
