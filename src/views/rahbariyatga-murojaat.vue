<script setup>
import { ref } from "@vue/reactivity";
import { useI18n } from "vue-i18n";
import RigthAside from "../components/global-components/RigthAside.vue";
import http from "../hooks/http";
const i18n = useI18n();
const { t } = i18n;
const data = ref({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  message: "",
  father_name: "",
  file: "",
});
function file(e) {
  data.value.file = e.target.files[0];
}
async function submitHandler() {
  const formData = new FormData();
  for (const key in data.value) {
    formData.append(key, data.value[key]);
  }
  const res = await http.post(
    `/${i18n.locale.value}/api/appeal/create/`,
    formData
  );
  if (res.status === 201) {
    alert("Murojaatingiz muvaffaqiyatli yuborildi");
    data.value = {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      message: "",
      father_name: "",
      file: "",
    };
  } else {
    alert("Xatolik yuz berdi");
    alert("");
  }
  console.log(res);
}
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-3 gap-6 py-10">
      <div class="col-span-2">
        <div class="bg-white rounded-lg p-5">
          <h2 class="text-2xl mb-6">{{ t("message_sent") }}</h2>
          <form action="#" @submit.prevent="submitHandler">
            <div class="form-block mb-5">
              <label class="text-gray-900" for="first_name">{{
                t("first_name")
              }}</label>
              <div
                class="text-gray-600 bg-white flex items-center py-2.5 px-3.5 rounded-md border border-gray-400"
              >
                <input
                  type="text"
                  
                  class="w-full focus:outline-none"
                  id="first_name"
                  v-model="data.first_name"
                />
              </div>
            </div>
            <div class="form-block mb-5">
              <label class="text-gray-900" for="last_name">{{
                t("last_name")
              }}</label>
              <div
                class="text-gray-600 bg-white flex items-center py-2.5 px-3.5 rounded-md border border-gray-400"
              >
                <input
                  type="text"
                  
                  class="w-full focus:outline-none"
                  id="last_name"
                  v-model="data.last_name"
                />
              </div>
            </div>
            <div class="form-block mb-5">
              <label class="text-gray-900" for="father_name"
                >{{
                t("father_name")
              }}</label
              >
              <div
                class="text-gray-600 bg-white flex items-center py-2.5 px-3.5 rounded-md border border-gray-400"
              >
                <input
                  type="text"
                  class="w-full focus:outline-none"
                  id="father_name"
                  v-model="data.father_name"
                />
              </div>
            </div>
            <div class="form-block mb-5">
              <label class="text-gray-900" for="address">{{
                t("address")
              }}</label>
              <div
                class="text-gray-600 bg-white flex items-center py-2.5 px-3.5 rounded-md border border-gray-400"
              >
                <input
                  type="text"
                  
                  class="w-full focus:outline-none"
                  id="address"
                  v-model="data.address"
                />
              </div>
            </div>
            <div class="form-block mb-5">
              <label class="text-gray-900" for="phone">{{
                t("phone")
              }}</label>
              <div
                class="text-gray-600 bg-white flex items-center py-2.5 px-3.5 rounded-md border border-gray-400"
              >
                <input
                  type="text"
                  
                  class="w-full focus:outline-none"
                  id="phone"
                  v-model="data.phone"
                />
              </div>
            </div>
            <div class="form-block mb-5">
              <label class="text-gray-900" for="email">{{
                t("email")
              }}</label>
              <div
                class="text-gray-600 bg-white flex items-center py-2.5 px-3.5 rounded-md border border-gray-400"
              >
                <input
                  type="email"
                  
                  class="w-full focus:outline-none"
                  id="email"
                  v-model="data.email"
                />
              </div>
            </div>
            <div class="form-block mb-5">
              <label class="text-gray-900" for="file">{{
                t("file")
              }}</label>
              <div
                class="text-gray-600 bg-white flex items-center py-2.5 px-3.5 rounded-md border border-gray-400"
              >
                <input
                  type="file"
                  @change="file($event)"
                  
                  class="w-full focus:outline-none"
                  id="file"
                />
              </div>
            </div>
            <div class="form-block mb-5">
              <label class="text-gray-900" for="message">{{
                t("message")
              }}</label>
              <div
                class="text-gray-600 bg-white flex items-center py-2.5 px-3.5 rounded-md border border-gray-400"
              >
                <textarea
                  name=""
                  v-model="data.message"
                  class="resize-none w-full focus:outline-none"
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
            </div>
            <div class="flex items-center">
              <button
                class="bg-orange-primary py-2.5 px-9 text-white rounded-sm"
                type="submit"
              >
                {{
                t("send")
              }}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <RigthAside />
      </div>
    </div>
  </div>
</template>

<style></style>
