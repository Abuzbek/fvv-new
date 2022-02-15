<script setup>
import { defineProps } from "@vue/runtime-core";
import { useRouter } from "vue-router";
const props = defineProps(["title", "id", "slug", "thumbnail", "date"]);
const router = useRouter();
const redirect = () => {
  router.push({
    name: "_innerId",
    params: {
      id: "kafedralar",
      typeId: "articles",
      innerId: props.slug,
    },
  });
  // };
};
</script>
<template>
  <div
    @click="redirect"
    class="card md:px-4 md:pb-2 md:pt-4 px-2 pb-1.5 pt-2 rounded-lg h-full bg-white shadow-sm cursor-pointer"
  >
    <img :src="thumbnail" class="rounded-md h-44 object-cover w-full" alt="" />
    <div class="card-body">
      <h5 class="card-title text-sm text">{{ title }}</h5>
    </div>
  </div>
</template>

