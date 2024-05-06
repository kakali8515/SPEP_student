import { defineStore } from 'pinia'
import { API, CAPI, errCheck } from "@/services/API";
import { Token } from "@/services/Token";
export const useEnrollment = defineStore('enrollment', {
    state: () => ({
        company_id: null,
        program1_seq: null, 
        order_num: null,
        year: null,
        selected_subject: null, // program2_seq
        selected_edu_type: null, // program3_seq
        selected_primary_region: null, // area_code1
        selected_secondary_region: null, // area_code2
        selected_day: null, // day_of_week
        selected_time: null, 
        course_seq: null,
        // FOR STORING API DATA
        education_type_list: [],
        sg_subject_list: [],
        oto_subject_list: [],
        primary_region_list: [],
        secondary_region_list: [],
        class_schedule_list: [],
        class_level_list: [],
        class_time_list: {
            am_list: [],
            pm_list: []
        },
        class_lesson_list: [],
        real_course_seq : "",
        real_course_location_seq: ""

    }),

    actions: {
        async getToken() {
            const local = new Token();
            return await local.getWithExpiry("user").then((r) => r.token);
        },
        setFieldValue(fieldObj) {
            const { field, value } = fieldObj;
            this[field] = value;
        },
        // ========== EDUCATION TYPE ===========
        async fetchEducationTypeList() {
            const obj = {
                company_id: this.company_id,
                program1_seq: this.program1_seq
            }
            try {
                const res = await API(await this.getToken()).post("student/registration/education-type", obj);
                if (res.status !== 200) throw new Error('Something went wrong');
                this.education_type_list = res.data.list.reverse();
                return res;
            } catch (e) {
                return errCheck(e);
            }
        },
        // ========== SUBJECTS FOR SMALL GROUP ===========
        // async fetchSmallGroupSubjectList() {
        //     const obj = {
        //         company_id: this.company_id,
        //         program1_seq: this.program1_seq
        //     }
        //     try {
        //         const res = await API(await this.getToken()).post("student/registration/sg-subjects", obj);
        //         if (res.status !== 200) throw new Error('Something went wrong');
        //         this.sg_subject_list = res.data.list;
        //         return res;
        //     } catch (e) {
        //         return errCheck(e);
        //     }
        // },

        async fetchSmallGroupSubjectList() {
            const obj = {
                company_id: this.company_id.toString(),
                program1_seq: this.program1_seq,
                program3_seq: this.selected_edu_type.toString(),
                area_code1: this.selected_primary_region,
                area_code2: this.selected_secondary_region
            }
            try {
                const res = await CAPI(await this.getToken()).post("request_program2", obj);
                if (res.status !== 200) throw new Error('Something went wrong');
                this.sg_subject_list = res.data.data;
                return res;
            } catch (e) {
                return errCheck(e);
            }
        },

        // ========== SUBJECTS FOR 1:1  ===========
        async fetchOneToOneSubjectList() {
            const obj = {
                company_id: this.company_id,
                program1_seq: this.program1_seq,
                program3_seq: this.selected_edu_type,
                order_num: this.order_num,
                year: this.year,
                area_code1: this.selected_primary_region
            }
            try {
                const res = await API(await this.getToken()).post("student/registration/one-to-one-subjects", obj);
                if (res.status !== 200) throw new Error('Something went wrong');
                this.oto_subject_list = res.data.list;
                return res;
            } catch (e) {
                return errCheck(e);
            }
        },
        // ========== PRIMARY REGION ===========
        // async fetchPrimaryRegionList() {
        //     const obj = {
        //         company_id: this.company_id
        //     }
        //     try {
        //         const res = await API(await this.getToken()).post("student/registration/primary-regions", obj);
        //         if (res.status !== 200) throw new Error('Something went wrong');
        //         this.primary_region_list = res.data.list;
        //         return res;
        //     } catch (e) {
        //         return errCheck(e);
        //     }
        // },

        async fetchPrimaryRegionList() {
            const obj = {
                company_id: this.company_id,
                program1_seq: this.program1_seq,
            }
            try {
                const res = await CAPI(await this.getToken()).post("request_area1_list", obj);
                if (res.status !== 200) throw new Error('Something went wrong');
                this.primary_region_list = res.data.data;
                return res;
            } catch (e) {
                return errCheck(e);
            }
        },

        // ========== SECONDARY REGION ===========
        // async fetchSecondaryRegionList() {
        //     const obj = {
        //         company_id: this.company_id,
        //         program1_seq: this.program1_seq,
        //         area_code: this.selected_primary_region
        //     }
        //     try {
        //         const res = await API(await this.getToken()).post("student/registration/secondary-regions", obj);
        //         if (res.status !== 200) throw new Error('Something went wrong');
        //         this.secondary_region_list = res.data.list;
        //         return res;
        //     } catch (e) {
        //         return errCheck(e);
        //     }
        // },
        async fetchSecondaryRegionList() {
            const obj = {
                company_id: this.company_id,
                program1_seq: this.program1_seq,
                area_code: this.selected_primary_region
            }
            try {
                const res = await CAPI(await this.getToken()).post("request_area2_list", obj);
                if (res.status !== 200) throw new Error('Something went wrong');
                this.secondary_region_list = res.data.data;
                return res;
            } catch (e) {
                return errCheck(e);
            }
        },
        // ========== CLASS SCHEDULE LIST (DAY) ===========
        // async fetchClassScheduleList() {
        //     const obj = {
        //         company_id: this.company_id,
        //         program1_seq: this.program1_seq,
        //         program2_seq: this.selected_subject,
        //         program3_seq: this.selected_edu_type,
        //         area_code1: this.selected_primary_region,
        //         area_code2: this.selected_secondary_region
        //     }
        //     try {
        //         const res = await API(await this.getToken()).post("student/registration/class-schedule", obj, { headers: {"Accept-Language": "ko" } });
        //         if (res.status !== 200) throw new Error('Something went wrong');
        //         this.class_schedule_list = res.data.list;
        //         return res;
        //     } catch (e) {
        //         return errCheck(e);
        //     }
        // },

        async fetchClassScheduleList() {
            const obj = {
                company_id: this.company_id,
                program1_seq: this.program1_seq,
                program2_seq: this.selected_subject,
                program3_seq: this.selected_edu_type,
                area_code1: this.selected_primary_region,
                area_code2: this.selected_secondary_region
            }
            try {
                const res = await CAPI(await this.getToken()).post("request_course_schedule ", obj, { headers: {"Accept-Language": "ko" } });
                if (res.status !== 200) throw new Error('Something went wrong');
                this.class_schedule_list = res.data.data;
                return res;
            } catch (e) {
                return errCheck(e);
            }
        },
        // ========== CLASS TIME LIST  ===========
        async fetchClassTimeList() {
            const obj = {
                company_id: this.company_id,
                program1_seq: this.program1_seq,
                program2_seq: this.selected_subject,
                program3_seq: this.selected_edu_type,
                area_code1: this.selected_primary_region,
                area_code2: this.selected_secondary_region,
                day_of_week: this.selected_day,
            }
            try {
                const res = await API(await this.getToken()).post("student/registration/class-time", obj);
                if (res.status !== 200) throw new Error('Something went wrong');
                this.class_time_list.am_list = res.data.classAM;
                this.class_time_list.pm_list = res.data.classPM;
                return res;
            } catch (e) {
                return errCheck(e);
            }
        },

        // ========== LEVEL  ===========
        async fetchClassLevelList() {
            try {
                const res = await API(await this.getToken()).get("student/registration/check-my-level");
                if (res.status !== 200) throw new Error('Something went wrong');
                this.class_level_list = res.data.list;
                return res;
            } catch (e) {
                return errCheck(e);
            }
        },
        // =============== RSET SELECTION ============
        resetSelection() {
            this.selected_subject = null; // program2_seq
            this.selected_edu_type = null; // program3_seq
            this.selected_primary_region = null; // area_code1
            this.selected_secondary_region = null; // area_code2
            this.selected_day = null; // day_of_week
            this.selected_time = null; 
            this.course_seq = null;
        },



        // ============ For 1:1 ============
        // ========== 1:1 CLASS SCHEDULE LIST (DAY) ===========
        async fetchOneToOneClassScheduleList() {
            const obj = {
                company_id: this.company_id,
                program1_seq: this.program1_seq,
                program3_seq: this.selected_edu_type,
                area_code1: this.selected_primary_region,
                area_code2: this.selected_secondary_region
            }
            try {
                const res = await API(await this.getToken()).post("student/registration/class-schedule-esp", obj, { headers: {"Accept-Language": "ko" } });
                if (res.status !== 200) throw new Error('Something went wrong');
                this.class_schedule_list = res.data.list;
                return res;
            } catch (e) {
                return errCheck(e);
            }
        },
        // ========== 1:1 CLASS TIME LIST  ===========
        async fetchOneToOneClassTimeList() {
            const obj = {
                company_id: this.company_id,
                program1_seq: this.program1_seq,
                program3_seq: this.selected_edu_type,
                area_code1: this.selected_primary_region,
                area_code2: this.selected_secondary_region,
                day_of_week: this.selected_day,
            }
            try {
                const res = await API(await this.getToken()).post("student/registration/class-time-esp", obj);
                if (res.status !== 200) throw new Error('Something went wrong');
                this.class_time_list.am_list = res.data.classAM;
                this.class_time_list.pm_list = res.data.classPM;
                return res;
            } catch (e) {
                return errCheck(e);
            }
        },
        // ========== ESP CLASS LESSON LIST  ===========
        // async fetchEspClassLessonList() {
        //     const obj = {
        //         course_seq: this.course_seq
        //     }
        //     try {
        //         const res = await API(await this.getToken()).post("student/registration/lesson-selection", obj);
        //         if (res.status !== 200) throw new Error('Something went wrong');
        //         this.class_lesson_list = res.data.list;
        //         return res;
        //     } catch (e) {
        //         return errCheck(e);
        //     }
        // },

        async fetchEspClassLessonList() {
            const obj = {
                company_id: this.company_id,
                course_seq: this.course_seq
            }
            try {
                const res = await CAPI(await this.getToken()).post("request_unit_list", obj);
                if (res.status !== 200) throw new Error('Something went wrong');
                this.class_lesson_list = res.data.data;
                return res;
            } catch (e) {
                return errCheck(e);
            }
        },
        

        // Submit API for Small Group
        // async submitSmallGroupEnrollment(data) {
        //     try {
        //         const res = await API(await this.getToken()).post("student/registration/sg-enrolment", data);
        //         return res;
        //     } catch (e) {
        //         return errCheck(e);
        //     }
        // },
        async submitSmallGroupEnrollment(data) {
            try {
                const res = await CAPI(await this.getToken()).post("request_class_v2", data);
                return res;
            } catch (e) {
                return errCheck(e);
            }
        },
        async submitOneToOneNonEspEnrollment(data) {
            try {
                const res = await API(await this.getToken()).post("student/registration/oto-enrolment", data);
                return res;
            } catch (e) {
                return errCheck(e);
            }
        },
        async submitOneToOneEspEnrollment(data) {
            try {
                const res = await API(await this.getToken()).post("student/registration/esp-enrolment", data);
                return res;
            } catch (e) {
                return errCheck(e);
            }
        },
        // Get Enrollment Details
        async fetchEnrollmentDetails(data, type) {
            let endPoint; type;
            if (type === 'small') { // Small Group
                endPoint = 'my-sg-enrolment'
            } else if (type === 'oto-non-esp') { // 1:1 Non ESP Enrollment
                endPoint = 'my-oto-enrolment'
            } else if (type === 'oto-esp') { // 1:1 ESP Enrollment
                endPoint = 'esp-course-registration'
            }
            try {
                const res = await API(await this.getToken()).post(`student/registration/${endPoint}`, data);
                return res;
            } catch (e) {
                return errCheck(e);
            }
        },

        async fetchRealCourseSeq() {
            const obj = {
                company_id: this.company_id,
                program1_seq: this.program1_seq,
                program2_seq: this.selected_subject,
                program3_seq: this.selected_edu_type,
                area_code1: this.selected_primary_region,
                area_code2: this.selected_secondary_region
            }
            try {
                const res = await CAPI(await this.getToken()).post("get_real_course_seq", obj);
                if (res.status !== 200) throw new Error('Something went wrong');
                this.real_course_seq = res.data.course_seq;
                this.real_course_location_seq = res.data.course_location_seq;
                return res;
            } catch (e) {
                return errCheck(e);
            }
        },
        
    },
    getters: {
        getEducationTypeList: (state) => state.education_type_list,
        getOneToOneSubjectList: (state) => state.oto_subject_list,
        getSmallGroupSubjectList: (state) => state.sg_subject_list,
        getPrimaryRegionList: (state) => state.primary_region_list,
        getSecondaryRegionList: (state) => state.secondary_region_list,
        getClassScheduleListList: (state) => state.class_schedule_list,
        getClassTimeList: (state) => state.class_time_list,
        getClassLevelList: (state) => state.class_level_list,
        getClassLessonList: (state) => state.class_lesson_list,
    },
})