import { UAPI, API, errCheck } from '@/services/API';
import { Token } from '../Token';

export class WhatsNew {
    async getToken() {
        const local = new Token();
        return await local.getWithExpiry("user").then((r) => r.token);
    }

    async getQuoteOfTheDay(data) {
        try {
            return await API(await this.getToken()).post(`/student/learning/quote-of-the-day`, data);
        } catch (e) {
            return errCheck(e);
        }
    }

    async getTodayshighLight() {
        try {
            return await API(await this.getToken()).get(`/student/learning/get-whats-new-todays-highlight`);
        } catch (e) {
            return errCheck(e);
        }
    }

    async getNewsList(data) {
        try {
            return await API(await this.getToken()).post(`/student/learning/get-whats-new-list-by-cat`, data);
        } catch (e) {
            return errCheck(e);
        }
    }

    async categoryList() {
        try {
            return await API(await this.getToken()).post(`/student/learning/get-whats-new-cat-list`);
        } catch (e) {
            return errCheck(e);
        }
    }

    async bookmarkAdd(data) {
        try {
            return await API(await this.getToken()).post(`/student/learning/bookmark/add`, data);
        } catch (e) {
            return errCheck(e);
        }
    }

    async bookmarkDelete(data) {
        try {
            return await API(await this.getToken()).post(`/student/learning/bookmark/delete`, data);
        } catch (e) {
            return errCheck(e);
        }
    }

    async myListWhatsNew(data) {
        try {
            return await API(await this.getToken()).post(`/student/learning/mylist/get-my-list-whats-new-by-cat`, data);
        } catch (e) {
            return errCheck(e);
        }
    }

    async getWhatsNewDetails(data) {
        try {
            return await API(await this.getToken()).post(`/student/learning/get-whats-new-detail`, data);
        } catch (e) {
            return errCheck(e);
        }
    }

    async newsLikeUnlike(data) {
        try {
            return await API(await this.getToken()).post(`/student/learning/whats-new/like-unlike`, data);
        } catch (e) {
            return errCheck(e);
        }
    }

    async pointUpdates(data) {
        try {
            return await API(await this.getToken()).post(`/student/learning/whats-new-point/add-update`, data);
        } catch (e) {
            return errCheck(e);
        }
    }
}