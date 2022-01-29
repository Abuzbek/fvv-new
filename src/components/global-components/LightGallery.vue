<script setup>
import UiButton from "./UiButton.vue";
import { ref, watch, defineProps, defineEmits } from "@vue/runtime-core";
const $emit = defineEmits(["removeLight", "next", "prev"]);
const props = defineProps(["show", "gallerySize", "currentGallery"]);
let i = ref(0);
watch(props, (val) => {
  i.value = val.currentGallery;
});
function nextButton() {
  i.value = i.value + 1;
  if (i.value > props.gallerySize) {
    i.value = props.gallerySize;
    $emit("next", props.gallerySize);
  } else {
    $emit("next", i.value);
  }
}
function prevButton() {
  i.value = i.value - 1;
  if (i.value < 0) {
    i.value = 0;
    $emit("prev", 0);
  } else {
    $emit("prev", i.value);
  }
}
</script>
<template>
  <transition name="fade">
    <div
      class="lightgallery fixed top-0 left-0 w-full h-full flex flex-col z-50"
      v-if="show"
    >
      <div
        class="overlay bg-gray-800 bg-opacity-50 cursor-pointer fixed w-full h-full top-0 left-0"
        @click="$emit('removeLight', false)"
      ></div>
      <div class="w-full flex items-center justify-end h-10 relative">
        <UiButton
          @click="$emit('removeLight', false)"
          class="bg-transparent text-white transform active:scale-99 p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </UiButton>
      </div>
      <div
        class="h-full w-full relative flex items-center justify-center"
        style="pointer-events: none"
      >
        <UiButton
          @click="prevButton"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-1 active:scale-99 pointer-events-auto h-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </UiButton>
        <slot name="img"></slot>
        <UiButton
          @click="nextButton"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent text-white !p-1 active:scale-99 pointer-events-auto h-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </UiButton>
      </div>
    </div>
  </transition>
</template>
<style scoped>
img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
