<template>
<!-- 검색 및 정렬 -->
  <div class="w-75">
    <form @submit.prevent="submitInputValue">
      <div class="d-flex" style="justify-content: end; margin-top: 60px">
        <select name="sortType" id="sortType" v-model="noticeFilter.sort">
            <option value="desc" selected>최신순</option>
            <option value="asc">오래된순</option>
        </select>
        <input type="text" v-model="inputValue" placeholder="검색어를 입력해주세요" style="border-radius: 5px; width: 250px; border: 1.5px solid grey; padding-left: 10px">
        <div class="ms-2">
          <button type="submit" style="border-radius: 100%; border:none; background-color: #FEC83F; width: 30px; height:30px; justify-content: center; align-items: center;"  class="d-flex"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
      </div>  
    </form>
    </div>  
</template>

<script setup>
import { ref, toRefs } from 'vue';

let inputValue = ref("");

const props = defineProps({
  noticeFilter: Object,
});

const { noticeFilter } = toRefs(props);

function submitInputValue(){
  noticeFilter.value.searchKeyword = inputValue.value;
}




</script>

<style scoped>
select{
  border-radius: 15px; 
  width: 200px; 
  height: 35px; 
  border: 1px solid black; 
  padding-left: 10px; 
  margin-right: 10px; 
  background-color: transparent;
}
</style>
