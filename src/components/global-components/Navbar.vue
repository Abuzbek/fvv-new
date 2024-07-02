<script setup>
import { onMounted, ref, watch } from "vue";
// import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import http from "../../hooks/http";
import ChangeSite from "./ChangeSite.vue";
import Dialog from "./Dialog.vue";
const i18n = useI18n();
const { t } = i18n;
// const store = useStore();
const router = useRouter();
const search = ref("");
const active_mobile = ref(false);
const locales = ref({
  uz: "O‘zb",
  ru: "Рус",
  uzb: "Ўзб",
  en: "Eng",
});
const locale = ref(i18n.locale.value);
const localeImg = ref(null);
const localeContent = ref([]);
const openLangMenu = ref(false);
const openChangeMenu = ref(false);
const dialog = ref(false);
const img = ref("");
function linkClick(i) {
  if (i === "all") {
    categories.value.map((item) => {
      item.show = false;
    });
    show.value = false;
    openLangMenu.value = false;
  } else {
    categories.value.map(async (item, ind) => {
      if (ind === i) {
        item.children = [];
        const children = await http.get(
          `/${i18n.locale.value}/api/categories/byParentId/${item.id}`
        );
        if (!children.data.length) {
          console.log("no children");
          router.push(`${item.link || "/" + item.slug}`);
          show.value = false;
          openLangMenu.value = false;
        } else {
          item.show = !item.show;
          item.children = children.data;
          show.value = categories.value[i].show;
        }
      } else {
        item.show = false;
      }
    });
  }
}
function redirectInner(item, parentIdx) {
  if (item.link) {
    if (item.link.includes("http")) {
      window.open(item.link);
    } else {
      categories.value.map(async (item, ind) => {
        if (ind === parentIdx) {
          item.children = [];
          const children = await http.get(
            `/${i18n.locale.value}/api/categories/byParentId/${item.id}`
          );
          item.show = !item.show;
          item.children = children.data;
          show.value = categories.value[parentIdx].show;
        } else {
          item.show = false;
        }
      });
      router.push(item.link);
      show.value = false;
      toggleMobile();
    }
  } else {
    categories.value.map(async (item, ind) => {
      if (ind === parentIdx) {
        item.children = [];
        const children = await http.get(
          `/${i18n.locale.value}/api/categories/byParentId/${item.id}`
        );
        item.show = !item.show;
        item.children = children.data;
        show.value = categories.value[parentIdx].show;
      } else {
        item.show = false;
      }
    });
    router.push({
      name: "_id",
      params: {
        id: item.slug,
      },
    });
    show.value = false;
    toggleMobile();
  }
}
function toggleMobile() {
  active_mobile.value = !active_mobile.value;
}
function openMenu() {
  openLangMenu.value = !openLangMenu.value;
}
function switchLanguage(lang) {
  i18n.locale.value = lang;
  localStorage.setItem("locale", lang);
  locale.value = lang;
  openLangMenu.value = false;
  show.value = false;
  categories.value.map((item) => {
    item.show = false;
  });
}
function toggleChangeMenu() {
  console.log("toggleChangeMenu");
  openChangeMenu.value = !openChangeMenu.value;
}
function redirectSearchPage() {
  router.push({ name: "Search", query: { q: search.value } });
  setTimeout(() => {
    window.location.reload();
  }, 100);
}
function getVoise() {
  if (responsiveVoice) {
    return responsiveVoice
      .getVoices()
      .find((n) =>
        n.name.includes(
          i18n.locale.value == "en"
            ? "English Male"
            : i18n.locale.value == "ru"
            ? "Russian"
            : "Turkish Male"
        )
      );
  }
}
function getSelectionText() {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
    console.log(text);
    // for Internet Explorer 8 and below. For Blogger, you should use &amp;&amp; instead of &&.
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text;
}
function speakText() {
  if (speechSynthesis.speaking) {
    responsiveVoice.cancel();
  } else {
    var text = getSelectionText();
    if (text) {
      responsiveVoice.speak(text, getVoise().name);
    }
  }
}
function toggleDialog() {
  dialog.value = !dialog.value;
}
onMounted(async () => {
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("lang-outside")) {
      openLangMenu.value = false;
    }
  });
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
  for (const [key, value] of Object.entries(locales.value)) {
    if (key === i18n.locale.value) {
      let locale = key;
      localeImg.value = import(
        /* webpackPrefetch: true */ `@/assets/icon/${locale}.svg`
      );
    }
    if (key !== i18n.locale.value) {
      localeContent.value.push({
        name: value,
        locale: key,
      });
    }
  }
  localeImg.value.then((data) => {
    img.value = { icon: data.default, title: locales.value[i18n.locale.value] };
  });
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.keyCode === 13) {
      // redirectSearchPage();
      if (getSelectionText()) {
        dialog.value = true;
      }
    }
  });
});
const categories = ref([]);
const show = ref(false);
watch(i18n.locale, async (val) => {
  locale.value = val;
  localeContent.value = [];
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
  for (const [key, value] of Object.entries(locales.value)) {
    if (key === i18n.locale.value) {
      let locale = key;
      localeImg.value = import(
        /* webpackPrefetch: true */ `@/assets/icon/${locale}.svg`
      );
    }
    if (key !== i18n.locale.value) {
      localeContent.value.push({
        name: value,
        locale: key,
      });
    }
  }
  localeImg.value.then((data) => {
    img.value = { icon: data.default, title: locales.value[i18n.locale.value] };
  });
});
</script>

<template>
  <div
    v-show="show"
    @click="linkClick('all')"
    class="overlay fixed top-0 left-0 w-full h-full z-40 bg-black bg-opacity-10"
  ></div>
  <div class="navbar fixed top-0 left-0 right-0 w-full z-50">
    <div class="nav-top bg-white py-1.5 border-b border-gray-200">
      <div>
        <div class="container mx-auto px-4 text-main">
          <marquee class="font-medium">{{ $t("testSite") }}</marquee>
        </div>
      </div>
      <div class="container mx-auto xl:px-0 px-4">
        <div class="flex flex-wrap items-center justify-between">
          <a href="/" class="nav-logo flex items-center">
            <img src="@/assets/img/logo.png" alt />
            <p
              class="ml-1.5 font-semibold max-w-md"
              style="line-height: 130%"
              v-html="t('name')"
            ></p>
          </a>
          <div class="flex items-center gap-12">
            <div class="utility lg:block hidden">
              <ul class="flex items-center">
                <li class="relative">
                  <button class="mx-3.5 block" @click="speakText">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#4f4f4f"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </svg>
                  </button>
                </li>
                <li class="relative">
                  <button class="mx-3.5 block" @click.stop="toggleChangeMenu">
                    <img src="@/assets/icon/nav/glasses.svg" alt />
                  </button>
                  <change-site
                    v-show="openChangeMenu"
                    @close="openChangeMenu = false"
                  />
                </li>
                <li>
                  <div
                    class="lang relative xl:block hidden pl-5"
                    :class="{ active: openLangMenu }"
                  >
                    <div
                      @click="openMenu"
                      class="lang-view flex items-center cursor-pointer lang-outside"
                    >
                      <img :src="img.icon" alt="" class="lang-outside" />
                      <img
                        class="ml-4 lang-outside"
                        src="@/assets/icon/arrow-down.svg"
                        alt=""
                      />
                    </div>
                    <div
                      class="lang-content z-20 absolute bg-white shadow-md flex items-center justify-center py-4 top-12 rounded"
                    >
                      <ul>
                        <li v-for="(lang, idx) in localeContent" :key="idx">
                          <a
                            href="#!"
                            @click.prevent="switchLanguage(lang.locale)"
                            :class="[
                              { 'pt-2': idx == 0 },
                              { 'pb-2': idx == 2 },
                              { 'pb-1': idx !== 2 },
                              { 'pt-1': idx !== 0 },
                            ]"
                            class="px-3 inline-block hover:bg-blue-primary transition duration-300 w-full hover:text-white"
                          >
                            {{ lang.name }}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <form
              @submit.prevent="redirectSearchPage"
              class="search-box lg:flex hidden border border-gray-400 rounded-md overflow-hidden"
            >
              <input
                type="text"
                class="focus:outline-none p-1"
                v-model="search"
                :placeholder="`${t('search')}`"
              />
              <div class="search-icon flex items-center justify-center">
                <button type="submit" class="inline-block">
                  <img src="@/assets/icon/nav/search.svg" alt />
                </button>
              </div>
            </form>
            <button
              @click="toggleMobile"
              class="ml-5 transform active:scale:95 block xl:hidden"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="#2a2a2a"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-bottom bg-blue-primary py-1.5 xl:block hidden">
      <div class="container mx-auto flex items-center">
        <ul class="flex items-center w-full justify-between">
          <li v-for="(n, i) in categories" :key="i">
            <div class="relative inline-block text-left nav-link">
              <div>
                <a
                  href="#!"
                  @click.prevent="linkClick(i)"
                  type="button"
                  class="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:text-orange-primary"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  {{ n.name }}
                  <svg
                    v-if="n.slug !== 'biz-bilan-boglanish'"
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
                      class="text-gray-700 block px-4 py-2 text-sm transition-all duration-200 hover:text-orange-primary"
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
      </div>
    </div>
    <div
      class="mobile-sidebar xl:hidden block bg-white"
      :class="{ active: active_mobile }"
    >
      <div class="p-2">
        <div class="container mx-auto">
          <ul class="flex flex-col w-full justify-between mb-10">
            <li v-for="(n, i) in categories" :key="i">
              <div class="relative inline-block text-left nav-link w-full">
                <div>
                  <a
                    href="#!"
                    @click.prevent="linkClick(i)"
                    type="button"
                    class="inline-flex w-full justify-between border-gray-200 border-b px-4 py-2 text-sm font-medium text-gray-700"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                  >
                    {{ n.name }}
                    <svg
                      v-if="n.slug !== 'biz-bilan-boglanish'"
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
                <transition name="height">
                  <div
                    v-if="n.show"
                    class="ml-4 nav-link_menu mt-2 w-full bg-white focus:outline-none"
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
                        @click.prevent="redirectInner(m, i)"
                        :key="idx"
                        href="#"
                        class="text-gray-700 block px-4 py-2 text-sm border-b border-gray-200"
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
          <div
            class="flex lang justify-start items-center gap-3 mb-5 text-gray-500 bg-white shadow-md rounded-sm p-3 relative"
            :class="{ active: openLangMenu }"
          >
            <div
              @click="openMenu"
              class="lang-view flex items-center cursor-pointer w-full lang-outside"
            >
              <img :src="img.icon" alt="" class="lang-outside" />
              <span class="ml-4 text-black lang-outside">{{ img.title }}</span>
            </div>
            <div
              class="lang-content z-20 absolute bg-white shadow-md px-3 flex items-center justify-center py-4 w-full top-0 rounded"
            >
              <ul class="w-full">
                <li
                  :class="'w-full'"
                  v-for="(lang, idx) in localeContent"
                  :key="idx"
                  class="mb-2"
                >
                  <a
                    :class="'inline-block w-full px-2'"
                    href="/"
                    @click.prevent="switchLanguage(lang.locale)"
                  >
                    {{ lang.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-8">
            <div class="phone">
              <ul class="flex items-center flex-wrap">
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
            <div class="search">
              <router-link
                :to="{ name: 'Search' }"
                class="px-3 py-2 text-gray-700 bg-white rounded-sm shadow-md block"
              >
                <img src="@/assets/icon/nav/search.svg" alt />
              </router-link>
            </div>
            <div class="search relative">
              <button
                @click.stop="toggleChangeMenu"
                class="px-3 py-2 text-gray-700 bg-white rounded-sm shadow-md block"
              >
                <img src="@/assets/icon/nav/glasses.svg" alt />
              </button>
              <change-site
                top="top-0"
                @close="openChangeMenu = false"
                v-show="openChangeMenu"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    transition="opacity"
    :show="dialog"
    @close="toggleDialog"
    classContent="rounded-md"
    classHeader="text-white bg-blue-primary text-xl flex items-center justify-between px-4 py-3 rounded-t-md"
  >
    <template v-slot:header>
      <div class="w-full flex items-center justify-between mr-10">
        <div class="flex items-center">
          <div class="dialog-title flex items-center">
            <img src="@/assets/img/logo.png" alt />
            <p class="ml-1.5" v-html="t('text_error_message')"></p>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:body>
      <div class="py-8 px-10 grid grid-cols-2 gap-8 max-h-96 overflow-y-auto">
        <div class="col-span-2 gap-8">
          <h3 class="text-xl font-medium">{{ t("message_error") }}</h3>
          <div class="error-message bg-gray-100 mb-4 p-2 text-red-500 text-sm">
            <p>{{ getSelectionText() }}</p>
          </div>
          <div>
            <h3 class="text-xl font-medium mb-2">{{ t("error_text") }}</h3>
            <textarea
              name=""
              class="resize-none w-full border border-gray-500 rounded-lg p-4 focus:outline-none"
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </div>
        <div class="flex items-center justify-end col-span-2">
          <button
            class="bg-orange-primary py-2.5 px-9 text-white rounded-sm md:ml-2.5"
          >
            {{ t("send") }}
          </button>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
.mobile-sidebar.active {
  max-height: 12000px;
  height: 100vh;
  overflow: auto;
}

.mobile-sidebar {
  max-height: 0;
  overflow-y: hidden;
  transition: 0.5s;
  padding: 0;
}

.lang .lang-content {
  max-height: 0px;
  overflow-y: hidden;
  transition: 0.5s;
  padding: 0px;
}

.lang.active .lang-content {
  max-height: 200px;
}

a {
  font-size: 18px;
}
</style>
