<script setup>
import { defineProps } from "vue";
const props = defineProps(["title", "thumbnail", "body", "date", "views", "isOdd"]);
const html = document.createElement("div");
html.innerHTML = props.body;
const body = html.innerText;
props.body = body;
</script>
<template>
  <div class="card p-5 rounded-lg grid grid-cols-4 gap-5 bg-white">
    <div class="card-img rounded-lg" v-if="isOdd">
      <img :src="thumbnail" :alt="id" class="rounded-lg" />
    </div>
    <div class="card-body col-span-3">
      <div class="card-body-title">
        <div
          class="card-title slice-text-2 text-xl text-gray-900 font-bold mb-1"
        >
          {{ title }}
        </div>
        <div
          class="card-body text-lg text-gray-900 mb-1 slice-text-4"
          v-html="body"
        ></div>
      </div>
    </div>
    <div class="card-img rounded-lg" v-if="!isOdd">
      <img :src="thumbnail" :alt="id" class="rounded-lg" />
    </div>
  </div>
</template>

<style></style>
