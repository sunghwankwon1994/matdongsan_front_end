<template>
  <div class="mt-5">
    <div class="d-flex">
      <h4 class="col">사진 등록</h4>
    </div>
    <hr />
    <div class="image-box">
      <span class="me-5 col-2 align-self-center">썸네일 사진 *</span>
      <!-- 이미지 미리보기 컴포넌트 -->
      <ImagePreview
        imagePurpose="single"
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
</template>

<script setup>
import { reactive } from "vue";
import ImagePreview from "@/components/ImagePreview.vue";

const images = reactive({
  single: [],
  multi: []
});

const emit = defineEmits(["updateImages"]);

function handleSingleImageUpdate(files) {
  console.log('Received single image files:', files);
  images.single = files;  // 단일 이미지 파일 정보 저장
  updateParent();
}

function handleMultiImageUpdate(files) {
  console.log('Received multi image files:', files);
  images.multi = files;  // 다중 이미지 파일 정보 저장
  updateParent();
}

function updateParent() {
  console.log('Emitting updateImages event with:', { single: images.single, multi: images.multi });
  emit('updateImages', { single: images.single, multi: images.multi });
}
</script>

<style scoped>
.image-box {
  height: auto;
}
</style>
