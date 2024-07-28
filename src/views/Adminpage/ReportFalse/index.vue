<template>
    <div>
      <div class="container w-50">
      <h2 style="text-align: center; margin-top: 70px; margin-bottom: 50px; font-weight: bold"><slot name="header">허위 매물 신고 리스트</slot></h2>
      <!-- 버튼 tab -->
      <div class="row" style="height: 50px;">
        <RouterLink to="/Adminpage/CustomerInquiry" class="askMenu col-6 d-flex" style="text-decoration: none; padding: none;">
          <button class="askMenuBtn" style="background-color: transparent; border: none; width: 100%;">고객 문의 리스트</button>
        </RouterLink>

        <RouterLink to="/Adminpage/ReportFalse" class="askMenuSelectd col-6 d-flex" style="text-decoration: none;">
          <button class="askMenuBtnSelected" style="background-color: transparent; border: none; width: 100%;">허위 매물 신고 리스트</button>
        </RouterLink>
      </div>
    </div>
      <ReportFalseList class="mb-5"/>
      <Pagination/>
    
    </div>
  </template>
    
    <script setup>
    import ReportFalseList from "./ReportFalseList";
    import AdminHeader from "@/components/AdminHeader";
    import Pagination from "@/components/Pagination";
    </script>
    
    <style scoped>
 .askMenu{
background-color: transparent;
color: black;
border: 1px solid lightgrey;
}

.askMenu:hover{
  background-color: #2F4858;
  color: white;
  /* border: 2px solid black; */
}

.askMenuBtn:hover{
  color: white;
}

.askMenuSelectd{
  background-color: #2F4858;
  color: white;
  /* border: 2px solid black; */
}

.askMenuBtnSelected{
  color: white;
}
*{
    white-space: nowrap;
}
  

    
    </style>
    