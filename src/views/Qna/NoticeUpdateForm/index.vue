<template>
    <div>
      <h2 style="text-align: center; margin-top: 70px; margin-bottom: 50px; font-weight: bold">공지사항</h2>
    <div class="w-50 container">
      <!-- <hr>
      <div class="row me-5">
        <span class="col-2" style="text-align: center;">카테고리</span>
        <select class="col-10" name="sortType" id="sortType" style="border-radius: 15px; height: 35px; border: 1px solid black; padding-left: 10px; background-color: transparent;">
          <option value="sort1">카테고리</option>
          <option value="sort2">정렬2</option>
          <option value="sort3">정렬3</option>
        </select>
      </div> -->
      <hr>
      <form @submit.prevent="handleSubmit">
      <div class="row me-5">
        <span class="col-2 text-center">제목</span>
        <input class="col-10" type="text" name="askTitle" maxLength="100" v-model="notice.ntitle"> 
      </div>
      <hr>
      <div class="row me-5">
        <span class="col-2 mb-3 text-center" >공지 내용</span>
      </div>
      <div class="row me-5 container ms-2">
        <VueQuillEditor class="col " v-model="notice.ncontent" />
      </div>
      <!-- <hr>
      <div class="row me-5">
        <span class="col-2" style="text-align: center;">사진</span>
        <div class="col-10">
          <div name="askAttach" style="border: 1px solid gray; height: 106px; width:106px; justify-content: center; align-items: center;" class="d-flex flex-column"><i class="fa-solid fa-camera"></i><span>사진첨부</span></div>
          <div>
            <span>- 사진 용량은 사진 한 장당 10MB가지 등록이 가능합니다.</span><br>
            <span>- 사진은 최대 3장까지 등록이 가능합니다.</span>
          </div>
        </div>
      </div> -->
      
      <hr>
      <div class="row d-flex" style=" justify-content: center; align-items: center; ">
        <button type="submit" style="background-color: #2F4858; color: white; width: 216px; height: 52px;" :disabled="!checkForm">수정 하기</button>
      </div>
    </form>
      </div>
      <!-- 컴포넌트 삽입 -->
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import VueQuillEditor from "@/components/VueQuillEditor.vue";
import qnaAPI from "@/apis/qnaAPI";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

// 쿼리에서 받아온 데이터
const nnumber = route.query.nnumber;

// DB에서 가져온 데이터
const notice = ref({});

// 기존 공지 가져오는 메소드 정의
async function getNoticeDetail(nnumber){
  try {
    const response = await qnaAPI.getNotice(nnumber);
    notice.value = response.data;
    console.log(notice.value);
  } catch (error) {
    console.log("수정 할 공지 안가져와 짐",error);
  }
}
// 기존 공지 가져오기
getNoticeDetail(nnumber)

// 공지 수정하는 메소드 정의
async function updateNewNotice(formData){
  try {
    const response = await qnaAPI.updateNotice(formData);
    console.log("수정 한 데이터",response.data);
    console.log("공지 수정 됨");
    // router.back();
    router.push({
    path: "/QNA/noticedetail",
    query: {nnumber: nnumber}
  }); // 수정 하면 디테일 페이지로 가기
  } catch (error) {
    console.log("수정한 공지 수정 안됨",error);
  }
}

// 수정 제출함수
function handleSubmit(){
  console.log(JSON.parse(JSON.stringify(notice.value)));
  // content에 p태그 붙는거 삭제하기
  
  const formData = new FormData();
  formData.append("ntitle",notice.value.ntitle);
  // const pattern = /<[^>]*>/g;
  //   const ncontent = notice.value.ncontent.replace(pattern, '');
  formData.append("ncontent",notice.value.ncontent);
  formData.append("nnumber",notice.value.nnumber);
  updateNewNotice(formData);
  // 이 밑의 실행문은 만들지 말기 -> update메소드에서 디테일로 페이지 이동 함
}

// 제목, 내용이 없으면 제출버튼 비활성화
const checkForm = computed(() => {
  var result = notice.value.ntitle !== "" && notice.value.ncontent !== "";
  console.log('result: ',result);
  return result;
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
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
}

</style>
