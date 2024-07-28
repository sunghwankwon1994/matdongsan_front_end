<template>
    <div class="mt-5 container py-5">
        <h4 class="fw-bold text-light">인기 매물</h4>
        <div class="d-flex w-100">
            
                <div v-for="popularProperty in popularProperties" :key="popularProperty.pnumber" class="w-25 m-2">
                    <router-link :to="{ path: `/Property/${popularProperty.pnumber}` }" class="text-decoration-none text-dark">
                        <div>
                            <img v-if="pthumbnails[popularProperty.pnumber] != null" :src="pthumbnails[popularProperty.pnumber]" 
                                width="230" height="230"  alt="인기매물" class="rounded-1">
                        </div>
                        <div class="featuredlistInfo-box">
                            <p class="text-light featuredlist-title mb-2 mt-2"><b>
                                {{ popularProperty.pcategory }} {{ popularProperty.pdeposite }}만원
                                <span v-if="popularProperty.prentalfee"> / {{ popularProperty.prentalfee }}만원</span>
                            </b></p>
                            <p class="text-light featuredlist-info">
                                <span v-if="!(popularProperty.pfloortype === '옥탑방')">{{ popularProperty.pfloortype }} {{ popularProperty.pfloor }}층,</span>
                                <span v-if="(popularProperty.pfloortype === '옥탑방')">{{ popularProperty.pfloortype }},</span>
                                {{ popularProperty.psize }}m<sup>2</sup>, 관리비 
                                <span v-if="popularProperty.pmaintenance">{{ popularProperty.pmaintenance }}만원</span>
                                <span v-else>없음</span></p>
                            <p class="text-light featuredlist-info">{{ popularProperty.ptitle }}</p>
                        </div>
                    </router-link>
                </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import propertyAPI from "@/apis/propertyAPI";

const popularProperties = ref([]);
const pthumbnails = ref({});

// 인기 매물
async function getPopularPropertyList() {
    try {
        const response = await propertyAPI.getPopularPropertyList();
        popularProperties.value = response.data;
        popularProperties.value.forEach(popularProperty => {
            if(popularProperty.pthumbnailoname != null) {
                getPthumbnail(popularProperty.pnumber);
            }
        });
    } catch(error) {
        console.log(error);
    }
}

// 사진 출력
async function getPthumbnail(pnumber) {
    try {
        const response = await propertyAPI.propertyAttachDownload(pnumber);
        pthumbnails.value[pnumber] = URL.createObjectURL(response.data);
    } catch (error) {
        console.log(error);
    }
}

getPopularPropertyList();

</script>

<style scoped>
.featuredlistInfo-box {
    width: 230px;
}

p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0;
}

.featuredlist-info {
    font-size: 14px;
}

.featuredlist-title {
    font-size: 18px;
}


</style>
