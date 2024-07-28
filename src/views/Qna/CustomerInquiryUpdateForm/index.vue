<template>
  <div>
  
  <h2 style="text-align: center; margin-top: 70px; margin-bottom: 20px; font-weight: bold">문의 수정하기</h2>

  <p style="text-align: center; margin-top: 20px; margin-bottom: 50px;">맛동산에 궁금하신 점을 문의해주세요 <br>
    문의 내용과 답변은 <span style="color:#FEC83F; font-weight: bold">'1:1 문의 내역'</span>에서 확인하실 수 있습니다.</p>
  <div class="w-50 container">
    <hr>
    <form @submit.prevent="handleSubmit">
    <div class="row me-5">
      <span class="col-2" style="text-align: center;">문의 유형</span>
      <select name="askType" id="askType" class="col-10" v-model="customerInquiry.qcategory">
        <option value="" disabled hidden selected>문의 유형을 선택하세요</option>
        <option value="useage">서비스 이용문의</option>
        <option value="reportFalse">허위매물 신고</option>
        <option value="complex">단지정보 문의</option>
        <option value="etc">기타 문의</option>
        <option value="failure-error">장애/오류 신고</option>
      </select>
    </div>
    <hr>
    <div class="row me-5">
      <span class="col-2" style="text-align: center;">제목</span>
      <input class="col-10" type="text" name="askTitle" maxLength="100" v-model="customerInquiry.qtitle">
    </div>
    <hr>
    <div class="row me-5">
      <span class="col-2 mb-3 text-center" >문의 내용</span>
    </div>
    <div class="row me-5 container ms-2">
      <VueQuillEditor class="col " v-model="customerInquiry.qcontent" />
    </div>
    <hr>
    <div class="row me-5">
      <span class="col-2" style="text-align: center;">사진</span>
      <div class="col-10">
        
        <div class="row">
        <!-- <div class="col-4">
          <input type="file" id="agentProfile" ref="qattach" @change="changeAttach">
          <label class="agentProfile-label border border-1 border-secondary me-5" for="agentProfile">
              <div class="x border border-1 border-secondary"></div>
              <div class="y border border-1 border-secondary"></div>
          </label>
          
      </div> -->
      <ImagePreview
        imagePurpose="single"
        @update:image="handleSingleImageUpdate"
        class="mt-3 mb-3"
      />
            <img class="col-3" v-if=" qattach == null" width="150" :src="getQattach"/>
            <div class="col-5"></div>
          </div>
        <div style="margin-top: 10px">
          <span>- 사진 용량은 최대 10MB까지 등록이 가능합니다.</span><br>
          <span>- 사진은 1장만 등록 가능합니다.</span>
        </div>
      </div>
    </div>
    <hr>
    <div class="row d-flex" style=" justify-content: center; align-items: center; ">
      <button type="submit" class="btn" style="background-color: #2F4858; color: white; width: 216px; height: 52px; border: none; border-radius: 10px;" :disabled="!checkForm">수정하기</button>
    </div>
    <div class="row d-flex" style="border: 1px solid gray; border-radius: 10px; margin-left: 150px; margin-right: 150px; margin-top: 20px">
      <p style="text-align: center; margin-top: 15px">고객센터: 02-1899-6840</p><br>
      <span style="text-align: center; margin-bottom: 15px;">평일 10:00 ~ 18:30 (토, 일요일, 공휴일 휴무)</span>
    </div>
  </form>
    </div>
    <!-- 컴포넌트 삽입 -->
  </div>

</template>

<script setup>
import ImagePreview from "@/components/ImagePreview.vue"; // ImagePreview 컴포넌트 가져오기
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import VueQuillEditor from "@/components/VueQuillEditor.vue";
import qnaAPI from "@/apis/qnaAPI";


const route = useRoute();
const router = useRouter();

// 폼에서 가져온 문의 객체
const customerInquiry = ref({});

// 폼에서 받아온 문의 이미지
const qattach = ref(null);
const imageFiles = ref(null);

// DB에서 가져온 문의 이미지
const getQattach = ref();

// 쿼리에서 가져온 qnumber, qunumber
const qnumber = route.query.qnumber;
const qunumber = route.query.qunumber;



// 수정할 문의 내용 가져오는 함수 정의
async function getQuestion(qnumber,qunumber){
  try {
    const response = await qnaAPI.readQuestion(qnumber,qunumber);  
    customerInquiry.value = response.data;
    console.log("문의 객체: ",customerInquiry.value);
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
  getQattach.value = URL.createObjectURL(blob);
  console.log("첨부파일: ", getQattach.value);
} catch (error) {
  console.log("실행 첨부 실패");

  console.log(error);
} 
}

getQuestion(qnumber,qunumber);
getAttach();


// 문의 타입, 제목, 내용이 없으면 제출버튼 비활성화
const checkForm = computed(() => {
  var result = customerInquiry.value.type !== "" && customerInquiry.value.title !== "" && customerInquiry.value.content !== "";
  console.log('result: ',result);
  return result;
});

// 폼 제출
async function handleSubmit(){
  //multipartFile 분해 해서 문자 데이터랑 같이 담을 formData 객체 생성
  const formData = new FormData();

  console.log("제출 시작때 문의 객체 검사: ",customerInquiry.value);

  // content에 p태그 붙는거 삭제하기
  

  // 문자 데이터 formData에 넣기
  formData.append("qcategory", customerInquiry.value.qcategory);
  formData.append("qtitle", customerInquiry.value.qtitle);
  // const pattern = /<[^>]*>/g;
  // const qcontent = customerInquiry.value.qcontent.replace(pattern, '');
  formData.append("qcontent", customerInquiry.value.qcontent);
  formData.append("qnumber", customerInquiry.value.qnumber);
  formData.append("qUnumber", customerInquiry.value.qunumber);
  if(qattach.value != null){
    formData.append("qattach", qattach.value[0]);
  }
  // const elAttach = qattach.value;
  // console.log("첨부 데이터",elAttach);

  // // 파일 데이터 formData에 넣기
  // if(elAttach != null){

  //   for(var i=0; i<qattach.value.files.length; i++){
  //     formData.append("qattach", elAttach.files[i]);
  //   }
  //   //console.log("attach에 파일 들어옴", qattach.value.files[0].name); // 이름만 추출(바이트 배열은 file객체 자체에 저장되어있음)
  // }
  // console.log("FileList로 나옴",qattach.value.files.length);
  console.log("FileList로 나옴",qattach.value);
  console.log("customerInquiry: ", customerInquiry.value);

  // 고객문의 수정
  try {
    await qnaAPI.updateQuestion(formData);
    console.log("수정 성공");
    router.back();  
  } catch (error) {
    console.log("수정 실패");
    console.log(error);
  }

}

// // 파일을 읽고 URL을 반환하는 함수
// const readFile = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       resolve({ file, src: e.target.result }); // 파일과 데이터 URL을 포함한 객체 반환
//     };
//     reader.onerror = reject;
//     reader.readAsDataURL(file); // 파일의 데이터 URL을 읽기 시작
//   });
// };

// // input태그에 이미지 들어오면 실행
// const changeAttach = async (event) => {
//   console.log("profile실행");
//   const file = qattach.value.files[0]; // 선택된 파일 가져오기

//   if (file) {
//     try {
//       const newImage = await readFile(file); // 파일 읽기
//       imageFiles.value = newImage; // imageFiles에 할당
//     } catch (error) {
//       console.error("파일을 읽는 중 오류 발생:", error);
//     }
//   }
// };

function handleSingleImageUpdate(files) {
  console.log('Received single image files:', files);
  if(files.length == 0){
    qattach.value = null;
    console.log("첨부파일 없음");
  }else{
    qattach.value = files;  // 단일 이미지 파일 정보 저장
    console.log(" DB업로드 할 파일",qattach.value);
  }
}

</script>

<style scoped>
.agentProfile-label {
      width: 125px;
      height: 125px;
      cursor: pointer;
      display: block;
      border: 1px solid rgb(233, 236, 239);
      position: relative;
  }

#agentProfile {
  display: none;
}
.agentProfile-label .x, .agentProfile-label .y{
border: 1px solid rgb(222, 226, 230);
position: absolute;
top: 50%;
left: 50%; 
}

.agentProfile-label .x {
  transform: translateX(-50%);
  width: 44px;
}

.agentProfile-label .y {
  transform: translateY(-50%);
  height: 44px;
}

input, textarea,label, select {
  border-radius: 10px;
  border: transparent;
  border:1px solid black;
  padding: 5px;
}


</style>
