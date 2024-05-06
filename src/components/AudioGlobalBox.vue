<template>
 <video
    ref="videoRef"
    id="video"
    controls
    playsinline
    @timeupdate="handleTimeUpdate"
    @ended="handleAudioEnd"
    @error="handleError"
    v-show="false"
  ></video>
  <section class="home-sec">
    <div class="page-cnt-wrap">
      <div class="container">
        <div class="vocabulary-play-area">

          <div class="play-listing">
            <div class="play-count-box">{{currentPlayingRecord}}/{{totalrecord}}</div>
            <div class="play-head-box"><h2>{{title}}</h2></div>
            <div class="play-list-names">
              <ul>
                <li>{{description}}</li>
              </ul>
            </div>
          </div>
         
          <div class="play-container">
    <div class="audio-box-area">
        <div class="audio-bar-area">
            <button class="refresBtn" type="button" @click="$emit('onRepeat');$emit('onPlay')"><img src="@/assets/icons/Repeat.svg"></button>
            <div class="ply-pus-area">
                <button class="skip-backs" :class="currentPlayingRecord <= 1 ? 'not-allowed': ''" type="button"  @click="$emit('onPrevious')"><img src="@/assets/icons/skip-back.svg"></button>
                <button class="playsBtn" type="button" @click="togglePlay"><img v-if="!isPlaying" src="@/assets/icons/play-circle.svg" />
                <img v-else src="@/assets/icons/pause-blue-circle.svg" /></button>
                <button :class="currentPlayingRecord == totalrecord || currentPlayingRecord > totalrecord ? 'not-allowed': ''" class="skip-forword" type="button"  @click="$emit('onNext')"><img src="@/assets/icons/skip-back.svg"></button>
            </div>
            <button class="refresBtn" type="button">
                <!-- <img src="@/assets/icons/Repeat.svg"> -->
            </button>
        </div>
    </div>
</div>
          

        </div>
      </div>
    </div>
  </section>
  
  
</template>
<script setup>
import Hls from "hls.js";
import { onMounted, ref, watch, computed, getCurrentInstance } from "vue";
import { useUserData } from "@/stores/useUserData.js";
const props = defineProps({
  audioSrc: {
    type: String,
    default: "",
  },
  title:{
    type: String,
    default: "",
  },
  description:{
    type: String,
    default: "",
  },
  totalrecord:{
    type: Number,
    default: 0,
  },
  currentPlayingRecord:{
    type: Number,
    default: 0
  },
  isPlaying: { type: Boolean, default: false },
  isPaused: { type: Boolean, default: false },
  isProgress: { type: Boolean, default: true },
  startDuration: { type: Boolean, default: true },
  endDuration: { type: Boolean, default: true },
  isHLS: { type: Boolean, default: true },
});
const emits = defineEmits(["onPause", "onPlay", "close","ended", "onPrevious", "onNext" , "onRepeat"]);
// const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const videoRef = ref(null);
const userStore = useUserData();
const isPlay = ref(false);
const isMobileDevice = computed(() => {
  return userStore.getIsMobileViewReady;
});
watch(
  () => props.isPlaying,
  (nV, oV) => {
    if (nV) {
      videoRef.value.play();
    } else {
      videoRef.value.pause();
    }
    if (!props.isPlaying && !props.isPaused) {
      videoRef.value.currentTime = 0;
    }
  }
);

watch(
  () => props.isPaused,
  (nV, oV) => {
    if (!props.isPlaying && !props.isPaused) {
      videoRef.value.currentTime = 0;
    }
  }
);

const formattedDuration = (value) => {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const seconds = value % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  if (isNaN(formattedMinutes)) {
    return "00:00";
  } else if (hours > 0) {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  } else {
    return `${formattedMinutes}:${formattedSeconds}`;
  }
};
const initHls = () => {
  if (Hls.isSupported()) {
    var hls = new Hls({
      debug: true,
    });
    hls.loadSource(props.audioSrc);
    hls.attachMedia(videoRef.value);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      videoRef.value.muted = false;
      duration.value = Math.floor(videoRef.value.duration);
      if (props.isPlaying) videoRef.value.play();
    });
  } else if (videoRef.value.canPlayType("application/vnd.apple.mpegurl")) {
    videoRef.value.src = props.audioSrc;
    videoRef.value.addEventListener("canplay", function () {
      videoRef.value.muted = false;
      duration.value = Math.floor(videoRef.value.duration);
      // videoRef.value.play();
    });
  }
};
const handleTimeUpdate = () => {
  if (videoRef.value) {
    currentTime.value = Math.floor(videoRef.value.currentTime);
    duration.value = Math.floor(videoRef.value.duration);
  }
};
const togglePlay = () => {

  if (props.isPlaying) {
    
    emits("onPause");
  } else {
    
    emits("onPlay");
  }
};

const handleError = () => {
  emits("onPause");
  //emits('ended');
};

const handleAudioEnd = () => {
  // isPlaying.value = false;
  // emits("onPause");
  emits('ended');
};

const handleSliderChange = () => {
  videoRef.value.currentTime = currentTime.value;
};
onMounted(() => {
  if (props.isHLS) initHls();
  else {
    videoRef.value.src = props.audioSrc;
    videoRef.value.muted = false;
    videoRef.value.addEventListener("canplay", function () {
  duration.value = videoRef.value.duration;
  if (props.isPlaying) videoRef.value.play();
});
  }
});
</script>


