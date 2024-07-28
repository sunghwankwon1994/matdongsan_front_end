<template>
    <div class="mt-5">
      <h4 class="fw-bold">상세 설명</h4>
      <hr />
      <div class="d-flex mb-3">
        <span class="me-5 align-self-center">제목 *</span>
        <input
          type="text"
          class="col form-control form-control-sm border border-1 border-secondary p-2"
          placeholder="리스트에 노출되는 문구입니다. 40자 미만으로 작성해주세요"
          v-model="property.ptitle"
        />
        <div class="col-5"></div>
      </div>
  
      <div class="w-75">
        <span class="me-5 align-self-center">내용 *</span>
        <VueQuillEditor v-model="propertyDetail.pdcontent" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { toRefs } from 'vue';
  import VueQuillEditor from "@/components/VueQuillEditor.vue";
  
  const props = defineProps([
    'propertyDetail', 'property'
  ]);
  
  const { propertyDetail } = toRefs(props);
  const { property } = toRefs(props);
  </script>
  