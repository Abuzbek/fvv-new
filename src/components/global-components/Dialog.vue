<script setup>
import { ref } from "@vue/runtime-core";
import { defineProps, defineEmits } from "vue";

class Methods {
  close() {
    $emit("close");
  }
  confirm() {
    $emit("confirm");
  }
  cancel() {
    $emit("cancel");
  }
  open() {
    $emit("open");
  }
}

const props = defineProps({
  show: {
    type: Boolean,
  },
  title: {
    type: String,
    default: "",
  },
  classHeader: {
    type: String,
    default: "",
  },
  classContent: {
    type: String,
    default: "",
  },
  transition: {
    type: String,
    default: "",
  },
});
const $emit = defineEmits(["close", "open", "confirm", "cancel"]);
const { close, open, confirm, cancel } = new Methods();
</script>
<template>
  <div>
    <div
      class="
        dialog-mask
        fixed
        top-0
        left-0
        bg-gray-900 bg-opacity-50
        w-full
        h-full
        z-40
      "
      v-show="show"
      @click="close"
    ></div>
    <transition :name="transition">
      <div v-show="show">
        <div
          class="
            dialog-content
            max-w-4xl
            fixed
            z-50
            w-full
            top-1/2
            left-1/2
            transform
            -translate-x-1/2 -translate-y-1/2
            bg-white
          "
          :class="classContent"
        >
          <div class="dialog-header" :class="classHeader">
            <slot name="header" :title="title"></slot>
            <div class="dialog-close cursor-pointer" @click="close">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.2497 22.2496L14.0001 14M14.0001 14L5.75056 5.75042M14.0001 14L22.2497 5.75042M14.0001 14L5.75056 22.2496"
                  stroke="#fff"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </div>
          <div class="dialog-body">
            <slot name="body"></slot>
          </div>
          <div class="dialog-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style></style>
