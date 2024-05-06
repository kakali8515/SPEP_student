import { API, errCheck } from "@/services/API";
import { Token } from "../../../Token";

export class LevelTest {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }

  async getLevelTestData(data) {
    try {
      return await API(await this.getToken()).get(
        `/student/registration/level-test`,
        data
      );
    } catch (e) {
      return errCheck(e);
    }
  }
}
