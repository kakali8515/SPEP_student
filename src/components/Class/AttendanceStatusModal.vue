<template>
    <ModalComp v-if="modelValue" mWidth="902px" :show="modelValue" @close="$emit('update:modelValue', false)" :heading="programDetails.isSPA?'S.P.A Prep Course':'Topic-Based Discussions'">
        <!-- <div class="rec-modal-sec"> -->
        <template #header>
        </template>
        <template #body>
          <div class="course-history-prise-modal">
              <div class="body-wrap">
                  <div class="upper-contents">
                      <div class="inner-heads">
                        <h2>{{ props.trainee_name }} <span>님</span></h2>
                        <div class="rgt-txt">
                          <span><img src="@/assets/icons/chart-bar.svg"></span>
                          <span>{{ programDetails.isSPA?"S.P.A":"Non S.P.A" }}</span>
                          <span>target score |</span>
                          <span>{{ programDetails.total_points?programDetails.total_points:0 }}dot</span>
                        </div>
                      </div>
                      <div class="left-wrap">
                          <ul>
                              <li>
                              <h2>프로그램</h2>
                              <p>{{ programDetails.program2?programDetails.program2:"-" }}</p>
                              </li>
                              <li class="nb">
                              <h2>차수</h2>
                              <p>{{ programDetails.session?programDetails.session:"-" }}</p>
                              </li>
                              <li class="nb">
                                  <h2>교육 기간</h2>
                                  <p>{{ programDetails.start_date?`${programDetails.start_date} ~ ${programDetails.end_date}`:"-" }}</p>
                              </li>
                              <li>
                              <h2>시간</h2>
                              <p  v-if="programDetails.class_week"
                                  v-for="(item, index) in programDetails.class_week"
                                  :key="index"
                              >
                                  {{ dayNames[item.week_day] }} {{ item.start_hour }}:{{
                                  addZeroIfNeeded(item.start_minute)
                                  }}
                                  ~ {{ item.end_hour }}:{{ addZeroIfNeeded(item.end_minute) }}
                              </p>
                              <p v-else>-</p>
                              </li>
                              <li class="nb">
                              <h2>장소</h2>
                              <p>
                                  {{ programDetails.location_kr?programDetails.location_kr:"-" }}
                              </p>
                              </li>
                              <li>
                              <h2>강사</h2>
                              <p>{{ programDetails.teacher?programDetails.teacher:"-" }}</p>
                              </li>
                          </ul>
                          
                      </div>
                  </div>
                  <div class="cal-wrap">
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
                  </div>
                  <div class="modal-buttom-area">
                      <button class="btn" @click="$emit('update:modelValue', false)">Close</button>
                  </div>
              </div>
          </div>
        </template>
        <template #footer></template>

        <!-- </div> -->
    </ModalComp>

    <LoaderVue :loading="loaderState" />
</template>

<script setup>
import { ref, onMounted, computed, callWithErrorHandling } from "vue";
import { AttendanceStatus } from "@/services/Class/AttendanceStatus.js";
const AttendanceStatusService = new AttendanceStatus();

const loaderState = ref(false);
const programDetails = ref({});
const statusList = ref([]);
const statusData = ref([]);
// const activeId = ref({});
// const month = ref(moment().month() + 1);
// const year = ref(moment().year());
// const currentMoment = ref(moment());

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    header: {
      type: String,
      default: "",
    },
    program2_id: {
        type: Number,
        default: 0
    },
    year : {
        type: Number,
        default: 0
    },
    month : {
        type: Number,
        default: 0
    },
    class_seq : {
        type: Number,
        default: 0
    },
    trainee_name : {
        type: String,
        default: ""
    },
    program2 : {
        type: String,
        default: ""
    }
});

const emits = defineEmits(['update:modelValue', 'close']);

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

const getAttendanceList = async () => {
  const data = {
    program2_id: props.program2_id, 
    year: props.year.toString(), 
    month: props.month.toString(), 
    class_seq: props.class_seq
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
  const dataProgram = {
    class_seq: props.class_seq,
  };

  try {
    loaderState.value = true;
    const res = await AttendanceStatusService.getProgramDetails(dataProgram);
    if (res.data) {
      programDetails.value = res.data.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

onMounted(async () => {
    await Promise.all([
        getAttendanceList(),
        getProgramDetails()
    ]);
});
</script>