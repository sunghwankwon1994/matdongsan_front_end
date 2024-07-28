<template>
  <div>
    <div class="container-fluid mt-5">
      <footer class="footer-01">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6 col-lg-3 mb-4 mb-md-0 align-self-center">
              <RouterLink class="row navbar-brand d-flex" to="/"
                ><h4 class="footer-heading fw-bold">
                  <img
                    src="../../public/matdongsan_logo.png"
                    width="40"
                  />Matdongsan
                </h4>
              </RouterLink>
            </div>

            <div class="col-md-6 col-lg-3 pl-lg-5 mb-4 mb-md-0 d-flex justify-content-center mt-5">
              <ul class="list-unstyled text-start">
                <li>
                  <RouterLink to="/QNA/Notice" class="py-2 d-block"
                    >공지사항</RouterLink
                  >
                </li>
                <li>
                  <RouterLink to="/QNA/FAQ" class="py-2 d-block"
                    >FAQs</RouterLink
                  >
                </li>
                <li>
                  <RouterLink to="#" class="py-2 d-block">회사소개</RouterLink>
                </li>
                <li>
                  <RouterLink to="#" class="py-2 d-block">이용약관</RouterLink>
                </li>
                <li>
                  <RouterLink to="#" class="py-2 d-block"
                    >위치 서비스</RouterLink
                  >
                </li>
                <li>
                  <RouterLink to="#" class="py-2 d-block"
                    >개인정보 처리방침</RouterLink
                  >
                </li>
              </ul>
            </div>
            <div class="col-md-6 col-lg-3 mb-4 mb-md-0 align-self-center">
              <p class="mt-4">
                상호: (주) 맛동산 | 대표 : 원민경 | 사업자등록번호: 123-45-67890
              </p>
              <p class="mt-2">
                주소 : 서울특별시 송파구 중대로 135 아이티벤처타워
              </p>
              <p class="mt-2">서비스 이용문의: 1234-5678</p>
              <p class="mt-2">
                서비스 제휴문의: matdongsan@matdongsan.com | 분양광고 문의
                mat@matdongsan.com
              </p>
              <p class="mt-2">
                © 2024 Matdongsan Company, Inc. All rights reserved.
              </p>
            </div>
          </div>
        
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
a {
  text-decoration: none;
  color: #fff;
}
.logo-box h2 {
  font-size: 18px;
}
.logo-box p {
  font-size: 12px;
}
.container-fluid {
  background-color: rgb(55, 55, 55);
  color: #fff;
}
.container-fluid p {
  font-size: 10px;
}
.copy-right-part {
  margin-right: auto;
  margin-left: auto;
}
.footer-parabox {
}
</style>
