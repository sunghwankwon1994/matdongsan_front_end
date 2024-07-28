<template>
  <div>
    <AppMenu />

    <div>
      <router-view />
    </div>
    <CommonFooter v-if="path !== '/Agent' && path !== '/Property' &&path!='/FavoriteProperty'" />
  </div>
</template>

<script setup>
import AppMenu from "./components/AppMenu.vue";
import CommonFooter from "./components/CommonFooter.vue";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
const route = useRoute();
const path = ref("");
console.log(route.path);
watch(
  () => route.path,
  (newPath) => {
    path.value = newPath;
  }
);
</script>

<style scoped></style>
