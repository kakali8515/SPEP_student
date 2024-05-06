<template>
  <div class="activity-body">
    <div class="activity-container">
      <article class="course-card mb-30">
        <div class="about-course">
          <div class="course-info">
            <p class="course-name">[{{ course.lecture_name }}], {{ course.unit_title }}</p>
            <h6 class="course-title">{{ itemData.title }}</h6>
            <p class="publish-date">{{ moment(itemData.reg_date).format('YYYY. MM. DD') }}</p>
          </div>
          <div class="bookmark">
            <button @click="addBookamrk" class="bookmark-btn active">
              <img src="@/assets/icons/bookmark.svg" alt="">
            </button>
          </div>
        </div>
      </article>
      <article class="course-card">
        <div class="course-audio-image" v-if="itemData?.media_contents?.files[0].m_type == 'sound'">
          <div class="audio-img-area">
            <img @error="getImage" :src="activityURL + itemData?.media_contents?.files[0].thumb" alt="" />
            <!-- <img v-else src="@/assets/images/no-image-available.jpg" alt="" /> -->
          </div>
          <!-- <NormalAudioPlayer :audio-url="`https://exi.spep.co.kr/files/listening/Ex_i31_u1_lesson1_dialogue.mp3`"
            :id="`feedback-player-${itemData.listening_seq}`" :getTimeDuration="true"
            @audioTimeUpdate="audioPlayBarTimeUpdate" @audioEnded="audioPlayEnded" @audioPlayed="handlePlayVideo" /> -->
          <NormalAudioPlayer :audio-url="`${activityURL}${itemData?.media_contents?.files[0].file}`"
            :id="`feedback-player-${itemData.listening_seq}`" :getTimeDuration="true"
            @audioTimeUpdate="audioPlayBarTimeUpdate" @audioEnded="audioPlayEnded" @audioPlayed="handlePlayVideo" />
        </div>
        <div class="course-video" v-else>
          <video controls @timeupdate="videoPlayBarTimeUpdate" @ended="audioPlayEnded" @play="handlePlayVideo"
            ref="videoRef">
            <source :src="activityURL + itemData?.media_contents?.files[0].file" type="video/webm" />
          </video>
        </div>
        <div class="video-caption">
          <div class="lang-btns">
            <button :class="buttonAllclick ? 'selected' : ''" @click="getAllText">All</button>
            <button :class="buttonEnclick ? 'selected' : ''" @click="getEnglishText">A</button>
            <button :class="buttonKoclick ? 'selected' : ''" @click="getKoreanText">가</button>
          </div>
          <p class="en">{{ itemData.s_title }}</p>
          <div class="subtitle-wrapper">
            <ul v-if="itemData?.subtitle?.length">
              <li :class="text.highlighted ? 'highlighted' : ''" v-for="text in itemData?.subtitle" :key="text">
                <p class="en" v-if="text.text_en_visible">{{ text.txt_en }}</p>
                <p class="ko" v-if="text.text_kr_visible">{{ text.txt_kr }}</p>
              </li>
            </ul>
            <div v-else>
              <NoDataFoundVue />
            </div>
          </div>
        </div>
        <PaginationComponent v-if="subtitleListData?.length > 0" :currentPage="page" :records="totalRecord"
          :perPage="limit" @on-change-handler="changePage" />
      </article>
    </div>
  </div>
  <LoaderVue :loading="loaderState" />
</template>

<script setup>
import PaginationComponent from "@/components/pagination/pagination.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Shadowing } from "@/services/Activity/Shadowing/Shadowing.js";
import { WhatsNew } from "@/services/Learning/WhatsNew.js";
import { Feedback } from "@/services/Class/Feedback.js";
import { ref, onMounted, watch } from 'vue';
import noImage from "@/assets/images/no-image-available.jpg";
import moment from "moment";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

//const modules = [Navigation, Autoplay, Pagination];
const ShadowingService = new Shadowing();
const FeedbackService = new Feedback();
const WhatsNewService = new WhatsNew();
const loaderState = ref(false);
const subtitleData = ref([]);
const subtitleListData = ref([]);
const itemData = ref([]);
const page = ref(1);
const limit = ref(1);
const totalRecord = ref(0);
const activityURL = ref('https://exi.spep.co.kr/files/package/listening/');
const buttonEnclick = ref(false);
const buttonKoclick = ref(false);
const course = ref({});
const scheduleSeq = ref(route.params.schedule_seq ? route.params.schedule_seq : "");
const listening_seq = ref([]);
const videoRef = ref(null);
const buttonAllclick= ref(true);

// const onSwiper = (swiper) => {
//   console.log(swiper);
// };
// const onSlideChange = () => {
//   console.log("slide change");
// };

const getImage = (e) => {
  e.target.src = noImage;
}

const videoPlayBarTimeUpdate = () => {
  audioPlayBarTimeUpdate(videoRef.value.currentTime)
}

const handlePlayVideo = () => {
  itemData.value.subtitle[0].highlighted = true;
}

const audioPlayEnded = () => {
  if (totalRecord.value == page.value) {
    setTimeout(() => {
      submitActivity();
      router.push({ name: 'Complete', params: { schedule_seq: scheduleSeq.value, module_name: 'Listening' } });
    }, 5000);
  }
}

const audioPlayBarTimeUpdate = (seconds) => {
  let milliseconds = seconds * 1000;
  let index = itemData.value.subtitle.findIndex(entry => entry.millisecond >= milliseconds);
  console.log(index);
  if (index !== -1) {
    itemData.value.subtitle[index].highlighted = true;
  } else {
  }
} 

const getAllText = () => {
  buttonAllclick.value = true;
  buttonEnclick.value = false;
  buttonKoclick.value = false;
  itemData.value.subtitle.map((item) => {
    item.text_en_visible = true;
    item.text_kr_visible = true;
    return item;
  });
}


const getEnglishText = () => {
  buttonEnclick.value = true;
  buttonKoclick.value = false;
  buttonAllclick.value = false;
  itemData.value.subtitle.map((item) => {
    item.text_en_visible = true;
    item.text_kr_visible = false;
    return item;
  });
}

const getKoreanText = () => {
  buttonEnclick.value = false;
  buttonKoclick.value = true;
  buttonAllclick.value = false;
  itemData.value.subtitle.map((item) => {
    item.text_en_visible = false;
    item.text_kr_visible = true;
    return item;
  });
}

const changePage = (value) => {
  page.value = value;
  buttonEnclick.value = false;
  buttonKoclick.value = false;
  itemData.value = subtitleListData.value[value - 1];
  const txtEnArray = itemData.value.subtitle.map(item => item.txt_en);
  if (txtEnArray.length) {
    autoTranslate(txtEnArray)
  }

  itemData.value.subtitle.map((item) => {
    item.text_en_visible = true;
    item.text_kr_visible = true;
    return item;
  });
};


const submitActivity = async () => {
  const data = {
    "module": {
      "module_type": 'Listening',
      "unit_seq": scheduleSeq.value,
      "status": {
        "seq": listening_seq.value
      },
      "count": totalRecord.value,
    }
  }
  console.log(data)
  //return
  try {
    const res = await ShadowingService.submitActivityData(data);
    if (res.data) {

    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
}

const addBookamrk = async () => {
  const data = {
    bookmark_type: "AL",
    bookmark_type_seq: itemData.value.listening_seq,
  }
  try {
    loaderState.value = true;
    const res = await WhatsNewService.bookmarkAdd(data);
    if (res.data) {
      //itemData.value.hasBookmarks = 1;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
}

const deleteBookamrk = async () => {
  const data = {
    bookmark_type: "AL",
    bookmark_type_seq: itemData.value.listening_seq,
  }
  try {
    loaderState.value = true;
    const res = await WhatsNewService.bookmarkDelete(data);
    if (res.data) {
      //itemData.value.hasBookmarks = 0;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
}

const autoTranslate = async (txtEnArray) => {
  const data = {
    originalTexts: txtEnArray,
    target: 'ko'
  }
  try {
    loaderState.value = true;
    const res = await FeedbackService.autoTranslate(data);
    if (res.data) {
      res.data.translations.map((item, i) => {
        itemData.value.subtitle[i].txt_kr = item;
        return item;
      });
    }
  } catch (error) {
    console.log(error);
    loaderState.value = false;
  } finally {
    loaderState.value = false;
  }
};

const getActivityData = async () => {
  try {
    loaderState.value = true;
    const res = await ShadowingService.getActivityData(scheduleSeq.value);
    if (res && res.data && res.data.data) {
      course.value = res.data.course;
      subtitleData.value = res.data.data.filter(item => item.module === "Listening" && item.target === "Listening");
      subtitleListData.value = subtitleData.value[0].items;
      itemData.value = subtitleListData.value[0];
      totalRecord.value = subtitleListData.value.length;
      const txtEnArray = itemData.value.subtitle.map(item => item.txt_en);
      listening_seq.value = subtitleListData.value.map(item => item.listening_seq);
      if (txtEnArray.length) {
        autoTranslate(txtEnArray)
      }

      itemData.value.subtitle.map((item) => {
        item.text_en_visible = true;
        item.text_kr_visible = true;
        return item;
      });
    }

    console.log(itemData.value.subtitle)

  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

onMounted(async () => {
  loaderState.value = true;
  await getActivityData();
});

</script>

<style></style>
