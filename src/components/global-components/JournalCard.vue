<script setup>
import { defineProps } from "vue";
defineProps(["thumbnail", "title", "body", "date", "views"]);
</script>
<template>
  <div class="bg-white rounded-md p-5">
    <div class="card-img">
      <img :src="thumbnail" alt="" />
    </div>
    <div class="card-content">
      <div class="card-title slice-text-2 text-gray-900 font-bold mb-1">
        {{ title }}
      </div>
      <div class="card-body slice-text-3 text-gray-900 mb-1">{{ body }}</div>
      <div>
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
.slice-text-3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
