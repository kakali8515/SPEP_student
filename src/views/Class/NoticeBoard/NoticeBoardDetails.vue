<template>
  <div class="activity-body">
    <div class="container">
      <div class="details-header">
        <div class="notice-status">
          <div class="grey-circle"><img v-if="Details.LOGO_FILENAME" :src="File_BASE_URL + Details.LOGO_FILENAME"
              alt="" /></div>
          <p class="notice-center">{{ Details.COMPANY_NAME_KR }}</p>
        </div>
        <h5 class="notice-title">{{ Details.TITLE }}</h5>
        <div class="date-time-view">
          <div class="date-time">
            <span>{{ moment(Details.REG_DATE).format('YYYY.MM.DD') }}</span>
            <span>{{ moment(Details.REG_DATE).format('mm:ss') }}</span>
          </div>
          <div class="view">
            <span>조회 수</span>
            <span>{{ Details.TOTAL_READ ? Details.TOTAL_READ : 0 }}</span>
          </div>
        </div>
      </div>
      <!-- <div class="notice-image-outter">
        <img v-if="Details.image" :src="File_BASE_URL + Details.image" alt="" />
        <img v-else src="@/assets/icons/photograph.svg" alt="" class="notice-img" />
      </div> -->
      <div class="notice-texts-wrapper" v-if="noticeContent" v-html="noticeContent">

      </div>
      <table class="custom-table mb-60">
        <tbody>
          <tr class="pointer" v-if="prevData?.TITLE" @click="goPrev(prevData.NOTICE_SEQ)">
            <td>이전글</td>
            <td class="title">{{ prevData.TITLE }}</td>
            <td>{{ moment(prevData.REG_DATE).format('YYYY.MM.DD') }}</td>
          </tr>
          <tr class="pointer" v-if="NextData?.TITLE" @click="goNext(NextData.NOTICE_SEQ)">
            <td>다음글</td>
            <td class="title">{{ NextData.TITLE }}</td>
            <td>{{ moment(NextData.REG_DATE).format('YYYY.MM.DD') }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="$router.push({ name: 'NoticeBoard' })" class="white-button">목록으로</button>
    </div>
  </div>
  <LoaderVue :loading="loaderState" />
</template>

<script setup>
import moment from 'moment';
import { onMounted, onUnmounted, ref } from "vue";
import { NoticeBoardDetails } from "@/services/NoticeBoard/NoticeBoardDetails.js";
import { useRoute, useRouter } from "vue-router";
const NoticeBoardDetailsService = new NoticeBoardDetails();
const route = useRoute();
const router = useRouter();
const File_BASE_URL = import.meta.env.VITE_FILE_BASE__URL;
const img_url = 'https://exi.spep.co.kr';

const Details = ref({});
const prevData = ref({});
const NextData = ref({});
const noticeContent = ref("");
const loaderState = ref(false);
const noticeId = ref(route.params.id ? route.params.id : "");

const goPrev = (id) => {
  noticeId.value = id;
  ongetNoticeBoardDetails();
  router.push({ name: 'NoticeBoardDetails', params: { id: id } })
};

const goNext = (id) => {
  noticeId.value = id;
  ongetNoticeBoardDetails();
  router.push({ name: 'NoticeBoardDetails', params: { id: id } })
};

const ongetNoticeBoardDetails = async () => {
  loaderState.value = true;
  const obj = {
    notice_id: noticeId.value
  }
  try {
    let response = await NoticeBoardDetailsService.getNoticeBoardDetails(obj);
    if (response.data.success) {
      Details.value = response.data.data;
      prevData.value = response.data.prevdata;
      NextData.value = response.data.nextdata;
      //console.log(Details.value.CONTENTS, "Details")
      if(response.data.data?.IS_READ == 0) {
        readNoticeBoard();
      }

      let tempElement = document.createElement('div');
      tempElement.innerHTML = Details.value.CONTENTS;
      let imgTags = tempElement.querySelectorAll('img');
      imgTags.forEach(function (img) {
        let src = img.getAttribute('src');
        let newSrc = img_url + src;
        img.setAttribute('src', newSrc);
      });
      noticeContent.value = tempElement.innerHTML;
    }
  } catch (error) {
    console.error(error);
  }
  finally {
    loaderState.value = false;
  }
}

const readNoticeBoard = async () => {
  const obj = {
    notice_id: noticeId.value
  }
  try {
    const res = await NoticeBoardDetailsService.readNoticeBoard(obj);
    if (res.data) {
      console.log(res.data)
      Details.TOTAL_READ = Details.TOTAL_READ + 1;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

onMounted(async () => {
  await ongetNoticeBoardDetails();
});
</script>


<style></style>