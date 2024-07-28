<template>
  <div class="d-flex h-auto w-100 mx-auto">
    <MyPageSidebar />
    <div class="titleNcontent w-75 mx-auto">
      <div class="d-flex justify-content-between">
        <h4 class="fw-bold mt-2">내 정보</h4>
      </div>
      <hr class="border border-black border-2" />
      <form action="" class="w-75 mx-auto" v-on:submit.prevent="validCheckBeforeSubmit">
        <div class="d-flex justify-content-between w-75">
          <h6 class="text-muted fw-bold align-self-center me-5">프로필 사진</h6>
          <label class="profile-input" for="profile-input">
            <div type="button" class="btn position-relative">
              <img
                v-if="imageFilesProfile !== null"
                :src="imageFilesProfile.src"
                width="100"
                height="100"
                class="rounded-circle"
                alt=""
              />
              <img
                v-else
                :src="memberProfile"
                width="100"
                height="100"
                class="rounded-circle"
                alt=""
              />
              <span
                class="position-absolute badge rounded-circle bg-warning p-2"
                ><img src="@/assets/stylus.png" width="15" alt="" /><span
                  class="visually-hidden"
                  >unread messages</span
                ></span
              >
            </div>
          </label>
          <input
            type="file"
            name="profile-input"
            id="profile-input"
            ref="fileInputProfile"
            @change="previewImagesProfile"
            accept="image/*"
            style="display: none"
          />

          <h6 class="align-self-center ms-5 me-5 fw-bold text-muted">등록권</h6>
          <div class="align-self-center mt-4">
            <img
              src="@/assets/house-img.png"
              alt="집 이미지"
              width="60"
              height="60"
              class="bg-warning rounded align-self-center p-2"
            />
            <h6 class="text-center mt-1 fw-bold" v-if="hasQuantity">{{ hasQuantity }}개</h6>
            <h6 class="text-center mt-1 fw-bold" v-else>0개</h6>
          </div>
        </div>
        <hr />
        <div class="d-flex">
          <div class="align-self-center col-2 fw-bold me-5">이름</div>
          <input
            v-if="userRole === 'AGENT'"
            
            class="readonly-box ps-2"
            type="text"
            v-model="agentData.aname"
            maxLength="20"
            readonly
          />
          <input v-else class="readonly-box ps-2" type="text" v-model="memberData.mname" maxLength="50" readonly/>
        </div>
        <div class="d-flex">
          <div class="align-self-center col-2 fw-bold"></div>
          <div class="ms-5 mt-2 text-danger">
            {{ errorMessage.name }}
          </div>
        </div>
        <hr class="mb-4" />
        <div class="d-flex">
          <div class="align-self-center col-2 fw-bold">전화번호</div>
          <div>
            <input
              type="text"
              class="me-2 ms-5 ps-2"
              v-model="arrPhone[0]"
              size="1"
               maxLength="3"
            />-
            <input
              type="text"
              class="ms-2 me-2 ps-2"
              v-model="arrPhone[1]"
              size="2"
               maxLength="4"
            />-
            <input
              type="text"
              class="ms-2 ps-2"
              v-model="arrPhone[2]"
              size="2"
               maxLength="4"
            />
          </div>
        </div>
        <div class="d-flex">
          <div class="align-self-center col-2 fw-bold"></div>
          <div class="ms-5 mt-2 text-danger">
            {{ errorMessage.phone }}
          </div>
        </div>
        <hr class="mb-4" />
        <div class="d-flex">
          <div class="align-self-center me-5 col-2 fw-bold">이메일 주소</div>
          <input
            type="email"
            class="readonly-box ps-2"
            v-model="store.getters.getUemail"
             maxLength="50"
            readonly
          />
        </div>
        <div v-if="userRole === 'AGENT'" class="need-to-add-type-variable-here">
          <hr />
          <div class="d-flex">
            <div class="align-self-center col-2 fw-bold">중개소 이름</div>
            <input class="ms-5" type="text" v-model="agentData.abrand" maxLength="50" />
          </div>
          <hr class="mb-4" />
          <div class="d-flex">
            <div class="align-self-center me-4 col-2 fw-bold">
              사업자 등록 번호
            </div>
            <div class="ms-4">
            <input
              type="text"
              class="readonly-box me-2 ps-2"
              v-model="arrBrandNumber[0]"
              size="1"
               readonly
            />-
            <input
              type="text"
              class="readonly-box ms-2 me-2 ps-2"
              v-model="arrBrandNumber[1]"
              size="1"
               readonly
            />-
            <input
              type="text"
              class="readonly-box ms-2 ps-2"
              v-model="arrBrandNumber[2]"
              size="3"
               readonly
            />
          </div>
          </div>

          <hr />
          <div class="row">
            <div class="d-flex">
              <div class="col-2 me-5 fw-bold">주소</div>
              <div>
                <input
                  class="col w-75 readonly-box"
                  type="text"
                  style="margin-right: 20px; width: 70%"
                  v-model="agentData.aaddress"
                  readonly
                />
                <div class="btn btn-dark btn-sm" @click="openPostSearch">
                  검색
                </div>
                <input
                  class="col mt-2 w-75"
                  type="text"
                  style="width: 60%"
                  placeholder="상세주소"
                  v-model="agentData.aaddressdetail"
                   maxLength="100"
                />
                <div>
                  <input
                    class="col mt-2 w-25 readonly-box"
                    type="text"
                    v-model="agentData.apostcode"
                    style="width: 60%"
                    readonly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="text-end me-5">
          <button class="btn btn-warning me-3" :disabled="!checkForm">수정하기</button>
          <button type="button" @click="resetInfoBtn" class="btn btn-outline-warning text-dark">취소</button>
        </div>
      </form>
      <!-- 비밀번호 변경 -->
      <h4 class="mt-5 fw-bold">비밀번호 변경</h4>
      <hr class="border border-black border-2" />
      <form action="" class="w-75 mx-auto" @submit.prevent="changePasswordSubmit">
        <table class="table table-lg w-75">
          <tbody>
            <tr>
              <th scope="row" class="w-25">현재 비밀번호</th>
              <td>
                <input
                  type="password"
                  class="ms-4 w-100"
                  v-model.trim="changePassword.oldPassword"
                  placeholder="현재 비밀번호를 입력하세요."
                  maxLength="100"
                
                />
                <div class="ms-4 mt-1" :class="oldPasswordValidStyle ? 'text-success' : 'text-danger'">
                  {{ errorMessage.oldPassword }}
                </div>
              </td>
              <td>
                <div class="btn btn-sm btn-warning ms-3" @click="validOldPassword"> 확인 </div>
              </td>
            </tr>
            <tr>
              <th scope="row">새 비밀번호</th>
              <td colspan="2">
                <input
                  type="password"
                  class="ms-4 w-100"
                  v-model.trim="changePassword.newPassword1"
                  placeholder="영문, 숫자, 특수문자 혼합 4~20자 가능합니다."
                  @keyup="validNew1Password"
                   maxLength="100"

                />
                <div
                  :class="
                    new1PasswordValidStyle ? 'text-success' : 'text-danger'
                  "
                  class="ms-4 mt-1"
                >
                  {{ errorMessage.newPassword1 }}
                </div>
              </td>
              
            </tr>
            <tr>
              <th scope="row">새 비밀번호 확인</th>
              <td colspan="2" class="h-50">
                <input
                  type="password"
                  class="ms-4 w-100"
                  v-model.trim="changePassword.newPassword2"
                  placeholder="새 비밀번호과 같은 비밀번호를 적어주세요."
                   maxLength="100"
                  @keyup="validNew2Password"
                />
                <div
                  :class="
                    new2PasswordValidStyle ? 'text-success' : 'text-danger'
                  "
                  class="ms-4 mt-1"
                >
                  {{ errorMessage.newPassword2 }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="text-end me-5">
          <button
            button="submit"
            class="btn btn-warning"
            :disabled="!checkChangePasswordData"
          >
            변경하기
          </button>
          <button
            type="button"
            class="btn btn-outline-warning text-dark ms-3"
            @click="resetPasswordInfo"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- 업데이트 완료 모달 -->
  <div
    class="modal fade"
    id="updateInfoDoneModal"
    tabindex="-1"
    aria-labelledby="updateInfoDoneModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="updateInfoDoneModalLabel">알림</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
        {{updateMessage}}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyPageSidebar from "@/components/MyPageSidebar.vue";
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import memberAPI from "@/apis/memberAPI";
import agentAPI from "@/apis/agentAPI";
import { Modal } from "bootstrap";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const store = useStore();
const agentData = ref({});
const memberData = ref({});
const arrPhone = ref("");
const arrBrandNumber = ref("");
const userRole = ref("");
const memberProfile = ref(null);
const agentDetailData = ref({});
const hasQuantity = ref(0);
const updateMessage = ref("");

//유저 데이터를 가져오는 메소드 정의
async function getUserData() {
  try {
    const response = await memberAPI.getUserData();
    userRole.value = response.data.userRole;
    hasQuantity.value = response.data.propertyListing;
    if (userRole.value == "AGENT") {
      agentData.value = response.data.agentSignupData.agent;
      agentDetailData.value = response.data.agentSignupData.agentDetail;
      // 전화번호, 사업자 번호 하이픈을 기준으로 나누기
      arrPhone.value = agentData.value.aphone.split("-");
      arrBrandNumber.value = agentDetailData.value.adbrandnumber.split("-");
    } else {
      memberData.value = response.data.member;
      arrPhone.value = memberData.value.mphone.split("-");
    }
  } catch (error) {
    console.log(error);
  }
}
const getUattach = async (argAnumber) => {
  try {
    if (store.getters.getUserRole === "MEMBER") {
      const response = await memberAPI.memberAttachDownload(argAnumber);
      const blob = response.data;
      memberProfile.value = URL.createObjectURL(blob);
    } else {
      const response = await agentAPI.agentAttachDownload(argAnumber);
      const blob = response.data;
      memberProfile.value = URL.createObjectURL(blob);
    }
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  if (store.getters.getUserRoleNumber) {
    getUattach(store.getters.getUserRoleNumber);
  }
});

//로그인한 유저의 이메일을 가지고 데이터 가져오는 함수
getUserData(store.getters.getUemail);

let changePassword = ref({
  oldPassword: "",
  newPassword1: "",
  newPassword2: "",
});

let errorMessage = ref({
  oldPassword: "",
  newPassword1: "",
  newPassword2: "",
  name:"",
  phone:""
});

var oldPasswordValidStyle = ref(false);
var new1PasswordValidStyle = ref(false);
var new2PasswordValidStyle = ref(false);

var passwordPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{4,20}$/;
var passwordResult = ref(null);

const fileInputProfile = ref(null);
const imageFilesProfile = ref(null);

// 비밀번호 변경을 할 때 빈 값이 있으면 제출 버튼 비활성화
const checkChangePasswordData = computed(() => {
  var result =
  oldPasswordValidStyle.value && new1PasswordValidStyle.value && new2PasswordValidStyle.value;
  return result;
});

// 내 정보 변경을 할 때 수정 안하고 버튼 누르면 비활성화
const checkForm = computed(()=>{
  var result =  changeAgentCount.value > 0 || changeMemberCount.value > 0;
  return result;
})

// 파일을 읽고 URL을 반환하는 함수
const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve({ file, src: e.target.result }); // 파일과 데이터 URL을 포함한 객체 반환
    };
    reader.onerror = reject; // 실패 시 onerror 실행 됨
    reader.readAsDataURL(file); // 파일의 데이터 URL을 읽기 시작
  });
};
//주소 검색 모달
function openPostSearch() {
  new window.daum.Postcode({
    oncomplete: (data) => {
      agentData.value.apostcode = data.zonecode;
      agentData.value.aaddress = data.address;
      showMap(data.address); // 주소로 좌표 저장하기
    },
  }).open();
}
// input태그에 이미지 들어오면 실행
const previewImagesProfile = async (event) => {
  console.log("profile실행");
  const file = fileInputProfile.value.files[0]; // 선택된 파일 가져오기

  if (file) {
    try {
      const newImage = await readFile(file); // 파일 읽기
      imageFilesProfile.value = newImage; // imageFiles에 할당
    } catch (error) {
      console.error("파일을 읽는 중 오류 발생:", error);
    }
  }
};
//주소에 따른 좌표 등록
function showMap(address) {
  const kakao = window.kakao;
  const geocoder = new kakao.maps.services.Geocoder();

  geocoder.addressSearch(address, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      agentData.value.alongitude = result[0].x;
      agentData.value.alatitude = result[0].y;
    }
  });
}
//////////////////////////////////////////////////////////////////////////////
async function validOldPassword() {
  // 기존 비밀번호 일치한지 확인
  try {
    const formData = new FormData();
    formData.append("uemail", store.state.uemail);
    formData.append("upassword", changePassword.value.oldPassword);
    const response = await memberAPI.checkOldPassword(formData)
    console.log("결과: ",response.data.result);
    if (response.data.result == "틀림") {
      console.log("입력값 보여주기 else",changePassword.value.oldPassword);
      errorMessage.value.oldPassword = "비밀번호가 틀렸습니다.";
      oldPasswordValidStyle.value = false;
      console.log("비밀번호 틀림 여부", oldPasswordValidStyle.value);
    } else {
      console.log("입력값 보여주기 else",changePassword.value.oldPassword);
      oldPasswordValidStyle.value = true;
      errorMessage.value.oldPassword = "비밀번호가 일치합니다.";
    }
  } catch (error) {
    console.log(error);
    oldPasswordValidStyle.value = false;
  }
}
// 새로운 비밀번호 패턴 검사
function validNew1Password() {
  passwordResult.value = passwordPattern.test(changePassword.value.newPassword1);
  if (!passwordResult.value) {
    errorMessage.value.newPassword1 = "유효하지 않은 비밀번호 입니다.";
    new1PasswordValidStyle.value = false;
  } else {
    errorMessage.value.newPassword1 = "비밀번호 사용이 가능합니다.";
    new1PasswordValidStyle.value = true;
  }
}

function validNew2Password() {
  if (changePassword.value.newPassword1 !== changePassword.value.newPassword2) {
    errorMessage.value.newPassword2 = "비밀번호와 비밀번호 확인이 다릅니다.";
    new2PasswordValidStyle.value = false;
    console.log("비밀번호 다름 여부", new2PasswordValidStyle.value);
  } else {
    errorMessage.value.newPassword2 = "같은 비밀번호 입니다.";
    new2PasswordValidStyle.value = true;
    console.log("비밀번호 맞음", new2PasswordValidStyle.value);
  }
}
// 비밀번호 변경
async function changePasswordSubmit(){
  // 유효성 검사를 모두 통과하면 제출 실행
  const updateInfoDoneModal = new Modal(document.getElementById("updateInfoDoneModal"));
  const formData = new FormData();
  formData.append("upassword",changePassword.value.newPassword1);
  formData.append("uemail", store.state.uemail);
  try {
    const response = await memberAPI.updatePassword(formData);
  if (response.data.success) {
      updateMessage.value = response.data.success;
      resetPasswordInfo()
      updateInfoDoneModal.show();
    } else if (response.data.fail) {
      updateMessage.value = response.data.fail;
      updateInfoDoneModal.show();
    }
  } catch (error) {
    console.log(error);
    updateMessage.value = "알 수 없는 오류로 실패 했습니다."; 
    updateInfoDoneModal.show();
  }
  // 제출 하고 제출 조건이 되는 논리값 초기화
  oldPasswordValidStyle.value = false; 
  new1PasswordValidStyle.value = false;
  new2PasswordValidStyle.value = false;
  
  // 변경되었다는 모달 창 띄우기


  // console.log(JSON.parse(JSON.stringify(changePassword.value)));
  console.log("비밀번호 변경 폼 제출");
}
////////////////////////////////////////////////////////////////////////////////
// 내 정보 수정 제출 메소드 정의
async function updateForm() {
  console.log("제출 함수 실행");
  //중개인 제출 데이터 폼
  if (store.getters.getUserRole === "AGENT") {
    const formData = new FormData();
    formData.append("agent.abrand", agentData.value.abrand);
    formData.append("agent.aname", agentData.value.aname);
    formData.append(
      "agent.aphone",
      arrPhone.value[0] + "-" + arrPhone.value[1] + "-" + arrPhone.value[2]
    );
    formData.append("agent.aaddress", agentData.value.aaddress);
    formData.append("agent.aaddressdetail", agentData.value.aaddressdetail);
    formData.append("agent.apostcode", agentData.value.apostcode);
    formData.append("agent.alatitude", agentData.value.alatitude);
    formData.append("agent.alongitude", agentData.value.alongitude);
    if (imageFilesProfile.value)
      formData.append("agent.aprofile", imageFilesProfile.value.file);

    formData.append(
      "agentDetail.adbrandnumber",
      agentDetailData.value.adbrandnumber
    );
    try {
      await agentAPI.updateAgentData(formData);
      updateMessage.value = "회원 정보 업데이트 성공";
      changeAgentCount.value = 0; // 변경 감지하는 변수 초기화
      changeMemberCount.value = 0;
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  } else{
    const formData = new FormData();
    formData.append("mname", memberData.value.mname);

    formData.append(
      "mphone",
      arrPhone.value[0] + "-" + arrPhone.value[1] + "-" + arrPhone.value[2]
    );
    if (imageFilesProfile.value)
      formData.append("mprofile", imageFilesProfile.value.file);
    try {
      await memberAPI.updateMemberData(formData);
      updateMessage.value = "회원 정보 업데이트 성공"
      changeAgentCount.value = 0; // 변경 감지하는 변수 초기화
      changeMemberCount.value = 0;

    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  }

  // 프사가 변경되면 이미지 변경을 의미하는 전역 함수 실행
  if(imageFilesProfile.value && updateMessage.value){
    store.commit("changeProfileImage/setChangeProfile");
  }
  
  const updateInfoDoneModal = new Modal(document.getElementById("updateInfoDoneModal"));
  updateInfoDoneModal.show();
}

var phonePattern = /^[0-9]+$/;
var namePattern = /^[가-힣]{2,17}$/;
var validResultName = ref(false);
var validResultPhone = ref(false);

// 이름 패턴 검사기
function nameValidator(name) {
  if (!namePattern.test(name)) {
    errorMessage.value.name = "실명을 입력하세요";
    validResultName.value=false;
  } else {
    errorMessage.value.name = "";
    validResultName.value=true;

  }
} 
// 휴대폰 번호 패턴 검사기 
function PhoneValidate(phone) {
    // 검사 하기전 결과 값 초기화
  errorMessage.value.phone = "";
  validResultPhone.value = true;
  // // 휴대폰 번호 배열 유효성 검사
  arrPhone.value.forEach(phone => {
    var result = phonePattern.test(phone);
    console.log(phone,result,phone.length);
    if(!result){
      errorMessage.value.phone = "숫자만 입력하세요";
      validResultPhone.value=false;
    } 
  })
  // if (!phonePattern.test(phone)) {
  //   errorMessage.value.phone = "숫자만 입력하세요";
  //   validResultPhone.value=false;
  // } else {
  //   errorMessage.value.phone = "";
  //   validResultPhone.value=true;
  // }
}

// 수정 제출 버튼 누르면 실행
function validCheckBeforeSubmit(){
  // 형식 유효성 검사하기
  if(store.getters.getUserRole === "AGENT"){
    nameValidator(agentData.value.aname);
    PhoneValidate(agentData.value.aphone);
  } else if(store.getters.getUserRole === "MEMBER"){
    nameValidator(memberData.value.mname);
    PhoneValidate(memberData.value.mphone);
  }

  // 검사를 통과하면 수정 폼 제출
  if(validResultName.value && validResultPhone.value){
    updateForm()
  }
}

//비밀번호 수정 완료 업데이트
function resetPasswordInfo() {
  changePassword.value.newPassword1 = "";
  changePassword.value.newPassword2 = "";
  changePassword.value.oldPassword = "";

  errorMessage.value.newPassword1 = "";
  errorMessage.value.newPassword2 = "";
  errorMessage.value.oldPassword = "";
}

// 내 정보 수정 초기화 
function resetInfoBtn(){
  getUserData(store.getters.getUemail);
  imageFilesProfile.value = null;
  changeAgentCount.value = -2; // 변경 감지하는 변수 초기화
  changeMemberCount.value = -2;
}

// 정보 수정에서 수정된 값 감지(Agent)
const changeAgentCount = ref(-2); // 처음 불러올 때 기본적으로 2번 변경되기에 -2를 기본값으로 함
watch(agentData,()=>{
  console.log("agent객체 변경 감지");
  changeAgentCount.value += 1;
  console.log("agent 객체 변경 횟수",changeAgentCount.value);
},{deep:true});
watch(arrPhone,()=>{
  console.log("agent객체 변경 감지");
  changeAgentCount.value += 1;
  console.log("agent 객체 변경 횟수",changeAgentCount.value);
},{deep:true});
watch(imageFilesProfile,()=>{
  // 이미지가 들어오는 값만 사용
  if(imageFilesProfile.value != null){
    console.log("member객체 변경 감지");
    changeMemberCount.value += 1;
    console.log("member 객체 변경 횟수",changeMemberCount.value);
  }
},{deep:true});

// 정보 수정에서 수정된 값 감지(member)
const changeMemberCount = ref(-2);
watch(memberData,()=>{
  console.log("member객체 변경 감지");
  changeMemberCount.value += 1;
  console.log("member 객체 변경 횟수",changeMemberCount.value);
},{deep:true});
watch(arrPhone,()=>{
  console.log("member객체 변경 감지");
  changeMemberCount.value += 1;
  console.log("member 객체 변경 횟수",changeMemberCount.value);
},{deep:true});
watch(imageFilesProfile,()=>{
  // 이미지가 들어오는 값만 사용
  if(imageFilesProfile.value != null){
    console.log("member객체 변경 감지");
    changeMemberCount.value += 1;
    console.log("member 객체 변경 횟수",changeMemberCount.value);
  }
},{deep:true});

</script>

<style scoped>
.titleNcontent {
  width: 80%;
  padding: 20px;
}
.badge {
  left: 80px;
  top: 72px;
}

input[type="password"] {
  width: 70%;
}
.readonly-box {
  background-color: #ced4da;
}
</style>
