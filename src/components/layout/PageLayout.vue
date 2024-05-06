<template>
  <div v-if="fullscreenPage">
    <RouterView />
  </div>
  <div class="d-flex flex-column justify-content-between" style="height: 100vh;" v-else>
    <!-- Company Header -->
    <CompanyHeader v-if="(isComanyScreen || isAuthPage) && !getIsMobileViewReady" @on-logout="onLogoutUserConfirm" />
    <!-- Main Header -->
    <Header v-else-if="!isComanyScreen && !getIsMobileViewReady" @on-logout="onLogoutUserConfirm"
      :checkClassStatus="checkClassStatus" :menuData="menuList" />
    <MobileHeader :show-back-header="isExistingRoutes" v-else-if="getIsMobileViewReady && isToken"
      @on-logout="onLogoutUserConfirm" :checkClassStatus="checkClassStatus" :menuData="menuList" />
    <div :class="{ 'extra-top': !isComanyScreen }">
      <RouterView />
    </div>
    <!-- <CompanyFooter v-else-if="!isToken && !getIsMobileViewReady" /> -->
    <template v-if="!getIsMobileViewReady || !isChatScreen">
      <MobileFooter v-if="isToken && getIsMobileViewReady && !isExistingRoutes" :checkClassStatus="checkClassStatus"
        :menuData="menuList" />
      <Footer v-else-if="!getIsMobileViewReady" />
    </template>
  </div>
  <audio class="d-none" ref="callerTune" id="callerTune">
    <source src="/src/assets/audio/ringtone.mp3">
  </audio>
  <CallInvitationModal v-model="incomingCall" @handle-decline-call="onDeclineCall" @handle-accept-call="onAcceptCall" />

  <ModalComp v-if="displayPopupModal" :show="displayPopupModal" mWidth="355px" :defaultCloseBtn="false">
    <template #body>
      <div class="savemodal">

        <div class="savemessage">
          <h3>{{ popupData.title }}</h3>
          <p>{{ popupData.body }}</p>
        </div>
        <div class="button-wrap">
          <button type="button" @click="displayPopupModal = false" class="bordered">Cancel</button>
          <button type="button" @click="GoToNext">{{ popupData.button2 }}</button>
        </div>
      </div>
    </template>
  </ModalComp>

</template>
<script setup>
import AgoraRTM from "agora-rtm-sdk";
import axios from 'axios';
import CompanyHeader from './CompanyHeader.vue';
import MobileHeader from './MobileHeader.vue';
import MobileFooter from './MobileFooter.vue';
import CallInvitationModal from "@/chat/ui/CallInvitationModal.vue";
// import CompanyFooter from './CompanyFooter.vue';
// import { LearningMain } from "@/services/Learning/LearningMain/LearningMain.js";
// const LearningMainService = new LearningMain();
import Header from './Header.vue';
import Footer from './Footer.vue';
import { RouterView, useRoute, useRouter } from "vue-router";
import { onBeforeMount, ref, computed, watch, onBeforeUnmount } from "vue";
import { useUserData } from "@/stores/useUserData";
import { useVideoChat } from "@/stores/useVideoChat";
import { storeToRefs } from "pinia";
import { Token } from "@/services/Token";
import usePostMessage from "@/composables/usePostMessage";
const { onPostMessageFire } = usePostMessage();
const route = useRoute();
const router = useRouter();
const tokenUtil = new Token();
const store = useUserData();
const videoStore = useVideoChat();
const { getUserData, getIsMobileViewReady, getUserOngoingCourses } = storeToRefs(useUserData());
const isLoggedIn = computed(() => getUserData.value.user_id);
const checkClassStatus = computed(() => {
  if (getUserOngoingCourses) {
    const list = getUserOngoingCourses.value ? getUserOngoingCourses.value : []
    if (list?.length) {
      return list?.length && list?.filter(item => item.class_member_status == 'true')
    }
  }
})
const menuList = ref([]);
const isToken = ref(false);
const incomingCall = ref(false)
const callerTune = ref()
let rtmClient
let rtmChannel;
const rtm_token = ref()
const channelName = import.meta.env.VITE_GLOBAL_GROUP_NAME;
const BASE_URL = import.meta.env.VITE_APP_CHAT_BASE_API_URL;
const APP_ID = import.meta.env.VITE_AGORA_APP_ID;
let UID = sessionStorage.getItem("uid");
if (!UID) {
  UID = String(Math.floor(Math.random() * 10000));
  sessionStorage.setItem("uid", UID);
}
// *** Add Route Name in this below array, If we need to show back header or need to hide mobile footer
const routeNameList = [
  'Enrollment', 'VideoImageSubtitles', 'Shadowing', 'Flashcard', 'DialogueQuiz',
  'EnrollmentDetails',
  'FindPassword',
  'JoinMembership',
  'ChatBox',
  'CustomizationSetting',
  'EditInfoPW',
  'EditMemberInfoInput',
  'ChangePassword',
  'PointDetails',
  'AllNotificationList',
  'Settings',
  'TermsofUse',
  'PrivacyPolicy',
  'GeneralViewAll',
  'GeneralViewAllALP',
  'ALPSmartDetails',
  'AudioPhoto',
  'SelectPlay',
  'FeedBackDetails',
  'ViewAllSearchResult',
  'ClassSurveyDetail',
  'HistoryPriseViewAll',
  'NoticeBoardDetails',
  'QuizTypeShortAnswer'
]
const fullscreenPage = computed(() => route.name === 'SpepVideoChat');
const isChatScreen = computed(() => route.name === 'ChatBox');
const isExistingRoutes = computed(() => routeNameList.includes(route.name));
const isAuthPage = computed(() => ['Login', 'FindPassword', 'JoinMembership'].includes(route.name))
const isComanyScreen = computed(() => ['CompanyHome', 'ContactUs', 'Notice', 'NoticeDetails', 'Testimonial'].includes(route.name))
// **** WATCHERS
watch(() => isLoggedIn.value, (nV, oV) => {
  isToken.value = nV;
})

const displayPopupModal = ref(false);
const popupData = ref("");
const paramsData = ref("");

// *** Checking is this running in Flutter APP or not
window.addEventListener("flutterInAppWebViewPlatformReady", function (event) {
  store.$patch({ isMobileViewReady: true })
});


import { Cookie } from "@/services/Cookie";
const cookie = new Cookie();


window['getLoginData'] = async (res) => {
  const response = JSON.stringify(res)
  const resJson = JSON.parse(response)

  tokenUtil.setWithExpiry(
    "user",
    JSON.stringify({
      token: resJson.token,
    }),
    7200 * 1000
  );
  tokenUtil.setWithExpiry(
    "refreshToken",
    JSON.stringify({
      token: resJson.token,
    }),
    2592000 * 1000
  );
  store.getUserDetails();
  store.getLearnMenuList();
  store.getPointDetails();
  onPostMessageFire("setUserToken", {
    accessToken: resJson.token,
    userType: 'student',
    sessionId: resJson.userData.session_id
  });

  router.push({ name: 'MainHome' })

}

window['getPushData'] = async (res) => {
  const response = JSON.stringify(res)
  const resJson = JSON.parse(response)
  const popUpData = JSON.parse(resJson.popup);
  popupData.value = popUpData;
  const navigationGuard = JSON.parse(resJson.params);
  paramsData.value = JSON.parse(resJson.params);

  if (Object.entries(popUpData).length > 0 && !resJson.type) {
    displayPopupModal.value = true;
  }

  if (resJson.type == 'push_tap') {
    GoToNavigation(navigationGuard, resJson.screen);
  }

};

const GoToNavigation = (params, screen) => {
  if (screen == 'learningWhatsNew') {
    router.push({ name: 'AudioPhoto', params: { id: params.newsId } });
  }
  if (screen == 'attendanceStatusPage') {
    router.push({ name: 'AttendanceStatus' });
  }
  if (screen == 'surveyDetailPage') {
    router.push({ name: 'ClassSurveyDetail', params: { survey_seq: params.surveyId, survey_schedule_seq: params.surveyScheduleId } });
  }
  if (screen == 'courseSuggestions' || screen == 'classMainPage' || screen == 'courseConfirmation') {
    router.push({ name: 'MainHome' });
  }
  if (screen == 'afterClassReviewPage') {
    router.push({ name: 'TopicBasedDiscussion' });
  }
  if (screen == 'learningMainPage') {
    router.push({ name: 'SpaPrepCourse' });
  }
  if (screen == 'trophyPage') {
    router.push({ name: 'CourseHistoryPrise' });
  }
};


const GoToNext = () => {
  if (popupData.value.screen == 'learningMainPage') {
    router.push({ name: 'SpaPrepCourse' })
  }
  if (popupData.value.screen == 'trophyPage') {
    router.push({ name: 'CourseHistoryPrise' });
  }
  if (popupData.value.screen == 'courseSuggestions') {
    router.push({ name: 'MainHome' });
  }
  if (popupData.value.screen == 'surveyDetailPage') {
    router.push({ name: 'ClassSurveyDetail', params: { survey_seq: paramsData.value.surveyId, survey_schedule_seq: paramsData.value.surveyScheduleId } });
  }
  displayPopupModal.value = false;
};


function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
store.$patch({ isMobileViewReady: isMobileDevice() })
// Logout Function
const onLogoutUserConfirm = () => {
  // isLoading.value = true;
  setTimeout(() => {
    store.removeUserData();
    store.removePonitData();
    store.removeMenuData();
    tokenUtil.remove("user");
    tokenUtil.remove("refreshToken");
    // isLoading.value = false;
    // isMobileMenu.value = false;
    onPostMessageFire("logout");
    router.push("/");
  }, 1000);
};

// For Video Chat
const generateToken = async (id) => {
  try {
    const res = await axios.get(
      `${BASE_URL}api/v1/chat/agora/token/rtm?userId=${id}`
    );
    rtm_token.value = res.data.token;
    return res;
  } catch (error) {
    console.log(error);
  }
};
const logoutUser = async () => {
  console.log("destroyed!!!");
  await rtmClient.logout();
};
// Initialize RTM instance
const initRtmInstance = async () => {
  try {
    // initialize an Agora RTM instance
    rtmClient = await AgoraRTM.createInstance(APP_ID, {
      enableLogUpload: false,
    });

    // RTM Channel to be used
    // Generate the RTM token
    const { data } = await generateToken(`${isLoggedIn.value}${UID}`);
    // Login when it mounts
    await rtmClient.login({ uid: `${isLoggedIn.value}${UID}`, token: data.token });

    // Create a channel and listen to messages
    rtmChannel = rtmClient.createChannel(channelName);

    // Join the RTM Channel
    rtmChannel.join();

    rtmChannel.on("ChannelMessage", (message, memberId) => {
      handleChannelMessage(message, memberId)
    });
  } catch (error) {
    console.warn("Can't initialize 'AgoraRTM:'", error)
  }
};
const checkUserAccesibility = (_data) => {
  const list = _data;
  return list.some(item => item.user_id === isLoggedIn.value)
}
// Enable this after some moment
const playAudioForIncomingCall = (_type) => {
  // if (_type === 'play') {
  //   document.getElementById('callerTune').click()
  //   document.getElementById('callerTune').play();
  // } else {
  //   document.getElementById('callerTune').click()
  //   document.getElementById('callerTune').pause();
  // }
}

const handleChannelMessage = async (messageData, MemberId) => {
  let data = JSON.parse(messageData.text);
  if (!checkUserAccesibility(data.callee)) return;
  videoStore.setFieldValue('remoteData', { ...data })
  if (data.type === 'remote_call_invitation' && !videoStore.getRunningCallStatus) {
    incomingCall.value = true;
    playAudioForIncomingCall('play')
    setTimeout(() => {
      if (incomingCall.value) {
        videoStore.resetData();
        incomingCall.value = false
        playAudioForIncomingCall('end')
      }
    }, videoStore.state.invitation_time_span)
  } else if (data.type === 'cancelled_call_invitation') {
    if (videoStore.getRunningCallStatus) {
      // debugger
      videoStore.setFieldValue('end_running_call', true)
    } else {
      videoStore.resetData();
      incomingCall.value = false
      playAudioForIncomingCall('end')
    }
  }

}
// Not needed for Studnet as student not consider as host

// const sendMessage = (_obj) => {
//   rtmChannel.sendMessage({ text: JSON.stringify(_obj) })
// }
// const setPeerMessage = (_type) => {
//   const obj = {
//     type: _type,
//     callee: videoStore.getChatMemberList,
//     caller: videoStore.state.caller,
//     channel_name: videoStore.state.channel_name,
//     room_id: videoStore.state.room_id
//   }
//   sendMessage(obj)
// }

// watch(() => videoStore.getPeerStatus, (_type, oV) => {
//   if (_type) {
//     setPeerMessage(_type)
//   }
// })

const onAcceptCall = (_type) => {
  incomingCall.value = false
  playAudioForIncomingCall('end')
  router.push(`/spep-video-chat/${videoStore.getRemoteData.channel_name}/${videoStore.getRemoteData.room_id}/${_type}`);
  videoStore.setFieldValue('call_ongoing', true)
}
const onDeclineCall = () => {
  videoStore.resetData();
  incomingCall.value = false
  playAudioForIncomingCall('end')
}


// const getLearnMenuList = async () => {
//     try {
//         const res = await LearningMainService.getLearnMenuList();
//         if (res.data) {
//             menuList.value = res.data.list;
//         }
//     } catch (error) {
//         console.log(error);
//     } finally {
//     }
// };


// ======== LIFECYCLE =========
onBeforeMount(async () => {
  isToken.value = await tokenUtil.hasToken();
  if (isToken.value) {
    await store.getUserDetails();
    await store.getPointDetails();
    //await getLearnMenuList();
    await store.getLearnMenuList();
    if (!store.getIsMobileViewReady) {
      console.log(isLoggedIn.value)
      await initRtmInstance()
    }
  }
});
onBeforeUnmount(() => {
  logoutUser();
})
</script>
