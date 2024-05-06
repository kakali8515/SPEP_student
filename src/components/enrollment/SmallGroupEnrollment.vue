<template>
    <!-- ===== ## SUBJECT [SMALL GROUP] ## ======= -->
    <div class="primary-region">
        <h4>과목을 선택해주세요 <span>*</span></h4>

        <div class="type-wrapper">
            <div class="row">
                <div class="col-md-4 col-sm-6" v-for="(item, idx) in getSmallGroupSubjectList" :key="idx">
                    <EnrollmentBadge class="b-radious" :isActive="enrollmentObj.subject === item" :text="item.program2"
                        @onSelect="onSelectSubject(item)" />
                </div>
            </div>
        </div>
    </div>
    <!-- ===== ## REGION ## ======= -->
    <div class="primary-region" v-if="enrollmentObj.subject">
        <h4>1차 지역을 선택해주세요 <span>*</span></h4>
        <!-- ======== PRIMARY REGION ========= -->
        <div class="type-wrapper">
            <div class="select-area">
                <select @change="onSelectPrimaryRegion($event)">
                    <option value="" selected disabled>선택</option>
                    <option :value="item.area_code" :key="idx" v-for="(item, idx) in getPrimaryRegionList">
                        {{ item.area_name_kr }}</option>
                </select>
            </div>

            <!-- <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-6" :key="idx" v-for="(item, idx) in getPrimaryRegionList">
                         <EnrollmentBadge class="type" :isActive="enrollmentObj.primaryRegion === item"
                        :text="item.area_name_kr" @onSelect="onSelectPrimaryRegion(item)" />
                </div>
            </div> -->
        </div>
        <!-- ======== SECONDARY REGION ========= -->
        <div class="secondary-region">
            <h4>2차 지역을 선택해주세요 {{enrollmentObj.secondaryRegion}}<span>*</span></h4>
            <div class="type-wrapper" v-if="enrollmentObj.primaryRegion">
                <div class="select-area">
                    <select @change="onSelectSecondaryRegion($event)">
                        <option value="" :selected="enrollmentObj.secondaryRegion == ''" disabled>선택</option>
                        <option :selected="enrollmentObj.secondaryRegion === item.area_details_code" :value="item.area_details_code" :key="idx"
                            v-for="(item, idx) in getSecondaryRegionList">{{ item.area_d_name_kr }}</option>
                    </select>
                </div>
                <!-- <div class="row">
                    <div class="col-md-4 col-sm-6 col-xs-6" :key="idx" v-for="(item, idx) in getSecondaryRegionList">
                        <EnrollmentBadge class="type" :isActive="enrollmentObj.secondaryRegion === item"
                            :text="item.area_detail_name_kr" @onSelect="onSelectSecondaryRegion(item)" />
                    </div>
                </div> -->
            </div>
            <!-- No Data || Not selected -->
            <div class="box" v-if="!enrollmentObj.primaryRegion || !getSecondaryRegionList.length">
                <p>{{ !enrollmentObj.primaryRegion ? '선택된 지역이 없습니다' : '선택 가능한 항목이 없습니다.' }}</p>
            </div>
        </div>
    </div>
    <!-- ===== ## DAY ## ======= -->
    <div class="primary-region" v-if="enrollmentObj.secondaryRegion">
        <h4>수강 요일을 선택해주세요 <span>*</span></h4>
        <div class="type-wrapper" v-if="getClassScheduleListList.length">
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12 custom-wrapper">
                    <div class="custom-box" v-for="item in getClassScheduleListList[0]?.total_week.split(',')">
                        <EnrollmentBadge class="type b-radious" :isActive="enrollmentObj.day === item"
                            :text="daysMap[item]" @onSelect="onSelectDay(item)" />
                    </div>
                </div>
            </div>
        </div>
        <div class="secondary-region" v-else>
            <div class="box">
                <p>선택 가능한 항목이 없습니다.</p>
            </div>
        </div>
    </div>
    <!-- ===== ## SHIFT & TIME ## ======= -->
    <div class="primary-region" v-if="enrollmentObj.secondaryRegion">
        <h4>수강 시간을 선택해주세요 <span>*</span></h4>
        <div class="type-wrapper">
            <div class="row">
                <!-- ====== SHIFT ======= -->
                <div class="col-md-3 col-sm-12">
                    <div class="select-wrap extra-margin">
                        <select :disabled="!enrollmentObj.day" v-model="enrollmentObj.shift" @change="onSelectShift">
                            <option :value="item.value" v-for="(item, idx) in shiftDropdown" :key="idx">{{ item.text }}
                            </option>
                        </select>
                    </div>
                </div>
                <!-- ====== TIME ======= -->
                <div class="col-md-5 col-sm-12">
                    <div class="select-wrap">
                        <select :disabled="!enrollmentObj.day" v-model="enrollmentObj.time" @change="onSelectTime">
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
    <!-- ===== ## LEVEL ## ======= -->
    <div class="primary-region" v-if="enrollmentObj.time && enrollmentObj.day">
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
                        <!-- <select v-model="enrollmentObj.instructor">
                            <option :value="null" disabled>Select</option>
                            <option value="tech">선택</option>
                        </select> -->
                        <input type="text" v-model.trim="enrollmentObj.instructor" placeholder="선호 강사명을 입력해 주세요" />
                    </div>
                    <div class="alert blue-alert">
                        <p>*수강 이력이 있는 교육생은 선호하는 강사가 있다면 강사 이름을 적어주세요.(단, 배정상황에 따라 강사는 변경될 수 있습니다.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="button-wrap" v-if="enrollmentObj.level">
        <button type="button" @click="onSumbit">수강신청하기</button>
    </div>
    <!-- ======== LOADER ======== -->
    <LoaderVue :loading="isLodaing" />
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import moment from "moment";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import EnrollmentBadge from "./EnrollmentBadge.vue";
import { useEnrollment } from "@/stores/useEnrollment";
const emit = defineEmits(['checkMyLevel', 'notProcced']);
const store = useEnrollment();

import { useUserData } from "@/stores/useUserData";
const { getUserData } = storeToRefs(useUserData());
const loggedInUser = computed(() => getUserData.value.user_id);
const loggedInEmp_number = computed(() => getUserData.value.emp_number);

const { fetchSecondaryRegionList, fetchClassScheduleList, fetchClassTimeList, submitSmallGroupEnrollment, fetchRealCourseSeq } = useEnrollment();
const { getSmallGroupSubjectList, getPrimaryRegionList, getSecondaryRegionList, getClassScheduleListList, getClassTimeList, getClassLevelList } = storeToRefs(useEnrollment());
const router = useRouter();
const route = useRoute();
const isLodaing = ref(false);
const shiftDropdown = [
    { text: '오전', value: 'AM' },
    { text: '오후 ', value: 'PM' }
]
const daysMap = {
    1: "일요일",
    2: "월요일",
    3: "화요일",
    4: "수요일",
    5: "목요일",
    6: "금요일",
    7: "토요일",
};
const enrollmentObj = reactive({
    subject: null,
    primaryRegion: null,
    secondaryRegion: null,
    day: null,
    shift: 'AM',
    time: null,
    level: null,
    instructor: "",
})
const newTimeList = reactive({
    pm_list: [],
    am_list: [],
})
const timeList = computed(() => enrollmentObj.shift === 'PM' ? newTimeList.pm_list : newTimeList.am_list)
// ======= ### SELECT SUBJECT ### =========
const onSelectSubject = (_data) => {
    enrollmentObj.subject = _data;
    store.$patch({ selected_subject: _data.program2_seq })
    // RESET OTER SELECTION
    resetSelction(7);
}
// ======= ### SELECT PRIMARY REGION ### =========
const onSelectPrimaryRegion = async (_data) => {
    enrollmentObj.primaryRegion = _data.target.value;
    store.$patch({ selected_primary_region: _data.target.value });
    // RESET OTER SELECTION
    resetSelction(6);
    // API CALL
    try {
        isLodaing.value = true;
        await fetchSecondaryRegionList();
    } catch (error) {
        console.log(error);
    } finally {
        isLodaing.value = false;
    }
}
// ======= ### SELECT SECONDARY REGION ### =========
const onSelectSecondaryRegion = async (_data) => {
    enrollmentObj.secondaryRegion = _data.target.value;
    store.$patch({ selected_secondary_region: _data.target.value })
    // RESET OTER SELECTION
    resetSelction(5);
    // API CALL
    try {
        isLodaing.value = true;
        await fetchClassScheduleList();
        await fetchRealCourseSeq();
    } catch (error) {
        console.log(error);
    } finally {
        isLodaing.value = false;
    }
}
// ======= ### SELECT DAY ### =========
const onSelectDay = async (_data) => {
    enrollmentObj.day = _data;
    store.$patch({ selected_day: _data })
    // RESET OTER SELECTION
    resetSelction(4);

    let filterData = getClassScheduleListList.value.filter(
        (item) => item.day_of_week == _data
    );

    filterData.map((item) => {
        let start_time = moment({hour: item.start_hour, minute: item.start_minute }).format("HH:mm");
        let end_time = moment({hour: item.end_hour, minute: item.end_minute }).format("HH:mm");
        item.start_time = start_time;
        item.end_time = end_time;

        if (item.start_hour >= 12) newTimeList.pm_list.push(item);
        else newTimeList.am_list.push(item);
        return item;
    });

    // API CALL
    // try {
    //     isLodaing.value = true;
    //     await fetchClassTimeList() 
    // } catch (error) {
    //     console.log(error);
    // } finally {
    //     isLodaing.value = false;
    // }
}
// ======= ### SELECT SHIFT ### =========
const onSelectShift = () => {
    resetSelction(3)
}
// ======= ### SELECT TIME ### =========
const onSelectTime = (_data) => {
    // enrollmentObj.level = null;
}

// ======= ### SELECT LEVEL ### =========
const onSelectLevel = (_data) => {
    // enrollmentObj.instructor = "";
}
const resetSelction = (_count) => {
    for (let index = 1; index <= _count; index++) {
        switch (index) {
            case 1: enrollmentObj.instructor = "";
                break;
            case 2: enrollmentObj.level = null;
                break;
            case 3: enrollmentObj.time = null;
                break;
            case 4: enrollmentObj.shift = 'AM';
                break;
            case 5: enrollmentObj.day = null;
                break;
            case 6: enrollmentObj.secondaryRegion = "";
                break;
            case 7: enrollmentObj.primaryRegion = null;
                break;
        }
    }
}
const onSumbit = async () => {
    // const obj = {
    //     company_id: store.company_id, // required
    //     program1_seq: store.program1_seq, // required
    //     program2_seq: enrollmentObj.subject.program2_seq, // required
    //     program3_seq: store.selected_edu_type, // required
    //     area_code1: enrollmentObj.primaryRegion, // required
    //     area_code2: enrollmentObj.secondaryRegion, // required
    //     class_seq: enrollmentObj.time.class_seq, // required
    //     course_seq: enrollmentObj.time.course_seq, // required
    //     level: enrollmentObj.level, // required
    //     teacher: enrollmentObj.instructor
    // }

    const obj = {
    "program1_seq": store.program1_seq,
    "program3_seq": store.selected_edu_type,
    "order_num": route.params.order_num,
    "year": route.params.year,
    "user_id": loggedInUser.value,
    "course_seq": enrollmentObj.time.course_seq,
    "program2_seq": enrollmentObj.subject.program2_seq,
    "area1": enrollmentObj.primaryRegion, 
    "area2": enrollmentObj.secondaryRegion, 
    "level": enrollmentObj.level, 
    "schedule": enrollmentObj.time.course_schedule_seq,
    "class_seq": enrollmentObj.time.class_seq, 
    "emp_number": loggedInEmp_number.value,
    "topic": "", 
    "real_course_seq": store.real_course_seq, 
    "real_course_location_seq": store.real_course_location_seq, 
    "mobileYN": "Y",
    "teacher": enrollmentObj.instructor
}
console.log(obj)
//return
    try {
        isLodaing.value = true;
        const res = await submitSmallGroupEnrollment(obj);
        if (res.data.result) {
            if (res.data.user_status === 'W') {
                emit('notProcced');
                return;
            }
            const id = res.data.data;
            router.push(`/enrollment-details/course-reg/small/${id}`)
        } else if (!res.data.result) {
            emit('notProcced', res.data.msg);
            return;
        }
    } catch (error) {
        console.log(error);
    } finally {
        isLodaing.value = false;
    }
}
</script>