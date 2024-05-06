<template>
  <div class="activity-body">
    <div class="container">
      <div class="article-details">
        <div class="left">
          <!-- <div class="img-wrap">
            <img src="" alt="" />
          </div> -->
          <div class="name-date">
            <h4>{{ whatsNewDetails.title }}</h4>
            <p>{{ moment(whatsNewDetails.reg_date).format("YYYY.MM.DD") }}</p>
          </div>
        </div>
        <!-- <div class="bookmark">
          <button class="bookmark-btn" :class="whatsNewDetails.hasBookmarks == 1 ? 'active' : ''"
            @click="whatsNewDetails.hasBookmarks == 1 ? deleteBookamrk() : addBookamrk()">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M21 24.125L13.9992 19.75L7 24.125V4.875C7 4.64294 7.09219 4.42038 7.25628 4.25628C7.42038 4.09219 7.64294 4 7.875 4H20.125C20.3571 4 20.5796 4.09219 20.7437 4.25628C20.9078 4.42038 21 4.64294 21 4.875V24.125Z"
                stroke="#0C60C2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div> -->
      </div>
      <div class="audio-details-area">
        <h2>{{ whatsNewDetails.title }}</h2>
        <div class="prog-sec" v-if="whatsNewDetails.soundData">
          <NormalAudioPlayer
            :audio-url="whatsNewDetails.soundData ? `https://exi.spep.co.kr/files/${whatsNewDetails.soundData.files[0].file}` : ``"
            :id="`feedback-player-${whatsNewDetails.news_seq}`" :disabled="!whatsNewDetails.soundData" />
        </div>
        <div class="audio-text-slider">
          <swiper :cssMode="getIsMobileViewReady ? true : false" :mousewheel="getIsMobileViewReady ? true : false"
            :keyboard="getIsMobileViewReady ? true : false" :modules="modules" :slides-per-view="1"
            :pagination="{ clickable: true, enabled: getIsMobileViewReady ? false : true }" :speed="2000"
            class="mySwiper">
            <swiper-slide v-for="(item, i) in whatsNewDetails.newsData" :key="i">
              <div class="slider-img-wrap">
                <img v-if="item.type == 'img'" :src="File_BASE_URL + item.news_thumb?.thumbPath" alt="" />
                <p v-else v-html="formattedContent(item.contents)"></p>
              </div>
            </swiper-slide>
          </swiper>
        </div>

        <div class="like-booksmark">
          <button class="great" @click="addLike">
            <!-- <img src="@/assets/icons/ThumbsUp.svg" alt="" /> -->
            <svg width="25" height="25" viewBox="0 0 25 25" :fill="whatsNewDetails.hasLked == 1 ? '#0C60C2' : 'none'"
              xmlns="http://www.w3.org/2000/svg">
              <g id="ThumbsUp">
                <path id="Vector"
                  d="M3.5 10.25H8V20H3.5C3.30109 20 3.11032 19.921 2.96967 19.7803C2.82902 19.6397 2.75 19.4489 2.75 19.25V11C2.75 10.8011 2.82902 10.6103 2.96967 10.4697C3.11032 10.329 3.30109 10.25 3.5 10.25V10.25Z"
                  stroke="#0C60C2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path id="Vector_2"
                  d="M8 10.25L11.75 2.75C12.144 2.75 12.5341 2.8276 12.898 2.97836C13.262 3.12913 13.5927 3.3501 13.8713 3.62868C14.1499 3.90726 14.3709 4.23797 14.5216 4.60195C14.6724 4.96593 14.75 5.35603 14.75 5.75V8H20.5508C20.7635 8 20.9738 8.04523 21.1677 8.13269C21.3615 8.22016 21.5346 8.34785 21.6753 8.5073C21.8161 8.66675 21.9213 8.85431 21.9841 9.05753C22.0468 9.26076 22.0656 9.475 22.0392 9.68605L20.9142 18.6861C20.8689 19.0488 20.6926 19.3826 20.4185 19.6245C20.1444 19.8665 19.7914 20 19.4258 20H8"
                  stroke="#0C60C2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </g>
            </svg>
            <!-- 좋아요! -->
          </button>

          <div class="bookmark">
            <button class="bookmark-btn" :class="whatsNewDetails.hasBookmarks == 1 ? 'active' : ''"
              @click="whatsNewDetails.hasBookmarks == 1 ? deleteBookamrk() : addBookamrk()">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M21 24.125L13.9992 19.75L7 24.125V4.875C7 4.64294 7.09219 4.42038 7.25628 4.25628C7.42038 4.09219 7.64294 4 7.875 4H20.125C20.3571 4 20.5796 4.09219 20.7437 4.25628C20.9078 4.42038 21 4.64294 21 4.875V24.125Z"
                  stroke="#0C60C2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div class="divider"></div>
      </div>
      <!-- <button @click="$router.push({ name: 'WhatsNew' })" class="blue-square-btn"
        style="max-width: 290px; margin: 60px auto 0; display: block">
        목록으로
      </button> -->

    </div>
  </div>
  <LoaderVue :loading="isLoading" />
</template>
<script setup>
import { ref, onMounted, computed, callWithErrorHandling } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay, Pagination, Mousewheel, Keyboard } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { WhatsNew } from "@/services/Learning/WhatsNew.js";
import moment from "moment";

import { useUserData } from "@/stores/useUserData";
import { storeToRefs } from "pinia";
const { getIsMobileViewReady } = storeToRefs(useUserData());

const WhatsNewService = new WhatsNew();
const modules = [Navigation, Autoplay, Pagination, Mousewheel, Keyboard];
const route = useRoute();
const router = useRouter();

const File_BASE_URL = import.meta.env.VITE_FILE_BASE__URL;
const catId = ref(route.params.id ? route.params.id : "");
const isLoading = ref(false);
const whatsNewDetails = ref([]);

// const onSwiper = (swiper) => {
//   console.log(swiper);
// };
// const onSlideChange = () => {
//   console.log("slide change");
// };

const getWhatsNewDetails = async () => {
  try {
    isLoading.value = true;
    const data = {
      seq: catId.value,
    };
    const res = await WhatsNewService.getWhatsNewDetails(data);
    if (res.data.news) {
      isLoading.value = false;
      whatsNewDetails.value = res.data.news;
      whatsNewDetails.value.newsData = JSON.parse(whatsNewDetails.value.contents);
      whatsNewDetails.value.soundData = JSON.parse(whatsNewDetails.value.sound);
      whatsNewDetails.value.newsData.map((item) => {
        if (item.type == "img") {
          item.news_thumb = JSON.parse(item.contents);
        }
        return item;
      });
      //console.log(whatsNewDetails.value);
    } else {
      whatsNewDetails.value = [];
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const addBookamrk = async () => {
  const data = {
    bookmark_type: "N",
    bookmark_type_seq: whatsNewDetails.value.news_seq,
  }
  try {
    isLoading.value = true;
    const res = await WhatsNewService.bookmarkAdd(data);
    if (res.data) {
      whatsNewDetails.value.hasBookmarks = 1;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

const addLike = async () => {
  const data = {
    news_seq: whatsNewDetails.value.news_seq,
  }
  try {
    isLoading.value = true;
    const res = await WhatsNewService.newsLikeUnlike(data);
    if (res.data) {
      whatsNewDetails.value.hasLked = whatsNewDetails.value.hasLked == 1 ? 0 : 1;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

const deleteBookamrk = async () => {
  const data = {
    bookmark_type: "N",
    bookmark_type_seq: whatsNewDetails.value.news_seq,
  }
  try {
    isLoading.value = true;
    const res = await WhatsNewService.bookmarkDelete(data);
    if (res.data) {
      whatsNewDetails.value.hasBookmarks = 0;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

const pointUpdates = async () => {
  const data = {
    news_seq: whatsNewDetails.value.news_seq,
  }
  try {
    const res = await WhatsNewService.pointUpdates(data);
    if (res.data) {

    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

const formattedContent = (originalContent) => {
  return originalContent.replace(/\n/g, '<br>');
};

onMounted(async () => {
  await getWhatsNewDetails();
  await pointUpdates();
});
</script>
