<script setup>
import { defineProps, defineEmits } from "vue";
defineProps(["subtitle", "photo", "id"]);
const $emit = defineEmits(["click"]);
</script>
<template>
  <div class="p-5 bg-white rounded-md relative">
    <img :src="photo" alt="" />
    <a
      @click="$emit('click', id)"
      class="play-btn block cursor-pointer absolute"
    >
      <img src="@/assets/img/home/play.svg" alt="" />
    </a>
    <div
      class="absolute top-0 left-0 w-full h-full overlay p-2.5 flex flex-col justify-between bg-gradient-to-t from-blue-primary to-transparent bg-opacity-30"
    >
      <div></div>
      <div class="text-white slice-text-2">{{ subtitle }}</div>
    </div>
  </div>
</template>
<style scoped>
.slice-text-2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.play-btn {
  position: absolute;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
}
.play-btn:active {
  transform: translate(-50%, -50%) scale(0.95);
}
</style>
