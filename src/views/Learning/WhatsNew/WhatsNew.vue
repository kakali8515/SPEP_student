<template>
  <section class="home-sec whats-new">
    <div class="page-cnt-wrap">
      <div class="container">
        <div class="row">
          <div class="web100">
            <div class="main-home inner-page-wrap">
              <div class="head-wrap">
                <div class="quote-wrap">
                  <div class="first-wrap">
                    <h2>Quote of the Day</h2>
                   <!-- <button>
                      <span><img src="@/assets/icons/translate.svg" alt="" /></span>번역보기
                    </button> -->
                  </div>
                  <h2>
                    “{{ quoteOftheDay.title }}”
                  </h2>
                  <!-- <p>-</p> -->
                </div>
                <div class="highlight-wrap">
                  <div class="first-wrap">
                    <h2>Today’s Highlight</h2>
                    <button>
                      <img @click="deleteBookamrk" v-if="todaysHighlight.has_bookmarked == 1"
                        src="@/assets/icons/bookmark_fill.svg" alt="">
                      <img @click="addBookamrk" v-if="todaysHighlight.has_bookmarked == 0"
                        src="@/assets/icons/bookmark.svg" alt="" />
                    </button>
                  </div>
                  <div class="highlight-cnt pointer"
                    @click="$router.push({ name: 'AudioPhoto', params: { id: todaysHighlight.news_seq } })">
                    <div class="left-wrap">
                      <img v-if="todaysHighlightContent.thumbPath || todaysHighlight.highlight_thumb?.thumbPath" 
                        :src="File_BASE_URL + (todaysHighlightContent.thumbPath || todaysHighlight.highlight_thumb?.thumbPath)"
                        alt="" />
                      <img v-else src="@/assets/images/no-image-available.jpg" alt="" />
                    </div>
                    <div class="right-wrap">
                      <span>S.P.A Tips</span>
                      <div class="cnt-wrap">
                        <h2>{{ todaysHighlight.title }}</h2>
                        <p>{{ todaysHighlight.highlight_thumb?.highlight_desc }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="divider"></div>
              <div class="card-wrap">
                <div class="search-wrap">
                  <div class="drop-area">
                    <select class="pointer" @change="getFilterNewsList($event)">
                      <option value="">주제 선택</option>
                      <option :value="cat.nc_seq" v-for="cat in categoryList" :key="cat">{{ cat.category_name }}</option>
                    </select>
                    <!-- <img src="@/assets/icons/down-arrow.svg" /> -->
                  </div>
                  <div class="search-area">
                    <input v-model="search_text" type="text" placeholder="찾으시는 검색어를 입력하세요" />
                    <button @click="getNewsList">
                      <img src="@/assets/icons/search-black.svg" alt="" />
                    </button>
                  </div>
                </div>
                <template v-if="newsListData.length > 0">
                  
                  <div class="what-new mob-scroll" v-for="(news, i) in newsListData" :key="i">
                    <div class="second-head">
                      <div class="main-head">
                        <div class="left-head">
                          <h2>{{ news.category_name }}</h2>
                          <div class="view-all pointer"
                            @click="$router.push({ name: 'ViewAllSearchResult', params: { id: news.nc_seq } })">
                            <!-- <p>전체보기</p> -->
                            <img src="@/assets/icons/arrow-right-blk.svg" />
                          </div>
                        </div>
                        <!-- <div class="right-head">
                          <button>
                            <img src="@/assets/icons/check.svg" alt="" />구독중
                          </button>
                        </div> -->
                      </div>
                    </div>
                    <div class="scrollmobs">
                      <div class="box-sec" v-if="news.news.length">
                        <WhatsNewCard :news="news.news" />
                      </div>
                    
                      <div class="box-sec" v-else>
                        <div class="no-data">
                          <p>저장된 데이터가 없습니다</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <div class="no-data" v-if="newsListData.length == 0 && !loaderState">
                  <!-- <img src="@/assets/icons/WarningCircle.svg" alt="">
                  <p>저장된 데이터가 없습니다</p> -->
                  <p>No data</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <LoaderVue :loading="loaderState" />
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { WhatsNew } from "@/services/Learning/WhatsNew.js";
import { useRoute, useRouter } from "vue-router";
import WhatsNewCard from "@/components/Learning/WhatsNew/WhatsNewCard.vue";
const route = useRoute();
const router = useRouter();
const WhatsNewService = new WhatsNew();
const loaderState = ref(false);
const quoteOftheDay = ref("");
const todaysHighlight = ref({});
const newsListData = ref([]);
const categoryList = ref([]);
const category = ref("");
const search_text = ref("");
const todaysHighlightContent = ref("");
const File_BASE_URL = import.meta.env.VITE_FILE_BASE__URL;

const getQuoteOfTheDay = async () => {
  const data = {
    page: 1,
    limit: 1,
  }
  try {
    loaderState.value = true;
    const res = await WhatsNewService.getQuoteOfTheDay(data);
    if (res.data) {
      quoteOftheDay.value = res.data.newsList[0];
      // console.log(quoteOftheDay.value);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const getTodayshighLight = async () => {
  try {
    loaderState.value = true;
    const res = await WhatsNewService.getTodayshighLight();
    if (res.data) {
      todaysHighlight.value = res.data.news;
      const contenData = JSON.parse(todaysHighlight.value.contents);
      todaysHighlightContent.value = JSON.parse(contenData[0].contents);
      //console.log(contenData);

      contenData.forEach((item) => {
        if (item.type == 'txt') {
          todaysHighlight.value['highlight_desc'] = item.contents;
        } else if (item.type == 'img') {
          todaysHighlight.value['highlight_thumb'] = JSON.parse(item.contents);
        }
      })
      //console.log(todaysHighlight.value);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const getFilterNewsList = (event) => {
  if (event.target.value) {
    category.value = event.target.value;
  } else {
    category.value = "";
  }
  getNewsList();
}

const getNewsList = async () => {
  const data = {
    category: category.value,
    text: search_text.value,
  }
  try {
    loaderState.value = true;
    const res = await WhatsNewService.getNewsList(data);
    if (res.data.resultArray) {
      newsListData.value = res.data?.resultArray;
      newsListData.value.forEach((news) => {
        news.news.map((item) => {
          item.contents = JSON.parse(item.contents);
          let imageData = item.contents.find((content) => {
            return content.type == "img";
          });
          // console.log(item.contents);
          item.textData = item.contents.find((content) => {
            return content.type == "txt";
          });
          item['news_desc'] = item.textData?.contents;
          item.news_thumb = imageData ? JSON.parse(imageData.contents) : null;
          return item;
        });
        // console.log(news.news);
      })



      //console.log(newsListData.value);
    } else {
      newsListData.value = [];
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const getCategoryList = async () => {
  try {
    loaderState.value = true;
    const res = await WhatsNewService.categoryList();
    if (res.data) {
      categoryList.value = res.data.newsCategoryList;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const addBookamrk = async () => {
  const data = {
    bookmark_type: "N",
    bookmark_type_seq: todaysHighlight.value.news_seq,
  }
  try {
    loaderState.value = true;
    const res = await WhatsNewService.bookmarkAdd(data);
    if (res.data) {
      todaysHighlight.value.has_bookmarked = 1;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
}

const deleteBookamrk = async () => {
  const data = {
    bookmark_type: "N",
    bookmark_type_seq: todaysHighlight.value.news_seq,
  }
  try {
    loaderState.value = true;
    const res = await WhatsNewService.bookmarkDelete(data);
    if (res.data) {
      todaysHighlight.value.has_bookmarked = 0;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
}

onMounted(async () => {
  await getQuoteOfTheDay();
  await getTodayshighLight();
  await getNewsList();
  await getCategoryList();
});
</script>