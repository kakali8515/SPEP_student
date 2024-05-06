import { UAPI, API, errCheck } from '@/services/API';
import { Token } from '../../Token';

export class Shadowing {
    async getToken() {
        const local = new Token();
        return await local.getWithExpiry("user").then((r) => r.token);
    }

    async getShadowingData(data) {
        try {
            return await API(await this.getToken()).post('/student/activityTypes/get-activity-type-showding', data);
        } catch (e) {
            return errCheck(e);
        }
    }

    async getActivityData(data) {
        try {
            return await API(await this.getToken()).get(`/student/activity/${data}`);
        } catch (e) {
            return errCheck(e);
        }
    }

    async submitActivityData(data) {
        try {
            return await API(await this.getToken()).post('/student/activity', data);
        } catch (e) {
            return errCheck(e);
        }
    }

    async getSimilarityScore(data) {
        try {
            return await API(await this.getToken()).post('/student/activityTypes/get-similarity-score', data);
        } catch (e) {
            return errCheck(e);
        }
    }

}