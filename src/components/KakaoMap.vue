//Kakaomap.vue
<template>
  <div id="map" class="position-relative">
    <div v-if="checkReset" class="reset-btn position-absolute bottom-0 mb-3 btn btn-success rounded-pill" @click="clickedResetMap">지도 초기화<i class=" ms-1 fa-solid fa-rotate-left"></i></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const emits = defineEmits(["getPropertyData","get:clickedAgentPosition","getPropertyClusterPosition","get:clickedPropertyPosition","checkResetByMap"]);
const props = defineProps(["positionList", "propertyPositionList", "position", "page","favoriteListData"]);

let map;
let cluster = null;
const bounds = ref(null);
const markers = ref([]);
const agentMarker = ref(null);
const kakao = window.kakao;
const userLatitude = ref(0);
const userLongitude = ref(0);
const checkReset = ref(false);
// 지도 초기화 함수
const initMap = () => {
  const container = document.getElementById("map");
  const mapOptions = {
    center: new kakao.maps.LatLng(userLatitude.value, userLongitude.value), // 초기 중심 좌표 설정
    level: 8, // 초기 줌 레벨
    maxLevel: 14,
    disableDoubleClickZoom: true,
  };

  map = new kakao.maps.Map(container, mapOptions);
  kakao.maps.event.addListener(map, "dragend", updateMarkersInView);
  kakao.maps.event.addListener(map, "zoom_changed", updateMarkersInView);

  // 페이지별 마커 로직 처리
  if (props.page === "favorite") {
    //관심 매물 페이지인 경우 관심 상품 마커 맵에 표시
    displayFavorites(props.favoriteListData);
  } else if (props.page === "agentList" && Array.isArray(props.positionList)) {
    // 중개인 리스트페이지이며 리스트들의 좌표값이 있을 경우 지도에 마커 표시
    displayMarker(props.positionList.map(agent => [agent.alatitude, agent.alongitude]), 'agent');
  } else if (props.page === "propertyList") {
    // 매물 페이지인 경우 매물 마커들 맵에 표시
    setupPropertyMarkers();
  }

  if (props.page === "agent" && props.position && typeof props.position === "object" && !Array.isArray(props.position)) {
    const agentLatLng = new kakao.maps.LatLng(37.57088408655518, 127.03615502944038);
    agentMarker.value = new kakao.maps.Marker({ position: agentLatLng, map: map });
    map.setCenter(agentLatLng);
  }
};

// 마커 표시 함수 최적화
const displayMarker = (markerPositions, type = 'default') => {
  // 기존 마커들 중 필요없는 마커 제거
  markers.value.forEach(marker => {
    if (!markerPositions.some(pos => pos[0] === marker.getPosition().getLat() && pos[1] === marker.getPosition().getLng())) {
      marker.setMap(null);
      markers.value = markers.value.filter(m => m !== marker);
    }
  });

  // 마커 이미지 설정
  let markerImage = null;
  if (type === 'favorite') {
    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; // 마커 이미지 URL
    const imageSize = new kakao.maps.Size(24, 35); // 마커 이미지 크기
    const imageOption = { offset: new kakao.maps.Point(12, 35) }; // 마커 이미지 중심 좌표
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
  }

  // 새로운 마커들만 추가
  markerPositions.forEach(position => {
    if (!markers.value.some(m => m.getPosition().getLat() === position[0] && m.getPosition().getLng() === position[1])) {
      const newMarker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(...position),
        map: map,
        image: markerImage // 마커 이미지 설정
      });

      // 마커 타입에 따른 클릭 이벤트 설정
      kakao.maps.event.addListener(newMarker, 'click', () => {
        handleMarkerClick(type, position);
      });

      markers.value.push(newMarker);
    }
  });

  // 클러스터 있을 경우 클러스터 업데이트
  if (cluster) {
    cluster.clear();
    cluster.addMarkers(markers.value);
  }
};

// 즐겨찾기 페이지 마커 표시
const displayFavorites = (favoriteDataList) => {
  console.log(favoriteDataList);
  displayMarker(favoriteDataList.map(fav => [fav.property.platitude, fav.property.plongitude]), 'favorite');
};

// 부동산 페이지 클러스터 설정
const setupPropertyMarkers = () => {
  displayMarker(props.propertyPositionList.map(property => [property.platitude, property.plongitude]), 'property');
  const clusterOptions = {
    map: map,
    level: 3,
    averageCenter: true,
  };
  cluster = new kakao.maps.MarkerClusterer(clusterOptions); //클러스터 기능을 쓰기위한 초기화 변수 선언
  cluster.setMinClusterSize(2); // 클러스터 최소 마커 -> 1개만 있어도 클러스터화
  cluster.addMarkers(markers.value); // 마커추가

  //클러스터 클릭이벤트 설정
  kakao.maps.event.addListener(cluster, 'clusterclick', function(cluster) {

// 현재 지도 레벨에서 1레벨 확대한 레벨
var level = map.getLevel()-1;
if(map.getLevel()===2){
  console.log("click: " +cluster.getCenter().getLat());
  emits("getPropertyClusterPosition",cluster.getCenter().getLat(),cluster.getCenter().getLng()) //지도에서 클러스터로 일정부분 확대가 되면 클릭 이벤트 작동
  checkReset.value=true;
}
// 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
map.setLevel(level, {anchor: cluster.getCenter()});
});
};

// 마커 클릭 이벤트 핸들러
const handleMarkerClick = (type, position) => {
if(type=='agent'){
  emits("get:clickedAgentPosition",position[0],position[1]);
} else {
  emits("get:clickedPropertyPosition",position[0],position[1]);
}
};

// 현재 뷰에 있는 마커 데이터 업데이트
const updateMarkersInView = () => {
  if (props.page === "favorite") return;

  bounds.value = map.getBounds();
  const propertyListData = markers.value.filter(marker => bounds.value.contain(marker.getPosition())).map(marker => {
    const pos = marker.getPosition();
    return { Ma: pos.Ma, La: pos.La };
  });
  emits("getPropertyData", propertyListData);
};

onMounted(() => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userLatitude.value = pos.coords.latitude;
      userLongitude.value = pos.coords.longitude;
      initMap();
    },
    (err) => {
      console.error("Geolocation error:", err);
      alert(err.message);
    }
  );
});

//중개인 포지션이 변경되면 상태 업데이트
watch(() => props.position, (newPosition) => {
  if (map && newPosition) {
    if (Array.isArray(newPosition)) {
      displayMarker(newPosition.map(agent => [agent.alatitude, agent.alongitude]), 'agent');
    } else {
      updateAgentMarker(newPosition);
    }
  }
});

watch(() => props.positionList ? props.positionList.length : 0, (newLength) => {
  if (map && newLength > 0) {
    displayMarker(props.positionList.map(agent => [agent.alatitude, agent.alongitude]), 'agent');
  }
});
watch(() => props.propertyPositionList ? props.propertyPositionList.length : 0, (newLength) => {
  if (map && newLength > 0) {
    displayMarker(props.propertyPositionList.map(property => [property.platitude, property.plongitude]), 'property');
  }
});
watch(() => props.favoriteListData ? props.favoriteListData.length : 0, (newLength) => {
  if (map && newLength > 0) {
    displayMarker(props.favoriteListData.map(fav => [fav.property.platitude, fav.property.plongitude]), 'favorite');
  }
});

// 에이전트 마커 위치 업데이트
const updateAgentMarker = (position) => {
  const newCenter = new kakao.maps.LatLng(position.lat, position.lng);
  if (agentMarker.value) {
    agentMarker.value.setPosition(newCenter);
  } else {
    agentMarker.value = new kakao.maps.Marker({
      position: newCenter,
      map: map,
    });
  }
  map.setCenter(newCenter);
};

function clickedResetMap() {
  checkReset.value= false;
  emits("checkResetByMap",checkReset.value); // 리셋이 true값이 되면 다시 지도 리스트 데이터 초기화
  map.setLevel(8);
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
.reset-btn{
  z-index: 10;
  right:45%;
}
</style>
