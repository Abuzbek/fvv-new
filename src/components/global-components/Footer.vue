<script setup>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import http from "../../hooks/http";
const i18n = useI18n();
const router = useRouter();
const { t } = useI18n();
const categories = ref([]);
const soc_links = ref({});
const hostname = ref("");
const openPage = (slug) => {
  router.push({
    name: "_id",
    params: {
      id: slug,
    },
  });
  window.scrollTo(0, 0);
};
(async () => {
  const res = await http.get(
    `/${i18n.locale.value}/api/categories/for_footer/?page_size=90`
  );
  if (res.status === 200) {
    categories.value = res.data.results;
    categories.value = categories.value.filter((category) => {
      if (category.parent_id == null) {
        return category;
      }
    });
    categories.value = categories.value.slice(0, 3);
  }
  const socLinks = await http.get(`/api/social_links/`);
  soc_links.value = socLinks.data;
  hostname.value = window.location.hostname;
})();
watch(
  () => i18n.locale.value,
  async () => {
    const res = await http.get(
      `/${i18n.locale.value}/api/categories/for_footer/?page_size=90`
    );
    if (res.status === 200) {
      categories.value = res.data.results;
      categories.value = categories.value.filter((category) => {
        if (category.parent_id == null) {
          return category;
        }
      });
      categories.value = categories.value.slice(0, 3);
    }
  }
);
</script>
<template>
  <footer class="bg-fb-primary pt-12 pb-2.5 text-white">
    <div class="container mx-auto px-4">
      <div
        class="grid grid-cols-12 gap-7 pb-12 footer-top"
        style="border-bottom: 1px solid rgba(230, 242, 255, 0.2)"
      >
        <div
          class="lg:col-span-3 md:col-span-4 col-span-12 flex flex-col"
        >
          <a href="/" class="nav-logo flex items-center mb-12 font-semibold">
            <img src="@/assets/img/logo.png" />
            <p class="ml-1.5" v-html="t('name')"></p>
          </a>
          <div>
            <p class="text-white mb-4" style="color: #e6f2ff">
              {{ t("footer_host", { host: hostname }) }}
            </p>
            <p class="text-white mb-4" style="color: #e6f2ff">
              {{ t("footerCopy") }}
            </p>
          </div>
        </div>
        <div
          class="lg:col-span-2 md:col-span-4 sm:col-span-6 col-span-12"
          v-for="(n, i) in categories"
          :key="i"
        >
          <h3>{{ n.name }}</h3>
          <ul v-for="(m, l) in n.children" :key="l">
            <li>
              <a :href="`/${m.slug}`" @click.prevent="openPage(m.slug)">{{
                m.name
              }}</a>
            </li>
          </ul>
        </div>
        <div class="lg:col-span-2 sm:col-span-6 col-span-12">
          <h3>Kontaktlar</h3>
          <ul>
            <li>
              <a href="tel:1101">{{ t("rescue_service") }}: 1101</a>
            </li>
            <li>
              <a href="tel:1050">{{ t("helpline") }}: 1050</a>
            </li>
            <li>
              <router-link
                class="font-semibold text-white"
                to="/contact-info"
                >{{ t("contact-info") }}</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="flex flex-wrap items-center justify-between footer-bottom">
        <p>
          {{ t("ctrl_enter") }}
        </p>
        <div class="block md:w-auto w-full md:my-0 my-5">
          <img src="../../assets/img/home/info.png" alt="" />
        </div>
        <a
          href="https://technocorp.uz/"
          target="_blank"
          class="flex items-center"
        >
          <p class="mr-3 text-white text-sm">Saytni ishlab chiqdi:</p>
          <img src="@/assets/icon/Logo.png" alt="" />
        </a>
      </div>
    </div>
  </footer>
</template>
<style scoped>
.footer-top ul li a.font-semibold.text-white {
  color: #fff;
  font-weight: 600;
}
h3 {
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  margin-bottom: 15px;
}
.footer-top ul > li > a {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #e6f2ff;
  display: inline-block;
  margin-bottom: 15px;
}
.footer-bottom {
  padding: 14px 0;
}
.footer-bottom ul {
  display: flex;
  align-items: center;
}
.footer-bottom a {
  display: flex;
  align-items: center;
  padding: 0 12px;
}
</style>
