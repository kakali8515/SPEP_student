import { UAPI, API, errCheck } from '@/services/API';
import { Token } from '../Token';
export class Login {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }
  async login(data) {
    try {
      return await UAPI.post("student/login", data);
    } catch (e) {
      return errCheck(e);
    }
  }
  //Get User Details
  async getUserDetails() {
    return await API(await this.getToken())
      .get(`student/me`)
      .then((r) => r)
      .catch((e) => errCheck(e));
  }
  async findPasswordSrvc(data) {
    try {
      return await UAPI.post("student/find-password", data, {
        headers: {
          "Accept-Language": "ko",
        }
      });
    } catch (e) {
      return errCheck(e);
    }
  }
  async resetPassword(data) {
    try {
      return await UAPI.post("student/reset-password", data);
    } catch (e) {
      return errCheck(e);
    }
  }
  async getCompanyDetails(data) {
    try {
      return await UAPI.post("student/getcompanydetails", data);
    } catch (e) {
      return errCheck(e);
    }
  }
  async signUp(data) {
    try {
      return await UAPI.post("student/signup", data);
    } catch (e) {
      return errCheck(e);
    }
  }
  async checkUserId(data) {
    try {
      return await UAPI.post("student/checkuserid", data);
    } catch (e) {
      return errCheck(e);
    }
  }
  async checkCleanUp(data) {
    try {
      return await UAPI.post("student/checkempnumber", data);
    } catch (e) {
      return errCheck(e);
    }
  }
  async verifyAuthCode(data) {
    try {
      return await UAPI.post("student/verify-auth", data);
    } catch (e) {
      return errCheck(e);
    }
  }
}
