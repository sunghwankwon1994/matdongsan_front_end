<template>
    <div class="mt-5">
      <h4 class="fw-bold">거래 정보</h4>
      <hr />
      <span class="me-5">거래 종류 *</span>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border bodrer-1 border-secondary"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio1"
          v-model="property.pcategory"
          value="전세"
          @change="handlePaymentTypeChange"
        />
        <label class="form-check-label me-3" for="inlineRadio1">전세</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border bodrer-1 border-secondary"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio2"
          v-model="property.pcategory"
          value="월세"
        />
        <label class="form-check-label" for="inlineRadio2">월세</label>
      </div>
  
      <div class="mt-3">
        <span class="me-5">가격 정보 *</span>
        <input type="text" v-model="property.pdeposite" placeholder="보증금"/>만원 
        <input type="text" id="rentalfee" v-model="property.prentalfee" placeholder="월세" v-if="property.pcategory == '월세'" > 
        <label for="renfalfee" v-if="property.pcategory == '월세'" >   만원 </label> 
      </div>
  
      <div class="mt-3">
        <span class="me-4">공용관리비 * </span>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input border bodrer-1 border-secondary"
            type="radio"
            name="mainteneceOptions"
            id="maintenece1"
            value="false"
            v-model="property.isPmaintenance"
            @change="handleMaintenanceChange"
          />
          <label class="form-check-label me-3" for="maintenece1">없음</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input border bodrer-1 border-secondary"
            type="radio"
            name="mainteneceOptions"
            id="maintenece2"
            value="true"
            v-model="property.isPmaintenance"
            @change="handleMaintenanceChange"
          />
          <label class="form-check-label me-3" for="maintenece2">있음</label>
          <input
            id="maintenance"
            type="text"
            placeholder="관리비"
            v-model="property.pmaintenance"
            v-if="property.isPmaintenance == 'true'"
          />
          <label for="maintenance" v-if="property.isPmaintenance == 'true'">만원</label>
        </div>
      </div>

      <div class="mt-3">
        <span class="me-4">전용면적 *</span>
        <div class="form-check form-check-inline">
          <input
            type="text"
            id="size"
            v-model="property.psize"
          />
          <label class="form-check-label me-3" for="size">m<sup>2</sup></label>
        </div>
      </div>
  
      <div class="mt-3">
        <span class="me-4">입주 가능 일자 *</span>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input border bodrer-1 border-secondary"
            type="radio"
            name="move-in-date-Options"
            id="move-in1"
            value="true"
            v-model="propertyDetail.moveIn"
            @change="handleMoveInChange"
          />
          <label class="form-check-label me-3" for="move-in1">즉시입주</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input border bodrer-1 border-secondary"
            type="radio"
            name="move-in-date-Options"
            id="move-in2"
            value="false"
            v-model="propertyDetail.moveIn"
          />
          <label class="form-check-label me-3" for="move-in2">일자 선택</label>
          <input
            type="date"
            :disabled="propertyDetail.moveIn !== 'false'"
            v-model="propertyDetail.pmoveindate"
            required :min="minDate"
          />
        </div>
      </div>
    </div>

    <!-- 추가 정보 -->
    <div class="mt-5">
    <h4 class="fw-bold">추가 정보</h4>
    <hr />
    <div class="d-flex">
      <span class="me-5">층수 *</span>
      <div class="col-2">
        <small class="">전체 층수</small>
        <select
          class="form-select form-select-sm mb-3 border bodrer-1 border-secondary"
          aria-label=".form-select-sm example"
          v-model="property.pfloortype"
        >
          <option value="" disabled hidden selected>선택하세요</option>
          <option value="지상" >지상</option>
          <option value="지하">지하</option>
          <option value="옥탑방">옥탑방</option>
        </select>
      </div>
      <div v-if="property.pfloortype == '지상' || property.pfloortype == '지하'" class="col-1 ms-5">
        <small class="">해당 층수</small>
        <input
          type="text"
          v-model="property.pfloor"
          placeholder="층수를 입력해주세요"
        />
      </div>
    </div>
    <div class="d-flex">
      <div class="col">
        <span class="me-5">엘리베이터 *</span>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input border bodrer-1 border-secondary"
            type="radio"
            name="lift-Options"
            id="lift1"
            value="false"
            v-model="propertyDetail.pdlift"
          />
          <label class="form-check-label me-3" for="lift1">없음</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input border bodrer-1 border-secondary"
            type="radio"
            name="lift-Options"
            id="lift2"
            value="true"
            v-model="propertyDetail.pdlift"
          />
          <label class="form-check-label me-3" for="lift2">있음</label>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <span>주차 가능 여부 * </span>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="radio"
          name="parking-Options"
          id="parking-Option1"
          value="false"
          v-model="propertyDetail.pdlot"
        />
        <label class="form-check-label me-3" for="parking-Option1">불가능</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input border border-1 border-secondary"
          type="radio"
          name="parking-Options"
          id="parking-Option2"
          value="true"
          v-model="propertyDetail.pdlot"
        />
        <label class="form-check-label me-3" for="parking-Option2">가능</label>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { computed, onMounted, toRefs } from 'vue';
  import dayjs from 'dayjs';
  const props = defineProps([
    'property', 'propertyDetail'
  ]);
  const { property, propertyDetail  } = toRefs(props);
  const emit = defineEmits(['maintenanceChange', 'moveInChange', 'paymentTypeChange']);
  import { useRoute } from "vue-router";
  const route = useRoute();

  
  // const computedMaintenance = computed(() => {
  //   return props.property.pmaintenance > 0 ? true : false;
  // })
  
  
  function handleMaintenanceChange() {
    emit('maintenanceChange');
  }

  function handlePaymentTypeChange(){
    emit('paymentTypeChange');
  }


  const minDate = computed(() => {
    return dayjs().format('YYYY-MM-DD');
  })

  onMounted(() => {
    if(route.params.id) {
      property.value.isPmaintenance = props.property.pmaintenance > 0 ? true : false;
      propertyDetail.value.moveIn = dayjs(props.propertyDetail.pmoveindate).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? true : false;
    }
  })


  function handleMoveInChange(){
    emit('moveInChange');
  }
  </script>
  