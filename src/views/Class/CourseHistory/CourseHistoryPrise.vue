<template>
  
  <div class="congratulate-box" v-if="viewClassBestStudentData && viewClassBestStudentData.length>0">
    <div class="container">
      <div class="congratulations-text">
        <div class="txt-area">
          <div class="staic-txt">
            <h3>축하합니다! <br> 2023 Session2 <span>Best Student</span> 로 <br> 선정되셨습니다!</h3>            
          </div>           
          <button @click="displayBestStudentModal = true" class="see-medals">메달 전체보기 </button>         
        </div>  
        <div class="congratulations-img">
          <img src="@/assets/images/congratulations-img2.png" alt=""/>
        </div>      
      </div>      
    </div>    
  </div>

  <div class="congratulate-box-nodata"  v-else>
    <div class="container">
      <div class="nodats-box">
        <p>보유한 메달이 없습니다</p>
      </div>
    </div>
  </div>
  
  <div class="activity-body courseprise">
    <div class="container">
      
      <div class="title-desc">
        <h4 class="title">나의 주제</h4>
        <p class="desc">나의 주제에 대한 설명이 들어갑니다.</p>
      </div>
      
      <div class="tag-box" v-if="viewClassCourseHistoryMyTopicsData && ((viewClassCourseHistoryMyTopicsData.group_1 && viewClassCourseHistoryMyTopicsData.group_1.length > 0) || (viewClassCourseHistoryMyTopicsData.group_2 && viewClassCourseHistoryMyTopicsData.group_2.length > 0 ) || (viewClassCourseHistoryMyTopicsData.group_3 && viewClassCourseHistoryMyTopicsData.group_3.length > 0) || (viewClassCourseHistoryMyTopicsData.group_4 && viewClassCourseHistoryMyTopicsData.group_4.length > 0))">

        <span class="tag grey" v-if="viewClassCourseHistoryMyTopicsData && viewClassCourseHistoryMyTopicsData.group_1.length>0"  v-for="(dataMyTopicG1, indexMyTopicG1) in viewClassCourseHistoryMyTopicsData.group_1">
          {{ dataMyTopicG1 }}
        </span>

        <span class="tag light-blue" v-if="viewClassCourseHistoryMyTopicsData && viewClassCourseHistoryMyTopicsData.group_2.length>0"  v-for="(dataMyTopicG2, indexMyTopicG2) in viewClassCourseHistoryMyTopicsData.group_2">
          {{ dataMyTopicG2 }}
        </span>

        <span class="tag drk-blu" v-if="viewClassCourseHistoryMyTopicsData && viewClassCourseHistoryMyTopicsData.group_3.length>0"  v-for="(dataMyTopicG3, indexMyTopicG3) in viewClassCourseHistoryMyTopicsData.group_3">
          {{ dataMyTopicG3 }}
        </span>

        <span class="tag drk-blu-bfont" v-if="viewClassCourseHistoryMyTopicsData && viewClassCourseHistoryMyTopicsData.group_4.length>0"  v-for="(dataMyTopicG4, indexMyTopicG4) in viewClassCourseHistoryMyTopicsData.group_4">
          {{ dataMyTopicG4 }}
        </span>

        <!-- <span class="tag">Transform</span>
        <span class="tag">Data</span>
        <span class="tag grey">Transform</span>
        <span class="tag grey">Insights</span>
        <span class="tag light-blue">Customize</span>
        <span class="tag light-blue">Customize</span>
        <span class="tag light-blue">Insights</span>
        <span class="tag light-blue">Customize</span>
        <span class="tag drk-blu">Data</span>
        <span class="tag drk-blu">Insights</span>
        <span class="tag drk-blu">Sentiment</span>
        <span class="tag drk-blu-bfont">Sentiment</span>
        <span class="tag drk-blu-bfont">Transform</span>
        <span class="tag drk-blu-bfont">Transform</span>
        <span class="tag drk-blu">Sentiment</span>
        <span class="tag drk-blu">Color</span>
        <span class="tag drk-blu">Customize</span>
        <span class="tag light-blue">Transform</span>
        <span class="tag light-blue">Sentiment</span>
        <span class="tag light-blue">Word</span>
        <span class="tag light-blue">Sentiment</span>
        <span class="tag">Color</span>
        <span class="tag">Customize</span>
        <span class="tag">Insights</span>
        <span class="tag">Sentiment</span> -->
      </div>
      <NoDataFoundVue v-else />

      <div class="topics-wrapper">
        <div class="topics-box">
          <h6 class="title">선호 주제</h6>
          <ul class="list" v-if="viewClassCourseHistoryPreferredTopicData && viewClassCourseHistoryPreferredTopicData.length>0">
            <li v-for="(dataPreferredTopic, indexPreferredTopic) in viewClassCourseHistoryPreferredTopicData">
              <span class="rank " :class="{
                  'first': indexPreferredTopic === 0,
                  'second': indexPreferredTopic === 1,
                  'third': indexPreferredTopic === 2
                }">{{ indexPreferredTopic + 1 }}위
              </span>
              <span class="name">{{ dataPreferredTopic.title }}</span>
            </li>
          </ul> 
          <NoDataFoundVue v-else />
        </div>
        <div class="topics-box">
          <h6 class="title">학습이 필요한 주제</h6>
          <ul class="list" v-if="viewClassCourseHistoryTopicsToLearnData && viewClassCourseHistoryTopicsToLearnData.length>0">
            <li v-for="(dataTopicToLearn, indexTopicToLearn) in viewClassCourseHistoryTopicsToLearnData">
              <span class="rank " :class="{
                  'first': indexTopicToLearn === 0,
                  'second': indexTopicToLearn === 1,
                  'third': indexTopicToLearn === 2
                }">{{ indexTopicToLearn + 1 }}위
              </span
              ><span class="name">{{ dataTopicToLearn.title }}</span>
            </li>
          </ul>
          <NoDataFoundVue v-else />
        </div>
      </div>
      <div class="dividers"></div>
      <div class="title-desc">
        <h4 class="title">나의 S.P.A. Question Types</h4>
        <p class="desc">나의 S.P.A. Question Types에 대한 설명이 들어갑니다.</p>
      </div>
      <div class="graph-chart mb-60">
        <div class="graph-wrapper">
          <!-- <img src="@/assets/images/graph-img.png" alt="" /> -->
          <PieChart
              :seriesData="series"
              :categoriesData="categories"
              :title="chartTitle"
            ></PieChart>
        </div>
        <div class="explanation-box">
          <!-- <p style="margin-bottom: 32px">
            그래프에 대한 설명이 여기에 뜰 예정.
          </p> -->
          <p>
            {{ traineeName }}님이 가장 많이 학습한 문제 유형은 {{type1}}입니다. {{type2}}, {{type3}} 관련 액티비티를 학습하고 S.P.A. 점수를 향상해보세요.
          </p>
        </div>
      </div>

      <div class="title-desc">
        <h4 class="title">내가 획득한 뱃지</h4>
        <p class="desc">내가 획득한 뱃지에 대한 설명이 들어갑니다.</p>
      </div>
      <BadgesEarnedSection v-if="viewAllBadgesEarnedData.length" v-for="(item, idx) in viewAllBadgesEarnedData" :key="'badge-section-' + idx" :section="idx" :data="item" />
      <NoDataFoundVue v-else />
      
      <!-- <div class="course-episode-title">
        <h6>Business Core Competencies Pro</h6>
        <p><span>수강횟수:</span><span>2회</span></p>
      </div>
      <div class="course-cards-wrapper">
        <div class="each-card">
          <div class="white-board"></div>
          <span>Presentations</span>
        </div>
        <div class="each-card">
          <div class="white-board"></div>
          <span>Meetings&Negotiations</span>
        </div>
        <div class="each-card">
          <div class="white-board"></div>
          <span>E-mail Writing</span>
        </div>
        <div class="each-card">
          <div class="white-board"></div>
          <span>Presentations</span>
        </div>
      </div>

      <hr class="course-divider" />

      <div class="course-episode-title">
        <h6>Job & Field-Specific Customized</h6>
        <p><span>수강횟수:</span><span>2회</span></p>
      </div>
      <div class="course-cards-wrapper mb-60">
        <div class="each-card">
          <div class="white-board"></div>
          <span>Sales</span>
        </div>
        <div class="each-card">
          <div class="white-board"></div>
          <span>Sales</span>
        </div>
      </div> -->
      <div class="dividers"></div>
      <div class="title-desc">
        <h4 class="title">
          수강내역
          <button class="see-medals" @click="$router.push('/history-prise-view-all')">
          <img src="@/assets/icons/arrow-right-blk.svg" />
          </button>
        </h4>
        <p class="desc">수강내역에 대한 설명이 들어갑니다.</p>
      </div>

      


      <div class="tableDiv">
        <table class="notice-table mobwidt">
          <thead>
            <tr class="table-head">
              <th>년도</th>
              <th>세션</th>
              <th>프로그램</th>
              <th>코스</th>
            </tr>
          </thead>
          <tbody v-if="viewAllCourseHistData.length>0">  
            <!-- ${dataCourseHist.program2_seq} $router.push(`/attendance-status`)-->
            <tr v-for="(dataCourseHist, indexCourseHist) in viewAllCourseHistData.slice(0, 4)"  @click="displayAttendanceStatusModal = true; 
                    yearVal = dataCourseHist.year; 
                    monthVal = moment().month();
                    program2Id = dataCourseHist.program2_seq;
                    classSeqId = dataCourseHist.class_seq;
                    program2Val = dataCourseHist.program2;
                    header = dataCourseHist.program2;
                    ">
              <td class="first-col">{{ dataCourseHist.year }}</td>
              <td>Session {{ dataCourseHist.session }}</td>
              <td>{{ dataCourseHist.program2 }}</td>
              <td>{{ dataCourseHist.coursename }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td class="not" colspan="4"><NoDataFoundVue /></td>
            </tr>            
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <BestStudentModal v-if="displayBestStudentModal" v-model="displayBestStudentModal" @close="displayBestStudentModal = false" :imageName="imageName" />
  
  <AttendanceStatusModal v-if="displayAttendanceStatusModal"  :header="header" v-model="displayAttendanceStatusModal" @close="displayAttendanceStatusModal = false" :month="monthVal" :year="yearVal"  :program2_id="program2Id" :class_seq="classSeqId" :trainee_name="traineeName" :program2="program2Val" />
  
  <LoaderVue :loading="loaderState" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { CourseHistory } from "@/services/Class/CourseHistory/CourseHistory.js";
import BestStudentModal from "@/components/Class/BestStudentModal.vue";
import AttendanceStatusModal from "@/components/Class/AttendanceStatusModal.vue";
import PieChart from "@/views/Class/CourseHistory/PieChart.vue";
import { useUserData } from "@/stores/useUserData";
import BadgesEarnedSection from "@/components/Class/BadgesEarnedSection.vue";
import moment from "moment";

// export default {};
const loaderState = ref(false);
const monthVal = ref();
const program2Val = ref("");
const yearVal = ref();
const program2Id = ref();
const classSeqId = ref();
const header = ref("");

const viewClassCourseHistoryPreferredTopicData = ref([]);
const viewClassCourseHistoryTopicsToLearnData = ref([]);
const viewClassCourseHistoryMyTopicsData = ref();
const viewClassBestStudentData = ref([]);
const viewAllCourseHistData = ref([]);
const viewAllClassHistorySPAQuestionTypesData = ref([]);
const viewAllBadgesEarnedData = ref([]);

const displayBestStudentModal = ref(false);
const displayAttendanceStatusModal = ref(false);
const imageName = ref("group-img1.svg");
const categories = ref([]);
const series = ref([]);
const chartTitle = ref("나의 S.P.A. Question Types");
const type1 = ref();
const type2 = ref();
const type3 = ref();
const flagShow = ref();
const userStore = useUserData();
const traineeName = ref(userStore.getUserData.username_kr);


const courseListService = new CourseHistory();

const getClassCourseHistoryPreferredTopic = async () => {
  try {
    loaderState.value = true;
    const res = await courseListService.getClassCourseHistoryPreferredTopic();
    viewClassCourseHistoryPreferredTopicData.value = res.data.data;
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const getClassCourseHistoryTopicsToLearn = async () => {
  try {
    loaderState.value = true;
    const res = await courseListService.getClassCourseHistoryTopicsToLearn();
    viewClassCourseHistoryTopicsToLearnData.value = res.data.data;
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const getClassCourseHistoryMyTopics = async () => {
  try {
    loaderState.value = true;
    const res = await courseListService.getClassCourseHistoryMyTopics();
    viewClassCourseHistoryMyTopicsData.value = res.data.data;
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const getClassBestStudent = async () => {
  try {
    loaderState.value = true;
    const res = await courseListService.getClassBestStudent();
    viewClassBestStudentData.value = res.data.data;
    
     
    if(res.data.data && res.data.data.length>0){
      flagShow.value = 2;
      for (const itemClassBestStudent of res.data.data) {
          if (itemClassBestStudent.best_type === "class") {
            flagShow.value = 1; 
              break; 
          }
      }
      if(flagShow.value == 2) {
        imageName.value = "group-img2.svg";
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const courseHistoryViewAll = async () => {
  try {
    loaderState.value = true;
    const res = await courseListService.getCourseListViewALL();
    viewAllCourseHistData.value = res.data.list;
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const getClassHistorySPAQuestionTypes = async () => {
  try {
    loaderState.value = true;
    const res = await courseListService.getClassHistorySPAQuestionTypes();
    viewAllClassHistorySPAQuestionTypesData.value = res.data.data;
    
    type1.value = res.data.data && res.data.data.type1?res.data.data.type1:'';
    type2.value = res.data.data && res.data.data.type2?res.data.data.type2:'';
    type3.value = res.data.data && res.data.data.type3?res.data.data.type3:'';
    if(res.data.data && res.data.data.questionTypeData){      
      for (const keyCat in res.data.data.questionTypeData) {
          if (Object.hasOwnProperty.call(res.data.data.questionTypeData, keyCat)) {
            categories.value.push(keyCat);
            series.value.push(res.data.data.questionTypeData[keyCat].percentage?res.data.data.questionTypeData[keyCat].percentage:0);
          }
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const getClassHistoryBadgesEarned = async () => {
  try {
    loaderState.value = true;
    const res = await courseListService.getClassHistoryBadgesEarned();
    viewAllBadgesEarnedData.value = res.data.data;
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

onMounted(async () => {
  await Promise.all([
    userStore.getUserDetails(),
    getClassCourseHistoryPreferredTopic(),
    getClassCourseHistoryTopicsToLearn(),
    getClassCourseHistoryMyTopics(),
    getClassBestStudent(),
    courseHistoryViewAll(),
    getClassHistorySPAQuestionTypes(),
    getClassHistoryBadgesEarned()
  ]);
});
</script>

<style></style>
