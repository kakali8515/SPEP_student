<template>
  <section class="home-sec general-view-wrap">
    <div class="page-cnt-wrap">
      <div class="container">
        <div class="row">
          <div class="web100">
            <div class="main-home inner-page-wrap">
              <!-- ========= PREPARATION =========== -->
              <div class="preparation  np" v-if="list.list?.length">
                <div class="second-head">
                  <div class="main-head alp-page">
                    <div class="right-head">
                      <!-- <p>Active Learning Prep에 대한 설명이 들어갑니다.</p> -->
                      <div class="pagination-area">
                        <ul>
                          <li>Quiz 정답률<span>{{quizPercentageOfFocus[0]?.quizScoreInPercentage}}</span>%</li>
                          <li>학습률<span>{{focusLearningRate?focusLearningRate:0}}</span>%</li>
                        </ul>
                      </div>
                    </div>
                    <div class="left-head">
                      <h2>
                        <span v-if="type == 'focus2'">Focus 2.</span
                        ><span v-else>Focus 1.</span>{{ list.title }}
                      </h2>
                      <!-- <div class="view-all">
                        <p>전체보기</p>
                        <img src="@/assets/icons/grey-caret-right.svg" />
                      </div> -->
                    </div>
                  </div>
                </div>
                <div class="slider-box-sec">
                  <div class="new-inner-box pointer" v-for="(item, index) in list.list" 
                    :key="index"  @click="getQuizTypes(item.unit_seq)">
                    <div class="img-sec">
                      <div class="inside-img-are">
                        <img v-if="item.thumbnail" :src="item.thumbnail" alt="" />
                        <img v-else src="@/assets/images/no-image-available.jpg" alt="" />
                      </div>
                      <!-- <div class="img-head"> -->
                        <!-- <p>New</p> -->
                        <!-- <h2>완벽해요!</h2> -->
                        <!-- <span>D-3</span> -->
                      <!-- </div> -->
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
              </div>
              <div v-if="!list.list?.length" class="tablemain-wrap aassa">
                <div class="null-result">
                  <p>No data</p>
                </div>
              </div>
              <div class="btn-sec">
                <button @click="$router.push({ name: 'SpaPrepCourse', params: { tab: tabNo } })">
                  목록으로
                </button>
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
import { onMounted, ref, reactive } from "vue";
import { LearningMain } from "@/services/Learning/LearningMain//LearningMain.js";
import { QuizTypes } from "@/services/Quiz/QuizTypes/QuizTypes.js";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";

const quizTypesService = new QuizTypes();
const LearningMainService = new LearningMain();
const router = useRouter();
const route = useRoute();
const loaderState = ref(false);
const alpData = ref([]);
const focus1Data = ref({});
const focus2Data = ref({});
const list = ref({});
const type = ref(route.params.type);
const tabNo = ref(route.params.tab ? route.params.tab : "");
const classSeq = ref(route.params.class_seq ? route.params.class_seq : "");
const quizPercentageOfFocus = ref([]);
const focusLearningRate = ref(0);
const viewFirstTypesData = ref([]);

const getFocusArea = async () => {
  let data = {
    month_year: moment().format('YYYY-MM'), //YYYY-MM
    class_seq: classSeq.value,
  };
  try {
    loaderState.value = true;
    const res = await LearningMainService.getFocusArea(data);
    if (res.data) {
      focus1Data.value = res.data.focus1;
      focus2Data.value = res.data.focus2;

      if (type.value == "focus2") {
        list.value = res.data.focus2;
        quizPercentageOfFocus.value = res.data.focus2.quizPercentageOfFocus2;
        focusLearningRate.value = res.data.focus2.focus2LearningRate;
      } else if (type.value == "focus1") { 
        list.value = res.data.focus1;
        quizPercentageOfFocus.value = res.data.focus1.quizPercentageOfFocus1;
        focusLearningRate.value = res.data.focus1.focus1LearningRate;
      }
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
  await getFocusArea();
});
</script>
