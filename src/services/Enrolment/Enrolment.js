import { CUAPI, API, UAPI, errCheck } from '@/services/API';
import { Token } from '../Token';

export class Enrolment {
    async getToken() {
        const local = new Token();
        return await local.getWithExpiry("user").then((r) => r.token);
    }
    async checkMyLevelAn() {
        try {
            return await API(await this.getToken()).get("student/registration/check-my-level");
        } catch (e) {
            return errCheck(e);
        }
    }

    async afterCourseRegAn() {
        try {
            return await API(await this.getToken()).get('student/home/enrolment-history');
        } catch (e) {
            return errCheck(e)
        }
    }

    async beforeCourseRegAn(payload) {
        try {
            return await CUAPI.post('request_program1', payload);
        } catch (e) {
            return errCheck(e)
        }
    }
    // ====== Cancel Application ========
    async cancelApplication(payload) {
        try {
            return await API(await this.getToken()).post('student/home/delete-enrolment', payload);
        } catch(e){
            return errCheck(e);
        }
    }
    // ====== Cancel Waiting Application ========
    async cancelWaitingApplication(payload) {
        try {
            return await API(await this.getToken()).post('student/home/cancel-application', payload);
        } catch(e){
            return errCheck(e);
        }
    }

    async homeMainBanner() {
        try {
            return await API(await this.getToken()).get('student/home/banner1-img');
        } catch(e){
            return errCheck(e);
        }
    }
    
    async homeAdvBanner() {
        try {
            return await API(await this.getToken()).get('student/home/banner2-img');
        } catch(e){
            return errCheck(e);
        }
    }

}