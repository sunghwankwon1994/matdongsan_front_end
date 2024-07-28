<template>
    <!-- 리스트(table) -->
     <div class="w-50 container">
    <table style="width: 100%; margin-top: 20px; margin-bottom: 20px">
        <thead>
        <!-- <th>카테고리</th> -->
        <th>제목</th><th>날짜</th>
        </thead>
        <tbody>
            <tr v-for="(item, index) in noticeList" :key="index" @click="goDetail(item.nnumber)" class="noticeListItem">
                    
                    <!-- <td style="text-align: center;">[공지사항]</td> -->
                    <td class="ps-5">{{ item.ntitle }}</td>
                    <td style="text-align: center;">{{ item.ndate }}</td>
                </tr>
        
        </tbody>
    </table>
    <RouterLink class="routerLink" to="/QNA/noticeform">
        <div v-if="$store.state.userRole == 'ADMIN'" class="d-flex justify-content-end">
            <div class="btn btn-sm mt-3 me-3" style="background-color: #2F4858; color: white;">글 쓰기</div>
        </div>
    </RouterLink>
</div>
</template>

<script setup>
import { toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const props = defineProps({
    noticeList: Object,
    currentPage: String
});

const { noticeList, currentPage } = toRefs(props);

function goDetail(nnumber){
    router.push(`/QNA/noticedetail?nnumber=${nnumber}&pageNo=${currentPage.value}`);
}

</script>

<style scoped>
    th{
      text-align: center;
      /* padding-left: 20px; */
      border-top: 2px solid black;
      border-bottom: 1px solid grey;
      height: 60px;
  
    }
    td{
      height: 60px;
      border-bottom: 1px solid gray
    }
    .routerLink{
        text-decoration: none; /* 밑줄 제거 */
        color: inherit; /* 기본 텍스트 색상 상속 */
        background: none; /* 배경 제거 */
        border: none; /* 테두리 제거 */
        cursor: pointer; /* 커서 스타일 설정 */
    }
    .noticeListItem:hover{
        background-color: #FAF6F6;
        cursor: pointer;
    }
</style>
