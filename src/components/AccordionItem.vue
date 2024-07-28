<template>
  <tr @click="rowData.toggle" style="cursor: pointer" >
    <td>{{ rowData.index + 1 }}</td>
    <td style="font-size: small">{{ category(rowData.item.qcategory) }}</td>
    <td class="fw-bold">{{ rowData.item.qtitle || rowData.item.title }}</td>
    <td class="text-muted">{{ formatDate(rowData.item.qdate) || rowData.item.date }}</td>
    <!-- <td v-if="rowData.item.qnumber != null" class="text-muted"><RouterLink class="routerLink" :to="`/CustomerInquiryDetail?qnumber=${rowData.item.qnumber}&qunumber=${rowData.item.qunumber}`">
      <small class="bg-success p-2 rounded fw-bold text-light">상세보기</small></RouterLink>
    </td> -->
    
    <td v-if="rowData.item.qnumber != null" class="text-muted">
      <small class="p-2 rounded fw-bold text-light" :class="rowData.item.qisAnswer == 1 ? 'bg-danger' : 'bg-warning'">{{ hasAnswer(rowData.item.qisAnswer) }}</small>
    </td>
    <!-- <td
      class="text-muted"
      v-if="
        rowData.item.status == '답변 완료' || rowData.item.status == '처리완료'
      "
    >
      <small class="bg-success p-2 rounded fw-bold text-light">{{
        rowData.item.status
      }}</small>
    </td> -->
    <!-- qnumber가 있으면 보여주지 말기 -->
    <!-- <td class="text-muted" v-if="rowData.item.status != '처리완료'"  v-show="rowData.item.qnumber == null ">
      <small class="bg-warning p-2 rounded text-dark fw-bold">{{
        rowData.item.status
      }}</small>
    </td> -->
  </tr>
  <!-- <tr v-if="rowData.isOpen">
    <td colspan="6">
      <div class="p-3 text-start ps-5">
        <p class="fw-bold">내용:</p>
        <p class="text-over">{{ truncatedText(rowData.item.qcontent) }}</p>
        <div v-if="!(rowData.item.qisAnswer == 1 || rowData.item.status == '처리완료')">
          <button class="btn btn-outline-secondary btn-sm me-2" @click="editInquiry">수정</button>
          <button class="btn btn-outline-danger btn-sm" @click="showDeleteModal">삭제</button>
        </div>
      </div>
    </td> 
  </tr> -->
 
  
</template>

<script setup>
import { ref, toRefs } from "vue";
import { useRouter } from 'vue-router';


const router = useRouter();

const props = defineProps({
  kindOf: String,
  rowData: Object,
});

const emit = defineEmits(["edit-inquiry", "show-deleteQnaModal", "show-deleteReportModal"]);

// props로 받은 데이터 js에서 정의 하기
const { rowData } = toRefs(props);
const qnumber = rowData.value.item.qnumber;
const qunumber = rowData.value.item.qunumber;
const index = rowData.value.index;

const qcontent = rowData.value.item.qcontent;


function showDeleteModal() {
  if(props.kindOf === "report") {
    emit("show-deleteReportModal"); // ReportFalseListing 부모로 보냄 
  } else if (props.kindOf === "qna") {
    console.log("rowData.value : ",rowData.value);
    emit("show-deleteQnaModal", qnumber, qunumber, index); // CustomerInquiry 부모로 보냄 
  }
}

// 마이페이지에서 수정 시 1:1 문의 내역과 허위 내역 신고 구분
function editInquiry() {
  if(props.kindOf === "report") {
    emit("edit-inquiry", props.rowData.item.details); // ReportFalseListing 부모로 보냄 
  } else if (props.kindOf === "qna") {
    router.push({
      path: "/Qna/CustomerInquiryUpdateForm",
      query: {qnumber: props.rowData.item.qnumber, qunumber: props.rowData.item.qunumber}
    });
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

// 카테고리 한글 변환
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

// 답변 여부 반환
function hasAnswer(isAnswer){
  if(isAnswer == 1 ){
    return "답변 완료";
  } else {
    return "답변 미완료";
  }
}

// 문자열 줄이는 함수
let sliceContent = qcontent.slice(0, 200);

function truncatedText(qcontent){
  console.log("내용 길이",qcontent.length);
  if(qcontent.length > 200){
    return sliceContent+'...';
  }else{
    return qcontent;
  }
}



</script>

<style scoped>
.routerLink{
    text-decoration: none; /* 밑줄 제거 */
    color: inherit; /* 기본 텍스트 색상 상속 */
    background: none; /* 배경 제거 */
    border: none; /* 테두리 제거 */
    cursor: pointer; /* 커서 스타일 설정 */
}

</style>
