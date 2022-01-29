<script setup>
import Navbar from "./components/global-components/Navbar.vue";
import Footer from "./components/global-components/Footer.vue";
</script>
<template>
  <div class="xl:pt-118-px pt-70-px" style="background: #f2f4f6">
    <Navbar></Navbar>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <Footer />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.collapse-enter-active, .collapse-leave-active {
  transition: max-height .5s;
}
.collapse-enter, .collapse-leave-to {
  max-height: 0 .5s;
}
.scale-enter-active {
  transition: transform 0.1s ease-out;
}
.scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.scale-enter-to {
  opacity: 1;
  transform: scale(1);
}
.scale-leave-active {
  transition: transform 0.075s ease-in;
}
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
