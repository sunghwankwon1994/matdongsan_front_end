<template>
  <div class="list-box mt-5 w-100">
    <div class="justify-content-center">
      <div
        class="row row-cols-4 justify-content-start mb-5 mx-auto ms-3 w-100 text-center"
        v-if="agentProperiesData.length > 0"
      >
        <RouterLink
          v-for="(property, index) in agentProperiesData"
          :key="index"
          :to="
            property.pstatus !== '거래완료'
              ? { path: `/Property/${property.pnumber}` }
              : ''
          "
          class="property-grid col-3 text-decoration-none text-dark"
          :class="{ disabled: property.pstatus === '거래완료' }"
          @click.prevent="
            property.pstatus === '거래완료' ? handleDisabledClick : null
          "
        >
          <img
            :src="getPropertyThumbnail(property.pnumber)"
            class="rounded mb-2"
            width="150"
            height="150"
            alt=""
          />
          <h5 class="fw-bold text-truncate">
            {{ property.ptitle }} {{ property.pcategory }}
            {{ property.prentalfee }}
          </h5>
          <small
            class="property-status"
            :class="property.pstatus === '거래완료' ? tradeDone : tradeYet"
            >{{ property.pstatus }}</small
          >
        </RouterLink>
      </div>
      <div class="mb-5 mx-auto ms-3 w-100 text-center" v-else>
        <img
          src="@/assets/free-icon-real-estate-1072301.png"
          width="50"
          alt=""
        />
        <h5 class="mt-3 fw-bold">아직 등록된 매물이 없습니다.</h5>
      </div>
    </div>
  </div>
</template>

<script setup>
import agentAPI from "@/apis/agentAPI";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import propertyAPI from "@/apis/propertyAPI";

const route = useRoute();
const agentProperiesData = ref([]);
const pthumbnails = ref({}); // 썸네일 데이터를 객체로 저장
const tradeDone = "text-dark fw-bold btn btn-warning btn-sm";
const tradeYet = "text-light fw-bold btn btn-success btn-sm";
// 중개인이 올린 매물 리스트 가져오는 함수
async function getPropertiesByAgent() {
  try {
    const response = await agentAPI.getAgentProperty(route.params.id, 1);
    agentProperiesData.value = response.data.agentProperty;
    console.log("매물 데이터: ", agentProperiesData.value);
    agentProperiesData.value.forEach((property) => {
      getPthumbnail(property.pnumber);
    });
  } catch (error) {
    console.log(error);
  }
}

// 썸네일 사진 출력
const getPthumbnail = async (pnumber) => {
  try {
    const response = await propertyAPI.propertyAttachDownload(pnumber);
    if (response) {
      pthumbnails.value[pnumber] = URL.createObjectURL(response.data);
    }
  } catch (error) {
    console.log(error);
  }
};

// 썸네일 URL 가져오기
const getPropertyThumbnail = (pnumber) => {
  return pthumbnails.value[pnumber];
};

// 비활성화된 링크 클릭 처리
function handleDisabledClick(event) {
  event.preventDefault();
  // 추가적인 비활성화 클릭 로직을 여기에 작성할 수 있습니다.
}

onMounted(() => {
  getPropertiesByAgent();
});

watch(
  () => route.params.id,
  () => {
    getPropertiesByAgent();
  }
);
</script>

<style scoped>
.list-box {
  margin-right: auto;
  margin-left: auto;
}
.disabled {
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.5;
}
.property-status {
  font-size: 10px;
}

@media (max-width: 768px) {
  .property-grid {
    grid-template-columns: 1fr;
  }
}
</style>
