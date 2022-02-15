<script setup>
import { onMounted, ref, defineEmits, defineProps } from "@vue/runtime-core";
import { useI18n } from "vue-i18n";
const $emit = defineEmits(["close"]);
defineProps(["top"]);
const { t } = useI18n();
const fontSize = ref(16);
function changeHandler() {
  document.querySelector("html").style.fontSize = `${fontSize.value}px`;
}
function changeThema({ filter }) {
  document.querySelector("html").style.filter = filter;
}
onMounted(() => {
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("outside-change-click")) {
      $emit("close");
    }
  });
});
</script>
<template>
  <div
    class="absolute facilites w-56 z-50 active_facilites outside-change-click"
    :class="top ? top : 'top-11'"
  >
    <div class="card bg-white p-5 shadow-md outside-change-click">
      <div class="grid grid-cols-3 gap-4 outside-change-click">
        <div class="col-span-3 text-lg outside-change-click">
          {{ t("site_view") }}
        </div>
        <div
          class="outside-change-click appearance w-10 h-10 bg-yellow-500 text-white text-xl flex justify-center items-center cursor-pointer has-tooltip"
          @click="changeThema({ filter: 'grayscale(0%) invert(0%)' })"
        >
          A
        </div>
        <div
          class="outside-change-click appearance w-10 h-10 text-white bg-gray-400 text-xl flex justify-center items-center cursor-pointer has-tooltip"
          @click="changeThema({ filter: 'grayscale(100%)' })"
        >
          A
        </div>
        <div
          class="outside-change-click appearance w-10 h-10 text-white bg-gray-700 text-xl flex justify-center items-center cursor-pointer has-tooltip"
          @click="changeThema({ filter: 'grayscale(100%) invert(100%)' })"
        >
          A
        </div>
      </div>
      <div class="outside-change-click grid grid-cols-3 gap-4 mt-4">
        <div class="outside-change-click col-span-3 text-lg">
          {{ t("fontSize") }}
        </div>
        <div class="outside-change-click col-span-3">
          <input
            type="range"
            min="16"
            max="24"
            @input="changeHandler($event)"
            class="w-full outside-change-click"
            v-model="fontSize"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
