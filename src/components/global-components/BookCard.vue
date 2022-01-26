<script setup>
import { defineProps } from "vue";
defineProps(["photo", "title"]);
</script>

<template>
  <div class="card rounded-lg relative">
    <div class="img relative z-10">
      <img :src="photo" alt="" class="w-full" />
    </div>
    <div
      class="title absolute top-0 left-0 w-full h-full z-20 flex flex-col justify-between  p-5"
      style="
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.3),
          rgba(0, 0, 0, 0.3)
        );
      "
    >
      <div></div>
      <div class="text-white flex items-center">
        <span>{{ title }}</span>
        <i
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            /></svg
        ></i>
      </div>
    </div>
  </div>
</template>

<style></style>
