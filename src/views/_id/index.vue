<script setup>
import { onMounted, ref, watch } from "@vue/runtime-core";
import Paginate from "vuejs-paginate/src/components/Paginate.vue";
import globalTypes from "@/hooks/globalTypes";
import http from "@/hooks/http";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import Header from "../../components/global-components/Header.vue";
import CardYellowGrid from "../../components/global-components/CardYellowGrid.vue";
import CardFull from "../../components/global-components/CardFull.vue";
import ArticlesList from "../../components/global-components/ArticlesList.vue";
import CardLidership from "../../components/global-components/CardLidership.vue";
import BookCard from "../../components/global-components/BookCard.vue";
import ScheduleCard from "../../components/global-components/ScheduleCard.vue";
import BaseCard from "../../components/global-components/BaseCard.vue";
import ZigZagCard from "../../components/global-components/ZigZagCard.vue";
import VideoCard from "../../components/global-components/VideoCard.vue";
import LightGallery from "../../components/global-components/LightGallery.vue";
import LessonModal from "../../components/global-components/LessonModal.vue";
const route = useRoute();
// const router = useRouter();
const i18n = useI18n();
const perPageGrid = ref(9);
const perPage = ref(2);
const type = ref("");
const data = ref([]);
const dataResults = ref([]);
const category = ref(null);
const isCalendar = ref(false);
const isGroup = ref(false);
const isSchema = ref(false);
const groups = ref([
  {
    title: "1-Kurs",
    value: "YEAR_1",
  },
  {
    title: "2-Kurs",
    value: "YEAR_2",
  },
  {
    title: "3-Kurs",
    value: "YEAR_3",
  },
  {
    title: "4-Kurs",
    value: "YEAR_4",
  },
]);
const schema = ref([
  { title: "Ertalabki", value: "DAY" },
  { title: "Kechki", value: "NIGHT" },
]);
const filter = ref({
  p: 1,
  date: "",
  course_level: "",
  shift: "",
  group: "",
});
const dateTitle = ref("");
const schemaTitle = ref("");
const groupTitle = ref("");
const typeId = ref("");
const showLight = ref(false);
const attachment = ref({
  src: "",
  idx: 0,
  title: "",
});
const lesson = ref(null);
const groupValue = ref("");
const schedule = ref(null);
const isPaginate = ref(null);
class Methods {
  async byCategoryId(type, id, filter) {
    const typeOF = globalTypes.find((n) => {
      if (type === n.type) {
        return true;
      }
    });
    typeId.value = typeOF.value;
    let url =
      typeOF.value == "e_library"
        ? `/${i18n.locale.value}/api/books/parents/`
        : typeOF.value == "schedule"
        ? `/${i18n.locale.value}/api/schedules/`
        : `/${i18n.locale.value}/api/${typeOF.value}/byCategoryId/${id}`;
    const resp = await http({
      method: "GET",
      url: url,
      params: {
        ...filter,
        page_size:
          typeOF.type == "schedule"
            ? 18
            : typeOF.structure
            ? perPage.value
            : perPageGrid.value,
      },
    });
    return { response: resp, type };
  }
  async getContent(value) {
    try {
      if (value == "schedule") {
        const getId = await http.get(
          `/${i18n.locale.value}/api/categories/${route.params.id}`
        );
        category.value = getId.data;
        const resp = await byCategoryId("schedule", "", filter.value);
        type.value = resp.type;
        data.value = resp.response.data;
        dataResults.value =
          getId.data.type == "e_library"
            ? resp.response.data
            : resp.response.data.results.map((n) => {
                n.data = n.date = new Date(n.date).toLocaleDateString("ru-Ru", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                });
                return { ...n };
              });
      } else {
        const getId = await http.get(
          `/${i18n.locale.value}/api/categories/${route.params.id}`
        );
        category.value = getId.data;
        const resp = await byCategoryId(
          getId.data.type,
          getId.data.id,
          filter.value
        );
        type.value = resp.type;
        data.value = resp.response.data;
        dataResults.value =
          getId.data.type == "e_library"
            ? resp.response.data
            : resp.response.data.results.map((n) => {
                n.data = n.date = new Date(n.date).toLocaleDateString("ru-Ru", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                });
                return { ...n };
              });
      }
    } catch (error) {
      console.log(error);
    }
  }
  closePopup() {
    if (isCalendar.value) {
      isCalendar.value = false;
    } else if (isGroup.value) {
      isGroup.value = false;
    } else if (lesson.value) {
      lesson.value = null;
    } else if (isSchema.value) {
      isSchema.value = false;
    }
  }
  async clickGroup(value) {
    filter.value.course_level = groups.value.find(
      (n) => n.value === value
    ).value;
    filter.value.p = 1;
    groupTitle.value = filter.value.course_level.title;
    isGroup.value = false;
    await getContent("schedule");
  }
  async clickSchema(value) {
    filter.value.shift = schema.value.find((n) => n.value === value).value;
    console.log(filter.value.shift);
    filter.value.p = 1;
    schemaTitle.value = filter.value.shift.title;
    isSchema.value = false;
    await getContent("schedule");
  }
  async searchGroup(e) {
    filter.value.group = e;
    filter.value.p = 1;
    await getContent("schedule");
  }
  clickVideo(id) {
    dataResults.value.find((n, i) => {
      if (n.id == id) {
        if (dataResults.value[i].video_path.includes("yout")) {
          let splity = dataResults.value[i].video_path.split("/");
          splity = splity[splity.length - 1];
          attachment.value = {
            src: splity,
            idx: i,
            title: dataResults.value[i].title,
          };
        } else {
          attachment.value = {
            src: dataResults.value[i].video_path,
            idx: i,
            title: dataResults.value[i].title,
          };
        }
      }
    });
    showLight.value = true;
  }
  hideLight() {
    showLight.value = false;
  }
  nextGallery(idx) {
    let splity = dataResults.value[idx].video_path.split("/");
    splity = splity[splity.length - 1];
    attachment.value = {
      src: splity,
      idx: idx,
      title: dataResults.value[idx].title,
    };
  }
  prevGallery(idx) {
    let splity = dataResults.value[idx].video_path.split("/");
    splity = splity[splity.length - 1];
    attachment.value = {
      src: splity,
      idx: idx,
      title: dataResults.value[idx].title,
    };
  }
  async getLessons(id) {
    const lessons = await http.get(
      `/${i18n.locale.value}/api/lessons/byScheduleId/${id}`
    );
    schedule.value = await http.get(
      `/${i18n.locale.value}/api/schedules/${id}/`
    );
    schedule.value = schedule.value.data;
    lesson.value = lessons.data;
  }
  async pagination(i) {
    filter.value.p = i;
    if (type.value == "schedule") {
      await getContent("schedule");
    } else {
      await getContent();
    }
  }
}
const {
  pagination,
  getLessons,
  clickVideo,
  byCategoryId,
  getContent,
  closePopup,
  clickGroup,
  clickSchema,
  searchGroup,
  hideLight,
  nextGallery,
  prevGallery,
} = new Methods();
onMounted(async () => {
  await getContent();
});
watch(
  () => route.params,
  async (val) => {
    if (!val.bookId && val.id) {
      await getContent();
    }
  }
);
watch(
  () => filter.value.date,
  async (value) => {
    dateTitle.value = new Date(value).toLocaleDateString("ru-Ru", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    filter.value.p = 1;
    await getContent("schedule");
  }
);
watch(
  () => groupValue.value,
  async (value) => {
    value = String(value)
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1");
    if (value) {
      await searchGroup(value);
    }
  }
);
watch(
  () => type.value,
  (val) => {
    if (val) {
      let isPag =
        val == "schedule"
          ? 18
          : globalTypes.find((n) => n.type == val).structure
          ? perPage.value
          : perPageGrid.value;
      isPaginate.value = isPag;
    }
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
      <div
        class="mt-10 grid grid-cols-2 bg-white rounded-lg p-5 gap-5 mb-12"
        v-if="type == 'document'"
      >
        <h2 v-if="category" class="col-span-2 text-2xl mb-3">
          {{ category.name }}
        </h2>
        <div v-for="(n, i) in dataResults" :key="i">
          <router-link
            class="block card"
            :to="`/${route.params.id}/${typeId}/${n.slug}`"
          >
            <CardYellowGrid v-bind="n" />
          </router-link>
        </div>
      </div>
      <div
        class="mt-10 grid grid-cols-2 bg-white rounded-lg p-5 gap-5 mb-12"
        v-else-if="type == 'timeline'"
      >
        <h2 v-if="category" class="col-span-2 text-2xl mb-3">
          {{ category.name }}
        </h2>
        <div v-for="(n, i) in dataResults" :key="i">
          <router-link
            class="block card"
            :to="`/${route.params.id}/${typeId}/${n.slug}`"
          >
            <CardFull v-bind="n" />
          </router-link>
        </div>
      </div>
      <div class="mt-10 mb-12" v-else-if="type == 'article_list'">
        <h2 v-if="category" class="text-2xl mb-3 bg-white rounded-lg p-5">
          {{ category.name }}
        </h2>
        <div class="bg-white rounded-lg p-5">
          <div v-for="(n, i) in dataResults" :key="i">
            <router-link
              class="block card"
              :to="`/${route.params.id}/${typeId}/${n.slug}`"
            >
              <ArticlesList v-bind="n" />
            </router-link>
          </div>
        </div>
      </div>
      <div class="mt-10 mb-12" v-else-if="type == 'article_zig_zag'">
        <h2 v-if="category" class="text-2xl mb-3 bg-white rounded-lg p-5">
          {{ category.name }}
        </h2>
        <div class="">
          <div v-for="(n, i) in dataResults" :key="i">
            <router-link
              class="block card"
              :to="`/${route.params.id}/${typeId}/${n.slug}`"
            >
              <ZigZagCard :isOdd="i % 2 == 0 ? true : false" v-bind="n" />
            </router-link>
          </div>
        </div>
      </div>
      <div class="mt-10 mb-12" v-else-if="type == 'article_grid'">
        <h2 v-if="category" class="text-2xl mb-3 bg-white rounded-lg p-5">
          {{ category.name }}
        </h2>
        <div class="grid grid-cols-4 gap-8">
          <div v-for="(n, i) in dataResults" :key="i">
            <router-link
              class="block h-full card"
              :to="`/${route.params.id}/${typeId}/${n.slug}`"
            >
              <BaseCard v-bind="n" />
            </router-link>
          </div>
        </div>
      </div>
      <div class="mt-10 mb-12" v-else-if="type == 'video_gallery'">
        <LightGallery
          :show="showLight"
          @removeLight="hideLight"
          :gallerySize="dataResults.length - 1"
          :currentGallery="attachment.idx"
          @next="nextGallery"
          @prev="prevGallery"
        >
          <template v-slot:img>
            <transition name="transformX">
              <iframe
                class="w-full max-w-2xl h-80 pointer-events-auto"
                :src="'https://www.youtube.com/embed/' + attachment.src"
                :title="attachment.title"
                frameborder="0"
              ></iframe>
            </transition>
          </template>
        </LightGallery>
        <h2 v-if="category" class="text-2xl mb-3 bg-white rounded-lg p-5">
          {{ category.name }}
        </h2>
        <div class="grid grid-cols-4 gap-8">
          <div v-for="(n, i) in dataResults" :key="i">
            <VideoCard v-bind="n" @click="clickVideo" />
          </div>
        </div>
      </div>
      <div class="mt-10 mb-12" v-else-if="type == 'e_library'">
        <h2 v-if="category" class="text-2xl mb-8 bg-white rounded-lg p-5">
          {{ category.name }}
        </h2>
        <div class="grid xl:grid-cols-4 grid-cols-3 gap-8">
          <div v-for="(n, i) in dataResults" :key="i">
            <router-link class="block card" :to="`/${route.params.id}/${n.id}`">
              <BookCard v-bind="n" />
            </router-link>
          </div>
        </div>
      </div>
      <div class="mt-10 mb-12" v-else-if="type == 'schedule'">
        <h2 v-if="category" class="text-2xl mb-8 bg-white rounded-lg p-5">
          {{ category.name }}
        </h2>
        <div
          class="overlay fixed top-0 left-0 w-full h-full z-10 bg-black bg-opacity-5"
          :class="{ 'z-30': lesson }"
          v-show="isCalendar || isGroup || isSchema || lesson"
          @click="closePopup"
        ></div>
        <LessonModal
          @close="closePopup"
          v-if="lesson"
          :date="schedule.date"
          :data="lesson"
        />
        <div class="grid grid-cols-4 gap-2.5 mb-8">
          <div>
            <div
              class="text-gray-600 bg-white flex items-center py-2.5 px-3.5 rounded-md"
            >
              <input
                type="text"
                placeholder="Guruh raqami"
                class="w-full focus:outline-none"
                v-model.number="groupValue"
              />
              <div class="icon">
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
          </div>
          <div class="relative" @click="isCalendar = true">
            <div
              class="text-gray-600 bg-white flex items-center py-2.5 px-3.5 rounded-md"
            >
              <div class="calendar mr-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.66667 5.83333V2.5M13.3333 5.83333V2.5M5.83333 9.16667H14.1667M4.16667 17.5H15.8333C16.2754 17.5 16.6993 17.3244 17.0118 17.0118C17.3244 16.6993 17.5 16.2754 17.5 15.8333V5.83333C17.5 5.39131 17.3244 4.96738 17.0118 4.65482C16.6993 4.34226 16.2754 4.16667 15.8333 4.16667H4.16667C3.72464 4.16667 3.30072 4.34226 2.98816 4.65482C2.67559 4.96738 2.5 5.39131 2.5 5.83333V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5Z"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                v-model="dateTitle"
                placeholder="Sanani tanlang"
                class="w-full focus:outline-none"
                @focus="isCalendar = true"
              />
              <div class="icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.11973 9.29006L11.9997 13.1701L15.8797 9.29006C16.2697 8.90006 16.8997 8.90006 17.2897 9.29006C17.6797 9.68006 17.6797 10.3101 17.2897 10.7001L12.6997 15.2901C12.3097 15.6801 11.6797 15.6801 11.2897 15.2901L6.69973 10.7001C6.30973 10.3101 6.30973 9.68006 6.69973 9.29006C7.08973 8.91006 7.72973 8.90006 8.11973 9.29006Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <DatePicker
              class="absolute z-20 top-14"
              id="date-picker"
              :model-config="{
                type: 'string',
                mask: 'YYYY-MM-DD',
              }"
              style="position: absolute !important; width: 100% !important"
              v-show="isCalendar"
              v-model="filter.date"
            />
          </div>
          <div class="relative" @click="isGroup = true">
            <div
              class="text-gray-600 bg-white flex items-center py-2.5 px-3.5 rounded-md"
            >
              <input
                type="text"
                placeholder="Kurs raqami"
                class="w-full focus:outline-none"
                v-model="groupTitle"
              />
              <div class="icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.11973 9.29006L11.9997 13.1701L15.8797 9.29006C16.2697 8.90006 16.8997 8.90006 17.2897 9.29006C17.6797 9.68006 17.6797 10.3101 17.2897 10.7001L12.6997 15.2901C12.3097 15.6801 11.6797 15.6801 11.2897 15.2901L6.69973 10.7001C6.30973 10.3101 6.30973 9.68006 6.69973 9.29006C7.08973 8.91006 7.72973 8.90006 8.11973 9.29006Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div
              v-show="isGroup"
              class="select bg-white rounded-md absolute z-20 top-14 w-full px-2.5 py-3"
            >
              <ul>
                <li v-for="(n, i) in groups" :key="i">
                  <a
                    href="#!"
                    class="block px-2.5 py-2 hover:bg-gray-100 hover:text-yellow-500 rounded-md"
                    :class="i == groups.length - 1 ? 'mb-0' : 'mb-1'"
                    @click="clickGroup(n.value)"
                    >{{ n.title }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="relative" @click="isSchema = true">
            <div
              class="text-gray-600 bg-white flex items-center py-2.5 px-3.5 rounded-md"
            >
              <input
                type="text"
                placeholder="O‘quv smenasi"
                class="w-full focus:outline-none"
                v-model="schemaTitle"
              />
              <div class="icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.11973 9.29006L11.9997 13.1701L15.8797 9.29006C16.2697 8.90006 16.8997 8.90006 17.2897 9.29006C17.6797 9.68006 17.6797 10.3101 17.2897 10.7001L12.6997 15.2901C12.3097 15.6801 11.6797 15.6801 11.2897 15.2901L6.69973 10.7001C6.30973 10.3101 6.30973 9.68006 6.69973 9.29006C7.08973 8.91006 7.72973 8.90006 8.11973 9.29006Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div
              class="select bg-white rounded-md absolute z-20 top-14 w-full px-2.5 py-3"
              v-show="isSchema"
            >
              <ul>
                <li v-for="(n, i) in schema" :key="i">
                  <a
                    href="#!"
                    class="block px-2.5 py-2 hover:bg-gray-100 hover:text-yellow-500 rounded-md"
                    :class="i == schema.length - 1 ? 'mb-0' : 'mb-1'"
                    @click="clickSchema(n.value)"
                    >{{ n.title }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="grid 2xl:grid-cols-6 xl:grid-cols-4 gap-8">
          <div v-for="(n, i) in dataResults" :key="i">
            <ScheduleCard v-bind="n" @click="getLessons" />
          </div>
        </div>
      </div>
      <div class="mt-10 mb-12" v-else-if="type == 'leadership'">
        <h2 v-if="category" class="text-2xl mb-3 bg-white rounded-lg p-5">
          {{ category.name }}
        </h2>
        <div class="grid grid-cols-3 gap-8">
          <div v-for="(n, i) in dataResults" :key="i">
            <router-link
              class="block card"
              :to="`/${route.params.id}/${typeId}/${n.slug}`"
            >
              <CardLidership v-bind="n" />
            </router-link>
          </div>
        </div>
      </div>
      <div class="mt-10 mb-12" v-else-if="type == 'single_page'">
        <h2 v-if="category" class="text-2xl mb-3 bg-white rounded-lg p-5">
          {{ category.name }}
        </h2>
        <div class="bg-white rounded-lg p-5">
          <div v-for="(n, i) in dataResults" :key="i">
            <h3 class="text-2xl mb-5">{{ n.title }}</h3>

            <div
              class="single_page_card bg-thin-yellow-primary bg-opacity-40 p-5 rounded-md"
            >
              {{ n.body }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="type !== 'single_page' && isPaginate <= data.count"
        class="mb-10"
      >
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
  </div>
</template>
