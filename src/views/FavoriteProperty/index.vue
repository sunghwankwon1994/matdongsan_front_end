<template>
  <div class="overflow-hidden w-75 mx-auto">
    <div>
      <div class="d-flex ps-3 pe-3 pb-3">
        <div class="property-list-box w-25 h-100">
          <div class="col mt-3" @click="backToPropertyList" >
            <PropertyList type="favorite" @getFavoriteListData="getFavoriteList" />
          </div>
        </div>
        <!-- 카카오맵 -->
        <div class="right-box ms-4 col map-box p-3" v-if="status">
          <KakaoMap page="favorite" :favoriteListData="favoriteList"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PropertyList from "@/components/Property/PropertyList.vue";
import KakaoMap from "@/components/KakaoMap.vue";
import { ref } from "vue";

const favoriteList = ref([]); //관심 매물 리스트
let status = ref(true);

function backToPropertyList() {
  status.value = !status.value;
}

//PropertyList에서 가져오는 favorite 리스트 
function getFavoriteList(data){
  favoriteList.value=data;
}
</script>

<style scoped>
.right-box {
  width: 800px;
}
.map-box {
  height: 708px;
}
:deep(.property-list-box::-webkit-scrollbar) {
  width: 12px;
}

:deep(.property-list-box::-webkit-scrollbar-track) {
  background: #f1f1f1;
}

:deep(.property-list-box::-webkit-scrollbar-thumb) {
  background: #888;
  border-radius: 10px; 
}

:deep(.property-list-box::-webkit-scrollbar-thumb:hover) {
  background: #555;
}
</style>
