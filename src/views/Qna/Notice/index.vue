<template>
  <div>
    <div class="container w-50">
    <h2 style="text-align: center; margin-top: 70px; margin-bottom: 50px; font-weight: bold">공지사항</h2>
      <!-- 버튼 tab -->
      <div class="row" style="height: 50px;">
          <RouterLink to="/QNA/Notice" class="" :class="isHoverd? 'askMenu col-4 d-flex' : 'selectMenu col-4 d-flex'" style="text-decoration: none; padding: none;">
            <button :class="isHoverd? 'askMenuBtn':'selectMenu'" style="background-color: transparent; border: none; width: 100%;">공지 사항</button>
          </RouterLink>
  
          <div @click="requestAddress" class="askMenu col-4 d-flex" style="text-decoration: none;" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
            <button class="askMenuBtn" style="background-color: transparent; border: none; width: 100%;">1:1 문의</button>
          </div>
          
          <RouterLink to="/QNA/FAQ" class="askMenu col-4 d-flex" style="text-decoration: none;" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
            <button class="askMenuBtn" style="background-color: transparent; border: none; width: 100%;">자주 묻는 질문</button>
          </RouterLink>
        </div>
</div>
    <NoticeListFilter :noticeFilter="noticeFilter" />
    <NoticeList :noticeList="page.notice" :currentPage="currentPage" />
    <Pagination
      v-if="page.pager.totalPageNo != 0"
      :currentPage="currentPage"
      :totalPages="totalPageNo"
      page="notice"
      @update:currentPage="handlePageChange"
    />
    <div v-else class="w-50 container">
        <div class="text-center">
          검색 결과가 없습니다.
        </div>
      </div>
    <LoginModal id="loginModal" @close="hideLogin" question="question"/>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import NoticeList from "./NoticeList";
import NoticeListFilter from "./NoticeListFilter";
import LoginModal from "@/components/LoginModal.vue"
import Pagination from "@/components/Pagination";
import { useRoute, useRouter } from "vue-router";
import qnaAPI from "@/apis/qnaAPI";
import { Modal } from "bootstrap";
import { useStore } from "vuex";
const route = useRoute();
const store = useStore();
const router = useRouter();

let currentPage = ref(1);
let totalPageNo = ref();

const pageNo = ref(1);
pageNo.value = route.query.pageNo;

if(pageNo.value){
  console.log("공지사항 쿼리 값 있음");
  currentPage.value = pageNo.value;
} 

// DB에서 가져온 리스트
const page = ref({
    notice : [],
    pager : {}
  });

// 공지사항 필터 초기 값
let noticeFilter = ref({
  searchKeyword: "",
  sort: "desc",
});

watch(
  noticeFilter,
  (newNoticeFilter) => {
    // noticeFilter 변경 시 필요한 동작 수행
    console.log("필터 변경:", noticeFilter.value);
    currentPage.value = 1; // 첫 페이지로 이동
    getAllNoticeList(currentPage.value, noticeFilter.value.searchKeyword, noticeFilter.value.sort);
    // 필터 변경 시 리스트 다시 요청
  },
  { deep: true }
);

// 현재 페이지 변경 핸들러
const handlePageChange = (page) => {
  currentPage.value = page;
  router.push(`/QNA/Notice?pageNo=${currentPage.value}`);
  // 검색어랑 정렬 값도 보내야 하나?
};

// 페이지가 변하면 게시물 가져오는 메소드 실행하기
watch(currentPage, () => {
  console.log("페이지가 변하면 게시물 가져오는 메소드 실행");
  console.log("index 현재 페이지", currentPage.value);
  getAllNoticeList(currentPage.value, noticeFilter.value.searchKeyword, noticeFilter.value.sort);
})

// // 페이지가 변하면 게시물 가져오는 메소드 실행하기
// watch(pageNo, () => {
//   console.log("페이지가 변하면 게시물 가져오는 메소드 실행");
//   console.log("index 현재 페이지", currentPage.value);
//   getAllNoticeList(currentPage.value, noticeFilter.value.searchKeyword, noticeFilter.value.sort);
// })


// 필터 변경 핸들러??필요한가..
// const handleFilterChange = (newFilter) => {
//   noticeFilter.value = newFilter;
//   currentPage.value = 1; // 필터 변경 시 첫 페이지로 이동
// };

//리스트 가져오는 메소드 정의
async function getAllNoticeList(pageNo, searchKeyword, sort){

  try {
    const response = await qnaAPI.getNoticeList(pageNo, searchKeyword, sort);
    page.value.notice = response.data.notice;
    page.value.pager = response.data.pager;
    totalPageNo.value = page.value.pager.totalPageNo;
    console.log("공지 첫번째: ",page.value.notice[0]);
  } catch (error) {
    console.log("공지 리스트 안 가져옴",error);
  }
}

// 리스트 가져오기
getAllNoticeList(currentPage.value, noticeFilter.value.searchKeyword, noticeFilter.value.sort);

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
// var isHoverd = ref();
// function handleMouseOver(){
//   isHoverd.value = true;
// }

// function handleMouseOut(){
//   isHoverd.value = false;
// }

</script>

<style scoped>
 .askMenu{
      background-color: transparent;
      color: black;
      border: 1px solid lightgrey;
  
    }

     .askMenu:hover{
      background-color: #2F4858;
      color: white;
      /* border: 2px solid white  */
    }
  
     .askMenuBtn:hover{
      color: white;
    } 
  
    .selectMenu{
      background-color: #2F4858;
      color: white;
      /* border: 2px solid white; */
    }
  
    .selectMenu{
      color: white;
    }

    .routerLink{
    text-decoration: none; /* 밑줄 제거 */
    color: inherit; /* 기본 텍스트 색상 상속 */
    background: none; /* 배경 제거 */
    border: none; /* 테두리 제거 */
    cursor: pointer; /* 커서 스타일 설정 */
}</style>
