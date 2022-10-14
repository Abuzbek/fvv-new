<script setup>
import { onMounted, ref, watch } from "@vue/runtime-core";
import Swiper from "swiper";
import http from "@/hooks/http";
import types from "@/hooks/globalTypes";
import img1 from "@/assets/img/home/user.svg";
import img2 from "@/assets/img/home/list.svg";
import img3 from "@/assets/img/home/check.svg";
import img4 from "@/assets/img/home/pen.svg";
import noPhoto from "@/assets/img/fvv.jpeg";
// import { useStore } from "vuex";
// import { useRouter } from "vue-router";
// import { useRoute } from "vue-router";
// const route = useRoute();
import { useI18n } from "vue-i18n";
import HomeMiniCard from "@/components/global-components/HomeMiniCard.vue";
import UsefullCard from "../components/global-components/UsefullCard.vue";
import LightGallery from "../components/global-components/LightGallery.vue";

// const store = useStore();
// const router = useRouter();
const i18n = useI18n();
const showPhoto = ref(false);
const showVideo = ref(false);
const soc_links = ref({});
const attachment = ref({
  src: "",
  idx: 0,
  title: "",
});
const { t } = useI18n();
//  ====== get Data ======
function changeEmbed(video) {
  let splity = video.split("/");
  splity = splity[splity.length - 1];
  return "https://www.youtube.com/embed/" + splity;
}
async function getData(type, id, options = { page: 1, page_size: 10 }) {
  return await http({
    url: `${i18n.locale.value}/api/${type}/byCategoryId/${id}`,
    params: {
      page: options.page || 1,
      page_size: options.page_size || 10,
    },
    method: "get",
  });
}
//  ====== get Data ======

//  ====== get by Slug ======

async function getSlug(slug) {
  return http.get(`${i18n.locale.value}/api/categories/${slug}/`);
}
//  ====== get by Slug ======

// =====  get Sections =====
async function getNews() {
  const res_news = await getSlug("yangiliklar");
  typeNews.value = types.find((n) => n.type === res_news.data.type);
  const newsResp = await getData(typeNews.value.value, res_news.data.id);
  if (newsResp.status === 200) {
    newsResp.data.results = newsResp.data.results.map((n) => {
      n.date = new Date(n.date).toLocaleDateString("ru-Ru", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      return { ...n };
    });
    lastNew.value = newsResp.data.results[0];
    lastNews.value = newsResp.data.results.slice(1, 4).map((item) => {
      const html = document.createElement("div");
      html.innerHTML = item.body;
      const body = html.innerText;
      item.body = body;
      return item
    });

  }
}

async function getService() {
  const res_service = await getSlug("interaktiv-xizmatlar");
  console.log(res_service.data.children);
  services.value = res_service.data.children
  console.log(services.value);
  // typeService.value = types.find((n) => n.type === res_service.data.type);
  // const serviceResp = await getData(typeService.value.value, res_service.data.id);
  // console.log(serviceResp);
}

async function getSlide() {
  const res = await getSlug("kafedralar");
  typeArticle.value = types.find((n) => n.type === res.data.type);
  const slideResp = await getData(typeArticle.value.value, res.data.id);
  // console.log(slideResp);
  if (slideResp.status === 200) {
    slides.value = slideResp.data.results;
    setTimeout(() => { loading.value = false; }, 100)
  }
}

async function getLibrary() {
  const res_lib = await http.get(`/${i18n.locale.value}/api/books/mainPage`);
  if (res_lib.status === 200) {
    library.value = res_lib.data.results.slice(0, 10);
  }
}

async function getVideos() {
  const res_videos = await http.get(
    `/${i18n.locale.value}/api/videos/mainPage/?page_size=3`
  );
  if (res_videos.status === 200) {
    videos.value = res_videos.data.results;
  }
}

async function getPhotos() {
  const res_photos = await http.get(
    `/${i18n.locale.value}/api/photos/mainPage/?page_size=4`
  );
  if (res_photos.status === 200) {
    photos.value = res_photos.data.results;
  }
}

async function getUsefull() {
  const resp = await http.get(`/${i18n.locale.value}/api/useful_links/`);
  if (resp.status === 200) {
    usefull.value = resp.data.results;
    setTimeout(() => {
      new Swiper(".swiper-usefull", {
        slidesPerView: 4,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          200: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        },
      });
    }, 1000);
  }
}

async function fetchData() {
  await getNews();
  await getSlide();
  await getLibrary();
  await getService();
  await getVideos();
  await getPhotos();
  await getUsefull();
  const stat = await http.get(`/${i18n.locale.value}/api/total_stats/`)
  statistics.value = statistics.value.map(n => {
    Object.keys(stat.data).forEach(key => {
      console.log(key, n);
      if (n.value === key) {
        n.count = stat.data[key]
      }
    })
    return n
  })
  new Swiper(".swiper-articles", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-articles-next",
      prevEl: ".swiper-articles-prev",
    },
    breakpoints: {
      200: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      500: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}
function nextPhoto(idx) {
  attachment.value = {
    src: photos.value[idx].photo,
    idx: idx,
    title: photos.value[idx].title,
  };
}
function prevPhoto(idx) {
  attachment.value = {
    src: photos.value[idx].photo,
    idx: idx,
    title: photos.value[idx].title,
  };
}
function hidePhoto() {
  showPhoto.value = false;
}
function nextVideo(idx) {
  attachment.value = {
    src: videos.value[idx].video,
    idx: idx,
    title: videos.value[idx].title,
  };
}
function prevVideo(idx) {
  attachment.value = {
    src: videos.value[idx].video,
    idx: idx,
    title: videos.value[idx].title,
  };
}
function hideVideo() {
  showVideo.value = false;
}
function clickVideo(id) {
  videos.value.find((n, i) => {
    console.log(n);
    if (n.id == id) {
      attachment.value = {
        src: changeEmbed(videos.value[i].video_path),
        idx: i,
        title: videos.value[i].title,
      };
    }
  });
  showVideo.value = true;
}
function clickPhoto(id) {
  photos.value.find((n, i) => {
    if (n.id == id) {
      console.log(photos.value[i]);
      attachment.value = {
        src: photos.value[i].photo,
        idx: i,
        title: photos.value[i].title,
      };
    }
  });
  showPhoto.value = true;
}
// =====  get Sections =====
onMounted(async () => {
  await fetchData();
  const socLinks = await http.get(`/api/social_links/`);
  soc_links.value = socLinks.data;
  // console.clear();
  localStorage.setItem("title", t("title"));
  document.querySelector("title").innerText = localStorage.getItem("title");
});
watch(
  () => i18n.locale.value,
  async () => {
    statistics.value = [
      {
        count: "",
        title: t("departament"),
        img: img1,
        color: "#F23E2C",
        value: 'department'
      },
      {
        count: "",
        title: t("directions"),
        img: img2,
        color: "#2C6AF2",
        value: 'area'
      },
      {
        count: "",
        title: t("teachers"),
        img: img3,
        color: "#26AB5B",
        value: 'teacher'
      },
      {
        count: "",
        title: t("students"),
        img: img4,
        color: "#F5FFEF",
        value: 'master'
      },
    ];
    await fetchData();
    // console.clear();
    localStorage.setItem("title", t("title"));
    document.querySelector("title").innerText = localStorage.getItem("title");
  }
);
// ==== canfedres type state ====
const typeArticle = ref(null);
// ==== canfedres type state ====

// ==== news type state ====
const typeNews = ref(null);
const services = ref(null);
// ==== news type state ====

// ==== canfedres  state ====
const slides = ref([]);
// ==== canfedres  state ====
const lastNew = ref(null);
const lastNews = ref([]);
const library = ref([]);
const statistics = ref([
  {
    count: "",
    title: t("departament"),
    img: img1,
    color: "#F23E2C",
    value: 'department'
  },
  {
    count: "",
    title: t("directions"),
    img: img2,
    color: "#2C6AF2",
    value: 'area'
  },
  {
    count: "",
    title: t("teachers"),
    img: img3,
    color: "#26AB5B",
    value: 'teacher'
  },
  {
    count: "",
    title: t("students"),
    img: img4,
    color: "#F5FFEF",
    value: 'master'
  },
]);
const loading = ref(true);
const videos = ref([]);
const photos = ref([]);
const usefull = ref([]);
</script>

<template>
  <div class="home">
    <header>
      <div class="container mx-auto px-4">
        <div class="header-title max-w-2xl text-white md:text-left text-center pt-28 pb-52">
          <h1 class="md:text-3xl text-2xl">
            {{ t("header_title") }}
          </h1>
        </div>
      </div>
    </header>
    <div class="fixed top-0 left-0 z-50 bg-gray-800 bg-opacity-75 w-full h-full flex items-center justify-center"
      v-if="loading">
      <img src="@/assets/img/animation_500_kyicu3ga.gif" alt="" />
    </div>
    <div class="slider-kafedres transform lg:-translate-y-1/4 lg:mb-0 mb-8">
      <div class="container mx-auto" :style="loading ? 'opacity: 0 !important; position:fixed; top-0' : ''">
        <div class="swiper-container swiper-articles md:px-10 px-20">
          <div class="swiper-wrapper items-stretch">
            <router-link to="/kafedralar" class="swiper-slide block" v-for="(n, i) in slides" :key="i"
              style="height: auto">
              <HomeMiniCard v-bind="n" />
            </router-link>
          </div>
          <div class="swiper-button-next swiper-articles-next">
            <img src="@/assets/icon/next.svg" alt="" />
          </div>
          <div class="swiper-button-prev swiper-articles-prev">
            <img src="@/assets/icon/prev.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto pb-10 px-4" v-if="lastNew">
      <div class="last-news bg-white p-5 rounded-md">
        <router-link
          class="text-3xl text-gray-900 inline-block mb-4 font-semibold transition duration-200 hover:text-blue-primary hover:opacity-75"
          :to="'/yangiliklar'">{{ t("last_news") }}</router-link>
        <div class="grid lg:grid-cols-12 grid-cols-1 gap-30">
          <div class="col-span-7">
            <div class="last-news-img mb-4" v-if="lastNew">
              <img :src="lastNew.thumbnail" class="rounded-md w-full" alt="" v-if="lastNew" />
            </div>
            <div class="last-news-date mb-1 text-gray-500" v-if="lastNew">
              {{ lastNew.date }}
            </div>
            <div v-if="lastNew" class="last-news-title">
              <router-link :to="`/yangiliklar/articles/${lastNew.slug}`" class="text-xl text-gray-900">
                {{ lastNew.title }}
              </router-link>
            </div>
          </div>
          <div class="col-span-5">
            <ul>
              <li class="border-b mb-4 pb-4" v-for="(n, i) in lastNews" :key="i">
                <router-link :to="`/yangiliklar/articles/${n.slug}`" class="inline-block cursor-pointer">
                  <span class="last-news-date text-gray-500">
                    {{ n.date }}
                  </span>

                  <div class="last-news-title">
                    <span class="text-xl text-gray-900">
                      {{ n.title }}
                    </span>
                    <p class="slice-text text-gray-500">{{ n.body }}</p>
                  </div>
                </router-link>
              </li>
            </ul>
            <div class="text-center">
              <router-link :to="'/yangiliklar'"
                class="text-orange-primary border-b text-lg border-orange-primary pb-0.5">
                {{ t("all_news") }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4 pb-10" v-if="library.length">
      <div class="books p-5 bg-white rounded-lg">
        <router-link to="/oquv-qollanmalar"
          class="text-3xl inline-block text-gray-900 mb-4 font-semibold transition duration-200 hover:text-blue-primary hover:opacity-75">
          {{ t("electronic_library") }}
        </router-link>
        <div class="grid lg:grid-cols-2 gap-x-5 gap-y-2">
          <div class="book-card py-2 px-4 rounded-lg flex items-center lg:border-none border border-gray-300"
            v-for="(n, i) in library" :key="i" :class="[
              {
                'lg:bg-gray-200':
                  i == 0 || i == 1 || i == 4 || i == 5 || i == 8 || i == 9,
              },
            ]" :id="i">
            <img :src="n.image" class="w-11 h-12" alt="" />
            <a class="ml-2.5 text-lg border-b border-transparent hover:border-gray-900 text-gray-900" :href="n.file"
              target="_blank">
              {{ n.title }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <section class="bg-blue-primary pt-5 pb-7">
      <div class="container mx-auto">
        <h2 class="text-center mb-8 text-white text-3xl font-semibold transition duration-200">
          {{ t("general_statistics") }}
        </h2>
        <div class="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
          <div class="flex flex-col items-center" v-for="(n, i) in statistics" :key="i">
            <img :src="n.img" alt="" />
            <h3 class="text-5xl font-bold mb-5 mt-3" :style="`color:${n.color};`">
              {{ n.count }}
            </h3>
            <p class="text-white">{{ n.title }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-24 pb-28">
      <div class="container mx-auto px-4">
        <h4 class="text-center mb-8 text-5xl font-semibold">
          {{ t("interactive_services") }}
        </h4>
        <ul class="services-list">
          <li class="services-item" v-for="(n, i) in services" :key="i">
            <router-link :to="`${n.link ? n.link : `/${n.slug}`}`" class="services-link">
              <img src="@/assets/img/ser.svg" alt="services" class="services-img" />
              <p class="services-text">{{ n.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </section>
    <div class="container mx-auto px-4 pb-10">
      <section class="photo-video bg-white p-5 rounded-lg mb-5">
        <router-link to="/video-fayllar"
          class="inline-block text-3xl text-gray-900 mb-4 font-semibold transition duration-200 hover:text-blue-primary hover:opacity-75">
          {{ t("video_clips") }}
        </router-link>
        <div class="videos grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
          <div class="card-video relative rounded-lg cursor-pointer" v-for="(n, i) in videos"
            @click.prevent="clickVideo(n.id)" :key="i">
            <img :src="n.photo || noPhoto" alt="" class="max-w-full w-full rounded-lg h-full object-cover" />
            <div
              class="overlay-video-photo pb-5 pl-5 pr-5 absolute rounded-lg top-0 left-0 w-full h-full flex flex-col justify-between">
              <div></div>
              <p class="text-white text-2xl slice-text-2 sm:block hidden">
                {{ n.title }}
              </p>
            </div>
            <a class="play-btn block cursor-pointer absolute">
              <img src="@/assets/img/home/play.svg" alt="" />
            </a>
          </div>
        </div>
      </section>
      <section class="photo-video bg-white p-5 rounded-lg">
        <router-link to="/foto-fayllar"
          class="inline-block text-3xl text-gray-900 mb-4 font-semibold transition duration-200 hover:text-blue-primary hover:opacity-75">
          {{ t("photo_clips") }}
        </router-link>
        <div class="photos grid lg:grid-cols-4 sm:grid-cols-2 gap-5">
          <a href="#!" @click.prevent class="card-video relative rounded-lg block" v-for="(n, i) in photos" :key="i"
            @click="clickPhoto(n.id)">
            <img :src="n.photo" alt="" class="max-w-full w-full rounded-lg h-full object-cover" />
            <div
              class="overlay-video-photo pb-5 pl-5 pr-5 absolute rounded-lg top-0 left-0 w-full h-full flex flex-col justify-between">
            </div>
          </a>
        </div>
      </section>
    </div>
    <div class="container mx-auto px-4 pb-10">
      <section class="sunscribe bg-white p-5 pb-11 rounded-lg">
        <h3
          class="text-3xl text-gray-900 mb-4 font-semibold transition duration-200 hover:text-blue-primary hover:opacity-75">
          {{ t("subscribe_to_news") }}
        </h3>
        <div class="grid xl:grid-cols-2 gap-8">
          <div class="flex items-end md:flex-nowrap flex-wrap mb-4 mt-6">
            <input class="w-full pb-1 pt-3.5 border-0 border-gray-700 border-b focus:outline-none md:mb-0 mb-4"
              type="text" :placeholder="t('enter_your_email')" />
            <button class="bg-orange-primary py-2.5 px-9 text-white rounded-sm md:ml-2.5">
              {{ t("send") }}
            </button>
          </div>
          <div class="grid xl:grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 gap-9 xl:pl-32">
            <a target="_blank" :href="soc_links.telegram_url"
              class="flex items-center gap-2.5 bg-tg-primary text-white py-3 px-9 rounded-md">
              <img src="../assets/img/home/tg.svg" alt="" />
              <span>Telegram</span>
            </a>
            <a target="_blank" :href="soc_links?.instagram_url"
              class="flex items-center gap-2.5 bg-insta-primary text-white py-3 px-9 rounded-md">
              <img src="../assets/img/home/inst.svg" alt="" />
              <span>Instagram</span>
            </a>
            <a target="_blank" :href="soc_links.facebook_url"
              class="flex items-center gap-2.5 text-white py-3 px-9 bg-fb-primary rounded-md">
              <img src="../assets/img/home/fb.svg" alt="" />
              <span>Facebook</span>
            </a>
            <a target="_blank" :href="soc_links.youtube_url"
              class="flex items-center gap-2.5 text-white py-3 px-9 bg-yt-primary rounded-md">
              <img src="../assets/img/home/youtube.svg" alt="" />
              <span>Youtube</span>
            </a>
          </div>
        </div>
      </section>
    </div>
    <section class="usefull_link bg-thin-yellow-primary pt-6 pb-10 mb-28">
      <div class="container mx-auto px-4">
        <h3
          class="text-3xl text-gray-900 mb-4 ml-20 font-semibold transition duration-200 hover:text-blue-primary hover:opacity-75">
          {{ t("useful_links") }}
        </h3>
        <div class="swiper-container swiper-usefull sm:px-20 px-10">
          <div class="swiper-wrapper">
            <div class="swiper-slide h-full" v-for="(n, i) in usefull" :key="i">
              <UsefullCard v-bind="n" />
            </div>
          </div>
          <div class="swiper-button-next swiper-articles-next">
            <img src="@/assets/icon/next.svg" alt="" />
          </div>
          <div class="swiper-button-prev swiper-articles-prev">
            <img src="@/assets/icon/prev.svg" alt="" />
          </div>
        </div>
      </div>
    </section>
    <LightGallery :show="showPhoto" @removeLight="hidePhoto" :gallerySize="photos.length - 1"
      :currentGallery="attachment.idx" @next="nextPhoto" @prev="prevPhoto">
      <template v-slot:img>
        <transition name="transformX">
          <img :src="attachment.src" alt="" class="max-w-6xl w-full object-cover" />
        </transition>
      </template>
    </LightGallery>
    <LightGallery :show="showVideo" @removeLight="hideVideo" :gallerySize="videos.length - 1"
      :currentGallery="attachment.idx" @next="nextVideo" @prev="prevVideo">
      <template v-slot:img>
        <transition name="transformX">
          <!-- <video v-if="attachment.src" :src="attachment.src" class="max-w-2xl w-full object-cover pointer-events-auto"
            controls></video> -->
          <iframe v-if="attachment.src" :src="attachment.src" height="800"
            class="max-w-7xl w-full object-cover pointer-events-auto" frameborder="0" title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </transition>
      </template>
    </LightGallery>
  </div>
</template>

<style scoped>
header {
  background: url("../assets/img/index_header_bg.jpg") no-repeat center center / cover;
}
</style>

<style>
.home .swiper-button-next::after,
.home .swiper-button-prev::after {
  display: none;
}

.home .swiper-button-next,
.home .swiper-button-prev {
  background: #fff;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-button-disabled {
  display: none !important;
}

.slice-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.slice-text-2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.px-20 {
  padding-left: 80px !important;
  padding-right: 80px !important;
}

.services-headline {
  padding-bottom: 60px;
  text-align: center;
  font-weight: 500;
  font-size: 24px;
  line-height: 140%;
  color: #333;
}

.services-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style-type: none;
  justify-content: space-around;
  margin: 0;
  padding: 0;
}

.services-item {
  width: 33.3%;
  padding: 0 20px;
}

.services-link {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #08457e;
  border-radius: 18px;
  color: #fff;
  padding: 110px 0px;
  transition: all ease 0.1s;
}

.services-link:hover {
  color: #fff;
}


.services-link:hover {
  background: #f2994a;
}

.services-img {
  padding-bottom: 43px;
}

.services-text {
  font-weight: bold;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
}

.overlay-video-photo {
  background: linear-gradient(180deg,
      rgba(50, 50, 50, 0) 44.79%,
      rgba(3, 3, 3, 0.63) 88.02%);
}

.play-btn {
  position: absolute;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
}

.play-btn:active {
  transform: translate(-50%, -50%) scale(0.95);
}

@media (max-width: 1279px) {
  .services-link {
    background: #08457e;
    margin-bottom: 30px;
  }

  .services-link:hover {
    background: #f2994a;
  }
}

@media (max-width: 1023px) {
  .services-item {
    width: 50%;
    padding: 0 20px;
  }
}

@media (max-width: 767px) {
  .services-item {
    width: 100%;
    padding: 0 20px;
  }

  .home .swiper-button-next,
  .home .swiper-button-prev {
    background: rgba(255, 211, 172, 0.7);
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
