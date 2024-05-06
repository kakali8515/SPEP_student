import { defineStore } from "pinia";
import { Cookie } from "@/services/Cookie";
import { Login } from "@/services/Auth/Login";
import { EditMemberInfo } from "@/services/MyPage/EditMemberInfo.js";
import { LearningMain } from "@/services/Learning/LearningMain/LearningMain.js";
export const useUserData = defineStore({
  id: "useUserData",
  state: () => ({
    user: {},
    onGoingCourse: [],
    cookie: new Cookie(),
    isMobileViewReady: false,
    userInfo: {},
    pointInfo: {},
    menuData: [],
    onGoingCourseStatus: [],
  }),
  actions: {
    getUserDetails() {
      return new Promise((resolve, reject) => {
        const loginService = new Login();
        if (Object.keys(this.user).length > 0) {
          resolve(this.user);
        } else {
          loginService.getUserDetails().then(
            (res) => {
              this.setUserData(res.data.user);
              this.onGoingCourse = res.data.ongoing_course;
              resolve(res);
            },
            (error) => {
              reject(error);
            }
          );
        }
      });
    },
    getOngoingCourseList() {
      return new Promise((resolve, reject) => {
        const LearningMainService = new LearningMain();
        if (this.onGoingCourseStatus.length > 0) {
          resolve(this.onGoingCourseStatus);
        } else {
          LearningMainService.getOngoingCourseList().then(
            (res) => {
              //this.onGoingCourseStatus = res.data.ongoing_course;
              this.setClassData(res.data.ongoing_course);
              resolve(res);
            },
            (error) => {
              reject(error);
            }
          );
        }
      });
    },
    getPointDetails() {
      return new Promise((resolve, reject) => {
        const EditMemberInfoService = new EditMemberInfo();
        if (Object.keys(this.pointInfo).length > 0) {
          resolve(this.pointInfo);
        } else {
          EditMemberInfoService.getMyInfo().then(
            (res) => {
              this.setPointData(res.data);
              resolve(res);
            },
            (error) => {
              reject(error);
            }
          );
        }
      });
    },
    getLearnMenuList() {
      return new Promise((resolve, reject) => {
        const LearningMainService = new LearningMain();
        if (this.menuData.length > 0) {
          resolve(this.menuData);
        } else {
          LearningMainService.getLearnMenuList().then(
            (res) => {
              this.setMenuData(res.data.list);
              resolve(res);
            },
            (error) => {
              reject(error);
            }
          );
        }
      });
    },
    setUserData(user_data) {
      this.user = { ...user_data };
    },
    setPointData(point_data) {
      this.pointInfo = { ...point_data };
    },
    setMenuData(menu_data) {
      this.menuData = menu_data;
    },
    setClassData(course_data) {
      this.onGoingCourseStatus = course_data;
    },
    setUserInfoData(user_data) {
      this.userInfo = { ...user_data };
    },
    removeUserData() {
      this.user = {};
      this.onGoingCourse = [];
    },
    removeUserInfoData() {
      this.userInfo = {};
    },
    removePonitData() {
      this.pointInfo = {};
    },
    removeMenuData() {
      this.menuData = [];
      this.onGoingCourseStatus = [];
    },
    fetchCurrentUser() {
      return new Promise((resolve, reject) => {
        resolve(this.user);
      });
    },
    resetUser() {
      this.user = {};
    },
  },
  getters: {
    getUserData: (state) => state.user,
    getUserOngoingCourses: (state) => state.onGoingCourse,
    getIsMobileViewReady: (state) => state.isMobileViewReady,
    getUserInfoData: (state) => state.userInfo,
    isUserLoggedIn: (state) => Object.keys(state.user).length > 0,
    getPointData: (state) => state.pointInfo,
    getMenuData: (state) => state.menuData,
    getOngoingCourseStatus: (state) => state.onGoingCourseStatus,
  },
});
