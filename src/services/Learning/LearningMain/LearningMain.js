import { API } from "@/services/API";
import { Token } from "../../Token";
export class LearningMain {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }
  async getLearnMenuList() {
    try {
      return await API(await this.getToken()).get(
        "student/learning/learn/menu"
      );
    } catch {
      console.log("e", e);
    }
  }

  async getSPAProgress(data) {
    try {
      return await API(await this.getToken()).post(
        `student/learning/learn/spa`,
        data
      );
    } catch {
      console.log("e", e);
    }
  }

  async getNonSPAProgress(data) {
    try {
      return await API(await this.getToken()).post(
        "student/learning/learn/non-spa",
        data
      );
    } catch {
      console.log("e", e);
    }
  }

  async getFocusArea(data) {
    try {
      return await API(await this.getToken()).post(
        "student/learning/learn/focus-areas",
        data
      );
    } catch (e) {
      console.log("e", e);
    }
  }
  async getALPData(data) {
    try {
      return await API(await this.getToken()).post(
        "student/learning/learn/alp",
        data
      );
    } catch {
      console.log("e", e);
    }
  }
  async getAllALPData(data) {
    try {
      return await API(await this.getToken()).post(
        "student/learning/learn/lesson-alp",
        data
      );
    } catch {
      console.log("e", e);
    }
  }

  async getOngoingCourseList() {
    try {
      return await API(await this.getToken()).get(
        "student/class/ongoing-course-status"
      );
    } catch {
      console.log("e", e);
    }
  }
}
