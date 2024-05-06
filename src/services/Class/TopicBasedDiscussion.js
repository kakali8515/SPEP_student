import { API } from "@/services/API";
import { Token } from "../Token";
export class TopicBasedDiscussion {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }
  async getFeedbackTabDetails(data) {
    try {
      return await API(await this.getToken()).post(
        "student/class/feedback-tab-details"
      );
    } catch {
      console.log("e", e);
    }
  }

  async getClassFeedback(data) {
    try {
      return await API(await this.getToken()).post(
        "student/class/feedback-class-details", data
      );
    } catch {
      console.log("e", e);
    }
  }

}
