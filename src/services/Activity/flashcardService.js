import { API, errCheck } from "@/services/API";
import { Token } from "../Token";

class FlashcardService {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }

  async getFlashCard() {
    try {
      return await API(await this.getToken()).get(
        "/student/activityType/get-flashcard"
      );
    } catch (e) {
      return errCheck(e);
    }
  }
  async getSimilarityScore() {
    try {
      return await API(await this.getToken()).get(
        "/student/activityTypes/get-similarity-score"
      );
    } catch (e) {
      return errCheck(e);
    }
  }
}

export default new FlashcardService();
