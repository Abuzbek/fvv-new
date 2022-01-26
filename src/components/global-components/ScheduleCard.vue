<script setup>
import { defineProps } from "vue";
defineProps([
  "course_level",
  "shift",
  "date",
  "start_time",
  "end_time",
  "group",
]);
</script>
<template>
  <div class="p-2.5 rounded-md bg-white">
    <h3 class="text-lg font-medium mb-3">{{ group.name }}</h3>
    <ul>
      <li class="mb-2.5 flex items-center text-sm">
        <span class="text-gray-600">Kurs - </span>
        <span class="text-yellow-500 ml-1">{{ course_level }}</span>
      </li>
      <li class="mb-2.5 flex items-center text-sm">
        <span class="text-gray-600">Smena - </span>
        <span class="text-yellow-500 ml-1">{{ shift }}</span>
      </li>
      <li class="mb-2.5 flex items-center text-sm">
        <span class="text-gray-600">Dars vaqti - </span>
        <span class="text-yellow-500 ml-1"
          >{{ start_time.slice(0, 5) }} - {{ end_time.slice(0, 5) }}</span
        >
      </li>
      <li class="flex items-center text-sm">
        <span class="text-gray-600">Sana - </span>
        <span class="text-yellow-500 ml-1">{{ date }}</span>
      </li>
    </ul>
  </div>
</template>

<style></style>
