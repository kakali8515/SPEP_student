<template>
  <section class="home-sec">
    <div class="page-cnt-wrap">
      <div class="container">
        <div class="row">

          <div class="lts-wrap">
            <div class="main-home inner-page-wrap">
              <!-- ========= FOCUS & FEEDBACK =========== -->
              <div class="training-sec">
                <div class="inner-page-head">
                  <div class="head-sec">
                    <div class="main-head">
                      <h2>맞춤 교육 설정</h2>
                      <!-- <img src="@/assets/icons/caretright.svg" /> -->
                    </div>
                    <!-- <p>
                      맞춤 교육 설정을 완료하시고 나만의 맞춤 Global
                      Competency를 효율적으로 향상하세요!
                    </p> -->
                  </div>
                </div>
                <div class="btn-img-wrap">
                  <div class="btn-sec ">
                    <div :class="['btn-area', question.is_answered ? 'selected' : '']"
                      v-for="question in customizationData" :key="question">
                      <button @click="getAnserList(question)">
                        {{ question.main_category_title_kr }}<img v-if="question.is_answered"
                          src="@/assets/icons/blue-check.svg" alt="" />
                        <img v-else src="@/assets/icons/chevron-right-blue.svg" alt="" />
                      </button>
                    </div>
                  </div>
                  <!-- <div class="img-sec">
                    <img src="@/assets/icons/grey-img.svg" alt="" />
                  </div> -->
                </div>
              </div>

              <div class="divider"></div>
              <!-- ========= MY PERFORMANCE =========== -->
              <div class="performance-sec">
                <div class="inner-page-head">
                  <div class="head-sec">
                    <div class="main-head">
                      <h2>Global Core Compretencies 비교</h2>
                      <!-- <img src="@/assets/icons/caretright.svg" /> -->
                    </div>
                    <!-- <p>Grammar Accuracy 에 대한 설명이 들어갑니다.</p> -->
                  </div>
                </div>
                <div class="full-slider-area">
                  <div class="bullet-sec">
                    <div class="bullet-area">
                      <img src="@/assets/icons/small-blue-bullet.svg" />
                      <p>My Performance</p>
                    </div>
                    <div class="bullet-area">
                      <img src="@/assets/icons/sky-bullet.svg" />
                      <p>Average</p>
                    </div>
                  </div>
                  <swiper :modules="modules" :slides-per-view="1" :space-between="10" :pagination="{ clickable: true }"
                     @swiper="onSwiper" @slideChange="onSlideChange">
                    <swiper-slide>
                      <div class="slide-area">
                        <div class="left-area">
                          <img src="@/assets/icons/performance.svg" alt="" />
                        </div>
                        <div class="right-area">
                          <div class="head-wrap">
                            <img src="@/assets/icons/chat-bubble.svg" alt="" />
                            <h2>Preliminary Recommendations</h2>
                          </div>
                          <div class="para-sec">
                            <p>각 교육생이 Focus 해야하는 Preliminary Recommendations에 대한 설명이 보여집니다.
                              Lorem ipsum dolor sit amet consectetur. Tortor laoreet morbi fringilla scelerisque turpis
                              in blandit. Eleifend tortor ac et pharetra integer augue amet mauris. Quis vulputate
                              faucibus egestas nunc suspendisse tortor. Parturient condimentum ac senectus ut
                              ullamcorper mauris. Urna id in nunc leo fermentum sit in at. Mauris egestas interdum
                              viverra sed nulla phasellus. Etiam tortor elit ut pellentesque sagittis et feugiat. Massa
                              risus id adipiscing porttitor nunc vitae odio amet sagittis. Mi at lacus in et praesent
                              diam nulla ridiculus. Sit massa dignissim euismod nulla quis aliquet. Imperdiet aenean
                              libero non facilisis. Tristique urna nunc venenatis a id euismod. Lorem ipsum dolor sit
                              amet consectetur. Tortor laoreet morbi fringilla scelerisque turpis in blandit. Eleifend
                              Lorem ipsum dolor sit amet consectetur. Tortor laoreet morbi fringilla scelerisque turpis
                              in Lorem ipsum dolor sit amet consectetur. Tortor laoreet morbi fringilla scelerisque
                              turpis in </p>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>

                    <swiper-slide>
                      <div class="slide-area">
                        <div class="left-area">
                          <img src="@/assets/icons/performance.svg" alt="" />
                        </div>
                        <div class="right-area">
                          <div class="head-wrap">
                            <img src="@/assets/icons/chat-bubble.svg" alt="" />
                            <h2>Preliminary Recommendations</h2>
                          </div>
                          <div class="para-sec">
                            <p>
                              An explanation of the Preliminary Recommendations
                              that each trainee should focus on is displayed.
                            </p>

                            <p>
                              Lorem ipsum dolor sit amet consectetur. Tortor
                              laoreet morbi fringilla scelerisque turpis in
                              blandit. Eleifend tortor ac et pharetra integer
                              augue amet mauris. Quis vulputate faucibus egestas
                              nunc suspendisse tortor. Parturient condimentum ac
                              senectus ut ullamcorper mauris. Urna id in nunc
                              leo fermentum sit in at. Mauris egestas interdum
                              viverra sed nulla phasellus. Etiam tortor elit ut
                              pellentesque sagittis et feugiat. Massa risus id
                              adipiscing porttitor nunc vitae odio amet
                              sagittis. Mi at lacus in et praesent diam nulla
                              ridiculus. Sit massa dignissim euismod nulla quis
                              aliquet. Imperdiet aenean libero non facilisis.
                              Tristique urna nunc venenatis a id euismod. Lorem
                              ipsum dolor sit amet consectetur. Tortor laoreet
                              morbi fringilla scelerisque turpis in blandit.
                              Eleifend Lorem ipsum dolor sit amet consectetur.
                              Tortor laoreet morbi fringilla scelerisque turpis
                              in Lorem ipsum dolor sit amet consectetur. Tortor
                              laoreet morbi fringilla scelerisque turpis in
                            </p>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>
                  </swiper>
                </div>
              </div>
              <div class="divider"></div>
              <!-- ========= CUSTOM SETTING =========== -->
              <div class="recommendation-sec">
                <!-- <div class="recommendation-data">

                  <div class="head-sec">
                    <div class="right-sec">
                      <div class="first-head">
                        <h3>강한별님을 위한 맞춤 추천입니다 !</h3>
                      </div>
                    </div>
                    <div class="left-sec pointer" @click="$router.push({ name: 'ALPSmart' });">
                      <img src="@/assets/icons/caretright.svg" />
                    </div>
                  </div>
                  <swiper :modules="modules" :slides-per-view="1" :space-between="30" :pagination="{ clickable: true }"
                    :autoplay="true" @swiper="onSwiper" @slideChange="onSlideChange">
                    <swiper-slide>
                      <div class="recc-body">
                        <div class="img-area" v-if="lectureImage">
                          <img :src="lectureImage" alt="" />
                        </div>

                        <div class="recc-detail">
                          <div class="detail-sec" v-if="recommendation_list.length > 0">
                            <div class="inner-sec" v-for="(item, index) in recommendation_list " :key=index>
                              <div class="inner-detail pointer" @click="getPersonalized(item)">
                                <h2>{{ item.unit_seq_title }}</h2>
                                <p>{{ item.unit_name }}</p>
                              </div>
                            </div>
                          </div>
                          <NoDataFoundVue v-else />
                        </div>
                      </div>
                    </swiper-slide>
                  </swiper>
                </div> -->
                <PersonalizedRecommendation />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <CustomTrainingSettingModal v-if="displayAnswerModal" v-model="displayAnswerModal" :questionItem="questionItem"
      @close="closeAnswerModal" @reloadCustomization="reloadCustomization" />

    <LoaderVue :loading="loaderState" />
  </section>
</template>
<script setup>
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { onMounted, ref, reactive } from "vue";
import { Customization } from "@/services/Customization/Customization.js";
import CustomTrainingSettingModal from "@/components/Learning/CustomTrainingSetting/LearningTrainingSettingsModal.vue";
//import ChangePersonalizedRecommendation from "@/components/Learning/CustomTrainingSetting/ChangePersonalizedRecommendation.vue";
import PersonalizedRecommendation from "@/components/Learning/CustomTrainingSetting/Recommendation.vue";
const modules = [Pagination, Autoplay];

const onSwiper = (swiper) => {
  //console.log(swiper);
};
const reloadCustomization = () => {
   getCustomizationData();
};

const CustomizationService = new Customization();
const loaderState = ref(false);
const customizationData = ref([]);
const displayAnswerModal = ref(false);
//const displayPersonalizedModal = ref(false);
const questionItem = ref({});
// const recommendation_list = ref([]);
// const lessonItem = ref({});
// const lectureImage = ref("");
// const isPastSessionModal = ref(false);


// get Customization details 
const getCustomizationData = async () => {
  try {
    loaderState.value = true;
    const res = await CustomizationService.getCustomizationDetails();
    if (res.data) {
      customizationData.value = res.data.question_answer_list.filter(item => item.exi_category_seq != 1);;
      customizationData.value.forEach((item) => {
        let data = res.data.previous_ans_list.find((f) => {
          return Object.keys(f)[0] == item.exi_category_seq;
        });
        if (data) {
          item['is_answered'] = true;
        } else {
          item['is_answered'] = false;
        }
      });
      //console.log(customizationData.value);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

// const getPersonalized = (data) => {
//   if (data.is_done == 1) {
//     isPastSessionModal.value = true;
//   } else {
//     lessonItem.value = data;
//     displayPersonalizedModal.value = true;
//   }
// };

// const closeLessonModal = () => {
//   displayPersonalizedModal.value = false;
//   getCustomizationData();
// };

const getAnserList = (question) => {
  questionItem.value = question;
  displayAnswerModal.value = true;
};

const closeAnswerModal = () => {
  displayAnswerModal.value = false;
  getCustomizationData();
};


onMounted(async () => {
  loaderState.value = true;
  await getCustomizationData();
});

</script>