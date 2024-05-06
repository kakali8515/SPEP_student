<template>
    <!-- ===== ## REGION ## ======= -->
    <div class="primary-region">
        <h4>1차 지역을 선택해주세요 <span>*</span></h4>
        <!-- ======== PRIMARY REGION ========= -->
        <div class="type-wrapper">
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-6" :key="idx" v-for="(item, idx) in getPrimaryRegionList">
                    <EnrollmentBadge class="type" :isActive="enrollmentObj.primaryRegion === item"
                        :text="item.area_name_kr" @onSelect="onSelectPrimaryRegion(item)" />
                </div>
            </div>
        </div>
        <!-- ======= SECONDARY REGION ====== -->
        <div class="secondary-region">
            <h4>2차 지역을 선택해주세요 <span>*</span></h4>
            <div class="type-wrapper" v-if="enrollmentObj.primaryRegion">
                <div class="row">
                    <div class="col-md-4 col-sm-6 col-xs-6" :key="idx" v-for="(item, idx) in getSecondaryRegionList">
                        <EnrollmentBadge class="type" :isActive="enrollmentObj.secondaryRegion === item"
                            :text="item.area_detail_name_kr" @onSelect="onSelectSecondaryRegion(item)" />
                    </div>
                </div>
            </div>
            <div class="box" v-if="!enrollmentObj.primaryRegion || !getSecondaryRegionList.length">
                <p>{{ !enrollmentObj.primaryRegion ? '선택된 지역이 없습니다' : '선택 가능한 항목이 없습니다.'}}</p>
            </div>
        </div>
    </div>
    <!-- ===== ## DAY ## ======= -->
    <div class="primary-region" v-if="enrollmentObj.secondaryRegion">
        <h4>수강 요일을 선택해주세요 <span>*</span></h4>
        <div class="type-wrapper" v-if="getClassScheduleListList.length">
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12 custom-wrapper">
                    <div class="custom-box" v-for="item in getClassScheduleListList">
                        <EnrollmentBadge class="type b-radious" :isActive="enrollmentObj.day === item"
                            :text="item.day_of_week" @onSelect="onSelectDay(item)" />
                    </div>
                </div>
            </div>
        </div>
        <div class="secondary-region" v-else>
            <div class="box" >
                    <p>선택 가능한 항목이 없습니다.</p>
            </div>
        </div>
    </div>
    <!-- ===== ## TIME ## ======= -->
    <div class="primary-region" v-if="enrollmentObj.secondaryRegion">
        <h4>수강 시간을 선택해주세요 <span>*</span></h4>
        <div class="type-wrapper">
            <div class="row">
                <!-- SHIFT -->
                <div class="col-md-3 col-sm-12">
                    <div class="select-wrap extra-margin">
                        <select :disabled="!enrollmentObj.day" v-model="enrollmentObj.shift" @change="onSelectShift">
                            <option :value="item.value" v-for="(item, idx) in shiftDropdown" :key="idx">{{ item.text }}
                            </option>
                        </select>
                    </div>
                </div>
                <!-- TIME -->
                <div class="col-md-5 col-sm-12">
                    <div class="select-wrap">
                        <select :disabled="!enrollmentObj.day" v-model="enrollmentObj.time"
                            @change="onSelectTime(enrollmentObj.time)">
                            <option :value="null" disabled>시간 선택</option>
                            <option :value="item" :key="idx" v-for="(item, idx) in timeList">
                                {{ `${item.start_time} - ${item.end_time}` }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ===== ## SUBJECT ## ======= -->
    <div class="primary-region" v-if="enrollmentObj.time">
        <h4>과목을 선택해주세요 <span>*</span></h4>
        <div class="type-wrapper">
            <div class="row">
                <div class="col-md-4 col-sm-6" v-for="(item, idx) in getOneToOneSubjectList" :key="idx">
                    <EnrollmentBadge class="b-radious" :isActive="enrollmentObj.subject === item" :text="item.program2"
                        @onSelect="onSelectSubject(item)" />
                </div>
            </div>
        </div>
    </div>
    <!-- =========## ESP CLASS LESSON ##======== -->
    <div class="primary-region" v-if="isEsp">
        <h4>학습 레슨을 선택해주세요 <span>*</span></h4>
        <div class="mnth-select-wrapper">
            <div class="month-wrapper">
                <p>Month 1 </p>
                <div class="select-wrap">
                    <select v-for="item in 4" v-model="lessonForm[`lesson${item}`]">
                        <option :value="null" disabled>레슨을 선택해주세요</option>
                        <option v-for="(lesson, idx) in filterClassLessonList" :key="idx" :value="lesson"
                            :class="{ 'd-none': lesson.hidden }">{{ lesson.unit_name }}</option>
                    </select>
                </div>
            </div>
            <div class="month-wrapper">
                <p>Month 2 </p>
                <div class="select-wrap">
                    <select v-for="item in 4" v-model="lessonForm[`lesson${item + 4}`]">
                        <option :value="null" disabled>레슨을 선택해주세요</option>
                        <option v-for="(lesson, idx) in filterClassLessonList" :key="idx" :value="lesson"
                            :class="{ 'd-none': lesson.hidden }">{{ lesson.unit_name }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <!-- ===== ## LEVEL ## ======= -->
    <div class="primary-region" v-if="(enrollmentObj.subject && !isEsp) || (isEsp && isSelectedAllLessonForEsp)">
        <div class="heading-wrap">
            <h4>레벨을 선택해주세요 <span>*</span></h4>
            <a href="javascript:void(0)" @click="$emit('checkMyLevel')">*나의 레벨 확인하기</a>
        </div>
        <div class="type-wrapper">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="select-wrap extra-margin">
                        <select v-model="enrollmentObj.level">
                            <option :value="null" disabled>선택</option>
                            <option :value="item.level" :key="idx" v-for="(item, idx) in getClassLevelList">Level {{
                                item.level }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ===== ## INSTRUCTOR ## ======= -->
    <div class="primary-region border0" v-if="enrollmentObj.level">
        <h4>선호 강사를 입력해주세요</h4>
        <div class="type-wrapper">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="select-wrap extra-margin">
                        <input type="text" v-model.trim="enrollmentObj.instructor" placeholder="선호 강사명을 입력해 주세요" />
                    </div>
                    <div class="alert">
                        <p>*수강 이력이 있는 교육생은 선호하는 강사가 있다면 강사 이름을 적어주세요.(단, 배정상황에 따라 강사는 변경될 수 있습니다.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="button-wrap" v-if="enrollmentObj.level">
        <button type="button" @click="onSubmit">수강신청하기</button>
    </div>
    <LoaderVue :loading="isLodaing" />
</template>
<script setup>
import EnrollmentBadge from "./EnrollmentBadge.vue";
import { ref, reactive, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useEnrollment } from "@/stores/useEnrollment";
import { includes, isEqual } from "lodash";
import { useRouter } from "vue-router";

const emit = defineEmits(['checkMyLevel', 'notProcced']);
const store = useEnrollment();
const router = useRouter();
const { fetchSecondaryRegionList, fetchOneToOneClassTimeList, fetchOneToOneClassScheduleList, fetchEspClassLessonList, submitOneToOneNonEspEnrollment, submitOneToOneEspEnrollment, fetchOneToOneSubjectList } = useEnrollment();
const { getOneToOneSubjectList, getPrimaryRegionList, getSecondaryRegionList, getClassScheduleListList, getClassTimeList, getClassLevelList, getClassLessonList } = storeToRefs(useEnrollment());
const shiftDropdown = [
    { text: '오전', value: 'AM' },
    { text: '오후 ', value: 'PM' }
];
const isLodaing = ref(false);
const isEsp = ref(false);
const enrollmentObj = reactive({
    subject: null,
    primaryRegion: null,
    secondaryRegion: null,
    day: null,
    shift: 'AM',
    time: null,
    level: null,
    instructor: '',
});
const lessonForm = reactive({
    lesson1: null,
    lesson2: null,
    lesson3: null,
    lesson4: null,
    lesson5: null,
    lesson6: null,
    lesson7: null,
    lesson8: null,
});
const timeList = computed(() => enrollmentObj.shift === 'PM' ? getClassTimeList.value.pm_list : getClassTimeList.value.am_list);
const filterClassLessonList = computed(() => {
    const list = Object.values(lessonForm)?.map(item => item?.unit_seq);
    const finalList = getClassLessonList.value.map((item) => {
        item.hidden = includes(list, item?.unit_seq);
        return item;
    });
    return finalList
})
// ====== CHECKING ALL 8 LESSON SELECTED
const isSelectedAllLessonForEsp = computed(() => {
    const list = Object.values(lessonForm);
    const check = list.every(item => item);
    return check;
})

// ======= ### SELECT PRIMARY REGION ### =========
const onSelectPrimaryRegion = async (_data) => {
    enrollmentObj.primaryRegion = _data;
    store.$patch({ selected_primary_region: _data.area_code });

    // RESET OTER SELECTION
    resetSelction(7);
    resetLessonMiddleWare();
    try {
        isLodaing.value = true;
        await fetchSecondaryRegionList();  
        await fetchOneToOneSubjectList();
    } catch (error) {
        console.log(error);
    } finally {
        isLodaing.value = false;
    }
}
// ======= ### SELECT SECONDARY REGION ### =========
const onSelectSecondaryRegion = async (_data) => {
    enrollmentObj.secondaryRegion = _data;
    store.$patch({ selected_secondary_region: _data.area_details_code });
    // RESET OTER SELECTION
    resetSelction(6);
    resetLessonMiddleWare();
    // API CALL
    try {
        isLodaing.value = true;
         await fetchOneToOneClassScheduleList(); 
    } catch (error) {
        console.log(error);
    } finally {
        isLodaing.value = false;
    }
}
// ======= ### SELECT DAY ### =========
const onSelectDay = async (_data) => {
    enrollmentObj.day = _data;
    store.$patch({ selected_day: _data.day_of_week_num })
    // RESET OTER SELECTION
    resetSelction(5);
    resetLessonMiddleWare();
    // API CALL
    try {
        isLodaing.value = true;
        await fetchOneToOneClassTimeList();
    } catch (error) {
        console.log(error);
    } finally {
        isLodaing.value = false;
    }
}
// ======= ### SELECT SHIFT ### =========
const onSelectShift = () => {
    resetSelction(4);
    resetLessonMiddleWare();
}
// ======= ### SELECT TIME ### =========
const onSelectTime = (_data) => {
    // RESET OTER SELECTION
    resetSelction(3);
    resetLessonMiddleWare();
}
// ======= ### SELECT SUBJECT ### =========
const onSelectSubject = async (_data) => {
    store.$patch({ course_seq: _data.course_seq });
    isEsp.value = _data.esp;
    enrollmentObj.subject = _data;
    // RESET OTER SELECTION
    resetSelction(2);
    resetLessonSelection();
    // API CALL
    if (!isEsp.value) return;
    try {
        isLodaing.value = true;
         await fetchEspClassLessonList();
    } catch (error) {
        console.log(error);
    } finally {
        isLodaing.value = false;
    }
}
// ======== RESET ============
const resetSelction = (_count) => {
    for (let index = 1; index <= _count; index++) {
        switch (index) {
            case 1: enrollmentObj.instructor = ""; 
                break;
            case 2: enrollmentObj.level = null; 
                break;
            case 3: enrollmentObj.subject = null; 
                break;
            case 4: enrollmentObj.time = null;
                break;
            case 5: enrollmentObj.shift = 'AM'; 
                break;
            case 6: enrollmentObj.day = null; 
                break;
            case 7: enrollmentObj.secondaryRegion = null; 
                break;
        } 
    }
}
const resetLessonMiddleWare = () => {
    if (!isEsp.value) return;
    isEsp.value = false;
    resetLessonSelection();
}
const resetLessonSelection = () => {
    for (let i = 1; i <= 8; i++) {
        lessonForm[`lesson${i}`] = null;       
    }
}
// ========== SUBMIT ===========
const onSubmit = async () => {
    const obj = {
        company_id: store.company_id,
        program1_seq: store.program1_seq, // From routes
        program3_seq: store.selected_edu_type, // Education type  
        area_code1: enrollmentObj.primaryRegion.area_code, // Primary Region
        area_code2: enrollmentObj.secondaryRegion.area_details_code, // Secondary Region
        class_seq: enrollmentObj.time.class_seq, // Time
        o_course_seq: enrollmentObj.time.o_course_seq, // Time
        o_course_location_seq: enrollmentObj.time.o_course_location_seq, // Time
        program2_seq: enrollmentObj.subject.program2_seq, // Subject
        course_seq: enrollmentObj.subject.course_seq, // Subject
        course_location_seq: enrollmentObj.subject.course_location_seq, // Subject
        level: enrollmentObj.level, // Level
        teacher: enrollmentObj.instructor, // Teacher
    }
    if (isEsp.value) {
        const list = Object.values(lessonForm);
        obj.lecture = list;
    }
    try {
        isLodaing.value = true;
        const res = isEsp.value ? await submitOneToOneEspEnrollment(obj) : await submitOneToOneNonEspEnrollment(obj);
        if (res.data.success) {
            if (res.data.enrolmentStatus === 'waiting') {
                emit('notProcced', res.data);
                return;
            }
            const id = res.data.data.cr_seq;
            const type = isEsp.value ? 'oto-esp' : 'oto-non-esp';
            router.push(`/enrollment-details/course-reg/${type}/${id}`);
        } else if (!res.data.success && res.data.message === 'noVacancy'){
            router.push({name: 'MainHome'});
        }
    } catch (error) {
        console.log(error);
    } finally {
        isLodaing.value = false;
    }
}
</script>