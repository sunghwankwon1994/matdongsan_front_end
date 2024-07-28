<template>
  <div>
    <div class="d-flex justify-content-between">
      <div class="align-self-center fw-bold">
        평점 & 리뷰({{ props.reviewData.length }})
      </div>

      <div class="align-self-center">
        <select
          class="form-select"
          aria-label="Default select example"
          @change="sortComment"
          v-model="sortOrder"
        >
          <option value="desc">최신순</option>
          <option value="asc">오래된순</option>
          <option value="highRate">높은 별점순</option>
          <option value="lowRate">낮은 별점순</option>
        </select>
      </div>
    </div>
    <div
      class="d-flex mb-4"
      v-if="logedinUser && store.getters.getUserRole !== 'AGENT'"
    >
      <img v-if="memberProfile"
        width="60"
        height="60"
        class="rounded-circle"
        :src="memberProfile"
        alt=""
      />
      <!-- <img v-else
        src="@/assets/profileImage.png"
        width="60"
        height="60"
        class="rounded-circle"
      /> -->
      <div class="ms-3 w-100 align-self-center">
        <div class="d-flex flex-column">
          <div class="star-rating d-flex mb-2">
            <div
              class="star"
              v-for="index in 5"
              :key="index"
              @click="check(index + 1)"
            >
              <span v-if="index < score"
                ><i class="fa-solid fa-star" style="color: #ffd43b"></i
              ></span>
              <span v-if="index >= score"
                ><i class="fa-regular fa-star" style="color: #ffd43b"></i
              ></span>
            </div>
          </div>
        </div>
        <input
          class="w-75 p-2 rounded align-middle me-2"
          v-model="reviewData.arcontent"
          type="text"
          placeholder="댓글을 입력해주세요..."
        />
        <button
          type="button"
          class="btn py-2 btn-sm btn-secondary"
          @click="submitComment"
        >
          작성하기
        </button>
      </div>
    </div>
    <div class="d-flex mb-4" v-if="store.getters.getUserRole === 'AGENT'"></div>
    <div
      class="d-flex mb-4"
      v-if="
        store.getters.getUserRole !== 'AGENT' &&
        store.getters.getUserRole !== 'MEMBER'
      "
    >
      <img
        width="60"
        height="50"
        class="rounded-circle"
        src="@/assets/profileImage.png"
        alt=""
      />
      <div class="ms-3 w-100 align-self-center">
        <input
          class="w-75 p-2 rounded align-middle me-2"
          type="text"
          placeholder="로그인후 이용해주세요..."
          readonly
        />
        <button
          class="btn py-2 btn-sm btn-secondary"
          disabled
          @click="submitComment"
        >
          작성하기
        </button>
      </div>
    </div>
    <div v-if="props.reviewData && props.reviewData.length > 0">
      <div v-for="review in props.reviewData" :key="review.arnumber">
        <div>
          <hr />
          <div class="d-flex justify-content-between">
            <div class="d-flex">
              <img v-if="review.profile"
                width="40"
                height="40"
                class="align-self-center rounded-circle"
                :src="review.profile"
                alt=""
              />
              <!-- <img v-else 
                width="40"
                height="40"
                class="align-self-center rounded-circle"
                src="@/assets/profileImage.png"
                alt=""
              />               -->
              <p class="align-self-center fw-bold ms-2 h6 m-0">
                {{ review.membername }}
              </p>
            </div>
            <span class="align-self-center">{{ review.ardate }}</span>
          </div>
          <div class="ms-5 justify-content-between d-flex">
            <div class="align-self-center d-flex">
              <span class="me-1">{{ review.arrate }}</span>
              <div v-for="index in 5" :key="index">
                <span v-if="index > review.arrate"
                  ><i class="fa-regular fa-star" style="color: #ffd43b"></i
                ></span>
                <span v-if="index <= review.arrate"
                  ><i class="fa-solid fa-star" style="color: #ffd43b"></i
                ></span>
              </div>
            </div>
            <div v-if="review.arMnumber == userRoleNumber">
              <div
                class="btn btn-sm btn-success me-2"
                @click="startEditReview(review)"
              >
                수정하기
              </div>
              <div
                class="btn btn-sm btn-danger"
                @click="[openDeleteModal(), getReviewId(review.arnumber)]"
              >
                삭제하기
              </div>
            </div>
          </div>
          <div class="ms-5 mt-1">
            <p
              v-if="
                !editingReview || editingReview.arnumber !== review.arnumber
              "
              class="fw-bold"
            >
              {{ review.arcontent }}
            </p>
            <div v-else>
              <textarea
                v-model="editingReview.arcontent"
                class="form-control mb-2"
              ></textarea>
              <button
                class="btn btn-sm btn-primary me-2"
                @click="submitEditReview"
              >
                수정
              </button>
              <button
                class="btn btn-sm btn-secondary"
                @click="cancelEditReview"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        :currentPage="pager.pageNo"
        :totalPages="pager.totalPageNo"
        :maxVisiblePages="5"
        @update:currentPage="(page) => emits('update:currentPage', page)"
      />
    </div>
    <div v-if="props.reviewData.length == 0" class="text-center">
      <img
        src="@/assets/none_comment_icon.png"
        alt=""
        width="100"
        class="mb-3"
      />
      <div class="fw-bold">아직 아무런 댓글이 없어요</div>
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
    <div class="modal-dialog">
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
    role="dialog"
  >
    <div class="modal-dialog" role="document">
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
import memberAPI from "@/apis/memberAPI";
import agentAPI from "@/apis/agentAPI";
import { onMounted, ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { Modal } from "bootstrap";
import Pagination from "@/components/Pagination.vue";
const store = useStore();
const logedinUser = store.getters.getUemail; // 수정버튼
const props = defineProps(["reviewData", "pager"]);
const emits = defineEmits([
  "update-agent-data",
  "update:currentPage",
  "get:agentFilter",
]);
const warningMessage = ref(""); // 경고 메시지 상태 추가
const showDeleteModal = ref(false);
const memberProfile = ref(null);
const clickedModalId = ref("");
const score = ref(0);
const editingReview = ref(null); // 수정 중인 리뷰 상태 추가
const router = useRouter();
const route = useRoute();
const userRoleNumber = computed(() => store.getters.getUserRoleNumber);
const reviewData = ref({
  arcontent: "",
  arrate: 0,
  arAnumber: route.params.id,
  arMnumber: store.getters.getUserRoleNumber,
});
const sortOrder = ref("desc");

function getReviewId(reviewId) {
  clickedModalId.value = reviewId;
}

// 댓글 작성
function submitComment() {
  if (reviewData.value.arcontent === "" && score.value === 0) {
    warningMessage.value = "댓글과 평점을 모두 작성하셔야 합니다.";
    const warningModal = new Modal(
      document.getElementById("commentWarningModal")
    );
    warningModal.show();
    return;
  } else if (reviewData.value.arcontent === "") {
    warningMessage.value = "댓글을 작성하셔야 합니다.";
    const warningModal = new Modal(
      document.getElementById("commentWarningModal")
    );
    warningModal.show();
    return;
  } else if (score.value === 0) {
    warningMessage.value = "평점을 매기셔야 합니다.";
    const warningModal = new Modal(
      document.getElementById("commentWarningModal")
    );
    warningModal.show();
    return;
  } else {
    reviewData.value.arrate = score.value - 1;
    postReviewData();
  }
}

// 리뷰 데이터 전송
const postReviewData = async () => {
  try {
    console.log("리뷰데이터 " + reviewData.value.arrate);
    const data = JSON.parse(JSON.stringify(reviewData.value));
    await agentAPI.postAgentReview(data);
    emits("update-agent-data"); // 댓글 작성 후 에이전트 데이터 다시 가져오기
    reviewData.value.arcontent = "";
    score.value = 0;
  } catch (error) {
    console.log("에러 발생");
  }
};

// 리뷰 수정 시작
function startEditReview(review) {
  editingReview.value = { ...review };
}

// 리뷰 수정 취소
function cancelEditReview() {
  editingReview.value = null;
}

// 리뷰 수정 제출
async function submitEditReview() {
  try {
    await agentAPI.updateAgentReview(editingReview.value);
    emits("update-agent-data"); // 댓글 수정 후 에이전트 데이터 다시 가져오기
    editingReview.value = null;
  } catch (error) {
    console.log("에러 발생");
  }
}

// 리뷰 데이터 삭제
const deleteReviewData = async (pageId, reviewId) => {
  try {
    await agentAPI.deleteAgentReview(pageId, reviewId);

    emits("update-agent-data"); // 댓글 작성 후 에이전트 데이터 다시 가져오기
  } catch (error) {
    console.log("에러 발생");
  }
};

// 삭제 모달 열기
function openDeleteModal() {
  showDeleteModal.value = true;
}

// 삭제 모달 닫기
function closeDeleteModal() {
  showDeleteModal.value = false;
}

// 삭제 확인 버튼
function confirmDelete() {
  console.log(clickedModalId.value + "가 삭제되었습니다.");
  deleteReviewData(route.params.id, clickedModalId.value);
  closeDeleteModal();
}

// 유저 프로필 사진
const getUattach = async (argAnumber) => {
  try {
    if (store.getters.getUserRole === "MEMBER") {
      const response = await memberAPI.memberAttachDownload(argAnumber);
      // if(response.headers["Content-Length"]) {
        const blob = response.data;
        memberProfile.value = URL.createObjectURL(blob);
      // }
    } else {
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

onMounted(() => {
  if (store.getters.getUserRoleNumber) {
    getUattach(store.getters.getUserRoleNumber);
  }
});
//Agent.vue로 이벤트 값 보내는 함수
function sortComment(event) {
  emits("get:agentFilter", event.target.value);
}
//평점 자식으로 부터 가져오는 emit 함수
function check(data) {
  score.value = data;
}

watch(
  () => route.params.id,
  (newId) => {
    sortOrder.value = "desc";  // 초기화할 값
    // 여기에 필요한 추가 초기화 작업을 수행할 수 있습니다.
  }
);
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
