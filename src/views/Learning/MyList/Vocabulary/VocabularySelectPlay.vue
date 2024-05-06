<template>
  <AudioGlobalBox v-if="selectedItems.length > 0" :key="selectedItems[currentIndex].bookmark_seq"
    :audioSrc="selectedItems[currentIndex].audio" :isPlaying="currentPlay == selectedItems[currentIndex].bookmark_seq"
    :isPaused="currentPaused == selectedItems[currentIndex].bookmark_seq"
    :description="selectedItems[currentIndex].lecture_name" :title="selectedItems[currentIndex].title"
    :totalrecord="selectedItems.length" :currentPlayingRecord="currentIndex + 1" @onPause="
    currentPlay = null;
  currentPaused = selectedItems[currentIndex].bookmark_seq;
  " @onPlay="
    currentPlay = selectedItems[currentIndex].bookmark_seq;
  currentPaused = null;
  " @onPrevious="playPrevious" @onNext="playNext" @onRepeat="playCurrent" @ended="playNext" @close="
    currentPlay = null;
  currentPaused = null;
  " :isHLS="selectedItems[currentIndex].audioType"></AudioGlobalBox>

</template>


<script setup>
import AudioGlobalBox from "@/components//AudioGlobalBox.vue";
import { useVocabularyPlay } from '@/stores/useVocabularyPlay.js';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import { onMounted, ref } from "vue";
const currentPlay = ref(null);
const currentPaused = ref(null);
const currentIndex = ref(0);
const selectedItems = ref([]);
const isSelecetPlayAudio = ref(false);
const store = useVocabularyPlay();

onBeforeRouteLeave((to, from) => {
  localStorage.removeItem('vocabularyItem');
})

const playNext = () => {
  if (currentIndex.value < selectedItems.value.length - 1) {
    currentIndex.value++;
    playAudio(selectedItems.value[currentIndex.value]);
  } else {
    currentIndex.value = 0;
  }
};
const playCurrent = () => {
  currentPaused.value = null;
  const audioElement = document.getElementById("video");
  if (audioElement) {
    audioElement.currentTime = 0;
    audioElement.play();
  }
};
const playPrevious = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    playAudio(selectedItems.value[currentIndex.value]);
  } else {
    currentIndex.value = 0;
  }
};
const playAudio = (ldata) => {
  currentPlay.value = ldata.bookmark_seq;
  currentPaused.value = null;
};
onMounted(() => {
  const savedState = JSON.parse(localStorage.getItem('vocabularyItem'));
  selectedItems.value = store.selectedItems.length ? store.selectedItems : savedState;
  currentIndex.value = 0;
  isSelecetPlayAudio.value = true;
  playAudio(selectedItems.value[currentIndex.value]);
});

</script>