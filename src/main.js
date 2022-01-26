import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import i18n from "./i18n";
import { SetupCalendar, Calendar, DatePicker } from "v-calendar";
import "swiper/css/swiper.css";
createApp(App)
  .use(i18n)
  .use(store)
  .use(SetupCalendar, {})
  .component("Calendar", Calendar)
  .component("DatePicker", DatePicker)
  .use(router)
  .mount("#app");
