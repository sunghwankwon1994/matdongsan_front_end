<template>
    <div>
      <h2 style="text-align: center; margin-top: 70px; margin-bottom: 50px; font-weight: bold">허위매물 신고</h2>
    <div class="w-50 container">
      <div class="row me-2">
        <div class="col text-end">게시일 : {{ reportFalse.date }}</div>
      </div>
      <div class="row me-2">
        <div class="col text-end">작성자 : {{ reportFalse.user }}</div>
      </div>
      <hr>
      <div class="row me-5">
        <span class="col-2 text-center">매물 번호</span>
        <div class="col-10">{{ reportFalse.propertyNumber }}</div>
      </div>
      <hr>
      <div class="row me-5">
        <span class="col-2 text-center">제목</span>
        <div class="col-10">{{ reportFalse.title }}</div>
      </div>
      <hr>
      <div class="row me-5">
        <span class="col-2 mb-3 text-center mt-5" >공지 내용</span>
        <div class="col-10 w-75 mt-5 mb-5">{{ reportFalse.content }}</div>
      </div>
      
      <hr>
      <div class="row d-flex me-4" style=" justify-content: end; align-items: center; ">
        <button type="button btn-sm" @click="goBack">뒤로 가기</button>
      </div>
      <!-- <form @submit.prevent="hanndleSubmit">
        <div class="row me-5">
          <span class="col-2 mb-3 text-center mt-3" >답변</span>
          <div class="col-10">
          <VueQuillEditor class=" " v-model="answer" />
        </div>
        </div>
        
        
        <div class="row d-flex me-4" style=" justify-content: center; align-items: end; ">
          <button class="mt-3" type="submit">답변 완료</button>
        </div>
        <div class="row me-5">
          <span class="mt-3 ms-2 text-center" >{{errorMessage}}</span>
        </div>
      </form> -->
      </div>
      <!-- 컴포넌트 삽입 -->
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import VueQuillEditor from "@/components/VueQuillEditor.vue";
import { error } from "jquery";

const router = useRouter();

const reportFalse = ref({
  user: "abc123@gmail.com",
  title:"허위매물신고 제목 test",
  content:"허위매물신고 내용 test 허위매물신고 내용 test 허위매물신고 내용 test 허위매물신고 내용 test 허위매물신고 내용 test 허위매물신고 내용 test 허위매물신고 내용 test 허위매물신고 내용 test 허위매물신고 내용 test ",
  date : "2024-04-23",
  propertyNumber: 8,
});

// 추가 정보 필요한가?
const falseProperty = ref({
  propertyTitle :"경찰병원 역 1번 출구 5분거리 오피스텔",
})

const answer = ref("");

function goBack(){
  router.back();
}

const checkForm = computed(() => {
  var result = answer.value !== ""
  return result;
});

const errorMessage = ref("");

function hanndleSubmit(){
  if(checkForm.value){
    // 통신 코드...

    // 완료 하면 뒤로가기
    goBack();

  } else {
    errorMessage.value = "답변을 입력하세요"
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
