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
          <div class="bookmark">
            <button @click="addBookamrk" class="bookmark-btn active">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M21 24.125L13.9992 19.75L7 24.125V4.875C7 4.64294 7.09219 4.42038 7.25628 4.25628C7.42038 4.09219 7.64294 4 7.875 4H20.125C20.3571 4 20.5796 4.09219 20.7437 4.25628C20.9078 4.42038 21 4.64294 21 4.875V24.125Z"
                  stroke="#0C60C2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </article>
      <article class="course-card">
        <div class="course-audio-image" v-if="itemData?.media_contents?.files[0].m_type == 'sound'">
          <div class="audio-img-area">
            <img @error="getImage" :src="activityURL + itemData?.media_contents?.files[0].thumb" alt="" />
          </div>
          <!-- <NormalAudioPlayer :audio-url="`https://exi.spep.co.kr/files/listening/Ex_i31_u1_lesson1_dialogue.mp3`"
            :id="`feedback-player-${shadowingData.unit_seq}`" :getTimeDuration="true"
            @audioTimeUpdate="audioPlayBarTimeUpdate" @audioPaused="handlePauseVideo" @audioPlayed="handlePlayVideo"
            :indexValue="index" /> -->

          <NormalAudioPlayer :audio-url="`${activityURL}${itemData?.media_contents?.files[0].file}`"
            :id="`feedback-player-${shadowingData.unit_seq}`" :getTimeDuration="true"
            @audioTimeUpdate="audioPlayBarTimeUpdate" @audioPaused="handlePauseVideo" @audioPlayed="handlePlayVideo"
            :indexValue="index" />

        </div>

        <div class="course-video" v-if="itemData?.media_contents?.files[0].m_type != 'sound' && !loaderState">
          <!-- <video ref="videoRef" controls @play="handlePlayVideo" @pause="handlePauseVideo"
            @timeupdate="videoPlayBarTimeUpdate" @ended="handleVideoEnd">
            <source src="@/assets/video/sample-video.mp4" type="video/mp4" />
          </video> -->
          <video ref="videoRef" controls @play="handlePlayVideo" @pause="handlePauseVideo"
            @timeupdate="videoPlayBarTimeUpdate" @ended="handleVideoEnd">
            <source :src="activityURL + itemData?.media_contents?.files[0].file" type="video/mp4" />
          </video>
        </div>
        <div class="quiz-section">
          <div class="quiz-header">
            <span class="q-no">Speaking {{ page }}</span>
            <h2>{{ itemData.s_title }}</h2>
          </div>
          <div class="quiz-content">
            <p class="speak-sentence"
              v-if="speakingData?.result?.similarityScore && speakingData?.result?.similarityScore < 80">
              {{ speakingData.result?.similarityScore ? parseInt(speakingData.result?.similarityScore) : 0 }}% 일치
            </p>
            <p class="speak-sentence greentxt"
              v-if="speakingData?.result?.similarityScore && speakingData?.result?.similarityScore > 80">
              {{ speakingData.result?.similarityScore ? parseInt(speakingData.result?.similarityScore) : 0 }}% 일치
            </p>
            <span v-if="isActiveAudioRecording && !speakingData?.isRecorded" class="tgas-btn">스피킹 하세요</span>
            <span v-if="speakingData?.result?.similarityScore && speakingData?.result?.similarityScore < 80"
              class="tgas-btn grey-tags">다시 시도해 보세요</span>
            <span v-if="speakingData?.result?.similarityScore && speakingData?.result?.similarityScore > 80"
              class="tgas-btn green-tags">다시 시도해 보세요</span>
            <template v-if="speakingData?.txt_en">
              <p class="speak-sentence">
                {{ speakingData.txt_en }}
              </p>
              <h6 class="ko-instruction">
                {{ speakingData.txt_kr }}
              </h6>

              <div class="media-options" style="position: static;">
                <button class="speaker-btn">
                  <img src="@/assets/icons/SpeakerHigh.svg" alt="" @click="startSpeaking(speakingData.txt_en)" />
                  <!-- <NormalAudioPlayer :audio-url="`https://exi.spep.co.kr/files/listening/Ex_i31_u1_lesson1_dialogue.mp3`"
                  :id="`feedback-player-${shadowingData.UNIT_SEQ}`" :timerHidden="true" @audioEnded="audioPlayEnded" /> -->
                </button>

                <button :disabled="!isActiveAudioRecording || speakingData?.isRecorded" type="button"
                  class="solid microphone-btn"
                  :class="{ 'disable-event': !isActiveAudioRecording | speakingData.isRecorded }"
                  @click="startAudioRecording" v-if="!recording && !speakingData?.isRecorded"><img
                    src="@/assets/icons/microphone-icon.svg"></button>

                <button type="button" class="stops microphone-btn" v-else-if="recording && !speakingData?.audioUrl"
                  @click="stopAudioRecording"><img src="@/assets/icons/pause.svg"></button>

                <button class="microphone-btn" v-if="speakingData?.isRecorded && speakingData?.audioUrl">
                  <NormalAudioPlayer :audio-url="speakingData?.audioUrl"
                    :id="`feedback-player-${shadowingData.unit_seq}`" :timerHidden="true" />
                </button>
                <button :disabled="!speakingData.result?.similarityScore"
                  :class="{ 'disable-event': !speakingData?.result?.similarityScore }" @click="repeatRecord"><img
                    src="@/assets/icons/repeat-icon.svg" alt="" /></button>
              </div>
            </template>

            <div v-else>
              <NoDataFoundVue />
            </div>
          </div>
        </div>
        <PaginationComponent v-if="subtitleListData?.length > 0" :currentPage="page" :records="totalRecord"
          :perPage="limit" @on-change-handler="changePage" :checkAudioStatus="checkStatus" :activity="true" />
      </article>
    </div>
  </div>
  <LoaderVue :loading="loaderState" />
</template>

<script setup>
// import SocketioService from "@/chat/services/SocketIoService";
// import { io } from 'socket.io-client';

import PaginationComponent from "@/components/pagination/pagination.vue";
import TranscriptAudioPlayer from "@/components/Activity/TranscriptAudioPlayer.vue";
import { Shadowing } from "@/services/Activity/Shadowing/Shadowing.js";
import { Feedback } from "@/services/Class/Feedback.js";
import { WhatsNew } from "@/services/Learning/WhatsNew.js";
import { ref, onMounted, watch, computed } from 'vue';
import moment from "moment";
import { useActivity } from "@/stores/useActivity";
import { storeToRefs } from "pinia";
import useTimer from '@/composables/useTimer.js';
import Toast from "@/alert/alert.js";
import { io } from 'socket.io-client';
import { useUserData } from "@/stores/useUserDataCopy";
import noImage from "@/assets/images/no-image-available.jpg";
const userStore = useUserData();

const socket = io("https://spep-stt-stdqa.dvconsulting.org")
socket.on("connect", () => {
  console.log("Audio connected");
})

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const ShadowingService = new Shadowing();
const FeedbackService = new Feedback();
const WhatsNewService = new WhatsNew();
const loaderState = ref(false);
const shadowingData = ref({});
const listening_seq = ref([]);
// const currentPlay = ref(null);
// const currentPaused = ref(null);
const activityStore = useActivity();
const { getRecordingStatus, getTranscriptingStatus } = storeToRefs(useActivity());
const { timer, recording, startRecording, stopRecording, resetTimer } = useTimer();

const isActiveAudioRecording = ref(false);
const mediaRecorder = ref(null);
const audioChunks = ref([]);
const recordFile = ref(null);
const isAudioRecording = ref(false);
const loaclRecordPath = ref('');
const speakingData = ref('');
const videoRef = ref(null);
const audioRef = ref(null);
const index = ref(0);
const textData = ref([]);
let stream;

const subtitleData = ref([]);
const subtitleListData = ref([]);
const itemData = ref([]);
const page = ref(1);
const limit = ref(1);
const totalRecord = ref(0);
const course = ref({});
const activityURL = ref('https://exi.spep.co.kr/files/package/listening/');

let sourceNode;
let scriptNode;
let previousFrame = new Int16Array(1);
const streamingLimit = 96;
let timerSetChunk = null;
const emit = defineEmits(['transcript-data']);
const transcriptData = ref({});
const result = ref({});
const scheduleSeq = ref(route.params.schedule_seq ? route.params.schedule_seq : "");

const checkStatus = computed(() => {
  return itemData.value.subtitle.every(obj => obj?.isRecorded === true);
})

const videoPlayBarTimeUpdate = () => {
  audioPlayBarTimeUpdate(videoRef.value.currentTime)
}

const getImage = (e) => {
  e.target.src = noImage;
}

const handleVideoEnd = () => {
  videoRef.value.currentTime = 0;
}

watch(() => index.value, (nw, ov) => {
  if (nw != ov) {
    //videoRef.value?.pause();
    //isActiveAudioRecording.value = true;
  }
})


const audioPlayBarTimeUpdate = (seconds) => {
  let milliseconds = seconds * 1000;
  index.value = itemData.value.subtitle.findIndex(entry => entry.millisecond > milliseconds);
  if (index.value !== -1) {
    speakingData.value = itemData.value.subtitle[index.value - 1];
  } else {
    //index.value = itemData.value.subtitle.length - 1;
    speakingData.value = itemData.value.subtitle[itemData.value.subtitle.length - 1];
  }
  //console.log(speakingData.value)
}

const insertElement = (arr, element, position) => {
  arr.splice(position, 0, element);
}

const audioPlayEnded = () => {
  isActiveAudioRecording.value = false;
}
const handlePauseVideo = () => {
  isActiveAudioRecording.value = true;
}

const handlePlayVideo = () => {
  isActiveAudioRecording.value = false;
}

const changePage = (value) => {
  if (checkStatus.value && value > page.value) {
    page.value = value;
    index.value = 0;
    isActiveAudioRecording.value = false;
    itemData.value = subtitleListData.value[value - 1];
    speakingData.value = itemData.value.subtitle[index.value];
    const txtEnArray = itemData.value.subtitle.map(item => item.txt_en);
    if (txtEnArray.length) {
      autoTranslate(txtEnArray)
    }
  } else if (!checkStatus.value && value < page.value) {
    page.value = value;
    index.value = 0;
    isActiveAudioRecording.value = false;
    itemData.value = subtitleListData.value[value - 1];
    speakingData.value = itemData.value.subtitle[index.value];
  }
};

const getActivityData = async () => {
  try {
    loaderState.value = true;
    const res = await ShadowingService.getActivityData(scheduleSeq.value);
    if (res && res.data && res.data.data) {
      course.value = res.data.course;
      subtitleData.value = res.data.data.filter(item => item.module === "Shadowing" && item.target === "Shadowing");
      subtitleListData.value = subtitleData.value[0].items;
      itemData.value = subtitleListData.value[0];
      totalRecord.value = subtitleListData.value.length;
      const txtEnArray = itemData.value.subtitle.map(item => item.txt_en);
      listening_seq.value = subtitleListData.value.map(item => item.listening_seq);
      if (txtEnArray.length) {
        autoTranslate(txtEnArray)
      }

      speakingData.value = itemData.value.subtitle[0];
    }

  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const autoTranslate = async (txtEnArray) => {
  const data = {
    originalTexts: txtEnArray,
    target: 'ko'
  }
  try {
    loaderState.value = true;
    const res = await FeedbackService.autoTranslate(data);
    if (res.data) {
      res.data.translations.map((item, i) => {
        itemData.value.subtitle[i].txt_kr = item;
        return item;
      });
    }
  } catch (error) {
    console.log(error);
    loaderState.value = false;
  } finally {
    loaderState.value = false;
  }
};

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
        // insertElement(audioChunks.value, event.data, index.value);
        if (index.value !== -1) {
          itemData.value.subtitle[index.value - 1].isRecorded = true;
        } else {
          itemData.value.subtitle[itemData.value.subtitle.length - 1].isRecorded = true;
        }
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
        if (index.value !== -1) {
          itemData.value.subtitle[index.value - 1].audioUrl = audioUrl;
        } else {
          itemData.value.subtitle[itemData.value.subtitle.length - 1].audioUrl = audioUrl;
        }
        loaclRecordPath.value = audioUrl;
        stream.getTracks().forEach(track => track.stop());
        videoRef.value?.pause();
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
  matchAudioData();
  socket.emit("stop-file");
  scriptNode.removeEventListener("audioprocess", onaudioprocess);
  if (timerSetChunk) clearInterval(timerSetChunk);
  previousFrame = new Int16Array(1)
});

const repeatRecord = () => {
  if (index.value !== -1) {
    itemData.value.subtitle[index.value - 1].result = {};
    itemData.value.subtitle[index.value - 1].isRecorded = false;
    itemData.value.subtitle[index.value - 1].audioUrl = '';
    isActiveAudioRecording.value = true;
  } else {
    itemData.value.subtitle[itemData.value.subtitle.length - 1].result = {};
    itemData.value.subtitle[itemData.value.subtitle.length - 1].isRecorded = false;
    itemData.value.subtitle[itemData.value.subtitle.length - 1].audioUrl = '';
    isActiveAudioRecording.value = true;
  }
}

const matchAudioData = async () => {
  let data = {
    originalText: speakingData.value.txt_en,
    transcribedText: transcriptData.value.transcript,
    confidenceScore: transcriptData.value.confidence
  };
  console.log(data);
  //return
  try {
    loaderState.value = true;
    const res = await ShadowingService.getSimilarityScore(data);
    if (res.data) {
      result.value = res.data;
      if (index.value !== -1) {
        itemData.value.subtitle[index.value - 1].result = result.value;
      } else {
        itemData.value.subtitle[itemData.value.subtitle.length - 1].result = result.value;
      }

      if (totalRecord.value == page.value && checkStatus.value) {
        setTimeout(() => {
          submitActivity();
          router.push({ name: 'Complete', params: { schedule_seq: scheduleSeq.value, module_name: 'Shadowing' } });
        }, 5000);
      }

    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
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

const startSpeaking = (text) => {
  if (userStore.getIsMobileViewReady) {
    window.flutter_inappwebview.callHandler("startSpeaking", text);
    return;
  }
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
};


const addBookamrk = async () => {
  const data = {
    bookmark_type: "AL",
    bookmark_type_seq: itemData.value.listening_seq,
  }
  try {
    loaderState.value = true;
    const res = await WhatsNewService.bookmarkAdd(data);
    if (res.data) {
      //whatsNewDetails.value.hasBookmarks = 1;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
}

const deleteBookamrk = async () => {
  const data = {
    bookmark_type: "AL",
    bookmark_type_seq: itemData.value.listening_seq,
  }
  try {
    loaderState.value = true;
    const res = await WhatsNewService.bookmarkDelete(data);
    if (res.data) {
      //whatsNewDetails.value.hasBookmarks = 0;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
}

const submitActivity = async () => {
  const data = {
    "module": {
      "module_type": 'Shadowing',
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
    loaderState.value = false;
  }
}


onMounted(async () => {
  loaderState.value = true;
  await getActivityData();
  //await getShadowingData();
});

</script>

<style></style>
