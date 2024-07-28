<template>
    <div class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div name="body">
            <div class="modal-body">
              <div class="fw-bold p-4 h-4 text-center">
                <slot>
                    
                </slot>
              </div>
            </div>
          </div>
          <div name="footer">
            <div class="modal-footer border border-0 mx-auto mb-3">
              <button
                type="button"
                class="btn btn-outline-light ps-4 pe-4 text-dark border border-secondary fw-bold"
                data-bs-dismiss="modal">
                확인
              </button>
              <!-- <button
                type="button"
                class="btn btn-warning ms-5 ps-4 pe-4 fw-bold" @click="emit('close')">
                거래완료
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
//   const emit = defineEmits(["close"]);
  
  </script>
  
  <style scoped></style>
  