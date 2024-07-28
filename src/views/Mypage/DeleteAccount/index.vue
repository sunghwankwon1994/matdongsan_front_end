<template>
  <div class="d-flex vh-100 w-100 mx-auto">
    <MyPageSideBar />
    <div class="titleNcontent mt-2 w-75 mx-auto">
      <h4 class="fw-bold mb-4">회원탈퇴</h4>
      <hr />
      <div class="">
        <div class="">
          <p class="w-75">
            <b
              >회원 탈퇴를 신청하기 전에 아래 안내 사항을 한번 더
              확인해주세요.</b
            >
          </p>
          <ul class="delete-user-info list-group list-group-numbered w-75">
            <ol class="list-group-item border-0">
              회원 탈퇴 시, 현재 로그인된 아이디는 즉시 탈퇴 처리됩니다.
            </ol>
            <ol class="list-group-item border-0">
              회원 탈퇴 시, 회원 전용 웹 서비스 이용이 불가합니다.
            </ol>
            <ol class="list-group-item border-0">
              회원 탈퇴 시, 현재 로그인된 아이디는 즉시 탈퇴 처리됩니다.
            </ol>
            <ol class="list-group-item border-0">
              탈퇴 시 회원 정보 및 찜 서비스, 등록한 게시물 이용 기록이 모두
              삭제 됩니다.
            </ol>
            <ol class="list-group-item border-0">
              회원 정보 및 서비스 이용 기록은 모두 삭제되며, 삭제된 데이터는
              복구되지 않습니다.
            </ol>
          </ul>
        </div>
        <hr />
        <form
          action="#"
          class="deleteUserForm w-75 mx-auto mt-5"
          v-on:submit.prevent="handleDeleteSubmit"
        >
          <div class="mx-auto form-group mt-5 w-50">
            <h6>비밀번호</h6>
            <input
              class="form-control mx-auto border border-secondary"
              type="password"
              v-model="deleteAccount.deletePassword"
            />
          </div>
          <div class="form-group mt-3 w-50 mx-auto">
            <h6>탈퇴를 하는 이유가 뭔가요?</h6>
            <select
              class="form-select form-select mb-3 mx-auto border border-secondary"
              aria-label=".form-select-lg example"
              v-model="deleteAccount.deleteOptionSelect"
            >
              <option value="" disabled hidden selected>
                이유를 선택해 주세요
              </option>
              <option value="inconvenient">사용이 불편함</option>
              <option value="tooManyTimes">너무 많이 이용함</option>
              <option value="lackOfBenenfits">회원 혜택 부족</option>
              <option value="etc">기타</option>
            </select>
          </div>
          <div class="form-group mt-3 mx-auto w-50">
            <h6>다른 이유가 있다면 알려주세요</h6>
            <textarea
              name="reasonForDeleteAccount"
              id="reasonForDeleteAccount"
              class="mx-auto form-control border border-secondary"
            >
            </textarea>
          </div>
          <div class="form-group mt-3 mx-auto w-50">
            <input
              type="checkbox"
              name="deleteAgreement"
              id="deleteAgreement"
              v-model="deleteAccount.deleteAgreement"
            />
            <label for="deleteAgreement" class="ms-2"
              ><b> 유의 사항에 동의 </b></label
            >
          </div>
          <div class="form-group mt-3 text-center">
            <button type="button" class="btn btn-dark w-25">돌아가기</button>
            <button
              type="submit"
              class="ms-3 btn btn-warning w-25"
              :disabled="!checkDeleteAccountData"
              @click="openDeleteAccountModal()"
            >
              탈퇴하기
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>


  <!-- 탈퇴 확인 모달 -->
  <div
    v-if="showDeleteAccountModal"
    class="modal fade show d-block"
    tabindex="-1"
    role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">탈퇴 확인</h5>
          
        </div>
        <div class="modal-body">
          <p>정말 탈퇴하시겠습니까?</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="closeDeleteAccountModal"
          >
            취소
          </button>
          <button type="button" class="btn btn-danger" @click="confirmDeleteAccount">
            탈퇴
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import MyPageSideBar from "@/components/MyPageSidebar.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import memberAPI from "@/apis/memberAPI";
const store = useStore();
const router = useRouter();

const showDeleteAccountModal = ref(false);

let deleteAccount = ref({
  deletePassword: "",
  deleteOptionSelect: "",
  deleteAgreement: "",
});

// 버튼 활성화 
const checkDeleteAccountData = computed(() => {
  var result =
    deleteAccount.value.deletePassword !== "" &&
    deleteAccount.value.deleteOptionSelect !== "" &&
    deleteAccount.value.deleteAgreement !== "";
  return result;
});

// form 제출 
async function handleDeleteSubmit() {
  try {

    const data = deleteAccount.value.deletePassword;
    const response = await memberAPI.deleteAccount(data);
    store.dispatch("deleteAuth");
    router.push("/");
  } catch (error) {
    console.log(error);
  }
}

// 탈퇴 확인 모달 닫기 
function closeDeleteAccountModal() {
  showDeleteAccountModal.value = false;
}

// 탈퇴 확인 모달 열기 
function openDeleteAccountModal() {
  showDeleteAccountModal.value = true;
}

// 탈퇴 확인 모달에서 탈퇴 버튼 클릭 
function confirmDeleteAccount() {
  
}

</script>

<style scoped>
.titleNcontent {
  width: 80%;
  padding: 20px;
}
.deleteUserForm,
.delete-user-info {
  /* margin-right: auto;
  margin-left: auto; */
}
</style>
