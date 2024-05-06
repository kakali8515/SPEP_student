import { UAPI, API, errCheck } from "@/services/API";
import { Token } from "../Token";
export class Notification {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }

  async notificationList() {
    try {
      return await API(await this.getToken()).get(
        "/student/mypage/notification-list"
      );
    } catch (e) {
      console.log("e", e);
    }
  }
}
