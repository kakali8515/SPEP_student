<template>
  <div class="activity-body">
    <div class="container">
      <div class="row">
        <div class="web100">
          <div class="tab-type-one">
            <TabWrapper disabledTab="타이틀 미정">
              <Tabs title="공지사항">
                <div class="search-section">
                  <div class="search-box">
                    <!-- 찾으시는 검색어를 입력하세요 -->
                    <input v-model="search_text" type="text" placeholder="검색어를 입력하세요." />
                    <button @click="onNoticeBoard">
                      <img src="@/assets/icons/search-glass-icon-black.svg" alt="" />
                    </button>
                  </div>
                </div>
                <div class="notice-wrapper" v-if="notice.length > 0">
                  <div v-for="(item, index) in notice " :key=index class="each-notice">
                    <div class="left pointer"
                      @click="$router.push({ name: 'NoticeBoardDetails', params: { id: item.notice_seq } })">
                      <img v-if="item?.notice_thumb" :src="item.notice_thumb" alt="" class="notice-img" />
                      <img v-else src="@/assets/icons/photograph.svg" alt="" class="notice-img" />
                      <!-- <span class="sl-no">15</span> -->
                      <div class="notice-info">
                        <h5 class="notice-title">
                          {{ item.title }}
                        </h5>
                        <div class="date-time">
                          <span>{{ moment(item.date).format('YYYY.MM.DD') }}</span>
                          <span>{{ moment(item.date).format('mm:ss') }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <NoDataFoundVue />
                </div>
                <Pagination v-if="notice.length > 0" :currentPage="page" :records="totalRecord" :perPage="limit"
                  @on-change-handler="changePage" />
              </Tabs>
              <Tabs title="타이틀 미정"> </Tabs>
            </TabWrapper>
          </div>
        </div>
      </div>
    </div>
  </div>
  <LoaderVue :loading="loaderState" />
</template>

<script setup>
import TabWrapper from "@/components/tab/TabWrapper.vue";
import Tabs from "@/components/tab/Tabs.vue";
import Pagination from "@/components/pagination/pagination.vue";
import { onMounted, ref } from "vue"
import { NoticeBoardDetails } from "@/services/NoticeBoard/NoticeBoardDetails.js";
import moment from 'moment'
import { useUserData } from "@/stores/useUserData";
const store = useUserData();
const NoticeBoardDetailsService = new NoticeBoardDetails();
const notice = ref([]);
const loaderState = ref(false);
const page = ref(1);
const limit = ref(10);
const totalRecord = ref(0);
const search_text = ref("");
const File_BASE_URL = import.meta.env.VITE_FILE_BASE__URL;
const img_url = 'https://exi.spep.co.kr';

const changePage = (value) => {
  page.value = value;
  onNoticeBoard();
};


const onNoticeBoard = async () => {
  loaderState.value = true;
  let obj = {
    page: page.value,
    limit: limit.value,
    // user_id: store.getUserData.user_id,
    show_target: 2,
    // title: "kjk"
  }
  if (search_text.value) {
    obj.title = search_text.value;
  }
  try {
    const res = await NoticeBoardDetailsService.getNoticeBoard(obj);
    if (res.data.success) {
      notice.value = res.data.notices;
      totalRecord.value = res.data.totalRows;
      //console.log(notice.value, "notice.value")
      notice.value.map((item) => {
        let tempElement = document.createElement('div');
        tempElement.innerHTML = item.image;
        let imgSrc = tempElement?.querySelector('img')?.getAttribute('src');
        let newSrc = img_url + imgSrc;
        item.notice_thumb = imgSrc ? newSrc : null;
        return item;
      });

    } else {
      notice.value = [];
    }
  } catch (error) {
    console.error(error)
  } finally {
    loaderState.value = false;
  }
}

onMounted(async () => {
  // loaderState.value = true;
  // await store.getUserDetails();
  await onNoticeBoard();
});
</script>

<style lang="scss" scoped></style>