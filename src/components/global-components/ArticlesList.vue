<script setup>
import { defineProps } from "vue";
const props = defineProps(["thumbnail", "title", "body", "date", "views"]);
const html = document.createElement("div");
html.innerHTML = props.body;
const body = html.innerText;
props.body = body;
</script>
<template>
  <div class="card py-4 grid grid-cols-4 gap-5">
    <div class="card-img rounded-lg">
      <img :src="thumbnail" :alt="id" class="rounded-lg" />
    </div>
    <div class="card-body col-span-3">
      <div class="card-top flex items-center">
        <div class="card-top-item flex items-center">
          <img src="../../assets/icon/calendar.svg" alt="" />
          <span class="text-gray-600 inline-block ml-2">{{ date }}</span>
        </div>
        <div class="border border-gray-600 h-4 mx-4"></div>
        <div class="card-top-item flex items-center">
          <img src="../../assets/icon/eye.svg" alt="" />
          <span class="text-gray-600 inline-block ml-2">{{ views }}</span>
        </div>
      </div>
      <div class="card-body-title">
        <div
          class="card-title slice-text-2 text-xl text-gray-900 font-bold mb-1"
        >
          {{ title }}
        </div>
        <div
          class="card-body slice-text-3 text-lg text-gray-900 mb-1 slice-text-4"
          v-html="body"
        ></div>
      </div>
    </div>
  </div>
</template>
<style>
.slice-text-2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.slice-text-3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.slice-text-4 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.slice-text-5 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
