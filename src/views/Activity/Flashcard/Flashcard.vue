<template>
  <div class="activity-body">
    <div class="activity-container">
      <article class="course-card mb-30">
        <div class="about-course">
          <div class="course-info">
            <p class="course-name">[{{ course.lecture_name }}], {{ course.unit_title }}</p>
            <h6 class="course-title">{{ itemData.title }}</h6>
            <p class="publish-date">{{ moment(itemData.reg_date).format('YYYY. MM. DD') }}</p>
          </div>
        </div>
      </article>

      <article class="course-card">
        <div class="with-bookmark">
          <div class="lang-btns">
            <button :class="{ selected: showEnglishText }" @click="showEnglishText = !showEnglishText">
              A
            </button>
            <button :class="{ selected: showKoreanText }" @click="showKoreanText = !showKoreanText">
              가
            </button>
            <button @click="showEnglishText = true; showKoreanText = true"><img src="@/assets/icons/shuffle.svg"
                alt="" /></button>
          </div>
          <div class="bookmark">
            <button @click="addBookamrk" class="bookmark-btn active">
              <img src="@/assets/icons/bookmark.svg" alt="" />
            </button>
          </div>
        </div>
        <div class="flashcard-content">
          <div class="sentence">
            <p class="speak-sentence" v-if="itemData.result?.similarityScore && itemData.result?.similarityScore < 80">
              {{ itemData.result?.similarityScore ? parseInt(itemData.result?.similarityScore) : 0 }}% 일치
            </p>

            <p class="speak-sentence greentxt"
              v-if="itemData.result?.similarityScore && itemData.result?.similarityScore > 80">
              {{ itemData.result?.similarityScore ? parseInt(itemData.result?.similarityScore) : 0 }}% 일치
            </p>

            <div class="hint">
              <p v-if="!isActiveAudioRecording && !itemData.result?.similarityScore">먼저 문장을 들어보세요</p>

              <span v-else-if="isActiveAudioRecording && !itemData.isRecorded" class="tgas-btn">녹음 버튼을 눌러 똑같이 따라 읽어
                보세요</span>

              <span v-if="itemData.result?.similarityScore && itemData.result?.similarityScore < 80"
                class="tgas-btn grey-tags">다시 시도해 보세요</span>
              <span v-if="itemData.result?.similarityScore && itemData.result?.similarityScore > 80"
                class="tgas-btn green-tags">다시 시도해 보세요</span>

              <!-- <p v-else-if="true">녹음 버튼을 눌러 똑같이 따라 읽어 보세요</p>
              <p v-else-if="true">스피킹 하세요</p> -->
            </div>
            <p class="en" v-if="showEnglishText">
              {{ itemData.vocabulary }}
            </p>
            <p class="ko" v-if="showKoreanText">
              {{ itemData.meaning }}
            </p>
          </div>
          <div class="media-options">
            <!-- <button><img src="@/assets/icons/shuffle.svg" alt="" /></button> -->
            <button>
              <!-- <img src="@/assets/icons/headphone-icon.svg" alt="" /> -->

              <!-- <NormalAudioPlayer playIcon="assets/icons/SpeakerHigh.svg"
                :audio-url="`https://exi.spep.co.kr/files/listening/Ex_i31_u1_lesson1_dialogue.mp3`"
                :id="`feedback-player-${itemData.vocab_seq}`" @audioPaused="handlePauseVideo" :timerHidden="true"
                @audioPlayed="handlePlayVideo" @audioEnded="audioPlayEnded" /> -->

              <NormalAudioPlayer playIcon="assets/icons/SpeakerHigh.svg"
                :audio-url="`${activityURL}${itemData?.media_contents?.files[0].file}`"
                :id="`feedback-player-${itemData.vocab_seq}`" @audioPaused="handlePauseVideo" :timerHidden="true"
                @audioPlayed="handlePlayVideo" @audioEnded="audioPlayEnded" />

            </button>

            <!-- start stop recording -->
            <!-- <button v-if="audioElement">
              <img height="60" width="60" src="@/assets/icons/play-icon-blue.svg" alt="" />
            </button>
            <button v-else-if="!isAudioRecording" @click="startAudioRecording">
              <img height="60" width="60" src="@/assets/icons/microphone-icon.svg" alt="" />
            </button>
            <button v-else @click="stopAudioRecording">
              <img height="60" width="60" src="@/assets/icons/pause-icon-blue.svg" alt="" />
            </button> -->

            <button :disabled="!isActiveAudioRecording || itemData.isRecorded" type="button"
              class="solid microphone-btn" :class="{ 'disable-event': !isActiveAudioRecording | itemData.isRecorded }"
              @click="startAudioRecording" v-if="!recording && !itemData.isRecorded"><img
                src="@/assets/icons/microphone-icon.svg"></button>

            <button type="button" class="stops microphone-btn" v-else-if="recording && !itemData.audioUrl"
              @click="stopAudioRecording"><img src="@/assets/icons/pause.svg"></button>

            <button class="microphone-btn" v-if="itemData.isRecorded && itemData.audioUrl">
              <NormalAudioPlayer :audio-url="itemData.audioUrl" :timerHidden="true"
                :id="`feedback-player-${itemData.vocab_seq}`" />
            </button>

            <!-- start stop recording ends -->

            <button @click="repeatRecord" :disabled="!itemData.result?.similarityScore">
              <img src="@/assets/icons/repeat-icon.svg" alt="" />
            </button>
            <!-- <button class="retake">
              <img src="@/assets/icons/ArrowCounterClockwise.svg" alt="" />
              다시 하기
            </button> -->
          </div>
        </div>
        <!-- <SPagination :totalPages="totalRecords" v-model="currentPage" /> -->
        <PaginationComponent v-if="flashCards?.length > 0" :currentPage="page" :records="totalRecord" :perPage="limit"
          @on-change-handler="changePage" :checkAudioStatus="checkStatus" :activity="true" />
      </article>
    </div>

    <LoaderVue :loading="loadingState" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import PaginationComponent from "@/components/pagination/pagination.vue";
import SPagination from "../../../components/pagination/SPagination.vue";
import flashcardService from "@/services/Activity/flashcardService";
import { useAudioRecorder } from "@/composables/useAudioRecorder";
import { TestActivityService } from "@/services/Activity/testService";
import moment from "moment";

import { Shadowing } from "@/services/Activity/Shadowing/Shadowing.js";
import { WhatsNew } from "@/services/Learning/WhatsNew.js";
import { useActivity } from "@/stores/useActivity";
import { storeToRefs } from "pinia";
import useTimer from '@/composables/useTimer.js';
import Toast from "@/alert/alert.js";
import { io } from 'socket.io-client';
import { useUserData } from "@/stores/useUserDataCopy";
const userStore = useUserData();
const activityStore = useActivity();
const { getRecordingStatus, getTranscriptingStatus } = storeToRefs(useActivity());
const { timer, recording, startRecording, stopRecording, resetTimer } = useTimer();

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const scheduleSeq = ref(route.params.schedule_seq ? route.params.schedule_seq : "");
const activityURL = ref('https://exi.spep.co.kr/files/package/listening/');

const socket = io("https://spep-stt-stdqa.dvconsulting.org")
socket.on("connect", () => {
  console.log("Audio connected");
})

const ShadowingService = new Shadowing();
const testActivityService = new TestActivityService();
const WhatsNewService = new WhatsNew();

const File_BASE_URL = import.meta.env.VITE_FILE_BASE__URL;

const loadingState = ref(false);
const flashCards = ref([]);
const course = ref({});
const itemData = ref([]);
const page = ref(1);
const limit = ref(1);
const totalRecord = ref(0);

const checkStatus = computed(() => {
  return itemData.value.isRecorded === true;
})

const isActiveAudioRecording = ref(false);
const mediaRecorder = ref(null);
const audioChunks = ref([]);
const recordFile = ref(null);
const isAudioRecording = ref(false);
const loaclRecordPath = ref('');
let stream;

let sourceNode;
let scriptNode;
let previousFrame = new Int16Array(1);
const streamingLimit = 96;
let timerSetChunk = null;
const emit = defineEmits(['transcript-data']);
const transcriptData = ref({});
const result = ref({});
const listening_seq = ref([]);

const playAudio = () => {
  try {
    const audioEle = document.createElement("audio");

    audioEle.src = `${File_BASE_URL}${currentFlashcard.value.media_contents.files[0].file}`;

    console.log(audioEle.src);
    debugger;
    audioEle.play();
  } catch (error) {
    console.error(error);
  }
};


const showEnglishText = ref(true);
const showKoreanText = ref(true);

// const currentFlashcard = computed(
//   () => flashCards.value[currentPage.value - 1] ?? {}
// );

const changePage = (value) => {
  if (checkStatus.value && value > page.value) {
    page.value = value;
    isActiveAudioRecording.value = false;
    itemData.value = flashCards.value[value - 1];

  } else if (!checkStatus.value && value < page.value) {
    page.value = value;
    isActiveAudioRecording.value = false;
    itemData.value = flashCards.value[value - 1];
  }
};

const handlePauseVideo = () => {
  isActiveAudioRecording.value = true;
}

const audioPlayEnded = () => {
  isActiveAudioRecording.value = true;
}

const handlePlayVideo = () => {
  isActiveAudioRecording.value = false;
}

const reset = () => {
  audioChunks.value = [];
  mediaRecorder.value = null;
  loaclRecordPath.value = '';
  resetTimer();
};

// Function to start recording
const startAudioRecording = async () => {
  if (getTranscriptingStatus.value) {
    Toast.fire({
      title: 'Transcripting is going on!!',
      background: "red",
      color: 'white'
    });
    return;
  }
  reset();
  activityStore.$patch({ is_recording_ongoing: true });
  startRecording();
  navigator.mediaDevices.getUserMedia({ audio: { sampleRate: 44100, channelCount: 2, bitrate: 192000 } })
    .then(mediaStream => {
      stream = mediaStream;
      mediaRecorder.value = new MediaRecorder(mediaStream);
      mediaRecorder.value.ondataavailable = event => {
        audioChunks.value.push(event.data);
        itemData.value.isRecorded = true;
      };
      mediaRecorder.value.start();
      isAudioRecording.value = true;

      const audioContext = new AudioContext();
      // get mic stream
      sourceNode = audioContext.createMediaStreamSource(stream);
      scriptNode = audioContext.createScriptProcessor(4096, 1, 1);
      sourceNode.connect(scriptNode);
      scriptNode.connect(audioContext.destination);

      socket.emit('start-file');
      scriptNode.addEventListener("audioprocess", onaudioprocess);

      //submit stream after each timeout
      timerSetChunk = setInterval(submitChunk, streamingLimit);

      mediaRecorder.value.onstop = () => {
        const audioBlob = new Blob(audioChunks.value, { type: 'audio/mp3' });
        recordFile.value = audioBlob;
        const audioUrl = URL.createObjectURL(audioBlob);
        itemData.value.audioUrl = audioUrl;
        loaclRecordPath.value = audioUrl;
        stream.getTracks().forEach(track => track.stop());

        setTimeout(() => {
          matchAudioData();
        }, 2000);
      };

    })
    .catch(error => {
      console.error('Error accessing microphone:', error);
    });
};

const submitChunk = () => {
  socket.emit('audio-file', previousFrame);

  //reset chunk
  previousFrame = new Int16Array(1);

}

function proccessAudioDataV2(arrayBuffer) {
  if (!arrayBuffer) return;
  let frame = new Int16Array(arrayBuffer.length);
  arrayBuffer.forEach((sample, idx) => {

    frame[idx] = (sample < 0) ? Math.floor(sample * 0x8000) : Math.floor(sample * 0x7fff)
  });
  previousFrame = Int16Array.from([...frame]);
}

// Stream audio to Google STT
const onaudioprocess = (event) => {
  const audioChunk = event.inputBuffer;
  //console.log("In progress");
  const arrayBuffer = audioChunk.getChannelData(0);
  proccessAudioDataV2(arrayBuffer);
};

socket.on('transcript', data => {
  transcriptData.value = data;
  console.log(data);
  socket.emit("stop-file");
  scriptNode.removeEventListener("audioprocess", onaudioprocess);
  if (timerSetChunk) clearInterval(timerSetChunk);
  previousFrame = new Int16Array(1)
});

const matchAudioData = async () => {
  let data = {
    originalText: itemData.value.vocabulary,
    transcribedText: transcriptData.value.transcript,
    confidenceScore: transcriptData.value.confidence
  };
  console.log(data);
  //return
  try {
    loadingState.value = true;
    const res = await ShadowingService.getSimilarityScore(data);
    if (res.data) {
      result.value = res.data;
      itemData.value.result = result.value;

      if (totalRecord.value == page.value && checkStatus.value) {
        setTimeout(() => {
          submitActivity();
          router.push({ name: 'Complete', params: { schedule_seq: scheduleSeq.value, module_name: 'Flashcard' } });
        }, 5000);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingState.value = false;
  }
};

socket.on('transcriptStopped', () => {
  console.log("Stopped");
});

// Function to stop recording
const stopAudioRecording = () => {
  if (mediaRecorder.value && isAudioRecording.value) {
    mediaRecorder.value.stop();
    isAudioRecording.value = false;
    stopRecording();
    activityStore.$patch({ is_recording_ongoing: false });
    isActiveAudioRecording.value = false;
    // videoRef.value.play();
  }
};

const getFlashCard = async () => {
  loadingState.value = true;
  const res = await testActivityService.getStudentActivityTests(scheduleSeq.value);
  loadingState.value = false;
  if (res?.status === 200 && res?.data?.data) {
    course.value = res.data.course;
    const flashCardModule = res.data.data.find((x) => x.target === "Flashcard");
    flashCards.value = flashCardModule?.items ?? [];
    itemData.value = flashCards.value[0];
    totalRecord.value = flashCards.value.length;
    listening_seq.value = flashCards.value.map(item => item.vocab_seq);
    // debugger;
  }
};

const startSpeaking = (text) => {
  isActiveAudioRecording.value = true;
  if (userStore.getIsMobileViewReady) {
    window.flutter_inappwebview.callHandler("startSpeaking", text);
    return;
  }
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
};

const repeatRecord = () => {
  itemData.value.result = {};
  itemData.value.isRecorded = false;
  itemData.value.audioUrl = '';
  isActiveAudioRecording.value = true;
}

const addBookamrk = async () => {
  const data = {
    bookmark_type: "V",
    bookmark_type_seq: itemData.value.vocab_seq,
  }
  try {
    loadingState.value = true;
    const res = await WhatsNewService.bookmarkAdd(data);
    if (res.data) {
      //whatsNewDetails.value.hasBookmarks = 1;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingState.value = false;
  }
}

const deleteBookamrk = async () => {
  const data = {
    bookmark_type: "V",
    bookmark_type_seq: itemData.value.vocab_seq,
  }
  try {
    loadingState.value = true;
    const res = await WhatsNewService.bookmarkDelete(data);
    if (res.data) {
      //whatsNewDetails.value.hasBookmarks = 0;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingState.value = false;
  }
}

const submitActivity = async () => {
  const data = {
    "module": {
      "module_type": 'Flashcard',
      "unit_seq": scheduleSeq.value,
      "status": {
        "seq": listening_seq.value
      },
      "count": totalRecord.value,
    }
  }
  console.log(data)
  //return
  try {
    const res = await ShadowingService.submitActivityData(data);
    if (res.data) {

    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingState.value = false;
  }
}

onMounted(() => {
  getFlashCard();
});
</script>

<style scoped>
.sentence .hint {
  padding: 4px 16px;
  border-radius: 4px;
  opacity: 0px;
  background-color: #0c60c2;
  color: #fff;
}
</style>
