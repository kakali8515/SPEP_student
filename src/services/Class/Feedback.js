import { API, errCheck } from "@/services/API";
import { Token } from "../Token";
export class Feedback {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }
  async autoTranslate(data) {
    try {
      return await API(await this.getToken()).post(
        "student/class/translate", data);
    } catch (e) {
      return errCheck(e);
    }
  }

  async hakFeedbackDetails(data) {
    try {
      return await API(await this.getToken()).post(
        "student/class/feedback-details", data);
    } catch (e) {
      return errCheck(e);
    }
  }

  // async feedbackClinic() {
  //   try {
  //     return await API(await this.getToken()).post(
  //       "student/class/feedback-clinic");
  //   } catch (e) {
  //     return errCheck(e);
  //   }
  // }

  async feedbackClinic() {
    try {
      return await API(await this.getToken()).get(
        "student/class/clinic-feedback");
    } catch (e) {
      return errCheck(e);
    }
  }

  async logFeedback(data) {
    try {
      return await API(await this.getToken()).post(
        "student/class/feedback-checking", data);
    } catch (e) {
      return errCheck(e);
    }
  }

  async alwaysFeedbackQuestionList(data) {
    try {
      return await API(await this.getToken()).post(
        "student/class/get-always-feedback-questions-list", data);
    } catch (e) {
      return errCheck(e);
    }
  }

  async saveAlwaysFeedback(data) {
    try {
      return await API(await this.getToken()).post(
        "student/class/submit-alwaysFeedback-answers", data);
    } catch (e) {
      return errCheck(e);
    }
  }

}
