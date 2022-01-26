<script setup>
import { defineProps } from "@vue/runtime-core";
defineProps(["title", "id", "slug", "thumbnail", "date"]);
</script>
<template>
  <div class="card px-4 pb-2 pt-4 rounded-lg h-full bg-white shadow-sm">
    <img :src="thumbnail" class="rounded-md" alt="" />
    <div class="card-body">
      <h5 class="card-title text-sm text">{{ title }}</h5>
    </div>
  </div>
</template>
<style scoped>
img {
  width: 100%;
  height: auto;
}
</style>
