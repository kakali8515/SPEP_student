import { UAPI, API, errCheck } from "@/services/API";
import { Token } from "../../../Token";

export class Feedback {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }

  async getFeedbcakList(data) {
    try {
      return await API(await this.getToken()).post(
        `/student/learning/my-list/feedback`,
        data
      );
    } catch (e) {
      return errCheck(e);
    }
  }
  async deleteSelectedItems(payload) {
    try {
      return await API(await this.getToken()).delete(
        "student/learning/my-list/feedback/delete",
        { data: payload }
      );
    } catch (e) {
      console.log("e", e);
    }
  }
}
