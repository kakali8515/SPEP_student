import { API } from "@/services/API";
import { Token } from "../Token";
export class LearningResource {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }
  async getLearningResourceList(data) {
    try {
      return await API(await this.getToken()).post(
        "student/class/learning-resource-room",
        data
      );
    } catch {
      console.log("e", e);
    }
  }
  async getLearningResourceDetails(data) {
    try {
      return await API(await this.getToken()).post(
        "student/class/learning-resource-room/details",
        data
      );
    } catch {
      console.log("e", e);
    }
  }

  async downloadResourceFile(data) {
    try {
      return await API(await this.getToken()).post(
        "student/class/learning-resource-room/download",
        data,
        { 'responseType': 'arraybuffer' }
      );
    } catch (e) {
      return errCheck(e);
    }
  }

  async getClassDetails(data) {
    try {
      return await API(await this.getToken()).post(
        "student/class/class-basic-details",
        data,
      );
    } catch (e) {
      return errCheck(e);
    }
  }
}
