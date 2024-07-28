<template>
  <div style="justify-content: center; display: flex">
    <div
      v-if="
        route.params.product == '1' ||
        route.params.product == '3' ||
        route.params.product == '5'
      "
      class="text-center w-50"
    >
      <img style="margin-top: 70px; height: 40px" src="@/assets/confetti.png" />
      <h3 class="fw-bold mt-5">결제가 완료되었습니다.</h3>

      <!-- 사용할 까봐 남겨 둠 -->
      <!-- <h3 class="mt-3">{{ productName }}를 구매하셨습니다.</h3>
    <h3 class="mt-3">{{ date }}까지 사용하실 수 있습니다.</h3>
    <h3 class="mt-3">제품 : {{ productName }}</h3>
    <h3 class="mt-3" v-if="serviceType !== 'ad'">
      사용가능 횟수 : {{ count }} 남음
    </h3>
    <h3 class="mt-3" v-else>광고 마감 일자 : {{ expireDate }}</h3> -->
      <h5 class="mt-5 fw-bold">매물을 등록할 수 있습니다.</h5>
      <p class="mt-3 fw-bold text-muted">
        구매한 상품: 매물 등록권 X {{ route.params.product }}
      </p>
      <RouterLink
        class="btn btn-warning btn-lg mt-5 me-4 w-auto"
        style="width: 17%; font-size: 1rem"
        to="/PropertyForm"
        >등록하러 가기</RouterLink
      >
      <RouterLink
        class="btn btn-dark btn-lg mt-5 w-auto"
        style="width: 17%; font-size: 1rem"
        to="/"
        >홈으로 돌아가기</RouterLink
      >
      <p class="info fw-semibold mt-5" style="font-size: small">
        *구매하신 내역은 마이페이지에서 확인하실 수 있습니다.
      </p>
    </div>
    <div v-else>
      <h3 class="fw-bold mt-5 vh-100">잘못된 상품입니다.</h3>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();


</script>

<style scoped>
.info {
  color: #615fad;
}
</style>
