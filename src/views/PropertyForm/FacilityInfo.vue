<template>
  <div class="mt-5">
    <h4 class="fw-bold">시설 정보</h4>
    <hr />
    <div class="mt-3">
      <span class="me-5">난방시설 *</span>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="radio"
          name="heating-Options"
          id="heating-Option1"
          value="false"
          v-model="propertyDetail.pdheating"
        />
        <label class="form-check-label me-3" for="heating-Option1">없음</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="radio"
          name="heating-Options"
          id="heating-Option2"
          value="true"
          v-model="propertyDetail.pdheating"
        />
        <label class="form-check-label me-3" for="heating-Option2">있음</label>
      </div>
    </div>
    <div class="mt-3 mb-3">
      <span class="me-5">냉방시설 *</span>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="radio"
          name="cooling-Options"
          id="cooling-Option1"
          value="false"
          v-model="propertyDetail.pdcooling"
        />
        <label class="form-check-label me-3" for="cooling-Option1">없음</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="radio"
          name="cooling-Options"
          id="cooling-Option2"
          value="true"
          v-model="propertyDetail.pdcooling"
        />
        <label class="form-check-label me-3" for="cooling-Option2">있음</label>
      </div>
    </div>
    <div class="mt-3 mb-3">
      <span class="me-5">화장실 *  </span>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="radio"
          name="bath-Options"
          id="bath-Option1"
          value="false"
          v-model="propertyDetail.pdbath"
        />
        <label class="form-check-label me-3" for="bath-Option1">없음</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="radio"
          name="bath-Options"
          id="bath-Option2"
          value="true"
          v-model="propertyDetail.pdbath"
        />
        <label class="form-check-label me-3" for="bath-Option2">있음</label>
      </div>
    </div>
    <span class="col-1 me-3">생활시설</span>
    <div class="mt-3 d-flex flex-wrap justify-content-start">
      <!-- <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="checkbox"
          name="util-Options"
          id="util-Option"
          value="전체선택"
          @change="toggleSelectAll"
          :checked="allSelected"
        />
        <label class="form-check-label me-3" for="util-Option">전체선택</label>
      </div> -->
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="checkbox"
          id="bed"
          value="true"
          v-model="propertyDetail.pdbed"
        />
        <label class="form-check-label me-3" for="bed">침대</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="checkbox"
          id="microwave"
          value="true"
          v-model="propertyDetail.pdmicrowave"
        />
        <label class="form-check-label me-3" for="microwave">전자레인지</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="checkbox"
          id="burner"
          value="true"
          v-model="propertyDetail.pdburner"
        />
        <label class="form-check-label me-3" for="burner">가스레인지</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="checkbox"
          id="fridge"
          value="true"
          v-model="propertyDetail.pdfridge"
        />
        <label class="form-check-label me-3" for="fridge">냉장고</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="checkbox"
          id="shoecloset"
          value="true"
          v-model="propertyDetail.pdshoecloset"
        />
        <label class="form-check-label me-3" for="shoecloset">신발장</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="checkbox"
          id="tv"
          value="true"
          v-model="propertyDetail.pdtv"
        />
        <label class="form-check-label me-3" for="tv">TV</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="checkbox"
          id="closet"
          value="true"
          v-model="propertyDetail.pdcloset"
        />
        <label class="form-check-label me-3" for="closet">옷장</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="checkbox"
          id="dinningtable"
          value="true"
          v-model="propertyDetail.pddinningtable"
        />
        <label class="form-check-label me-3" for="dinningtable">식탁</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="checkbox"
          id="table"
          value="true"
          v-model="propertyDetail.pdtable"
        />
        <label class="form-check-label me-3" for="table">책상</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="checkbox"
          id="washer"
          value="true"
          v-model="propertyDetail.pdwasher"
        />
        <label class="form-check-label me-3" for="washer">세탁기</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="checkbox"
          id="induction"
          value="true"
          v-model="propertyDetail.pdinduction"
        />
        <label class="form-check-label me-3" for="induction">인덕션</label>
      </div>
      
      <!-- <div
        class="form-check form-check-inline"
        v-for="util in utilities"
        :key="util"
      >
        <input
          class="form-check-input border border-1 border-secondary"
          type="checkbox"
          name="util-Options"
          :id="'util-Option' + util"
          :value="util"
          v-model="propertyDetail.utility"
          @change="isSelectAll"
          
        />
        <label class="form-check-label me-3" :for="'util-Option' + util">{{
          util
        }}</label>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from "vue";

const props = defineProps({
  propertyDetail: Object,
});

const { propertyDetail } = toRefs(props);

// const utilities = [
//   "침대",
//   "책상",
//   "옷장",
//   "신발장",
//   "냉장고",
//   "세탁기",
//   "가스레인지",
//   "인덕션",
//   "전자레인지",
//   "TV",
// ];

// const allSelected = ref(false);

// function toggleSelectAll() {
//   if (allSelected.value) {
//     propertyDetail.value.utility = [];
//   } else {
//     propertyDetail.value.utility = utilities.slice();
//   }
//   allSelected.value = !allSelected.value;
// }
// function isSelectAll() {
//   if (propertyDetail.value.utility.length != 10) {
//     allSelected.value = false;
//   } else {
//     allSelected.value = true;
//   }
// }
</script>
