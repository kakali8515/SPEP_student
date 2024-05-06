<template>
     <section class="learning-viewall-sec">
        <div class="container-fluid">
            <div class="mainwrap">
                    <div class="learning-slider">
                    <div class="head-area">
                        <div class="heading">
                            <h1>ALP로 SMART하게 수업을 준비하세요!</h1>
                        </div>
                        <div class="subheader">
                            <p>Active Learning Prep에 대한 설명이 들어갑니다. </p>
                        </div>
                    </div>
                        <div class="slider-box-area">
                            <div class="heading-wrap">
                                <h4 class="d-flex justify-content-start align-items-center">S.M.A.R.T. Conversation 1
                                    <!-- <span>전체보기 <img src="@/assets/icons/page-arrow.svg"></span> -->
                                </h4>
                                <ul v-if="hideSec">
                                    <li>Quiz 정답률<span>80%</span></li>
                                    <li>학습률<span>52%</span></li>
                                </ul>
                            </div>
                        </div>
                        <div class="all-box-wrap">
                            <div class="slide-box" v-for="(data, index) in smartList" :key="index" @click="$router.push(`/alp-smart-details/${data.alp_seq}`)">
                                <h4>{{data.unit_seq_title}}</h4>
                                <a>{{ data.title }}</a>
                                <div class="add-info">
                                    <p>마감일: {{ koreanDateFormat(data.due_date) }}</p>
                                    <button class="grey-bg" v-if="data.is_submitted">완료</button>
                                    <button class="blue-bg" v-else>{{ countDay(data.due_date) }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="button-wrap">
                        <button class="list-btn" @click="$router.push('/alp-smart')">목록으로</button>
                    </div>
            </div>
        </div>
        <LoaderVue :loading="isLoading" />
        
     </section>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import moment from 'moment';
import useMixins from '@/composables/useMixins.js';
import { ActiveLearningPrep } from "@/services/ActiveLearningPrep/ActiveLearningPrep.js";
const { koreanDateFormat } = useMixins();
const ActivePrepService = new ActiveLearningPrep();
const smartList = ref([])
const isLoading = ref(false);
const hideSec = ref(false)
const getAlpSmartList = async () => {
    try {
        isLoading.value = true;
        let response = await ActivePrepService.getAlpLearningList();
        if (response.status == 200) {
            smartList.value = response.data.list
        }
    } catch (error) {
        console.error(error);
    }
    finally {
        isLoading.value = false;
    }
}
const countDay = (dueDate) => {
    const dueDateMoment = moment(dueDate);
    const currentDate = moment();
    const daysDifference = dueDateMoment.diff(currentDate, 'days');
    if (daysDifference == 0) {
        return 'D-Day';
    } else if (daysDifference > 0) {
        return `D-${daysDifference}`;
    } else {
        return `D+${-daysDifference}`;
    }
};
onMounted(() => {
    getAlpSmartList()
})
</script>