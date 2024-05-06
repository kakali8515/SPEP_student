<template>
  <section class="home-sec assesment">
    <div class="page-cnt-wrap">
      <div class="container">
        <div class="row row-wrap">
          <div class="body-wrap">
            <h1 class="page-title">Assessment 피드백</h1>
            <div class="upper-contents">
              <div class="inner-heads">
                <h2>강한별<span>님</span></h2>
              </div>
              <div class="left-wrap">
                <ul>
                  <li>
                    <h2>강사명</h2>
                    <p>{{ courseDetails.USER_NAME_EN }}</p>
                  </li>
                  <li class="nb">
                    <h2>수업일</h2>
                    <p>{{ courseDetails.CLASS_NAME }}</p>
                  </li>
                  <li>
                    <h2>레슨명</h2>
                    <p>{{ courseDetails.COURSE_NAME }}</p>
                  </li>
                </ul>
              </div>
            </div>
            <p class="dats">제출날짜:2023.06.26</p>
            <template v-if="assessmentDetails.length">
            <div class="radio-wrap mrt60" v-for="category in Object.keys(processedDataWithoutComment)">
              <h2>{{ category }}</h2>
              <div class="full-radio-sec" v-for="item in processedDataWithoutComment[category]">
                <div class="radio-sec">
                  <h2>{{ item.ITEM_TITLE }}</h2>
                  <div class="bullet-points" v-if="!item.ITEM_TYPE">
                    <div class="select-radio" v-for="(data, index) in item.options.slice().reverse()">
                      <input type="radio" :id="data.LFC_SEQ" :value="data.LFC_SEQ" :name="data.LFI_SEQ" :checked="item.answer
                      ? item.answer?.USER_SCORE == data.CASE_CONTENTS
                        ? true
                        : false
                      : index == 0
                      " @change="changeRadioInput($event, data)" />
                      <label :for="data.LFC_SEQ">{{
                      data.CASE_CONTENTS
                    }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dividers"></div>

            <!-- <div class="question-wrap">
              <h2>Subjective Question</h2>
              <div class="question-answer-list">
                <div class="answer-box">
                  <h3>A subjective question is asked.</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Tortor laoreet morbi
                    fringilla scelerisque turpis in blandit. Eleifend tortor ac
                    et pharetra integer augue amet mauris. Quis vulputate
                    faucibus egestas nunc suspendisse tortor.
                  </p>
                </div>
              </div>
            </div> -->

            <div class="dividers"></div>

            <div class="comment-wrap" v-for="category in Object.keys(processedDataWithComment)">
              <div v-for="item in processedDataWithComment[category]">
                <div class="head-wrap">
                  <h2>{{ item.ITEM_TITLE }}</h2>
                  <button>
                    <img src="@/assets/icons/translate.svg" alt="" />번역보기
                  </button>
                </div>
                <textarea :name="item.LFC_SEQ" :value="item.answer?.reply_txt"
                  @change="changeTextareaInput($event, item.options[0])">
                </textarea>
              </div>
            </div>
          </template>
          <div v-if="!assessmentDetails?.length">
            <NoDataFoundVue />
          </div>

            <div class="btn-wrap mrt60">
              <button @click="$router.push({ name: 'TopicBasedDiscussion' });" class="tras-btn">목록으로</button>
              <button :class="answerArray.length==0 ? 'notallow' : ''" :disabled="answerArray.length==0" @click="submitAssessmentDetails">제출하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <LoaderVue :loading="loaderState" />
</template>
<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import { AssessmentService } from "@/services/Class/AssessmentService.js";
import { useRoute, useRouter } from "vue-router";
import { useUserData } from "@/stores/useUserDataCopy";

const Assessment = new AssessmentService();
const loaderState = ref(false);
const route = useRoute();
const courseDetails = ref({});
const assessmentDetails = ref([]);
const processedData = ref([]);
const answerArray = ref([]);
const userStore = useUserData();
const processedDataWithoutComment = computed(() => {
  let final = {};
  // Object.assign(final, processedData.value);
  Object.keys(processedData.value).forEach((category) => {
    final[category] = processedData.value[category].filter((item) => {
      return !item.ITEM_TITLE.includes("Overall Comments");
    });
    // console.log(final)
  });
  return final;
});
const processedDataWithComment = computed(() => {
  let final = {};
  // Object.assign(final, processedData.value);
  Object.keys(processedData.value).forEach((category) => {
    final[category] = processedData.value[category].filter((item) => {
      return item.ITEM_TYPE == 2;
    });
    // console.log(final)
  });
  return final;
});

const changeTextareaInput = (event, item) => {
  let data = {
    lf_seq: item.LF_SEQ,
    lfi_seq: item.LFI_SEQ,
    lfc_seq: item.LFC_SEQ,
    reply_number: item.CASE_ORDER_NUM,
    reply_txt: event.target.value,
    user_score: item.CASE_SCORE,
  };
  let existingObjectIndex = answerArray.value.find(
    (ans) => ans.lfi_seq == item.LFI_SEQ
  );
  if (existingObjectIndex) {
    answerArray.value = answerArray.value.map((ans) => {
      if (ans.lfi_seq == item.LFI_SEQ) {
        ans = data;
      }
      return ans;
    });
  } else {
    answerArray.value.push(data);
  }
  console.log(answerArray.value);
};

const changeRadioInput = (event, item) => {
  let data = {
    lf_seq: item.LF_SEQ,
    lfi_seq: item.LFI_SEQ,
    lfc_seq: item.LFC_SEQ,
    reply_number: item.CASE_ORDER_NUM,
    reply_txt: "",
    user_score: item.CASE_SCORE,
  };
  let existingObjectIndex = answerArray.value.find(
    (ans) => ans.lfi_seq == item.LFI_SEQ
  );
  if (existingObjectIndex) {
    answerArray.value = answerArray.value.map((ans) => {
      if (ans.lfi_seq == item.LFI_SEQ) {
        ans = data;
      }
      return ans;
    });
  } else {
    answerArray.value.push(data);
  }
};

const getAssessmentDetails = async () => {
  const data = {
    //course_seq: "83", //required
    //target_id: "heesu56",
    target_id: userStore.getUserData?.user_id,
    course_seq: route.params.course_id,
  };
  try {
    loaderState.value = true;
    const res = await Assessment.getAssessmentDetails(data);
    if (res.data.success) {
      assessmentDetails.value = res.data.formData;
      // answerArray.value = res.data.AnserArray[0].replyArray;
      courseDetails.value = res.data.courseDetals[0];

      processedData.value = res.data.formData?.reduce((final, current) => {
        if (!final[current.category_name]) final[current.category_name] = [];

        current.answer = res.data.AnserArray[0]?.replyArray?.find((answer) => {
          return (
            answer.LF_SEQ == current.LF_SEQ && answer.LFI_SEQ == current.LFI_SEQ
          );
        });
        if (current.answer) {
          changeRadioInput(
            {},
            {
              ...current.answer,
              CASE_SCORE: current.answer.REPLY_NUMBER,
              CASE_ORDER_NUM: current.answer.REPLY_NUMBER,
            }
          );
        }

        final[current.category_name].push(current);
        return final;
      }, {});
      console.log("pro---", processedData.value);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const submitAssessmentDetails = async () => {
  const data = {
    user_id: userStore.getUserData?.user_id,
    //class_seq: "10767",
    class_seq: route.params.class_id,
    //course_seq: "83",
    course_seq: route.params.course_id,
    target_id: userStore.getUserData?.user_id,
    answerArray: answerArray.value,
    //schedule_seq: "124",
    schedule_seq: route.params.schedule_seq,
  };
  console.log("data", data);
  try {
    loaderState.value = true;
    const res = await Assessment.submitAssessmentDetails(data);
    if (res.status == 200) {
      getAssessmentDetails();
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

onMounted(async () => {
  await userStore.getUserDetails();
  await getAssessmentDetails();
});
</script>
