<template>
  <audio ref="audioRef" :src="audioUrl" @timeupdate="handleTimeUpdate" @ended="handleAudioEnd" @play="handlePlayAudio" @error="handleError"></audio>
  <div class="audio-sec play-sec" style="width: 100%;">
    <div class="prog-bar range play-wrap">
      <div class="play">
        <img class="pointer" :class="{ 'disable-event': disabled }" v-if="!isPlaying" :src="getPic()"
          @click="togglePlay" />
        <img class="pointer" :class="{ 'disable-event': disabled }" v-else src="@/assets/icons/pause.svg"
          @click="togglePlay" />

        <template v-if="!timerHidden">
          <p :class="{ 'disable-event': disabled }">{{ formattedDuration(currentTime) }}</p>
          <input :disabled="disabled" type="range" :min="0" :max="duration" v-model="currentTime"
            class="slider pointer" @input="handleSliderChange" />
          <p :class="{ 'disable-event': disabled }">{{ formattedDuration(duration) }}</p>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
// import { useFeedback } from "@/stores/useFeedback";
import { storeToRefs } from "pinia";

import Toast from "@/alert/alert.js";

const props = defineProps({
  audioUrl: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    required: true,
  },
  timerHidden: {
    type: Boolean,
    required: false,
  },
  maxTime: {
    type: Number,
    required: false,
  },
  minTime: {
    type: Number,
    required: false,
  },
  playIcon: {
    type: String,
    required: false,
  },
  getTimeDuration: {
    type: Boolean,
    required: false,
  },
  indexValue: {
    type: Number,
    required: 0,
  }
});
const emit = defineEmits(['audioEnded', 'audioTimeUpdate', 'audioPlayed', 'audioPaused']);
// const store = useFeedback();
// const { getRecordingStatus, getStoreID } = storeToRefs(useFeedback());
const audioRef = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);

const getPic = () => {
  if (props.playIcon) {
    return new URL(`../../${props.playIcon}`, import.meta.url);
  } else {
    return new URL('@/assets/icons/play.svg', import.meta.url);
  }
};

const togglePlay = () => {
  // if (getRecordingStatus.value) {
  //   Toast.fire({
  //     title: 'Recording is going on!!',
  //     background: "red",
  //     color: 'white'
  //   });
  //   return;
  // }
  isPlaying.value = !isPlaying.value;
  // store.$patch({ store_id: props.id });
  // store.$patch({ is_audio_play_ongoing: isPlaying.value });
  if (isPlaying.value) {
    if (props.minTime) {
      audioRef.value.currentTime = props.minTime;
    }
    audioRef.value.play();
  } else {
    audioRef.value.pause();
    emit('audioPaused');
  }
};
watch(() => props.indexValue, (nw, ov) => {
  if (nw != ov) {
    // isPlaying.value = false;
    // audioRef.value.pause();
  }
})
// watch(() => getStoreID.value, (nw, ov) => {
//   if (isPlaying.value && getStoreID.value !== props.id) {
//     isPlaying.value = false;
//     audioRef.value.pause();
//     currentTime.value = 0;
//     audioRef.value.currentTime = 0
//   } else if (!isPlaying.value && getStoreID.value !== props.id) {
//     currentTime.value = 0;
//     audioRef.value.currentTime = 0
//   }
// })
// watch(() => getRecordingStatus.value, (nv, ov) => {
//   if (nv) {
//     isPlaying.value = false;
//     audioRef.value.pause();
//     currentTime.value = 0;
//     audioRef.value.currentTime = 0
//   }
// })
const handleTimeUpdate = () => {
  if (audioRef.value) {
    currentTime.value = Math.floor(audioRef.value.currentTime);
    duration.value = Math.floor(audioRef.value.duration);

    if (props.getTimeDuration) {
      emit('audioTimeUpdate', audioRef.value.currentTime);
    }

    if (currentTime.value == props.maxTime) {
      audioRef.value.pause();
      handleAudioEnd();
      audioRef.value.currentTime = 0;
    }
  }
};

const handleAudioEnd = () => {
  isPlaying.value = false;
  emit('audioEnded');
};

const handlePlayAudio = () => {
  emit('audioPlayed');
};

const handleError = () => {
  isPlaying.value = false;
  audioRef.value.pause();
};

const handleSliderChange = () => {
  audioRef.value.currentTime = currentTime.value;
  emit('audioPaused');
};
const formattedDuration = (value) => {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const seconds = value % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  if (isNaN(formattedMinutes)) {
    return '00:00'
  } else if (hours > 0) {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  } else {
    return `${formattedMinutes}:${formattedSeconds}`;
  }
};
</script>
