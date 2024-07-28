<template>
    <div class="root container w-50">
        <div>
            <h3 class="fw-bold text-center mt-5 mb-2">매물 등록하기</h3>
        </div>
        <hr>
        <div class="row mt-5 mb-5 justify-content-around" style="margin-left: 50px; height: 280px">
            <div class="col-5 mt-5">
                <p class="fw-bold h3" >원하는 매물을<br> 등록할 수 있는 상품</p>
                <span style="font-size: 1rem;">원하는 매물을 등록할 수 있습니다.<br>
                월 300만명이 부동산을 검색하는 맛동산에<br> 매물을 노출하세요</span>
            </div>
            <div class="col-6">
                <img src="@/assets/paymentInfo.svg" class="card-img-top img-fluid mt-5 mt-3" alt="..."/>
            </div>
        </div>
    
        <!-- 상품 종류 -->
        <div class="products-box">
            <div>
                <h3 class="mb-3">상품 종류</h3>
                <ul class="row" style="padding-right: 32px">
                    <li class="col p-0 px-2">
                        <div class="card h-100" >
                            <div style="margin-top: 64px; padding-top: 35px" >
                            <img style="width: 22%;" src="@/assets/home.png" alt="" />
                            </div>
    
                            <p class="card-text mt-3 mb-0" style="font-weight: bold; font-size: 1.2rem;">등록 건 1개</p>
                            <hr>
                            <p style="font-weight: bold; font-size: 1.5rem; color: #326CF9;">5,500원</p>
                        </div>
                    </li>
                    <li class="col p-0 px-2">
                        <div class="card h-100">
                            <div style="margin-top: 65px; padding-top: 35px;">
                                <img style="width: 22%;" src="@/assets/home.png" alt="" />
                                <img style="width: 22%;" src="@/assets/home.png" alt="" />
                                <img style="width: 22%;" src="@/assets/home.png" alt="" />
                            </div>
    
                            <p class="card-text mt-3 mb-0" style="font-weight: bold; font-size: 1.2rem;">등록 건 3개</p>
                            <hr>
                            <p style="font-weight: bold; font-size: 1.5rem; color: #326CF9;">15,000원</p>
                        </div> 
                    </li>
                    <li class="col p-0 px-2">
                        <div class="card h-100 justify-content-end" >
                            <div style="margin-top: 40px; ">
                                <img style="width: 22%;" src="@/assets/home.png" alt="" />
                                <img style="width: 22%;" src="@/assets/home.png" alt="" /><br>
                                <img style="width: 22%;" src="@/assets/home.png" alt="" />
                                <img style="width: 22%;" src="@/assets/home.png" alt="" />
                                <img style="width: 22%;" src="@/assets/home.png" alt="" />
                            </div>
    
                            <p class="card-text mt-3 mb-0" style="font-weight: bold; font-size: 1.2rem;">등록 건 5개</p>
                            <hr>
                            <p style="font-weight: bold; font-size: 1.5rem; color: #326CF9;">25,000원</p>
                          
                        </div>
                    </li>
                </ul>
                <div class="btn btn-warning btn-lg w-50 container fw-bold mt-3" style=" font-size: 0.9rem;" @click="requestAddress">구매하기</div>
            </div>
        </div>
        <div class="row mt-5 mb-5" style="margin-left: 50px; height: 260px">
            <div class="col-5 mt-5">
                <p style="font-size: 1.7rem; font-weight: bold">맛동산 PC 사이트</p>
                <span style="font-size: 1rem;">맛동산 웹사이트의 모든 검색 결과에 노출됩니다.<br>
                검색되는 모든 결과에 노출되므로<br>등록 수량이 많을 수록 광고 효과가 높아집니다.</span>
            </div>
            <div class="col-6 ms-5">
                <img src="@/assets/paymentInfo2.svg" class="card-img-top img-fluid" alt="..." style=" max-width: 100%;">
            </div>
        </div>
        <div class="info-box">
            <h3 style="font-weight: bold; margin-bottom: 40px">궁금한 부분이 있으신가요?</h3>
            <p style="font-size: small;">광고 상품 및 이용에 대한 문의는 언제든지 고객센터에 문의해 주세요.</p>
            <RouterLink to="/QNA/Notice"><button class="btn  btn-outline-secondary mt-4">고객센터 바로가기</button></RouterLink>
        </div>
    <LoginModal id="loginModal" @close="hideLogin" paymentInfo="paymentInfo"/>
    </div>
    </template>
    
    <script setup>
import { useStore } from "vuex";
import { Modal } from 'bootstrap';
import LoginModal from "@/components/LoginModal.vue"
import { onMounted } from 'vue';
import propertyAPI from "@/apis/propertyAPI";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter()

// 등록권 수량 가져오기
async function getListingRemain(){
    try {
      const response = await propertyAPI.getListingRemain(store.state.uemail);
      if(response.data.remain != null){
        router.push("/PropertyForm");
      } 
  
      else if(response.data.result == "noRemain"){
        console.log("수량없음");
        router.push("/Payment");
      } 
      } catch (error) {
        console.log(error);
      }
  
    }

function requestAddress(){
  if(store.state.uemail){
    getListingRemain()
  } else {
    // 로그인 정보가 없으면 모달 열기
    showLogin()
  }
}

// 로그인 모달 마운트
let loginModal = null;

onMounted(() => {
  loginModal = new Modal(document.querySelector("#loginModal"));
});

// 모달 닫기
function hideLogin() {
  loginModal.hide();
}

// 삭제 버튼 클릭 시 확인하는 모달 켜짐
function showLogin(){
  loginModal.show();
}
    </script>
    
    <style scoped>
    
    .products-box {
        background-color: rgb(243, 246, 251);
        /* width: 100%; */
    }
    
    .products-box > div {
        padding: 40px 0px 50px;
        /* width: 1200px; */
        height: 500px;
        margin: 0px auto;
        text-align: center;
    }
    
    ul {
        /* display: flex; */
        justify-content: center;
        list-style: none;
    }
    
    li {
        display: flex;
        flex-direction: column;
        width: 336px;
        padding: 40px 25px;
    }
    
    .info-box {
        border-top: 1px solid rgb(237, 237, 237);
        text-align: center;
        padding-top: 60px;
        padding-bottom: 20px;
    }
    
    .service-box > div {
        display: flex;
        width: 1040px;
        height: 520px;
    }
    
    .service-box > div > h1 {
        text-align: center;
    }

   
    
    </style>