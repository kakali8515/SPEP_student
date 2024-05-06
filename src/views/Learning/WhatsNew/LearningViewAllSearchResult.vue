<template>
  <section class="home-sec learning-new-wrap">
    <div class="page-cnt-wrap">
      <div class="container">
        <div class="row">
          <div class="web100">
            <div class="main-home inner-page-wrap">
              <div class="search-wrap">
                <div class="drop-area">
                  <select class="pointer" v-model="catId" @change="changeCategory($event)">
                    <option value="">All</option>
                    <option :value="item.nc_seq" v-for="(item, index) in newsCategoryList" :key="index">
                      {{ item.category_name }}
                    </option>
                  </select>
                  <!-- <img src="@/assets/icons/down-arrow.svg" /> -->
                </div>
                <div class="search-area">
                  <input type="text" placeholder="찾으시는 검색어를 입력하세요" v-model="search" />
                  <button @click="getWhatsNewListByCat">
                    <img src="@/assets/icons/search-black.svg" alt="" />
                  </button>
                </div>
              </div>
              <div class="subscribe-wrap view-no second-head">
                <div class="main-head">
                  <div class="left-head">
                    <h2>{{ headingData }}</h2>
                  </div>
                  <!-- <div class="right-head">
                    <button>
                      <img src="@/assets/icons/check.svg" alt="" />구독중
                    </button>
                  </div> -->
                </div>
                <!-- <div class="select-area" style="margin-left: auto; margin-top: 16px">
                      <select class="pointer" @change="changeLimit($event)">
                        <option :value="10">10</option>
                        <option :value="20">20</option>
                        <option :value="50">50</option>
                        <option :value="100">100개씩 보기</option>
                      </select>
                      <img src="@/assets/icons/solid-down.svg" />
                    </div> -->
              </div>
              <!-- <div class="subscribe-wrap view-no">
                <div class="select-area">
                  <select @change="changeLimit($event)">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100개씩 보기</option>
                  </select>
                  <img src="@/assets/icons/solid-down.svg" />
                </div>
              </div> -->
              <div class="main-cnt">
                <div class="img-cnt-wrap pointer" v-for="(item, i) in whatsNewTotal" :key="item.nc_seq"> 
                  <div class="learn-img">               
                    <img  @click="$router.push({ name: 'AudioPhoto', params: { id: item.news_seq } })"
                      v-if="item?.news_thumb?.thumbPath" :src="File_BASE_URL + item?.news_thumb?.thumbPath" alt="" />

                    <template v-else>
                      <img @click="$router.push({ name: 'AudioPhoto', params: { id: item.news_seq } })" v-if="item.imageIndex == 1"
                        src="@/assets/images/SPEP_EnglishReview_1.png" alt="" />
                        <img @click="$router.push({ name: 'AudioPhoto', params: { id: item.news_seq } })" v-else-if="item.imageIndex == 2"
                        src="@/assets/images/SPEP_EnglishReview_2.png" alt="" />
                        <img @click="$router.push({ name: 'AudioPhoto', params: { id: item.news_seq } })" v-else-if="item.imageIndex == 3"
                        src="@/assets/images/SPEP_EnglishReview_3.png" alt="" />
                        <img @click="$router.push({ name: 'AudioPhoto', params: { id: item.news_seq } })" v-else-if="item.imageIndex == 4"
                        src="@/assets/images/SPEP_EnglishReview_4.png" alt="" />
                        <img @click="$router.push({ name: 'AudioPhoto', params: { id: item.news_seq } })" v-else-if="item.imageIndex == 5"
                        src="@/assets/images/SPEP_EnglishReview_5.png" alt="" />
                        <img @click="$router.push({ name: 'AudioPhoto', params: { id: item.news_seq } })" v-else src="@/assets/images/no-image-available.jpg" alt="" />
                    </template>
                  </div> 
                  <div class="detail-wrap">
                    <div class="head-wrap">
                      <div class="point" :class="item.points ? 'read' : ''">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M6.43156 7.97723C6.14695 8.19008 4.32074 6.84082 3.97098 6.83786C3.62122 6.83492 1.77445 8.15314 1.49316 7.9355C1.21187 7.71787 1.87317 5.48252 1.76779 5.13336C1.6624 4.7842 -0.105768 3.35265 0.00499147 3.00531C0.115775 2.65796 2.35069 2.6257 2.6353 2.41285C2.91992 2.20002 3.67391 -0.002937 4.0237 2.93992e-06C4.37344 0.00296844 5.09337 2.21838 5.37466 2.43601C5.65595 2.65362 7.89011 2.72366 7.99552 3.07282C8.10091 3.42199 6.31094 4.82347 6.20015 5.17081C6.0894 5.51816 6.71618 7.76438 6.43156 7.97723Z"
                            fill="#ff7747" />
                        </svg>
                        <p>200</p>
                      </div>
                      <h2 @click="$router.push({ name: 'AudioPhoto', params: { id: item.news_seq } })">{{ item.title }}
                      </h2>
                      <button class="bookmark-btn" :class="item.hasBookmarked == 1 ? 'active' : ''"
                        @click="item.hasBookmarked == 1 ? deleteBookamrk(item) : addBookamrk(item)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <path
                            d="M21 24.125L13.9992 19.75L7 24.125V4.875C7 4.64294 7.09219 4.42038 7.25628 4.25628C7.42038 4.09219 7.64294 4 7.875 4H20.125C20.3571 4 20.5796 4.09219 20.7437 4.25628C20.9078 4.42038 21 4.64294 21 4.875V24.125Z"
                            stroke="#0C60C2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </button>
                    </div>
                    <div class="cnt-detail"
                      @click="$router.push({ name: 'AudioPhoto', params: { id: item.news_seq } })">
                      <p>{{ item.news_desc }} </p>
                    </div>
                    <div class="date">
                      <p>{{ moment(item.reg_date).format("YYYY.MM.DD") }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Pagination v-if="whatsNewTotal.length > 0" :currentPage="page" :records="totalRecord" :perPage="limit"
              @on-change-handler="changePage" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <LoaderVue :loading="isLoading" />
</template>
<script setup>
import { ref, onMounted, computed, callWithErrorHandling } from "vue";
import moment from "moment";
import { ActiveLearningPrep } from "@/services/ActiveLearningPrep/ActiveLearningPrep";
import { WhatsNew } from "@/services/Learning/WhatsNew.js";
import Pagination from "@/components/pagination/pagination.vue";
import { useRoute, useRouter } from "vue-router";
const activeLearningPrep = new ActiveLearningPrep();
const WhatsNewService = new WhatsNew();
const route = useRoute();
const router = useRouter();
const whatsNewTotal = ref([]);
const catId = ref(route.params.id ? route.params.id : "");
const page = ref(1);
const totalRecord = ref(0);
const limit = ref(10);
const search = ref("");
const headingData = ref(route.params.id ? "" : "All");
const newsCategoryList = ref([]);
const isLoading = ref(false);
const File_BASE_URL = import.meta.env.VITE_FILE_BASE__URL;
const imageIndex = ref(0);

const changeCategory = (event) => {
  headingData.value = event.target.selectedOptions[0].text;
  catId.value = event.target.value;
  getWhatsNewListByCat();
};
const changeLimit = (event) => {
  limit.value = event.target.value;
  getWhatsNewListByCat();
};
const onSearch = (value) => {
  console.log(value);
  search.value = value;
  getWhatsNewListByCat();
};
const changePage = (value) => {
  page.value = value;
  getWhatsNewListByCat();
};
const getWhatsNewListByCat = async () => {
  try {
    isLoading.value = true;
    const data = {
      page: page.value,
      limit: limit.value,
      category: catId.value,
      text: search.value,
    };
    const res = await activeLearningPrep.getWhatsNewListByCat(data);
    if (res.data.formattedNewsList) {
      isLoading.value = false;
      totalRecord.value = res.data.totalRows;
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
        console.log(item.contents);
        item.textData = item.contents.find((content) => {
          return content.type == "txt";
        });
        item['news_desc'] = item.textData?.contents;
        item.news_thumb = imageData ? JSON.parse(imageData.contents) : null;
        return item;
      });
      console.log(whatsNewTotal.value);
    } else {
      whatsNewTotal.value = [];
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
const getWhatsNewCategoryList = async () => {
  try {
    isLoading.value = true;
    const res = await activeLearningPrep.getWhatsNewCategoryList();
    if (res.data) {
      isLoading.value = false;
      newsCategoryList.value = res.data.newsCategoryList;
      let newsData = newsCategoryList.value.find((item) => {
        return item.nc_seq == catId.value;
      });
      headingData.value = newsData.category_name;
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
const addBookamrk = async (item) => {
  const data = {
    bookmark_type: "N",
    bookmark_type_seq: item.news_seq,
  }
  try {
    isLoading.value = true;
    const res = await WhatsNewService.bookmarkAdd(data);
    if (res.data) {
      item.hasBookmarked = 1;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
const deleteBookamrk = async (item) => {
  const data = {
    bookmark_type: "N",
    bookmark_type_seq: item.news_seq,
  }
  try {
    isLoading.value = true;
    const res = await WhatsNewService.bookmarkDelete(data);
    if (res.data) {
      item.hasBookmarked = 0;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
const getPic = (index) => {
  return new URL('../../../assets/images/SPEP_EnglishReview_' + index + '.png', import.meta.url);
}
onMounted(async () => {
  // await getWhatsNew();
  await getWhatsNewListByCat();
  await getWhatsNewCategoryList();
});
</script>
