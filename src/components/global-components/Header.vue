<script setup>
import { defineProps } from "vue";
defineProps(["subtitle", "image"]);
</script>
<template>
  <header class="pt-14 pb-14 relative overflow-hidden bg-white">
    <div class="container mx-auto z-20 relative">
      <div class="header-title pt-32 pb-32 grid grid-cols-2 gap-6">
        <div>
          <h1 class="text-4xl">
            {{ subtitle }}
          </h1>
        </div>
      </div>
    </div>
    <div
      class="absolute top-0 w-full h-full grid grid-cols-3 z-10"
      :class="'container left-1/2 transform -translate-x-1/2 px-4'"
    >
      <div></div>
      <div class="col-span-2 flex justify-end relative">
        <img :src="image" alt="" class="max-w-full h-full object-cover" />
        <div class="overlay"></div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to left,
    rgb(255, 255, 255),
    rgba(255, 255, 255, 0)
  );
}
</style>
