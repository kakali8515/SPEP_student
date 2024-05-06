<template>
  <section class="home-sec learning-smart-wrap">
    <div class="page-cnt-wrap">
      <div class="container-fluid">
        <div class="row row-wrap">
          <div class="col-lg-8 col-md-12 col-sm-12">
            <div class="main-home inner-page-wrap">
              <div class="mob-learning">
                <div class="second-head">
                  <div class="main-head">
                    <div class="left-head">
                      <h2>모바일 학습</h2>
                      <div class="right-head">
                        <div class="pagination-area">
                          <ul>
                            <li>Quiz 정답률<span>80</span>%</li>
                            <li>학습률<span>80</span>%</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mob-learning-cnt-wrap">
                  <div class="default-prog">
                    <p>
                      그래프에 대한 설명이 들어갑니다. 그래프에 대한 설명이
                      들어갑니다.
                    </p>
                    <div class="progress-box">
                      <div class="bullet-sec">
                        <div class="bullet-area">
                          <img src="@/assets/icons/small-blue-bullet.svg" />
                          <p>Last Class</p>
                        </div>
                        <div class="bullet-area">
                          <img src="@/assets/icons/sky-bullet.svg" />
                          <p>Session Average</p>
                        </div>
                      </div>
                      <div class="progress-sec">
                        <div class="progress-wrap" v-if="feedbackData?.length>0">
                          <div class="full-progres-area" v-for="feedback in feedbackData">
                            <div class="progress-box-area">
                              <div class="box-head">
                                <div class="head-sec">
                                  <h2>{{feedback.sub_category_title_kr}}</h2>
                                </div>
                              </div>
                              <div class="progress-area">
                                <div class="bar-area">
                                  <div class="btn-area grey l-50">
                                    <p class="progress-txt-gr">{{feedback.session_avg_score}}</p>
                                  </div>

                                  <div class="btn-area blue r-0">
                                    <p class="progress-txt-b">{{feedback.score}}</p>
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
              </div>
              <!-- ========= PREPARATION =========== -->
              <div class="learning-slider" v-if="alpData?.length>0">
                <div class="second-head">
                  <div class="flex-col">
                    <div class="main-head">
                      <div class="left-head">
                        <h2>Active Learning Prep으로 수업을 준비하세요!</h2>
                        <div class="view-all">
                          <p>전체보기</p>
                          <img src="@/assets/icons/grey-caret-right.svg" />
                        </div>
                      </div>
                    </div>
                    <div class="right-head">
                      <p>Active Learning Prep에 대한 설명이 들어갑니다.</p>
                    </div>
                  </div>
                  <ul class="learn-strength">
                    <li>Quiz 정답률<span>80%</span></li>
                    <li>학습률<span>52%</span></li>
                  </ul>
                </div>

                <div class="slider-area">
                  <div class="slider-wrap">
                    <div>
                      <carousel
                        :autoplay="4000"
                        :items-to-show="alpData.length"
                        v-bind="settings"
                        :breakpoints="breakpoints"
                        :wrap-around="true"
                      >
                        <slide v-for="(apepData,index) in alpData" :key="index">
                          <div class="new-inner-box">
                            <div class="img-sec">
                              <div class="img-head">
                                <p>New</p>
                                <h2>완벽해요!</h2>
                                <span>{{apepData.day_value}}</span>
                              </div>
                            </div>
                            <div class="box-details">
                              <div class="title-sec">
                                <div class="rating">
                                  <img src="@/assets/icons/rating.svg" alt="" />
                                  <p>{{apepData.point}}</p>
                                </div>
                                <h2>{{apepData.title}}</h2>
                              </div>
                              <p>
                                {{apepData.description}}
                              </p>
                            </div>
                          </div>
                        </slide>

                        <template #addons>
                          <navigation />
                          <pagination />
                        </template>
                      </carousel>
                    </div>
                  </div>
                </div>
              </div>
              <!-- added -->
              <div class="learning-slider" v-for="(focus,index) in focusData">
                <div class="second-head">
                  <div class="flex-col">
                    <div class="main-head">
                      <div class="left-head">
                        <h2>{{ focus.category_title_kr }}</h2>
                        <div class="view-all">
                          <p>전체보기</p>
                          <img src="@/assets/icons/grey-caret-right.svg" />
                        </div>
                      </div>
                    </div>
                    <div class="right-head">
                      <p>{{ focus.category_title_kr }}</p>
                    </div>
                  </div>
                  <ul class="learn-strength">
                    <li>Quiz 정답률<span>80%</span></li>
                    <li>학습률<span>52%</span></li>
                  </ul>
                </div>

                <div class="slider-area" >
                  <div class="slider-wrap">
                    <div>
                      <carousel
                        :autoplay="4000"
                        :items-to-show="focus.unitDetails.length"
                        v-bind="settings"
                        :breakpoints="breakpoints"
                        :wrap-around="true"
                      >
                        <slide v-for="(focus1,index) in focus.unitDetails" :key="index">
                          <div class="new-inner-box">
                            <div class="img-sec">
                              <div class="img-head">
                                <p>New</p>
                                <h2>완벽해요!</h2>
                                <span>{{focus1.day_value}}</span>
                              </div>
                            </div>
                            <div class="box-details">
                              <div class="title-sec">
                                <div class="rating">
                                  <img src="@/assets/icons/rating.svg" alt="" />
                                  <p>{{focus1.point}}</p>
                                </div>
                                <h2>{{focus1.title}}</h2>
                              </div>
                              <p>
                                {{focus1.description}}
                              </p>
                            </div>
                          </div>
                        </slide>

                        <template #addons>
                          <navigation />
                          <pagination />
                        </template>
                      </carousel>
                    </div>
                  </div>
                </div>
              </div>
              <!-- added -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <LoaderVue :loading="loaderState" />
</template>
<script setup>
import "vue3-carousel/dist/carousel.css";
import { onMounted, ref } from "vue";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { TopicBasedDiscussion } from "@/services/Learning/LearningMain/TopicBasedDiscussion.js";
const loaderState = ref(false);
const feedbackData = ref([]);
const alpData = ref([]);
const focusData = ref([]);
const topicBasedDiscussionService = new TopicBasedDiscussion();
const getTopicBasedData = async () => {
    try{
    loaderState.value = true;
    const res = await topicBasedDiscussionService.getTopicBasedDiscussionData();
    console.log(res);
    if(res.status===200){
    alpData.value = res.data.alpList;
    feedbackData.value=res.data.focusFeedbackList
    focusData.value = res.data.focusList;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
  console.log(alpData.value);
  console.log(feedbackData.value);
  console.log(focusData.value);
};
onMounted(async () => {
  await getTopicBasedData();
});
</script>


<style lang="scss">
// .progress-wrap{
//  display:grid!important;
//  grid-template-columns:repeat(4,1fr);
// }
.second-head {
  display: flex;
  align-items: end;
  flex-direction: row;
  justify-content: space-between;
  .flex-col {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
