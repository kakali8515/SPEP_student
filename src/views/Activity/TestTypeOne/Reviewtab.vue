<template>
  <section class="activity-body">
    <div class="page-cnt-wrap">
      <div class="container">
        <div class="test-type-area">
          <div class="tab-area">
            <div class="tab-header">
              <ul>
                <li>
                  <RouterLink
                    :to="{
                      name: 'Speakingtestvideo',
                      params: { ...$route.params },
                    }"
                  >
                    TEST
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    class="active"
                    :to="{ name: 'Reviewtab', params: { ...$route.params } }"
                  >
                    REVIEW TEST
                  </RouterLink>
                </li>
              </ul>
            </div>
            <div class="tab-body">
              <div class="reviewTab-content">
                <div class="course-card">
                  <div class="date-time">
                    테스트 일시: {{ moment().format("YYYY. MM. DD") }}
                  </div>

                  <div class="review-qust-ans-area">
                    <div class="reviewBoxarea">
                      <!-- api answer loop on below this div -->
                      <div
                        class="question-div"
                        v-for="(question, idx) in testStore.questions"
                        :key="idx"
                      >
                        <div class="question-header">
                          <h3 class="tgas">Question {{ idx + 1 }}</h3>
                          {{ getAudio(question) }}
                          <AudioPlayer
                            v-if="getAudio(question)"
                            :audio-src="getAudio(question)"
                          />
                        </div>
                        <div class="question-body">
                          <h3>
                            {{ question.sentence?.main?.sentence }}?
                            <!-- Which one do you prefer and why? Which one do you
                            prefer and why? Which one do you prefer and why?
                            Which one do you prefer and why? -->
                          </h3>
                        </div>
                        <div
                          class="answer-body"
                          v-if="getAnswerAudio(question.seq)"
                        >
                          <h2>My Answer</h2>
                          <AudioPlayer
                            :icon-play="playImg"
                            :audio-src="getAnswerAudio(question.seq)"
                          />
                        </div>

                        <div class="answer-body" v-else>
                          <h2>Not Answered</h2>
                        </div>
                      </div>

                      <!-- NOTE: Question type 2 -->
                      <!-- <div class="question-div">
                        <div class="question-header">
                          <h3 class="tgas">Question 1</h3>
                          <span
                            ><img src="@/assets/icons/volume-blue.svg"
                          /></span>
                        </div>
                        <div class="question-body">
                          <h3>
                            Which one do you prefer and why? Which one do you
                            prefer and why? Which one do you prefer and why?
                            Which one do you prefer and why?
                          </h3>
                        </div>
                        <div class="answer-body">
                          <p>
                            Police in Massachusetts say that... There shouldn’t
                            be any limit to how much text can appear in the
                            quizzes. It could be as long as it needs to be.
                            There shouldn’t be any limit to how much text can
                            appear in the quizzes. It could be as long as it
                            needs to be.
                          </p>
                        </div>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <div style="text-align: center; margin-top: 20px">
      <button class="confirm_btn btn-primary btn" @click="completeTest">
        확인
      </button>
    </div>
    <LoaderVue :loading="loadingState" />
  </section>
</template>

<script setup>
import playImg from "@/assets/icons/play.svg";
import moment from "moment";
import { useTestStore } from "@/stores/useTestStore";
import { TestActivityService } from "@/services/Activity/testService";
import { useRoute, useRouter } from "vue-router";
import AudioPlayer from "./AudioPlayer.vue";
import { onMounted, ref } from "vue";

const router = useRouter();
const testActivityService = new TestActivityService();

const testStore = useTestStore();

const loadingState = ref(false);

const getAudio = (question) => {
  if (!question.media_contents) return;
  const audio = question.media_contents.find(
    (media) => media.m_type === "sound"
  );
  return audio ? `${question.image_audio_url}/files/${audio.file}` : null;
};

const getAnswerAudio = (seq) => testStore.answerData[seq]?.value;

const route = useRoute();
const completeTest = async () => {
  try {
    loadingState.value = true;

    const { answerData, lastQuestion, totalAnswers, totalQuestions } =
      testStore;

    const answerPercentage = (totalAnswers / totalQuestions) * 100;

    const payload = {
      module: {
        module_type: "test",
        unit_seq: route.params.schedule_seq ?? "",
        unit_test_status: {
          answer_data: answerData,
          last_order_num: lastQuestion?.order_num,
        },
        unit_test_count: totalAnswers,
        unit_test_score: answerPercentage,
      },
    };

    // debugger;
    const res = await testActivityService.finishTest(payload);

    if (res.status === 200) {
      router.push("/");
    }
  } catch (error) {
    console.error("can`t finish test:", error);
  } finally {
    loadingState.value = false;
  }
};

onMounted(() => {
  if (testStore.totalQuestions === 0) {
    router.push("/speaking-test-video");
  }
});
</script>

<style>
.confirm_btn {
  /* padding-inline: 100px; */
  padding: 10px 130px;
}
</style>
