import { MPAPI, API, errCheck } from "@/services/API";
import { Token } from "./../Token";

export class TestActivityService {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }

  async getStudentActivityTests(unitSeq) {
    try {
      return await API(await this.getToken()).get(
        `/student/activity/${unitSeq}`
      );
    } catch (e) {
      return errCheck(e);
    }
  }
  async activityTestRecordUpload(payload) {
    try {
      return await MPAPI(await this.getToken()).post(
        "/student/activity/test-record/upload",
        payload
      );
    } catch (e) {
      return errCheck(e);
    }
  }
  async finishTest(payload) {
    try {
      return await API(await this.getToken()).post(
        "/student/activity",
        payload
      );
    } catch (e) {
      return errCheck(e);
    }
  }
}
