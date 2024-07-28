<template>
  <div class="detailCss pt-5">
    <div class="container">
      <div class="row row-cols-2 mt-4">
        <div class="d-flex col-7 w-100">
          <section class="col-4">
            <div class="mb-3">
              <h4 class="fw-bold">가격정보</h4>
            </div>
            <ul class="text-muted">
              <li class="listGrid mt-3">
                <div><p>{{property.pcategory}}</p></div>
                <div><p>{{property.pdeposite}}만원
                  <span v-if="property.pcategory == '월세'"> / {{property.prentalfee}}만원</span>
                </p></div>
              </li>
              <li class="listGrid mt-3">
                <div><p>관리비</p></div>
                <div><p>
                  <span v-if="property.pmaintenance">{{property.pmaintenance}}만원</span>
                  <span v-else>없음</span>
                  
                </p></div>
              </li>
              <li class="listGrid mt-3">
                <div><p>방 / 욕실</p></div>
                <div>
                  <p>1개 / 
                    <span v-if="propertyDetail.pdbath === true">1개</span>
                    <span v-else>없음</span>
                  </p>
                </div>
              </li>
              <li class="listGrid mt-3">
                <div><p>주차여부</p></div>
                <div>
                  <p v-if="propertyDetail.pdlot === true">가능</p>
                  <p v-else>불가능</p>
                </div>
              </li>
            </ul>
          </section>
          <section class="col-4 ms-4">
            <div>
              <h4 class="fw-bold">상세정보</h4>
            </div>
            <ul class="text-muted">
              <li class="listGrid mt-3">
                <div><p>해당층</p></div>
                <div><p>
                  <span v-if="property.pfloortype == '지하'">B</span><span v-if="property.pfloortype == '지하' || property.pfloortype == '지상'">{{ property.pfloor }}층 / </span>
                  {{property.pfloortype}}
                </p></div>
              </li>
              <li class="listGrid">
                <div><p>전용면적</p></div>
                <div>
                  <p>{{property.psize}}m<sup>2</sup></p>
                </div>
              </li>
              <li class="listGrid">
                <div><p>난방</p></div>
                <div>
                  <p v-if="propertyDetail.pdheating === true">가능</p>
                  <p v-else>불가능</p>
                </div>
              </li>
              <li class="listGrid">
                <div><p>엘리베이터</p></div>
                <div>
                  <p v-if="propertyDetail.pdlift === true">있음</p>
                  <p v-else>없음</p>
                </div>
              </li>
              <li class="listGrid">
                <div><p>입주가능일</p></div>
                <div><p>
                  <span v-if="propertyDetail.formattedDate == dayjs().format('YYYY-MM-DD')">즉시 입주 (협의 가능)</span>
                  <span v-else>{{ propertyDetail.formattedDate }}</span>
                </p></div>
              </li>
              <li class="listGrid">
                <div><p>등록일</p></div>
                <div><p>{{ property.formattedDate }}</p></div>
              </li>
            </ul>
          </section>
        </div>

        <section class="col-4 mb-3 ms-2 mt-5">
          <div>
            <h4 class="fw-bold mb-4">옵션</h4>
          </div>

          <div class="d-flex mb-3 flex-wrap">
            <div v-if="propertyDetail.pdbed" class="col-2 me-2 text-center">
              <img src="@/assets/icons/free-icon-font-bed-alt-7857147.svg" width="25" alt="">
              <p>침대</p>
            </div>
            <div v-if="propertyDetail.pdmicrowave" class="col-2 me-2 text-center">
              <i class="fa-solid fa-mattress-pillow"></i>
              <p>전자레인지</p>
            </div>
            <div v-if="propertyDetail.pdcooling" class="col-2 me-2 text-center">
              <img src="@/assets/icons/free-icon-font-air-conditioner-7857364.svg" width="25" alt="">
              <p>에어컨</p>
            </div>
            <div v-if="propertyDetail.pdfridge" class="col-2 me-2 text-center">
              <img src="@/assets/icons/free-icon-font-refrigerator-11740054.svg" width="25" alt="">
              <p>냉장고</p>
            </div>
            <div v-if="propertyDetail.pdburner" class="col-2 me-2 text-center">
              <img src="@/assets/icons/free-icon-font-fire-burner-12435076.svg" width="25" alt="">
              <p>가스레인지</p>
            </div>
            <div v-if="propertyDetail.pdshoecloset" class="col-2 me-2 text-center">
              <img src="@/assets/icons/free-icon-font-table-10435317.svg" width="25" alt="">
              <p>신발장</p>
            </div>
            <div v-if="propertyDetail.pdtv" class="col-2 me-2 text-center">
              <img src="@/assets/icons/free-icon-font-tv-retro-11270138.png" width="25" alt="">
              <p>TV</p>
            </div>
            <div v-if="propertyDetail.pdshoecloset" class="col-2 me-2 text-center">
              <img src="@/assets/icons/free-icon-font-table-columns-8770948.svg" width="25" alt="">
              <p>옷장</p>
            </div>
            <div v-if="propertyDetail.pddinningtable" class="col-2 me-2 text-center">
              <img src="@/assets/icons/free-icon-font-screen-3917178.svg" width="25" alt="">
              <p>식탁</p>
            </div>
            <div v-if="propertyDetail.pdtable" class="col-2 me-2 text-center">
              <img src="@/assets/icons/free-icon-font-desk-16060639.svg" width="25" alt="">
              <p>책상</p>
            </div>
            <div v-if="propertyDetail.pdwasher" class="col-2 me-2 text-center">
              <img src="@/assets/icons/free-icon-font-washer-11740067.svg" width="25" alt="">
              <p>세탁기</p>
            </div>
            <div v-if="propertyDetail.pdinduction" class="col-2 me-2 text-center">
              <img src="@/assets/icons/free-icon-electric-stove-8618565.png" width="25" alt="">
              <p>인덕션</p>
            </div>

          </div>
        </section>
        <section class="col-4 mt-5 ms-4">
          <div>
            <h4 class="fw-bold">위치 및 주변시설</h4>
          </div>
          <div>
            <p class="m-0">{{property.paddress}}</p>
            <p class="" v-if="property.paddressdetail !== ''">{{ property.paddressdetail }}</p>
          </div>
          <div class="map-box">
            <KakaoMap :position="propertyPosition" page="property" class="h-75"/>
          </div>
        </section>
        <section class="col-10 w-75 ">
          <div>
            <h4 class="fw-bold">상세설명</h4>
          </div>
          <div class="detailInfo bg-light p-3 mt-3">
            <h6 class="fw-bold mb-3">{{property.ptitle}}</h6>
            <small v-html="sanitizedContent"></small>
          </div>
        </section>
        
        <!-- 다른 방 더보기 넣지 않기 -->
        <!-- <section class="col-8 mt-5">
          <div>
            <h4 class="fw-bold mb-5">다른 방 더보기</h4>
          </div>
          <div class="ms-5 h-50 mb-5 d-flex row-cols-4 mx-auto w-100">
            <PropertyItem class="col" />
            <PropertyItem class="col" />
            <PropertyItem class="col" />
            <PropertyItem class="col" />
          </div>
        </section> -->
     
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import dayjs from "dayjs";
import DOMPurify from "dompurify"; // DOMPurify를 임포트합니다
import KakaoMap from "@/components/KakaoMap.vue";
import PropertyItem from "@/components/Property/PropertyListItem.vue";

const props = defineProps(["property", "propertyDetail"]);

const propertyPosition = ref([]);

// property가 변경될 때마다 propertyPosition 업데이트
watch(() => props.property, (newProperty) => {
  propertyPosition.value = {lat: newProperty.platitude, lng: newProperty.plongitude};
}, {immediate: true}); // immediate: true를 설정하여 처음 로드될 때도 반영되도록 설정

//태그가 출력되는 것을 html태그로 인식하도록 바꾸는 함수
const sanitizedContent = computed(() => {
  return DOMPurify.sanitize(props.propertyDetail.pdcontent);
});
</script>

<style scoped>
.reportBtn {
  background-color: rgb(250, 250, 250);
  border: none;
  font-size: 14px;
}

.detailInfo {
  background-color: rgb(250, 250, 250);
  width: 760px;
}

.productNum {
  border: 1px solid rgb(101, 101, 101);
}

.detailCss {
  width: 1200px;
  margin: 0px auto;
}

.listGrid {
  display: grid;
  grid-template-columns: 160px minmax(0px, 1fr);
}
.map-box{
  height: 400px;
}
</style>
