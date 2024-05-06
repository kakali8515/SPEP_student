<template>
    <section class="enrolment-sec">
        <div class="container">
            <div class="row">
                <div class="web100">
                    <div class="heading">
                        <h2>수강신청</h2>
                    </div>
                    <div class="main-wrap">
                        <div class="required-info">
                            <span>* 필수 입력사항 입니다.</span>
                            <p>선택사항 초기화 <button type="button" @click="onResetEnrollment">
                                    <img src="@/assets/icons/reset.svg">
                                </button></p>
                        </div>
                        <!-- ===== ## CLASS TYPE ## ======= -->
                        <div class="education-type-wrap">
                            <h4>교육타입을 선택해주세요 <span>*</span></h4>
                            <div class="type-wrapper">
                                <div class="row">
                                    <div class="col-md-4 col-sm-12" v-for="item in getEducationTypeList">
                                        <EnrollmentBadge :isActive="item.program3_seq === enrollmentObj.selectedClassType"
                                            :text="item.program3" @onSelect="onSelectClassType(item)" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <OneToOneEnrollment v-if="enrollmentObj.selectedClassType === 1" @checkMyLevel="showCheckMyLevel" @notProcced="onOpenExccedModal"/>
                        <SmallGroupEnrollment v-if="enrollmentObj.selectedClassType === 2" @checkMyLevel="showCheckMyLevel" @notProcced="onOpenExccedModal"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <LoaderVue :loading="isLoading"/>
    <!-- LEVEL Details Modal :: start-->
    <ModalComp v-if="checkMyLevelVisibility" :show="checkMyLevelVisibility" @close="checkMyLevelVisibility = false" mWidth="688px" :defaultCloseBtn="false">
        <template #body>
            <div class="modal-sec  ffgfg">
                <div class="close">
                    <button type="button" @click="checkMyLevelVisibility = false">
                        <img src="@/assets/icons/modal-close.svg">
                    </button>
                </div>
                <div class="check-my-level-modal-area">
                    <div class="heading">
                        <h4>나의 레벨 확인하기</h4>
                    </div>
                    <div class="modal-table">
                        <table class="table">
                            <tbody>
                                <tr v-for="item in getClassLevelList" :key="item.level">
                                    <td>Level {{ item.level }}</td>
                                    <td>{{ item.description }}</td>
                                    <td>{{ item.score }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                
            </div>
        </template>
    </ModalComp>
    <!-- Student Exceeds Modal :: start -->
    <ModalComp v-if="exceedModalVisibility" :show="exceedModalVisibility" @close="onCloseExceedModal">
        <template #header>
            <div style="display: flex; justify-content: center; text-align: center; margin: 10px;">
                <h4 v-if="popupMsg" style="width: 85%; margin: 0px auto;"><b>{{popupMsg}}</b></h4>
                <h4 v-else style="width: 85%; margin: 0px auto;"><b>해당 과목의 수강인원이 초과되었습니다</b></h4>
            </div>
        </template>
        <template #footer>
            <div style="padding-top: 10px;">
                <button class="blue-square-btn" @click="onCloseExceedModal">확인</button>
            </div>
        </template>
    </ModalComp>
</template>
<script setup>
import EnrollmentBadge from "@/components/enrollment/EnrollmentBadge.vue";
import SmallGroupEnrollment from "@/components/enrollment/SmallGroupEnrollment.vue";
import OneToOneEnrollment from "@/components/enrollment/OneToOneEnrollment.vue";
import { useEnrollment } from "@/stores/useEnrollment";
import { useUserData } from "@/stores/useUserData";
import { storeToRefs } from "pinia";
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const { getUserData } = storeToRefs(useUserData());
const userStore = useUserData()
const route = useRoute();
const router = useRouter();
const store = useEnrollment();
// Actions
const { fetchEducationTypeList, fetchPrimaryRegionList, fetchClassLevelList, resetSelection, fetchSmallGroupSubjectList } = useEnrollment();
// Getters
const { getEducationTypeList, getClassLevelList } = storeToRefs(useEnrollment());

// Initialize
const isLoading = ref(false);
const checkMyLevelVisibility = ref(false);
const exceedModalVisibility = ref(false);
const isCompanyClassVacancy = ref(false);
const enrollmentObj = reactive({
    selectedClassType: null
});
const popupMsg = ref("");

const onSelectClassType = async (_data) => {
    resetSelection();
    enrollmentObj.selectedClassType = _data.program3_seq;
    store.$patch({ selected_edu_type: _data.program3_seq });

    await fetchSmallGroupSubjectList();
};

const onResetEnrollment = () => {
    enrollmentObj.selectedClassType = null;
    resetSelection();
}
const showCheckMyLevel = () => {
    checkMyLevelVisibility.value = true;
}
const onOpenExccedModal = (_data) => {
    exceedModalVisibility.value = true;
    //isCompanyClassVacancy.value = _data.companyClassVacancy;
    popupMsg.value = _data;
}
const onCloseExceedModal = () => {
    exceedModalVisibility.value = false;
    setTimeout(() => {
        router.push({name: 'MainHome'});
    }, 100);
}
onMounted(async () => {
    isLoading.value = true;
    store.$patch({program1_seq: route.params.id});
    store.$patch({year: route.params.year});
    store.$patch({order_num: route.params.order_num});
    await fetchClassLevelList();
    await userStore.getUserDetails(); // For fetching user details 
    store.$patch({company_id: getUserData.value.company_id}); // Storing company_id from user details
    Promise.all([fetchEducationTypeList(), fetchPrimaryRegionList()]).then((res) => {
        isLoading.value = false;
    })
    // await fetchSmallGroupSubjectList();
})
onUnmounted(()=> {
    store.$reset();
})
</script>