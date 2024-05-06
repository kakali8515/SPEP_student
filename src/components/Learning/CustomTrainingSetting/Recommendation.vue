<template>
    <div class="recommendation-data">
        <div class="head-sec">
            <div class="right-sec">
                <div class="first-head">
                    <!-- <p>강한별</p> -->
                    <p>{{ userStore.getUserData?.username_kr }} 님을 위한 맞춤 추천입니다!</p>
                </div>
                <!-- <div class="middle-head">
                    <p>고급 표현 학습 및 다주제 토론이 포함된</p>
                    <div class="inner-middle-head">
                        <p>고급 표현 학습 및 다주제 토론이 포함된</p>
                        <h2>중고급 과정을 추천합니다!</h2>
                    </div>
                </div> -->
            </div>
            <div class="left-sec pointer" @click="$router.push({ name: 'SpaPrepCourse' });">
                <img src="@/assets/icons/arrow-right-blk.svg" />
            </div>
        </div>
        <div class="recc-body">
            <div class="imgBox">
                <img :src="lectureImage" alt="" v-if="lectureImage" />
                <img v-else src="@/assets/images/no-image-available.jpg" alt="" />
            </div>
            
            <div class="recc-detail">
                <div class="detail-sec" v-if="recommendation_list.length > 0">
                    <div class="inner-sec" v-for="(item, index) in recommendation_list.slice(0, 4) " :key=index>
                        <!-- <p>1</p> -->
                        <div class="inner-detail pointer" @click="getPersonalized(item)">
                            <h2>{{ item.unit_seq_title }}</h2>
                            <p>{{ item.unit_name }}</p>
                        </div>
                    </div>
                    <!-- <div class="inner-sec">
                        <p>2</p>
                        <div class="inner-detail">
                            <h2>L/2 L2</h2>
                            <p>
                                Lesson Title Lesson Title Lesson Title Lesson
                                Title Lesson Title Lesson Title
                            </p>
                        </div>
                    </div>
                    <div class="inner-sec">
                        <p>3</p>
                        <div class="inner-detail">
                            <h2>L/2 L2</h2>
                            <p>
                                Lesson Title Lesson Title Lesson Title Lesson
                                Title Lesson Title Lesson Title
                            </p>
                        </div>
                    </div>
                    <div class="inner-sec">
                        <p>4</p>
                        <div class="inner-detail">
                            <h2>L/2 L2</h2>
                            <p>
                                Lesson Title Lesson Title Lesson Title Lesson
                                Title Lesson Title Lesson Title
                            </p>
                        </div>
                    </div> -->
                </div>
                <NoDataFoundVue v-else />
            </div>
        </div>
    </div>

    <ChangePersonalizedRecommendation v-if="displayPersonalizedModal" v-model="displayPersonalizedModal"
        :lessonItem="lessonItem" @close="closeLessonModal" />


    <ModalComp v-if="isPastSessionModal" :show="isPastSessionModal" @close="isPastSessionModal = false">
        <template #header>
            <div style="display: flex; justify-content: center; width: 100%;">
                <h3><b>지난 회차는 변경할 수 없습니다.</b></h3>
            </div>
        </template>
        <template #footer>
            <div class="modal-sec">
                <div class="find-password-dtls">
                    <button type="submit">확인</button>
                </div>
            </div>
        </template>
    </ModalComp>

</template>

<script setup>
import { onMounted, ref } from "vue";
import { Customization } from "@/services/Customization/Customization.js";
import ChangePersonalizedRecommendation from "@/components/Learning/CustomTrainingSetting/ChangePersonalizedRecommendation.vue";
import { useUserData } from "@/stores/useUserDataCopy";
const userStore = useUserData();
const CustomizationService = new Customization();
const displayPersonalizedModal = ref(false);
const recommendation_list = ref([]);
const lessonItem = ref({});
const lectureImage = ref("");
const isPastSessionModal = ref(false);

// const recommendation_list = ref([
//     {
//         "class_seq": 114762,
//         "class_name": "Executive",
//         "course_seq": 13622,
//         "course_name": "현대차기아 임원어학과정 (이성식 부사장님)",
//         "lecture_name": "Fluency Issue 62 Unit 5-8",
//         "lecture_seq": 3999,
//         "unit_seq": 10864,
//         "lecture_thumb_image": "",
//         "unit_seq_title": "U5-1",
//         "unit_name": "U5-1 Raising the Next Generation of Leaders",
//         "is_sample": 0,
//         "is_done": 0
//     },
//     {
//         "class_seq": 114762,
//         "class_name": "Executive",
//         "course_seq": 13622,
//         "course_name": "현대차기아 임원어학과정 (이성식 부사장님)",
//         "lecture_name": "Fluency Issue 62 Unit 5-8",
//         "lecture_seq": 3999,
//         "lecture_thumb_image": "https://exi.spep.co.kr/files/undefined/[FE65]_cover1.jpg",
//         "unit_seq": 10865,
//         "unit_seq_title": "U5-2",
//         "unit_name": "U5-2 How To Gain Insight Within Your Company",
//         "is_sample": 0,
//         "is_done": 0
//     },
//     {
//         "class_seq": 114762,
//         "class_name": "Executive",
//         "course_seq": 13622,
//         "course_name": "현대차기아 임원어학과정 (이성식 부사장님)",
//         "lecture_name": "Fluency Issue 62 Unit 5-8",
//         "lecture_seq": 3999,
//         "lecture_thumb_image": "https://exi.spep.co.kr/files/undefined/[FE65]_cover1.jpg",
//         "unit_seq": 10866,
//         "unit_seq_title": "U5-3",
//         "unit_name": "U5-3 Should Leaders Empower or Take Charge?",
//         "is_sample": 0,
//         "is_done": 0
//     },
//     {
//         "class_seq": 114762,
//         "class_name": "Executive",
//         "course_seq": 13622,
//         "course_name": "현대차기아 임원어학과정 (이성식 부사장님)",
//         "lecture_name": "Fluency Issue 62 Unit 5-8",
//         "lecture_seq": 3999,
//         "lecture_thumb_image": "https://exi.spep.co.kr/files/undefined/[FE65]_cover1.jpg",
//         "unit_seq": 10867,
//         "unit_seq_title": "U6-1",
//         "unit_name": "U6-1 What Was the Last Item You Returned?",
//         "is_sample": 0,
//         "is_done": 1
//     },
//     {
//         "class_seq": 114762,
//         "class_name": "Executive",
//         "course_seq": 13622,
//         "course_name": "현대차기아 임원어학과정 (이성식 부사장님)",
//         "lecture_name": "Fluency Issue 62 Unit 5-8",
//         "lecture_seq": 3999,
//         "lecture_thumb_image": "https://exi.spep.co.kr/files/undefined/[FE65]_cover1.jpg",
//         "unit_seq": 10868,
//         "unit_seq_title": "U6-2",
//         "unit_name": "U6-2 Who Are Your Best Customers?",
//         "is_sample": 0,
//         "is_done": 0
//     }
// ]);

const getPersonalized = (data) => {
    if (data.is_done == 1) {
        isPastSessionModal.value = true;
    } else {
        lessonItem.value = data;
        displayPersonalizedModal.value = true;
    }
};

const closeLessonModal = () => {
    displayPersonalizedModal.value = false;
    getLessonRecommendationList();
};

const getLessonRecommendationList = async () => {
    try {
        //loaderState.value = true;
        const res = await CustomizationService.lessonRecommendationList();
        if (res.data) {
            recommendation_list.value = res.data.recommendation_list;

            let imageData = recommendation_list.value.find((item) => {
                if (item.lecture_thumb_image) {
                    return item.lecture_thumb_image;
                }
            });
            lectureImage.value = imageData ? imageData.lecture_thumb_image : null;
        }
    } catch (error) {
        console.log(error);
    } finally {
        //loaderState.value = false;
    }
};

onMounted(async () => {
    await getLessonRecommendationList();
});

</script>