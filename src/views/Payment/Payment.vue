<template>
  <div>
    <form @submit.prevent="submitPaymentData">
      <div class="text-center mt-5 w-50 container">
        <h3 style="font-weight: bold; margin-bottom: 30px">상품 서비스 구매</h3>

        <div class="row w-75 mb-5">
          <div class="col" @click="getProductPrice(5500, '1')">
            <div
              :class="{ 'option-box': true, selected: productPrice === 5500 }"
              class="me-2 h-auto"
              style="height: 200px"
            >
              <div style="margin-top: 90px">
                <img class="w-25" src="@/assets/home.png" alt="" />
              </div>
              <div class="mt-3 fw-bold mb-3">매물 등록권 X 1</div>
              <p class="mt-3 fw-bold h5">
                가격<br />
                5,500원
              </p>
            </div>
          </div>
          <div class="col" @click="getProductPrice(15500, '3')">
            <div
              :class="{ 'option-box': true, selected: productPrice === 15500 }"
              class="me-2 h-auto"
            >
              <div class="pt-5" style="margin-top: 40px">
                <img class="w-25" src="@/assets/home.png" alt="" />
                <img class="w-25" src="@/assets/home.png" alt="" />
                <img class="w-25" src="@/assets/home.png" alt="" />
              </div>
              <div class="mt-3 fw-bold mb-3">매물 등록권 X 3</div>
              <p class="mt-3 h5 fw-bold">
                가격<br />
                15,500원
              </p>
            </div>
          </div>
          <div class="col" @click="getProductPrice(25000, '5')">
            <div
              :class="{ 'option-box': true, selected: productPrice === 25000 }"
              class="me-2 h-auto"
            >
              <div class="h-50 mt-4 pt-4">
                <div class="">
                  <img class="w-25" src="@/assets/home.png" width="70" alt="" />
                  <img
                    class="w-25"
                    src="@/assets/home.png"
                    width="70"
                    alt=""
                  /><br />
                  <img class="w-25" src="@/assets/home.png" width="70" alt="" />
                  <img class="w-25" src="@/assets/home.png" width="70" alt="" />
                  <img class="w-25" src="@/assets/home.png" width="70" alt="" />
                </div>
                <div class="mt-3 fw-bold mb-3">매물 등록권 X 5</div>
                <p class="mt-3 fw-bold h5">
                  가격<br />
                  25,000원
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr class="border-2" />

        <div class="mt-5 section2 ms-5">
          <table class="table w-75 mb-5 table-borderless">
            <thead>
              <tr>
                <th scope="col">가격</th>
                <th></th>
                <th scope="col">할인</th>
                <th></th>
                <th scope="col">총 결제금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="w-25" scope="row">
                  {{ productPrice.toLocaleString() }}원
                </th>
                <th scope="row">-</th>
                <td class="text-danger fw-bold">0원</td>
                <td>=</td>
                <td class="fw-bold">{{ productPrice.toLocaleString() }}원</td>
              </tr>
            </tbody>
          </table>
          <div class="ms-5 me-5">
            <button
              class="btn btn-warning text-center me-4"
              style="height: 40px; width: 30%; font-weight: bold"
              type="submit"
            >
              결제하기
            </button>
            <RouterLink
              to="/"
              class="fw-bold btn text-center align-self-center"
              style="
                border: 2px solid grey;
                height: 40px;
                width: 30%;
                font-weight: bold;
              "
              >취소</RouterLink
            >
          </div>
        </div>
      </div>
    </form>

    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">알림</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">{{ modalMessage }}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";
import propertyAPI from "@/apis/propertyAPI";
const router = useRouter();
const productPrice = ref(0); //상품 가격
const product = ref(""); //상품
const hasPropertyListing = ref(0);
const modalMessage = ref("");
function getProductPrice(price, productName) {
  productPrice.value = price;
  product.value = productName;
}

function submitPaymentData() {
  if (productPrice.value == 0 || product.value == "") {
    const modal = new Modal(document.getElementById("productModal"));
    modalMessage.value = "상품을 선택해주세요.";
    modal.show();
  } else {
    console.log("올바른 데이터");
    // 결제 처리 로직
    //등록권 소유 유무 체크
    checkPropertyListing();
    if (!hasPropertyListing.value) {
      //등록권 없다면 계속 진행
      purchasePropertyListing();
      router.push("/Payment/PaymentResult/"+product.value);
    } else {
      const modal = new Modal(document.getElementById("productModal"));
      modalMessage.value = "등록권을 이미 소유 하고 있습니다.";
      modal.show();
    }
  }
}
//등록권 구매
async function purchasePropertyListing() {
  try {
    await propertyAPI.purchasePropertyListing(product.value);
  } catch (error) {
    console.log(error);
  }
}
//등록권 유무 확인
async function checkPropertyListing() {
  try {
    const response = await propertyAPI.checkPropertyListing();
    if (response.data > 0) {
      hasPropertyListing.value = true;
    } else {
      hasPropertyListing.value = false;
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.w-75 {
  margin-left: auto;
  margin-right: auto;
}
.option-box {
  cursor: pointer;
  border-radius: 20px;
}
.option-box {
  border: 2px solid black;
}
.selected {
  border: 2px solid #fec83f;
}
.option-box:hover {
  border: 2px solid #fec83f;
}

table * {
  font-size: 0.9rem;
}
</style>
