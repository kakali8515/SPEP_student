import { UAPI, API, errCheck } from '@/services/API';
import { Token } from '../Token';

export class Customization {
    async getToken() {
        const local = new Token();
        return await local.getWithExpiry("user").then((r) => r.token);
    }

    async getCustomizationDetails(data) {
        try {
            return await API(await this.getToken()).get('/student/registration/custom-setting', data);
        } catch (e) {
            return errCheck(e);
        }
    }

    async addCustomizationData(data) {
        try {
            return await API(await this.getToken()).post(`/student/registration/custom-setting/add`, data);
        } catch (e) {
            return errCheck(e);
        }
    }

    // get answer list by category id
    async answerListByCatgoryId(exi_category_seq) {
        try {
            return await API(await this.getToken()).get(`student/registration/custom-setting/${exi_category_seq}`);
        } catch (e) {
            return errCheck(e);
        }
    }

    // get recommendation list
    async lessonRecommendationList() {
        try {
            return await API(await this.getToken()).post(`student/learning/custom-training/lesson-recommendation/list`);
        } catch (e) {
            return errCheck(e);
        }
    }

    async lessonModaldata() {
        try {
            return await API(await this.getToken()).post(`student/learning/custom-training/lesson-recommendation/modal-data`);
        } catch (e) {
            return errCheck(e);
        }
    }

    async lessonModalUpdatedata(inputData) {
        try {
            return await API(await this.getToken()).post(`student/learning/custom-training/lesson-recommendation/update`, inputData);
        } catch (e) {
            return errCheck(e);
        }
    }

    async resetCustomization(exiMemberSeq) {
        try {
            return await API(await this.getToken()).delete(`student/registration/custom-setting/${exiMemberSeq}`);
        } catch (e) {
            return errCheck(e);
        }
    }

}