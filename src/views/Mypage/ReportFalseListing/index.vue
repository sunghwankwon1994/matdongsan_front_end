<template>
  <div class="d-flex vh-100 w-100 mx-auto min-vh-100">
    <MyPageSideBar />
    <div class="titleNcontent w-75 mx-auto">
      <div class="d-flex justify-content-between">
        <h4 class="col h4 mt-2 fw-bold">허위매물 신고</h4>
        <div class="align-self-center">
          <select
            class="form-select"
            @change="SelectedFilter"
            name="filter"
            id=""
            v-model="filterKeyword"
          >
            <option value="desc" selected>최신순</option>
            <option value="asc">오래된순</option>
          </select>
        </div>
      </div>
      <hr />
      <table class="table mt-2 text-center">
        <thead>
          <tr>
            <th scope="col" class="text-center">매물번호</th>
            <th scope="col" class="text-center">매물사진</th>
            <th scope="col" class="text-center">제목</th>
            <th scope="col" class="text-center">신고한 날짜</th>
            <th scope="col" class="text-center"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(report, index) in reports" :key="report.rnumber">
            <th scope="row" class="text-center align-middle">
              {{ report.rpnumber }}
            </th>
            <td class="align-middle text-center">
              <router-link :to="`/Property/${report.rpnumber}`">
                <img
                  v-if="pthumbnails[report.rpnumber] != null"
                  :src="pthumbnails[report.rpnumber]"
                  width="150"
                  height="150"
                  class="rounded-1"
                  alt="매물 사진"
                />
              </router-link>
            </td>
            <td class="align-middle text-muted">
              <div
                v-if="propertyTitles[report.rpnumber] != null"
                class="fw-bold"
              >
                {{ propertyTitles[report.rpnumber].ptitle }}
              </div>
            </td>
            <td class="fw-bold align-middle text-center">
              {{ report.formattedDate }}
            </td>
            <td class="fw-bold align-middle">
              <div class="d-flex flex-column buttons-box mx-auto">
                <button
                  type="button"
                  @click="openRepotyDetailModal(index)"
                  class="btn btn-dark btn-sm w-100 fw-bold mb-3"
                >
                  자세히 보기
                </button>
                <button
                  class="btn btn-sm fw-bold btn-danger"
                  @click="openDeleteReportModal(report.rpnumber)"
                >
                  삭제
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
        v-if="reports.length"
        class="mt-5"
        :currentPage="pager.pageNo"
        :totalPages="pager.totalPageNo"
        :maxVisiblePages="4"
        @update:currentPage="handlePageChange"
      />
      <div v-else class="w-75 container">
      <div class="text-center mt-5 mb-5">
        신고한 내역이 없습니다.
      </div>
    </div>
    </div>
  </div>
  <!-- 디테일 모달 -->
  <!-- 모달 -->
  <div class="modal" id="ReportDetailModal">
    <div class="modalDialog modal-dialog modal-fullsize modal-dialog-centered">
      <div class="modalContent modal-content modal-fullsize">
        <div class="modal-body">
          <div class="d-flex mx-auto flex-row-reverse">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="ms-5 me-5">
            <h5
              style="font-weight: bold; text-align: center; margin-bottom: 20px"
            >
              허위매물 신고하기
            </h5>
            <div class="row">
              <div class="col-2">신고<br />내용</div>
              <textarea
                placeholder="정확한 확인을 위해 신고내용을 구체적으로 기재해 주세요. (20자 이상) 본 신고 내용은 해당 중개업소에게 전달되므로, 개인정보(연락처, 이름 등)는 기재하지 말아주세요."
                class="col-10"
                style="height: 100px; font-size: small"
                :value="reportData.rcontent"
                disabled
              >
              </textarea>
            </div>
            <hr />
            <p style="font-weight: bold">신고하기전에 확인해주세요!!</p>
            <div class="row">
              <input
                class="col-1"
                type="checkbox"
                id="checkbox1"
                v-model="checkbox"
                disabled
              />
              <label class="col-11" for="checkbox1" style="font-size: small"
                >2020년 2월 21일부터, 정당한 이유 없이 시세에 영향을 주기 위해
                공인중개사 등의 광고를 방해하면 3년 이하 징역 또는 3,000만원
                이하 벌금에 처해집니다. 신고 시 명확한 사실을 기재해
                주세요.</label
              >
            </div>
            <div class="row mt-5">
              <button
                class="col btn btn-sm"
                style="background-color: grey; color: white"
                data-bs-dismiss="modal"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--삭제 확인 모달 -->
  <div class="modal" tabindex="-1" id="DeleteReportModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <slot name="body">
          <div class="modal-body">
            <p class="fw-bold p-4 h-4 text-center">
              삭제 하시겠습니까? <br />
              삭제 후에 수정 불가합니다.
            </p>
          </div>
        </slot>
        <slot name="footer">
          <div class="modal-footer border border-0 mx-auto mb-3">
            <button
              type="button"
              class="btn btn-outline-light ps-4 pe-4 text-dark border border-secondary fw-bold"
              data-bs-dismiss="modal"
            >
              돌아가기
            </button>
            <button
              type="button"
              class="btn btn-danger ms-5 ps-4 pe-4 fw-bold"
              data-bs-dismiss="modal"
              @click="confirmDeleteReport"
            >
              신고 삭제하기
            </button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyPageSideBar from "@/components/MyPageSidebar.vue";
import { ref, onMounted } from "vue";
import propertyAPI from "@/apis/propertyAPI";
import dayjs from "dayjs";
import { Modal } from "bootstrap";
import Pagination from "@/components/Pagination.vue";
const checkbox = true;
const reports = ref([]);
const pthumbnails = ref([]);
const selectedRpnumber = ref(0); //
const currentPage = ref(0);
const pager = ref({});
const reportData = ref({});
const propertyTitles = ref([]);
const filterKeyword = ref("desc"); //필터 키워드
const handlePageChange = (page) => {
  currentPage.value = page;
  getUserReportList(page);
};

// 모달 열기
function openDeleteReportModal(pnumber) {
  const deleteReportModal = new Modal(
    document.getElementById("DeleteReportModal")
  );
  deleteReportModal.show();
  selectedRpnumber.value = pnumber;
  console.log("selectedRpnumber : " + selectedRpnumber.value);
}

// 허위 매물 리스트
async function getUserReportList(pageNo = 1,filterKeyword) {
  try {
    const response = await propertyAPI.getReportList(pageNo,filterKeyword);
    reports.value = response.data.userReportList;
    reports.value.forEach((report) => {
      getPthumbnail(report.rpnumber);
      getPropertyTitle(report.rpnumber);
      report.formattedDate = dayjs(report.rdate).format("YYYY-MM-DD");
    });
    pager.value = response.data.pager;
  } catch (error) {
    console.log(error);
  }
}
// 매물 제목 가져오기
async function getPropertyTitle(pnumber) {
  try {
    const response = await propertyAPI.getPropertyDataByPnumber(pnumber);
    propertyTitles.value[pnumber] = response.data;
    console.log(propertyTitles.value[pnumber]);
  } catch (error) {
    console.log(error);
  }
}
// 사진 출력
const getPthumbnail = async (pnumber) => {
  try {
    const response = await propertyAPI.propertyAttachDownload(pnumber);
    pthumbnails.value[pnumber] = URL.createObjectURL(response.data);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getUserReportList();
});

// 모달에서 삭제 버튼 클릭 시 실행
const confirmDeleteReport = () => {
  console.log("received selectedRpnumber : " + selectedRpnumber.value);
  deleteReportProperty(selectedRpnumber.value);
  // 모달 닫기
  const deleteReportModal = Modal.getInstance(
    document.getElementById("DeleteReportModal")
  );
  deleteReportModal.hide();
};

// 허위 신고 삭제
const deleteReportProperty = async (pnumber) => {
  try {
    await propertyAPI.deletePropertyReport(pnumber);
    await getUserReportList(); // 삭제 후 리스트 갱신
  } catch (error) {
    console.log(error);
  }
};

function openRepotyDetailModal(number) {
  const reportDetailModal = new Modal(
    document.getElementById("ReportDetailModal")
  );
  reportData.value = reports.value[number];
  getPropertyTitle(number);
  console.log("숫자는" + reportData.value);
  reportDetailModal.show();
}
//필터값 바뀌면 실행
function SelectedFilter() {
  console.log(filterKeyword.value);
  getUserReportList(1,filterKeyword.value);
}
</script>

<style scoped>
.titleNcontent {
  width: 80%;
  padding: 20px;
}
.buttons-box {
  width: 150px;
}
.routerLink {
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 기본 텍스트 색상 상속 */
  background: none; /* 배경 제거 */
  border: none; /* 테두리 제거 */
  cursor: pointer; /* 커서 스타일 설정 */
}
input[type="checkbox"] {
  transform: scale(0.5);
}
</style>
