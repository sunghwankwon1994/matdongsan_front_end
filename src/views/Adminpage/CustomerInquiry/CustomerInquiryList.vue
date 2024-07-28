<template>
    <!-- 리스트(table) -->
     <div class="w-50 container">
      
    <table style="width: 100%; margin-top: 20px; ">
        <thead class="row pt-2">
        <!-- <th>카테고리</th> -->
        <th class="col-3">문의 유형</th><th class="col-5" >제목</th><th class="col-2">날짜</th><th class="col-2">답변 여부</th>
        </thead>
        <tbody>
            <tr class="row" v-for="question in props.question" :key="question.qnumber">
                    
                <td class="col-3" style="text-align: center;">{{ category(question.qcategory) }}</td>
                <td class="col-5"><RouterLink class="routerLink" :to="`/CustomerInquiryDetail?qnumber=${question.qnumber}&qunumber=${question.qunumber}`">{{ question.qtitle }}</RouterLink></td>
            
                <td class="col-2" style="text-align: center;">{{ formatDate(question.qdate) }}</td>
                <td style="text-align: center;" :class="question.qisAnswer == 1 ? '' : 'text-danger'" class="answer col-2">{{ hasAnswer(question.qisAnswer) }}</td>

            </tr>
        
        </tbody>
    </table>

</div>
</template>

<script setup>
import { ref } from 'vue';



// 날짜 형식 맞추기
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 답변 여부 반환
function hasAnswer(isAnswer){
  if(isAnswer == 1 ){
    return "답변 완료";
  } else {
    return "답변 미완료";
  }
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

const props = defineProps({
    question: Array,
});

</script>

<style scoped>
    th{
      text-align: center;
      padding-top: 15px;
      border-top: 2px solid black;
      border-bottom: 1px solid grey;
      height: 60px;
    }
    td{
      height: 60px;
      border-bottom: 1px solid gray;
      padding-top: 15px;

    }
    .routerLink{
        text-decoration: none; /* 밑줄 제거 */
        color: inherit; /* 기본 텍스트 색상 상속 */
        background: none; /* 배경 제거 */
        border: none; /* 테두리 제거 */
        cursor: pointer; /* 커서 스타일 설정 */
    }
    *{
        white-space: nowrap;
    }
</style>
