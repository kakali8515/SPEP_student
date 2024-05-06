import { API } from "@/services/API";
import { Token } from "../Token";
export class AssessmentService {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }
  async getAssessmentDetails(data) {
    try {
      return await API(await this.getToken()).post(
        "student/class/get-feedback-assessment-category-options-form",
        data
      );
    } catch {
      console.log("e", e);
    }
  }
  async submitAssessmentDetails(data) {
    try {
      return await API(await this.getToken()).post(
        "student/class/submit-assement-feedback",
        data
      );
    } catch {
      console.log("e", e);
    }
  }
}
