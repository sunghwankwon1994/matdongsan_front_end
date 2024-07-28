<template>
  <RouterLink
    :to="{ path: `/Property/${favoriteData.pnumber}` }"
    class="property-link text-decoration-none me-3 text-dark"
    v-if="props.favoriteData.pnumber"
  >
    <div class="property-item border-bottom p-0">
      <div class="property-content d-flex justify-content-center p-3">
        <div class="property-image">
          <img class="rounded-1" width="140" height="140" :src="fattach" alt="" />
        </div>
        <div class="property-info">
          <div class="listInfo-box ms-2">
            <p class="listPrice mb-2 mt-2">
              <b v-if="favoriteData.prentalfee == 0">
                {{ favoriteData.pcategory }} {{ favoriteData.pdeposite }}만원
              </b>
              <b v-else>
                {{ favoriteData.pcategory }} {{ favoriteData.pdeposite }}만원 /{{ favoriteData.prentalfee }}만원
              </b>
            </p>
            <p class="listInfo">
              <span v-if="!(favoriteData.pfloortype === '옥탑방')">{{ favoriteData.pfloortype }} {{ favoriteData.pfloor }}층,</span>
              <span v-if="(favoriteData.pfloortype === '옥탑방')">{{ favoriteData.pfloortype }},</span>
              {{ favoriteData.psize }}m<sup>2</sup>, 관리비 
                <span v-if="favoriteData.pmaintenance">{{ favoriteData.pmaintenance }}만원</span>
                <span v-else>없음</span>
            </p>
            <p class="listInfo">{{ favoriteData.ptitle }}</p>
            <p class="listMemberType text-center border border-danger text-danger mt-2 p-1">
              방주인
            </p>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>

  <div v-if="propertyData && props.propertyData.pstatus === '활성화'">
    <RouterLink
      :to="{ path: `/Property/${propertyData.pnumber}` }"
      class="property-link text-decoration-none me-3 text-dark"
      v-if="props.propertyData.pnumber"
    >
      <div class="property-item border-bottom p-0">
        <div class="property-content d-flex justify-content-center p-3">
          <div class="property-image">
            <img class="rounded-1" width="140" height="140" :src="pattach" alt="" />
          </div>
          <div class="property-info">
            <div class="listInfo-box ms-2">
              <p class="listPrice mb-2 mt-2">
                <b>
                  {{ propertyData.pcategory }} {{ propertyData.pdeposite }}만원
                  <span v-if="propertyData.prentalfee"> / {{ propertyData.prentalfee }}만원</span>
                </b>
              </p>
              <p class="listInfo">
                <span v-if="!(propertyData.pfloortype === '옥탑방')">{{ propertyData.pfloortype }} {{ propertyData.pfloor }}층,</span>
                <span v-if="(propertyData.pfloortype === '옥탑방')">{{ propertyData.pfloortype }},</span>
                {{ propertyData.psize }}m<sup>2</sup>, 관리비 
                <span v-if="propertyData.pmaintenance">{{ propertyData.pmaintenance }}만원</span>
                <span v-else>없음</span>
                
              </p>
              <p class="listInfo">{{ propertyData.ptitle }}</p>
              <p
                v-if="getRole == 'MEMBER'"
                class="listMemberType text-center border border-danger text-danger mt-2 p-1"
              >
                방주인
              </p>
            </div>
          </div>
        </div>
      </div>
    </RouterLink>
  </div>

  <RouterLink
    :to="{ path: `/Agent/${agentData.anumber}` }"
    class="property-link text-decoration-none me-3 text-dark"
    v-if="props.agentData.anumber"
  >
    <div class="property-item border-bottom p-0">
      <div class="property-content d-flex justify-content-center p-3">
        <div class="property-image">
          <img v-if="aattach" class="rounded-1" width="140" height="140" :src="aattach" alt="" />
        </div>
        <div class="property-info">
          <div class="listInfo-box ms-2">
            <p class="listPrice mb-2 mt-2 ms-2">
              <b>{{ agentData.abrand }}</b>
            </p>
            <p class="listInfo ms-2">{{ agentData.aname }},</p>
            <p class="listInfo ms-2">{{ agentData.aphone }}</p>
            <p class="listInfo ms-2">댓글 ({{ agentDetailData.total }})</p>
            <p class="listInfo ms-2">
              평점
              <span v-for="index in 5" :key="index">
                <span v-if="averageRating >= index">
                  <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                </span>
                <span v-else-if="averageRating >= index - 0.5">
                  <i class="fa-solid fa-star-half-stroke" style="color: #ffd43b"></i>
                </span>
                <span v-else>
                  <i class="fa-regular fa-star" style="color: #ffd43b"></i>
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { ref, computed } from "vue";
import agentAPI from "@/apis/agentAPI";
import propertyAPI from "@/apis/propertyAPI";
import memberAPI from "@/apis/memberAPI";

const aattach = ref(null); // 중개인 첨부 사진
const pattach = ref(null); // 매물 첨부 사진
const fattach = ref(null); // 관심 첨부 사진
const agentDetailData = ref({ sum: 0, total: 0 }); // 리뷰 평점 합과 수
const props = defineProps({
  propertyData: {
    type: Object,
    default: () => ({
      pnumber: 0,
      pcategory: "월세",
      pdeposite: 3000,
      prentalfee: 20,
      ptitle: "O성북천변 신축급 풀옵션원룸O성신여대역도보4분거리O",
      pfloor: 1,
      psize: 25,
      pmaintenance: 8,
      detailInfo: "",
      pstatus: "",
    }),
  },
  favoriteData: {
    type: Object,
    default: () => ({
      pnumber: 0,
      pcategory: "월세",
      pdeposite: 3000,
      prentalfee: 20,
      ptitle: "O성북천변 신축급 풀옵션원룸O성신여대역도보4분거리O",
      pfloor: "",
      pfloortype: "",
      psize: 25,
      pmaintenance: 8,
      pdetailInfo: "",
    }),
  },
  agentData: {
    type: Object,
    default: () => ({
      anumber: 0,
      abrand: "검은소와 중개소",
      aname: "",
      aphone: "",
    }),
  },
});

const getRole = ref();

// 중개인 첨부 사진 가져오기
const getAttach = async (argAnumber) => {
  try {
    const response = await agentAPI.agentAttachDownload(argAnumber);
    const blob = response.data;
    aattach.value = URL.createObjectURL(blob);
  } catch (error) {
    console.log(error);
  }
};

// 중개인 리뷰 데이터 가져오기
const getAgentReviewData = async (argAnumber) => {
  try {
    const response = await agentAPI.getAgentReviewData(argAnumber);
    agentDetailData.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

// 매물 첨부 사진 가져오기
const getPttach = async (argPnumber) => {
  try {
    const response = await propertyAPI.propertyAttachDownload(argPnumber);
    const blob = response.data;
    pattach.value = URL.createObjectURL(blob);
  } catch (error) {
    console.log(error);
  }
};
// 관심상품 첨부 사진 가져오기
const getFttach = async (argPnumber) => {
  try {
    const response = await propertyAPI.propertyAttachDownload(argPnumber);
    const blob = response.data;
    fattach.value = URL.createObjectURL(blob);
  } catch (error) {
    console.log(error);
  }
};

// 평균 평점 계산
const averageRating = computed(() => {
  const total = agentDetailData.value.total;
  const sum = agentDetailData.value.sum;
  if (total == "0") {
    return "0.0";
  }
  return (sum / total).toFixed(1);
});

// 데이터가 변경될 때마다 API 호출
if (props.agentData.anumber) {
  getAttach(props.agentData.anumber);
  getAgentReviewData(props.agentData.anumber);
} else if (props.propertyData.pnumber) {
  getPttach(props.propertyData.pnumber);
} else {
  getFttach(props.favoriteData.pnumber);
}

// punumber로 role가져오는 메소드 정의
async function getUserDataByPunumber(qunumber) {
  const response = await memberAPI.getUserDataByUnumber(qunumber);
  getRole.value = response.data.userCommonData.urole;
}

// propertyData에 pnumber가 있으면 role가져오기
if (props.propertyData.pnumber) {
  getUserDataByPunumber(props.propertyData.punumber);
} 
</script>

<style scoped>
.property-link {
  display: block;
}

.property-item {
  display: flex;
  flex-direction: column;
}

.property-content {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.property-image {
  flex: 0 0 auto;
}

.property-info {
  flex: 1 1 auto;
  overflow: hidden;
}

@media (max-width: 768px) {
  .property-content {
    flex-direction: column;
    text-align: center;
  }

  .property-image {
    margin-bottom: 10px;
  }

  .property-info {
    text-align: center;
  }

  .listMemberType {
    margin: 10px auto 0;
  }
}

.listMemberType {
  width: 50px;
  font-size: 12px;
}

.listPrice {
  font-size: 18px;
}

.listInfo {
  font-size: 14px;
}

p {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0;
}
</style>
