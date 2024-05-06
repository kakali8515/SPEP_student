<template>
  <section class="home-sec tbd-wrap">
    <div class="main-banner">
      <!-- ========= BANNER ========= row-wrap-->
      <section class="blue-banner">
        <div class="container ss">
          <div class="row">
            <div class="web100">
              <div class="head-sec mobile-head">
                <div class="mob-wrap">
                  <div class="head">
                    <h4>{{ userStore.getUserData?.username_kr }}<span>님 </span></h4>
                    <p>오늘도 즐거운 하루 되세요!</p>
                  </div>
                  <div class="pagination">
                    <ul class="page-area">
                      <li>
                        <img src="@/assets/icons/user.svg" />
                        <span>출석률</span>
                        <p>{{ courseItem.attendanceRate }}%</p>
                      </li>
                      <li>
                        <img src="@/assets/icons/book-open.svg" />
                        <div class="span-area">
                          <span>{{ courseItem.month }}월</span>
                          <span>학습률</span>
                        </div>
                        <p>{{ courseItem.learningRate }}%</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="tab-area">
                <div class="tab-header" v-if="!getIsMobileViewReady">
                  <ul>
                    <template v-for="tab in courseData">
                      <li @click="To(tab)">
                        <a href="javascript:void(0)" :class="{ active: currentTabId === tab.program2Id }">{{ tab.program2
                          }}</a>
                      </li>
                    </template>
                  </ul>
                </div>
                <template v-else>
                  <MobileTabSlider :tabList="courseData" @updateData="To" />
                </template>
                <div class="tab-body">
                  <div class="body-area">
                    <div class="head-sec web">
                      <div class="head">
                        <h4>{{ userStore.getUserData?.username_kr }}</h4>
                        <p>님 오늘도 즐거운 하루 되세요!</p>
                      </div>
                      <div class="pagination">
                        <ul class="page-area">
                          <li>
                            <img src="@/assets/icons/user.svg" />
                            <span>출석률</span>
                            <p>{{ courseItem.attendanceRate }}%</p>
                          </li>
                          <li>
                            <img src="@/assets/icons/book-open.svg" />
                            <div class="span-area">
                              <span>{{ courseItem.month }}월</span>
                              <span>학습률</span>
                            </div>
                            <p>{{ courseItem.learningRate }}%</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="card-wrap">
                      <div class="card-area active-card-area pointer"
                        v-if="boxMenu?.self_diagnosis_visibility?.is_visible == true"
                        @click="$router.push({ name: 'EnglishSpeakingAbility' })">
                        <p>Self-diagnosis!</p>
                        <div class="head-wrap">
                          <h4>레벨테스트</h4>
                          <div class="badge-area">
                            <h4>하러가기</h4>
                            <span>D-2</span>
                          </div>
                        </div>
                      </div>
                      <div class="card-area pointer" @click="
                      $router.push({
                        name: 'FeedBackDetails',
                        params: { scheduleId: boxMenu?.constant_feedback_write_visibility?.id, class_id: courseItem.class_seq },
                      })
                      " v-if="boxMenu?.constant_feedback_write_visibility?.is_visible == true">
                        <div class="card-head">
                          <p>New</p>
                          <div class="point-sec">
                            <img src="@/assets/icons/full-star.svg" alt="" />
                            <span>200</span>
                          </div>
                        </div>
                        <div class="head-wrap">
                          <h4>상시피드백</h4>
                          <h4>작성하기</h4>
                        </div>
                      </div>
                      <div class="card-area pointer" @click="
                      $router.push({
                        name: 'FeedBackDetails',
                        params: { scheduleId: boxMenu?.feedback_visibility?.id, class_id: courseItem.class_seq },
                      })
                      " v-if="boxMenu?.feedback_visibility?.is_visible == true">
                        <div class="card-head">
                          <p>New</p>
                          <div class="point-sec">
                            <img src="@/assets/icons/full-star.svg" alt="" />
                            <span>200</span>
                          </div>
                        </div>
                        <div class="head-wrap">
                          <h4>피드백</h4>
                          <h4>확인하기</h4>
                        </div>
                      </div>
                      <div class="card-area pointer"
                        @click="$router.push({ name: 'GeneralViewAllALP', params: { class_seq: courseItem.class_seq } })"
                        v-if="boxMenu?.alp_visibility?.is_visible == true">
                        <div class="card-head">
                          <p>New</p>
                          <div class="point-sec">
                            <img src="@/assets/icons/full-star.svg" alt="" />
                            <span>200</span>
                          </div>
                        </div>
                        <div class="head-wrap">
                          <h4>ALP로</h4>
                          <h4>예습하기</h4>
                        </div>
                      </div>
                      <div class="card-area pointer" v-if="boxMenu?.survey_visibility?.is_visible == true"
                        @click="$router.push({ name: 'ClassSurvey' })">
                        <p>New</p>
                        <div class="head-wrap">
                          <h4>TO DO</h4>
                          <div class="badge-area">
                            <h4>더 보러가기</h4>
                            <img src="@/assets/icons/card-arrow.svg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>


    <div class="page-cnt-wrap">
      <div class="container">
        <div class="row">
          <div class="web100">
            <div class="main-home inner-page-wrap">
              <!-- ========= FOCUS & FEEDBACK =========== -->
              <div class="feedback-sec">
                <div class="inner-page-head">
                  <div class="head-sec">
                    <div class="main-head">
                      <h2>Focus & My Feedback</h2>
                      <img class="pointer" @click="$router.push({ name: 'TopicBasedDiscussion' })"
                        src="@/assets/icons/caretright.svg" />
                    </div>
                    <!-- <p>What’s New !에 대한 설명이 들어갑니다.</p> -->
                  </div>
                </div>
                <div class="progress-box" v-if="focusList.length > 0">
                  <div class="bullet-sec">
                    <div class="bullet-area">
                      <span class="bullets"></span>
                      <p>Last Class</p>
                    </div>
                    <div class="bullet-area">
                      <span class="bullets greys"></span>
                      <p>Session Average</p>
                    </div>
                  </div>

                  <div class="progress-sec mypages">
                    <div class="progress-wrap">
                      <div class="full-progres-area" v-for="(focus, i) in focusList" :key="i">
                        <div class="progress-box-area">
                          <div class="box-head">
                            <div class="head-sec">
                              <h2>Focus {{ i + 1 }}.</h2>
                              <h4>{{ focus.focusTitle }}</h4>
                            </div>
                          </div>
                          <div class="progress-area">
                            <p>Keep it up</p>
                            <div class="bar-area">
                              <div class="btn-area light-blue"
                                :style="{ left: Math.round(focus.sessionAverage) + '%' }">
                                <p class="progress-txt-18"></p>
                              </div>

                              <div class="btn-area blue" :style="{ left: Math.round(focus.classScore) + '%' }">
                                <p class="progress-txt-82"></p>
                              </div>
                            </div>
                            <p>Excellent</p>
                          </div>
                        </div>
                        <div class="progress-text">
                          <div class="cal-wrap">
                            <div class="cal-area br">
                              <p>Quiz 정답률</p>
                              <span>{{focus.quizScore ? focus.quizScore : 0 }}
                                <p>%</p>
                              </span>
                            </div>
                            <div class="cal-area">
                              <p>학습률</p>
                              <span>{{ focus.learningRate ? focus.learningRate : 0 }}
                                <p>%</p>
                              </span>
                            </div>
                          </div>
                          <p>{{ focus.description }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="no-data" v-else>
                  <p>저장된 데이터가 없습니다</p>
                </div>
              </div>
              <!-- ========= MY PERFORMANCE =========== -->
              <div class="performance-sec" v-if="currentTabName == 'prep'">
                <div class="inner-page-head">
                  <div class="head-sec">
                    <div class="main-head">
                      <h2>{{ slideHeading }}</h2>
                      <img class="pointer" @click="$router.push({ name: 'TopicBasedDiscussion' })"
                        src="@/assets/icons/caretright.svg" />
                    </div>
                    <p>Grammar Accuracy 에 대한 설명이 들어갑니다.</p>
                  </div>
                </div>
                <div class="full-slider-area">

                  <swiper :modules="modules" :slides-per-view="1" :space-between="10" :pagination="{ clickable: true }"
                    @slideChange="onSlideChange">
                    <swiper-slide>
                      <div class="bullet-sec">
                        <div class="bullet-area">
                          <img src="@/assets/icons/small-blue-bullet.svg" />
                          <p>Grammar Accuracy</p>
                        </div>
                        <div class="bullet-area">
                          <img src="@/assets/icons/sky-bullet.svg" />
                          <p>Average</p>
                        </div>
                      </div>
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
                    <swiper-slide>
                      <div class="accuracy-sec">
                        <div class="full-slider-area">
                          <div class="head-sec">
                            <div class="yellow-sec">
                              <img src="@/assets/icons/bulb.svg" />
                              <p>TIP!</p>
                            </div>
                            <p>
                              각각의 문장과 문단 사이에서 시제를 일관되게 사용하면 듣는
                              이가 말하려는 내용을 잘 이해할 수 있습니다!
                            </p>
                          </div>
                          <div class="slide-cnt">
                            <div class="qstn-sec">
                              <p><span>She usually</span> <span>________</span><span>(go) to the gym every
                                  morning.</span>
                              </p>
                            </div>
                            <div class="opt-sec">
                              <div class="options">
                                <p>a)</p>
                                <p>goes</p>
                              </div>
                              <div class="options">
                                <p>b)</p>
                                <p>went</p>
                              </div>
                              <div class="options">
                                <p>c)</p>
                                <p>will go</p>
                              </div>
                              <div class="options">
                                <p>d)</p>
                                <p>gone</p>
                              </div>
                              <div class="ans-sec">
                                <p>a) goes</p>
                                <p>Answer:</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>

                  </swiper>
                </div>
              </div>
              <!-- ========= PINK BANNER =========== -->
              <div class="pink-banner-sec" @click="openLink(advImageUrlLink)"
                :class="advImageUrlLink != null ? 'pointer' : ''">
                <div class="web-banner">
                  <img :src="advImageList" />
                </div>
                <div class="mobile-banner">
                  <img :src="advImageList" />
                </div>
              </div>

              <div class="dividers"></div>

              <!-- ========= WHAT'S NEW =========== -->
              <HomeWhatsNew />

              <div class="dividers"></div>

              <!-- ========= RECOMMENDATION =========== -->
              <div class="recommendation-area" v-if="currentTabName == 'prep'">
                <PersonalizedRecommendation />
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
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { computed, ref, onMounted } from "vue";
import useMixins from "@/composables/useMixins.js";
import HomeWhatsNew from "./HomeWhatsNew.vue";
import PersonalizedRecommendation from "@/components/Learning/CustomTrainingSetting/Recommendation.vue";
import { Enrolment } from "@/services/Enrolment/Enrolment";
import { TopicBasedDiscussion } from "@/services/MainHome/TopicBasedDiscussion.js";
import { useUserData } from "@/stores/useUserDataCopy";
import { storeToRefs } from "pinia";
const { getIsMobileViewReady } = storeToRefs(useUserData());

const enrlSrvc = new Enrolment();
const topicBasedDiscussionSrvc = new TopicBasedDiscussion();
const modules = [Pagination, Autoplay];
const currentTabName = ref('topic');
const isLoading = ref(false);
const advImageUrlLink = ref();
const advImageList = ref();
const { openLink } = useMixins();
const boxMenu = ref();
const focusList = ref([]);
const courseItem = ref("");
const userStore = useUserData();
const slideHeading = ref("My Performance");
const currentTabId = ref("");

const props = defineProps({
  courseData: {
    type: Array,
    default: []
  },
});

const onSlideChange = (e) => {
  console.log("slide change", e.activeIndex);
  if (e.activeIndex == 1) {
    slideHeading.value = "Grammar Accuracy";
  } else {
    slideHeading.value = "My Performance";
  }
};

const tabList = [
  { name: "Topic-Based Discussions", to: "", key: "topic", visible: "", courseData: "" },
  { name: "S.P.A Prep Course", to: "", key: "prep", visible: "", courseData: "" },
  // { name: "Clinic", to: "", key: "" },
];

const To = (tab) => {
  if(tab.program2.includes("S.P.A")) {
    currentTabName.value = 'prep';
  } else {
    currentTabName.value = 'toptc';
  }
  courseItem.value = tab;
  currentTabId.value = tab.program2Id;
  getFeedbackFocus(tab.class_seq);
  getBox(tab.class_seq, tab.courseId);
};

const updateData = (courseItem) => {
  if(courseItem.program2.includes("S.P.A")) {
    currentTabName.value = 'prep';
  } else {
    currentTabName.value = 'toptc';
  }
  courseItem.value = courseItem;
  getFeedbackFocus(courseItem.class_seq);
  getBox(courseItem.class_seq, courseItem.courseId);
};

// ====== Get Middle Banner Image =====
const getAdvBannerImage = async () => {
  try {
    isLoading.value = true;
    const res = await enrlSrvc.homeAdvBanner();
    if (res.status == 200) {
      advImageList.value = res.data.data.url;
      advImageUrlLink.value = res.data.data.url_text;
    }
  } catch (error) {
    console.log("error", error);
  } finally {
    isLoading.value = false;
  }
};

// ====== Get Box =====
const getBox = async (class_seq, courseId) => {
  let data = {
    "course_seq": courseId,
    "class_seq": class_seq
  };
  try {
    isLoading.value = true;
    const res = await topicBasedDiscussionSrvc.courseRegistraionMenu(data);
    if (res.status == 200) {
      boxMenu.value = res.data;
    }
  } catch (error) {
    console.log("error", error);
  } finally {
    isLoading.value = false;
  }
};

const getFeedbackFocus = async (class_seq) => {
  let data = {
    "classId": class_seq
  };
  try {
    isLoading.value = true;
    const res = await topicBasedDiscussionSrvc.getFeedbackFocus(data);
    if (res.status == 200) {
      focusList.value = res.data.data;
    }
  } catch (error) {
    console.log("error", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  // const containsSPA = props.courseData.filter(course => course.program2.includes("S.P.A"));
  // const containsNonSPA = props.courseData.filter(course => !course.program2.includes("S.P.A"));
  // // //console.log(containsSPA)

  // if (containsSPA) {
  //   const prepCourseIndex = tabList.findIndex(tab => tab.name.includes("S.P.A"));
  //   if (prepCourseIndex !== -1) {
  //     // tabList[prepCourseIndex].visible = true;
  //     // tabList[prepCourseIndex].courseData = containsSPA;
  //     props.courseData[prepCourseIndex].key = 'prep'
  //   }
  // }

  // if (containsNonSPA) {
  //   const prepCourseIndex = tabList.findIndex(tab => !tab.name.includes("S.P.A"));
  //   if (prepCourseIndex !== -1) {
  //     // tabList[prepCourseIndex].visible = true;
  //     // tabList[prepCourseIndex].courseData = containsNonSPA;
  //     props.courseData[prepCourseIndex].key = 'topic'
  //   }
  // }
  courseItem.value = props.courseData[0];
  currentTabId.value = props.courseData[0].program2Id;

  if(courseItem.value.program2.includes("S.P.A")) {
    currentTabName.value = 'prep';
  } 
  //await userStore.getUserDetails();
  await getBox(props.courseData[0].class_seq, props.courseData[0].courseId);
  await getFeedbackFocus(props.courseData[0].class_seq);
  await getAdvBannerImage();
});

</script>