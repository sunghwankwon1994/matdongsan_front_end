<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li :class="['page-item', { disabled: currentPage === 1 }]">
        <button class="page-link" @click.prevent="goToPage(1)" :disabled="currentPage === 1">처음</button>
      </li>
      <li :class="['page-item', { disabled: currentPageGroup === 0 }]">
        <button class="page-link" @click.prevent="prevPageGroup" :disabled="currentPageGroup === 0">이전</button>
      </li>
      <li v-for="page in visiblePages" :key="page" :class="['page-item', { active: page == currentPage }]">
        <button class="page-link" @click.prevent="goToPage(page)">{{ page }}</button>
      </li>
      <li :class="['page-item', { disabled: isNextDisabled }]">
        <button class="page-link" @click.prevent="nextPageGroup" :disabled="isNextDisabled">다음</button>
      </li>
      <li :class="['page-item', { disabled: currentPage === totalPages }]">
        <button class="page-link" @click.prevent="goToPage(totalPages)" :disabled="currentPage === totalPages">끝</button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
    default: 1
  },
  totalPages: {
    type: Number,
    required: true,
    default: 1
  },
  maxVisiblePages: {
    type: Number,
    default: 5
  }
});



const emit = defineEmits(['update:currentPage']);

const currentPageGroup = ref(0);

console.log("페이지네이션 현재 페이지밖", props.currentPage);

watch(() => props.currentPage, (newPage) => {
  console.log("페이지네이션 현재 페이지 변함 감지", props.currentPage);
  currentPageGroup.value = Math.floor((newPage - 1) / props.maxVisiblePages);
});

const goToPage = (page) => {
  if (page < 1 || page > props.totalPages) return;
  emit('update:currentPage', page);
};

const prevPageGroup = () => {
  if (currentPageGroup.value > 0) {
    currentPageGroup.value--;
    goToPage(currentPageGroup.value * props.maxVisiblePages + 1);
  }
};

const nextPageGroup = () => {
  const nextGroupStart = (currentPageGroup.value + 1) * props.maxVisiblePages + 1;
  if (nextGroupStart <= props.totalPages) {
    currentPageGroup.value++;
    goToPage(nextGroupStart);
  } else {
    goToPage(props.totalPages);
  }
};

const visiblePages = computed(() => {
  const start = currentPageGroup.value * props.maxVisiblePages + 1;
  const end = Math.min(start + props.maxVisiblePages - 1, props.totalPages);
  const pages = [];
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const isNextDisabled = computed(() => {
  return currentPageGroup.value * props.maxVisiblePages + props.maxVisiblePages >= props.totalPages;
});


</script>

<style scoped>
.page-item.disabled .page-link {
  pointer-events: none;
  cursor: not-allowed;
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
</style>
