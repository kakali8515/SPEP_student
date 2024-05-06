<template>
  <section class="home-sec attendance-status">
    <div class="page-cnt-wrap">
      <div class="container">
        <div class="row">
          <div class="web100">
            <div class="tab-area">
              <div class="tab-header" v-if="!getIsMobileViewReady">
                <ul>
                  <li v-for="item in courseList" :key="item.id">
                    <a href="#" :class="item.id == activeId.id ? 'active' : ''" @click="
                activeId = { ...item };
              getAttendanceList(item);
              getProgramDetails(item.class_seq);
              ">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
              <template v-else>
                <MobileTabSlider :tabList="courseList" @updateData="updateData" />
              </template>
              <div class="tab-body">
                <div class="body-wrap">
                  <div class="upper-contents">
                    <!-- <div class="inner-heads">
                      <h2>{{loggedInUser}} <span>님</span></h2>
                    </div> -->
                    <div class="left-wrap">
                      <ul>
                        <li>
                          <h2>프로그램</h2>
                          <p>{{ programDetails.program }}</p>
                        </li>
                        <li class="nb">
                          <h2>차수</h2>
                          <p>{{ programDetails.session }}</p>
                        </li>
                        <li class="nb">
                          <h2>교육 기간</h2>
                          <p>{{ moment(programDetails.start_date).format("YYYY.MM.DD") }} ~ {{
                moment(programDetails.end_date).format("YYYY.MM.DD") }}</p>
                        </li>
                        <li>
                          <h2>시간</h2>
                          <p v-for="(item, index) in programDetails.class_week" :key="index">
                            {{ dayNames[item.week_day] }} {{ item.start_hour }}:{{
                addZeroIfNeeded(item.start_minute)
              }}
                            ~ {{ item.end_hour }}:{{ addZeroIfNeeded(item.end_minute) }}
                          </p>
                        </li>
                        <li class="nb">
                          <h2>장소</h2>
                          <p v-for="(item, index) in programDetails.class_area" :key="index">
                            {{ item.area_d_name_kr }}
                          </p>
                        </li>
                        <li>
                          <h2>강사</h2>
                          <p>{{ programDetails?.teacher }}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="cal-wrap">
                    <div class="inner-page-head">
                      <div class="head-sec">
                        <div class="main-head">
                          <h2>출결현황</h2>
                        </div>
                      </div>
                    </div>
                    <div class="cal-head">
                      <div class="schedule-wrap">
                        <div class="calender-wrap">
                          <button type="button" @click="prevMonth">
                            <img src="@/assets/icons/icon-left.svg" />
                          </button>
                          <div class="date">
                            <h2>{{ year }}년 {{ month }}월</h2>
                          </div>
                          <button type="button" @click="nextMonth">
                            <img src="@/assets/icons/icon-right.svg" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="box-wrap">
                      <div class="box-area">
                        <h2>{{ statusList.first_box_percentage && statusList.first_box_percentage > 0 ?`${statusList.first_box_percentage}%`:"-" }}</h2>
                        <p>누적 출석률</p>
                      </div>
                      <div class="box-area">
                        <h2>{{ statusList.second_box_percentage && statusList.second_box_percentage > 0 ?`${statusList.second_box_percentage}%`:"-" }}</h2>
                        <p>출결 인정 사유 반영 출석률</p>
                      </div>
                      <div class="box-area">
                        <h2>{{ statusList.third_box_percentage && statusList.third_box_percentage > 0 ?`${statusList.third_box_percentage}%`:"-" }}</h2>
                        <p>출결 인정 사유 미반영 출석률</p>
                      </div>
                    </div>
                    <div class="attendance-detail" v-if="statusData?.length">
                      <div class="detail-box" v-for="(item, index) in statusData" :key="index">
                        <div class="date-time">
                          <h2>
                            {{
                moment(item.lesson_date).format("YYYY. MM. DD")
              }}
                          </h2>
                          <h2> {{ item.start_time }} ~ {{ item.end_time }}</h2>
                        </div>
                        <p v-if="bluePresent.includes(item.status)">
                          {{item.code_status_kr }}
                        </p>
                        <p v-if="absent.includes(item.status)" class="redtxt">
                          {{item.code_status_kr }}
                        </p>
                        <p v-if="grayPresent.includes(item.status) || noClass.includes(item.status)" class="greytxt">
                          {{ item.code_status_kr}}
                        </p>
                      </div>
                    </div>
                    <div v-if="!statusData.length" class="nodatas">출석이 없습니다.</div>
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
import { onMounted, ref, reactive, computed } from "vue";
import { AttendanceStatus } from "@/services/Class/AttendanceStatus.js";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
import { useUserData } from "@/stores/useUserData";
const store = useUserData();
import { storeToRefs } from "pinia";
const { getUserData, getIsMobileViewReady } = storeToRefs(useUserData());
const loggedInUser = computed(() => getUserData.value.username_kr);

const AttendanceStatusService = new AttendanceStatus();
const router = useRouter();
const loaderState = ref(false);
const statusList = ref([]);
const courseList = ref([]);
const statusData = ref([]);
const activeId = ref({});
const month = ref(moment().month() + 1);
const year = ref(moment().year());
const currentMoment = ref(moment());
const programDetails = ref({});

const dayNames = {
  'Monday': '월요일',
  'Tuesday': '화요일',
  'Wednesday': '수요일',
  'Thursday': '목요일',
  'Friday': '금요일',
  'Saturday': '토요일',
  'Sunday': '일요일'
};

const addZeroIfNeeded = (number) => {
  return number < 10 ? '0' + number : number;
}

const updateData = (data) => {
  console.log(data)
  activeId.value = { ...data };
  getAttendanceList(data);
  getProgramDetails(data.class_seq);
};

const getProgramList = async () => {
  try {
    loaderState.value = true;
    const res = await AttendanceStatusService.getProgramList();
    if (res.data) {
      let key = "id";
      courseList.value = res.data.list;
      activeId.value = { ...courseList.value[0] };
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const getAttendanceList = async (item) => {
  let data = {
    program2_id: item && item.id ? item.id : activeId.value.id, // required
    class_seq: item && item.class_seq ? item.class_seq : activeId.value.class_seq,
    year: year.value.toString(), // required
    month: month.value.toString(), // required
  };
  try {
    loaderState.value = true;
    const res = await AttendanceStatusService.getAttendanceList(data);
    if (res.data) {
      statusData.value = [];
      statusList.value = [];
      statusList.value = res.data;
      statusData.value = res.data.statusList;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const getProgramDetails = async (item) => {
  let data = {
    class_seq: item ? item : activeId.value.class_seq,
  };
  try {
    loaderState.value = true;
    const res = await AttendanceStatusService.getProgramDetails(data);
    if (res.data) {
      programDetails.value = res.data.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const nextMonth = () => {
  currentMoment.value = currentMoment.value.add(1, "M");
  month.value = currentMoment.value.month() + 1;
  year.value = currentMoment.value.year();
  getAttendanceList();
};
const prevMonth = () => {
  currentMoment.value = currentMoment.value.add(-1, "M");
  month.value = currentMoment.value.month() + 1;
  year.value = currentMoment.value.year();
  getAttendanceList();
};

const grayPresent = ref(["3", "6", "8", "14", "11", "EL", "E", "BA", "F", "U"]);
const bluePresent = ref([
  "1",
  "2",
  "13",
  "15",
  "16",
  "P",
  "L",
  "S",
  "L15",
  "L30",
]);
const absent = ref(["4", "5", "7", "W", "A", "BD"]);
const noClass = ref(["9", "10", "12", "C", "H", "IC"]);

onMounted(async () => {
  await getProgramList();
  await getAttendanceList();
  await getProgramDetails();
});
</script>
