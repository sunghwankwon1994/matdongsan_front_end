<script setup>
import { ref, watch, onMounted } from "vue";

// Props와 이벤트 정의
const props = defineProps(["imagePurpose",  "initialImages"]); // imagePurpose prop을 통해 single 또는 multi 이미지를 구분
const emit = defineEmits(["update:image", "file-input"]); // update:image 이벤트를 부모 컴포넌트로 전달


onMounted(() => {
  emit('file-input', fileInput.value);
});

// 반응형 참조 정의
const fileInput = ref(null); // 파일 입력 필드 참조
const imageFiles = ref([]); // 선택된 이미지 파일 목록

// 파일을 읽고 파일과 데이터 URL을 포함하는 객체를 반환하는 함수
const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve({ file, src: e.target.result }); // 파일과 데이터 URL을 포함한 객체를 반환
    };
    reader.onerror = reject;
    reader.readAsDataURL(file); // 파일의 데이터 URL을 읽기 시작
  });
};

// 파일 입력 변경 이벤트를 처리하는 함수
const previewImages = async () => {
  const files = Array.from(fileInput.value.files); // 선택된 파일들을 배열로 변환

  const promises = files.map(readFile); // 각 파일에 대해 readFile 함수 호출
  const newImages = await Promise.all(promises); // 모든 파일 읽기 완료 후 배열로 반환

  if (props.imagePurpose === 'single') {
    // 썸네일은 하나만 유지
    imageFiles.value = newImages;
  } else {
    // 다중 이미지는 기존 배열에 추가
    imageFiles.value = [...imageFiles.value, ...newImages];
  }

  // 업데이트된 이미지 파일들을 부모 컴포넌트로 전달
  emit(
    "update:image",
    imageFiles.value.map((image) => image.file)
  );
};

// 인덱스를 통해 이미지를 삭제하는 함수
const removeImage = (index) => {
  imageFiles.value.splice(index, 1); // 해당 인덱스의 이미지 삭제
  syncFiles(); // 파일 입력 필드와 동기화
  emitUpdatedImages(); // 이미지를 삭제한 후 업데이트된 데이터를 부모 컴포넌트에 전달
};

// 현재 이미지 파일들과 파일 입력 필드를 동기화하는 함수
const syncFiles = () => {
  const dataTransfer = new DataTransfer();
  imageFiles.value.forEach(({ file }) => dataTransfer.items.add(file));
  fileInput.value.files = dataTransfer.files;
};

// 업데이트된 이미지를 부모 컴포넌트로 전달하는 함수
const emitUpdatedImages = () => {
  emit(
    "update:image",
    imageFiles.value.map((image) => image.file)
  );
};

// imageFiles가 변경될 때마다 파일 입력 필드를 동기화
watch(imageFiles, () => {
  syncFiles();
});
</script>

<template>
  <div>
    <!-- imagePurpose prop에 따라 파일 입력 필드 조건부 렌더링 -->
    <div v-if="props.imagePurpose !== 'single'" class="mb-3">
      <input
        ref="fileInput"
        type="file"
        class="form-control w-50 border border-1 border-dark"
        @change="previewImages"
        accept="image/*"
        multiple
      />
    </div>
    <div v-else>
      <input
        ref="fileInput"
        type="file"
        class="form-control w-50 border border-1 border-dark"
        @change="previewImages"
        accept="image/*"
      />
    </div>
    <!-- 이미지 미리보기를 표시 -->
    <div class="d-flex flex-wrap g-1 mt-3">
      <div
        v-for="(imageFile, index) in imageFiles"
        :key="index"
        class="image-preview position-relative"
      >
        <img :src="imageFile.src" alt="Image preview" />
        <!-- 이미지를 삭제하는 버튼 -->
        <button
          class="btn-close position-absolute top-0 end-0"
          @click="removeImage(index)"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<style>
/* 이미지 미리보기 및 닫기 버튼 스타일 */
.image-preview img {
  width: 150px;
  height: 150px;
}
.image-preview {
  position: relative;
  margin-right: 10px;
}
.btn-close {
  z-index: 2;
}
</style>
