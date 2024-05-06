<template>
  <div class="tab-body" v-if="topicBasedData?.classDetails?.classInfo?.classId">
    <div class="body-wrap">
      <div class="header-box topics">
        <div class="left-wrap">
          <ul>
            <li>
              <h2>프로그램</h2>
              <p>{{ topicBasedData?.classDetails?.classInfo?.className }}</p>
            </li>
            <li class="nb">
              <h2>세션</h2>
              <p>{{ topicBasedData?.classDetails?.courseInfo?.orderNum }}</p>
            </li>
            <li>
              <h2>교육 기간</h2>
              <p>{{ moment(topicBasedData?.classDetails?.classInfo?.startDate).format("YYYY.MM.DD") }} ~ {{
  moment(topicBasedData?.classDetails?.classInfo?.endDate).format("YYYY.MM.DD") }}</p>
            </li>
            <li>
              <h2>시간</h2>
              <p>{{ daysMap[topicBasedData?.classDetails?.classInfo?.dayOfWeek] }} {{
    topicBasedData?.classDetails?.classInfo?.startTime }} ~ {{
    topicBasedData?.classDetails?.classInfo?.endTime }}</p>
            </li>
            <li class="nb">
              <h2>장소</h2>
              <p>{{ topicBasedData?.classDetails?.classInfo?.location }}</p>
            </li>
            <li>
              <h2>강사</h2>
              <p>{{ topicBasedData?.classDetails?.teacherInfo?.userNameKr }}</p>
            </li>
          </ul>
        </div>
        <!-- <div class="right-wrap">
                      <img src="@/assets/icons/img-icon.svg" alt="" />
                    </div> -->
      </div>
      <div class="cal-wrap">

        <div class="progress-wrap">
          <div class="inner-page-head">
            <div class="head-sec">
              <div class="main-head">
                <h2>강사 피드백 서머리</h2>
              </div>
            </div>
          </div>
          <div class="progress-box" v-if="topicBasedData.feedbackSummaryInfo?.length">
            <div class="bullet-sec">
              <div class="bullet-area">
                <span class="bullets"></span>
                <p>My Performance</p>
              </div>
              <div class="bullet-area">
                <span class="bullets greys"></span>
                <p>Session Average</p>
              </div>
            </div>
            <div class="progress-sec">
              <div class="progress-wrap dubbleprogressBox">
                <div class="full-progres-area" v-for="item in topicBasedData.feedbackSummaryInfo">
                  <div class="progress-box-area">
                    <div class="box-head">
                      <div class="head-sec">
                        <h2>{{ item.focusArea.category.categoryEn }}</h2>
                      </div>
                    </div>
                    <div class="progress-area">
                      <p>Keep it up</p>
                      <div class="bar-area">
                        <div class="btn-area light-blue" :style="{ left: Math.round(item.sessionAverage) + '%' }">
                          <p class="progress-txt-18"></p>
                        </div>

                        <div class="btn-area blue" :style="{ left: Math.round(item.myPerformance) + '%' }">
                          <p class="progress-txt-82"></p>
                        </div>
                      </div>
                      <p>Excellent</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!topicBasedData.feedbackSummaryInfo?.length" class="nodatas">
            No data
          </div>
        </div>

        <div class="list-wrap">
          <div class="second-head">
            <div class="main-head">
              <div class="left-head">
                <h2>선택 주제별 강사 피드백</h2>
                <div class="view-all pointer">
                  <!-- <p >전체보기</p> -->
                  <img @click="goToFeedback" src="@/assets/icons/caretright.svg" />
                </div>
              </div>
            </div>
          </div>
          
          <table class="divider-table noscrll" v-if="topicBasedData.instructorFeedbackInfo?.length">
            <tr class="table-head">
              <th>수업일시</th>
              <th>클래스</th>
            </tr>
            <tr class="dividertable pointer" @click="
    $router.push({
      name: 'FeedBackDetails',
      params: { unit_id: item.unitInfo.unitId, class_id: item.classInfo.classId, scheduleId: item.scheduleInfo.scheduleId},
    })
    " v-for="item in topicBasedData.instructorFeedbackInfo?.slice(0, 3)">
              <td class="first-col">
                {{ moment(item.scheduleInfo.lessonDate).format("YYYY. MM. DD") }}
              </td>
              <td><p class="bgarrow">{{ item.unitInfo.unitTitle }}</p></td>
            </tr>
          </table>
          <div v-if="!topicBasedData.instructorFeedbackInfo?.length">
            <NoDataFoundVue />
          </div>
        </div>
        
        <div class="list-wrap">
          <div class="second-head">
            <div class="main-head">
              <div class="left-head">
                <h2>Assessment 피드백</h2>
                <div class="view-all pointer" @click="goToAssessment()">
                  <!-- <p  class="pointer">전체보기</p> -->
                  <img src="@/assets/icons/caretright.svg" />
                </div>
              </div>
            </div>
          </div>
          <table class="divider-table noscrll" v-if="topicBasedData.assementInfo?.length">
            <tr class="table-head">
              <th>년도</th>
              <th>세션</th>
              <th>코스</th>
            </tr>
            <tr class="dividertable-three pointer" @click="
    $router.push(`/assesment-feedback-detail/${topicBasedData?.classDetails?.classInfo?.classId}/${topicBasedData?.classDetails?.courseInfo?.courseId}/${item.scheduleId}`)
    " v-for="item in topicBasedData.assementInfo?.slice(0, 3)">
              <td class="first-col">{{ item.year }}</td>
              <td>Session {{ item.orderNum }}</td>
              <td><p class="bgarrow">{{ item.title }}</p></td>
            </tr>
          </table>
          <div v-if="!topicBasedData.assementInfo?.length">
            <NoDataFoundVue />
          </div>
        </div>

        <div class="list-wrap">
          <div class="second-head">
            <div class="main-head">
              <div class="left-head">
                <h2>학습 자료실</h2>
                <div class="view-all pointer" @click="goToResource()">
                  <!-- <p  class="">전체보기</p> -->
                  <img src="@/assets/icons/caretright.svg" />
                </div>
              </div>
            </div>
          </div>
          <table class="divider-table noscrll" v-if="topicBasedData.resourcesInfo?.length">
            <tr class="table-head">
              <th>년도</th>
              <th>세션</th>
              <th>코스</th>
            </tr>
            <tr @click="$router.push(`/resource-center-list/${topicBasedData?.classDetails?.courseInfo?.courseId}/${topicBasedData?.classDetails?.classInfo?.classId}`)"
              v-for="item in topicBasedData.resourcesInfo?.slice(0, 3)" class="dividertable-three pointer">
              <td class="first-col">{{ item.course.year }}</td>
              <td>Session {{ item.course.orderNum }}</td>
              <td><p class="bgarrow">{{ item.course.name }}</p></td>
            </tr>
          </table>
          <div v-if="!topicBasedData.resourcesInfo?.length">
            <NoDataFoundVue />
          </div>
        </div>

        <div class="list-wrap">
          <div class="second-head">
            <div class="main-head">
              <div class="left-head">
                <h2>교육 리포트</h2>
                <div class="view-all pointer" @click="goToEducationReport()">
                  <!-- <p  class="">전체보기</p> -->
                  <img src="@/assets/icons/caretright.svg" />
                </div>
              </div>
            </div>
          </div>
          <table class="divider-table noscrll" v-if="topicBasedData.educationReportInfo?.length">
            <tr class="table-head">
              <th>년도</th>
              <th>세션</th>
              <th>코스</th>
            </tr>
            <tr class="dividertable-three" v-for="item in topicBasedData.educationReportInfo?.slice(0, 3)">
              <td class="first-col">{{ item.course.year }}</td>
              <td>Session {{ item.course.orderNum }}</td>
              <td><p class="">{{ item.course.courseName }}</p></td>
            </tr>
          </table>
          <div v-if="!topicBasedData.educationReportInfo?.length">
            <NoDataFoundVue />
          </div>
        </div>

      </div>
    </div>
  </div>
  <div class="fullwdt" v-else>
    <NoDataFoundVue />
  </div>

  <TopicModal v-if="modelValue" :modelValue="modelValue" :header="header" :data="dataArray" :type="type"
    :tableHeader="tableHeader" @close="modelValue = false" @redirectPage="redirectPage">
  </TopicModal>
</template>
<script setup>
import { onMounted, ref, reactive, watch } from "vue";

import { useRoute, useRouter } from "vue-router";
import moment from "moment";
import TopicModal from "@/components/Class/TopicModal.vue";

const props = defineProps({
  topicBasedData: {
    type: Object,
    default: {},
  },
});


const router = useRouter();
const loaderState = ref(false);

const modelValue = ref(false);
const header = ref("");
const type = ref("");
const dataArray = ref([]);
const tableHeader = ref([]);

const daysMap = {
  1: "일요일",
  2: "월요일",
  3: "화요일",
  4: "수요일",
  5: "목요일",
  6: "금요일",
  7: "토요일",
};



// const getFeedbackTabDetails = async () => {
//   try {
//     loaderState.value = true;
//     const res = await TopicbasedService.getFeedbackTabDetails();
//     if (res.data) {
//       topicBasedData.value = res.data;
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     loaderState.value = false;
//   }
// };

const redirectPage = (item, type) => {
  modelValue.value = false;
  setTimeout(() => {
    if (type == "feedback") {
      router.push({
        name: 'FeedBackDetails',
        params: { unit_id: item.unitInfo.unitId, class_id: item.classInfo.classId, scheduleId: item.scheduleInfo.scheduleId },
      })
    } else if (type == "assessment") {
      router.push(`/assesment-feedback-detail/${props.topicBasedData?.classDetails?.classInfo?.classId}/${props.topicBasedData?.classDetails?.courseInfo?.courseId}/${item.scheduleId}`)
    } else if (type == "resourceRoom") {
      router.push(`/resource-center-list/${props.topicBasedData?.classDetails?.courseInfo?.courseId}/${props.topicBasedData?.classDetails?.classInfo?.classId}`)
    }
  }, 100);


};

const goToFeedback = () => {
  header.value = "선택 주제별 강사 피드백";
  tableHeader.value = ["수업일시", "클래스"];
  dataArray.value = props.topicBasedData.instructorFeedbackInfo;
  modelValue.value = true;
  type.value = "feedback";
};

const goToAssessment = () => {
  header.value = "Assessment 피드백";
  tableHeader.value = ["년도", "세션", "코스"];
  dataArray.value = props.topicBasedData.assementInfo;
  modelValue.value = true;
  type.value = "assessment";
};
const goToResource = () => {
  header.value = "학습 자료실";
  tableHeader.value = ["년도", "세션", "코스"];
  dataArray.value = props.topicBasedData.resourcesInfo;
  modelValue.value = true;
  type.value = "resourceRoom";
};

const goToEducationReport = () => {
  header.value = "교육 리포트";
  tableHeader.value = ["년도", "세션", "코스"];
  dataArray.value = props.topicBasedData.educationReportInfo;
  modelValue.value = true;
  type.value = "educationReport";
};

// onMounted(async () => {
//   await getFeedbackTabDetails();
// });
</script>
