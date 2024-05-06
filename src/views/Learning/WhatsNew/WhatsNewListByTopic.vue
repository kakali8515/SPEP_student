<template>
  <section class="home-sec whats-new">
    <div class="page-cnt-wrap">
      <div class="container-fluid">
        <div class="row row-wrap">
          <div class="col-lg-8 col-md-12 col-sm-12">
            <div class="main-home inner-page-wrap">
              <div class="card-wrap">
                <div class="search-wrap">
                  <div class="drop-area">
                    <select class="pointer" v-model="catId" @change="changeCategory($event)">
                      <option value="">All</option>
                      <option :value="item.nc_seq" v-for="(item, index) in newsCategoryList" :key="index">
                        {{ item.category_name }}
                      </option>
                    </select>
                    <img src="@/assets/icons/down-arrow.svg" />
                  </div>
                  <div class="search-area">
                    <input type="text" placeholder="찾으시는 검색어를 입력하세요" v-model="search" />
                    <button @click="getWhatsNewListByCat">
                      <img src="@/assets/icons/search-black.svg" alt="" />
                    </button>
                  </div>
                </div>
                <div class="what-new np">
                  <div class="second-head">
                    <div class="main-head">
                      <div class="left-head">
                        <h2>{{ headingData }}</h2>
                      </div>
                      <div class="right-head">
                        <button>
                          <img src="@/assets/icons/check.svg" alt="" />구독중
                        </button>
                      </div>
                    </div>
                    <div class="select-area" style="margin-left: auto; margin-top: 16px">
                      <select class="pointer" @change="changeLimit($event)">
                        <option :value="10">10</option>
                        <option :value="20">20</option>
                        <option :value="50">50</option>
                        <option :value="100">100개씩 보기</option>
                      </select>
                      <img src="@/assets/icons/solid-down.svg" />
                    </div>
                  </div>
                  <div class="box-sec" v-if="whatsNewTotal.length">
                    <WhatsNewCard :news="whatsNewTotal" />
                  </div>
                  <div class="box-sec" v-else>
                    <div class="no-data">
                      <p>저장된 데이터가 없습니다</p>
                    </div>
                  </div>
                  <!-- <div class="box-sec">
                    <div class="inner-box">
                      <img class="item-image" src="@/assets/images/box1.png" alt="" />
                      <div class="box-details">
                        <div class="title-sec">
                          <div class="rating">
                            <img src="@/assets/icons/star-white.svg" alt="" />
                            <p>200</p>
                          </div>
                          <h2>Quote of the day</h2>
                        </div>
                        <h2>Title Here Title Here Title Here</h2>
                        <p>
                          Description Here Description Here Description Here
                          Description Here
                        </p>
                      </div>
                    </div>
                    <div class="inner-box">
                      <img class="item-image" src="@/assets/images/box1.png" alt="" />
                      <div class="box-details">
                        <div class="title-sec">
                          <div class="rating">
                            <img src="@/assets/icons/star-white.svg" alt="" />
                            <p>200</p>
                          </div>
                          <h2>Quote of the day</h2>
                        </div>
                        <h2>Title Here Title Here Title Here</h2>
                        <p>
                          Description Here Description Here Description Here
                          Description Here
                        </p>
                      </div>
                    </div>
                    <div class="inner-box">
                      <img class="item-image" src="@/assets/images/box1.png" alt="" />
                      <div class="box-details">
                        <div class="title-sec">
                          <div class="rating">
                            <img src="@/assets/icons/star-white.svg" alt="" />
                            <p>200</p>
                          </div>
                          <h2>Quote of the day</h2>
                        </div>
                        <h2>Title Here Title Here Title Here</h2>
                        <p>
                          Description Here Description Here Description Here
                          Description Here
                        </p>
                      </div>
                    </div>
                    <div class="inner-box">
                      <img class="item-image" src="@/assets/images/box1.png" alt="" />
                      <div class="box-details">
                        <div class="title-sec">
                          <div class="rating">
                            <img src="@/assets/icons/star-white.svg" alt="" />
                            <p>200</p>
                          </div>
                          <h2>Quote of the day</h2>
                        </div>
                        <h2>Title Here Title Here Title Here</h2>
                        <p>
                          Description Here Description Here Description Here
                          Description Here
                        </p>
                      </div>
                    </div>
                    <div class="inner-box">
                      <img class="item-image" src="@/assets/images/box1.png" alt="" />
                      <div class="box-details">
                        <div class="title-sec">
                          <div class="rating">
                            <img src="@/assets/icons/star-white.svg" alt="" />
                            <p>200</p>
                          </div>
                          <h2>Quote of the day</h2>
                        </div>
                        <h2>Title Here Title Here Title Here</h2>
                        <p>
                          Description Here Description Here Description Here
                          Description Here
                        </p>
                      </div>
                    </div>
                    <div class="inner-box">
                      <img class="item-image" src="@/assets/images/box1.png" alt="" />
                      <div class="box-details">
                        <div class="title-sec">
                          <div class="rating">
                            <img src="@/assets/icons/star-white.svg" alt="" />
                            <p>200</p>
                          </div>
                          <h2>Quote of the day</h2>
                        </div>
                        <h2>Title Here Title Here Title Here</h2>
                        <p>
                          Description Here Description Here Description Here
                          Description Here
                        </p>
                      </div>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
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
import WhatsNewCard from "@/components/Learning/WhatsNew/WhatsNewCard.vue";
import { useRoute, useRouter } from "vue-router";
const activeLearningPrep = new ActiveLearningPrep();
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
      let newsData  = newsCategoryList.value.find((item) => {
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
onMounted(async () => {
  // await getWhatsNew();
  await getWhatsNewListByCat();
  await getWhatsNewCategoryList();
});
</script>
