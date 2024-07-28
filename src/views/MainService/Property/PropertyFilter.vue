<template>
  <div class="filter-popup">
    <form @submit.prevent="searchKeywordInProperty">
      <div class="d-flex justify-content-end w-100">
        <div class="d-flex">
          <input
            class="form-control me-2 w-auto"
            type="search"
            placeholder="주소 검색"
            aria-label="Search"
            @keyup.enter="searchKeywordInProperty"
            v-model="searchKeyword"
          />
        </div>
        <div class="d-flex">
          <button type="button" class="btn btn-outline-success" @click="searchKeywordInProperty">Search</button>
        </div>
      </div>
    </form>
    <form @submit.prevent="submitFilter">
      <div class="mt-2">
        <div class="d-flex border-top">
          <div class="filter-box border-start">
            <div>거래유형</div>
            <div>
              <ul class="">
                <li>
                  <label for="category1">
                    <input type="radio" name="pcategory" id="category1"
                            value="전세" v-model="filters.byCategory" />
                    전세
                  </label>
                </li>
                <li>
                  <label for="category2">
                    <input type="radio" name="pcategory" id="category2"
                    value="월세" v-model="filters.byCategory" />
                    월세
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <!-- <div class="filter-box">
            <div>거래종류</div>
            <div>
              <ul class="">
                <li>
                  <label for="">
                    <input type="radio" name="sellerType" id="" />
                    직거래
                  </label>
                </li>
                <li>
                  <label for="">
                    <input type="radio" name="sellerType" id="" />
                    중개
                  </label>
                </li>
              </ul>
            </div>
          </div> -->
          <div class="filter-box">
            <div>층수</div>
            <div>
              <ul class="">
                <li>
                  <label for="floortype1">
                    <input type="radio" name="pfloortype" id="floortype1"
                    value="반지하" v-model="filters.byFloortype" />
                    반지하
                  </label>
                </li>
                <li>
                  <label for="floortype2">
                    <input type="radio" name="pfloortype" id="floortype2"
                    value="지상" v-model="filters.byFloortype" />
                    지상
                  </label>
                </li>
                <li>
                  <label for="floortype3">
                    <input type="radio" name="pfloortype" id="floortype3"
                    value="옥탑방" v-model="filters.byFloortype" />
                    옥탑방
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div class="filter-box">
            <div>가격</div>
            <div>
              <ul class="">
                <li>
                  <label for="price1">
                    <input type="radio" name="pprice" id="price1"
                    value="low" v-model="filters.byPrice" />
                    낮은순
                  </label>
                </li>
                <li>
                  <label for="price2">
                    <input type="radio" name="pprice" id="price2"
                    value="high" v-model="filters.byPrice" />
                    높은순
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div class="filter-box">
            <div>날짜</div>
            <div>
              <ul class="">
                <li>
                  <label for="date1">
                    <input type="radio" name="pdate" id="date1"
                    value="desc" v-model="filters.byDate" />
                    최신순
                  </label>
                </li>
                <li>
                  <label for="date2">
                    <input type="radio" name="pdate" id="date2"
                    value="asc" v-model="filters.byDate" />
                    오래된순
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="border-top p-3 d-flex justify-content-end">
          <button class="btn btn-outline-secondary" type="reset" @click="filterReset">초기화</button>
          <button class="btn btn-warning ms-2" type="button" @click="submitFilter">조건검색</button>
        </div>
      </div>
    </form>

    <!-- 경고 모달 -->
    <div
      class="modal fade"
      id="warningModal"
      tabindex="-1"
      aria-labelledby="warningModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="warningModalLabel">경고</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">{{warningMessage}}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { Modal } from "bootstrap";
import { useRoute, useRouter } from "vue-router";
const emits = defineEmits(["update:filterData", "reset:propertyList", "update:keywordData"]);
const route = useRoute();
const searchKeyword = ref("");
const router = useRouter();
const filters = ref({
  byCategory: "",
  byFloortype: "",
  byPrice: "",
  byDate: "",
});
const warningMessage = ref(""); // 경고 메시지 상태 추가

// 필터 초기화 버튼 클릭
// function filterReset() {
// }

  if(route.query.keyword){
    searchKeyword.value = route.query.keyword;
    searchKeywordInProperty();
    router.push({ path: route.path, query: {} });
  }

function searchKeywordInProperty() {
  console.log("searchKeyword.value : " + searchKeyword.value);
    if(searchKeyword.value == "") {
      warningMessage.value = "한 글자 이상의 단어를 검색해 주세요.";
      const warningModal = new Modal(document.getElementById("warningModal"));
      warningModal.show();
    } else {
      emits("update:keywordData", searchKeyword.value);
    }
}

// 필터 검색 버튼 클릭
function submitFilter() {
  if (
    !filters.value.byCategory &&
    !filters.value.byFloortype &&
    !filters.value.byPrice &&
    !filters.value.byDate
  ) {
    warningMessage.value = "하나 이상의 필터를 선택해 주세요.";
    const warningModal = new Modal(document.getElementById("warningModal"));
    warningModal.show();
  } else {
    emits("update:filterData", filters.value);
    console.log("filters in propertyFilter : " + JSON.stringify(filters));
    
  }
}

// watch(()=>{
//   searchKeyword.value
// },
// ()=>{
//   searchKeywordInProperty();
//   router.push({ path: route.path, query: {} });
// })
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  padding-top: 10px;
}

.filter-box {
  padding: 24px 10px 7px 17px;
  width: 25%;
  border-right: 1px solid #e0e0e0;
}
</style>
