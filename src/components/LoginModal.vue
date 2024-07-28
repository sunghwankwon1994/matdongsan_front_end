<template>
  <div class="modal" tabindex="-2" ref="modal">
    <!-- <div class="modal fade" tabindex="-1" aria-hidden="true"> -->
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="d-flex mx-auto flex-row-reverse">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <!-- 로그인 영역 -->
          <div v-if="checkStatus == null">
            <div
              class="d-flex w-75 mx-auto justify-content-center align-items-center"
            >
              <img
                class="col-3 me-3"
                src="../../public/matdongsan_logo.png"
                width="50"
              />
              <div class="mt-4 logo-box">
                <h2 class="nav-title mb-1 fw-bold text-warning fs-2">
                  Matdongsan
                </h2>
                <p class="sub-title m-0 text-center fw-bold">부동산 맛집</p>
              </div>
            </div>
            <form
              class="d-flex flex-column w-75 mx-auto mt-4"
              v-on:submit.prevent="loginHandleSubmit"
            >
              <div class="">
                <div>
                  <h4 class="fs-6 fw-bold">아이디</h4>
                </div>
                <div class="loginInputBox">
                  <input
                    class="h-100 w-100 p-3"
                    type="text"
                    name="uemail"
                    placeholder="이메일 주소 입력"
                    maxLength="50"
                    v-model.trim="loginUser.uemail"
                  />
                </div>
                <!-- <div>
                  <span
                    style="font-size: small;"
                    :style="emailValidStyle ? 'color:green' : 'color:red'"
                    >{{ checkValid.emailValid }}</span
                  >
                </div> -->
              </div>
              <div class="mt-3">
                <div>
                  <h4 class="fs-6 fw-bold">비밀번호</h4>
                </div>
                <div class="loginInputBox">
                  <input
                    class="h-100 w-100 p-3"
                    type="password"
                    name="upassword"
                    placeholder="비밀번호 입력"
                    maxLength="100"
                    v-model.trim="loginUser.upassword"
                  />
                </div>
                <div style="height: 20px;">
                  <span
                    class="mt-3"
                    style="font-size: small;"
                    :style="passwordValidStyle ? 'color:green' : 'color:red'"
                    >{{ checkValid.passwordValid }}</span
                  >
                </div>
              </div>

              <div class="mt-3">
                <button
                  type="submit"
                  class="w-100 btn btn-warning"
                  :disabled="!checkData"
                >
                  로그인
                </button>
              </div>
            </form>
            <div class="d-flex justify-content-evenly mt-2 findIdPassword">
              <span class="find-email-btn" @click="checkUserEmail"
                >아이디 찾기</span
              >
              <span class="find-password-btn" @click="checkUserPassword"
                >비밀번호 찾기</span
              >
            </div>
            <div class="text-center">
              <!-- 로그인 모달 내용 -->

              <!-- 일반 회원 가입 버튼 -->
              <router-link
                :to="{
                  name: 'SignupAgreement',
                  params: { signupType: 'member' },
                }"
              >
                <button
                  class="btn btn-secondary w-75 mb-3 mt-4"
                  data-bs-dismiss="modal"
                >
                  일반 회원 가입하기
                </button>
              </router-link>

              <!-- 업체 회원 가입 버튼 -->
              <router-link
                :to="{
                  name: 'SignupAgreement',
                  params: { signupType: 'agent' },
                }"
              >
                <button
                  class="btn btn-secondary w-75 mb-3"
                  data-bs-dismiss="modal"
                >
                  업체 회원 가입하기
                </button>
              </router-link>
            </div>
          </div>

          <!-- 이메일 찾기 영역 -->
          <div v-if="checkStatus === 'email'">
            <div
              class="d-flex w-75 mx-auto justify-content-center align-items-center"
            >
              <img
                class="col-3 me-3"
                src="../../public/matdongsan_logo.png"
                width="50"
              />
              <div class="mt-4 logo-box">
                <h2 class="nav-title mb-1 fw-bold text-warning fs-2">
                  Matdongsan
                </h2>
                <p class="sub-title m-0 text-center fw-bold">부동산 맛집</p>
              </div>
            </div>
            <form
              class="d-flex flex-column w-75 mx-auto mt-4"
              v-on:submit.prevent="findEmailHandleSubmit"
            >
              <div class="">
                <div>
                  <h4 class="fs-6 fw-bold">이름</h4>
                </div>
                <div class="loginInputBox">
                  <input
                    class="h-100 w-100 p-3"
                    type="text"
                    name="name"
                    placeholder="이름 입력"
                    maxLength="20"
                    v-model.trim="findEmail.uname"
                  />
                </div>
                <div></div>
              </div>
              <div class="mt-3">
                <div>
                  <h4 class="fs-6 fw-bold">전화번호</h4>
                </div>
                <div class="loginInputBox">
                  <input
                    class="h-100 w-100 p-3"
                    type="text"
                    name="text"
                    placeholder="숫자만 입력하세요."
                    maxLength="14"
                    v-model.trim="findEmail.uphone"
                    @keyup="formatEmailPhoneNumber"
                  />
                </div>
              </div>
              <div class="mt-3">
                <div>
                  <h4 class="fs-6 fw-bold">중개업자 여부</h4>
                </div>
                <div class="loginInputBox">
                  <select v-model="findEmail.type">
                    <!-- <option value="" disabled hidden selected>
                      회원 타입을 선택해 주세요
                    </option> -->
                    <option value="Agent">중개업자 회원</option>
                    <option value="Member">일반 회원</option>
                  </select>
                </div>
              </div>
              <div style="height: 20px;">
                <div style="color: red; font-size: small; margin-top: 5px;">
                  {{ errorMessageFindEmail }}
                </div>
              </div>
              <div class="mt-3">
                <button
                  type="submit"
                  class="w-100 btn btn-warning"
                  :disabled="!checkFindEmailData"
                >
                  아이디 찾기
                </button>
                <button
                  type="button"
                  class="w-100 mt-2 btn btn-outline-dark"
                  @click="cancelUserData"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
          <!-- 비밀번호 찾기 영역 -->
          <div v-if="checkStatus === 'password'">
            <div
              class="d-flex w-75 mx-auto justify-content-center align-items-center"
            >
              <img
                class="col-3 me-3"
                src="../../public/matdongsan_logo.png"
                width="50"
              />
              <div class="mt-4 logo-box">
                <h2 class="nav-title mb-1 fw-bold text-warning fs-2">
                  Matdongsan
                </h2>
                <p class="sub-title m-0 text-center fw-bold">부동산 맛집</p>
              </div>
            </div>
            <form
              class="d-flex flex-column w-75 mx-auto mt-4"
              v-on:submit.prevent="findPasswordHandleSubmit"
            >
              <div class="">
                <div>
                  <h4 class="fs-6 fw-bold">이름</h4>
                </div>
                <div class="loginInputBox">
                  <input
                    class="h-100 w-100 p-3"
                    type="text"
                    name="name"
                    placeholder="이름 입력"
                    maxLength="20"
                    v-model.trim="findPassword.name"
                  />
                </div>
              </div>
              <div class="mt-3">
                <div>
                  <h4 class="fs-6 fw-bold">전화번호</h4>
                </div>
                <div class="loginInputBox">
                  <input
                    class="h-100 w-100 p-3"
                    type="text"
                    name="phone"
                    placeholder="숫자만 입력하세요."
                    maxLength="14"
                    v-model.trim="findPassword.phone"
                    @keyup="formatPasswordPhoneNumber"
                  />
                </div>
              </div>
              <div class="mt-3">
                <div>
                  <h4 class="fs-6 fw-bold">아이디(이메일)</h4>
                </div>
                <div class="loginInputBox">
                  <input
                    class="h-100 w-100 p-3"
                    type="text"
                    name="email"
                    placeholder="이메일 입력"
                    maxLength="50"
                    v-model.trim="findPassword.email"
                  />
                </div>
              </div>
              <!-- <div class="mt-3">
                <div>
                  <h4 class="fs-6 fw-bold">중개업자 여부</h4>
                </div>
                <div class="loginInputBox">
                  <select v-model="findPassword.type">
                    <option value="" disabled hidden selected>
                      회원 타입을 선택해 주세요
                    </option>
                    <option value="Agent">중개업자 회원</option>
                    <option value="Member">일반 회원</option>
                  </select>
                </div>
              </div> -->
              <div style="height: 20px;">
                <div style="color: red; font-size: small; margin-top: 5px;">
                  {{ errorMessageFindPassword }}
                </div>
              </div>
              <div class="mt-3">
                <button
                  type="submit"
                  class="w-100 btn btn-warning"
                  :disabled ="!checkUserForUpdatePasswordData"
                >
                  비밀번호 변경하기
                </button>
                <button
                  type="button"
                  class="w-100 mt-2 btn btn-outline-dark"
                  @click="cancelUserData"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
          <!-- 이메일 찾기 성공 결과 영역 -->
          <div v-if="checkStatus === 'findEmail'">
            <div
              class="d-flex w-75 mx-auto justify-content-center align-items-center"
            >
              <img
                class="col-3 me-3"
                src="../../public/matdongsan_logo.png"
                width="50"
              />
              <div class="mt-4 logo-box">
                <h2 class="nav-title mb-1 fw-bold text-warning fs-2">
                  Matdongsan
                </h2>
                <p class="sub-title m-0 text-center fw-bold">부동산 맛집</p>
              </div>
            </div>
            <form class="d-flex flex-column w-75 mx-auto mt-4">
              <div class="">
                <div>
                  <h4 class="fs-6 fw-bold">당신의 이메일은</h4>
                </div>
                <div class="loginInputBox text-center" style="font-size: x-large">
                  {{ getEmail }}
                </div>
              </div>
              <div class="mt-3">
                <button
                  type="button"
                  class="w-100 mt-2 btn btn-outline-dark"
                  @click="cancelUserData"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
          <!-- 이메일 찾기 실패 결과 영역 -->
          <!-- <div v-if="checkStatus === 'missEmail'">
            <div
              class="d-flex w-75 mx-auto justify-content-center align-items-center"
            >
              <img
                class="col-3 me-3"
                src="../../public/matdongsan_logo.png"
                width="50"
              />
              <div class="mt-4 logo-box">
                <h2 class="nav-title mb-1 fw-bold text-warning fs-2">
                  Matdongsan
                </h2>
                <p class="sub-title m-0 text-center fw-bold">부동산 맛집</p>
              </div>
            </div>
            <form class="d-flex flex-column w-75 mx-auto mt-4">
              <div class="">
                <div>
                  <h4 class="fs-5 fw-bold text-center mt-5 mb-5">
                    가입한 회원이 아닙니다.
                  </h4>
                </div>
              </div>
              <div class="mt-3">
                <button
                  type="button"
                  class="w-100 mt-2 btn btn-outline-dark"
                  @click="cancelUserData"
                >
                  취소
                </button>
              </div>
            </form>
          </div> -->
          <!-- 비밀번호 찾기 성공 결과 영역 -->
          <div v-if="checkStatus === 'updatePassword'">
            <div
              class="d-flex w-75 mx-auto justify-content-center align-items-center"
            >
              <img
                class="col-3 me-3"
                src="../../public/matdongsan_logo.png"
                width="50"
              />
              <div class="mt-4 logo-box">
                <h2 class="nav-title mb-1 fw-bold text-warning fs-2">
                  Matdongsan
                </h2>
                <p class="sub-title m-0 text-center fw-bold">부동산 맛집</p>
              </div>
            </div>
            <form
              class="d-flex flex-column w-75 mx-auto mt-4"
              @submit.prevent="changePasswordHandleSubmit"
            >
              <div>
                <h2 class="fs-3 fw-bold text-center mb-3">비밀번호 변경</h2>
              </div>
              <div class="">
                <div>
                  <h4 class="fs-6 fw-bold">변경할 비밀번호</h4>
                </div>
                <div class="loginInputBox">
                  <input
                    class="h-100 w-100 p-3"
                    type="password"
                    name="name"
                    maxLength="100"
                    v-model="changePassword.newPassword1"
                  />
                </div>
                <div>
                  <span
                  style="font-size: small;"
                    :style="passwordValidStyle ? 'color:green' : 'color:red'"
                    >{{ errorMessage.newPassword1 }}</span
                  >
                </div>
              </div>
              <div class="mt-3">
                <div>
                  <h4 class="fs-6 fw-bold">비밀번호 확인</h4>
                </div>
                <div class="loginInputBox">
                  <input
                    class="h-100 w-100 p-3"
                    type="password"
                    name="name"
                    maxLength="100"
                    v-model="changePassword.newPassword2"
                  />
                </div>
                <div>
                  <span
                  style="font-size: small;"
                    :style="passwordValidStyle ? 'color:green' : 'color:red'"
                    >{{ errorMessage.newPassword2 || errorMessageChangePassword}}</span
                  >
                </div>
              </div>
              <div class="mt-3">
                <button type="submit" class="w-100 btn btn-warning" :disabled="!checkPasswordData">
                  비밀번호 변경하기
                </button>
                <button
                  type="button"
                  class="w-100 mt-2 btn btn-outline-dark"
                  @click="cancelUserData"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
          <!-- 비밀번호 찾기 실패 결과 영역 -->
          <!-- <div v-if="checkStatus === 'resultPassword'">
            <div
              class="d-flex w-75 mx-auto justify-content-center align-items-center"
            >
              <img
                class="col-3 me-3"
                src="../../public/matdongsan_logo.png"
                width="50"
              />
              <div class="mt-4 logo-box">
                <h2 class="nav-title mb-1 fw-bold text-warning fs-2">
                  Matdongsan
                </h2>
                <p class="sub-title m-0 text-center fw-bold">
                  부동산 맛집 resultPassword
                </p>
              </div>
            </div>
            <form class="d-flex flex-column w-75 mx-auto mt-4">
              <div class="">
                <div>
                  <h4 class="fs-5 fw-bold text-center mt-5 mb-5">
                    {{ errorMessageFindPassword }}
                  </h4>
                </div>
              </div>
              <div class="mt-3">
                <button
                  type="button"
                  class="w-100 mt-2 btn btn-outline-dark"
                  @click="cancelUserData"
                >
                  취소
                </button>
              </div>
            </form>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";
import memberAPI from "@/apis/memberAPI";
import { useStore } from "vuex";
import agentAPI from "@/apis/agentAPI";
import { Modal } from "bootstrap";

const router = useRouter();
const emit = defineEmits(["moveToMemberSignup", "moveToAgentSignup", "close"]);
const props = defineProps(["modalStatus","question","paymentInfo"]);
let checkStatus = ref(null);
const store = useStore();
const emailValidStyle = ref(false);
const passwordValidStyle = ref(false);

let checkValid = ref({
  emailValid: "",
  passwordValid: "",
});

// 로그인 폼
let loginUser = ref({
  uemail: "",
  upassword: "",
});

// 이메일 찾기 폼
let findEmail = ref({
  uname: "",
  uphone: "",
  type: "Member",
});

// 찾아온 이메일
const getEmail = ref("");

// 이메일 못 찾음
const errorMessageFindEmail = ref("");
// 비밀번호를 찾기 위해 제출한 회원의 정보를 못 찾음
const errorMessageFindPassword = ref("");
const errorMessageChangePassword = ref("");

// 비밀번호 찾기 폼
let findPassword = ref({
  email: "",
  name: "",
  phone: "",
});

// 비밀번호 변경하기 폼
let changePassword = ref({
  newPassword1: "",
  newPassword2: "",
});

// 사용자용 유효성 오류 메시지
let errorMessage = ref({
  newPassword1: "",
  newPassword2: "",
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 로그인 폼 제출하면 실행하는 함수
async function loginHandleSubmit() {
  console.log("로그인 제출 함수 실행");
  checkValid.value.passwordValid = "";

  // // 아이디 확인
  // if (loginUser.value.email !== tempUser.email) {
  //   checkValid.value.emailValid = "가입한 회원이 아닙니다.";
  //   emailValidStyle.value = false;
  // } else {
  //   checkValid.value.emailValid = "";
  //   emailValidStyle.value = true;
  //   // 이메일이 맞으면 비밀번호와 유저타입이 맞는지 확인

  //   // 비밀번호 확인
  //   if (loginUser.value.password !== tempUser.password) {
  //     checkValid.value.passwordValid = "비밀번호가 틀렸습니다.";
  //     passwordValidStyle.value = false;
  //   } else {
  //     checkValid.value.passwordValid = "";
  //     passwordValidStyle.value = true;
  //   }
  //   // 유저 타입 확인
  //   if (loginUser.value.type !== tempUser.type) {
  //     checkValid.value.typeValid = "해당 회원이 아닙니다.";
  //   } else {
  //     checkValid.value.typeValid = "";
  //   }
  // }

  // 로그인 정보가 맞으면 실행
  // if (emailValidStyle.value && passwordValidStyle.value) {
  //   router.push("/"); // 유효성 검사를 통과하면 홈으로 가기 -> 모달이 안 없어지는 문제 발생
  // }
  try {
    const data = JSON.parse(JSON.stringify(loginUser.value));
    const response = await memberAPI.login(data);
    if (response.data.result === "success") {
      const payload = {
        uemail: response.data.uemail,
        accessToken: response.data.accessToken,
        userRole: response.data.userRole,
        userRoleNumber: response.data.userRoleNumber,
      };

      store.dispatch("saveAuth", payload);

      emit("close"); 

      if(props.question !=  "question" && props.paymentInfo != "paymentInfo"){
        router.push("/"); 
      } else if(props.question ==  "question"){
        // 1:1 문의 들어가다가 로그인 하면 홈이 아닌 1:1문의로 들어가게 하기
        router.push("/QNA/CustomerInquiryForm"); 
      } else if(props.paymentInfo == "paymentInfo"){
        router.push("/Payment/PaymentInfo"); 
      }
      
    } else if(response.data.result === "removed"){
      console.log("탈퇴한 회원");
      checkValid.value.passwordValid = "탈퇴한 회원입니다. 다시 회원가입 하세요";
    }  else if(response.data.result === "fail"){
      checkValid.value.passwordValid = "비밀번호가 틀렸습니다.";
    }
  } catch (error) {
    console.log("에러 발생");
    checkValid.value.passwordValid = "아이디와 비밀번호가 맞지 않습니다.";
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//비밀번호 찾기 폼 제출하면 실행하는 함수
async function findPasswordHandleSubmit() {
  // 찾기 폼에서 해당 유저가 존재하는 지 확인
  const formData = new FormData();
  formData.append("email", findPassword.value.email);
  formData.append("name", findPassword.value.name);
  formData.append("phone", findPassword.value.phone);
  const responseResult = await memberAPI.canResetPassword(formData);
  if (responseResult.data.noUser != null) {
    // 응답의 noUser가 값이 있을 때
    errorMessageFindPassword.value = responseResult.data.noUser;
    // checkStatus.value = "resultPassword";
  } else if (responseResult.data.notFoundUser != null) {
    errorMessageFindPassword.value = responseResult.data.notFoundUser;
    // checkStatus.value = "resultPassword";
  } else if (responseResult.data.success != null) {
    getEmail.value = responseResult.data.success;
    // 비밀번호 변경할 수 있는 ui 보여주기
    checkStatus.value = "updatePassword";
  } else {
    // checkStatus.value = "resultPassword";
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var passwordPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{4,20}$/;
var passwordResult = ref(null);
// 비밀번호 변경 폼 제출하면 실행하는 함수
async function changePasswordHandleSubmit() {
  let pattern = ref(false);
  let doubleCheck = ref(false);

  // 유효성 검사
  passwordResult.value = passwordPattern.test(
    changePassword.value.newPassword1
  );
  // 바꿀 비밀번호 정규식 검사
  if (!passwordResult.value) {
    errorMessage.value.newPassword1 = "유효하지 않은 비밀번호 입니다.";
    console.log("비밀번호 패턴 틀림 여부", passwordValidStyle.value);
    pattern.value = false;
  } else {
    errorMessage.value.newPassword1 = "";
    pattern.value = true;
  }
  // 비밀번호 두번 체크
  if (changePassword.value.newPassword1 !== changePassword.value.newPassword2) {
    errorMessage.value.newPassword2 = "비밀번호와 비밀번호 확인이 다릅니다.";
    doubleCheck.value = false;
    console.log("비밀번호 다름 여부", passwordValidStyle.value);
  } else {
    errorMessage.value.newPassword2 = "비밀번호가 같습니다.";
    doubleCheck.value = true;
    console.log("비밀번호 맞음", passwordValidStyle.value);
  }

  if (pattern.value && doubleCheck.value) {
    passwordValidStyle.value = true;
    try {
      // 유효성 검사 통과하면 변경 시작
      const formData = new FormData();
      formData.append("upassword", changePassword.value.newPassword1);
      formData.append("uemail", getEmail.value);
      const response = await memberAPI.updatePassword(formData);

      if (response.data.success != null) {
        // errorMessageChangePassword.value = response.data.success;
        // 비밀번호가 성공적으로 변경되면 로그인 폼 보여주기
        checkStatus.value = null; // 로그인 폼으로 가기
      } else if (response.data.fail != null) {
        errorMessageChangePassword.value = response.data.fail;
      }
      
    } catch (error) {
      console.log(error);
      // checkStatus.value = "resultPassword";
      errorMessageChangePassword.value = "알 수 없는 오류로 실패 했습니다.";
    }
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // 이메일 찾기 폼 제출하면 실행하는 함수
async function findEmailHandleSubmit() {
  console.log("이메일 찾기 제출 실행");
  if (findEmail.value.type == "Agent") {
    const formData = new FormData();
    try {
      formData.append("aname", findEmail.value.uname);
      formData.append("aphone", findEmail.value.uphone);
      const response = await memberAPI.findAgentEmail(formData);
      getEmail.value = response.data.success;
      console.log("중개인 이메일 찾기 성공", getEmail.value);
      console.log("해당하는 회원이 없으면 반환", response.data.fail);
      if (response.data.fail == null) {
        checkStatus.value = "findEmail";
      } else {
        // checkStatus.value = "missEmail";
        errorMessageFindEmail.value = response.data.fail;
      }
    } catch (error) {
      console.log("이메일 찾기 실패", error);
      // checkStatus.value = "missEmail";
      errorMessageFindEmail.value = "알 수 없는 이유로 실패 하였습니다 다시 시도해 주세요.";

    }
  } else if (findEmail.value.type == "Member") {
    const formData = new FormData();
    formData.append("mname", findEmail.value.uname);
    formData.append("mphone", findEmail.value.uphone);
    try {
      const response = await memberAPI.findMemberEmail(formData);
      getEmail.value = response.data.success;
      console.log("해당하는 회원이 없으면 반환", response.data.fail);
      console.log("가져온 이메일: ",getEmail.value);
      if (response.data.fail == null) {
        checkStatus.value = "findEmail";
      } else {
        // checkStatus.value = "missEmail";
        errorMessageFindEmail.value = response.data.fail;
      }
    } catch (error) {
      console.log("이메일 찾기 실패", error);
      // checkStatus.value = "missEmail";
      errorMessageFindEmail.value = "알 수 없는 이유로 실패 하였습니다 다시 시도해 주세요.";
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 빈값 유효성
// 로그인 할때 빈 값이 있으면 제출 버튼 비활성화
// 로그인
const checkData = computed(() => {
  var result = loginUser.value.uemail !== "" && loginUser.value.upassword !== "" && loginUser.value.uemail !== null && loginUser.value.upassword !== null;
  return result;
});
// 아이디 찾기 폼
const checkFindEmailData = computed(() => {
  var result =
    findEmail.value.uname !== "" && findEmail.value.uname !== null &&
    findEmail.value.uphone !== "" && findEmail.value.uphone !== null &&
    findEmail.value.type !== "" && findEmail.value.type !== null;
  return result;
});
// 비밀번호 변경하기 위해 제출하는 폼
const checkUserForUpdatePasswordData = computed(() => {
  var result =
    findPassword.value.name !== "" && findPassword.value.name !== null &&
    findPassword.value.phone !== "" && findPassword.value.phone !== null &&
    findPassword.value.email !== "" && findPassword.value.email !== null;
  return result;
});

// 비밀번호 변경하기 위해 제출하는 폼
const checkPasswordData = computed(() => {
  var result =
    changePassword.value.newPassword1 !== "" && changePassword.value.newPassword1 !== null &&
    changePassword.value.newPassword2 !== "" && changePassword.value.newPassword2 !== null;
  return result;
});

// v-if 사용을 위한 설정 함수
function checkUserEmail() {
  checkStatus.value = "email";
}
function checkUserPassword() {
  checkStatus.value = "password";
}

// 모달 닫을 때 상태값 초기화 함수 정의
function cancelUserData() {
  checkStatus.value = null; // v-if 상태 초기화
  getEmail.value = null; // 가져온 값은 닫을 때만 초기화
  resetVar(); // 모든 상태 변수 초기화
}

// 모든 변수 초기화
function resetVar(){
  emailValidStyle.value = null;
  passwordValidStyle.value = null;
  errorMessageFindEmail.value = null;
  errorMessageFindPassword.value = null;
  errorMessage.value.newPassword1 = null;
  errorMessage.value.newPassword2 = null;

  changePassword.value.newPassword1 = null;
  changePassword.value.newPassword2 = null;

  findPassword.value.email = null;
  findPassword.value.name = null;
  findPassword.value.phone = null;

  findEmail.value.type = "Member";
  findEmail.value.uname = null;
  findEmail.value.uphone = null;

  loginUser.value.uemail = null;
  loginUser.value.upassword = null;

  checkValid.value.emailValid = null;
  checkValid.value.passwordValid = null;
}

watch(checkStatus, () => {
  console.log("v-if 상태 바뀜");
  resetVar() // v-if 상태 바뀌면 변수 초기화
})

// 모달 참조
const modal = ref(null);

// 모달이 마운트 되면 닫힐 때 cancelUserData를 실행하겠다는 이벤트 리스너를 등록
onMounted(() => {
  modal.value.addEventListener('hide.bs.modal', cancelUserData);
});

// 모달이 언마운트 되기 전에 등록한 이벤트 리스너를 제거
onBeforeUnmount(() => {
  modal.value.removeEventListener('hide.bs.modal', cancelUserData);
});

// 휴대폰 번호 하이픈 자동으로 붙이기
const formatEmailPhoneNumber = () => {
  let cleaned = ('' + findEmail.value.uphone).replace(/\D/g, '');
  if (cleaned.length <= 3) {
    findEmail.value.uphone = cleaned;
  } else if (cleaned.length <= 7) {
    findEmail.value.uphone = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  } else {
    findEmail.value.uphone = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
  }
};

const formatPasswordPhoneNumber = () => {
  let cleaned = ('' + findPassword.value.phone).replace(/\D/g, '');
  if (cleaned.length <= 3) {
    findPassword.value.phone = cleaned;
  } else if (cleaned.length <= 7) {
    findPassword.value.phone = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  } else {
    findPassword.value.phone = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
  }
};
</script>

<style scoped>
input {
  border: 1px solid rgb(237, 237, 237);
}
.find-email-btn,
.find-password-btn {
  cursor: pointer;
}
.loginInputBox {
  height: 40px;
}

.logo-box h2 {
  font-size: 18px;
}

.logo-box p {
  font-size: 12px;
}

.findIdPassword > span {
  color: rgb(151, 151, 151);
}

select {
  border: 1px solid rgb(237, 237, 237);
  width: 100%;
  height: 100%;
  padding-left: 13px;
  color: grey;
}
</style>
