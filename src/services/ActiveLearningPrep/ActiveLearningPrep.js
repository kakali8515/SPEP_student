import { API } from "@/services/API";
import { Token } from "../Token";

export class ActiveLearningPrep {
  async getToken() {
    const local = new Token();
    return await local.getWithExpiry("user").then((r) => r.token);
  }

  async getAlpLearningList() {
    try {
      return await API(await this.getToken()).get("student/learning/smart");
    } catch (e) {
      console.log("e", e);
    }
  }
  async getWhatsNew(data) {
    try {
      return await API(await this.getToken()).post(
        "student/home/get-whats-new-detail",
        data
      );
    } catch (e) {
      console.log("e", e);
    }
  }
  async getWhatsNewCategoryList() {
    try {
      return await API(await this.getToken()).post(
        "student/learning/get-whats-new-cat-list"
      );
    } catch (e) {
      console.log("e", e);
    }
  }
  async getWhatsNewListByCat(data) {
    try {
      return await API(await this.getToken()).post(
        "student/learning/get-whats-new-list-view-by-cat",
        data
      );
    } catch (e) {
      console.log("e", e);
    }
}
async getSelfDiagnosisData() {
    try {
        return await API(await this.getToken()).get('student/registration/self-diagnosis-questionnaire');
    } catch(e){
        console.log('e', e);
    }
}
  
  async getWhatsNewList(data) {
    try {
      return await API(await this.getToken()).post(
        "student/learning/get-whats-new-list-by-cat",
        data
      );
    } catch (e) {
      console.log("e", e);
    }
  }
  async getAlpSmartDetailsFormData(data) {
    try {
      return await API(await this.getToken()).post(
        "student/learning/active-learning-prep/form",
        data
      );
    } catch (e) {
      console.log("e", e);
    }
  }
  async downloadDocFile(data) {
    try {
      return await API(await this.getToken()).post(
        "student/learning/active-learning-prep/assignment",
        data,
        {
          responseType: "arraybuffer",
        }
      );
    } catch (e) {
      console.log("e", e);
    }
  }
  async submitAlpSmartFormData(data) {
    try {
      return await API(await this.getToken()).post(
        "student/learning/active-learning-prep/submit",
        data
      );
    } catch (e) {
      console.log("e", e);
    }
  }
  async addSelfDiagnosisData(data) {
    try {
        return await API(await this.getToken()).post('student/registration/self-diagnosis-questionnaire/add',data);
    } catch(e){
        console.log('e', e);
    }
}
}
