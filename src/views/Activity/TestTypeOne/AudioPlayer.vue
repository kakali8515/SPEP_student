<template>
  <span
    @click="toggleQuestionAudio"
    style="cursor: pointer"
    class="audio___player"
  >
    <audio ref="audioRef" :src="audioSrc" />
    <img v-if="!isPlayingAudio" :src="iconPlay ?? volumeBlue" />
    <img v-else src="@/assets/icons/pause.svg" />
  </span>
</template>
<script setup>
import { ref } from "vue";
import volumeBlue from "@/assets/icons/volume-blue.svg";

const props = defineProps({
  iconPlay: { type: String },
  iconPause: { type: String, default: "src/assets/icons/pause.svg" },
  audioSrc: {
    type: String,
    required: true,
  },
});

const audioRef = ref(null);
const isPlayingAudio = ref(false);

const toggleQuestionAudio = () => {
  if (!audioRef.value) return;

  try {
    // if (!audioRef.value.canPlayType()) return;

    // if(audioRef.value.error){
    //   debugger
    // }
    isPlayingAudio.value ? audioRef.value.pause() : audioRef.value.play();
    isPlayingAudio.value = !isPlayingAudio.value;
  } catch (error) {
    console.error("can`t play audio:", error);
  }
};
</script>

<style scoped>
.audio___player {
  border-radius: 100%;
  /* background-color: red; */
}
</style>
