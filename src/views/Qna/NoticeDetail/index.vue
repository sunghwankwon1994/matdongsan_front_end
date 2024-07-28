<template>
    <div>
      <h2 style="text-align: center; margin-top: 70px; margin-bottom: 50px; font-weight: bold">공지사항</h2>
    <div class="w-50 container">
      <div class="row me-2">
        <div class="col text-end">게시일 : {{ notice.ndate }}</div>
      </div>
      <hr>
      <div class="row me-5">
        <span class="col-2 text-center">제목</span>
        <div class="col-10">{{ notice.ntitle }}</div>
      </div>
      <hr>
      <div class="row me-5">
        <span class="col-2 mb-3 text-center mt-5" >공지 내용</span>
        <div class="col-10 w-75 mt-5 mb-5" v-html="sanitizedContent"></div>
      </div>
      
      <hr>
      <div class="row d-flex me-4" style=" justify-content: end; align-items: center; ">
        <button v-if="$store.state.userRole == 'ADMIN'" type="button btn-sm" @click="updateNotice">수정</button>
        <button v-if="$store.state.userRole == 'ADMIN'" type="button btn-sm" @click="deleteNotice">삭제</button>
        <button type="button btn-sm" @click="goBack">뒤로 가기</button>
      </div>
      </div>
      <!-- 컴포넌트 삽입 -->
    </div>
    <AgreeDeleteModal id="DeleteNoticeModal" @close="hideModal" @delete="agreeDeleteQuestion">
      <template v-slot:body>
        <div class="modal-body">
          <p class="fw-bold p-4 h-4 text-center">
            해당 공지사항을 삭제 하시겠습니까? <br />
            삭제 후에 수정 불가합니다.
          </p>
        </div>
      </template>
    </AgreeDeleteModal>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { Modal } from "bootstrap";
import { useRouter, useRoute } from "vue-router";
import AgreeDeleteModal from "@/components/AgreeDeleteModal.vue"
import qnaAPI from "@/apis/qnaAPI";
import DOMPurify from "dompurify";
const router = useRouter();
const route = useRoute();

// 쿼리에서 nnumber가져오기
const nnumber = route.query.nnumber;
const pageNo = route.query.pageNo;

const notice = ref({});

// 공지 디테일 가져오는 메소드 정의
async function getterNotice(nnumber){
  try {
    const response = await qnaAPI.getNotice(nnumber);
    notice.value = response.data
    console.log("공지 가져옴",notice.value);
  } catch (error) {
    console.log("공지 가져오기 실패",error);
  }
}

getterNotice(nnumber);

// 뒤로가기 버튼
function goBack(){
  router.push(`/QNA/Notice?pageNo=${pageNo}`);
}

// 수정하기 버튼
function updateNotice(){
  router.push({
    path:"/QNA/NoticeUpdateForm",
    query:{nnumber: notice.value.nnumber, pageNo:pageNo}
  });
}

let deleteNoticeModal = null;

onMounted(() => {
  deleteNoticeModal = new Modal(document.querySelector("#DeleteNoticeModal"));
});

// 모달 닫기
function hideModal() {
  deleteNoticeModal.hide();
}

// 삭제 버튼 클릭 시 확인하는 모달 켜짐
function deleteNotice() {
  deleteNoticeModal.show();
}

// 모달에서도 최종적으로 삭제버튼을 누를 경우
async function agreeDeleteQuestion(){
  console.log("nnumber 확인: ",nnumber);
  // 삭제 하는 axios 작성
  try {
    await qnaAPI.deleteDetailNotice(nnumber);
    console.log("삭제 완료");
    hideModal();
    router.push({path: "/QNA/Notice"}); // 삭제하면 리스트 돌아가기
  } catch (error) {
    console.log("삭제 실패",error);
  }
}

//태그가 출력되는 것을 html태그로 인식하도록 바꾸는 함수
const sanitizedContent = computed(() => {
  return DOMPurify.sanitize(notice.value.ncontent);
});

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

button, input, textarea{
  border: transparent;
  border-radius: 10px;
  padding: 5px;
  width: 10%;
  height: 40px;
  font-size: small
}

button {
  background-color: #2F4858;
  color: white;
  margin-right: 10px;
}
</style>
