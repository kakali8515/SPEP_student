<template>
  <div class="person" :class="{ 'ml-auto': isOddIndex }">

    <!-- TODO: mediaContent.speaker_img -->
    <img
      v-if="!isOddIndex"
      src="@/assets/images/chat-dp.png"
      alt=""
      class="dp"
    />

    <div class="convo-data">
      <span class="name">{{ mediaContent.speaker ?? "Lina" }}</span>
      <div class="box">
        <div class="speak-line">
          <div class="text">
            <h2 v-if="showEnglishText">{{ dialog.vocabulary }}</h2>
            <p class="ko" v-if="showKoreanText">{{ dialog.meaning }}</p>
          </div>
          <button>
            <!-- <img src="@/assets/icons/SpeakerSimpleHigh.svg" alt="" /> -->
            <!-- `https://exi.spep.co.kr/files/news/20231222/20240131-English%20Review.mp3` -->
            <!-- {{ audioUrl }} -->
            <NormalAudioPlayer
              :audio-url="audioUrl"
              :id="`dialog-player${1}`"
              :minTime="3"
              :maxTime="8"
              :timerHidden="true"
              playIcon="assets/icons/SpeakerSimpleHigh.svg"
            />
          </button>
        </div>
        <div class="record">
          <template v-if="!localRecordPath">
            <button @click="startAudioRecording" v-if="!isAudioRecording">
              <img src="@/assets/icons/Microphone-simple.svg" alt="" />따라하기
            </button>
            <button type="button" v-else @click="stopAudioRecording">
              <img
                src="@/assets/icons/pause-small-blue-circle-grey.svg"
                alt=""
              /><span class="blue">스피킹 하세요</span>
            </button>
          </template>
          <button v-else>
            <NormalAudioPlayer
              :audio-url="`${localRecordPath}`"
              :id="`dialog-player${1}`"
              :timerHidden="true"
              playIcon="assets/icons/play-small-blue-circle-grey.svg"
            />
            <span class="blue">내 발음 듣기</span>
          </button>
        </div>
      </div>
    </div>
    <img
      v-if="isOddIndex"
      src="@/assets/images/chat-dp.png"
      alt=""
      class="dp"
    />
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";

import { useAudioRecorder } from "@/composables/useAudioRecorder";

const File_BASE_URL = import.meta.env.VITE_FILE_BASE__URL;

const props = defineProps({
  dialog: Object,
  idx: Number,
  showEnglishText: Boolean,
  showKoreanText: Boolean,
});

const isOddIndex = computed(() => props.idx % 2 !== 0);
const mediaContent = computed(() => props.dialog.media_contents.files[0]);

const audioUrl = computed(
  () => `${File_BASE_URL}news/${mediaContent.value.file}`
);
const {
  isAudioRecording,
  audioElement,
  startAudioRecording,
  stopAudioRecording,
} = useAudioRecorder();

const localRecordPath = computed(() => {
  if (!audioElement.value) return null;
  return URL.createObjectURL(audioElement.value);
});
</script>
