<template>
  <div>
    <Header v-if="category" :subtitle="category.subtitle" :image="category.image" />
    <div class="container mx-auto px-4 py-16">
      <div class="bg-white rounded-lg p-5 gap-5 mb-12">
        <ul class="flex flex-col gap-4">
          <li v-for="(n, i) in data.results" :key="i">
            <router-link :to="`/${n.category}/leaderships/${n.slug}`" class="p-3 rounded-md bg-white border block">{{ n.rank }}
            </router-link>
          </li>
        </ul>
      </div>
      <div v-if="filter.page_size <= data.count" class="mb-10">
        <Paginate :value="data.current_page" :page-count="data.num_pages" :page-range="3" :click-handler="pagination"
          :prev-text="`<svg width=&quot;24&quot; height=&quot;24&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;>
          <g >
          <path d=&quot;M14.71 6.8309C14.32 6.44276 13.69 6.44276 13.3 6.8309L8.70998 11.399C8.31998 11.7871 8.31998 12.4141 8.70998 12.8022L13.3 17.3703C13.69 17.7584 14.32 17.7584 14.71 17.3703C15.1 16.9822 15.1 16.3552 14.71 15.967L10.83 12.0956L14.71 8.23416C15.1 7.84602 15.09 7.20908 14.71 6.8309Z&quot; fill=&quot;#fff&quot;/>
          </g>
          <defs>
          <clipPath>
          <rect width=&quot;24&quot; height=&quot;24&quot; rx=&quot;4&quot; fill=&quot;white&quot;/>
          </clipPath>
          </defs>
          </svg>
          `" :next-text="`<svg width=&quot;24&quot; height=&quot;24&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;>
          <g >
          <path d=&quot;M9.29002 6.8309C9.68002 6.44276 10.31 6.44276 10.7 6.8309L15.29 11.399C15.68 11.7871 15.68 12.4141 15.29 12.8022L10.7 17.3703C10.31 17.7584 9.68002 17.7584 9.29002 17.3703C8.90002 16.9822 8.90002 16.3552 9.29002 15.967L13.17 12.0956L9.29002 8.23416C8.90002 7.84602 8.91002 7.20908 9.29002 6.8309Z&quot; fill=&quot;#fff&quot;/>
          </g>
          <defs>
          <clipPath>
          <rect width=&quot;24&quot; height=&quot;24&quot; rx=&quot;4&quot; transform=&quot;matrix(-1 0 0 1 24 0)&quot; fill=&quot;white&quot;/>
          </clipPath>
          </defs>
          </svg>
          `" active-class="border-[blue-400
                      text-blue-400" next-class="relative
              inline-flex
              items-center
              px-2
              py-2
              rounded-r-md
              bg-blue-400
              text-sm
              font-medium
              text-gray-500 ml-2 transform active:scale-95" prev-class="relative
              inline-flex
              items-center
              px-2
              py-2
              rounded-l-md
              bg-blue-400
              text-sm
              font-medium
              text-gray-500 mr-2 transform active:scale-95" page-class="w-10 justify-center h-10 relative
              inline-flex
              items-center
              px-2
              py-2
              rounded-md
              bg-gray-50
              text-sm
              font-medium
              text-gray-500
              hover:bg-white mr-2 transform active:scale-95" :container-class="'relative z-0 inline-flex rounded-md'">
        </Paginate>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import http from "../hooks/http";
import Header from "../components/global-components/Header.vue";
import { watch } from "@vue/runtime-core";
const i18n = useI18n();
const route = useRoute();

const category = ref(null);
const data = ref([]);
const filter = ref({
  p: 1,
  page_size: 10,
  date: "",
  course_level: "",
  shift: "",
  group: "",
});

const getData = async () => {
  const response = await http.get(`/${i18n.locale.value}/api/categories/${route.query.slug}`);
  console.log(response);
  category.value = response.data;
  document.querySelector("title").innerText = category.value.subtitle;
  const url = `/${i18n.locale.value}/api/leaderships/byCategoryId/${response.data.id}`
  const resp = await http({
    method: "GET",
    url: url,
    params: {
      ...filter.value
    },
  });
  data.value = resp.data;
};
getData()
const pagination = (page) => {
  filter.value.p = page;
  getData();
};
watch(()=>route.query, ()=>{
  getData();
})
watch(()=>i18n.locale.value, ()=>{
  getData();
})
</script>

<style>
</style>