<template>
  <div class="sidebar">
    <ul class="list-group">
      <li class="list-group-item fw-bolder h5 m-0 p-3">마이페이지</li>
      <RouterLink
        to="/MyPage/MyInfomation"
        class="text-decoration-none text-dark"
      >
        <li class="list-group-item item border border-bottom-0">내 정보</li></RouterLink
      >
      <RouterLink
        to="/MyPage/ManageMyProperty"
        class="text-decoration-none text-dark"
      >
        <li class="list-group-item item border border-bottom-0">매물 관리</li></RouterLink
      >
      <RouterLink
        to="/MyPage/ReportFalseListing"
        class="text-decoration-none text-dark"
      >
        <li class="list-group-item item border border-bottom-0">허위매물 신고</li></RouterLink
      >
      <RouterLink
        to="/MyPage/CustomerInquiry"
        class="text-decoration-none text-dark"
      >
        <li class="list-group-item item border border-bottom-0">1:1 문의내역</li></RouterLink
      >
      <RouterLink
        to="/MyPage/DeleteAccount"
        class="text-decoration-none text-dark"
      >
        <li class="list-group-item item">회원 탈퇴</li>
      </RouterLink>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const mypageSidebarButtonsColor = ref("border-color : #2F4858");
</script>

<style scoped>
.sidebar {
  width: 20%;
  padding: 10px;
  border-right: 1px solid #ddd;
}

.sidebar .list-group-item.item {
  display: flex;
  align-items: center;
}
.btn {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}
.item {
  height: 60px;
}
.item:hover {
  background-color: blanchedalmond;
  cursor: pointer;
}
</style>
