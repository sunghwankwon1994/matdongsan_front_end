<template>
  <div>
    <div class="main-box text-start mt-5">
      <div class="info-box">
        <div class="w-50 fw-bold h4">기본정보</div>
        <hr class="border-1" />
        <div class="d-flex mt-2">
          <div class="col-6 mt-2 h6">
            <b>대표자명:</b> {{ props.agentData.aname }}
          </div>
        </div>
        <div class="d-flex mt-2">
          <div class="col-6 mt-2 h6">
            <b>대표번호: </b>{{ props.agentData.aphone }}
          </div>
          <div class="col-6 mt-2 h6">
            <b>맛동산 가입일: </b> {{ props.joinDate }}
          </div>
        </div>
        <div class="d-flex mt-2">
          <div class="col-6 mt-2 h6">
            <b>사업자번호:</b> {{ props.detailData.adbrandnumber }}
          </div>
          <div class="col-6 mt-2 h6"><b>거래완료된 방: </b> {{props.tradeCount}}개</div>
        </div>
        
      </div>

      <div class="h5 fw-bold mt-5 w-100 text-center agentPosition">
        <h5 class="text-start fw-bold">부동산 위치</h5>
        <hr />
        
        <div class="h-100">
          <KakaoMap :position="agentPosition" page="agent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import KakaoMap from "@/components/KakaoMap.vue";
const props = defineProps(["detailData", "agentData","tradeCount","joinDate"]);

const agentPosition = ref([]); // 초기 값 설정

// agentData가 변경될 때마다 agentPosition 업데이트
watch(
  () => props.agentData,
  (newAgentData) => {
    agentPosition.value = {
      lat: newAgentData.alatitude,
      lng: newAgentData.alongitude,
    };
  },
  { deep: true },
  { immediate: true }
); // immediate: true를 설정하여 처음 로드될 때도 반영되도록 설정
</script>

<style scoped>
.main-box {
  margin-left: auto;
  margin-right: auto;
}
.agentPosition {
  height: 300px;
  margin-bottom: 70px;
}
</style>
