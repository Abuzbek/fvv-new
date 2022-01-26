<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import Swiper from "swiper";
import http from "@/hooks/http";
import types from "@/hooks/globalTypes";
import img1 from "@/assets/img/home/user.svg";
import img2 from "@/assets/img/home/list.svg";
import img3 from "@/assets/img/home/check.svg";
import img4 from "@/assets/img/home/pen.svg";
import herb from "../assets/img/home/herb.png";
// import { useStore } from "vuex";
// import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import HomeMiniCard from "@/components/global-components/HomeMiniCard.vue";
import UsefullCard from "../components/global-components/UsefullCard.vue";
// const store = useStore();
// const router = useRouter();
const i18n = useI18n();
//  ====== get Data ======
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
    lastNews.value = newsResp.data.results.slice(1, 4);
  }
}
async function getSlide() {
  const res = await getSlug("kafedralar");
  typeArticle.value = types.find((n) => n.type === res.data.type);
  const slideResp = await getData(typeArticle.value.value, res.data.id);
  if (slideResp.status === 200) {
    slides.value = slideResp.data.results;
    setTimeout(() => {
      new Swiper(".swiper-articles", {
        slidesPerView: 5,
        spaceBetween: 30,
        freeMode: true,
        navigation: {
          nextEl: ".swiper-articles-next",
          prevEl: ".swiper-articles-prev",
        },
      });
      loading.value = false;
    }, 1000);
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
    `/${i18n.locale.value}/api/videos/mainPage`
  );
  if (res_videos.status === 200) {
    videos.value = res_videos.data.results;
    console.log(videos.value);
  }
}
async function getPhotos() {
  const res_photos = await http.get(
    `/${i18n.locale.value}/api/photos/mainPage`
  );
  if (res_photos.status === 200) {
    photos.value = res_photos.data.results;
    console.log(photos.value);
  }
}
async function getUsefull() {
  // const res_usefull = await http.get(`/${i18n.locale.value}/api/usefull/mainPage`);
  // if (res_usefull.status === 200) {
  //   usefull.value = res_usefull.data.results;
  //   console.log(usefull.value);
  // }
  new Swiper(".swiper-usefull", {
    slidesPerView: 4,
    spaceBetween: 30,
    freeMode: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
// =====  get Sections =====
onMounted(async () => {
  // ===== news =====
  await getNews();
  // ===== news =====
  // ===== slide =====
  await getSlide();
  // ===== slide =====
  // ===== library =====
  await getLibrary();
  // ===== library =====
  // ===== videos =====
  await getVideos();
  // ===== videos =====
  // ===== photos =====
  await getPhotos();
  // ===== photos =====
  await getUsefull();
});

// ==== canfedres type state ====
const typeArticle = ref(null);
// ==== canfedres type state ====

// ==== news type state ====
const typeNews = ref(null);
// ==== news type state ====

// ==== canfedres  state ====
const slides = ref([]);
// ==== canfedres  state ====
const lastNew = ref(null);
const lastNews = ref([]);
const library = ref([]);
const statistics = ref([
  {
    count: "10 000",
    title: "Kafedralar",
    img: img1,
    color: "#F23E2C",
  },
  {
    count: "57 841",
    title: "Yo‘nalishlar",
    img: img2,
    color: "#2C6AF2",
  },
  {
    count: "500",
    title: "O'qituvchilar",
    img: img3,
    color: "#26AB5B",
  },
  {
    count: "1 000",
    title: "O'qituvchilar",
    img: img4,
    color: "#C1C1C1",
  },
]);
const loading = ref(true);
const videos = ref([]);
const photos = ref([]);
const usefull = ref([
  {
    title: "O'zbekiston Respublikasi Prezidentining rasmiy veb-sayti",
    thumbnail: herb,
  },
  {
    title: "O'zbekiston Respublikasi Prezidentining rasmiy veb-sayti",
    thumbnail: herb,
  },
  {
    title: "O'zbekiston Respublikasi Prezidentining rasmiy veb-sayti",
    thumbnail: herb,
  },
  {
    title: "O'zbekiston Respublikasi Prezidentining rasmiy veb-sayti",
    thumbnail: herb,
  },
  {
    title: "O'zbekiston Respublikasi Prezidentining rasmiy veb-sayti",
    thumbnail: herb,
  },
  {
    title: "O'zbekiston Respublikasi Prezidentining rasmiy veb-sayti",
    thumbnail: herb,
  },
]);
</script>

<template>
  <div class="home">
    <header>
      <div class="container mx-auto px-4">
        <div class="header-title max-w-2xl text-white text-3xl pt-28 pb-52">
          <h1>
            "Ilm o‘tda yonmaydigan, suvda cho‘kmaydigan, hech kim sizdan tortib
            ololmaydigan boylik ekanini aslo unutmang!"
          </h1>
        </div>
      </div>
    </header>
    <div
      class="fixed top-0 left-0 z-50 bg-gray-800 bg-opacity-75 w-full h-full flex items-center justify-center"
      v-if="loading"
    >
      <img src="@/assets/img/animation_500_kyicu3ga.gif" alt="" />
    </div>
    <div class="slider-kafedres transform -translate-y-1/3">
      <div
        class="container mx-auto"
        :style="loading ? 'opacity: 0 !important; position:fixed; top-0' : ''"
      >
        <div class="swiper-container swiper-articles px-20">
          <div class="swiper-wrapper items-stretch">
            <div
              class="swiper-slide"
              v-for="(n, i) in slides"
              :key="i"
              style="height: auto"
            >
              <HomeMiniCard v-bind="n" />
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
    </div>
    <div class="container mx-auto pb-10 px-4">
      <div class="last-news bg-white p-5 rounded-md">
        <h3 class="text-2xl text-gray-900 mb-4">So‘ngi yangiliklar</h3>
        <div class="grid grid-cols-12 gap-30">
          <div class="col-span-7">
            <div class="last-news-img mb-4" v-if="lastNew">
              <img
                :src="lastNew.thumbnail"
                class="rounded-md w-full"
                alt=""
                v-if="lastNew"
              />
            </div>
            <div class="last-news-date mb-1 text-gray-500" v-if="lastNew">
              {{ lastNew.date }}
            </div>
            <div v-if="lastNew" class="last-news-title">
              <a :href="`/news/${lastNew.slug}`" class="text-xl text-gray-900">
                {{ lastNew.title }}
              </a>
            </div>
          </div>
          <div class="col-span-5">
            <ul>
              <li
                class="border-b mb-4 pb-4"
                v-for="(n, i) in lastNews"
                :key="i"
              >
                <div class="last-news-date text-gray-500">
                  {{ n.date }}
                </div>
                <div class="last-news-title">
                  <a :href="`/news/${n.slug}`" class="text-xl text-gray-900">
                    {{ n.title }}
                  </a>
                  <p class="slice-text text-gray-500">{{ n.body }}</p>
                </div>
              </li>
            </ul>
            <div class="text-center">
              <router-link
                :to="'/'"
                class="text-orange-primary border-b text-lg border-orange-primary pb-0.5"
                >Barcha yangiliklar</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4 pb-10">
      <div class="books p-5 bg-white rounded-lg">
        <h3 class="text-2xl text-gray-900 mb-4">Elektron kutubxona</h3>
        <div class="grid grid-cols-2 gap-x-5 gap-y-2">
          <div
            class="book-card py-2 px-4 rounded-lg flex items-center"
            v-for="(n, i) in library"
            :key="i"
            :class="{
              'bg-gray-200':
                i == 0 || i == 1 || i == 4 || i == 5 || i == 8 || i == 9,
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
    <section class="bg-blue-primary pt-5 pb-7">
      <div class="container mx-auto">
        <h2 class="text-center mb-8 text-white text-2xl">Ummumiy statistika</h2>
        <div class="grid grid-cols-4 gap-8">
          <div
            class="flex flex-col items-center"
            v-for="(n, i) in statistics"
            :key="i"
          >
            <img :src="n.img" alt="" />
            <h3
              class="text-5xl font-bold mb-5 mt-3"
              :style="`color:${n.color};`"
            >
              {{ n.count }}
            </h3>
            <p class="text-white">{{ n.title }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-24 pb-28">
      <div class="container mx-auto px-4">
        <h4 class="text-center mb-8 text-2xl">Interaktiv xizmatlar</h4>
        <ul class="services-list">
          <li class="services-item">
            <nuxt-link to="/rahbariyatga-murojaat" class="services-link">
              <img
                src="@/assets/img/ser.svg"
                alt="services"
                class="services-img"
              />
              <p class="services-text">
                Onlayn - <br />
                qabulxona
              </p>
            </nuxt-link>
          </li>
          <li class="services-item">
            <nuxt-link to="/rahbariyatga-murojaat" class="services-link">
              <img
                src="@/assets/img/ser2.svg"
                alt="services"
                class="services-img"
              />
              <p class="services-text">
                O‘qish uchun <br />
                to‘lovlar
              </p>
            </nuxt-link>
          </li>
          <li class="services-item">
            <nuxt-link to="/rahbariyatga-murojaat" class="services-link">
              <img
                src="@/assets/img/ser3.svg"
                alt="services"
                class="services-img"
              />
              <p class="services-text">
                Rahbariyatga <br />
                murojaat
              </p>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </section>
    <div class="container mx-auto px-4 pb-10">
      <section class="photo-video bg-white p-5 rounded-lg">
        <h3 class="text-2xl text-gray-900 mb-4">Foto va video lavhalar</h3>
        <div class="videos grid grid-cols-2 gap-5 mb-5">
          <div
            class="card-video relative rounded-lg"
            v-for="(n, i) in videos"
            :key="i"
          >
            <img
              :src="n.photo"
              alt=""
              class="max-w-full w-full rounded-lg h-full object-cover"
            />
            <div
              class="overlay-video-photo pb-5 pl-5 pr-5 absolute rounded-lg top-0 left-0 w-full h-full flex flex-col justify-between"
            >
              <div></div>
              <p class="text-white text-2xl slice-text-2">{{ n.title }}</p>
            </div>
            <a class="play-btn block cursor-pointer absolute">
              <img src="@/assets/img/home/play.svg" alt="" />
            </a>
          </div>
        </div>
        <div class="photos grid grid-cols-4 gap-5">
          <a
            href="#!"
            @click.prevent
            class="card-video relative rounded-lg block"
            v-for="(n, i) in photos"
            :key="i"
          >
            <img
              :src="n.photo"
              alt=""
              class="max-w-full w-full rounded-lg h-full object-cover"
            />
            <div
              class="overlay-video-photo pb-5 pl-5 pr-5 absolute rounded-lg top-0 left-0 w-full h-full flex flex-col justify-between"
            ></div>
          </a>
        </div>
      </section>
    </div>
    <div class="container mx-auto px-4 pb-10">
      <section class="sunscribe bg-white p-5 pb-11 rounded-lg">
        <h3 class="text-2xl text-gray-900 mb-4">Yangiliklarga a`zo bo‘lish</h3>
        <div class="grid grid-cols-2 gap-8">
          <div class="flex items-end mb-4 mt-6">
            <input
              class="w-full pb-1 pt-3.5 border-0 border-gray-700 border-b focus:outline-none"
              type="text"
              placeholder="E-mail kiriting..."
            />
            <button
              class="bg-orange-primary py-2.5 px-9 text-white rounded-sm ml-2.5"
            >
              Yuborish
            </button>
          </div>
          <div class="grid grid-cols-2 gap-9 pl-32">
            <a
              href="#!"
              class="flex items-center gap-2.5 bg-tg-primary text-white py-3 px-9 rounded-md"
            >
              <img src="../assets/img/home/tg.svg" alt="" />
              <span>Telegram</span>
            </a>
            <a
              href="#!"
              class="flex items-center gap-2.5 bg-insta-primary text-white py-3 px-9 rounded-md"
            >
              <img src="../assets/img/home/inst.svg" alt="" />
              <span>Instagram</span>
            </a>
            <a
              href="#!"
              class="flex items-center gap-2.5 text-white py-3 px-9 bg-fb-primary rounded-md"
            >
              <img src="../assets/img/home/fb.svg" alt="" />
              <span>Facebook</span>
            </a>
            <a
              href="#!"
              class="flex items-center gap-2.5 text-white py-3 px-9 bg-yt-primary rounded-md"
            >
              <img src="../assets/img/home/youtube.svg" alt="" />
              <span>Youtube</span>
            </a>
          </div>
        </div>
      </section>
    </div>
    <section class="usefull_link bg-thin-yellow-primary pt-6 pb-10 mb-28">
      <div class="container mx-auto px-4">
        <h3 class="text-2xl text-gray-900 mb-4 ml-20">Foydali havolalar</h3>
        <div class="swiper-container swiper-usefull px-20">
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
  </div>
</template>

<style scoped>
header {
  background: url("../assets/img/index_header_bg.jpg") no-repeat center center /
    cover;
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
.services-link {
  background: url("../assets/img/romb.svg") no-repeat center center / contain;
}
.services-link:hover {
  background: url("../assets/img/romb-ornage.svg") no-repeat center center /
    contain;
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
  background: linear-gradient(
    180deg,
    rgba(50, 50, 50, 0) 44.79%,
    rgba(3, 3, 3, 0.63) 88.02%
  );
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
</style>
