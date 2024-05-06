<template>
    <div class="what-new">
        <div class="head-sec">
            <div class="main-head">
                <h2>What’s New</h2>
                <img class="pointer" src="@/assets/icons/caretright.svg" @click="$router.push({ name: 'WhatsNew' })" />
            </div>
            <!-- <p>What’s New !에 대한 설명이 들어갑니다.</p> -->
        </div>
        <div class="ovrescroll">
            <div class="box-sec">
                <div @click="$router.push({ name: 'AudioPhoto', params: { id: item.news_seq } })" class="inner-box pointer"
                    v-for="(item, i) in whatsNewTotal" :key="item.nc_seq">
                    <div class="imgBox">
                        <img v-if="item?.news_thumb?.thumbPath" class="item-image"
                            :src="File_BASE_URL + item?.news_thumb?.thumbPath" alt="" />
                        <template v-else>
                            <img v-if="i == 0" class="item-image" src="@/assets/images/SPEP_EnglishReview_1.png" alt="" />
                            <img v-else-if="i == 1" class="item-image" src="@/assets/images/SPEP_EnglishReview_2.png" alt="" />
                            <img v-else-if="i == 2" class="item-image" src="@/assets/images/SPEP_EnglishReview_3.png" alt="" />
                            <img v-else-if="i == 3" class="item-image" src="@/assets/images/SPEP_EnglishReview_4.png" alt="" />
                            <img v-else-if="i == 4" class="item-image" src="@/assets/images/SPEP_EnglishReview_5.png" alt="" />
                            <img v-else class="item-image" src="@/assets/images/no-image-available.jpg" alt="" />
                        </template>
                    </div>
                    <div class="box-details">
                        <div class="title-sec">
                            <div class="rating" :class="item.points ? 'read' : ''">
                                <svg width="14" height="10" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.43156 7.97723C6.14695 8.19008 4.32074 6.84082 3.97098 6.83786C3.62122 6.83492 1.77445 8.15314 1.49316 7.9355C1.21187 7.71787 1.87317 5.48252 1.76779 5.13336C1.6624 4.7842 -0.105768 3.35265 0.00499147 3.00531C0.115775 2.65796 2.35069 2.6257 2.6353 2.41285C2.91992 2.20002 3.67391 -0.002937 4.0237 2.93992e-06C4.37344 0.00296844 5.09337 2.21838 5.37466 2.43601C5.65595 2.65362 7.89011 2.72366 7.99552 3.07282C8.10091 3.42199 6.31094 4.82347 6.20015 5.17081C6.0894 5.51816 6.71618 7.76438 6.43156 7.97723Z"
                                        fill="white" />
                                </svg>
                                <p>200</p>
                            </div>
                            <h2>{{ item.category_name }}</h2>
                        </div>
                        <h2>{{ item.title }}</h2>                        
                        <p>
                            {{
                        item.news_desc
                            ? item.news_desc.length > 100
                                ? item.news_desc.substring(0, 100) + "..."
                                : item.news_desc.substring(0, 100)
                            : ""
                    }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { ActiveLearningPrep } from "@/services/ActiveLearningPrep/ActiveLearningPrep";
const activeLearningPrep = new ActiveLearningPrep();
const imageIndex = ref(0);
const File_BASE_URL = import.meta.env.VITE_FILE_BASE__URL;
const whatsNewTotal = ref([]);
const isLoading = ref(false);

const getPic = (index) => {
    return new URL('../../../assets/images/SPEP_EnglishReview_' + index + '.png', import.meta.url);
};

const getWhatsNewListByCat = async () => {
    try {
        isLoading.value = true;
        const data = {
            page: 1,
            limit: 5,
            category: "",
            text: "",
        };
        const res = await activeLearningPrep.getWhatsNewListByCat(data);
        if (res.data.formattedNewsList) {
            isLoading.value = false;

            whatsNewTotal.value = res.data.formattedNewsList;
            whatsNewTotal.value = whatsNewTotal.value.map((item) => {
                if (imageIndex.value == 5) {
                    imageIndex.value = 0;
                }
                item.imageIndex = imageIndex.value + 1;
                imageIndex.value++;
                item.contents = JSON.parse(item.contents);
                let imageData = item.contents.find((content) => {
                    return content.type == "img";
                });
                item.textData = item.contents.find((content) => {
                    return content.type == "txt";
                });
                item["news_desc"] = item.textData?.contents;
                item.news_thumb = imageData ? JSON.parse(imageData.contents) : null;
                return item;
            });
        } else {
            whatsNewTotal.value = [];
        }
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(async () => {
    await getWhatsNewListByCat();
});
</script>