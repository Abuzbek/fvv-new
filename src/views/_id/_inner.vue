<script setup>
import { onMounted, ref, watch } from "@vue/runtime-core";
import http from "@/hooks/http";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import Header from "../../components/global-components/Header.vue";
import CardLidership from "../../components/global-components/CardLidership.vue";
import RigthAside from "../../components/global-components/RigthAside.vue";
const route = useRoute();
// const router = useRouter();
const i18n = useI18n();
const data = ref([]);
const dataResults = ref([]);
const category = ref(null);
const firstSign = ref(1);
class Methods {
  async byParentId() {
    let url = `/${i18n.locale.value}/api/${route.params.typeId}/${route.params.innerId}/`;
    const resp = await http({
      method: "GET",
      url: url,
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
      dataResults.value = resp.response.data;
      dataResults.value.date = new Date(
        dataResults.value.date
      ).toLocaleDateString("ru-Ru", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    } catch (error) {
      console.log(error);
    }
  }
  isTrue(value) {
    if (value == 'undefined') {
      return false;
    } else {
      return !!(value) === true;
    }
  }
  async getViewCount() {
    if (route.params.typeId == 'articles') {
      let urlView = `/${i18n.locale.value}/api/articles/view_count/${route.params.innerId}/`;
      await http({
        method: "GET",
        url: urlView,
      });
    }
  }
}
const { byParentId, getContent, isTrue, getViewCount } = new Methods();
onMounted(async () => {
  await getContent();
  // console.clear();
  localStorage.setItem(
    "title",
    dataResults.value.title || dataResults.value.rank
  );
  document.querySelector("title").innerText = localStorage.getItem("title");
});
watch(
  () => route.params,
  async (val) => {
    if (val.innerId) {
      await getContent();
      // console.clear();
      localStorage.setItem(
        "title",
        dataResults.value.title || dataResults.value.rank
      );
      document.querySelector("title").innerText = localStorage.getItem("title");
    }
  }
);
watch(
  () => i18n.locale.value,
  async () => {
    await getContent();
    // console.clear();
    localStorage.setItem(
      "title",
      dataResults.value.title || dataResults.value.rank
    );
    document.querySelector("title").innerText = localStorage.getItem("title");
  }
);
setTimeout(() => {
  const section = window.document.querySelectorAll('.footer-section')[0]
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting && firstSign.value === 1) {
        await getViewCount(route.params.id)
        firstSign.value++
      }
    })
  })
  observer.observe(section)
}, 400)

</script>
<template>
  <div>
    <Header v-if="category" :subtitle="category.subtitle" :image="category.image" />
    <div class="fixed top-0 left-0 z-50 bg-gray-800 w-full h-full flex items-center justify-center" v-else>
      <img src="@/assets/img/animation_500_kyicu3ga.gif" alt="" />
    </div>
    <div class="container mx-auto px-4" :class="route.params.typeId == 'leaderships' ? 'mt-10' : 'mt-32'">
      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <h1 class="text-3xl font-bold bg-white p-5 rounded-lg mb-5" v-if="dataResults.title || dataResults.rank">
            {{ dataResults.title || dataResults.rank }}
          </h1>
          <div class="card bg-white p-5 rounded-lg mb-12">
            <img :src="dataResults.thumbnail" class="w-full rounded-lg mb-5" alt=""
              v-if="route.params.typeId !== 'leaderships'" />
            <div v-else class="">
              <CardLidership v-bind="dataResults" />
            </div>
            <div v-if="route.params.typeId !== 'leaderships'" class="flex items-center mb-3">
              <div class="card-footer flex items-center">
                <div class="card-footer-item flex items-center flex-wrap">
                  <img src="@/assets/icon/calendar.svg" alt="" />
                  <span class="text-gray-600 inline-block ml-2">
                    {{ dataResults.date }}
                  </span>
                </div>
                <div class="border border-gray-600 h-4 mx-4"></div>
                <div class="card-footer-item flex items-center">
                  <img src="@/assets/icon/eye.svg" alt="" />
                  <span class="text-gray-600 inline-block ml-2">
                    {{ dataResults.views }}
                  </span>
                </div>
              </div>
            </div>
            <div v-if="isTrue(dataResults.description || dataResults.body)"
              class="bg-thin-yellow-primary bg-opacity-30 rounded-lg p-5 text-lg font-sans body"
              v-html="dataResults.description || dataResults.body">
            </div>
          </div>
        </div>
        <div>
          <RigthAside />
        </div>
      </div>
    </div>
    <div class="footer-section"></div>
  </div>
</template>
