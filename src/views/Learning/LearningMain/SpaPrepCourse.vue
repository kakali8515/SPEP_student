<template>
  <section class="home-sec main-learning-wrap">
    <div class="page-cnt-wrap">
      <div class="container">
        <div class="row">
          <div class="web100">
            <div class="main-home inner-page-wrap mob-pad-inline">
              <div class="tab-area">
                <div class="tab-header" v-if="!getIsMobileViewReady">
                  <ul>
                    <li v-for="(item, index) in menuList" :key="index">
                      <a :class="item.course_seq == activeId.course_seq ? 'active' : ''
                  " href="#" @click="
                  getData(item);
                activeId = { ...item };
                //tabNo = index > 0 ? 2 : '';
                tabNo = index > 0 ? (index === 1 ? 1 : (index === 2 ? 2 : '')) : '';
                $router.push({ name: 'SpaPrepCourse', params: { tab: tabNo } });

                ">{{ item.program2 }}</a>
                    </li>
                  </ul>
                </div>
                <template v-else>
                  <MobileTabSlider :tabList="menuList" @updateData="updateData" :hideClinic="true" />
                </template>

                <div class="tab-body">
                  <div class="body-area nogap">
                    <!-- ========= MOBILE LEARNING =========== -->
                    <div class="mob-learning">
                      <div class="head">
                        <h4>모바일 학습</h4>
                        <!-- <p>앱 학습률 <span>80</span>%</p> -->
                      </div>
                      <div class="prep-chart-box-area">
                        <div class="oval-chart">
                          <!-- <img src="@/assets/images/ovel-chart.png" /> -->
                          <PieChart :seriesData="series" :categories="categories" :title="chartTitle"></PieChart>
                          <div>
                            <h2 style="font-weight: 700">{{loggedInUser}}</h2>
                            <p>
                              {{ moment().format('M') }}월 학습률은
                              <span style="color: #005dac; font-weight: 700">
                                {{
                  Array.isArray(series) && series.length > 0
                    ? series[0]
                    : 0
                }}
                              </span>
                              % 입니다. <br />
                              오늘 하루도 힘내세요!
                            </p>
                          </div>
                        </div>
                        <div class="wide-chart" v-if="isSPA">
                          <!-- <img src="@/assets/images/wide-chart.png"> -->
                          <div class="bar-container">
                            <div class="long-bar">
                              <h3>RET</h3>
                              <ProgressOnlyBar :value="percentages?.RET"></ProgressOnlyBar>
                            </div>
                            <div class="long-bar">
                              <h3>SI</h3>
                              <ProgressOnlyBar :value="percentages?.SI"></ProgressOnlyBar>
                            </div>
                            <div class="long-bar">
                              <h3>PE</h3>
                              <ProgressOnlyBar :value="percentages?.PE"></ProgressOnlyBar>
                            </div>
                          </div>
                          <div class="dividers"></div>
                          <div class="RET-slider">
                            <!-- <div class="headings">RET</div> -->
                            <div class="sliders">
                              <SliderImage></SliderImage>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- ========= PREPARATION =========== -->
                    <div class="dividers-border"></div>
                    <div class="preparation widt204 np">
                      <div class="second-head">
                        <div class="main-head">
                          <div class="right-head">
                            <!-- <p class="txt">Active Learning Prep에 대한 설명이 들어갑니다.</p> -->
                            <div class="pagination-area">
                              <ul>
                                <li>Quiz 정답률<span>{{ overAllAlpQuizPer?overAllAlpQuizPer:0 }}</span>%</li>
                                <li>
                                  학습률<span>{{ overAllAlpProgressPer?overAllAlpProgressPer:0 }}</span>%
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div class="left-head">
                            <h2>Active Learning Prep으로 수업을 준비하세요!</h2>
                            <div class="view-all pointer"
                              @click="$router.push({ name: 'GeneralViewAllALP', params: { class_seq: activeId.class_seq, tab: tabNo } })"
                              v-if="alpData?.length">
                              <!-- <p>전체보기</p> -->
                              <img src="@/assets/icons/arrow-right-blk.svg" />
                            </div>
                          </div>
                          

                        </div>
                      </div>
                      <div class="mobile-scroll">
                        <div class="slider-box-sec" v-if="alpData?.length" :class="alpData?.length >= 3? 'mobscrl':''">
                          <div class="new-inner-box pointer" v-for="(item, index) in alpData" :key="index"
                            @click="$router.push({ name: 'ALPSmartDetails', params: { id: item.alp_seq, tab: tabNo } })">
                            <div class="img-sec">
                              <div class="inside-img-are">
                                <img v-if="item.thumbnail" :src="item.thumbnail" alt="" />
                                <img v-else src="@/assets/images/no-image-available.jpg" alt="" />
                              </div>
                              <div class="img-head">
                                <p v-if="diffrence(moment(), item.due_date) <= 7 &&
                    !item.user_alp
                    ">
                                  New
                                </p>
                                <h2>{{ item.lesson_date }}</h2>
                                <span v-if="diffrence(moment(), item.due_date) <= 7 &&
                    !item.user_alp
                    ">D{{
                    diffrence(moment(), item.due_date)
                  }}</span>
                              </div>
                            </div>
                            <div class="box-details">
                              <div class="title-sec">
                                <div class="rating">
                                  <img src="@/assets/icons/rating-white.svg" alt="" />
                                  <p>200</p>
                                </div>
                                <h2>{{ item.title }}</h2>
                              </div>
                              <p>
                                {{ item.lecture_name }}
                              </p>
                            </div>
                          </div>
                        </div>
                      
                        <div class="nodatas" v-else>No data</div>
                      </div>
                    </div>
                    <!-- ========= PREPARATION =========== -->
                    <div class="dividers-border" v-if="focus1Data.list?.length"></div>
                    <div class="preparation widt204 np" v-if="focus1Data.list?.length">
                      <div class="second-head">
                        <div class="main-head">
                          <div class="left-head">
                            <h2><span>Focus 1.</span>{{ focus1Data.title }}</h2>
                            <div class="view-all" v-if="focus1Data.list?.length"
                              @click="$router.push({ name: 'GeneralViewAll', params: { class_seq: activeId.class_seq, type: focus1Type, tab: tabNo } })">
                              <!-- <p class="pointer">전체보기</p> -->
                              <img src="@/assets/icons/arrow-right-blk.svg" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="slider-box-sec focus" v-if="focus1Data.list?.length">
                        <div class="new-inner-box pointer" v-for="(item, index) in focus1Data.list" :key="index" @click="getQuizTypes(item.unit_seq)">
                          <div class="img-sec">
                            <div class="inside-img-are">
                              <img v-if="item.thumbnail" :src="item.thumbnail" alt="" />
                              <img v-else src="@/assets/images/no-image-available.jpg" alt="" />
                            </div>
                            <div class="img-head">
                              <!-- <h2>이제 OOO를 마스터해 보세요!</h2> -->
                              <!-- <span>완료</span> -->
                            </div>
                          </div>
                          <div class="box-details">
                            <div class="title-sec">
                              <div class="rating">
                                <img src="@/assets/icons/rating-white.svg" alt="" />
                                <p>100</p>
                              </div>
                              <h2>{{ item.title }}</h2>
                            </div>
                            <p>
                              {{ item.lecture_name }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="nodatas" v-else>No data</div>
                    </div>
                    <!-- ========= PREPARATION =========== -->
                    <div class="dividers-border" v-if="focus2Data.list?.length"></div>
                    <div class="preparation widt204 np" v-if="focus2Data.list?.length">
                      <div class="second-head">
                        <div class="main-head">
                          <div class="left-head">
                            <h2><span>Focus 2.</span>{{ focus2Data.title }}</h2>
                            <div class="view-all pointer"
                              @click="$router.push({ name: 'GeneralViewAll', params: { class_seq: activeId.class_seq, type: focus2Type, tab: tabNo } })"
                              v-if="focus2Data.list?.length">
                              <!-- <p>전체보기</p> -->
                              <img src="@/assets/icons/arrow-right-blk.svg" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="slider-box-sec focus" v-if="focus2Data.list?.length">
                        <div class="new-inner-box pointer" v-for="(item, index) in focus2Data.list" :key="index" @click="getQuizTypes(item.unit_seq)">
                          <div class="img-sec">
                            <div class="inside-img-are">
                              <img v-if="item.thumbnail" :src="item.thumbnail" alt="" />
                              <img v-else src="@/assets/images/no-image-available.jpg" alt="" />
                            </div>
                            <div class="img-head"></div>
                          </div>
                          <div class="box-details">
                            <div class="title-sec">
                              <div class="rating">
                                <img src="@/assets/icons/rating-white.svg" alt="" />
                                <p>100</p>
                              </div>
                              <h2>{{ item.title }}</h2>
                            </div>
                            <p>
                              {{ item.lecture_name }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="nodatas" v-else>No data</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LoaderVue :loading="loaderState" />
  </section>
</template>

<script setup>
import ProgressOnlyBar from "@/components/ProgressOnlyBar.vue";
import PieChart from "@/views/Learning/LearningMain/PieChart.vue";
import SliderImage from "@/components/SliderImage.vue";
import { onMounted, ref, computed } from "vue";
import { LearningMain } from "@/services/Learning/LearningMain//LearningMain.js";
import { QuizTypes } from "@/services/Quiz/QuizTypes/QuizTypes.js";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";

import { useUserData } from "@/stores/useUserDataCopy";
import { storeToRefs } from "pinia";
const { getUserData, getIsMobileViewReady } = storeToRefs(useUserData());
const loggedInUser = computed(() => getUserData.value.username_kr);

const quizTypesService = new QuizTypes();
const LearningMainService = new LearningMain();

const router = useRouter();
const loaderState = ref(false);
const menuList = ref([]);
const percentages = ref({});
const chartTitle = ref("모바일 학습");
const series = ref([]);
const viewFirstTypesData = ref([]);
const alpData = ref([]);
const focus1Data = ref({});
const focus1Type = ref("focus1");
const focus2Data = ref({});
const focus2Type = ref("focus2");
const activeId = ref({});
const isSPA = ref(false);
const overAllProgressPer = ref(0);
const overAllQuizPer = ref(0);
const overAllAlpProgressPer = ref(0);
const overAllAlpQuizPer = ref(0);

const route = useRoute();
const tabNo = ref(route.params.tab ? route.params.tab : "");
// const categories = ref([
//   "홍길동님9월 학습률은 50% 입니다.오늘 하루도 힘내세요!",
// ]);
const categories = ref(["Over All"]);
const getLearnMenuList = async () => {
  try {
    loaderState.value = true;
    const res = await LearningMainService.getLearnMenuList();
    if (res.data) {
      menuList.value = res.data.list;
      if (tabNo.value == 1) {
        activeId.value = menuList.value[1];
      }else if (tabNo.value == 2) {
        activeId.value = menuList.value[2];
      } else {
        activeId.value = menuList.value[0];
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const updateData = (data, index) => {
  getData(data);
  activeId.value = { ...data };
  //tabNo.value = index > 0 ? 2 : '';
  tabNo.value = index > 0 ? (index === 1 ? 1 : (index === 2 ? 2 : '')) : '';
  router.push({ name: 'SpaPrepCourse', params: { tab: tabNo.value } });

};

const getData = async (item) => {
  isSPA.value = item.program2.includes("S.P.A");
  if (isSPA.value) {
    getSPAProgress(item.course_seq, item.class_seq);
  } else {
    getNonSPAProgress(item.course_seq, item.class_seq);
  }
  getALPData(item.class_seq);
  getFocusArea(item.class_seq);
};

const diffrence = (start, end) => {
  var startDate = moment(start);
  var endDate = moment(end);
  let result = endDate.diff(startDate, "days");
  return result;
};

const getSPAProgress = async (_course_seq, _class_seq) => {
  let data = {
    // course_seq: 5454,
    course_seq: _course_seq,
    // class_seq: 114392, // required
    class_seq: _class_seq,
  };
  series.value = [];
  try {
    loaderState.value = true;
    const res = await LearningMainService.getSPAProgress(data);
    if (res.data) {
      percentages.value = res.data.percentages;
      let overAllProgress = res.data.progress;
      overAllProgressPer.value = res.data.progress;
      overAllQuizPer.value = res.data.quizPercentage;
      series.value.push(overAllProgress);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const getNonSPAProgress = async (_course_seq, _class_seq) => {
  let data = {
    // course_seq: 13066,
    course_seq: _course_seq,
    class_seq: _class_seq,
  };
  series.value = [];
  try {
    loaderState.value = true;
    const res = await LearningMainService.getNonSPAProgress(data);
    if (res.data) {
      percentages.value = res.data.percentages;
      let overAllProgress = res.data.progress;
      overAllProgressPer.value = res.data.progress;
      overAllQuizPer.value = res.data.quizPercentage;
      series.value.push(overAllProgress);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const getFocusArea = async (_class_seq) => {
  let data = {
    month_year: moment().format('YYYY-MM'), //YYYY-MM
    //class_seq: 114392,
    class_seq: _class_seq,
  };
  try {
    loaderState.value = true;
    const res = await LearningMainService.getFocusArea(data);
    if (res.data) {
      focus1Data.value = res.data.focus1;
      focus2Data.value = res.data.focus2;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};
const getALPData = async (_class_seq) => {
  let data = {
    // class_seq: 114393, // required
    class_seq: _class_seq,
  };
  try {
    loaderState.value = true;
    const res = await LearningMainService.getALPData(data);
    if (res.data) {
      alpData.value = res.data.list;
      overAllAlpProgressPer.value = res.data.learningRate;
      overAllAlpQuizPer.value = res.data.quizPercentage;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const getQuizTypes = async (_unit_seq) => {
  try {
    loaderState.value = true;
    const res = await quizTypesService.getQuizTypes(_unit_seq);

    if(res && res.data && res.data.data && res.data.data.length > 0){
        viewFirstTypesData.value = res.data.data[0];

        let nextRoute = '';
        let nextModuleName = viewFirstTypesData.value.module;
        if (checkQuizModuleName(nextModuleName)) {
          nextRoute = `/quiz-type-short-answer/${_unit_seq}/${nextModuleName}`;
        } else if (nextModuleName == 'Listening') { 
          nextRoute = `/video-image-subtitles/${_unit_seq}`;
        } else if (nextModuleName == 'Shadowing') { 
          nextRoute = `/shadowing/${_unit_seq}`;
        } else if (nextModuleName == 'Flashcard') { 
          nextRoute = `/flashcard/${_unit_seq}`;
        } else if (nextModuleName == 'Dialogue') { 
          nextRoute = `/dialogue-quiz/${_unit_seq}`;
        } else { 
          nextRoute = `/`;
        }  
        router.push(nextRoute);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const checkQuizModuleName = (moduleName) => {
  if (moduleName.startsWith("quiz")) {
    return true;
  } else {
    return false;
  }
}

onMounted(async () => {
  await getLearnMenuList();
  await getData(activeId.value);
});
</script>
