<template>
    <div class="tab-body">
        <!-- ======== HIDDEN FOR NOW -->
        <div class="body-area" v-if="hideSec">
            <div class="head">
                <h4>모바일 학습</h4>
                <p>앱 학습률 <span>80</span>%</p>
            </div>
            <div class="message">
                <p>그래프에 대한 설명이 들어갑니다. 그래프에 대한 설명이 들어갑니다. </p>
            </div>
            <!-- <div class="pagination">
                <ul class="page-area">
                    <li>Fluency: <span>87</span><span>단어 / 분</span></li>
                    <li>Pronunciation: <span>87%</span></li>
                </ul>
                <ul class="bullet-area">
                    <li><img src="@/assets/icons/blue-bullet.svg"> <span>87단어 / 분</span></li>
                    <li><img src="@/assets/icons/grey-bullet.svg"> <span>87%</span></li>
                </ul>
            </div> -->
            <div class="main-area">
                <div class="with-data">
                    <div class="option">
                        <ul>
                            <li><span></span>나</li>
                            <li><span class="gray"></span>과정 평균</li>
                        </ul>
                    </div>
                   
                    <div class="row progress-main-area">
                    <div class="col-md-4 col-sm-12 p-col">
                        <div class="progress-area">
                            <div class="hear-wrap d-flex ">
                            <h2>Vocabulary</h2>
                            <div class="pagination">
                                <ul class="page-area">
                                    <li>Fluency: <span>80</span><span>단어 / 분</span></li>
                                    <li>Pronunciation: <span>52%</span></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="full-progress">
                            <img src="@/assets/images/range.svg">
                        </div>
                        </div>
                        
                    </div>
                    <div class="col-md-4 col-sm-12 p-col">
                        <div class="progress-area">
                            <div class="hear-wrap d-flex ">
                            <h2>Diversity</h2>
                            <div class="pagination">
                                <ul class="page-area">
                                    <li>Fluency: <span>80</span><span>단어 / 분</span></li>
                                    <li>Pronunciation: <span>52%</span></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="full-progress">
                            <img src="@/assets/images/range.svg">
                        </div>
                        </div>
                        
                    </div>
                    <div class="col-md-4 col-sm-12 p-col">
                        <div class="progress-area">
                            <div class="hear-wrap d-flex ">
                            <h2>Precision</h2>
                            <div class="pagination">
                                <ul class="page-area">
                                    <li>Fluency: <span>80</span><span>단어 / 분</span></li>
                                    <li>Pronunciation: <span>52%</span></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="full-progress">
                            <img src="@/assets/images/range.svg">
                        </div>
                        </div>
                        
                    </div>
                
                    <div class="col-md-4 col-sm-12 p-col">
                        <div class="progress-area">
                            <div class="hear-wrap d-flex ">
                            <h2>Accuracy</h2>
                            <div class="pagination">
                                <ul class="page-area">
                                    <li>Fluency: <span>80</span><span>단어 / 분</span></li>
                                    <li>Pronunciation: <span>52%</span></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="full-progress">
                            <img src="@/assets/images/range.svg">
                        </div>
                        </div>
                        
                    </div>
                    <div class="col-md-4 col-sm-12 p-col">
                        <div class="progress-area">
                            <div class="hear-wrap d-flex ">
                            <h2>Content</h2>
                            <div class="pagination">
                                <ul class="page-area">
                                    <li>Fluency: <span>80</span><span>단어 / 분</span></li>
                                    <li>Pronunciation: <span>52%</span></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="full-progress">
                            <img src="@/assets/images/range.svg">
                        </div>
                        </div>
                        
                    </div>
                    <div class="col-md-4 col-sm-12 p-col">
                        <div class="progress-area">
                            <div class="hear-wrap d-flex ">
                            <h2>Comprehension</h2>
                            <div class="pagination">
                                <ul class="page-area">
                                    <li>Fluency: <span>80</span><span>단어 / 분</span></li>
                                    <li>Pronunciation: <span>52%</span></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="full-progress">
                            <img src="@/assets/images/range.svg">
                        </div>
                        </div>
                        
                    </div>
                    </div>
                    
                </div>
                <div class="no-data" style="display: none;">
                    <p>진행중인 학습이 없습니다.</p>
                </div>
                
            </div>
        </div>
        <div class="learning-slider">
            <div class="heading">
                <h1>ALP로 SMART하게 수업을 준비하세요!</h1>
            </div>
            <div class="subheader">
                <p>Active Learning Prep에 대한 설명이 들어갑니다. </p>
            </div>
            <div class="slider-area">
                <div class="heading-wrap">
                    <h4 class="d-flex justify-content-start align-items-center">S.M.A.R.T. Conversation 1
                        <span v-if="filteredSmartList.length" @click="$router.push('/alp-all-smart-list')" class="pointer">전체보기 <img src="@/assets/icons/page-arrow.svg"></span>
                    </h4>
                    <ul v-if="hideSec">
                        <li>Quiz 정답률<span>80%</span></li>
                        <li>학습률<span>52%</span></li>
                    </ul>
                </div>
                <!-- <div class="no-data-found" v-if="filteredSmartList.length <= 0">조회 가능한 목록이 없습니다.</div> -->
                <div class="no-data" v-if="filteredSmartList.length <= 0">
                    <p>진행중인 학습이 없습니다.</p>
                </div>
                <carouselCard v-else :smartList="filteredSmartList"></carouselCard>
            </div>
           
        </div>
        <LoaderVue :loading="isLoading" />
    </div>
</template>
<script setup>
import 'vue3-carousel/dist/carousel.css'
import { onMounted, ref, computed } from 'vue'
import { ActiveLearningPrep } from "@/services/ActiveLearningPrep/ActiveLearningPrep.js";
import carouselCard from '@/components/activeprep/carousel.vue'
import moment from 'moment';
const ActivePrepService = new ActiveLearningPrep();
const isLoading = ref(false);
const smartList = ref([])
const hideSec = ref(false);
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
// const filteredSmartList = computed(() => {
//     const currentDate = moment();
//     return smartList.value.filter(item => moment(item.due_date, 'YYYY-MM-DD').endOf('day') >= currentDate);
// });
const filteredSmartList = computed(() => {
    const currentDate = moment();
    const futureItems = smartList.value.filter(item => moment(item.due_date, 'YYYY-MM-DD').endOf('day') >= currentDate);
    const pastItems = smartList.value.filter(item => moment(item.due_date, 'YYYY-MM-DD').endOf('day') < currentDate);

    // Sort future items by remaining days in ascending order (least remaining days first)
    futureItems.sort((a, b) => {
        const aRemainingDays = moment(a.due_date, 'YYYY-MM-DD').endOf('day').diff(currentDate, 'days');
        const bRemainingDays = moment(b.due_date, 'YYYY-MM-DD').endOf('day').diff(currentDate, 'days');
        return aRemainingDays - bRemainingDays;
    });

    // Sort past items by remaining days in ascending order (least remaining days first)
    pastItems.sort((a, b) => {
        const aRemainingDays = moment(a.due_date, 'YYYY-MM-DD').endOf('day').diff(currentDate, 'days');
        const bRemainingDays = moment(b.due_date, 'YYYY-MM-DD').endOf('day').diff(currentDate, 'days');
        return aRemainingDays - bRemainingDays;
    });

    // Concatenate future items and past items
    const sortedSmartList = [...futureItems, ...pastItems];
// console.log('sorted smart list', sortedSmartList)
    return sortedSmartList;
});
onMounted(() => {
    getAlpSmartList()
})

</script>