<script setup>
import { defineEmits, defineProps } from "@vue/runtime-core";
const $emit = defineEmits(["click", "clickStop"]);
const props = defineProps(["class", "id"]);
</script>
<template>
  <button
    :id="props.id"
    @click="$emit('click')"
    @click.stop="$emit('clickStop')"
    :class="props.class"
    class="ui-button bg-[#06B68C] text-white py-3 px-4 rounded-md "
  >
    <slot></slot>
  </button>
</template>
<style>
/* .ui-button {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

span.ripple {
  display: block;
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: ripple 600ms linear;
  background-color: rgba(255, 255, 255, 0.7);
}
.ui-link span.ripple {
  display: block;
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: ripple 600ms linear;
  background-color: rgba(0, 131, 143, 0.7);
}
.ui-link-ligthen span.ripple {
  display: block;
  position: absolute;
  border-radius: 50%;
  transform:  translate(-50%, -50%);
  animation: ripple 600ms linear;
  background-color: rgba(0, 131, 143, 0.5);
}

/* @keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
} 
@keyframes ripple {
  0% {
    width: 0;
    height: 0;
    opacity: 0.5;
  }
  100% {
    width: 500px;
    height: 500px;
    opacity: 0;
  }
} */
</style>
