import { UAPI, API, errCheck } from "@/services/API";
import { Token } from "../Token";
export class MemberPointInfo {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }
  async myPagePointInfo(data) {
    try {
      return await API(await this.getToken()).post(
        "student/mypage/mypage-point-details",
        data
      );
    } catch (e) {
      console.log("e", e);
    }
  }
}
