<template>
  <div class="d-flex w-100 mx-auto">
    <MyPageSidebar />
    <div class="titleNcontent w-75 mx-auto min-vh-100">
      <div class="d-flex justify-content-between mt-2 mb-3">
        <h4 class="fw-bold">1:1 문의</h4><span style="font-size: small; text-align: start;">답변이 있는 문의는 수정 및 삭제가 불가능 합니다.</span>
        <div>
           <router-link to="/QNA/CustomerInquiryForm">
            <button type="button" class="btn btn-warning me-1">
              1:1 문의하기
            </button>
          </router-link>
        </div>
      </div>
      <hr>
      <table class="table text-center">
        <thead class="">
          <tr>
            <th scope="col">번호</th>
            <th scope="col">문의 사진</th>
            <th scope="col">제목</th>
            <th scope="col">등록일</th>
            <!-- <th>상세</th> -->
            <th scope="col">답변상태</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in page.question" :key="item.qnumber">
            <th scope="row" class="text-center align-middle">
              {{ item.qnumber }}
            </th>
            <td class="align-middle text-center">
              <img v-if="qattach[item.qnumber] != null" :src="qattach[item.qnumber]" 
              width="150" height="150" alt="문의 사진" class="rounded-1"/>
            </td>
            <td class="align-middle text-muted text-center">
              <div><small>{{ item.qtitle }}</small></div>
            </td>
            <td class="fw-bold align-middle text-center"> {{ item.qdate }}</td>
            <td class="fw-bold align-middle">
              <div class="d-flex flex-column buttons-box mx-auto">
                <div class="btn btn-dark btn-sm w-100 fw-bold mb-3 border-0" :class="item.qisAnswer == 1 ? 'bg-warning' : 'bg-success'" style="cursor:default">{{ hasAnswer(item.qisAnswer) }}</div>                
                <div class="btn btn-sm fw-bold text-white" style="background-color: #2f4858;" @click="goDetail(item.qnumber, item.qunumber)" >상세보기</div>                
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
      v-if="page.pager.totalPageNo != 0"
      :currentPage="currentPage"
      :totalPages="totalPages"
      page="myCustomerInquiry"
      @update:currentPage="handlePageChange"
    />
    <div v-else class="w-75 container">
      <div class="text-center mt-5 mb-5">
        문의가 없습니다.
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

import MyPageSidebar from "@/components/MyPageSidebar.vue";
import qnaAPI from "@/apis/qnaAPI";
import Pagination from "@/components/Pagination";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";


const router = useRouter();
const route = useRoute();

let currentPage = ref(1);
let totalPages = ref();

const pageNo = route.query.page;

if(pageNo != null){
  currentPage.value = pageNo;
}

let qattach = ref({});
console.log("index 현재 페이지", currentPage.value);

// DB에서 가져온 리스트
const page = ref({
  question : [],
  pager : {},
});



// 게시물 첨부 가져오기
async function getImage(qnumber){
  
    const response = await qnaAPI.getAttach(qnumber);
    qattach.value[qnumber] = URL.createObjectURL(response.data);
    console.log("실행은 됨");
  

}
function handlePageChange(page){
    currentPage.value = page;
    router.push(`/Mypage/CustomerInquiry?page=${currentPage.value}`);
  }

// 고객의 문의 리스트 가져오기 함수 정의
async function getList(){
  console.log("고객의 문의 리스트 가져오기 실행");
  try {
    const response = await qnaAPI.getQuestionListForUser(currentPage.value);
    page.value.question = response.data.question;
    page.value.question.forEach(question => {
      if (question.qattachoname != null) {
        getImage(question.qnumber);
      }
      question.qdate = dayjs(page.value.question.qdate).format('YYYY-MM-DD');
    });


    page.value.pager = response.data.pager;
    totalPages.value = page.value.pager.totalPageNo
    console.log("가져온 첫번째 문의 객체", page.value.question[0].qattach);
  } catch (error) {
    console.log(error);
  }

  console.log("뭐나옴",page.value.question);
}

// 리스트 가져오기
getList();

// 리스트 누르면 디테일 들어가기 
function goDetail(qnumber, qunumber){
  router.push({
    path: "/CustomerInquiryDetail",
    query: {qnumber, qunumber}
    }
  )
}

// 페이지가 변하면 게시물 가져오는 메소드 실행하기
watch(currentPage, () => {
  console.log("페이지 변함 감지");
  getList();
})

// 답변 여부 반환
function hasAnswer(isAnswer){
  if(isAnswer == 1 ){
    return "답변 완료";
  } else {
    return "답변 미완료";
  }
}
</script>

<style scoped>
.titleNcontent {
  width: 80%;
  padding: 20px;
}
table {
  width: 100%;
  margin-top: 20px;
}
.buttons-box{
  width: 130px;
}
</style>