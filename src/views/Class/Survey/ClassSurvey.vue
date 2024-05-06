<template>
  <section class="home-sec class-survey">
    <div class="page-cnt-wrap">
      <div class="container-fluid">
        <div class="row row-wrap">
          <div class="col-lg-8 col-md-12 col-sm-12">
            <div class="body-wrap">
              <div class="head-box">
                <p>아래</p>
                <p class="fw-700">피드백과 설문</p>
                <p>을 작성하시면</p>
                <p class="blue-txt">⭐️포인트</p>
                <p>를 드려요!</p>
              </div>

              <div class="box-wrap">
                <section class="home-sec">
                  <div class="">
                    <div class="inner-page-head">
                      <div class="head-sec">
                        <div class="main-head">
                          <h2>상시 피드백</h2>
                        </div>
                        <p>
                          작성하실 수 있는 교육 설문이
                          <span style="color: #ec676a">
                            {{ alwaysFeedbackList?.length }}
                          </span>
                          개 있습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                <div class="box-sec" v-for="(item, index) in alwaysFeedbackList" :key="index">
                  <div class="box-area">
                    <div class="box-left pointer" @click="displayFeedbackModal = true; feedbackData = item">
                      <h2> <span>{{ item.TITLE }}</span> </h2>
                      <p>
                        <span>작성기한:</span><span>{{ moment(item.LESSON_DATE).format("YYYY.MM.DD") }}</span>
                      </p>
                    </div>
                    <div class="box-right pointer">
                      <img src="@/assets/icons/grey-right.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>


              <div class="box-wrap">
                <section class="home-sec">
                  <div class="">
                    <div class="inner-page-head">
                      <div class="head-sec">
                        <div class="main-head">
                          <h2>설문</h2>
                        </div>
                        <p>
                          작성하실 수 있는 교육 설문이
                          <span style="color: #ec676a">
                            {{ surveyList?.length }}
                          </span>
                          개 있습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                <div class="box-sec" v-for="(item, index) in surveyList" :key="index" @click="
                              $router.push(
                                `/class-survey-detail/${item.SURVEY_SEQ}/${item.SURVEY_SCHEDULE_SEQ}`
                              )
                              ">
                  <div class="box-area" v-if="item.SURVEY_SEQ">
                    <div class="box-left pointer">
                      <h2>
                        <span>{{ item.LECTURE_NAME }}</span><span>{{ item.CLASS_NAME }}</span>
                      </h2>
                      <p>
                        <span>작성기한:</span><span>{{
                              moment(item.SURVEY_START_DATE).format("YYYY.MM.DD")
                            }}</span><span>~</span><span>
                          {{
                                moment(item.SURVEY_END_DATE).format("YYYY.MM.DD")
                              }}</span>
                      </p>
                    </div>
                    <div class="box-right pointer" @click="
                            $router.push(
                              `/class-survey-detail/${item.SURVEY_SEQ}/${item.SURVEY_SCHEDULE_SEQ}`
                            )
                              ">
                      <img src="@/assets/icons/grey-right.svg" alt="" />
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

  <AlwaysFeedbackModal v-if="displayFeedbackModal" v-model="displayFeedbackModal" @close="displayFeedbackModal = false"
    :feedbackData="feedbackData" :class_seq="feedbackData.CLASS_SEQ" />

</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { Survey } from "@/services/Class/Survey.js";
import { useRouter, useRoute } from "vue-router";
import moment from "moment";
import AlwaysFeedbackModal from "@/components/Class/Feedback/AlwaysFeedbackModal.vue";

const SurveyService = new Survey();
const loaderState = ref(false);
const surveyList = ref([]);
const alwaysFeedbackList = ref([]);
const answerArray = ref([]);
const router = useRouter();
const route = useRoute();
const displayFeedbackModal = ref(false);
const feedbackData = ref({});

const getSurveyLists = async () => {
  try {
    loaderState.value = true;
    let data = {
      survey_seq: 3,
    };
    const res = await SurveyService.getSurveyLists();
    if (res.data) {
      surveyList.value = res.data.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const getAlwaysFeedbackLists = async () => {
  try {
    loaderState.value = true;
    const res = await SurveyService.getAlwaysFeedbackLists();
    if (res.data) {
      alwaysFeedbackList.value = res.data.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

onMounted(async () => {
  await getAlwaysFeedbackLists();
  await getSurveyLists();
});
</script>
