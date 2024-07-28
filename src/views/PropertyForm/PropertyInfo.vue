<template>
  <div>
    <div class="d-flex">
      <h4 class="col fw-bold">매물 정보</h4>
      <p class="m-0 fw-bold">*필수항목</p>
    </div>
    <hr />
    <div class="mt-5">
      <div class="d-flex">
        <span class="fw-bold">매물 유형 *</span>
        <div class="col ms-5">원룸</div>
      </div>
    </div>
    <div class="mt-5">
      <div class="d-flex">
        <span class="fw-bold">매물 주소 *</span>
        <div class="col ms-5">
          <label for="address1" class="mb-3">주소검색</label><br />
          <div class="d-flex">
            <input
              type="text"
              name="address1"
              class="address me-2"
              placeholder="예) 서울시 강남구 봉은사로 1길 12,1층"
              size="40"
              v-model="property.paddress"
              readonly
            />
            <div
              type="button"
              class="address-search-btn btn btn-dark btn-sm"
              @click="openPostSearch"
            >
              검색
            </div>
          </div>
          <input
            type="text"
            class="row ms-0 mt-3 postcode"
            placeholder="우편번호"
            size="20"
            v-model="property.ppostcode"
            readonly
          />
          <input
            type="text"
            class="row ms-0 mt-3"
            placeholder="상세주소 입력"
            v-model="property.paddressdetail"
            size="20"
            @input="emitUpdate"
          />
        </div>
        <div
          class="map-box col border border-1 border-secondary rounded text-center text-muted position-relative"
          id="map"
        >
          <div class="loading-font align-self-center fw-bold position-absolute">
            Loading...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const kakao = window.kakao;

const props = defineProps({
  property: Object,
});
const emit = defineEmits(["update:property"]);
const { property } = toRefs(props);

// 주소 검색
function openPostSearch() {
  new window.daum.Postcode({
    oncomplete: (data) => {
      property.value.ppostcode = data.zonecode;
      property.value.paddress = data.address;
      emitUpdate();
      showMap(data.address); // 주소 검색 완료 후 지도에 표시
    },
  }).open();
}

// 주소 지도 표시
function showMap(address) {
  const mapContainer = document.getElementById("map");
  let mapOption;
  if (route.params.id) {
    mapOption = {
      center: new kakao.maps.LatLng(address.platitude, address.plongitude),
      level: 3,
    };
  } else if (!address) {
    return;
  } else {
    mapOption = {
      center: new kakao.maps.LatLng(address.platitude, address.plongitude),
    };
  }

  const map = new kakao.maps.Map(mapContainer, mapOption);
  const geocoder = new kakao.maps.services.Geocoder();
  var markerPosition = new kakao.maps.LatLng(
    address.platitude,
    address.plongitude
  );

  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    position: markerPosition,
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  geocoder.addressSearch(address, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      property.value.plongitude = result[0].x;
      property.value.platitude = result[0].y;
      const marker = new kakao.maps.Marker({
        map: map,
        position: coords,
      });
      map.setCenter(coords);
    }
  });
}

function emitUpdate() {
  emit("update:property", { property });
  console.log(property.value);
}

watch(
  () => props.property,
  (newValue) => {
    Object.assign(property, newValue);
  }
);

onMounted(async () => {
  const script = document.createElement("script");
  script.onload = () =>
    kakao.maps.load(() => {
      if (route.params.id) {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new kakao.maps.LatLng(
            property.value.platitude,
            property.value.plongitude
          ),
          level: 3,
          draggable: false,
          disableDoubleClickZoom: true,
        };
        new kakao.maps.Map(mapContainer, mapOption);
      } else {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
          draggable: false,
          disableDoubleClickZoom: true,
        };
        new kakao.maps.Map(mapContainer, mapOption);
      }
    });
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_API_KEY}&libraries=services`;
  document.head.appendChild(script);
});
//좌표값을 가지고 있는 경우에는 좌표값으로 지도에 표시함 (예: 매물관리)
watch(
  () => [property.value.platitude, property.value.plongitude],
  () => {
    showMap(property.value);
  }
);
</script>

<style scoped>
.postcode,
.address {
  background-color: #dfdfdf;
  cursor: default;
}
.map-box {
  height: 250px;
}
.address-search-btn {
  width: 100px;
}
.loading-font {
  top: 45%;
  right: 40%;
}
</style>
