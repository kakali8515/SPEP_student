import ChatBox from "@/chat/views/ChatBox.vue";
import ChatList from "@/chat/views/ChatList.vue";
import SpepVideoChat from "@/chat/views/AgoraRtcRtm.vue";
import { Token } from "@/services/Token";
import { useUserData } from "@/stores/useUserData";
import { createRouter, createWebHistory } from "vue-router";
const enrollmentDetailsGuard = (to, form, next) => {
  if (["small", "oto-esp", "oto-non-esp"].includes(to.params.type)) {
    next();
  } else {
    next({ name: "MainHome" });
  }
};
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ======== LOGIN (update)========
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Auth/Login.vue"),
      meta: {
        disabledAurth: true,
      },
    },

    // ======== JOIN MEMBERSHIP (update)========
    {
      path: "/join-membership",
      name: "JoinMembership",
      component: () => import("@/views/JoinMembership.vue"),
      meta: {
        disabledAurth: true,
      },
    },
    // ======== FIND PASSWORD (update)========
    {
      path: "/find-password",
      name: "FindPassword",
      component: () => import("@/views/Auth/FindPassword.vue"),
      meta: {
        disabledAurth: true,
      },
    },

    // ======= MY PAGE ========
    {
      path: "/my-page",
      name: "MyPage",
      component: () => import("@/views/MyPage/EditMemberInfo/MyPage.vue"),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/edit-info-pw",
      name: "EditInfoPW",
      component: () => import("@/views/MyPage/EditMemberInfo/EditInfoPW.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "내 정보 변경",
      },
    },

    {
      path: "/edit-info-input",
      name: "EditMemberInfoInput",
      component: () =>
        import("@/views/MyPage/EditMemberInfo/EditMemberInfoInput.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "내 정보 변경",
      },
    },
    // update
    {
      path: "/change-password",
      name: "ChangePassword",
      component: () =>
        import("@/views/MyPage/ChangePassword/ChangePassword.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "비밀번호 변경",
      },
    },

    {
      path: "/point-details",
      name: "PointDetails",
      component: () => import("@/views/MyPage/PointsDetails/PointDetails.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "포인트 내역",
      },
    },

    {
      path: "/all-notification-list",
      name: "AllNotificationList",
      component: () =>
        import("@/views/MyPage/notifications/AllNotificationList.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "알림",
      },
    },

    {
      path: "/settings",
      name: "Settings",
      component: () => import("@/views/MyPage/settings/Settings.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "Settings",
      },
    },

    {
      path: "/terms-of-use",
      name: "TermsofUse",
      component: () => import("@/views/MyPage/settings/TermsofUse.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "Terms Of Use",
      },
    },

    {
      path: "/privacy-policy",
      name: "PrivacyPolicy",
      component: () => import("@/views/MyPage/settings/PrivacyPolicy.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "Privacy Policy",
      },
    },

    // ======== STUDENT MAIN HOME ==========
    {
      path: "/mypage",
      name: "MainHome",
      component: () =>
        import("@/views/LearningPage/Home/MainHomeMiddleware.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    //update
    {
      path: "/mypage/edit-member-info-password",
      name: "MyEditInfoPw",
      component: () => import("@/views/MyPage/EditMemberInfo/EditInfoPW.vue"),
    },
    {
      path: "/topic-based-discussion",
      name: "MainHomeTopicBasedDiscussion",
      component: () =>
        import("@/views/LearningPage/Home/MainHomeMiddleware.vue"),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/my-performance",
      name: "MyPerformance",
      component: () => import("@/views/LearningPage/Home/TBDMyPerformance.vue"),
    },
    {
      path: "/grammar-accuracy",
      name: "GrammarAccuracy",
      component: () =>
        import("@/views/LearningPage/Home/SPAGrammarAccuracy.vue"),
    },
    {
      path: "/feedback",
      name: "Feedback",
      component: () => import("@/views/LearningPage/Home/Feedback.vue"),
    },
    // ======== COMPANY MAIN HOME ========
    {
      path: "/",
      name: "CompanyHome",
      component: () => import("@/views/CompanyScreens/Home.vue"),
      // Checking: This route accesing in APP or not
      beforeEnter: async (to, from, next) => {
        const store = useUserData();
        const tokenUtil = new Token();
        const token = await tokenUtil.hasToken();
        if (store.getIsMobileViewReady) {
          if (token) {
            next({ name: "MainHome" });
          } else {
            next({ name: "Login" });
          }
        } else {
          next();
        }
      },
    },
    // ======== Contact Us =======
    {
      path: "/contact-us",
      name: "ContactUs",
      component: () => import("@/views/CompanyScreens/ContactUs.vue"),
    },
    // ======== Testimonial =======
    {
      path: "/testimonial",
      name: "Testimonial",
      component: () => import("@/views/CompanyScreens/Testimonial.vue"),
    },
    // ======== Notice =======
    {
      path: "/notice",
      name: "Notice",
      component: () => import("@/views/CompanyScreens/Notice.vue"),
    },
    // ======== Notice Details =======
    {
      path: "/notice-details/:id",
      name: "NoticeDetails",
      component: () => import("@/views/CompanyScreens/NoticeDetails.vue"),
    },

    {
      path: "/change-recomendation",
      name: "ChangeRecomendation",
      component: () => import("@/components/modal/ChangeRecomendation.vue"),
    },
    {
      path: "/customization-setting",
      name: "CustomizationSetting",
      component: () => import("@/views/Customization/CustomizationSetting.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "맞춤 교육 설정",
      },
    },

    // ======== Chat ========

    {
      path: "/chat/:room_name/:member/:session/:year/:id",
      name: "ChatBox",
      component: ChatBox,
      meta: {
        requiresAuth: true,
        headerTitle: "Message",
        breadcrumb: [
          {
            text: "Message",
          },
          {
            text: "Message",
            to: "ChatBox",
          },
        ],
      },
    },

    {
      path: "/chat-list",
      name: "ChatList",
      component: ChatList,
      meta: {
        requiresAuth: true,
        headerTitle: "Message",
        breadcrumb: [
          {
            text: "Message",
          },
          {
            text: "Message",
            to: "ChatListing",
          },
        ],
      },
    },
    {
      path: "/spep-video-chat/:room_name/:room_id/:call_type?",
      name: "SpepVideoChat",
      component: SpepVideoChat,
      meta: {
        requiresAuth: true,
        headerTitle: "Message",
      },
    },

    // {
    //   path: "/chat-list",
    //   name: "chat-list",
    //   component: () => import("@/views/Chat/Chat-list.vue"),
    // },

    // ======== ENROLLMENT LIST========
    {
      path: "/enrollment/:year/:order_num/:id",
      name: "Enrollment",
      component: () => import("@/views/Enrollment/EnrollmentView.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "수강신청",
      },
    },
    // ======== ENROLLMENT DETAILS ========
    {
      path: "/enrollment-details/:from/:type/:id", // type = 'small' || 'oto-esp' || 'oto-non-esp'
      name: "EnrollmentDetails",
      component: () => import("@/views/Enrollment/EnrollmentDetailsView.vue"),
      beforeEnter: enrollmentDetailsGuard,
      meta: {
        requiresAuth: true,
        headerTitle: "Enrollment Details",
      },
    },
    // ======== ALP SMART ========
    {
      path: "/alp-smart",
      name: "ALPSmart",
      component: () => import("@/views/Learning/ActiveLearningPrepView.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "ALP ",
      },
    },
    // ======== ALP SMART DETAILS ========
    {
      path: "/alp-smart-details/:id/:tab?",
      name: "ALPSmartDetails",
      component: () =>
        import("@/views/Learning/Smart/SmartActiveLearningPrepDetailsView.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "학습하기",
      },
    },

    // ======== SPA PREP COURSE ========
    {
      path: "/learn-topic-based-discussions",
      name: "LearnTopicBasedDiscussions",
      component: () =>
        import("@/views/Learning/LearningMain/LearnTopicBasedDiscussions.vue"),
    },

    {
      path: "/spa-prep-course/:tab?",
      name: "SpaPrepCourse",
      component: () =>
        import("@/views/Learning/LearningMain/SpaPrepCourse.vue"),
    },

    // ======== GENERAL VIEW ALL ========
    {
      path: "/general-view-all/:type/:class_seq/:tab?",
      name: "GeneralViewAll",
      component: () =>
        import("@/views/Learning/LearningMain/GeneralViewAll.vue"),
      meta: {
        headerTitle: "학습하기",
      },
    },

    // ======== GENERAL VIEW ALL ALP========
    {
      path: "/general-view-all-alp/:class_seq/:tab?",
      name: "GeneralViewAllALP",
      component: () =>
        import("@/views/Learning/LearningMain/GeneralViewAllALP.vue"),
      meta: {
        headerTitle: "학습하기",
      },
    },

    // ======== LEARNING SMART ========
    {
      path: "/learning-smart",
      name: "LearningSmart",
      component: () =>
        import("@/views/Learning/LearningMain/LearningSmart.vue"),
    },

    // ======== LEARNING PREP VIEW ALL ========
    {
      path: "/prep-view-all",
      name: "PrepViewAll",
      component: () =>
        import("@/views/Learning/LearningMain/LearningPrepViewAll.vue"),
    },

    // ======== ACTIVE LEARNING PREP DETAIL ALL ========
    {
      path: "/learning-prep-detail",
      name: "LearningPrepDetail",
      component: () =>
        import("@/views/Learning/LearningMain/ActiveLearningPrepDetail.vue"),
    },

    // ======== Learning-what's-new ========
    {
      path: "/learning-whats-new/:id",
      name: "LearningWhatsNew",
      component: () => import("@/views/Learning/WhatsNew/LearningWhatsNew.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "Learning What's New List",
      },
    },

    // ======== What's-new ========
    {
      path: "/whats-new",
      name: "WhatsNew",
      component: () => import("@/views/Learning/WhatsNew/WhatsNew.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "Learning What's New",
      },
    },

    {
      path: "/whats-new-list-by-topic/:id?",
      name: "WhatsNewListByTopic",
      component: () =>
        import("@/views/Learning/WhatsNew/WhatsNewListByTopic.vue"),
    },

    {
      path: "/my-list-whats-new",
      name: "MyListWhatsNew",
      // component: () => import("@/views/Learning/MyList/WhatsNew/WhatsNew.vue"),
      component: () => import("@/views/Learning/MyList/MyListView.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "My list What's New",
        type: "whats-new",
      },
    },

    // ======== LEARNING VIEW ALL SEARCH RESULT ========
    {
      path: "/view-all-search-result/:id",
      name: "ViewAllSearchResult",
      component: () =>
        import("@/views/Learning/WhatsNew/LearningViewAllSearchResult.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "What’s New",
      },
    },

    // ======== WHATS NEW AUDIO PHOTO ========
    {
      path: "/audio-photo/:id",
      name: "AudioPhoto",
      component: () =>
        import("@/views/Learning/WhatsNew/WhatsNewAudioPhoto.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "What’s New",
      },
    },

    // ======== LEARNING CUSTOM TRAINING SETTINGS ========
    {
      path: "/custom-training-setting",
      name: "CustomTrainingSetting",
      component: () =>
        import(
          "@/views/Learning/CustomTrainingSetting/LearningTrainingSettings.vue"
        ),
      meta: {
        requiresAuth: true,
        headerTitle: "Custom Training Setting",
      },
    },

    // ======== VOCABULARY ========
    {
      path: "/vocabulary",
      name: "Vocabulary",
      // component: () => import("@/views/Learning/MyList/Vocabulary/Vocabulary.vue"),
      component: () => import("@/views/Learning/MyList/MyListView.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "My List - Vocabulary",
        type: "vocabulary",
      },
    },
    // ======== VOCABULARY SELECT PLAY ========
    {
      path: "/select-play",
      name: "SelectPlay",
      component: () =>
        import("@/views/Learning/MyList/Vocabulary/VocabularySelectPlay.vue"),
      meta: {
        headerTitle: "My List Vocabulary",
      },
    },

    // ======== MY LIST LISTENING ========
    {
      path: "/listening",
      name: "Listening",
      component: () => import("@/views/Learning/MyList/MyListView.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "My List - Listening",
        type: "listening",
      },
    },
    // ======== MY LIST LISTENING ========
    // ======== MY LIST FEEDBACK ========
    {
      path: "/my-list-feedback",
      name: "MyListFeedBack",
      component: () =>
        // import("@/views/Learning/MyList/feedback/MyListFeedBack.vue"),
        import("@/views/Learning/MyList/MyListView.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "My List - Feedback",
        type: "listfeedback",
      },
    },

    {
      path: "/attendance-status",
      name: "AttendanceStatus",
      component: () =>
        import("@/views/Class/AttendanceStatus/ClassAttendanceStatus.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "Attendance Status",
      },
    },

    {
      path: "/feedback-topic-based-discussion",
      name: "TopicBasedDiscussion",
      component: () =>
        //import("@/views/Class/Feedback/TopicBasedDiscussion.vue"),
        import("@/views/Class/Feedback/FeedbackView.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "Feedback Topic based discussion",
      },
    },
    {
      path: "/feedback-details/:unit_id?/:class_id/:scheduleId",
      name: "FeedBackDetails",
      component: () => import("@/views/Class/Feedback/FeedBackDetails.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "Feedback Details",
      },
    },
    {
      path: "/clinic",
      name: "ClinicPage",
      component: () => import("@/views/Class/Feedback/FeedbackView.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "Clinic Details",
      },
    },
    {
      path: "/clinic-feedback",
      name: "ClinicFeedbackPage",
      component: () => import("@/views/Class/Feedback/ClinicFeedbackPage.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "Clinic Details",
      },
    },

    {
      path: "/assesment-feedback-detail/:class_id/:course_id/:schedule_seq",
      name: "AssesmentFeedbackDetail",
      component: () =>
        import("@/views/Class/Feedback/Assesment/AssesmentFeedbackDetail.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "Assesment Details",
      },
    },

    {
      path: "/resource-center-list/:course_seq/:class_id",
      name: "ResourceCenterList",
      component: () =>
        import(
          "@/views/Class/Feedback/LearningResourceRoom/ResourceCenterList.vue"
        ),
      meta: {
        requiresAuth: true,
        headerTitle: "ALP Details",
      },
    },

    {
      path: "/resource-center-list-detail/:course_seq/:cr_seq/:class_id",
      name: "ResourceCenterListDetail",
      component: () =>
        import(
          "@/views/Class/Feedback/LearningResourceRoom/ResourceCenterListDetail.vue"
        ),
      meta: {
        requiresAuth: true,
        headerTitle: "ALP Details",
      },
    },

    // ======== English speaking ability ========
    {
      path: "/english-speaking-ability",
      name: "EnglishSpeakingAbility",
      component: () =>
        import(
          "@/views/LearningPage/Registration/SelfDigonosisQuestion/EnglishSpeakingAbility.vue"
        ),
      meta: {
        requiresAuth: true,
        headerTitle: "ALP Details",
      },
    },

    // ======== LEVEL TEST ========
    {
      path: "/level-test",
      name: "LevelTest",
      component: () =>
        import("@/views/LearningPage/Registration/LevelTest/LevelTest.vue"),
    },

    // ======== ALP SMART LIST ========
    {
      path: "/alp-all-smart-list",
      name: "ALPSmartListViewAll",
      component: () =>
        import("@/views/Learning/Smart/SmartActiveLearningPrepListView.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "ALP List All",
      },
    },

    // ======== ACTIVITY ========
    {
      path: "/video-image-subtitles/:schedule_seq?/:module_name?",
      name: "VideoImageSubtitles",
      component: () =>
        import("@/views/Activity/ActivityTypes/VideoImageSubtitles.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "액티비티",
      },
    },
    {
      path: "/flashcard/:schedule_seq?/:module_name?",
      name: "Flashcard",
      component: () => import("@/views/Activity/Flashcard/Flashcard.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "액티비티",
      },
    },
    {
      path: "/dialogue-quiz/:schedule_seq?/:module_name?",
      name: "DialogueQuiz",
      component: () => import("@/views/Activity/Dialogue/DialogueQuiz.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "액티비티",
      },
    },
    {
      path: "/shadowing/:schedule_seq?/:module_name?",
      name: "Shadowing",
      component: () => import("@/views/Activity/Shadowing/Shadowing.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "액티비티",
      },
    },

    //new page added (18-04-2024)

    {
      path: "/speaking-test-video/:schedule_seq?/:module_name?",
      name: "Speakingtestvideo",
      component: () => import("@/views/Activity/TestTypeOne/Speakingtestvideo.vue"),
    },
    {
      path: "/review-tab/:schedule_seq?/:module_name?",
      name: "Reviewtab",
      component: () => import("@/views/Activity/TestTypeOne/Reviewtab.vue"),
    },
    // quiz
    {
      path: "/quiz-type-short-answer/:schedule_seq/:module_name?",
      name: "QuizTypeShortAnswer",
      component: () => import("@/views/Activity/Quiz/QuizTypeShortAnswer.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "액티비티",
      },
    },
    {
      path: "/complete/:schedule_seq/:module_name",
      name: "Complete",
      component: () => import("@/views/Activity/Complete.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "Complete",
      },
    },
    {
      path: "/quiz-type-multiple-choice",
      name: "QuizTypeMultipleChoice",
      component: () => import("@/views/Activity/Quiz/QuizTypeMultipleChoice.vue"),
    },
    {
      path: "/quiz-type-multiple-choice-4",
      name: "QuizTypeMultipleChoice4",
      component: () => import("@/views/Activity/Quiz/QuizTypeMultipleChoice4.vue"),
    },
    {
      path: "/quiz-type-multiple-choice-6",
      name: "QuizTypeMultipleChoice6",
      component: () => import("@/views/Activity/Quiz/QuizTypeMultipleChoice6.vue"),
    },
    {
      path: "/quiz-type-multiple-choice-2",
      name: "QuizTypeMultipleChoice2",
      component: () => import("@/views/Activity/Quiz/QuizTypeMultipleChoice2.vue"),
    },

    // ======== CLASS NOTICE BOARD ========
    {
      path: "/notice-board",
      name: "NoticeBoard",
      component: () => import("@/views/Class/NoticeBoard/NoticeBoard.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "공지사항",
      },
    },
    {
      path: "/notice-board-details/:id",
      name: "NoticeBoardDetails",
      component: () =>
        import("@/views/Class/NoticeBoard/NoticeBoardDetails.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "공지사항",
      },
    },

    // ======== CLASS COURSE HISTORY ========
    {
      path: "/course-history-prise",
      name: "CourseHistoryPrise",
      component: () =>
        import("@/views/Class/CourseHistory/CourseHistoryPrise.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "CourseHistoryPrise",
      },
    },
    {
      path: "/history-prise-view-all",
      name: "HistoryPriseViewAll",
      component: () =>
        import("@/views/Class/CourseHistory/HistoryPriseViewAll.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "수강내역",
      },
    },
    {
      path: "/graph-view-all",
      name: "GraphViewAll",
      component: () =>
        import("@/views/Class/CourseHistory/GraphViewAll.vue"),
      meta: {
        headerTitle: "수강내역",
      },
    },

    // ======== CLASS SURVEY ========
    {
      path: "/class-survey",
      name: "ClassSurvey",
      component: () => import("@/views/Class/Survey/ClassSurvey.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "설문",
      },
    },

    // ======== CLASS SURVEY DETAIL ========
    {
      path: "/class-survey-detail/:survey_seq/:survey_schedule_seq",
      name: "ClassSurveyDetail",
      component: () => import("@/views/Class/Survey/ClassSurveyDetail.vue"),
      meta: {
        requiresAuth: true,
        headerTitle: "설문",
      },
    },

    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      redirect: "/",
    },

    // ======== MODAL VIEW ========
    {
      path: "/modals-view-page",
      name: "ModalsViewPage",
      component: () => import("@/components/modals/ModalsViewPage.vue"),
    },

    // ======== components VIEW ========
    {
      path: "/test",
      name: "Test",
      component: () => import("@/components/test/Test.vue"),
    },

    // {
    //   path: "/mobile-tab-slider",
    //   name: "MobileTabSlider",
    //   component: () => import("@/components/MobileTabSlider.vue"),
    // },

    // makeing component pages
    {
      path: "/progress-bar",
      name: "ProgressBar",
      component: () => import("@/components/ProgressBar.vue"),
    },
    {
      path: "/progress-only-bar",
      name: "ProgressOnlyBar",
      component: () => import("@/components/ProgressOnlyBar.vue"),
    },
    {
      path: "/image-slider",
      name: "SliderImage",
      component: () => import("@/components/SliderImage.vue"),
    },
    // {
    //   path: "/always-feedback-modal",
    //   name: "AlwaysFeedbackModal",
    //   component: () => import("@/components/modal/AlwaysFeedbackModal.vue"),
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

// Route guard
router.beforeEach(async (to, from, next) => {
  const tokenUtil = new Token();
  try {
    const token = await tokenUtil.hasToken();
    if (token) {
      if (to.meta.disabledAurth) {
        return next({ name: "CompanyHome" });
      }
    }
    if (to.meta.requiresAuth && !token) {
      const store = useUserData();
      store.resetUser();
      tokenUtil.remove("user");
      tokenUtil.remove("refreshToken");
      next({ name: "CompanyHome" });
    } else next();
  } catch (error) {
    next({ name: "CompanyHome" });
    return;
  }
});

export default router;
