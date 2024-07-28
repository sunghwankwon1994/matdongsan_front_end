<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <slot name="body">
          <div class="modal-body">
            <p class="fw-bold p-4 h-4 text-center">
              게시글을 삭제 하시겠습니까? <br />
              삭제 후에 수정 불가합니다.
            </p>
          </div>
        </slot>
        <slot name="footer">
          <div class="modal-footer border border-0 mx-auto mb-3">
            <button
              type="button"
              class="btn btn-outline-light ps-4 pe-4 text-dark border border-secondary fw-bold"
              data-bs-dismiss="modal">
              취소
            </button>
            <button
              type="button"
              class="btn btn-warning ms-5 ps-4 pe-4 fw-bold" @click="deleteProperty">
              삭제
            </button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["close", "delete-property"]);
const props = defineProps({
  pnumber: {
    type: Number,
    required: true
  }
});

function deleteProperty() {
  emit('delete-property', props.pnumber);
  emit('close');
}

</script>

<style scoped></style>
