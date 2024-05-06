import { API } from "@/services/API";
import { Token } from "../Token";

export class Vocabulary {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }

  async getVocabularyList(data) {
    try {
      return await API(await this.getToken()).post(
        "student/learning/my-list/vocabulary",
        data
      );
    } catch (e) {
      console.log("e", e);
    }
  }
  async deleteSelectedItems(payload) {
    try {
      return await API(await this.getToken()).delete(
        "student/learning/my-list/vocabulary/delete",
        { data: payload }
      );
    } catch (e) {
      console.log("e", e);
    }
  }
}
