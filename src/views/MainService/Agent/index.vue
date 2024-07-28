<template>
  <div class="AgentMap-container w-75 mx-auto mb-5">
    <div class="h-100">
      <div class="mt-2 w-100">
        <div class="d-flex justify-content-end">
          <div class="d-flex">
            <input
              class="form-control me-2 w-auto"
              type="search"
              placeholder="부동산 검색"
              aria-label="Search"
              v-model="searchKeywordForAgent"
              @keyup.enter="searchInAgent"
            />
            <button
              class="btn btn-outline-success"
              type="button"
              @click="searchInAgent"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <AgentFilter @update:filterData="getFilterData" />
      <ul class="nav nav-pills ms-4 mt-3">
        <li class="nav-item">
          <RouterLink
            class="btn btn-sm text-dark fw-bold nav-link"
            aria-current="page"
            to="/Property"
            >전체 방</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink
            class="nav-link fw-bold text-dark border-bottom border-4 border-info rounded-0"
            to="/Agent"
            >전체 부동산</RouterLink
          >
        </li>
        <!-- 아이콘들 -->
        <div
          class="col-8 pe-4 ms-3 me-3 text-end align-self-center"
          v-if="route.params.id"
        >
          <i
            class="fa-solid fa-arrow-left fa-xl me-3"
            @click="backToAgentList"
          ></i>
        </div>
      </ul>

      <div class="d-flex p-3 h-100 w-100 mx-auto">
        <div class="property-list-box overflow-auto">
          <div class="col mt-3">
            <PropertyList
              type="agent"
              @update:positionData="getAgentPositionData"
              :filters="filterData"
              :searchedData="searchedKeyword"
            />
          </div>
        </div>
        <div class="right-box ms-4 col p-3 w-75" v-if="route.params.id">
          <div class="w-75">
            <div class="text-start test">
              <div>
                <img
                  :src="agentProfile"
                  height="100"
                  width="100"
                  class="rounded-circle me-3"
                />
                <span class="fw-bold">{{ agent.abrand }}</span>
              </div>
            </div>
            <div>
              <DetailInfo
                :agentData="agent"
                :detailData="agentDetail"
                :joinDate="joinDate"
                :tradeCount="tradeCount"
              />
            </div>
            <ul class="nav nav-pills ms-4">
              <li class="nav-item">
                <div
                  class="btn btn-sm text-dark fw-bold nav-link rounded-0"
                  :class="isCommentMenu ? selected : ''"
                  @click="subMenuCheck(true)"
                >
                  전체 매물
                </div>
              </li>
              <li class="nav-item">
                <div
                  class="btn btn-sm nav-link fw-bold text-dark rounded-0"
                  :class="isCommentMenu ? '' : selected"
                  @click="subMenuCheck(false)"
                >
                  후기
                </div>
              </li>
            </ul>
            <div>
              <div class="d-flex pe-3 pb-3">
                <div
                  class="property-list-box w-100 h-auto"
                  v-if="isCommentMenu"
                >
                  <div class="col mt-3">
                    <IndividualProductList />
                  </div>
                </div>
                <div class="right-box col" v-if="!isCommentMenu">
                  <AgentReview
                    :reviewData="reviewData"
                    :pager="pagerData"
                    @update-agent-data="getAgentData"
                    @update:currentPage="handlePageChange"
                    @get:agentFilter="getAgentReviewFilter"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="!route.params.id"
          class="map-box right-box col p-3 w-75 mx-auto"
        >
          <KakaoMap page="agentList" :positionList="agentPositionList" @get:clickedAgentPosition="getClickAgentPosition"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PropertyList from "@/components/Property/PropertyList.vue";
import KakaoMap from "@/components/KakaoMap.vue";
import DetailInfo from "./DetailInfo.vue";
import IndividualProductList from "./AgentProperty";
import AgentReview from "./AgentReview";
import agentAPI from "@/apis/agentAPI";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import memberAPI from "@/apis/memberAPI";
import AgentFilter from "./AgentFilter.vue";

const agentProfile = ref(null);
const route = useRoute();
const router = useRouter();
const agent = ref({});
const agentDetail = ref({});
const agentPositionList = ref([]);
const reviewData = ref([]);
const pagerData = ref({});
const isCommentMenu = ref(true);
const selected = "border-bottom border-4 border-warning";
const searchKeywordForAgent = ref("");
const searchedKeyword = ref(""); // 검색어를 저장할 새로운 변수
const memberProfiles = ref({});
const currentPage = ref(0);
const filterData = ref({});
const joinDate = ref("");
const tradeCount = ref(0);
const agentReviewFilter = ref("");

// 검색 함수
function searchInAgent() {
  // 검색어를 업데이트
  searchedKeyword.value = searchKeywordForAgent.value;
}

const getMattach = async (memberId) => {
  try {
    const response = await memberAPI.memberAttachDownload(memberId);
    // if(response.headers["Content-Length"]) {
      const blob = response.data;
      memberProfiles.value[memberId] = URL.createObjectURL(blob);
    // }
  } catch (error) {
    console.log(error);
  }
};

// 중개인 데이터 get 함수
const getAgentData = async (pageNo = 1) => {
  try {
    const response = await agentAPI.getAgentDataByNumber(
      route.params.id,
      pageNo,
      agentReviewFilter.value
    );
    agent.value = response.data.agent;
    agentDetail.value = response.data.agentDetail;
    pagerData.value = response.data.pager;
    joinDate.value = response.data.joinDate;
    tradeCount.value = response.data.tradeCount;
    if (response.data.agentReviewList) {
      const reviews = response.data.agentReviewList;
      await Promise.all(
        reviews.map(async (review) => {
          await getMattach(review.arMnumber);
        })
      );
      reviewData.value = reviews.map((review) => ({
        ...review,
        profile: memberProfiles.value[review.arMnumber],
      }));
    }

    await getAttach(route.params.id);
  } catch (error) {
    console.log(error);
  }
};

//중개인 이미지 다운로드
const getAttach = async (argAnumber) => {
  try {
    const response = await agentAPI.agentAttachDownload(argAnumber);
    const blob = response.data;
    agentProfile.value = URL.createObjectURL(blob);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  if (route.params.id) {
    getAgentData();
  }
});
//중개인 좌표데이터 자식으로부터 가져오기
function getAgentPositionData(data) {
  agentPositionList.value = data;
}
//필터값 자식으로부터 가져오기
function getFilterData(data) {
  filterData.value = data;
}

const handlePageChange = (page) => {
  currentPage.value = page;
  getAgentData(page);
};
//params 값이 변경될때마다 agentData를 업데이트
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      getAgentData();
      isCommentMenu.value=true;
    }
  }
);

watch(
  () => agentPositionList.value.length,
  () => {
    console.log("Agent position list updated");
    // KakaoMap 컴포넌트는 이미 agentPositionList를 prop으로 받고 있으므로 자동으로 업데이트.
  },
);
function backToAgentList() {
  router.push("/Agent");
}

function subMenuCheck(check) {
  isCommentMenu.value = check;
}

//리뷰 필터 항목 가져오기
function getAgentReviewFilter(data) {
  agentReviewFilter.value = data;
}

watch(
  () => agentReviewFilter.value,
  () => {
    getAgentData();
  }
);

//좌표를 가지고 해당 되는 부동산페이지로 이동
async function moveAgentDetailByPosition(lat,lng){
  try {
    const response = await agentAPI.getAgentDataByPosition(lat,lng);
    console.log(response.data);
    router.push("/Agent/"+response.data);
  } catch (error) {
    console.log(error);
  }
}

//지도에서 클릭된 마커의 좌표 값 가져오기
function getClickAgentPosition(lat,lng) {
  console.log("좌표 가져오기 함수 실행");
  console.log(lat);
  console.log(lng);
  if(lat && lng){
    moveAgentDetailByPosition(lat,lng);
  }
}
</script>

<style scoped>
.map-box {
  height: 708px;
}
.property-list-box {
  height: 708px;
}
.fa-arrow-left {
  cursor: pointer;
}
.fa-arrow-left:hover {
  color: #b8b8b8;
  transition: 0.25s;
}
:deep(.property-list-box::-webkit-scrollbar) {
  width: 12px;
}

:deep(.property-list-box::-webkit-scrollbar-track) {
  background: #f1f1f1;
}

:deep(.property-list-box::-webkit-scrollbar-thumb) {
  background: #888;
  border-radius: 10px; 
}

:deep(.property-list-box::-webkit-scrollbar-thumb:hover) {
  background: #555;
}
</style>
