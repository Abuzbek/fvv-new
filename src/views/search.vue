<template>
  <div class="container mx-auto px-4">
    <div class="search-box bg-white p-5 rounded-lg my-10 flex items-center">
      <div
        class="text-gray-600 bg-white flex w-full items-center py-2.5 px-3.5 rounded-l-md border-l border-t border-b border-gray-400"
      >
        <input
          type="text"
          :placeholder="`${t('search')}`"
          class="w-full focus:outline-none"
          v-model="search"
        />
      </div>
      <div
        @click="searchRes"
        class="cursor-pointer text-gray-600 bg-white flex items-center py-2.5 px-3.5 rounded-r-md border-r border-t border-b border-gray-400"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5001 14H14.7101L14.4301 13.73C15.6301 12.33 16.2501 10.42 15.9101 8.39002C15.4401 5.61002 13.1201 3.39002 10.3201 3.05002C6.09014 2.53002 2.53014 6.09001 3.05014 10.32C3.39014 13.12 5.61014 15.44 8.39014 15.91C10.4201 16.25 12.3301 15.63 13.7301 14.43L14.0001 14.71V15.5L18.2501 19.75C18.6601 20.16 19.3301 20.16 19.7401 19.75C20.1501 19.34 20.1501 18.67 19.7401 18.26L15.5001 14ZM9.50014 14C7.01014 14 5.00014 11.99 5.00014 9.50002C5.00014 7.01002 7.01014 5.00002 9.50014 5.00002C11.9901 5.00002 14.0001 7.01002 14.0001 9.50002C14.0001 11.99 11.9901 14 9.50014 14Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
    <div
      class="search-content bg-white p-5 rounded-lg mb-10"
      v-if="searchResults.length > 0 || noResults"
    >
      <div
        class="card p-5 border border-gray-400 rounded-lg mb-6"
        v-for="(n, i) in searchResults"
        :key="i"
      >
        <div class="">
          <h2 class="text-2xl font-semibold slice-text-2">{{ n.title }}</h2>
          <p class="text-gray-600 slice-text-3 body" v-html="n.body"></p>
        </div>
      </div>
      <div v-if="noResults">Malumot topilmadi :(</div>
    </div>
    <div class="bg-white rounded-lg p-5 mb-10" v-if="data.count > 10">
      <Paginate
        :value="data.current_page"
        :page-count="data.num_pages"
        :page-range="3"
        :click-handler="pagination"
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
        `"
        :next-text="`<svg width=&quot;24&quot; height=&quot;24&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;>
          <g >
          <path d=&quot;M9.29002 6.8309C9.68002 6.44276 10.31 6.44276 10.7 6.8309L15.29 11.399C15.68 11.7871 15.68 12.4141 15.29 12.8022L10.7 17.3703C10.31 17.7584 9.68002 17.7584 9.29002 17.3703C8.90002 16.9822 8.90002 16.3552 9.29002 15.967L13.17 12.0956L9.29002 8.23416C8.90002 7.84602 8.91002 7.20908 9.29002 6.8309Z&quot; fill=&quot;#fff&quot;/>
          </g>
          <defs>
          <clipPath>
          <rect width=&quot;24&quot; height=&quot;24&quot; rx=&quot;4&quot; transform=&quot;matrix(-1 0 0 1 24 0)&quot; fill=&quot;white&quot;/>
          </clipPath>
          </defs>
          </svg>
          `"
        active-class="border-[blue-400
                      text-blue-400"
        next-class="relative
              inline-flex
              items-center
              px-2
              py-2
              rounded-r-md
              bg-blue-400
              text-sm
              font-medium
              text-gray-500 ml-2 transform active:scale-95"
        prev-class="relative
              inline-flex
              items-center
              px-2
              py-2
              rounded-l-md
              bg-blue-400
              text-sm
              font-medium
              text-gray-500 mr-2 transform active:scale-95"
        page-class="w-10 justify-center h-10 relative
              inline-flex
              items-center
              px-2
              py-2
              rounded-md
              bg-gray-50
              text-sm
              font-medium
              text-gray-500
              hover:bg-white mr-2 transform active:scale-95"
        :container-class="'relative z-0 inline-flex rounded-md'"
      ></Paginate>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useI18n } from "vue-i18n";
import http from "../hooks/http";
const route = useRoute();
const i18n = useI18n();
const { t } = useI18n();
import Paginate from "vuejs-paginate/src/components/Paginate.vue";
import { useRoute } from "vue-router";
const search = ref("");

const searchResults = ref([]);
const noResults = ref(false);
const data = ref({
  count: 0,
  current_page: 1,
  num_pages: 1,
  per_page: 10,
  results: [],
});
const searchRes = async () => {
  await getData({ search: search.value }, 0);
};
const getData = async (query, len) => {
  try {
    if (query.search.length > len) {
      const res = await http({
        url: `/${i18n.locale.value}/api/global_search/`,
        params: {
          query: query.search,
          p: query.p,
        },
        method: "get",
      });
      if (res.status === 200) {
        searchResults.value = res.data.results;
        data.value = res.data;
        if (res.data.results.length === 0) {
          noResults.value = true;
        } else {
          noResults.value = false;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const pagination = async (page) => {
  await getData({ search: search.value, p: page }, 0);
  window.scrollTo(0, 0);
};
watch(search, async (value) => {
  console.log(value);
  await getData({ search: value }, 3);
});
(async () => {
  await getData({ search: route.query.q }, 0);
})();
</script>

<style></style>
