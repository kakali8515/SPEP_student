
import { API } from '@/services/API';
import { Token } from '../../../Token';

export class Listening {
    async getToken() {
        const local = new Token();
        return await local.getWithExpiry("user").then((r) => r.token);
    }

    async getListeningAlpList(data) {
        try {

            return await API(await this.getToken()).post('student/learning/my-list/listening/alp',data);
        } catch(e){
            console.log('e', e);
        }
    }
    async getListeningFocusList(data) {
        try {

            return await API(await this.getToken()).post('student/learning/my-list/listening/focus-list',data);
        } catch(e){
            console.log('e', e);
        }
    }
    async getFocusListDetails(data) {
        try {

            return await API(await this.getToken()).post('student/learning/my-list/listening/focus-list/details',data);
        } catch(e){
            console.log('e', e);
        }
    }
    async deleteSelectedItems(payload){
        try{
            return await API(await this.getToken()).delete('student/learning/my-list/listening/delete',{ data: payload });
        }catch(e){
            console.log('e',e);
        }
    }
}
