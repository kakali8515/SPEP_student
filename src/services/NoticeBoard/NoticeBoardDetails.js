import { API } from '@/services/API';
import { Token } from '../Token';

export class NoticeBoardDetails {
    async getToken() {
        const local = new Token();
        return await local.getWithExpiry("user").then((r) => r.token);
    }

    async getNoticeBoardDetails(data) {
        try {
            return await API(await this.getToken()).post('/student/class/notice-details', data);
        } catch (e) {
            console.log('e', e);
        }
    }

    async getNoticeBoard(data) {
        try {
            return await API(await this.getToken()).post('student/class/notice-list', data);
        } catch (e) {
            console.log('e', e);
        }
    }

    async readNoticeBoard(data) {
        try {
            return await API(await this.getToken()).post('student/class/read-notice', data);
        } catch (e) {
            console.log('e', e);
        }
    }
}