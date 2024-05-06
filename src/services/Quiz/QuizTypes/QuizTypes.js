import { API } from "@/services/API";
import { Token } from "../../Token";
export class QuizTypes {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }

  async getQuizTypes(unit_seq) {
    try {
      return await API(await this.getToken()).get(
        `student/activity/${unit_seq}`
      );
    } catch (e) {
      console.log("e", e);
    }
  }

  async getTranslationDetails(data) {
    try {
        return await API(await this.getToken()).post('/student/class/translate', data);
    } catch (e) {
        console.log('e', e);
    }
  }

  async saveResponse(data) {
    try {
        return await API(await this.getToken()).post('/student/activity', data);
    } catch (e) {
        console.log('e', e);
    }
  }
}
