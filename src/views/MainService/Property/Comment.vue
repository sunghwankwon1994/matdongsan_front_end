<template>
  
  <div class="mt-5">
    <div class="d-flex justify-content-between mb-3">
      <h4 class="mt-3 fw-bold">문의하기 ({{ props.userComment.length }})</h4>
      <div class="align-self-center">
        <select class="form-select" aria-label="Default select example" @change="sortComment"  v-model="selectedSortOption">
          <option selected value="desc">최신순</option>
          <option value="asc">오래된순</option>
        </select>
      </div>
    </div>
    <div v-if="store.getters.getUserRole === 'MEMBER' 
          && (store.getters.getUemail !== propertyUser.uemail)" 
          class="d-flex mb-4 justify-content-around">
      <img v-if="memberProfile"
        width="60"
        height="60"
        class="rounded-circle"
        :src="memberProfile"
        alt=""
      />
      <img v-else
                src="@/assets/profileImage.png"
                alt=""
                class="rounded-circle"
                width="60"
                height="60"
      />
      <div class="ms-3 w-75 align-self-center">
        <input
          class="w-100 p-2 rounded align-middle me-2"
          v-model="userComment.uccomment"
          type="text"
          placeholder="댓글을 입력해주세요..."
        />
      </div>
      <button class="btn ms-3 py-2 h-75 align-self-center btn-sm btn-secondary" @click="submitComment">
        작성하기
      </button>
    </div>
    <div v-else-if="!store.getters.getUemail" class="d-flex mb-4 justify-content-around">
      <img
        width="60"
        height="50"
        class="rounded-circle"
        src="@/assets/profileImage.png"
        alt=""
      />
      <div class="ms-3 w-75 align-self-center">
        <input
          class="w-100 p-2 rounded align-middle me-2"
          type="text"
          placeholder="로그인후 이용해주세요..."
          readonly
        />
      </div>
      <button class="btn ms-3 py-2 h-75 align-self-center btn-sm btn-secondary" disabled>
        작성하기
      </button>
    </div>

    <!-- 댓글 -->
    <div v-for="(comment, index) in props.userComment" :key="comment.ucnumber">
      <div>
        <div>
          <hr />
          <div class="d-flex justify-content-between" :class="comment.ucparentnumber? 'ps-5':''">
            <div v-if="(comment.ucUnumber == userCommonData.unumber || userCommonData.unumber == props.pUnumber) && comment.ucremoved !== true" class="d-flex">
              <img v-if="comment.profile"
                width="40"
                height="40"
                class="align-self-center rounded-circle"
                :src="comment.profile"
                alt=""
              />
              <!-- <img v-else 
                width="40"
                height="40"
                class="align-self-center rounded-circle"
                src="@/assets/profileImage.png"
                alt=""
              /> -->
              <p class="align-self-center fw-bold ms-2 h6 m-0">
                <span>{{ comment.name }}</span>
              </p>
            </div>
            <span class="align-self-center">{{comment.ucdate}}</span>
          </div>
          <div class="d-flex justify-content-end">
            <div v-if="comment.ucremoved !== true" class="ms-5 justify-content-end d-flex">
              <div class="d-flex">
                <div v-if="!comment.ucparentnumber 
                          && (userCommonData.unumber == props.pUnumber || comment.ucUnumber == userCommonData.unumber)"
                  class="btn btn-sm text-decoration-underline"
                  @click="toggleReplyForm(index)"
                >
                  댓글달기
                </div>

                <div v-if="comment.ucUnumber == userCommonData.unumber">
                  <div class="btn btn-sm btn-success me-2" @click="editCommentButton(comment)">
                    수정
                  </div>
                  <div class="btn btn-sm btn-danger" @click="[openDeleteModal(), getCommentId(comment.ucnumber)]">
                    삭제
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          <div class="ms-5 mt-1">
            <div v-if="!editingComment || editingComment.ucnumber !== comment.ucnumber" class="fw-bold text-break">
              <p v-if="comment.ucremoved === true" :class="comment.ucparentnumber? parentComment: childComment">삭제된 댓글입니다.</p>
              <p v-else>
                <!-- 판매자도 댓글 가능하게 하기 -->
                <span v-if="comment.ucUnumber == userCommonData.unumber || userCommonData.unumber == props.pUnumber">                
                  {{comment.uccomment}}
                </span>
                <span v-else>비밀 댓글입니다.</span>
              </p>
            </div>
            <div v-else>
              <textarea v-model="editingComment.uccomment" class="form-control mb-2"></textarea>
              <button class="btn btn-sm btn-primary me-2" @click="submitEditComment">
                수정
              </button>
              <button class="btn btn-sm btn-secondary" @click="cancelEditComment">
                취소
              </button>
            </div>
          </div>

          <div v-if="showReplyForm[index]" class="ms-5 mt-3">
            <input
              class="w-75 p-2 rounded align-middle me-2"
              v-model="replyComment[index]"
              type="text"
              placeholder="대댓글을 입력해주세요..."
            />
            <button
              class="btn py-2 btn-sm btn-secondary"
              @click="submitReply(comment.ucnumber, index)"
            >
              작성하기
            </button>
          </div>
        </div>
      </div>
    </div>
<!-- 페이지네이션 -->
    <div v-if="props.userComment.length !== 0" class="mt-5">
      <Pagination
        :currentPage="pager.pageNo"
        :totalPages="pager.totalPageNo"
        :maxVisiblePages="5"
        @update:currentPage="(page) => emits('update:currentPage', page)"
      />
    </div>
    <div v-if="props.userComment.length == 0" class="text-center">
      <img
        src="@/assets/none_comment_icon.png"
        alt=""
        width="100"
        class="mb-3"
      />
      <div class="fw-bold">아직 아무런 문의가 없어요</div>
    </div>
  </div>

  <!-- 경고 모달 -->
  <div
    class="modal fade"
    id="commentWarningModal"
    tabindex="-1"
    aria-labelledby="commentWarningModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="commentWarningModalLabel">경고</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{ warningMessage }}
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

  <!-- 삭제 확인 모달 -->
  <div
    v-if="showDeleteModal"
    class="modal fade show d-block"
    tabindex="-1"
    role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">삭제 확인</h5>
          
        </div>
        <div class="modal-body">
          <p>정말 삭제하시겠습니까?</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="closeDeleteModal"
          >
            취소
          </button>
          <button type="button" class="btn btn-danger" @click="confirmDelete">
            삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { useStore } from "vuex";
import { Modal } from "bootstrap";
import propertyAPI from "@/apis/propertyAPI";
import memberAPI from "@/apis/memberAPI";
import agentAPI from "@/apis/agentAPI";
import Pagination from "@/components/Pagination.vue";
const router = useRouter();
const route = useRoute();
const store = useStore();
const props = defineProps([
  'userComment', 'pager', 'pUnumber'
]);
const emits = defineEmits(['update-property-data', 'update:currentPage', 'get:commentFilter'])

const memberProfile = ref(null);
const comment = ref("");
const showDeleteModal = ref(false);
const clickedModalId = ref("");
const userComment = ref({
  uccomment: "",
  ucPnumber: route.params.id,
  ucparentnumber: 0,
});
const userCommonData = ref({});
const editingComment = ref();
const replyComment = ref(Array(props.userComment.length).fill(""));
const showReplyForm = ref(Array(userComment.value.length).fill(false));
const selectedSortOption = ref('desc');
const warningMessage = ref(""); // 경고 메시지 상태 추가
const propertyUser = ref({});


// ucnumber 얻기
function getCommentId(ucnumber) {
  clickedModalId.value = ucnumber;
}

// 매물 올린 사람 정보
async function getUserDataByUnumber() {
  try {
    const response = await memberAPI.getUserDataByUnumber(props.pUnumber);
    propertyUser.value = response.data.userCommonData;
  } catch(error) {
      console.log(error);
  }
}


//댓글 작성
function submitComment() {
  if(userComment.value.uccomment == "") {
    warningMessage.value = "댓글을 작성하셔야 합니다.";
    const warningModal = new Modal(
      document.getElementById("commentWarningModal")
    );
    warningModal.show();
    return;
  } else {
    postPropertyComment();
  }
}

// 댓글 작성 데이터 전송
const postPropertyComment = async () => {
  try {
    const data = JSON.parse(JSON.stringify(userComment.value));
    console.log("userComment.value.uccomment : " + userComment.value.uccomment);
    console.log("userComment.value.ucPnumber : " + userComment.value.ucPnumber);
    console.log("userComment.value.ucparentnumber : " + userComment.value.ucparentnumber);
    
    await propertyAPI.postPropertyComment(data);
    emits("update-property-data"); // 데이터 다시 가져오기
    userComment.value.uccomment = "";
  } catch(error) {
    console.log(error);
  }
}

// 댓글 수정
function editCommentButton(comment) {
  editingComment.value = {...comment};
}

// 댓글 수정 데이터 전송
async function submitEditComment() {
  try {
    await propertyAPI.editPropertyComment(editingComment.value);
    emits("update-property-data");
    editingComment.value = "";
  } catch(error) {
    console.log(error);
  }
}

// 댓글 수정 취소
function cancelEditComment() {
  editingComment.value = "";
}

//대댓글 작성 토글
function toggleReplyForm(index) {
  showReplyForm.value[index] = !showReplyForm.value[index];
  replyComment.value[index] = "";
}

//대댓글 제출
function submitReply(ucparentnumber, index) {
  console.log("댓글의 부모 아이디: ", ucparentnumber);
  userComment.value.ucparentnumber = ucparentnumber;
  userComment.value.uccomment = replyComment.value[index];
  postPropertyComment(userComment);
  showReplyForm.value[index] = false;
  replyComment.value[index] = "";
}

//댓글 정렬 기능
function sortComment(event){
  emits("get:commentFilter", event.target.value);
}

//삭제 모달 열기
function openDeleteModal() {
  showDeleteModal.value = true;
}
//삭제 모달 닫기
function closeDeleteModal() {
  showDeleteModal.value = false;
}
//삭제 확인 버튼 
function confirmDelete() {
  console.log("삭제되었습니다.");
  deletePropertyComment(route.params.id, clickedModalId.value);
  closeDeleteModal();
}
// 댓글 삭제
const deletePropertyComment = async (pnumber, ucnumber) => {
  try {
    await propertyAPI.deletePropertyComment(pnumber, ucnumber);
    emits("update-property-data"); // 데이터 다시 가져오기
  } catch (error) {
    console.log(error);
  }
};

// 로그인한 유저 프로필 사진
const getUattach = async (userTypeNumber) => { // mnumber 또는 anumber
  try {
    if (store.getters.getUserRole === "MEMBER") {
      const response = await memberAPI.memberAttachDownload(userTypeNumber);
      // if(response.headers["Content-Length"]) {
        const blob = response.data;
        memberProfile.value = URL.createObjectURL(blob);
      // }
    } else if(store.getters.getUserRole === "AGENT") {
      const response = await agentAPI.agentAttachDownload(userTypeNumber);
      // if(response.headers["Content-Length"]) {
        const blob = response.data;
        memberProfile.value = URL.createObjectURL(blob);
      // }
    }
  } catch (error) {
    console.log(error);
  }
};

// 로그인한 유저 정보 가져오기
const getUserData = async(uemail) => {
  try {
    const response = await memberAPI.getUserDataByUemail(uemail);
    userCommonData.value = response.data
  } catch(error) {
    console.log(error);
  }
}




watch(() => route.params.id, (newPnumber) => {
  if(newPnumber) {
    selectedSortOption.value = 'desc';
    userComment.value.uccomment = '';
  }
});

onMounted(() => {
  selectedSortOption.value = 'desc';
  if (store.getters.getUserRoleNumber) {
    getUattach(store.getters.getUserRoleNumber);
    getUserData(store.getters.getUemail);
    getUserDataByUnumber();
  }
});
</script>

<style scoped>
.modal {
  display: none;
}
.modal.show {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}
.modal-dialog {
  margin: 10% auto;
}

</style>
