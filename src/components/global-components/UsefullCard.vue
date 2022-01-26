<script setup>
import { defineProps } from "@vue/runtime-core";
defineProps(["title", "id", "slug", "thumbnail", "date"]);
</script>
<template>
  <div class="py-3 px-4 bg-white rounded-md text-center">
    <div class="flex items-center justify-center">
      <img :src="thumbnail" alt="" />
    </div>
    <div class="pt-2.5">
      <h5 class="text-lg">{{ title }}</h5>
    </div>
  </div>
</template>
