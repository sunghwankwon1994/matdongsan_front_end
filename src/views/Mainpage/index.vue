<template>
  <div class="">
    <FirstSection />
    <div class="w-100 mainServiceList">
      <MainServiceList class="mx-auto w-75 " />
    </div>
    <div class="mainServiceContainer pb-3">
      <MainService class="mx-auto w-75"/>
    </div>
  </div>
</template>

<script setup>
import FirstSection from "./FirstSection.vue";
import MainServiceList from "./FeaturedPropertyList.vue";
import MainService from "./MainServiceMenuList.vue";

</script>

<style scoped>
.mainServiceList{
  background-color: #2f4858;
}

</style>
