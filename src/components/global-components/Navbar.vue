<script setup>
import { onMounted, ref } from "vue";
// import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import http from "../../hooks/http";
const i18n = useI18n();
// const store = useStore();
const router = useRouter();
function linkClick(i) {
  if (i === "all") {
    categories.value.map((item) => {
      item.show = false;
    });
    show.value = false;
  } else {
    categories.value.map(async (item, ind) => {
      if (ind === i) {
        item.children = [];
        const children = await http.get(
          `/${i18n.locale.value}/api/categories/byParentId/${item.id}`
        );
        item.show = !item.show;
        item.children = children.data;
        show.value = categories.value[i].show;
      } else {
        item.show = false;
      }
    });
  }
}
function redirectInner(item) {
  router.push({
    name: "_id",
    params: {
      id: item.slug,
    },
  });
}
onMounted(async () => {
  const categoryParent = await http.get(
    `/${i18n.locale.value}/api/categories/parent/`
  );
  categories.value = categoryParent.data.results;
  categories.value = categories.value.map((item) => {
    return {
      ...item,
      show: false,
    };
  });
  console.log(categories.value);
});
const categories = ref([]);
const show = ref(false);
</script>

<template>
  <div
    v-show="show"
    @click="linkClick('all')"
    class="overlay fixed top-0 left-0 w-full h-full z-40 bg-black bg-opacity-10"
  ></div>
  <div class="navbar absolute top-0 left-0 right-0 w-full z-50">
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
      <div class="container mx-auto flex items-center">
        <ul class="flex items-center w-full justify-between">
          <li v-for="(n, i) in categories" :key="i">
            <div class="relative inline-block text-left nav-link">
              <div>
                <a
                  href="#!"
                  @click.prevent="linkClick(i)"
                  type="button"
                  class="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-medium text-white"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  {{ n.name }}
                  <svg
                    class="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
              <transition name="scale">
                <div
                  v-if="n.show"
                  class="origin-top-right nav-link_menu absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  :class="i == 0 ? 'left-0' : 'right-0'"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div class="py-1" role="none">
                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                    <a
                      v-for="(m, idx) in n.children"
                      @click.prevent="redirectInner(m)"
                      :key="idx"
                      href="#"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                    >
                      {{ m.name }}
                    </a>
                  </div>
                </div>
              </transition>
            </div>
          </li>
        </ul>
        <button class="ml-5 transform active:scale:95 block md:hidden">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
