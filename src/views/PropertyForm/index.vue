<template>
  <div class="product-container w-75">
    <h3 class="text-center fw-bold mt-3 mb-3">
      <span v-if="route.params.id">수정하기</span>
      <span v-else>방내놓기</span>
    </h3>
    <!-- 각 섹션 컴포넌트들 -->
    <PropertyInfo :property="property" />
    <TradeInfo :property="property" :propertyDetail="propertyDetail" @paymentTypeChange="handlePaymentTypeChange"  
                @maintenanceChange="handleMaintenanceChange" @moveInChange="handleMoveInChange"
    />
    
    <FacilityInfo :propertyDetail="propertyDetail" />
    <!-- 이미지 업로드 컴포넌트 -->
    <!-- <PhotoUpload @updateImages="handleImageUpdate" /> -->

    <div class="mt-5">
    <div class="d-flex">
      <h4 class="col fw-bold">사진 등록</h4>
    </div>
    <hr />
    <div class="image-box">
      <span class="me-5 col-2 align-self-center">썸네일 사진 *</span>
      <!-- 이미지 미리보기 컴포넌트 -->
      <ImagePreview
        imagePurpose="single"
        :initialImages="initialImages"
        @update:image="handleSingleImageUpdate"
        class="mt-3 mb-3"
      />
      <span class="me-5 col-2 align-self-center">디테일 사진 *</span>
      <!-- 이미지 미리보기 컴포넌트 -->
      <ImagePreview
        imagePurpose="multi"
        @update:image="handleMultiImageUpdate"
        class="mt-3 mb-3"
      />
    </div>
  </div>


    <DetailDescription :propertyDetail="propertyDetail" :property="property"/>
    <!-- 폼 제출 버튼 -->
    <!-- :disabled="!validForm.value" -->
    
    <button type="submit" class="mt-4 btn btn-warning btn-lg w-75 fw-bold" 
            @click="handleSubmit" :disabled="!isFormDisabled ">
        등록하기
    </button>

  </div>
  <!-- 필수 정보 입력 안내 모달 -->
  <CommonModal id="requiredInfo">필수 정보를 모두 입력하세요</CommonModal>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import PropertyInfo from "./PropertyInfo.vue";
import TradeInfo from "./TradeInfo.vue";
import FacilityInfo from "./FacilityInfo.vue";
import PhotoUpload from "./PhotoUpload.vue";
import DetailDescription from "./DetailDescription.vue";
import CommonModal from "@/components/CommonModal.vue";
import { onMounted } from "vue";
import { Modal } from "bootstrap";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
import propertyAPI from "@/apis/propertyAPI";
import ImagePreview from "@/components/ImagePreview.vue"; // ImagePreview 컴포넌트 가져오기
import { useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();

let requiredInfoModal = null;
const propertyPhotos = ref([]);
const thumbnailImage = ref(null);
const initialImages = ref();

// property 데이터 가져오기
const getPropertyData = async () => {
  if(route.params.id) {
    try {
      const response = await propertyAPI.getPropertyData(route.params.id);
      Object.assign(property, response.data.totalProperty.property);
      Object.assign(propertyDetail, response.data.totalProperty.propertyDetail);

      // propertyDetail.value = response.data.totalProperty.propertyDetail;
      // property.ppattach = response.data.propertyPhotos;
  
      // property.pthumbnail = [];
  
      getPthumbnail(route.params.id);
  
      // await Promise.all(propertyPhotos.value.map(async (photo) => {
      //   await getPattaches(photo.ppnumber);
      // }));
  
    } catch (error) {
      console.log(error);
    }
  }
};

// 썸네일 사진 출력
const getPthumbnail = async (pnumber) => {
  try {
    const response = await propertyAPI.propertyAttachDownload(pnumber);
    initialImages.value = URL.createObjectURL(response.data);
  } catch (error) {
    console.log(error);
  }
};

// 디테일 사진 출력
// const getPattaches = async (ppnumber) => {
//   try {
//     const response = await propertyAPI.detailPropertyAttachDownload(ppnumber);
//     const pattach = URL.createObjectURL(response.data);
//     pattaches.value.push(pattach);
//   } catch (error) {
//     console.log(error);
//   }
// };




// 필수 정보 입력 안내 모달 표시 함수
// function showLoginModal() {
//   requiredInfoModal.show();
// }

// 비어있는 필수 값이 있다면 제출 버튼을 비활성화
const checkPropertyFormData = computed(() => {
  return (
    propertyDetail.moveIn !== "" &&
    propertyDetail.pdbath !== "" &&
    propertyDetail.pdlift !== "" &&
    propertyDetail.pdlot !== "" &&
    propertyDetail.pdheating !== "" &&
    propertyDetail.pdcooling !== "" &&
    propertyDetail.pdcontent !== "" &&
    property.pdeposite !== "" &&
    property.pfloortype !== "" &&
    property.psize !== "" &&
    property.ptitle !== "" &&
    property.pcategory !== "" &&
    property.paddress !== "" &&
    property.ppostcode !== "" &&
    property.platitude !== "" &&
    property.plongitude !== "" &&
    property.pthumbnail.length > 0 && // 프로필 이미지가 업로드되었는지 확인
    property.ppattach.length > 0
  ); 
});

    // route.params.id가 없으면 checkPropertyFormData 값을 사용하여 비활성화 여부를 결정
    const isFormDisabled = computed(() => {
      if (!route.params.id) {
        return checkPropertyFormData.value;
      }
      return true; // route.params.id가 있을 때는 무조건 활성화
    });

// property
const property = reactive({
  pdeposite: "",
  prentalfee: "",
  pfloortype: "",
  pfloor: "",
  psize: "",
  pmaintenance:  "",
  ptitle: "",
  pcategory: "",
  paddress: "",
  paddressdetail: "",
  ppostcode: "",
  platitude: "",
  plongitude: "",
  isPmaintenance: "",
  pthumbnail: [],  // 썸네일 이미지
  ppattach: [],  // 디테일 이미지를 저장할 배열
});

// propertyDetail
const propertyDetail = reactive({
  pdcontent: "",
  pdmoveindate: "",
  pdbath: "",
  pdlift: "",
  pdbed: false,
  pdlot: "",
  pdheating: "",
  pdcooling: "",
  pdmicrowave: false,
  pdburner: false,
  pdfridge: false,
  pdshoecloset: false,
  pdtv: false,
  pdcloset: false,
  pddinningtable: false,
  pdtable: false,
  pdwasher: false,
  pdinduction: false,
  moveIn: "",
});


// 부동산 정보 객체
// const propertyInfo = reactive({
//   address: "",
//   addressDetail: "",// 디테일 부분은 빈 값이 들어와도 제출이 되어야함
//   postcode: "",
//   paymentType: "",
//   deposite: "",
//   price: "",
//   maintenance: "",
//   maintenanceCost: "",
//   moveIn: "",
//   moveInDate: "",
//   floor: "",
//   totalFloor: "",
//   elevator: "",
//   parkingLot: "",
//   heating: "",
//   cooling: "",
//   utility: [],
//   thumbnail: [],  // 썸네일 이미지를 저장할 배열
//   ppattach: [],  // 디테일 이미지를 저장할 배열
//   title: "",
//   content: "",
//   lat: "",
//   lon: "",
// });

// const validForm = ref([]);

// 이미지 업데이트 핸들러
// function handleImageUpdate({ single, multi }) {
//   console.log("Received image data:", { single, multi });
//   property.pthumbnail = single; // 썸네일 이미지 업데이트
//   property.ppattach = multi; // 디테일 이미지 업데이트
//   console.log("Updated propertyInfo:", { pthumbnail: property.pthumbnail, ppattach: property.ppattach });
// }


function handleSingleImageUpdate(files) {
  console.log('Received single image files:', files);
  property.pthumbnail = files;  // 단일 이미지 파일 정보 저장
}

function handleMultiImageUpdate(files) {
  console.log('Received multi image files:', files);
  property.ppattach = files;  // 다중 이미지 파일 정보 저장
}

  // 필수 값이 빈값이 아닌지 검사
  // for (let key in property) {
  //   let value = property[key];
  //   if (!Array.isArray(value) && value === "") {
  //     validForm.value = false;
  //   } else {
  //     if(!propertyDetail.pdmoveindate === "" && !propertyDetail.pdbath === ""
  //       && !propertyDetail.pdlift === "" && !propertyDetail.pdlot === "" 
  //       && !propertyDetail.pdheating === "" && !propertyDetail.pdcooling === ""
  //     ) {
  //       validForm.value = true;
  //     } else {
  //       validForm.value = false;
  //     }
  //   }
  // }


// 폼 제출 핸들러
// propertyForm 데이터 전송
async function handleSubmit() {
  // 공용 관리비와 입주 가능 일자가 없으면 기본값 설정
  if (property.isPmaintenance === "false") {
    property.pmaintenance = 0;
  }
  if (propertyDetail.moveIn === "true") {
    propertyDetail.pdmoveindate = dayjs().format('YYYY-MM-DD');
  }
  if (property.pcategory === "전세") {
    property.prentalfee = 0;
  }

  if(property.pfloortype === "옥탑방") {
    property.pfloor = 0;
  }

  const formData = new FormData();

// property 데이터 추가

formData.append("property.pdeposite", property.pdeposite);
formData.append("property.prentalfee", property.prentalfee);
formData.append("property.pfloortype", property.pfloortype);
formData.append("property.pfloor", property.pfloor);
formData.append("property.psize", property.psize);
formData.append("property.pmaintenance", property.pmaintenance);
formData.append("property.ptitle", property.ptitle);
formData.append("property.pcategory", property.pcategory);
formData.append("property.paddress", property.paddress);
formData.append("property.paddressdetail", property.paddressdetail);
formData.append("property.ppostcode", property.ppostcode);
formData.append("property.platitude", property.platitude);
formData.append("property.plongitude", property.plongitude);

if(property.pthumbnail) {
  formData.append("property.pthumbnail", property.pthumbnail[0]);
}

if (property.ppattach) {
  property.ppattach.forEach(file => {
    formData.append("propertyPhoto.ppattach", file);
  });
}


// propertyDetail 데이터 추가
Object.entries(propertyDetail).forEach(([key, value]) => {
  formData.append(`propertyDetail.${key}`, value);
});

  // 필수 값이 모두 들어오지 않으면 모달 표시
  // if (!validForm.value) {
  //   showLoginModal();
  // }


try {
    if(route.params.id) {
      formData.append("property.pnumber", route.params.id);
      const response = await propertyAPI.updateProperty(route.params.id, formData);
      console.log(response);
      router.push("/Mypage/ManageMyProperty");
    } else {
      const response = await propertyAPI.postProperty(formData);
      console.log(response);
      router.push("/Property");
    }

  
  } catch(error) {
    console.log(error);
  }

}

// 관리비 변경 핸들러
function handleMaintenanceChange() {
  property.pmaintenance = "";
}

// 입주 변경 핸들러
function handleMoveInChange() {
  propertyDetail.pdmoveindate = "";
}

// 결제 유형 변경 핸들러
function handlePaymentTypeChange() {
  property.prentalfee = "";
}

// 컴포넌트가 마운트될 때 모달 초기화
onMounted(() => {
  // requiredInfoModal = new Modal(document.querySelector("#requiredInfo"));
  getPropertyData();
});

</script>

<style scoped>
.product-container {
  margin-right: auto;
  margin-left: auto;
}
</style>
