<template>
  <!-- 'property' 타입일 경우에만 렌더링되는 블록 -->
  <div v-if="props.type == 'property'">
    <!-- 표시할 데이터가 없는 경우 -->
    <div
      v-if="!isLoading && displayedProperties.length === 0"
      class="no-results"
    >
      검색 결과 없음
    </div>
    <!-- displayedProperties 배열을 순회하며 PropertyListItem 컴포넌트를 렌더링 -->
    <div
      class="p-0"
      v-for="PropertyData in displayedProperties"
      :key="PropertyData.pnumber"
    >
      <!-- PropertyListItem 컴포넌트에 exampleProperty 데이터를 전달 -->
      <PropertyListItem :propertyData="PropertyData" />
    </div>
    <!-- 로딩 중일 때 표시되는 로딩 메시지 -->
    <div v-if="isLoading" class="loading">Loading...</div>
    <!-- 스크롤 트리거 요소 -->
    <div ref="scrollTrigger" style="height: 1px"></div>
  </div>

  <!-- 'agent' 타입일 경우에만 렌더링되는 블록 -->
  <div v-if="props.type == 'agent'">
    <!-- 표시할 데이터가 없는 경우 -->
    <div v-if="!isLoading && displayedAgents.length === 0" class="no-results">
      검색 결과 없음
    </div>
    <!-- displayedAgents 배열을 순회하며 PropertyListItem 컴포넌트를 렌더링 -->
    <div
      class="p-0"
      v-for="AgentData in displayedAgents"
      :key="AgentData.anumber"
    >
      <!-- PropertyListItem 컴포넌트에 exampleAgent 데이터를 전달 -->
      <PropertyListItem :agentData="AgentData" />
    </div>
    <!-- 로딩 중일 때 표시되는 로딩 메시지 -->
    <div v-if="isLoading" class="loading">Loading...</div>
    <!-- 스크롤 트리거 요소 -->
    <div ref="scrollTrigger" style="height: 1px"></div>
  </div>

  <!-- 'favorite' 타입일 경우에만 렌더링되는 블록 -->
  <div v-if="props.type == 'favorite'">
    <!-- 표시할 데이터가 없는 경우 -->
    <div
      v-if="!isLoading && displayedFavorites.length === 0"
      class="no-results"
    >
      검색 결과 없음
    </div>
    <!-- displayedFavorites 배열을 순회하며 PropertyListItem 컴포넌트를 렌더링 -->
    <div
      class="p-0"
      v-for="favoriteData in displayedFavorites"
      :key="favoriteData.fPnumber"
    >
      <!-- PropertyListItem 컴포넌트에 exampleFavorite 데이터를 전달 -->
      <PropertyListItem :favoriteData="favoriteData.property" />
    </div>
    <!-- 로딩 중일 때 표시되는 로딩 메시지 -->
    <div v-if="isLoading" class="loading">Loading...</div>
    <!-- 스크롤 트리거 요소 -->
    <div ref="scrollTrigger" style="height: 1px"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import PropertyListItem from "./PropertyListItem.vue";
import agentAPI from "@/apis/agentAPI";
import propertyAPI from "@/apis/propertyAPI";
import { stringify } from "qs";
const emit = defineEmits([
  "update:positionData",
  "update:propertyPositionData",
  "getTotalPropertyListData",
  "getFavoriteListData",
  "checkResetBtn",
]);

const props = defineProps([
  "type",
  "filters",
  "propertyfilters",
  "searchedData",
  "searchedPropertyKeywordData",
  "propertyPosition",
  "isClickedReset",
]); // props로부터 type 속성 정의
const displayedProperties = ref([]); // 표시할 property 목록
const displayedTotalProperties = ref([
  { pnumber: 0, platitude: "", plongitude: "" },
]); // 지도에 표시할 전체 property 목록
const displayedFavorites = ref([]); // 표시할 favorite 목록
const displayedAgents = ref([]); // 표시할 agent 목록
const isLoading = ref(false); // 로딩 상태
const allLoaded = ref(false); // 모든 데이터를 로드했는지 여부
const limit = 5; // 한번에 로드할 항목 수
let offset = ref(1); // 현재 오프셋 값
const resetBtnStatus = ref(true); // 지도초기화 관련 부모 변수 값 초기화를 위한 변수
const scrollTrigger = ref(null); // 스크롤 트리거 요소 참조

const loadMoreItems = async () => {
  // 인피니티 스크롤
  // 이미 로딩 중이거나 모든 데이터를 로드한 경우 함수를 종료
  if (isLoading.value || allLoaded.value) return;

  // 로딩 상태를 true로 설정
  isLoading.value = true;

  try {
    // type이 'property'인 경우
    if (props.type === "property") {
      const response = await propertyAPI.getPropertyList(
        offset.value,
        limit,
        props.propertyfilters,
        props.searchedPropertyKeywordData,
        props.propertyPosition.lat,
        props.propertyPosition.lng
      );
      const dataLength = response.data.property.length;
      displayedProperties.value.push(...response.data.property);
      displayedTotalProperties.value = response.data.propertyTotalList;
      emit("getTotalPropertyListData", displayedTotalProperties.value);
      console.log(displayedProperties.value.length + " 길이");
      if (dataLength < limit) {
        allLoaded.value = true;
      }
    }
    // type이 'agent'인 경우
    else if (props.type === "agent") {
      const response = await agentAPI.getAgentList(
        offset.value,
        limit,
        props.filters,
        props.searchedData
      );

      const dataLength = response.data.agent.length;
      displayedAgents.value.push(...response.data.agent);
      if (dataLength < limit) {
        allLoaded.value = true;
      }
    }
    // type이 'favorite'인 경우
    else if (props.type === "favorite") {
      const response = await propertyAPI.getFavoriteList(offset.value, limit);
      const dataLength = response.data.favorite.length;
      console.log(dataLength);
      displayedFavorites.value.push(...response.data.favorite);
      emit("getFavoriteListData", displayedFavorites.value);
      if (dataLength < limit) {
        allLoaded.value = true;
      }
    }
    if (!allLoaded.value) {
      offset.value++; // 데이터가 충분히 로드되었다면 offset 증가
    }
  } catch (error) {
    console.error(error);
  } finally {
    // 로딩 상태를 false로 설정
    isLoading.value = false;
  }
};

onMounted(() => {
  loadMoreItems();
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMoreItems();
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }
  );
  if (scrollTrigger.value) {
    observer.observe(scrollTrigger.value);
  }
});

watch(
  () => props.type, // 타입이 변경이 되면 값 초기화
  () => {
    // 밑에는 타입이 변경되면 실행될 내용들
    console.log(props.type);
    displayedProperties.value = [];
    displayedFavorites.value = [];
    displayedAgents.value = [];
    offset.value = 1;
    allLoaded.value = false; // 모든 데이터 로드 상태 초기화
    loadMoreItems(); // 새로운 type에 따라 데이터를 로드
  }
);

//여기 부분 수정해야함 ( 버튼을 눌러야만 변경이 되도록 해야합니다.ㄴ)
watch(
  () => props.filters,
  (newFilters) => {
    // 필터가 변경되면 리스트를 초기화하고 다시 로드
    displayedProperties.value = [];
    displayedFavorites.value = [];
    displayedAgents.value = [];
    offset.value = 1;
    allLoaded.value = false; // 모든 데이터 로드 상태 초기화
    loadMoreItems(); // 필터에 따라 데이터를 로드
  },
  { deep: true }
);

watch(
  () => props.propertyfilters,
  (newFilters) => {
    // 필터가 변경되면 리스트를 초기화하고 다시 로드
    displayedProperties.value = [];
    offset.value = 1;
    allLoaded.value = false; // 모든 데이터 로드 상태 초기화
    loadMoreItems(); // 필터에 따라 데이터를 로드
  },
  { deep: true }
);

watch(
  () => props.searchedData,
  (newSearchData) => {
    // 검색어가 변경되면 리스트를 초기화하고 다시 로드
    displayedProperties.value = [];
    displayedFavorites.value = [];
    displayedAgents.value = [];
    offset.value = 1;
    allLoaded.value = false; // 모든 데이터 로드 상태 초기화
    loadMoreItems(); // 검색어에 따라 데이터를 로드
  }
);

watch(
  () => props.searchedPropertyKeywordData,
  (newSearchData) => {
    // 검색어가 변경되면 리스트를 초기화하고 다시 로드
    displayedProperties.value = [];
    offset.value = 1;
    allLoaded.value = false; // 모든 데이터 로드 상태 초기화
    loadMoreItems(); // 검색어에 따라 데이터를 로드
  }
);

// agentList 배열의 변경을 감지하여 emit
watch(
  () => displayedAgents.value,
  (newValue) => {
    emit("update:positionData", newValue);
  },
  { deep: true }
);

// propertyList 배열의 변경을 감지하여 emit
watch(
  () => displayedProperties.value,
  (newValue) => {
    emit("update:propertyPositionData", newValue);
  },
  { deep: true }
);

// displayedTotalProperties 배열의 변경을 감지하여 emit
watch(
  () => displayedTotalProperties.value,
  (newValue) => {
    emit("getTotalPropertyListData", newValue);
  },
  { deep: true }
);

watch(
  () => props.propertyPosition,
  (newValue) => {
    console.log("좌표 변경");
    console.log("타입:" + props.type);
    displayedProperties.value = [];
    displayedFavorites.value = [];
    displayedAgents.value = [];
    offset.value = 1;
    allLoaded.value = false;
    loadMoreItems();
  },
  { deep: true }
);
watch(
  () => props.isClickedReset,
  () => {
    emit("checkResetBtn", resetBtnStatus);
    displayedProperties.value = [];
    displayedFavorites.value = [];
    displayedAgents.value = [];
    offset.value = 1;
    allLoaded.value = false;
    
    loadMoreItems();
  }
);
</script>

<style scoped>
.loading {
  text-align: center;
  padding: 20px;
  font-size: 20px;
}
.no-results {
  text-align: center;
  padding: 20px;
  font-size: 20px;
  color: gray;
}
</style>
