import { UAPI, API, errCheck } from "@/services/API";
import { Token } from "../../Token";

export class TopicBasedDiscussion {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }

  async getTopicBasedDiscussionData() {
    try {
      return await API(await this.getToken()).post(
        `/student/learning/get-learning-learn-tab-details`
      );
    } catch (e) {
      return errCheck(e);
    }
  }
  
}
