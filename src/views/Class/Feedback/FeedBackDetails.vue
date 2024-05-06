<template>
    <section class="home-sec feed-details content-wrapper">
        <div class="page-cnt-wrap">
            <div class="container">
                <div class="row row-wrap">
                    <h1 class="page-title">강사 피드백</h1>
                    <template v-if="feedbackData?.target_score">
                        <div class="upper-contents">
                            <div class="inner-heads">
                                <h2>{{ feedbackData.user_name_kr }}</h2>
                                <div class="page-right">
                                    <span><img src="@/assets/icons/chart-bar-square.svg"></span>
                                    <span>{{ moment(feedbackData.target_score).format("MM") }}월 S.P.A.목표점수</span>
                                    <span>|</span>
                                    <span>{{ feedbackData.total_point }}점</span>
                                </div>
                            </div>
                            <div class="left-wrap">
                                <ul>
                                    <li>
                                        <h2>수업일</h2>
                                        <p>{{ feedbackData.schoold_day ?
                        moment(feedbackData.schoold_day).format("YYYY.MM.DD") : '' }}</p>
                                    </li>
                                    <li class="nb">
                                        <h2>레슨명</h2>
                                        <p>{{ feedbackData.lesson }}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <h2 class="title">{{ moment(feedbackData.target_score).format("YYYY") }}년
                            {{ moment(feedbackData.target_score).format("MM") }}월 Focus</h2>
                        <div class="progress-box" v-if="feedbcakFocusData?.length > 0">
                            <div class="bullet-sec">
                                <div class="bullet-area">
                                    <img src="/src/assets/icons/small-blue-bullet.svg">
                                    <p>Last Class</p>
                                </div>
                                <div class="bullet-area">
                                    <img src="/src/assets/icons/sky-bullet.svg">
                                    <p>Session Average</p>
                                </div>
                            </div>

                            <div class="progress-sec">
                                <div class="progress-wrap" v-for="(focus, i) in feedbcakFocusData" :key="i">
                                    <div class="full-progres-area">
                                        <div class="progress-box-area">
                                            <div class="box-head">
                                                <div class="head-sec">
                                                    <h2>Focus {{ i + 1 }}. {{ focus.category_title_en }}</h2>
                                                </div>
                                            </div>
                                            <div class="progress-area">
                                                <p>Keep it up</p>
                                                <div class="bar-area">
                                                    <div class="btn-area light-blue"
                                                        :style="{ left: Math.round(item.score) + '%' }"
                                                        v-for="(item, i) in focus.focusScoreList" :key="i">
                                                        <p class="progress-txt-lb">
                                                            {{ moment(item.date).format("M") }}일</p>
                                                    </div>
                                                    <div class="btn-area blue"
                                                        :style="{ left: Math.round(item.score) + '%' }"
                                                        v-for="(item, i) in focus.sessionScoreList" :key="i">
                                                        <p class="progress-txt-b">{{ moment(item.date).format("M") }}일
                                                        </p>
                                                    </div>
                                                </div>
                                                <p>Excellent</p>
                                            </div>
                                        </div>
                                        <div class="progrestxt">
                                            <p>{{ focus.description }}</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- <div class="progress-wrap">
                                <div class="full-progres-area">
                                    <div class="progress-box-area">
                                        <div class="box-head">
                                            <div class="head-sec">
                                                <h2>Focus 1. Listening Accuracy</h2>
                                            </div>
                                        </div>
                                        <div class="progress-area">
                                            <p>Keep it up</p>
                                            <div class="bar-area">
                                                <div class="btn-area light-blue">
                                                    <p class="progress-txt-lb"></p>
                                                </div>
                                                <div class="btn-area blue">
                                                    <p class="progress-txt-b"></p>
                                                </div>
                                            </div>
                                            <p>Excellent</p>
                                        </div>
                                    </div>
                                    <div class="progrestxt">
                                        <p>동사를 포함하는 짧고 간단한 문장을 만드는 연습이 필요합니다. 동사를 포함하는 짧고 간단한 문장을 만드는 연습이 필요합니다. 동사를
                                            포함하는 짧고 간단한 문장을 만드는 연습이 필요합니다.</p>
                                    </div>
                                </div>
                            </div> -->
                            </div>
                        </div>
                        <div class="no-data" v-else>
                            <p>저장된 데이터가 없습니다</p>
                        </div>

                        <div class="dividers"></div>

                        <div class="describe-day-work-area">
                            <h2>Describe a typical day at work</h2>
                            <template v-if="feedbcakAudioData.length > 0">
                                <div class="describe-list" v-for="audio in feedbcakAudioData" :key="audio.file_id">
                                    <div class="describe-boxes">
                                        <div class="s-heds">
                                            <h3>{{ audio.script }}</h3>
                                            <span>
                                                <!-- <img src="@/assets/icons/bookmark.svg"> -->
                                                <button class="bookmark-btn"
                                                    :class="audio.bookmark == 'N' ? '' : 'active'"
                                                    @click="audio.bookmark == 'Y' ? deleteBookamrk(audio) : addBookamrk(audio)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                                                        viewBox="0 0 28 28" fill="none">
                                                        <path
                                                            d="M21 24.125L13.9992 19.75L7 24.125V4.875C7 4.64294 7.09219 4.42038 7.25628 4.25628C7.42038 4.09219 7.64294 4 7.875 4H20.125C20.3571 4 20.5796 4.09219 20.7437 4.25628C20.9078 4.42038 21 4.64294 21 4.875V24.125Z"
                                                            stroke="#0C60C2" stroke-width="1.5" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                </button></span>

                                        </div>
                                        <div class="describe-progress">
                                            <NormalAudioPlayer :audio-url="`${File_BASE_URL}${audio.file_path}`"
                                                :id="`feedback-player-${audio.file_id}`" :disabled="!audio.file_path" />
                                        </div>
                                        <p v-html="audio.comment"></p>
                                    </div>
                                </div>
                            </template>
                            <div class="no-data" v-else>
                                <p>저장된 데이터가 없습니다</p>
                            </div>
                        </div>

                        <div class="dividers-border"></div>

                        <div class="analysis-content-area">
                            <h2>Analysis</h2>

                            <div class="accordion-content-area" v-if="feedbcakAnalysisData.length > 0">
                                <Accordion v-for="(analysis, i) of feedbcakAnalysisData" :key="i">
                                    <template v-slot:title>
                                        <div class="heads-content">
                                            <h3>{{ analysis.title_en }}</h3>
                                            <h5>{{ analysis.rating }} <span>/ 5점</span></h5>
                                        </div>
                                    </template>
                                    <template v-slot:content>
                                        <p>{{ analysis.description_en }}</p>
                                    </template>
                                </Accordion>
                            </div>
                            <div class="no-data" v-else>
                                <p>저장된 데이터가 없습니다</p>
                            </div>
                        </div>

                        <div class="dividers"></div>

                        <div class="overall-content-area">
                            <h2>Overall Comment</h2>
                            <div class="comment-box-area" v-if="overallComment">
                                <textarea v-html="overallComment" readonly></textarea>
                                <button @click="autoTranslate" type="button" class="tranletBtn"><img
                                        src="@/assets/icons/translate.svg">번역보기</button>
                            </div>
                            <div class="no-data" v-else>
                                <p>저장된 데이터가 없습니다</p>
                            </div>
                        </div>

                        <div class="dividers"></div>

                        <div class="overall-content-area">
                            <h2>Feedback File</h2>
                            <div class="feedback-slider-area" v-if="feedbcakFileData.length > 0">
                                <FeedbackSlider :feedbcakFileData="feedbcakFileData"></FeedbackSlider>
                            </div>
                            <div class="no-data" v-else>
                                <p>저장된 데이터가 없습니다</p>
                            </div>
                        </div>

                        <div class="dividers"></div>

                        <div class="feed-back-bottom-content">
                            <p>피드백 내용이 마음에 드셨다면 좋아요!를 클릭해 주세요</p>
                            <button type="button" class="great like-txt-btn"><img
                                    src="@/assets/icons/ThumbsUp.svg">좋아요!</button>
                        </div>

                        <div class="button-wrap ">
                            <button type="button" @click="displayFeedbackModal = true">상시피드백 작성하기</button>
                        </div>
                    </template>
                    <div v-else>
                        <NoDataFoundVue />
                    </div>
                </div>

            </div>


        </div>
    </section>

    <AlwaysFeedbackModal v-if="displayFeedbackModal" v-model="displayFeedbackModal"
        @close="displayFeedbackModal = false" :feedbackData="feedbackData" :class_seq="route.params.class_id" />

    <LoaderVue :loading="loaderState" />
</template>


<script setup>
import ProgressBar from "@/components/ProgressBar.vue";
import { ref, onMounted, computed, callWithErrorHandling } from "vue";
import Accordion from "@/components/Class/Feedback/Accordion.vue";
import FeedbackSlider from "@/components/Class/Feedback/FeedbackSlider.vue";
import { Feedback } from "@/services/Class/Feedback.js";
import AlwaysFeedbackModal from "@/components/Class/Feedback/AlwaysFeedbackModal.vue";
import { WhatsNew } from "@/services/Learning/WhatsNew.js";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
const route = useRoute();

const FeedbackService = new Feedback();
const WhatsNewService = new WhatsNew();

const overallComment = ref('');
const targetLang = ref('ko');
const loaderState = ref(false);
const feedbackData = ref([]);
const feedbcakFocusData = ref([]);
const feedbcakAnalysisData = ref([]);
const feedbcakAudioData = ref([]);
const feedbcakFileData = ref([]);
const displayFeedbackModal = ref(false);
const File_BASE_URL = import.meta.env.VITE_FILE_BASE__URL;



const gethakFeedbackDetails = async () => {
    let data = {
        // unitId: "8634",
        // classId : "51901"


        // unitId: "10324",
        // classId: "105918"

        // unitId: "11220",
        // classId: "112498"

        scheduleId: route.params.scheduleId,
        classId: route.params.class_id,
    };
    try {
        loaderState.value = true;
        const res = await FeedbackService.hakFeedbackDetails(data);
        if (res.data.success) {
            //console.log(res.data)
            feedbackData.value = res.data;
            overallComment.value = res.data.overall_comment;
            feedbcakFocusData.value = res.data.focusFeedbackList;
            feedbcakAnalysisData.value = res.data.feedbackAnalysisList;
            feedbcakAudioData.value = res.data.feedbackAudioList;
            feedbcakFileData.value = res.data.feedbackFileList;

            logFeedback(feedbackData.value?.lectureDetails?.scheduleId);

            feedbcakFileData.value = feedbcakFileData.value.filter(file => {
                const extensions = ['.jpg', '.jpeg', '.png'];
                const extension = file.file_path.substring(file.file_path.lastIndexOf('.')).toLowerCase();
                return extensions.includes(extension);
            });

        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }
};

const addBookamrk = async (item) => {
    const data = {
        bookmark_type: "F",
        bookmark_type_seq: item.file_id,
    }
    try {
        loaderState.value = true;
        const res = await WhatsNewService.bookmarkAdd(data);
        if (res.data) {
            item.bookmark = 'Y';
        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }
}

const deleteBookamrk = async (item) => {
    const data = {
        bookmark_type: "F",
        bookmark_type_seq: item.file_id,
    }
    try {
        loaderState.value = true;
        const res = await WhatsNewService.bookmarkDelete(data);
        if (res.data) {
            item.bookmark = 'N';
        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }
}


const autoTranslate = async () => {
    const data = {
        originalTexts: [overallComment.value],
        target: targetLang.value
    }
    try {
        const res = await FeedbackService.autoTranslate(data);
        if (res.data) {
            overallComment.value = res.data.translations[0];
            if (targetLang.value == 'ko') {
                targetLang.value = 'en';
            } else {
                targetLang.value = 'ko';
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const logFeedback = async (scheduleId) => {
    const data = {
        schedule_seq: scheduleId.toString(),
        open_feedback_yn: "Y"
    }
    try {
        const res = await FeedbackService.logFeedback(data);
        if (res.data) {
        }
    } catch (error) {
        console.log(error);
    }
};

onMounted(async () => {
    await gethakFeedbackDetails();
});
</script>