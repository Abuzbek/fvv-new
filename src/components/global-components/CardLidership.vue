<script setup>
import { defineProps } from "@vue/runtime-core";
defineProps([
  "image",
  "last_name",
  "first_name",
  "father_name",
  "rank",
  "working_hours",
  "phone",
  "email",
  "position",
]);
</script>
<template>
  <div class="card bg-white rounded-md p-5">
    <div class="card-info grid sm:grid-cols-3 gap-3.5 mb-6">
      <div class="sm:col-span-1">
        <img :src="image" alt="" class="w-full object-cover" />
      </div>
      <div class="sm:col-span-2">
        <div>
          <h3 class="uppercase mb-1 text-lg">
            {{ last_name }} 
            {{ first_name }}
          </h3>
          <p class="text-gray-800 mb-2">{{ position }}</p>
        </div>
        <div>
          <h3 class="mb-1">{{ "Unvoni" }}</h3>
          <p class="text-sm text-gray-500">{{ rank }}</p>
        </div>
        <div>
          <h3 class="mb-1">{{ "Qabul vaqti" }}</h3>
          <p class="text-sm text-gray-500">{{ working_hours }}</p>
        </div>
      </div>
    </div>
    <div class="card-contact">
      <ul class="grid lg:grid-cols-2 gap-5">
        <li>
          <a href="#!" class="flex items-center">
            <div
              class="icon bg-orange-primary w-8 h-8 rounded-full flex items-center justify-center mr-2"
            >
              <img src="@/assets/icon/phone.svg" alt="" />
            </div>
            <div>
              <span class="text-sm text-gray-500">Telfon</span>
              <p class="text-gray-800">{{ phone }}</p>
            </div>
          </a>
        </li>
        <li>
          <a href="#!" class="flex items-center">
            <div
              class="icon bg-orange-primary w-8 h-8 rounded-full flex items-center justify-center mr-2"
            >
              <img src="@/assets/icon/alternate_email.svg" alt="" />
            </div>
            <div>
              <span class="text-sm text-gray-500">Elektron manzil</span>
            <p class="text-gray-800">{{ email }}</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style></style>
