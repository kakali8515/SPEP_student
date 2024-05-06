import { API, errCheck } from '@/services/API';
import { Token } from '../Token';

export class TopicBasedDiscussion {
    async getToken() {
        const local = new Token();
        return await local.getWithExpiry("user").then((r) => r.token);
    }

    async courseRegistraionMenu(data) {
        try {
            return await API(await this.getToken()).post('/student/learning/course-registration-menu', data);
        } catch (e) {
            return errCheck(e);
        }
    }

    async getFeedbackFocus(data) {
        try {
            return await API(await this.getToken()).post('/student/home/class-focus-feedback', data);
        } catch (e) {
            return errCheck(e);
        }
    }

    async getGrammerAccuracy() {
        try {
            return await API(await this.getToken()).get('/student/home/class-grammar-accuracy');
        } catch (e) {
            return errCheck(e);
        }
    }

}