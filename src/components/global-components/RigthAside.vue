<script setup>
import { ref } from "@vue/reactivity";
import { useI18n } from "vue-i18n";
import http from "../../hooks/http";
import BaseCard from "./BaseCard.vue";
const href = window.location.href;
const i18n = useI18n();
const result = ref([]);
function copy(e) {
  e.preventDefault();
  e.stopPropagation();
  const copyText = document.createElement("input");
  copyText.value = href;
  navigator.clipboard.writeText(copyText.value);
}
(async function () {
  const sluCategory = await http.get(
    `/${i18n.locale.value}/api/categories/yangiliklar/`
  );
  const resp = await http.get(
    `/${i18n.locale.value}/api/articles/byCategoryId/${sluCategory.data.id}?page_size=2`
  );
  result.value = resp.data.results;
})();
</script>
<template>
  <div class="pb-14">
    <div class="mb-5 lg:block grid md:grid-cols-2 gap-6">
      <router-link :to="`/yangiliklar`" v-for="(n, i) in result" class="mb-5 " :key="i">
        <BaseCard v-bind="n" />
      </router-link>
    </div>
    <div class="card_share bg-white rounded-md px-1.5 py-2">
      <ul>
        <li>
          <a :href="'https://t.me/share/url?url=' + href" target="_blank"
            class="p-2.5 flex items-center bg-white hover:bg-thin-yellow-primary rounded-md hover:bg-opacity-30 transition">
            <img src="../../assets/icon/Telegram.svg" alt="" class="mr-2" />
            Telegram
          </a>
        </li>
        <li>
          <a :href="'https://www.facebook.com/sharer/sharer.php?u=' + href" target="_blank"
            class="p-2.5 flex items-center bg-white hover:bg-thin-yellow-primary rounded-md hover:bg-opacity-30 transition">
            <img src="../../assets/icon/Facebook.svg" alt="" class="mr-2" />
            Facebook
          </a>
        </li>
        <li>
          <a :href="'https://twitter.com/intent/tweet?url=' + href" target="_blank"
            class="p-2.5 flex items-center bg-white hover:bg-thin-yellow-primary rounded-md hover:bg-opacity-30 transition">
            <img src="../../assets/icon/Twitter.svg" alt="" class="mr-2" />
            Twitter
          </a>
        </li>
        <hr />
        <li>
          <a href="#!" @click.stop="copy"
            class="p-2.5 flex items-center bg-white hover:bg-thin-yellow-primary rounded-md hover:bg-opacity-30 transition">
            <img src="../../assets/icon/duplicate.svg" alt="" class="mr-2" />
            Скопировать ссылку
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>

</style>
