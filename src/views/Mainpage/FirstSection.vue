<template>
  <div>
    <section class="main-container text-center p-5">
        <div class="h-100 align-content-center">
            <h2 class="text-light fw-bold">어떤 집을 찾고 계신가요?</h2>
            <div class="input-group mb-3 w-50 mt-4">
              <input
                type="text"
                class="form-control form-control-lg mx-auto search-bar focus-ring"
                placeholder="원하시는 지역명을 입력해주세요"
                aria-label="search-bar"
                aria-describedby="button-addon2"
                style="--bs-focus-ring-color: none"
                v-model="searchKeyword"
                @keyup.enter="searchInMain"
              />
              <button class="btn btn-warning btn-lg" type="button" id="button-addon2" @click="searchInMain">
                검색
              </button>
            </div>
        </div>
    </section>
    <div class="d-flex p-3 justify-content-center mx-auto pe-5 w-75 mainFirstSection-second">
      <div class="align-self-center col-4">
        <h2 class="fw-bold text-center">당신의 집을 직접 팔거나 <br> 직접 거래를 해보세요</h2>
        <p class="text-center mt-3 text-muted">가입을 하고 더 많은 정보를 얻으세요</p>
        <div class="text-center">

            <RouterLink :to="{
                  name: 'SignupAgreement',
                  params: { signupType: 'member' },
                }" class="btn btn-warning fw-bold mt-3 me-3">일반 회원</RouterLink>
            <RouterLink :to="{
                  name: 'SignupAgreement',
                  params: { signupType: 'agent' },
                }" class="btn btn-warning fw-bold mt-3 ms-3">업체 회원</RouterLink>
        </div>
      </div>
      <img src="@/assets/page-info-img.png" width="600" height="400" alt="" />
    </div>
  </div>


</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();

// 검색
const searchKeyword = ref("");

function searchInMain() {
  router.push({
    path: "/Property",
    query: {keyword: searchKeyword.value}
  })
}
</script>

<style scoped>
.mainFirstSection-second {
  height: 450px;
}

.main-container {
  background-image: url("@/assets/main_page_banner.png");
  background-size: cover;
  height: 330px;
}

.input-group {
  margin-left: auto;
  margin-right: auto;
}


</style>
