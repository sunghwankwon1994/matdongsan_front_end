<template>
  <div>
    <h2 style="text-align: center; margin-top: 70px; margin-bottom: 50px; font-weight: bold">고객 문의</h2>
  <div class="w-50 container pb-5">
    <div class="row">
    <div class="col align-content-end">
      <div> 문의 유형: {{ category(customerInquiry.qcategory) }}</div>
    </div>
    <div class="col">
      <div class="row me-2">
        <div class="col text-end">게시일 : {{ formatDate(customerInquiry.qdate) }}</div>
      </div>
      <div class="row me-2">
        <div class="col text-end">작성자 : {{ qWriter }}</div>
      </div>
    </div>
  </div>
    <hr>
    <div class="row me-5">
      <span class="col-2 text-center">제목</span>
      <div class="col-10">{{ customerInquiry.qtitle }}</div>
    </div>
    <hr>
    <div class="row me-5">
      <span class="col-2 mb-3 text-center align-content-center mt-5" >문의 내용</span>
      <div class="col-10 w-75 mt-5 mb-5">
        <div class="ms-2" v-html="sanitizedQuestionContent"></div>
        <img class="mt-5 ms-2 " v-if="qAttach != null" width="150" :src="qAttach"/><div class="mt-5" v-else> *첨부 파일 없음</div>
      </div>
    </div>
    <!-- <hr> -->
    <!-- <div class="row me-5">
      <span class="col-2 mb-3 text-center mt-5" ></span>
      <div class="col-10 w-75 mt-5 mb-5"></div>
    </div> -->
    
    <hr>
    <!-- 답변 폼 관리자로 로그인 하고 답변이 없을 때만 보이게 하기 -->
    <div v-if="$store.state.userRole == 'ADMIN' && getAnswer == '' ">
      <!-- <answerForm /> -->
      <form @submit.prevent="handleInsertSubmit">
        <div class="row me-5">
          <span class="col-2 mb-3 text-center mt-3" >답변 ↳</span>
          <div class="col-10">
          <VueQuillEditor  v-model="answer.content" />
          </div>
        </div>
        
        <div class="row d-flex me-4" style=" justify-content: center; align-items: end; ">
          <button class="mt-3" type="submit" :disabled="!checkForm">답변 완료</button>
        </div>
        
      </form>
    </div>
    <!-- 답변이 있으면 답변 보여주기(관리자도 회원도 볼 수 있는 ui)-->
    <div v-if=" getAnswer != '' ">
      <div class="row me-5">
        <span class="col-2 mb-3 text-center mt-3" >답변 ↳</span>
        <div class="col-10 mb-3 mt-3">
          <div v-html="sanitizedAnswerContent"></div>
        </div>
      </div>
      <div v-if="!openUpdate" class="row me-5 mt-5 mb-5 justify-content-end">
        <div class="col-2 btn btn-sm btn-warning me-2" type="button" @click="goBack">뒤로가기</div>
        <!-- 답변이 달리면 회원은 수정이나 삭제를 할 수 없다. -->
        <div v-if="$store.state.userRole == 'ADMIN'" class="col-3 btn btn-sm btn-success me-2" type="button" @click="updateAnswer">답변 수정하기</div>
        <div v-if="$store.state.userRole == 'ADMIN'" class="col-3 btn btn-sm btn-success me-2" type="button" @click="deleteAnswer">답변 삭제하기</div>
      </div>
    </div>
    <!-- 답변 폼 관리자로 로그인 하고 수정버튼을 클릭 했을 때만 보이게 하기 -->
     <!-- 수정 버튼은 관리자만 클릭 할 수 있다. -->
    <div v-if="openUpdate">
      <!-- <answerForm /> -->
      <hr>
      <form @submit.prevent="handleUpdateSubmit">
        <div class="row me-5 mt-5">
          <span class="col-2 mb-3 text-center mt-3" >수정할 답변</span>
          <div class="col-10">
          <VueQuillEditor  v-model.trim="answer.content" />
          </div>
        </div>
        
        <div class="row d-flex me-4" style=" justify-content: center; align-items: end;">
          <button class="mt-3 me-2" type="button" @click="goBack">뒤로가기</button>
          <button class="mt-3" type="submit" :disabled="!checkForm">수정 완료</button>
        </div>
      </form>
    </div>
    <!-- 답변이 없으면 문의 수정 삭제가 가능 -->
    <div v-if="getAnswer == '' && $store.state.userRole != 'ADMIN'">
      <div class="row d-flex me-4" style=" justify-content: center; align-items: end;">
        <button class="mt-3 me-2" type="button" @click="goBack">뒤로가기</button>
        <button class="mt-3 me-2" type="button" @click="updateQuestion">수정</button>
        <button class="mt-3" type="button" @click="deleteQuestion">삭제</button>
      </div>
    </div>
    </div>
    <!-- 모달 컴포넌트 삽입 -->
    <AgreeDeleteModal id="DeleteAnswerModal" @delete="agreeDeleteAnswer" @close="hideAnswerModal">
    <template v-slot:body>
        <div class="modal-body">
          <p class="fw-bold p-4 h-4 text-center">
            해당 답변을 삭제 하시겠습니까? <br />
            삭제 후에 수정 불가합니다.
          </p>
        </div>
      </template>
  </AgreeDeleteModal>
  <AgreeDeleteModal id="DeleteQuestionModal" @delete="agreeDeleteQuestion" @close="hideQuestionModal">
    <template v-slot:body>
        <div class="modal-body">
          <p class="fw-bold p-4 h-4 text-center">
            해당 문의을 삭제 하시겠습니까? <br />
            삭제 후에 수정 불가합니다.
          </p>
        </div>
      </template>
  </AgreeDeleteModal>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import qnaAPI from "@/apis/qnaAPI";
import VueQuillEditor from "@/components/VueQuillEditor.vue";
import AgreeDeleteModal from "@/components/AgreeDeleteModal.vue"
import { Modal } from "bootstrap";
import DOMPurify from "dompurify";

const router = useRouter();
const route = useRoute();

// 쿼리에서 가져온 qnumber, qunumber
const qnumber = route.query.qnumber;
const qunumber = route.query.qunumber;

// 문의 가져오기
const customerInquiry = ref({});
const qWriter = ref();
const qAttach = ref();

// 답변 가져오기
const getAnswer = ref({});

// 뒤로가기
function goBack(){
    router.back();
}

// Question Read ///////////////////////////////////////////////////////////////////////////////////
// 문의 내용 가져오기
async function getQuestion(){
  try {
    const response = await qnaAPI.readQuestion(qnumber,qunumber);  
    customerInquiry.value = response.data;
    console.log("가져온 문의 객체: ",customerInquiry.value);
  } catch (error) {
    console.log(error);
  }
  
}

//태그가 출력되는 것을 html태그로 인식하도록 바꾸는 함수
const sanitizedQuestionContent = computed(() => {
  return DOMPurify.sanitize(customerInquiry.value.qcontent);
});

// 작성자 가져오기
async function getWriter(){
  try {
    const responseWriter = await qnaAPI.getWriter(qunumber);
    qWriter.value = responseWriter.data;
    console.log("작성자: ", qWriter.value);
  } catch (error) {
    console.log(error);
  }
  
}

// 첨부파일 가져오기
async function getAttach(){
  try {
    console.log("실행 첨부");
    const responseAttach = await qnaAPI.getAttach(qnumber);
    const blob = responseAttach.data;
    qAttach.value = URL.createObjectURL(blob);
    console.log("첨부파일: ", qAttach.value);
  } catch (error) {
    console.log("실행 첨부 실패");

    console.log(error);
  } 
}

// 날짜 형식 맞추기
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function category(qcategory){
  if(qcategory == "useage"){
    return "서비스 이용문의";
  } else if(qcategory == "reportFalse"){
    return "허위매물 신고";
  }else if(qcategory == "complex"){
    return "단지정보 문의";
  }else if(qcategory == "etc"){
    return "기타 문의";
  }else if(qcategory == "failure-error"){
    return "장애/오류 신고";
  }
}

// 문의 정보 불러오기
getWriter()
getQuestion()
getAttach()

// 답변 제출하기 ////////////////////////////////////////////////////////////////////////////

const answer = ref({});

// 답변이 비어있으면 제출 버튼 비활성화
const checkForm = computed(() => {
  var result = answer.value.content !== ""
  return result;
  });

  // 답변 제출 
async function handleInsertSubmit(){
  console.log("생성 폼 제출 함수 실행");
  try {
    const formData = new FormData();
    // const pattern = /<[^>]*>/g;
    // const acontent = answer.value.content.replace(pattern, '');
    formData.append("acontent",answer.value.content);
    formData.append("aQnumber",qnumber);
    await qnaAPI.createAnswer(formData);
    console.log("답변 생성 성공");
    router.go(0) // 새로고침 -> 추후 수정
  } catch (error) {
    console.log("답변 생성 실패",error);
  }
}

// 답변 가져오기 /////////////////////////////////////////////////////////////////////
async function readAnswer(aQnumber){
  try {
    const response = await qnaAPI.getAnswerByQnumber(aQnumber);
    getAnswer.value = response.data;
    console.log("답변 가져오기 성공");
    console.log(getAnswer.value);
  } catch (error) {
    console.log("답변 가져오기 실패",error);
  }
}

readAnswer(qnumber);

//태그가 출력되는 것을 html태그로 인식하도록 바꾸는 함수
const sanitizedAnswerContent = computed(() => {
  return DOMPurify.sanitize(getAnswer.value.acontent);
});

// 답변 수정하기 /////////////////////////////////////////////////////////////////////
let openUpdate = ref(false);

// 답변 작성란 나오게 하기
function updateAnswer(){
  openUpdate.value = !openUpdate.value
}

// 수정 할 답변 제출 
async function handleUpdateSubmit(){
  console.log("수정 폼 제출 함수 실행");
  try {
    
    const formData = new FormData();
    // const pattern = /<[^>]*>/g;
    // const acontent = answer.value.content.replace(pattern, '');
    formData.append("acontent",answer.value.content);
    formData.append("aQnumber",qnumber);
    await qnaAPI.updateAnswer(formData);
    console.log("수정답변 생성 성공");
    router.go(0) // 새로고침 -> 추후 수ㅈ정
  } catch (error) {
    console.log("수정답변 생성 실패",error);
  }
}

// 답변 삭제하기 /////////////////////////////////////////////////////////////////////
// 
let deleteAnswerModal = null;

onMounted(() => {
  deleteAnswerModal = new Modal(document.querySelector("#DeleteAnswerModal"));
});

// 모달 닫기
function hideAnswerModal() {
  deleteAnswerModal.hide();
}

// 삭제 버튼 클릭 시 확인하는 모달 켜짐
function deleteAnswer(){
  deleteAnswerModal.show();
}

// 모달에서도 최종적으로 삭제버튼을 누를 경우 삭제 실행
async function agreeDeleteAnswer(){
  console.log("매개변수 값 확인 anumber: ",getAnswer.value.anumber,"qnumber: ", getAnswer.value.aqnumber);
  // 삭제 하는 axios 작성
  try {
    await qnaAPI.deleteAnswerByAQnumber(getAnswer.value.anumber, getAnswer.value.aqnumber);
    console.log("삭제 완료");
    hideAnswerModal();
    goBack();
  } catch (error) {
    console.log("삭제 실패",error);
  }
}

// 문의 수정 //////////////////////////////////////////////////////////////////////////////
// 문의 수정하는 페이지로 이동
function updateQuestion(){
  router.push({
      path: "/Qna/CustomerInquiryUpdateForm",
      query: {qnumber: qnumber, qunumber: qunumber}
    });
}
// 문의 삭제 ///////////////////////////////////////////////////////////////////////////////
// 삭제할거냐는 모달 띄우기
function deleteQuestion(){
  deleteQuestionModal.show();
}

let deleteQuestionModal = null;

onMounted(() => {
  deleteQuestionModal = new Modal(document.querySelector("#DeleteQuestionModal"));
});

// 모달 닫기
function hideQuestionModal() {
  deleteQuestionModal.hide();
}

// 모달에서도 삭제하기를 누르면 최종적으로 삭제 실행
async function agreeDeleteQuestion(){
  try {
    await qnaAPI.deleteQuestion(qnumber,qunumber);
    hideQuestionModal();
    router.back()
  } catch (error) {
    console.log(error);
  }
}

</script>

<style scoped>
.askMenu{
background-color: transparent;
color: black;
border: none;
}

.askMenu:hover{
background-color: #2F4858;
color: white;
border: 2px solid black;
}

.askMenuBtn:hover{
color: white;
}

button {
background-color: #2F4858;
color: white;
border: transparent;
border-radius: 10px;
padding: 5px;
width: 10%;
/* margin-right: 100px; */
height: 40px;
font-size: small
}

input {
border: 1px solid lightgray;
height: 120px;
border-radius: 10px;
}


</style>
