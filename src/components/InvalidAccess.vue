<template>
  <div class="container mt-5 overflow-hidden">
    <div class="row justify-content-center ov">
      <div class="col-md-6 text-center">
        <div class="alert alert-danger" role="alert">
          <h1 class="alert-heading">잘못된 접근입니다</h1>
          <p>해당 페이지에 접근할 수 없습니다.</p>
          <hr />
          <button class="btn btn-primary mt-3" @click="goHome">
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
function goHome() {
  router.push("/");
}
</script>

<style scoped>
h1 {
  color: red;
}
.container{
    height: 443px;
    overflow-y: hidden;
}
</style>
