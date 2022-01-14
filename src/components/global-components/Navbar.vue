<script setup>
import { defineProps } from "vue";
// import { useI18n } from "vue-i18n";
const props = defineProps(['links']);
// const $i18n = useI18n();
// onMounted(async () => {
  
// });
// const categories = ref([]);
</script>

<template>
  <div>
    <div class="nav-top bg-white py-1.5">
      <div class="container mx-auto">
        <div class="flex flex-wrap items-center justify-between">
          <a href="/" class="nav-logo flex items-center">
            <img src="@/assets/img/logo.png" alt />
            <p class="ml-1.5">
              FVV Akademiyasi huzuridagi
              <br />fuqoro muhofazasi instituti
            </p>
          </a>
          <div class="phone-numbers">
            <ul class="flex items-center">
              <li>
                <a href="#!" class="flex items-center mx-2.5">
                  <img class="mr-0.5" src="@/assets/icon/nav/phone.svg" alt />
                  <span class="text-primary mr-1">1050-</span>
                  <span>Qutqaruv xizmati</span>
                </a>
              </li>
              <li>
                <a href="#!" class="flex items-center mx-2.5">
                  <img class="mr-0.5" src="@/assets/icon/nav/phone.svg" alt />
                  <span class="text-primary mr-1">1101-</span>
                  <span>Ishonch telefoni</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="utility">
            <ul class="flex items-center">
              <li>
                <a href="#!" class="mx-3.5 block">
                  <img src="@/assets/icon/nav/mobile-phone.svg" alt />
                </a>
              </li>
              <li>
                <a href="#!" class="mx-3.5 block">
                  <img src="@/assets/icon/nav/glasses.svg" alt />
                </a>
              </li>
              <li>
                <a href="#!" class="mx-3.5 block">
                  <img src="@/assets/icon/nav/user.svg" alt />
                </a>
              </li>
            </ul>
          </div>
          <div class="search-box">
            <div class="search-icon">
              <a href="#!">
                <img src="@/assets/icon/nav/search.svg" alt />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-bottom bg-blue-primary py-1.5">
      <div class="container mx-auto">
        <ul>
          <li v-for="(n, i) in links" :key="i">
            <a href="#!" @click.prevent class="text-white">
              <span>{{}}</span>
              <img src="../../assets/icon/nav/arrow_down.svg" alt />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
