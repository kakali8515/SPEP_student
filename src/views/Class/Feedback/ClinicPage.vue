<template>
    <div class="tab-body">
        <div class="body-wrap">
            <div class="clinic-content-area">
                <table class="clinic-table">
                    <thead>
                        <tr>
                            <th class="fixed">수업일시</th>
                            <th class="fixed">강사</th>
                            <th>클래스</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in clinicDataList" :key="i">
                            <td>
                                <p>{{ item.program_date }}</p>
                                <p> {{ `${item.start_time} - ${item.end_time}` }}</p>
                            </td>
                            <td>
                                <p>{{ item.teacher_user_name_en }}</p>
                            </td>
                            <td>
                                <div class="seperate"><span class="texteclips">{{ item.lecture_content ? item.lecture_content : '-'
                                        }}</span> <img src="@/assets/icons/chevron-right.svg"
                                        @click="getFeedbackContent(item)">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <LoaderVue :loading="loaderState" />


    <ModalComp v-if="isFeedbackContent" :show="isFeedbackContent" @close="isFeedbackContent = false">
        <template #header>
            <div class="head-sec modal-header-text">
                <div class="clinic-modal-head">
                    <h3>1:1 Clinic Feedback</h3>
                    <span class="dateTim">{{ feedbackContent.program_date }} {{ `${feedbackContent.start_time} - ${feedbackContent.end_time}` }} &nbsp;|&nbsp; {{ feedbackContent.lecture_content }}</span>
                </div>
            </div>
        </template>
        <template #body>
            <div class="feedback-modal-content">
                <div class="clinic-modal-content">
                    
                    <p>{{ feedbackContent.feedback }}</p>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="modal-sec">
                <div class="find-password-dtls">
                    <button type="submit" @click="isFeedbackContent = false">닫기</button>
                </div>
            </div>
        </template>
    </ModalComp>

</template>
<script setup>
import { ref, onMounted } from "vue";
import { Feedback } from "@/services/Class/Feedback.js";
const FeedbackService = new Feedback();
const loaderState = ref(false);
const clinicDataList = ref([]);
const isFeedbackContent = ref(false);
const feedbackContent = ref("");

const getFeedbackContent = (item) => {
    isFeedbackContent.value = true;
    feedbackContent.value = item;
}
const getClinicData = async () => {
    try {
        loaderState.value = true;
        const res = await FeedbackService.feedbackClinic();
        if (res.data) {
            clinicDataList.value = res.data.list;
        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }
};

onMounted(async () => {
    await getClinicData();
});

</script>