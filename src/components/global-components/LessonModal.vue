<script setup>
import { defineProps, ref } from "vue";
const month = ref(null);
const day = ref(null);
const year = ref(null);
const props = defineProps(["date", "data"]);
month.value = new Date(props.date).toLocaleString("default", { month: "long" });
day.value = new Date(props.date).toLocaleString("default", { day: "numeric" });
year.value = new Date(props.date).toLocaleString("default", {
  year: "numeric",
});
const data = ref(props.data);
data.value = data.value.map((item) => {
  return {
    ...item,
    date: new Date(item.date).toLocaleString("ru-Ru", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    }),
  };
});
/*
"id": "4e78ae8d-9849-41d0-b7fd-3c1c6f67a4f7",
        "date": "2022-01-26",
        "start_time": "15:20:32",
        "end_time": "15:20:33",
        "schedule": {
            "id": "e055d2b0-67d5-4f56-8d3d-f5e06a9cf7c2",
            "course_level": "4-Kurs",
            "shift": "Ertalabki",
            "date": "2022-01-24",
            "start_time": "10:21:42",
            "end_time": "10:21:42",
            "group": {
                "id": "be6e5b86-6378-4dc8-a6ca-f8e41694745b",
                "number": 123,
                "name": "111-RBR"
            }
        },
        "subject": {
            "id": "d5841c3f-2fc5-4731-8d5b-cbc8bb69ed21",
            "name": "test"
        }
*/
</script>
<template>
  <div
    class="max-w-4xl w-full fixed z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white rounded-lg p-7"
  >
    <div class="flex justify-between items-center">
      <div></div>
      <button
        @click="$emit('close')"
        class="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray- 800"
      >
        <svg
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <h1 class="text-2xl font-medium">
      {{ day }}-{{ month }} {{ year }}-yil uchun dars jadvali.
    </h1>
    <table class="data-table w-full">
      <thead class="border-b border-gray-200">
        <tr>
          <th class="text-left p-5">Dars</th>
          <th class="text-left p-5">Sana</th>
          <th class="text-left p-5">Boshlanish vaqti</th>
          <th class="text-left p-5">Tugash vaqti</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b border-gray-200"
          v-for="(item, index) in data"
          :key="index"
        >
          <td class="text-left p-4 pl-5">{{ item.subject }}</td>
          <td class="text-left p-4 pl-5">{{ item.date }}</td>
          <td class="text-left p-4 pl-5">{{ item.start_time }}</td>
          <td class="text-left p-4 pl-5">{{ item.end_time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
