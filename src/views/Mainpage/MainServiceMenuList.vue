<template>
  <div class="mt-5 container mb-5">
    <h4 class="fw-bold mb-4 ps-2">메인 서비스</h4>
    <div class="d-flex justify-content-between mx-auto px-2">
      <div class="card border border-2 border-secondary" style="width: 18rem">
        <img
          src="@/assets/main-service1.png"
          class="card-img pt-2 ps-5 pe-5"
          alt="..."
          height="176"
        />
        <div class="card-body text-center mb-5">
          <h5 class="card-title fw-bold">원룸</h5>
          <p class="card-text text-muted">
            집이지가 선정한 <br />
            원룸 리스트 정보를 찾아보세요.
          </p>
          <RouterLink to="/Property" class="btn text-light ps-5 pe-5"
            >보러가기</RouterLink
          >
        </div>
      </div>
      <div class="card border border-2 border-secondary" style="width: 18rem">
        <img
          src="@/assets/main-service2.png"
          class="card-img pt-2 ps-5 pe-5"
          alt="..." height="176"
        />
        <div class="card-body text-center">
          <h5 class="card-title fw-bold">전/월세</h5>
          <p class="card-text text-muted">
            집이지를 통해 타 사이트보다 <br />
            저렴한 등록비로 집을 홍보하세요.
          </p>
          <!-- <div v-if="listingRemain > 0"><RouterLink to="/PropertyForm" class="btn text-light ps-5 pe-5"
            >집내놓기</RouterLink
          ></div>
          <div v-else><RouterLink to="/Payment/PaymentInfo" class="btn text-light ps-5 pe-5"
            >집내놓기</RouterLink
          ></div> -->
          <div class="btn text-light ps-5 pe-5" @click="getListingRemain" >집내놓기</div>
        </div>
      </div>
      <div class="card border border-2 border-secondary" style="width: 18rem">
        <img
          src="@/assets/main-service3.png"
          class="card-img pt-2 ps-5 pe-5"
          alt="..."
        />
        <div class="card-body text-center">
          <h5 class="card-title fw-bold">부동산</h5>
          <p class="card-text text-muted">
            집이지와 같이 일을 하는 <br />
            중개업자에게 연락해보세요.
          </p>
          <RouterLink to="/Agent" class="btn text-light ps-5 pe-5"
            >중개인 목록보기</RouterLink
          >
        </div>
      </div>
    </div>
   
    <LoginModal id="loginModal" @close="hideLogin"/>
  </div>
</template>
<script setup>
import propertyAPI from '@/apis/propertyAPI';
import { onMounted, ref } from 'vue';
import { useStore } from "vuex";
import LoginModal from "@/components/LoginModal.vue"
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';
const router = useRouter()
const store =  useStore();

// 등록권 수량 가져오기
async function getListingRemain(){
  if(store.state.uemail){
    try {
      const response = await propertyAPI.getListingRemain(store.state.uemail);
      if(response.data.remain != null){
        router.push("/PropertyForm");
      } 
  
      else if(response.data.result == "noRemain"){
        console.log("수량없음");
        router.push("/Payment/PaymentInfo");
      } 
      } catch (error) {
        console.log(error);
      }
  } else {
    router.push("/Payment/PaymentInfo");
  }
    }


</script>
<style scoped>
.btn {
  background-color: #2f4858;
}
.btn:hover {
  background-color: #8d8f91;
}
</style>
