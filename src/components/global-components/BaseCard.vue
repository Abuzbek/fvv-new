<script setup>
import { defineProps } from "vue";
const props = defineProps(["title", "thumbnail", "views", "date", "body"]);
const html = document.createElement("div");
html.innerHTML = props.body;
const body = html.innerText;
props.body = body;
</script>
<template>
  <div class="card p-5 bg-white rounded-lg h-full">
    <div class="card-photo mb-3">
      <img :src="thumbnail" alt="" class="w-full object-cover rounded-lg" />
    </div>
    <div class="card-body">
      <h3 class="card-title mb-2.5 text-xl slice-text-2">{{ title }}</h3>
      <div v-if="date">
        <div class="card-footer flex items-center">
          <div class="card-footer-item flex items-center">
            <img src="../../assets/icon/calendar.svg" alt="" />
            <span class="text-gray-600 inline-block ml-2">{{ date }}</span>
          </div>
          <div class="border border-gray-600 h-4 mx-4"></div>
          <div class="card-footer-item flex items-center">
            <img src="../../assets/icon/eye.svg" alt="" />
            <span class="text-gray-600 inline-block ml-2">{{ views }}</span>
          </div>
        </div>
      </div>
      <div class="text-gray-500 slice-text-3" v-html="body"></div>
    </div>
  </div>
</template>
<style>
.slice-text-3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
