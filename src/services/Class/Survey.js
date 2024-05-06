import { UAPI, API, errCheck } from "@/services/API";
import { Token } from "../Token";

export class Survey {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }

  async getSurveyLists() {
    try {
      return await API(await this.getToken()).post(
        "/student/class/survey-list"
      );
    } catch (e) {
      return errCheck(e);
    }
  }

  async getSurveyQuestions(data) {
    try {
      return await API(await this.getToken()).post(
        "/student/class/get-survey-questions-list",
        data
      );
    } catch (e) {
      return errCheck(e);
    }
  }
  async submitSurveyAnswers(data) {
    try {
      return await API(await this.getToken()).post(
        "/student/class/submit-survey-answers",
        data
      );
    } catch (e) {
      return errCheck(e);
    }
  }

  async getAlwaysFeedbackLists() {
    try {
      return await API(await this.getToken()).post(
        "/student/class/always-feedback-list"
      );
    } catch (e) {
      return errCheck(e);
    }
  }
}
