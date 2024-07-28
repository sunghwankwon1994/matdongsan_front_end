<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-warning justify-content-between"
  >
    <div class="container-fluid ms-3">
      <RouterLink class="navbar-brand ms-3 d-flex" to="/">
        <img
          class="col me-3 align-self-center"
          src="../../public/matdongsan_logo.png"
          width="50"
          height="50"
        />
        <div>
          <h4 class="fw-bold nav-title mb-1">Matdongsan</h4>
          <p class="sub-title m-0 text-center">부동산 맛집</p>
        </div>
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link fw-bold" to="/Property"
              >원룸</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link fw-bold" to="/Agent">부동산</RouterLink>
          </li>
          <li class="nav-item" v-if="store.getters.getUserRole == 'MEMBER'">
            <RouterLink class="nav-link fw-bold" to="/FavoriteProperty"
              >관심목록</RouterLink
            >
          </li>
          <li v-if="$store.state.userRole == 'ADMIN'" class="nav-item">
            <RouterLink class="nav-link fw-bold" to="/Adminpage/CustomerInquiry"
              >관리자</RouterLink
            >
          </li>
        </ul>
        <ul class="navbar-nav pe-5 mb-2 mb-lg-0">
          <li class="nav-item" v-if="hasHistory">
            <RouterLink class="nav-link fw-bold" to="/PropertyForm"
              ><div class="btn1 btn text-light fw-bold">
                등록하기
              </div></RouterLink
            >
          </li>
          <li class="nav-item" v-if="!hasHistory">
            <RouterLink class="nav-link fw-bold" to="/Payment/PaymentInfo"
              ><div class="btn1 btn text-light fw-bold">
                등록하기
              </div></RouterLink
            >
          </li>
          <li class="nav-item">
            <button
              v-if="$store.getters.getUemail === ''"
              class="signup-btn btn mt-2 me-2 text-light fw-bold mb-1"
              @click="showLoginModal"
            >
              가입 / 로그인
            </button>
          </li>
          <li
            v-if="$store.getters.getUemail !== ''"
            class="nav-item dropdown me-3 rounded align-self-start"
          >
            <RouterLink
              class="nav-link dropdown-toggle fw-bold px-1"
              to="#"
              id="navbarSubDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img v-if="memberProfile"
                :src="memberProfile"
                alt=""
                class="me-1 rounded-circle align-self-center"
                width="35"
                height="35"
              />
              <img v-else
                src="@/assets/profileImage.png"
                alt=""
                class="me-1 rounded-circle align-self-center"
                width="35"
                height="35"
              />
              <span class=""> {{ $store.getters.getUemail }} </span>
            </RouterLink>
            <ul class="dropdown-menu" aria-labelledby="navbarSubDropdown">
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/Mypage/MyInfomation"
                  >내 정보</RouterLink
                >
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/Mypage/ManageMyProperty"
                  >매물 관리</RouterLink
                >
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/Mypage/CustomerInquiry"
                  >1:1 문의내역</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/Mypage/ReportFalseListing"
                  >허위매물 신고</RouterLink
                >
              </li>

              <li>
                <div class="dropdown-item" @click="handleLogout">로그아웃</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- 모달 -->
  <LoginModal id="LoginModal" @close="hideLoginModal" modalStatus="null" />
</template>

<script setup>
import LoginModal from "./LoginModal.vue";
import { onMounted, ref, watch } from "vue";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import memberAPI from "@/apis/memberAPI";
import agentAPI from "@/apis/agentAPI";
import propertyAPI from "@/apis/propertyAPI";
const memberProfile = ref(null);
const router = useRouter();
const store = useStore();
let loginModal = null;
const hasHistory = ref(false);
onMounted(() => {
  loginModal = new Modal(document.querySelector("#LoginModal"));
  if (store.getters.getUserRoleNumber) {
    getUattach(store.getters.getUserRoleNumber);
    checkPropertyListing();
  }
});
watch(
  () => store.getters.getUserRoleNumber,
  () => {
    getUattach(store.getters.getUserRoleNumber);
  }
);
const getUattach = async (argAnumber) => {
  try {
    if (store.getters.getUserRole === "MEMBER") {
      const response = await memberAPI.memberAttachDownload(argAnumber);
      // if(response.headers["Content-Length"]) {
        const blob = response.data;
        memberProfile.value = URL.createObjectURL(blob);
      // }
      console.log("memberProfile : " + memberProfile.value);
    } else if(store.getters.getUserRole === 'AGENT'){
      const response = await agentAPI.agentAttachDownload(argAnumber);
      // if(response.headers["Content-Length"]) {
        const blob = response.data;
        memberProfile.value = URL.createObjectURL(blob);
      // }
    }
  } catch (error) {
    console.log(error);
  }
};

function showLoginModal() {
  loginModal.show();
}

function hideLoginModal() {
  loginModal.hide();
}
function handleLogout() {
  store.dispatch("deleteAuth");
  hasHistory.value = false;
  router.push("/");
}

async function checkPropertyListing() {
  try {
    const response = await propertyAPI.checkPropertyListing();
    hasHistory.value = response.data;
  } catch (error) {
    console.log(error);
    store.dispatch("deleteAuth");
    router.push("/");
  }
}
// 사용자가 변경될 때마다 `checkPropertyListing` 호출
watch(
  () => store.getters.getUemail,
  async (newEmail) => {
    if (newEmail) {
      await checkPropertyListing();
    } else {
      hasHistory.value = false;
    }
  }
);

// 내 정보에서 프로필 사진이 수정될 때 마다 사진 불러오기 호출
watch(
  () => store.getters["changeProfileImage/getChangeProfile"], () => {
    getUattach(store.getters.getUserRoleNumber);
  }
)

</script>

<style scoped>
.nav-title {
  font-weight: bold;
  margin-bottom: 0;
}
.sub-title {
  font-size: 11px;
  color: #fff;
  font-weight: bold;
}
.signup-btn {
  background-color: #5f9cc2;
}
.signup-btn:hover {
  background-color: #84acc5;
}
.btn1 {
  background-color: #2f4858;
}
.btn1:hover {
  background-color: #636668;
}
</style>
