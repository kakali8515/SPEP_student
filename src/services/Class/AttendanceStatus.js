import { API } from "@/services/API";
import { Token } from "../Token";
export class AttendanceStatus {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }
  async getProgramList(data) {
    try {
      return await API(await this.getToken()).get(
        "student/class/program2-list"
      );
    } catch {
      console.log("e", e);
    }
  }

  async getProgramDetails(data) {
    try {
      return await API(await this.getToken()).post(
        `student/class/program2-details`,
        data
      );
    } catch (e) {
      console.log("e", e);
    }
  }

  async getAttendanceList(data) {
    try {
      return await API(await this.getToken()).post(
        "student/class/attendance-status-list",
        data
      );
    } catch {
      console.log("e", e);
    }
  }

  async getAttendancePercentage(data) {
    try {
      return await API(await this.getToken()).post(
        "student/class/get-attendance-percentage",
        data
      );
    } catch {
      console.log("e", e);
    }
  }

  async getClinicDetails(data) {
    try {
      return await API(await this.getToken()).post(
        "student/class/get-clinic-details",
        data
      );
    } catch {
      console.log("e", e);
    }
  }
}
