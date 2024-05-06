<template>
    <section class="active-learning-sec">
        <div class="container">
            <div class="row">
                <div class="web100">
                    <div class="learning-body">
                        <h2 class="paghed">학습하기</h2>
                        <div class="heading">
                            <h1>Active Learning Prep</h1>
                        </div>
                        <div class="main-body">
                            <div class="detail-sec main-dtls">
                                <ul class="dtls-list">
                                    <li>
                                        <span>과정명</span>
                                        <p>{{ formDetails.course_name }}</p>
                                    </li>
                                    <span class="line"></span>
                                    <li>
                                        <span>강사명</span>
                                        <p>{{ formDetails.user_name_en }}</p>
                                    </li>
                                    
                                    <li>
                                        <span>교재명</span>
                                        <p>{{ formDetails.lecture_name }}</p>
                                    </li>
                                    <span class="line"></span>
                                    <li>
                                        <span>마감일</span>
                                        <p>{{ koreanDateFormat(formDetails.due_date) }}</p>
                                    </li>

                                    <li>
                                        <span>UNIT</span>
                                        <p>{{ formDetails.title }}</p>
                                    </li>
                                </ul>
                                
                            </div>
                            <div class="detail-sec single-audio">
                                <div class="heading-wrap">
                                    <h2>음원</h2>
                                </div>

                                <div class="audio-image ">
                                    <!-- <audio ref="audioRef"
                                        :src="formDetails.audio_file_src"
                                        @timeupdate="handleTimeUpdate" @ended="handleAudioEnd"  type="application/x-mpegURL"></audio> -->
                                    <video ref="videoRef" id="video" controls playsinline @timeupdate="handleTimeUpdate"
                                        @ended="handleAudioEnd"></video>
                                </div>
                                <div class="audio-sec play-sec">
                                    <div class="prog-bar range play-wrap">
                                        <div class="play pointer" @click="togglePlay">
                                            <img :class="{ active: !isPlaying }" src="@/assets/icons/play.svg" />
                                            <img :class="{ active: isPlaying }" src="@/assets/icons/pause.svg" />
                                        </div>
                                        <p>{{ formattedDuration(currentTime) }}</p>
                                        <div class="progress">
                                            <input type="range" :min="0" :max="duration" v-model="currentTime"
                                                class="slider pointer" @input="handleSliderChange" />
                                        </div>
                                        <p>{{ formattedDuration(duration) }}</p>
                                        <img class="bookmark pointer" src="@/assets/icons/bookmark.svg" @click="isServicePrepared = true">
                                    </div>
                                    <!-- <div class="save-sec">
                                        <img src="@/assets/icons/bookmark.svg">
                                        <p>저장하기</p>
                                    </div> -->
                                </div>
                            </div>
                            <div class="detail-sec">
                                <div class="heading-wrap">
                                    <h2>과제 내용</h2>                                    
                                </div>
                                <div class="detail-info">
                                    <div class="box-sec">
                                        <p class="alp-text" v-html="formattedAlpText"></p>
                                    </div>
                                </div>
                                <div class="download-btn">
                                    <button @click="downloadFile"><img src="@/assets/icons/download.svg" alt="">과제
                                        다운로드</button>
                                </div>
                            </div>
                            <div class="detail-sec">
                                <div class="heading-wrap">
                                    <h2>과제 입력</h2>
                                </div>
                                <textarea v-if="state.copiedText != ''" v-model="state.copiedText" :disabled="formDetails.is_submitted" rows="10" cols="70"
                                    class="custom-scroll-bg"></textarea>
                                <div v-else class="detail-info">
                                    <div class="box-sec box-btn-sec">
                                        <h2>과제 복사 버튼을 누르면 과제제출 칸으로 과제 내용이 복사됩니다.
                                            과제 복사 버튼을 누르고 과제 제출 칸에 입력 후 저장해 주세요.</h2>
                                        <button @click="copyAssignment">과제 복사하기<img src="@/assets/icons/copy.svg"></button>
                                    </div>
                                </div>
                                <p class="error-text" v-if="v$.copiedText?.$error">{{ v$.copiedText?.$errors[0].$message
                                }}</p>
                            </div>
                            <div class="detail-sec bbn">
                                <div class="heading-wrap">
                                    <h2>메모</h2>
                                </div>

                                <div class="detail-info">
                                    <textarea v-model="state.memoNotes"  :disabled="formDetails.is_submitted" class="box-sec blank-box">
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div class="btn-sec">
                            <!-- $router.push({ name: 'SpaPrepCourse', params: { tab: tabNo }}) -->
                            <button class="trans-btn" @click="$router.go(-1)">목록으로</button>
                            <button v-if="!formDetails.is_submitted" class="blue-btn" :disabled="isSubmitButtonDisabled"
                                @click="submitFormDetails">제출하기</button>
                        </div>
                    </div>
                </div>
            </div>
            <LoaderVue :loading="isLoading" />

        </div>
    </section>
    <ServiceModal v-model="isServicePrepared"/>
</template>
<script setup>
import Hls from "hls.js";
import ServiceModal from "@/components/common/modal/ServiceModal.vue";
import { ref, onMounted, computed, reactive } from "vue";
import { ActiveLearningPrep } from "@/services/ActiveLearningPrep/ActiveLearningPrep.js";
import { useRouter, useRoute } from "vue-router";
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import useMixins from '@/composables/useMixins.js';
// ========= INITIALIZE==========
const { koreanDateFormat, saveFile } = useMixins();
const route = useRoute();
const router = useRouter();
const ActivePrepService = new ActiveLearningPrep();
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const isLoading = ref(false);
const formDetails = ref({});
const isServicePrepared = ref(false)
const state = reactive({
    copiedText: '',
    memoNotes: ''
})
const videoRef = ref(null);
const videoSrc = ref('');
const rules = {
    copiedText: {
        required: helpers.withMessage('과제를 입력해주세요.', required)
    },
}
const tabNo = ref(route.params.tab ? route.params.tab : "");

// ========== COMPUTED ===========
const formattedAlpText = computed(() => {
    if (formDetails.value?.alp_text) {
        return formDetails.value.alp_text.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
    }
    return '';
});
const isFormEdited = computed(() => {
    return (
        state.copiedText !== formDetails.value.message ||
        state.memoNotes !== formDetails.value.memo
    );
});
const isSubmitButtonDisabled = computed(() => {
    return !isFormEdited.value;
});


// ========== FUNCTIONS ===========
const initHls = () => {
    if (Hls.isSupported()) {
        var hls = new Hls({
            debug: true,
        });
        //hls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
        hls.loadSource(videoSrc.value)
        hls.attachMedia(videoRef.value);
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            videoRef.value.muted = false;
            duration.value = Math.floor(videoRef.value.duration);
            //   videoRef.value.play();
        });
    }
    // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
    // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element through the `src` property.
    // This is using the built-in support of the plain video element, without using hls.js.
    else if (videoRef.value.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.value.src = videoSrc.value
        videoRef.value.addEventListener('canplay', function () {
            videoRef.value.muted = false;
            duration.value = Math.floor(videoRef.value.duration);
            // videoRef.value.play();
        });
    }
}

const togglePlay = () => {
    isPlaying.value = !isPlaying.value;
    if (isPlaying.value) {
        videoRef.value.play();
    } else {
        videoRef.value.pause();
    }
};

const handleTimeUpdate = () => {
    if (videoRef.value) {
        currentTime.value = Math.floor(videoRef.value.currentTime);
        duration.value = Math.floor(videoRef.value.duration);
    }
};

const handleAudioEnd = () => {
    isPlaying.value = false;
};

const handleSliderChange = () => {
    videoRef.value.currentTime = currentTime.value;
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
// to copy copy Assignment
const copyAssignment = () => {
    const alpTextElement = document.querySelector('.alp-text');
    if (alpTextElement) {
        const plainTextContent = alpTextElement.innerText;
        state.copiedText = plainTextContent;
    }
}

// get form details 
const getAlpSmartDetailsFormData = async () => {
    try {
        const obj = {
            alp_seq: route.params.id
        }
        isLoading.value = true;
        let response = await ActivePrepService.getAlpSmartDetailsFormData(obj);
        if (response.status == 200) {
            formDetails.value = response.data.data
            state.copiedText = formDetails.value.message != '' && formDetails.value.message != null ? formDetails.value.message : ''
            state.memoNotes = formDetails.value.memo != '' && formDetails.value.memo != null ? formDetails.value.memo : ''
            videoSrc.value = formDetails.value.audio_file_src;
            initHls();
        }
    } catch (error) {
        console.error(error);
    }
    finally {
        isLoading.value = false;
    }
}

// To download file 
const downloadFile = async () => {
    try {
        const obj = {
            file_name: formDetails.value?.alp_file
        }
        isLoading.value = true;
        let response = await ActivePrepService.downloadDocFile(obj);
        if (response.status == 200) {
            saveFile(response, formDetails.value?.alp_file);
        }
    } catch (error) {
        console.error(error);
    }
    finally {
        isLoading.value = false;
    }
}
const v$ = useVuelidate(rules, state);

// To submit the form 
const submitFormDetails = async () => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) {
        return;
    } else {
        try {
            const obj = {
                alp_seq: formDetails.value?.alp_seq,
                message: state.copiedText,
                memo: state.memoNotes
            }
            isLoading.value = true;
            let response = await ActivePrepService.submitAlpSmartFormData(obj);
            if (response.status == 200) {
                //router.push('/alp-smart')
                router.push({ name: 'SpaPrepCourse', params: { tab: tabNo }})
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            isLoading.value = false;
        }
    }
}


// ====== LIFECYCLE ======
onMounted(() => {
    getAlpSmartDetailsFormData()
});
</script>