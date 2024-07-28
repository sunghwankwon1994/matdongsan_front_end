<template>
  <div class="position-relative">
    <table class="table table-borderless m-0">
      <tbody>
        <tr>
          <th scope="row" rowspan="2" class="w-50 pe-0">
            <img
              class="img-fluid thumbnail p-0"
              v-if="pthumbnail != null"
              :src="pthumbnail"
            />
            <img v-else src="../../../assets/no_image.jpg" width="200" alt="" />
          </th>
          <td class='ps-0 pe-0'>
            <div class="row row-cols-2 p-0">
              <div v-for="index in 4" :key="index" class="p-0">
                <img
                  class="img-fluid property-img mb-2  p-0 pe-2"
                  v-if="index <= pattaches.length && pattaches[index - 1]"
                  :src="pattaches[index - 1]"
                />
                <img
                  class="img-fluid property-img"
                  v-else
                  src="../../../assets/no_image.jpg"
                  alt="No Image"
                />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <span
      class="btn btn-dark position-absolute bottom-0 end-0 ms-4 mb-4 opacity-75"
      @click="showDetailPhotoModal"
      >사진 모두 보기</span
    >
  </div>

  <div class="modal fade" tabindex="-1" id="DetailPhotoModal">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <button
        type="button"
        class="btn-close btn-close-white position-absolute top-0 end-0 pe-auto"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
      <div class="modal-content">
        <div id="carouselExampleCaptions" class="carousel slide">
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              v-for="(item, index) in pattaches"
              :key="index"
              type="button"
              :data-bs-target="'#carouselExampleCaptions'"
              :data-bs-slide-to="index + 1"
              :aria-label="'Slide ' + (index + 2)"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                v-if="pthumbnail != null"
                :src="pthumbnail"
                class="d-block w-100 thumbnail-photo"
                width="798"
                height="776"
                alt="상세 사진"
              />
            </div>
            <div
              class="carousel-item"
              v-for="(item, index) in pattaches"
              :key="index"
            >
              <img
                v-if="item"
                :src="item"
                class="d-block w-100"
                width="798"
                height="776"
                alt="상세 사진"
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal } from "bootstrap";

const props = defineProps(["pthumbnail", "pattaches"]);

console.log("props.pattaches.length : " + props.pattaches.length);

// 모달 열기
function showDetailPhotoModal() {
  const detailPhotoModal = new Modal(
    document.getElementById("DetailPhotoModal")
  );
  detailPhotoModal.show();
}
</script>

<style scoped>
.thumbnail {
  height: 502px;
  width: 466px;
  margin-right:490px;
}
.property-img {
  width: 256px;
  height: 248px;
}

</style>
