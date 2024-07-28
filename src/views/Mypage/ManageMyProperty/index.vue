<template>
  <div class="d-flex w-100 mx-auto">
    <MyPageSideBar />
    <div class="titleNcontent w-75 mx-auto h-auto min-vh-100">
      <div class="d-flex justify-content-between">
        <h4 class="col h4 mt-2 fw-bold">매물 관리</h4>
        <div class="align-self-center">
          <select class="form-select" name="filter" id=""
                  @change="selectedFilter" v-model="filterKeyword">
            <option value="desc" selected>최신순</option>
            <option value="asc">오래된순</option>
            <option value="거래완료">거래완료</option>
            <option value="거래중">거래중</option>
          </select>
        </div>
      </div>
      <hr />
      <table class="table mt-2">
        <thead>
          <tr>
            <th scope="col" class="text-center">매물번호</th>
            <th scope="col" class="text-center">매물사진</th>
            <th scope="col" class="text-center">가격 / 제목</th>
            <th scope="col" class="text-center">등록한 날짜</th>
            <th scope="col" class="text-center">매물 상태</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="property in properties" :key="property.pnumber" >
            <th scope="row" class="text-center align-middle th-width" :class="(property.pstatus =='거래완료' || property.pstatus =='비활성화')? 'table-secondary' : ''">
              {{ property.pnumber }}
            </th>
            <td class="align-middle text-center img-tablepart" :class="(property.pstatus =='거래완료' || property.pstatus =='비활성화')? 'table-secondary' : ''">
              <RouterLink :to="`/Property/${property.pnumber}`">
                <img
                  v-if="pthumbnails[property.pnumber] != null"
                  :src="pthumbnails[property.pnumber]"
                  width="150"
                  height="150"
                  alt="매물 사진"
                  class="rounded-1"
                />
              </RouterLink>
            </td>
            <td class="align-middle text-muted text-center" :class="(property.pstatus =='거래완료' || property.pstatus =='비활성화')? 'table-secondary' : ''">
              <div class="fw-bold">
                {{ property.pcategory }} {{ property.pdeposite }}만원
                <span v-if="property.pcategory == '월세'">
                  / {{ property.prentalfee }}만원</span
                >
              </div>
              <small>
                <span v-if="!(property.pfloortype === '옥탑방')">{{ property.pfloortype }} {{ property.pfloor }}층,</span>
                <span v-if="(property.pfloortype === '옥탑방')">{{ property.pfloortype }},</span>
                {{ property.psize }}m<sup>2</sup>, 관리비 
                <span v-if="property.pmaintenance">{{ property.pmaintenance }}만원</span>
                <span v-else>없음</span>
              </small>
              <div>
                <small>{{ property.ptitle }}</small>
              </div>
            </td>
            <td class="fw-bold align-middle text-center" :class="(property.pstatus =='거래완료' || property.pstatus =='비활성화')? 'table-secondary' : ''">
              {{ property.formattedDate }}
            </td>
            <td class="fw-bold align-middle buttons-height" :class="(property.pstatus =='거래완료' || property.pstatus =='비활성화')? 'table-secondary' : ''">
              <div class="d-flex flex-column">
                <RouterLink
                  class="routerLink"
                  :to="{ path: `/PropertyForm/${property.pnumber}` }"
                >
                  <button
                    class="btn btn-warning btn-sm w-100 fw-bold mb-3"
                    v-if="property.pstatus !== '거래완료'"
                  >
                    <!-- 거래 완료 버튼 누르면 버튼 안 보임 -->
                    <!--버튼 누르면 id값 가지고 수정페이지로 가기-->
                    수정
                  </button>
                </RouterLink>
                <button
                  class="soldOutBtn btn btn-sm fw-bold mb-3"
                  @click="showTransactionModal(property.pnumber)"
                  :disabled="property.pstatus === '거래완료'"
                >
                  <!-- 거래 완료 버튼 누르면 버튼 비활성화 -->
                  거래완료
                </button>
                <!-- <button
                  :class="[
                    'btn btn-sm fw-bold mb-3',
                    isActive ? 'btn-danger' : 'btn-success',
                  ]"
                  @click="toggleActive(property.pnumber)"
                  v-if="property.pstatus !== '거래완료'"
                >
                  {{ isActive ? "비활성화" : "활성화" }}
                </button> -->
                <button
                  class="btn btn-sm fw-bold mb-3 btn-danger"
                  @click="changeStatusActive(property.pnumber)"
                  v-if="
                    property.pstatus !== '거래완료' &&
                    property.pstatus !== '활성화'
                  "
                >
                  활성화
                </button>
                <button
                  class="btn btn-sm fw-bold mb-3 btn-success"
                  @click="changeStatusInactive(property.pnumber)"
                  v-if="
                    property.pstatus !== '거래완료' &&
                    property.pstatus === '활성화'
                  "
                >
                  비활성화
                </button>
                <button
                  class="btn btn-sm btn-outline-danger fw-bold"
                  @click="showDeletePropertyModal(property.pnumber)"
                >
                  삭제
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 페이지네이션 v-if 설정하기 -->
      <Pagination v-if="properties.length"
        class="mt-5"
        :currentPage="pager.pageNo"
        :totalPages="pager.totalPageNo"
        :maxVisiblePages="5"
        @update:currentPage="handlePageChange"
      />
      <div v-else class="w-75 container">
      <div class="text-center mt-5 mb-5">
        등록한 매물이 없습니다.
      </div>
    </div>
    </div>
  </div>
  <TransactionModal
    id="TransactionModal"
    @close="hideTransactionModal"
    :pnumber="selectedPnumber"
    @change-property-status="changePropertyStatus"
  />
  <DeletePropertyModal
    id="DeletePropertyModal"
    :pnumber="selectedPnumber"
    @close="hideDeletePropertyModal"
    @delete-property="deleteProperty"
  />
</template>

<script setup>
import MyPageSideBar from "@/components/MyPageSidebar.vue";
import TransactionModal from "./TransactionCompleted.vue";
import DeletePropertyModal from "./DeletePropertyModal.vue";
import { onMounted, ref } from "vue";
import { Modal } from "bootstrap";
import propertyAPI from "@/apis/propertyAPI";
import axios from "axios";
import dayjs from "dayjs";
import Pagination from "@/components/Pagination.vue";

let transactionModal = null;
let deletePropertyModal = null;
const properties = ref([]);
const pthumbnails = ref({});
const selectedPnumber = ref(0); // 모달에 보내는 pnumber
const pstatus = ref("");
const isActive = ref(true); // true : 활성화, false : 비활성화 상태
const currentPage = ref(0);
const pager = ref({});
const filterKeyword = ref("desc"); //필터 키워드

//필터값 바뀌면 실행
function selectedFilter() {
  getUserPropertyList(1, filterKeyword.value);
}

const handlePageChange = (page) => {
  currentPage.value = page;
  getUserPropertyList(page);
};

//유저 매물 리스트 목록을 가져오는 메소드 정의
async function getUserPropertyList(pageNo = 1, filterKeyword) {
  try {
    const response = await propertyAPI.getUserPropertyList(pageNo, filterKeyword);
    properties.value = response.data.userPropertyList;
   
    properties.value.forEach((property) => {
      if (property.pthumbnailoname != null) {
        getPthumbnail(property.pnumber);
      }
      property.formattedDate = dayjs(property.pdate).format("YYYY-MM-DD");
    });
    pager.value = response.data.pager;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  transactionModal = new Modal(document.querySelector("#TransactionModal"));
  deletePropertyModal = new Modal(
    document.querySelector("#DeletePropertyModal")
  );
});

// 활성화 비활성화 버튼 클릭 시 실행
// function toggleActive(pnumber) {
//   isActive.value = !isActive.value;
//   if(isActive.value) {
//     pstatus.value = "활성화";
//   } else {
//     pstatus.value = "비활성화";
//   }
//   selectedPnumber.value = pnumber;
//   changePropertyStatus();
// }

function changeStatusActive(pnumber) {
  selectedPnumber.value = pnumber;
  pstatus.value = "활성화";
  changePropertyStatus();
}

function changeStatusInactive(pnumber) {
  selectedPnumber.value = pnumber;
  pstatus.value = "비활성화";
  changePropertyStatus();
}

// 거래완료 모달 열기
function showTransactionModal(pnumber) {
  selectedPnumber.value = pnumber;
  pstatus.value = "거래완료";
  transactionModal.show();
}

// 거래완료 모달 닫기
function hideTransactionModal() {
  // 거래 완료 확인 모달에서 거래 완료 버튼 클릭 시 실행되는 함수
  transactionModal.hide();
}

// 삭제 모달
function showDeletePropertyModal(pnumber) {
  selectedPnumber.value = pnumber;
  deletePropertyModal.show();
}

function hideDeletePropertyModal() {
  deletePropertyModal.hide();
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
  getUserPropertyList();
});

const deleteProperty = async () => {
  try {
    await propertyAPI.deleteProperty(selectedPnumber.value);
    await getUserPropertyList(); // 삭제 후 리스트 갱신
  } catch (error) {
    console.log(error);
  }
};

const changePropertyStatus = async () => {
  try {
    console.log(
      "pstatus + pnumber in index : " + selectedPnumber.value + pstatus.value
    );
    await propertyAPI.updatePropertyStatus(
      selectedPnumber.value,
      pstatus.value
    );
    await getUserPropertyList(); // 수정 후 리스트 갱신
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.soldOutBtn {
  background-color: #2f4858;
  color: #fff;
}
.titleNcontent {
  width: 80%;
  padding: 20px;
}
.buttons-height{
  height: 189px;
  width: 150px;
}
.routerLink {
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 기본 텍스트 색상 상속 */
  background: none; /* 배경 제거 */
  border: none; /* 테두리 제거 */
  cursor: pointer; /* 커서 스타일 설정 */
}
.img-tablepart{
  width: 200px;
  height: 189px;
}
.th-width{
  width: 90px;
}
</style>
