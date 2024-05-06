import { UAPI, API, errCheck } from "@/services/API";
import { Token } from "../Token";
export class EditMemberInfo {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }

  async verifyPassword(data) {
    try {
      return await API(await this.getToken()).post(
        "/student/mypage/verify-password",
        data
      );
    } catch (e) {
      console.log("e", e);
    }
  }
  async getMyInfo(data) {
    try {
      return await API(await this.getToken()).post(
        "/student/mypage/my-page",
        data
      );
    } catch (e) {
      console.log("e", e);
    }
  }
  async changeMyInfo(data) {
    try {
      return await API(await this.getToken()).post(
        "/student/mypage/change-information",
        data
      );
    } catch (e) {
      console.log("e", e);
    }
  }
  async changePassword(data) {
    try {
      return await API(await this.getToken()).post(
        "/student/mypage/change-password",
        data
      );
    } catch (e) {
      return e;
    }
  }
  async cancelMembership() {
    try {
      return await API(await this.getToken()).post(
        "/student/mypage/cancel-membership"
      );
    } catch (e) {
      console.log("e", e);
    }
  }

  async uploadProfileImage(data) {
    try {
      return await API(await this.getToken()).post(
        "/student/mypage/upload-profile-imge",data, { headers: { 'Content-Type': 'multipart/form-data' } }
      );
    } catch (e) {
      console.log("e", e);
    }
  }
}
