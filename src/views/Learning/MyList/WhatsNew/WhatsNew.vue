<template>
  <div class="tab-body">
    <div class="main-home inner-page-wrap">
      <div class="card-wrap" v-if="newsListData.length > 0">
        <template v-for="(news, i) in newsListData" :key="i">
          
        <div class="what-new np" v-if="news.bookmarkList.length">
          <div class="second-head">
            <div class="main-head">
              <div class="left-head">
                <h2>{{ news.categoryName }}</h2>
                <!-- <div class="view-all">
                  <p>전체보기</p>
                  <img src="@/assets/icons/grey-caret-right.svg" />
                </div> -->
              </div>
              <div class="right-head" v-if="news.bookmarkList.length">
                <div class="view-all pointer"
                  @click="$router.push({ name: 'ViewAllSearchResult', params: { id: news.categoryId } })">
                  <img src="@/assets/icons/arrow-right-blk.svg" />
                </div>
              </div>
            </div>
          </div>
          <div class="scrollmobs"> 
            <div class="box-sec grid-5" v-if="news.bookmarkList.length">
              <WhatsNewCard :news="news.bookmarkList" />
            </div>
            
            <div class="box-sec grid-5" v-else>
              <div class="no-data">
                <NoDataFoundVue />
              </div>
            </div>
          </div>
          <!-- <div class="divider" style="width: 100%; height: 1px; background-color: #CCCCCC;"></div> -->
        </div>
      </template>
      </div>
      <div class="no-data" v-else>
        <NoDataFoundVue />
      </div>
    </div>
  </div>
  <LoaderVue :loading="loaderState" />
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { WhatsNew } from "@/services/Learning/WhatsNew.js";
import WhatsNewCard from "@/components/Learning/WhatsNew/WhatsNewCard.vue";
const WhatsNewService = new WhatsNew();
const loaderState = ref(false);
const newsListData = ref([]);

const getMylistWhatsNew = async () => {
  const data = {
    category: "",
  };
  try {
    loaderState.value = true;
    const res = await WhatsNewService.myListWhatsNew(data);
    if (res.data) {
      newsListData.value = res.data.resultArray;
      newsListData.value.forEach((news) => {
        news.bookmarkList.map((item) => {
          item.contents = JSON.parse(item.contents);
          let imageData = item.contents.find((content) => {
            return content.type == "img";
          });
          console.log(item.contents);
          item.textData = item.contents.find((content) => {
            return content.type == "txt";
          });
          item["news_desc"] = item.textData?.contents;
          item.news_thumb = imageData ? JSON.parse(imageData.contents) : null;
          return item;
        });
        //console.log(news.bookmarkList);
      });

      console.log(newsListData.value);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

onMounted(async () => {
  await getMylistWhatsNew();
});
</script>
<style lang="scss">
.card-wrap {
  gap: 60px;
  .what-new {
    margin-bottom: 0 !important;
    padding-bottom: 60px !important;
    border-bottom: 1px solid #cccccc;
  }
}
</style>
