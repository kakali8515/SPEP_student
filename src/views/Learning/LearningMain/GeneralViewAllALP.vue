<template>
  <section class="home-sec general-view-wrap">
    <div class="page-cnt-wrap">
      <div class="container">
        <div class="row">
          <div class="web100">
            <div class="main-home inner-page-wrap">
              <!-- ========= PREPARATION =========== -->
              <div class="preparation np" v-if="list?.length">
                <div class="second-head">

                  <div class="main-head alp-page">
                    <div class="right-head">
                      <!-- <p>Active Learning Prep에 대한 설명이 들어갑니다.</p> -->
                      <div class="pagination-area">
                        <ul>
                          <li>Quiz 정답률<span>{{quizPercentage}}</span>%</li>
                          <li>학습률<span>{{progress}}</span>%</li>
                        </ul>
                      </div>
                    </div>

                    <div class="left-head">
                      <h2>
                        <span>Active Learning Prep.</span>{{ list.title }}
                      </h2>
                      <!-- <div class="view-all">
                        <p>전체보기</p>
                        <img src="@/assets/icons/grey-caret-right.svg" />
                      </div> -->
                    </div>
                  </div>
                </div>

                <div class="eachBox-area" v-for="(data, index) in list" :key="index">
                  
                  <div class="each-head">
                    <h2>{{ data.lesson }} </h2>
                    <div class="pagination-area">
                      <ul>
                        <li>학습률<span>{{ data.learningRate?data.learningRate:0 }}</span>%</li>
                      </ul>
                    </div>
                  </div> 

                  <div class="slider-box-sec" v-for="item in data.alp_units">
                    <div
                      class="new-inner-box pointer" 
                      @click="$router.push({ name: 'ALPSmartDetails', params: { id: item.alp_seq, tab: tabNo } })" 
                    >
                      <div class="img-sec">
                        <div class="inside-img-are">
                          <img v-if="item.thumbnail" :src="item.thumbnail" alt="" />
                          <img v-else src="@/assets/images/no-image-available.jpg" alt="" />
                        </div>
                        <div class="img-head">
                          <p
                            v-if="
                              diffrence(moment(), item.due_date) <= 7 &&
                              !item.user_alp
                            "
                          >
                            New
                          </p>
                          <h2>{{ item.lesson_date }}</h2>
                          <span
                            v-if="
                              diffrence(moment(), item.due_date) <= 7 &&
                              !item.user_alp
                            "
                            >D{{diffrence(moment(), item.due_date)}}</span
                          >
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
                </div>
              </div>
              <div class="preparation np" v-else>
                <div class="nodatas">No data</div>
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
import { useRoute, useRouter } from "vue-router";
import moment from "moment";

const LearningMainService = new LearningMain();
const router = useRouter();
const route = useRoute();
const loaderState = ref(false);
const list = ref({});
const type = ref(route.params.type);
const tabNo = ref(route.params.tab ? route.params.tab : "");
const classSeq = ref(route.params.class_seq ? route.params.class_seq : "");
const quizPercentage = ref("");
const progress = ref("");

const getAllALPData = async () => {
  let data = {
    //class_seq: 114393, // required
    class_seq: classSeq.value
  };
  try {
    loaderState.value = true;
    const res = await LearningMainService.getAllALPData(data);
    if (res.data) {
      list.value = res.data.list;
      quizPercentage.value = res.data.quizPercentage;
      progress.value = res.data.progress;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};
const diffrence = (start, end) => {
  let startDate = moment(start);
  let endDate = moment(end);
  let result = endDate.diff(startDate, "days");
  return result;
};

onMounted(async () => {
  await getAllALPData();
});
</script>
