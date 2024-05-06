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
                    class="active"
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
                    :to="{ name: 'Reviewtab', params: { ...$route.params } }"
                  >
                    REVIEW TEST
                  </RouterLink>
                </li>
              </ul>
            </div>
            <!-- <pre> {{ testStore.questions }}</pre> -->

            <!-- <pre>{{ currentQuestion }}</pre> -->
            <div class="tab-body">
              <div class="testTab">
                <div class="course-card">
                  <div class="course-header">
                    <h2>Speaking</h2>
                    <div class="inner-heads" v-if="videos && videos.length > 0">
                      <h3>영상을 시청한 뒤 질문을 듣고</h3>
                      <span>
                        <img src="@/assets/icons/microphone-blk.svg" />
                      </span>

                      <h3>녹음 버튼을 눌러 답하세요.</h3>
                    </div>

                    <div v-else class="inner-heads">
                      <h3>질문을 듣고</h3>
                      <span>
                        <img src="@/assets/icons/microphone-blk.svg" />
                      </span>

                      <h3>녹음 버튼을 눌러 답하세요.</h3>
                    </div>
                  </div>

                  <div class="course-video" v-if="videos && videos.length > 0">
                    <video controls v-for="video in videos">
                      <source
                        :src="`${currentQuestion.image_audio_url}/files/${video.file}`"
                        type="video/webm"
                      />
                    </video>
                  </div>

                  <!-- Images -->
                  <div class="course-imgs" v-if="images && images.length > 0">
                    <span v-for="image in images">
                      <img
                        :src="`${currentQuestion.image_audio_url}/${image.file}`"
                        alt=""
                      />
                    </span>
                  </div>

                  <!-- TODO: work on it -->
                  <!-- <div class="simpleblock">
                    <a href="#">
                      Sample Answer
                      <img src="@/assets/icons/chevron-right-blue.svg" />
                    </a>
                  </div> -->
                  <div class="question-div">
                    <div class="question-header">
                      <h3 class="tgas">Question {{ currentQuestionNo }}</h3>
                      <AudioPlayer
                        v-if="questionAudio"
                        :audioSrc="questionAudio"
                      />
                    </div>
                    <div class="question-body">
                      <span
                        class="asks pointer"
                        @click="showQuestion = !showQuestion"
                      >
                        질문 보기 <img src="@/assets/icons/arrow-right.svg" />
                      </span>
                      <div style="margin-top: 10px" v-show="showQuestion">
                        {{ currentQuestion.sentence?.main?.sentence }}
                      </div>
                    </div>
                  </div>

                  <div class="spekcer">
                    <img
                      v-if="!isAudioRecording"
                      @click="startAudioRecording"
                      style="cursor: pointer"
                      src="@/assets/icons/microphone-icon.svg"
                    />
                    <img
                      style="cursor: pointer"
                      v-else
                      loading="eager"                     
                      @click="onStopRecording"
                      src="@/assets/icons/pause-icon-blue.svg"
                    />
                    <!-- <img
                      style="cursor: pointer"
                      loading="eager"
                      height="60"
                      width="60"
                      @click="stopAudioRecording"
                      src="@/assets/icons/repeat-icon.svg"
                    /> -->
                  </div>

                  <div class="simpletxt">
                    <p>녹음을 완료해야 다음 문제로 넘어갈 수 있습니다.</p>
                  </div>

                  <div class="course-pagination">
                    <div
                      @click="goToPreviousQuestion"
                      class="prev"
                      :style="{
                        cursor:
                          currentQuestionNo <= 1 ? 'not-allowed' : 'pointer',
                      }"
                      :class="{ disabled: currentQuestionNo <= 1 }"
                    >
                      <button>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.9141 15.9596L7.08073 10.1263L12.9141 4.29297"
                            stroke="#181818"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <span>이전</span>
                    </div>
                    <div class="counter">
                      <span class="current">{{ currentQuestionNo }}</span>
                      /<span>{{ totalQuestion }}</span>
                    </div>
                    <div
                      :style="{
                        cursor: canGoNext ? 'pointer' : 'not-allowed',
                      }"
                      @click="goToNextQuestion"
                      class="next"
                      :class="{ disabled: !canGoNext }"
                    >
                      <span>다음</span>
                      <button>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.9141 15.9596L7.08073 10.1263L12.9141 4.29297"
                            stroke="#181818"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LoaderVue :loading="loadingState" />
  </section>
</template>

<script setup>
import { TestActivityService } from "@/services/Activity/testService";
import { onMounted, ref, computed } from "vue";
import { useAudioRecorder } from "@/composables/useAudioRecorder";
import { useTestStore } from "@/stores/useTestStore";
import AudioPlayer from "./AudioPlayer.vue";
import { useRoute, useRouter } from "vue-router";
const testStore = useTestStore();
const testActivityService = new TestActivityService();

const loadingState = ref(true);
const showQuestion = ref(false);

const currentQuestionNo = ref(1);
const totalQuestion = computed(() => testStore.questions.length || 1);

const canGoNext = computed(
  () => currentQuestionNo.value <= totalQuestion.value
);

const isLastQuestion = computed(
  () => currentQuestionNo.value >= totalQuestion.value
);
const currentQuestion = computed(
  () => testStore.questions[currentQuestionNo.value - 1] ?? {}
);

const mediaContents = computed(() => currentQuestion.value.media_contents);

const questionAudio = computed(() => {
  if (!mediaContents.value) return;
  const audio = mediaContents.value.find((media) => media.m_type === "sound");
  return audio
    ? `${currentQuestion.value.image_audio_url}/files/${audio.file}`
    : null;
});

const videos = computed(() => {
  if (!mediaContents.value) return [];
  return mediaContents.value.filter((media) => media.m_type === "video");
});

const images = computed(() => {
  if (!mediaContents.value) return [];
  return mediaContents.value.filter((media) => media.m_type === "image");
});

const router = useRouter();
const route = useRoute();

const {
  isAudioRecording,
  audioElement,
  startAudioRecording,
  stopAudioRecording,
} = useAudioRecorder();

const uploadTestRecording = async () => {
  if (!audioElement.value) return;

  const data = {
    schedule_seq: Number(route.params.schedule_seq),
    test_seq: currentQuestion.value.seq,
    order_num: currentQuestion.value.order_num,
  };

  const fd = new FormData();

  for (const key in data) {
    const element = data[key];
    fd.append(key, element);
  }

  fd.append(
    "test_record",
    audioElement.value,
    `test-recording-${currentQuestion.value.seq}.mp3`
  );

  try {
    loadingState.value = true;
    const res = await testActivityService.activityTestRecordUpload(fd);
    if (res?.data?.recordedFile) {
      // clear audio file
      audioElement.value = null;

      testStore.addNewAnswer({
        seq: currentQuestion.value.seq,
        type: 1,
        value: `${currentQuestion.value.image_audio_url}/files/${res.data.recordedFile.filePath}`,
      });
    }
  } catch (error) {
    console.error("error in recording", error);
  } finally {
    loadingState.value = false;
  }
};

const onStopRecording = async () => {
  stopAudioRecording();
  setTimeout(uploadTestRecording, 500);
};

const goToNextQuestion = async () => {
  if (!canGoNext.value) return;

  if (isLastQuestion.value) {
    return router.push({ name: "Reviewtab", params: { ...route.params } });
  }

  currentQuestionNo.value += 1;
};

const goToPreviousQuestion = () => {
  if (currentQuestionNo.value <= 1) return;

  audioElement.value = null;

  currentQuestionNo.value -= 1;
};

onMounted(async () => {
  try {
    loadingState.value = true;
    await testStore.getStudentActivityTests(route.params.schedule_seq);
  } catch (error) {
    console.error(error);
  } finally {
    loadingState.value = false;
  }
});
</script>
