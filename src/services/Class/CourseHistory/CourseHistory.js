import { API } from "@/services/API";
import { Token } from "../../Token";
export class CourseHistory {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }
  async getCourseListViewALL() {
    try {
      return await API(await this.getToken()).post(
        "student/class/class-course-history-viewall"
      );
    } catch (e) {
      console.log("e", e);
    }
  }

  async getClassCourseHistoryPreferredTopic() {
    try {
      return await API(await this.getToken()).get(
        "student/class/class-history-preferred-topic"
      );
    } catch (e) {
      console.log("e", e);
    }
  }
  
  async getClassCourseHistoryTopicsToLearn() {
    try {
      return await API(await this.getToken()).get(
        "student/class/class-history-topics-to-learn"
      );
    } catch (e) {
      console.log("e", e);
    }
  }

  async getClassCourseHistoryMyTopics() {
    try {
      return await API(await this.getToken()).get(
        "student/class/class-history-my-topic"
      );
    } catch (e) {
      console.log("e", e);
    }
  }

  async getClassBestStudent() {
    try {
      return await API(await this.getToken()).get(
        "student/class/best-student-class"
      );
    } catch (e) {
      console.log("e", e);
    }
  }

  async getClassHistorySPAQuestionTypes() {
    try {
      return await API(await this.getToken()).get(
        "student/class/class-history-spa-question-types"
      );
    } catch (e) {
      console.log("e", e);
    }
  }

  async getClassHistoryBadgesEarned() {
    try {
      return await API(await this.getToken()).get(
        "student/class/class-history-badges-earned"
      );
    } catch (e) {
      console.log("e", e);
    }
  }
}
