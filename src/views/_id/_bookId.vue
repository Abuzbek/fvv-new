<script setup>
import { onMounted, ref, watch } from "@vue/runtime-core";
import http from "@/hooks/http";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import Header from "@/components/global-components/Header.vue";
const route = useRoute();
// const router = useRouter();
const i18n = useI18n();
const data = ref([]);
const dataResults = ref([]);
const category = ref(null);
class Methods {
  async byParentId() {
    let url = `/${i18n.locale.value}/api/books/byParentId/${route.params.bookId}/`;
    const resp = await http({
      method: "GET",
      url: url,
      params: {
        page_size: 10,
      },
    });
    return { response: resp };
  }
  async getContent() {
    try {
      const getId = await http.get(
        `/${i18n.locale.value}/api/categories/${route.params.id}`
      );
      category.value = getId.data;
      const resp = await byParentId();
      data.value = resp.response.data;
      dataResults.value = resp.response.data.results;
    } catch (error) {
      console.log(error);
    }
  }
}
const { byParentId, getContent } = new Methods();
onMounted(async () => {
  await getContent();
console.clear()
});
watch(
  () => route.params,
  async (val) => {
    if (val.bookId) {
      await getContent();
console.clear()
    }
  }
);
watch(
  () => i18n.locale.value,
  async () => {
      await getContent();
console.clear()
  }
);
</script>
<template>
  <div>
    <Header
      v-if="category"
      :subtitle="category.subtitle"
      :image="category.image"
    />
    <div
      class="fixed top-0 left-0 z-50 bg-gray-800 w-full h-full flex items-center justify-center"
      v-else
    >
      <img src="@/assets/img/animation_500_kyicu3ga.gif" alt="" />
    </div>
    <div class="container mx-auto px-4">
      <div class="card bg-white p-5 rounded-lg mt-10 mb-12">
        <div
          class="book-card py-2 px-4 rounded-lg flex items-center"
          v-for="(n, i) in dataResults"
          :key="i"
          :class="{
            'bg-gray-200': i % 2 == 0,
          }"
          :id="i"
        >
          <img :src="n.image" class="w-11 h-12" alt="" />
          <router-link
            class="ml-2.5 text-lg border-b border-transparent hover:border-gray-900 text-gray-900"
            to="#!"
          >
            {{ n.title }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
