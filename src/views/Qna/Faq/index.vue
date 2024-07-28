<template>
    <div>
      <div class="container w-50">
      <h2 style="text-align: center; margin-top: 70px; margin-bottom: 50px; font-weight: bold">자주 묻는 질문</h2>
      <!-- 버튼 tab -->
      <div class="row" style="height: 50px;">
          <RouterLink to="/QNA/Notice"  class="askMenu col-4 d-flex"  style="text-decoration: none; padding: none;" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
            <button class="askMenuBtn" style="background-color: transparent; border: none; width: 100%;">공지 사항</button>
          </RouterLink>
  
          <div @click="requestAddress" class="askMenu col-4 d-flex" style="text-decoration: none;" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
            <button class="askMenuBtn" style="background-color: transparent; border: none; width: 100%;">1:1 문의</button>
          </div>
          
          <RouterLink to="/QNA/FAQ" :class="isHoverd? 'askMenu col-4 d-flex' : 'selectMenu col-4 d-flex'" style="text-decoration: none;">
            <button :class="isHoverd? 'askMenuBtn':'selectMenu'" style="background-color: transparent; border: none; width: 100%;">자주 묻는 질문</button>
          </RouterLink>
        </div>
      </div>
      <div class="w-50 container">
      <p style="text-align: center; margin-top: 60px; margin-bottom: 50px">맛동산 사용자의 편의를 위해 <span style="color:#FEC83F; font-weight: bold">자주 묻는 질문과 답변</span>을 모아놓았습니다.<br>원하시는 질문을 찾아보세요!</p>
        <!-- 아코디언 -->
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne" style="border-bottom: 1px solid #dee2e6;">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                Q. 맛동산은 어떤 서비스인가요?
              </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne">
              <div class="accordion-body"><p>A. 국내 최고 직거래 부동산 플랫폼 ‘맛동산’에서 살고 싶은 집을 만나보세요. <br>
            <br>
            ▶ 대한민국 모든 원룸! 다 있다.<br>
            다~있는 맛동산에서 쉽게 원하는 방을 찾고 찜 하세요!<br><br>

            ▶ 부동산 정보를 한눈에 ‘주변 부동산’<br>
            전국 모든 지역의 부동산 정보가 다 있다!<br>
            부동산 뉴스, 부동산 일정, 청약 가이드까지 맛동산이 꼼꼼하게 전달해드려요.</p></div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo" style="border-bottom: 1px solid #dee2e6;">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                Q. 직거래는 어떻게 방을 내놓나요?
              </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" >
              <div class="accordion-body">
                <p>A. 개인회원의 경우 직거래 매물 1건에 대해 무료 광고가 가능합니다. <br>
                    광고는 30일 간 공개 되며 기간이 지날 경우 비공개처리됩니다. <br>
                    비공개된 매물은 수정하여 다시 노출할 수 있습니다.
                </p></div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree" style="border-bottom: 1px solid #dee2e6;">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                Q. 허위매물은 어떻게 관리 하나요?
              </button>
            </h2>
            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" >
              <div class="accordion-body"><p>A. 허위매물 신고 접수와 맛동산 의 허위매물 전담팀이 수시로 매물을 살펴보고 필터링하고 있습니다. <br><br>

                ▶ 지역구별 평균 시세를 파악해 시세에 비해 확연히 저렴한 매물이나 실사진이 아닌 사진이 포함된 경우 직접 연락을 취해 정보 수정을 요청합니다. <br><br>

                ▶ 광고 기간이 30일이 지난 매물의 경우 자동으로 비공개 처리하여 계약이 완료된 매물의 노출 가능성을 줄였고, 내부 규정에 따라 경고 및 서비스 이용 제재를 부과하고 있습니다.<br><br>

                ▶ 사용자가 직접 허위매물을 신고할 수 있도록 관련 제도를 마련하여 다방면에서 허위매물 ZERO를 위한 노력을 기울이고 있습니다.</p></div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingFour" style="border-bottom: 1px solid #dee2e6;">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                Q. 회원가입을 하면 어떤 점이 좋나요?
              </button>
            </h2>
            <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" >
              <div class="accordion-body"><p>A. 맛동산에 회원가입 후 로그인을 하시면<br><br>

                ▶ ‘관심목록'의 내용을 안전하게 저장! <br>
                원룸, 투∙쓰리룸, 오피스텔 등 다양한 매물을 살펴보는 과정에서 매물을 조회하고 찜한 내역이 무제한으로 쌓이는 ‘관심목록'의 내용을 PC와 모바일에서 동일하게 확인할 수 있습니다.<br> 또한 앱 업데이트 시에도 그 내용이 그대로 유지됩니다. <br><br>

                ▶ 단지 찜하기! <br>
                아파트 단지 찜하기는 회원님이 찜하신 매물 조건에 따라 신규 매물 등록 알림을 보내드리기 때문에 로그인 한 회원에게만 제공 가능합니다. <br>마음에 드는 아파트에 거래가능한 방이 없을지라도 해당 단지를 찜해두시면 신규매물이 등록되었을 때 당일 알림을 보내드립니다. 누구보다 빠르게 원하는 방을 찾아보세요! <br><br>

                ▶ 직거래로 방 내놓기! <br>
                공인중개사가 아닌 개인 회원도 직접 방 사진을 찍어 관련 정보를 기입, 매물을 광고할 수 있습니다. 
                </p></div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingFive" style="border-bottom: 1px solid #dee2e6;">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                Q. 맛동산에 등록된 원룸은 믿을 수 있나요?
              </button>
            </h2>
            <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" >
              <div class="accordion-body"><p>A. 맛동산은 사용자 분들에게 믿을 수 있는 정보를 제공하는 것을 최우선으로 합니다. <br><br>

                ▶ 매물의 정확한 위치를 지도 위에 표시하고, 매물 근처의 편의시설 등을 한 눈에 볼 수 있도록 하여 발품을 팔지 않고도 주변 환경까지 확인하실 수 있도록 했습니다.<br><br>

                ▶ 또한 지속적인 허위매물 관리를 통해 사용자 분들이 허위정보로 인한 불편함을 느끼지 않도록 노력하고 있습니다. </p></div>
            </div>
          </div>
        </div>
      </div>
    <LoginModal id="loginModal" @close="hideLogin" question="question"/>
    </div>
  </template>
    
  <script setup>
  import { Modal } from "bootstrap";
  import { onMounted, ref } from "vue";
  import { useRouter } from "vue-router";
  import { useStore } from "vuex";
  import LoginModal from "@/components/LoginModal.vue"
  const store = useStore();
  const router = useRouter();

  ///////////////////////////////////////////////////////////////////////////////////////////////

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

  // 로그인 안하고 문의하기 폼 누르면 로그인 모달 열기
  function requestAddress(){
    if(store.state.uemail){
      router.push("/QNA/CustomerInquiryForm")
    } else {
      // 로그인 정보가 없으면 모달 열기
      showLogin();
    }
  }
    /////////////////////////////////////////////////////////////////////////////////////////////
//   var isHoverd = ref();
//   function handleMouseOver(){
//   isHoverd.value = true;
// }

// function handleMouseOut(){
//   isHoverd.value = false;
// }
  </script>
  
  <style scoped>
    .accordion{
    --bs-accordion-btn-focus-box-shadow: none;
    --bs-border-color:none;
  }

  .accordion-button:not(.collapsed) {
  color: var(--bs-accordion-active-color);
  background-color: #ffffff;
  }

  .accordion-header>button:hover{
    color: #FEC83F;
    font-weight: bold;
  }
  .askMenu{
      background-color: transparent;
      color: black;
      border: 1px solid lightgrey;
  
    }

     .askMenu:hover{
      background-color: #2F4858;
      color: white;
      /* border: 2px solid black;  */
    }
  
     .askMenuBtn:hover{
      color: white;
    } 
  
    .selectMenu{
      background-color: #2F4858;
      color: white;
      /* border: 2px solid black; */
    }
  
    /* .selectMenu{
      color: white;
    } */

    .routerLink{
    text-decoration: none; /* 밑줄 제거 */
    color: inherit; /* 기본 텍스트 색상 상속 */
    background: none; /* 배경 제거 */
    border: none; /* 테두리 제거 */
    cursor: pointer; /* 커서 스타일 설정 */
    }
  </style>
    