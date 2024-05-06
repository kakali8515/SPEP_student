<template>
  <div class="activity-body">
    <div class="activity-container">
      <article class="course-card mb-30">
        <div class="about-course">
          <div class="course-info">
            <p class="course-name">[과정명] 교재, 레슨 정보</p>
            <h6 class="course-title">
              여기에 타이틀이 들어갑니다.여기에 타이틀이 들어갑니다.여기에
              타이틀이 들어갑니다.
            </h6>
            <p class="publish-date">2023. 9. 28</p>
          </div>
        </div>
      </article>
      <article class="course-card">
        <div class="instruction-box">
          <p>Lina와 Jake의 대화를 듣고 발음에 유의하며 따라해 보세요!</p>
          <p>Lina: Lina 역할 / position</p>
          <p>Jake : Jake 역할 / position</p>
        </div>
        <div class="with-bookmark">
          <div class="lang-btns">
            <button
              :class="{ selected: showEnglishText }"
              @click="showEnglishText = !showEnglishText"
            >
              A
            </button>
            <button
              :class="{ selected: showKoreanText }"
              @click="showKoreanText = !showKoreanText"
            >
              가
            </button>
            <button class="listen-full">
              <NormalAudioPlayer
                :audio-url="`https://exi.spep.co.kr/files/news/20231222/20240131-English%20Review.mp3`"
                :id="`dialog-player`"
                :timerHidden="true"
                playIcon="assets/icons/Play-small-blue.svg"
              />전체 듣기
            </button>
          </div>
          <div class="bookmark">
            <button class="bookmark-btn active">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M21 24.125L13.9992 19.75L7 24.125V4.875C7 4.64294 7.09219 4.42038 7.25628 4.25628C7.42038 4.09219 7.64294 4 7.875 4H20.125C20.3571 4 20.5796 4.09219 20.7437 4.25628C20.9078 4.42038 21 4.64294 21 4.875V24.125Z"
                  stroke="#0C60C2"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="convo-section">
          <ChatMessage
            v-for="(dialog, i) in dialogues"
            :key="i"
            :dialog="dialog"
            :idx="i"
            :showEnglishText
            :showKoreanText
          />
        </div>
        <!-- <div class="quiz-section">
          <div class="quiz-header">
            <span class="q-no">Question 1</span>
            <h2>아래 보기중에 Lina와 Jake가 대화를 나눈 목적은 무엇일까요?</h2>
          </div>
          <div class="result mb-0">
            <img src="@/assets/icons/CheckCircle.svg" alt="" />
            <span class="green">정답입니다!</span>
          </div>
          <div class="result mb-0">
            <img src="@/assets/icons/WarningCircle.svg" alt="" />
            <span class="grey">다시 시도해 보세요</span>
          </div>
          <div class="ans-options">
            <div class="single-option selected">
              <svg
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Check">
                  <path
                    id="Vector"
                    d="M23.625 8.375L11.375 20.6245L5.25 14.5"
                    stroke="#E4E9EF"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>

              <p>a. Different</p>
            </div>
            <div class="single-option">
              <svg
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Check">
                  <path
                    id="Vector"
                    d="M23.625 8.375L11.375 20.6245L5.25 14.5"
                    stroke="#E4E9EF"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>

              <p>b. Type of quizzes</p>
            </div>
            <div class="single-option">
              <svg
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Check">
                  <path
                    id="Vector"
                    d="M23.625 8.375L11.375 20.6245L5.25 14.5"
                    stroke="#E4E9EF"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>

              <p>c. Appear</p>
            </div>
            <div class="single-option">
              <svg
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Check">
                  <path
                    id="Vector"
                    d="M23.625 8.375L11.375 20.6245L5.25 14.5"
                    stroke="#E4E9EF"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>

              <p>d. Here</p>
            </div>
          </div>
        </div>
        <div class="action-area">
          <button class="tips-btn">
            <img src="@/assets/icons/light-bulb.svg" alt="" />TIP!
          </button>
          <button class="center-align blue-button">정답확인</button>
        </div> -->
        <!-- <PaginationComponent></PaginationComponent> -->
        <SPagination
          v-model="currentPage"
          :totalPages="1"
          doNotDisableNext
          @next="onSubmitQuiz"
        />
      </article>
    </div>
    <LoaderVue :loading="loadingState" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import SPagination from "@/components/pagination/SPagination.vue";
import { useAudioRecorder } from "@/composables/useAudioRecorder";
import { TestActivityService } from "@/services/Activity/testService";
import ChatMessage from "./ChatMessage.vue";
import { useRoute, useRouter } from "vue-router";
const testActivityService = new TestActivityService();

const currentPage = ref(1);
const showEnglishText = ref(true);
const showKoreanText = ref(true);

const loadingState = ref(false);
const dialogues = ref([]);

const getTests = async () => {
  loadingState.value = true;
  const res = await testActivityService.getStudentActivityTests();
  loadingState.value = false;
  if (res?.status === 200 && res?.data?.data) {
    const flashCardModule = res.data.data.find((x) => x.target === "Dialogue");
    dialogues.value = flashCardModule?.items ?? [];
    // debugger;
  }
};

const router = useRouter();
const route = useRoute();

const scheduleSeq = computed(route.params.schedule_seq ?? "");
const listening_seq = dialogues.value.map((item) => item.vocab_seq);

const submitActivity = async () => {
  const data = {
    module: {
      module_type: "Dialogue",
      unit_seq: scheduleSeq.value,
      status: {
        seq: listening_seq.value,
      },
      count: dialogues.value.length,
    },
  };
  console.log(data);
  //return
  try {
    await ShadowingService.submitActivityData(data);
  } catch (error) {
    console.log(error);
  } finally {
    // loadingState.value = false;
  }
};

const onSubmitQuiz = () => {
  submitActivity();
  router.push({
    name: "Complete",
    params: {
      schedule_seq: scheduleSeq.value,
      module_name: "Dialogue",
    },
  });
};
onMounted(() => {
  getTests();
});
</script>

<style></style>
